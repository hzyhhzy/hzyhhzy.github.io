import { TRC1 } from "../lang.js";
import { Hvec, Quaternion, Rotor } from "./algebra.js";
import { FlatMapModel } from "./flatmap.js?flat-map=39";
import { LocalDraw } from "./localdraw.js";
import { TileBlockType, blockMap, initMap, nameMap } from "./maploader.js";
import { genOrdTiles } from "./ordinal.js";
import { Polygon } from "./tiling.js";
const NODE_COLORS = ["#ffffff", "#d9dee5", "#f6a21a", "#c7f52a", "#b6f2ed"];
const NODE_TEXT_COLORS = ["#164b2d", "#45556b", "#1728bd", "#a4161a", "#23305f"];
const NODE_WORLD_DIAMETER = 0.9;
function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
}
function inside(point, bounds) {
    return point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom;
}
function boundaryIntersection(a, b, bounds) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const candidates = [];
    if (dx > 0)
        candidates.push((bounds.right - a.x) / dx);
    if (dx < 0)
        candidates.push((bounds.left - a.x) / dx);
    if (dy > 0)
        candidates.push((bounds.bottom - a.y) / dy);
    if (dy < 0)
        candidates.push((bounds.top - a.y) / dy);
    const valid = candidates.filter(value => value >= 0 && value <= 1);
    const t = valid.length ? Math.min(...valid) : 1;
    return { x: a.x + dx * t, y: a.y + dy * t };
}
function pointAtPolylineRatio(points, ratio) {
    if (!points.length)
        return null;
    if (points.length === 1)
        return points[0];
    const position = clamp(ratio, 0, 1) * (points.length - 1);
    const first = Math.floor(position);
    const second = Math.min(points.length - 1, first + 1);
    const blend = position - first;
    return {
        x: points[first].x * (1 - blend) + points[second].x * blend,
        y: points[first].y * (1 - blend) + points[second].y * blend,
    };
}
function polylineFromRatio(points, ratio, towardEnd) {
    const cursor = pointAtPolylineRatio(points, ratio);
    if (!cursor)
        return [];
    const position = clamp(ratio, 0, 1) * Math.max(0, points.length - 1);
    if (towardEnd)
        return [cursor, ...points.slice(Math.floor(position) + 1)];
    return [cursor, ...points.slice(0, Math.ceil(position)).reverse()];
}
function rectanglesOverlap(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
function roundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.quadraticCurveTo(x + width, y, x + width, y + r);
    context.lineTo(x + width, y + height - r);
    context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    context.lineTo(x + r, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.closePath();
}
export class HWorld {
    debugDraw = false;
    navigateDraw = false;
    localDraw;
    localCamMat = new Rotor();
    currentTile = [];
    currentOrd = null;
    gravity = true;
    prettyPrint = true;
    highLightGetD = false;
    onPassGate = () => false;
    onGetReward = () => { };
    onStateChange = () => { };
    onStepToAnotherTile = () => { };
    atlasTile;
    sourceRoadSnapshot = null;
    geometryMode = "flat";
    flatModel = null;
    graphDirty = true;
    zoom = 1;
    panX = 0;
    panY = 0;
    viewRotation = 0;
    overviewMode = true;
    screenNodes = [];
    screenTargets = [];
    hoveredNode = null;
    hoveredEdge = null;
    constructor(canvas) {
        this.localDraw = new LocalDraw(canvas);
        this.atlasTile = new Polygon(6, 4);
        this.atlasTile.generateRotors();
        initMap(this.atlasTile);
        this.captureSourceRoadSnapshot();
    }
    captureSourceRoadSnapshot() {
        const passiveRoadHashes = new Set();
        const emptyRoadHashes = new Set();
        for (const [hash, block] of blockMap) {
            if (block.type !== TileBlockType.Road || block.name)
                continue;
            passiveRoadHashes.add(hash);
            if (!block.text?.trim())
                emptyRoadHashes.add(hash);
        }
        this.sourceRoadSnapshot = { passiveRoadHashes, emptyRoadHashes };
    }
    invalidateMap() {
        this.graphDirty = true;
    }
    isFlatMode() {
        return this.geometryMode === "flat";
    }
    setGeometryMode(mode) {
        if (mode === this.geometryMode)
            return mode;
        this.geometryMode = mode;
        if (mode === "flat")
            this.overviewMode = true;
        this.hoveredNode = null;
        this.hoveredEdge = null;
        this.localCamMat = new Rotor();
        this.atlasTile.generateRotors(this.currentTile);
        return mode;
    }
    toggleGeometryMode() {
        return this.setGeometryMode(this.isFlatMode() ? "hyperbolic" : "flat");
    }
    ensureModel() {
        const currentHash = this.currentTile.join(",");
        if (this.graphDirty || this.flatModel?.currentHash !== currentHash) {
            this.flatModel = new FlatMapModel(this.atlasTile, hash => this.getBlock(hash), currentHash, this.sourceRoadSnapshot);
            this.graphDirty = false;
        }
        if (this.overviewMode)
            this.flatModel.ensureGlobalLayout();
        return this.flatModel;
    }
    activeCoords(model = this.flatModel) {
        if (this.overviewMode) {
            model.ensureGlobalLayout();
            return model.globalCoords;
        }
        return model.coords;
    }
    activeExtent(model = this.flatModel) {
        return this.overviewMode ? model.globalExtent : model.layoutExtent;
    }
    activeEdges(model = this.flatModel) {
        if (this.overviewMode) {
            model.ensureGlobalLayout();
            return model.globalEdges;
        }
        return model.localEdges();
    }
    activeNodes(model = this.flatModel) {
        if (this.overviewMode) {
            model.ensureGlobalLayout();
            return model.globalNodes;
        }
        return model.visibleNodes;
    }
    reload() {
        initMap(this.atlasTile);
        this.captureSourceRoadSnapshot();
        this.invalidateMap();
    }
    getBlock(hash) {
        const result = blockMap.get(hash) ?? blockMap.get(nameMap.get(hash));
        if (!result && hash.startsWith("1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,3,3")) {
            if (hash.match(/^1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,3,3,(3|4(,2)*,1)/)) {
                const stone = hash.match(/2,3$/);
                const characters = "卍般摩波慧迦莲净空寂禅佛孤於婆玄冥尔智超菩提修皈灵尊弥咒唵噜嘿噶吽萨魅魂丧魄心戒律缚摒幽乾刹伽吒禄衰阳阴若陀";
                return {
                    type: stone ? 2 : hash.match(/(3|4(,2)*,1)...+(2|4),(3|4(,2)*,1)/) ? 4 : hash.match(/((3,3)|(4,4)|(2,2))$/) ? 3 : 0,
                    name: undefined,
                    text: stone ? characters[(hash.length * 31 + hash.lastIndexOf("2") * 53 + hash.lastIndexOf("3") * 11 + 3) % characters.length] : "",
                };
            }
        }
        return result;
    }
    getNamedBlockHash(name) {
        return nameMap.get(name);
    }
    displayText(block) {
        if (Array.isArray(block?.mergedTexts)) {
            return block.mergedTexts.map(text => this.displayText({ ...block, mergedTexts: undefined, text })
                .split("\n").map(line => line.trim()).filter(Boolean).join(" ")).filter(Boolean).join("\n");
        }
        let text = block?.text ?? "";
        if (this.prettyPrint) {
            if (text.endsWith("#p") || text.endsWith("#d")) {
                text = text.replaceAll("V", "∀").replaceAll("/|", "∣").replaceAll(">=", "≥").replaceAll("<=", "≤").replaceAll("<>", "↔").replaceAll(/E([^q])/g, "∃$1").replaceAll("@", "∈").replaceAll("~", "¬")
                    .replaceAll(">", " → ").replaceAll("<", "⊂").replaceAll("U", "∪").replaceAll("I", "∩")
                    .replaceAll("&", "∧").replaceAll("|", "∨").replaceAll("∨∨", "|").replaceAll("omega", "ω").replaceAll("X", "×").replaceAll("*", "×")
                    .replaceAll("N", "ℕ").replaceAll("Z", "ℤ").replaceAll("Q", "ℚ").replaceAll("R", "ℝ").replaceAll("ℝel", "Rel");
            }
            else if (text.endsWith("#t")) {
                text = text.replaceAll("~=", "≃").replaceAll("->", " → ").replaceAll("*", "▪").replaceAll("L", "λ").replaceAll("S", "Σ").replaceAll("P", "Π")
                    .replaceAll("X", "×").replaceAll("λiftU", "LiftU").replaceAll("λist", "List").replaceAll("Σet", "Set").replaceAll("Σ1", "S1").replaceAll("Σ2", "S2").replaceAll("Σ3", "S3").replaceAll("Πrop", "Prop").replaceAll("Πushout", "Pushout").replaceAll("Σus", "Sus").replaceAll("Σum", "Sum");
            }
        }
        else if (text.endsWith("#p") || text.endsWith("#d")) {
            text = text.replaceAll("||", "|");
        }
        text = TRC1(text).replace(/\n#(?:p|d|t|t:=)$/, "");
        return text || (block?.name ? `[${block.name}]` : "");
    }
    worldScale() {
        const canvas = this.localDraw.canvas;
        const dpr = window.devicePixelRatio;
        const extent = this.flatModel ? this.activeExtent() : { x: 5, y: 4 };
        const horizontalMargin = (this.overviewMode ? 100 : 180) * dpr;
        const verticalMargin = (this.overviewMode ? 90 : 190) * dpr;
        const horizontalScale = (canvas.width - horizontalMargin) / (Math.max(extent.x, 1) * 2);
        const verticalScale = (canvas.height - verticalMargin) / (Math.max(extent.y, 1) * 2);
        const minimumScale = (this.overviewMode ? 2 : 24) * dpr;
        const maximumScale = (this.overviewMode ? 18 : 64) * dpr;
        return Math.max(minimumScale, Math.min(maximumScale, horizontalScale, verticalScale)) * this.zoom;
    }
    worldToScreen(point) {
        const canvas = this.localDraw.canvas;
        const scale = this.worldScale();
        const cosine = Math.cos(this.viewRotation);
        const sine = Math.sin(this.viewRotation);
        const x = point.x * cosine - point.y * sine;
        const y = point.x * sine + point.y * cosine;
        return {
            x: canvas.width / 2 + this.panX + x * scale,
            y: canvas.height / 2 + this.panY + y * scale,
        };
    }
    safeScreenPoint(point) {
        const canvas = this.localDraw.canvas;
        const limit = Math.max(canvas.width, canvas.height) * 20;
        return {
            x: clamp(point.x, -limit, limit),
            y: clamp(point.y, -limit, limit),
        };
    }
    drawBackground(context) {
        const canvas = this.localDraw.canvas;
        const dpr = window.devicePixelRatio;
        context.fillStyle = "#f7f9fc";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(93, 111, 134, 0.11)";
        const spacing = 32 * dpr;
        const offsetX = ((this.panX % spacing) + spacing) % spacing;
        const offsetY = ((this.panY % spacing) + spacing) % spacing;
        for (let x = offsetX; x < canvas.width; x += spacing) {
            for (let y = offsetY; y < canvas.height; y += spacing) {
                context.beginPath();
                context.arc(x, y, 0.7 * dpr, 0, Math.PI * 2);
                context.fill();
            }
        }
    }
    drawRoute(context, edge, isHighlighted) {
        const coords = this.activeCoords();
        const start = coords.get(edge.a);
        const destination = coords.get(edge.b);
        if (!start || !destination)
            return [];
        const endpoints = [start, destination].map(point => this.safeScreenPoint(this.worldToScreen(point)));
        if (endpoints.length < 2)
            return endpoints;
        const endpointDx = endpoints[1].x - endpoints[0].x;
        const endpointDy = endpoints[1].y - endpoints[0].y;
        const endpointLength = Math.hypot(endpointDx, endpointDy);
        let points = endpoints;
        let control = null;
        if (edge.parallelCount > 1 && endpointLength) {
            const normalX = -endpointDy / endpointLength;
            const normalY = endpointDx / endpointLength;
            const spacing = (this.overviewMode ? 8 : 14) * window.devicePixelRatio;
            const rank = edge.parallelIndex - (edge.parallelCount - 1) / 2;
            const canonicalRank = edge.a < edge.b ? rank : -rank;
            const offset = canonicalRank * spacing * 2;
            control = this.safeScreenPoint({
                x: (endpoints[0].x + endpoints[1].x) / 2 + normalX * offset,
                y: (endpoints[0].y + endpoints[1].y) / 2 + normalY * offset,
            });
            points = [];
            for (let index = 0; index <= 16; index++) {
                const ratio = index / 16;
                const inverse = 1 - ratio;
                points.push({
                    x: inverse * inverse * endpoints[0].x + 2 * inverse * ratio * control.x + ratio * ratio * endpoints[1].x,
                    y: inverse * inverse * endpoints[0].y + 2 * inverse * ratio * control.y + ratio * ratio * endpoints[1].y,
                });
            }
        }
        context.save();
        context.beginPath();
        context.moveTo(endpoints[0].x, endpoints[0].y);
        if (control)
            context.quadraticCurveTo(control.x, control.y, endpoints[1].x, endpoints[1].y);
        else
            context.lineTo(endpoints[1].x, endpoints[1].y);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = isHighlighted ? "#356da8" : (this.overviewMode ? "rgba(120,136,154,0.38)" : "#a7b2c0");
        context.lineWidth = (this.overviewMode ? (isHighlighted ? 2.2 : 0.65) : (isHighlighted ? 4 : 2)) * window.devicePixelRatio;
        context.stroke();
        context.restore();
        const middle = Math.floor(points.length / 2);
        const before = points[Math.max(0, middle - 1)];
        const after = points[Math.min(points.length - 1, middle + 1)];
        const dx = after.x - before.x;
        const dy = after.y - before.y;
        const length = Math.hypot(dx, dy);
        if (!this.overviewMode && isHighlighted && edge.parallelCount === 1
            && edge.steps > 1 && endpointLength > 62 * window.devicePixelRatio && length) {
            const dpr = window.devicePixelRatio;
            const label = `空路 ×${edge.steps}`;
            const normalX = -dy / length;
            const normalY = dx / length;
            const x = points[middle].x + normalX * 11 * dpr;
            const y = points[middle].y + normalY * 11 * dpr;
            context.save();
            context.font = `${11 * dpr}px system-ui, sans-serif`;
            const width = context.measureText(label).width + 12 * dpr;
            const height = 20 * dpr;
            roundedRect(context, x - width / 2, y - height / 2, width, height, 6 * dpr);
            context.fillStyle = "rgba(247,249,252,0.94)";
            context.fill();
            context.fillStyle = "#48627f";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(label, x, y);
            context.restore();
        }
        return points;
    }
    routeTarget(route, routeScreenPoints, bounds) {
        const edge = route.edge;
        const oriented = edge
            ? polylineFromRatio(routeScreenPoints, route.ratio, route.destination === edge.b)
            : [];
        const destination = route.destination;
        const destinationCoord = this.activeCoords().get(destination);
        const destinationScreen = destinationCoord ? this.worldToScreen(destinationCoord) : oriented[oriented.length - 1];
        if (destinationScreen && inside(destinationScreen, bounds)) {
            if (edge?.parallelCount > 1 && oriented.length > 2) {
                const point = oriented[Math.floor((oriented.length - 1) * .72)];
                return { route, hash: destination, x: point.x, y: point.y, radius: 14 * window.devicePixelRatio, portal: false, routeChoice: true };
            }
            return { route, hash: destination, x: destinationScreen.x, y: destinationScreen.y, radius: 22 * window.devicePixelRatio, portal: false };
        }
        for (let index = 1; index < oriented.length; index++) {
            if (inside(oriented[index - 1], bounds) && !inside(oriented[index], bounds)) {
                const point = boundaryIntersection(oriented[index - 1], oriented[index], bounds);
                return { route, hash: destination, x: point.x, y: point.y, radius: 28 * window.devicePixelRatio, portal: true };
            }
        }
        return null;
    }
    fitNodeLines(context, text, maximumWidth, maximumLines = 4) {
        const characters = Array.from(String(text).replace(/\s+/g, " ").trim());
        const lines = [];
        let line = "";
        let index = 0;
        while (index < characters.length) {
            const candidate = line + characters[index];
            if (!line || context.measureText(candidate).width <= maximumWidth) {
                line = candidate;
                index++;
                continue;
            }
            lines.push(line);
            line = "";
            if (lines.length >= maximumLines)
                break;
        }
        if (line && lines.length < maximumLines)
            lines.push(line);
        if (index < characters.length && lines.length) {
            const lastIndex = lines.length - 1;
            const last = Array.from(lines[lastIndex]);
            while (last.length && context.measureText(last.join("") + "…").width > maximumWidth)
                last.pop();
            lines[lastIndex] = last.join("") + "…";
        }
        return lines;
    }
    drawNodeText(context, entry, block, radius) {
        const dpr = window.devicePixelRatio;
        const text = this.displayText(block);
        if (!text || radius < 4 * dpr)
            return;
        // Keep every glyph inside a square which itself fits inside the node
        // circle. This avoids the clipped corners produced by a wide circular
        // text area while retaining predictable four-line wrapping.
        const halfSide = radius * .66;
        const boxSize = halfSide * 2;
        const fontSize = radius * .14;
        const lineHeight = radius * .155;
        context.save();
        context.beginPath();
        context.rect(entry.x - halfSide, entry.y - halfSide, boxSize, boxSize);
        context.clip();
        context.font = `600 ${fontSize}px system-ui, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = NODE_TEXT_COLORS[block?.type ?? TileBlockType.Wall];
        const lines = this.fitNodeLines(context, text, boxSize);
        const firstY = entry.y - (lines.length - 1) * lineHeight / 2;
        lines.forEach((line, index) => context.fillText(line, entry.x, firstY + index * lineHeight));
        context.restore();
    }
    drawNode(context, entry, clickable, radius, highlighted = false) {
        const dpr = window.devicePixelRatio;
        const block = this.flatModel.displayBlock(entry.hash);
        const isCurrent = entry.hash === this.flatModel.currentHash;
        let fill = NODE_COLORS[block?.type ?? TileBlockType.Wall];
        if (this.highLightGetD && block?.text?.match(/^获取(.+)推理素$/))
            fill = "#ffe64a";
        context.save();
        if (highlighted || clickable) {
            const halo = Math.max(.7 * dpr, Math.min(radius * .18, 3 * dpr));
            context.beginPath();
            context.arc(entry.x, entry.y, radius + halo, 0, Math.PI * 2);
            context.fillStyle = "rgba(48, 112, 190, 0.13)";
            context.fill();
            context.strokeStyle = "rgba(48, 112, 190, 0.72)";
            context.lineWidth = Math.max(.65 * dpr, Math.min(radius * .1, 1.5 * dpr));
            context.stroke();
        }
        const outlineWidth = Math.min(radius * (isCurrent ? .16 : .09), (isCurrent ? 2.2 : 1.2) * dpr);
        context.beginPath();
        context.arc(entry.x, entry.y, Math.max(.1, radius - outlineWidth / 2), 0, Math.PI * 2);
        context.fillStyle = fill;
        context.fill();
        context.strokeStyle = isCurrent ? "#142c4c" : "#536273";
        context.lineWidth = outlineWidth;
        context.stroke();
        this.drawNodeText(context, entry, block, radius);
        context.restore();
        entry.radius = radius;
        entry.block = block;
    }
    drawCurrentCursor(context, routeScreens, radius) {
        const location = this.flatModel.currentLocation;
        if (!location || location.kind === "node")
            return;
        let point = null;
        if (location.kind === "edge") {
            point = pointAtPolylineRatio(routeScreens.get(location.edge.id) ?? [], location.ratio);
        }
        else if (location.kind === "projection") {
            const coord = this.activeCoords().get(location.hash);
            if (coord)
                point = this.worldToScreen(coord);
        }
        if (!point)
            return;
        const dpr = window.devicePixelRatio;
        context.save();
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,255,255,0.9)";
        context.fill();
        context.strokeStyle = "#142c4c";
        context.lineWidth = Math.min(radius * .16, 2.2 * dpr);
        context.stroke();
        const markerHeight = radius * .46;
        const markerWidth = radius * .39;
        context.beginPath();
        context.moveTo(point.x, point.y - markerHeight);
        context.lineTo(point.x - markerWidth, point.y + markerHeight * .65);
        context.lineTo(point.x + markerWidth, point.y + markerHeight * .65);
        context.closePath();
        context.fillStyle = "#223c64";
        context.fill();
        context.restore();
    }
    wrappedLines(context, text, maximumCharacters = 28, maximumLines = 3) {
        const result = [];
        for (const originalLine of String(text).split("\n")) {
            let line = originalLine.trim();
            while (line.length > maximumCharacters && result.length < maximumLines) {
                result.push(line.slice(0, maximumCharacters));
                line = line.slice(maximumCharacters);
            }
            if (line && result.length < maximumLines)
                result.push(line);
            if (result.length >= maximumLines)
                break;
        }
        if (!result.length)
            return [];
        const sourceLength = String(text).replaceAll("\n", "").length;
        if (sourceLength > result.join("").length)
            result[result.length - 1] = result[result.length - 1].replace(/…$/, "") + "…";
        return result;
    }
    drawLabels(context, clickableHashes) {
        const canvas = this.localDraw.canvas;
        const dpr = window.devicePixelRatio;
        const used = [{ x: 10 * dpr, y: 38 * dpr, width: 390 * dpr, height: 62 * dpr }];
        const candidates = this.screenNodes
            .filter(node => !this.overviewMode || node.hash === this.hoveredNode)
            .filter(node => this.displayText(node.block))
            .sort((a, b) => {
            const priority = node => (node.hash === this.flatModel.currentHash ? 100 : 0) + (clickableHashes.has(node.hash) ? 50 : 0) + (node.hash === this.hoveredNode ? 25 : 0) + (node.block?.type === TileBlockType.Road ? 0 : 10);
            return priority(b) - priority(a);
        });
        let drawn = 0;
        for (const node of candidates) {
            const important = node.hash === this.flatModel.currentHash || clickableHashes.has(node.hash) || node.hash === this.hoveredNode;
            if (!important && (this.overviewMode || this.zoom < 0.42 || drawn >= 28))
                continue;
            const lines = this.wrappedLines(context, this.displayText(node.block));
            if (!lines.length)
                continue;
            context.font = `${12 * dpr}px system-ui, sans-serif`;
            const width = Math.max(...lines.map(line => context.measureText(line).width)) + 14 * dpr;
            const height = lines.length * 16 * dpr + 8 * dpr;
            const gap = node.radius + 7 * dpr;
            const placements = [
                { x: node.x - width / 2, y: node.y - gap - height },
                { x: node.x + gap, y: node.y - height / 2 },
                { x: node.x - width / 2, y: node.y + gap },
                { x: node.x - gap - width, y: node.y - height / 2 },
            ];
            let best = null;
            let bestScore = Infinity;
            for (const placement of placements) {
                const rectangle = { ...placement, width, height };
                let score = used.reduce((sum, other) => sum + (rectanglesOverlap(rectangle, other) ? 10000 : 0), 0);
                if (rectangle.x < 4 * dpr || rectangle.y < 4 * dpr || rectangle.x + width > canvas.width - 4 * dpr || rectangle.y + height > canvas.height - 4 * dpr)
                    score += 5000;
                if (score < bestScore) {
                    best = rectangle;
                    bestScore = score;
                }
            }
            if (!important && bestScore >= 10000)
                continue;
            used.push(best);
            context.save();
            roundedRect(context, best.x, best.y, best.width, best.height, 5 * dpr);
            context.fillStyle = "rgba(255,255,255,0.91)";
            context.fill();
            context.strokeStyle = "rgba(77,91,108,0.28)";
            context.lineWidth = dpr;
            context.stroke();
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = NODE_TEXT_COLORS[node.block?.type ?? TileBlockType.Wall];
            lines.forEach((line, index) => context.fillText(line, best.x + best.width / 2, best.y + (index + 0.75) * 16 * dpr));
            context.restore();
            drawn++;
        }
    }
    drawPortal(context, target) {
        const dpr = window.devicePixelRatio;
        const hovered = target.route.id === this.hoveredEdge;
        const canvas = this.localDraw.canvas;
        const radius = 11 * dpr;
        const angle = Math.atan2(target.y - canvas.height / 2, target.x - canvas.width / 2);
        context.save();
        context.beginPath();
        context.arc(target.x, target.y, radius, 0, Math.PI * 2);
        context.fillStyle = hovered ? "#285f9f" : "#4777ad";
        context.fill();
        context.translate(target.x, target.y);
        context.rotate(angle);
        context.beginPath();
        context.moveTo(-3.5 * dpr, -5 * dpr);
        context.lineTo(3.5 * dpr, 0);
        context.lineTo(-3.5 * dpr, 5 * dpr);
        context.strokeStyle = "white";
        context.lineWidth = 2 * dpr;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
        context.restore();
        target.radius = 22 * dpr;
    }
    drawRouteChoice(context, target) {
        const dpr = window.devicePixelRatio;
        const hovered = target.route.id === this.hoveredEdge;
        const label = `×${target.route.steps}`;
        context.save();
        context.font = `600 ${11 * dpr}px system-ui, sans-serif`;
        const width = context.measureText(label).width + 12 * dpr;
        const height = 20 * dpr;
        roundedRect(context, target.x - width / 2, target.y - height / 2, width, height, 10 * dpr);
        context.fillStyle = hovered ? "#356da8" : "rgba(247,249,252,0.96)";
        context.fill();
        context.strokeStyle = "#356da8";
        context.lineWidth = 1.2 * dpr;
        context.stroke();
        context.fillStyle = hovered ? "white" : "#285f9f";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(label, target.x, target.y);
        context.restore();
        target.radius = Math.max(width / 2, 14 * dpr);
    }
    drawInfo(context) {
        const dpr = window.devicePixelRatio;
        const stats = this.flatModel?.globalLayoutStats;
        context.save();
        roundedRect(context, 10 * dpr, 38 * dpr, 390 * dpr, 58 * dpr, 8 * dpr);
        context.fillStyle = "rgba(255,255,255,0.92)";
        context.fill();
        context.strokeStyle = "rgba(65,82,105,0.2)";
        context.stroke();
        context.fillStyle = "#24364d";
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.font = `600 ${14 * dpr}px system-ui, sans-serif`;
        context.fillText(this.overviewMode
            ? `全图总览 · ${stats?.nodeCount ?? 0} 节点 · ${stats?.edgeCount ?? 0} 连线`
            : "完整节点平面图 · 白路可达域 + 外围一圈", 22 * dpr, 56 * dpr);
        context.font = `${12 * dpr}px system-ui, sans-serif`;
        context.fillStyle = "#5b6d82";
        context.fillText(this.overviewMode
            ? "拖动平移 · 滚轮放大细看 · 回到当前节点可快速定位"
            : "点击蓝圈会沿白路前往 · 门只在抵达时判定 · M 查看全图", 22 * dpr, 79 * dpr);
        context.restore();
    }
    drawHoverCard(context) {
        const hash = this.hoveredEdge !== null
            ? this.screenTargets.find(target => target.route.id === this.hoveredEdge)?.hash
            : this.hoveredNode;
        if (hash === undefined || hash === null)
            return;
        const block = this.flatModel.displayBlock(hash);
        if (!block)
            return;
        const dpr = window.devicePixelRatio;
        const canvas = this.localDraw.canvas;
        const text = this.displayText(block) || hash || "起点";
        const maximumLines = Math.max(7, Math.floor((canvas.height / dpr - 110) / 18));
        const lines = this.wrappedLines(context, text, 48, maximumLines);
        const mergedRoadCount = this.flatModel.mergedRoadCount(hash);
        if (mergedRoadCount > 1)
            lines.unshift(`已合并 ${mergedRoadCount} 个无功能路点`);
        if (block.name)
            lines.unshift(`[${block.name}]`);
        context.save();
        context.font = `${13 * dpr}px system-ui, sans-serif`;
        const width = Math.min(470 * dpr, Math.max(210 * dpr, ...lines.map(line => context.measureText(line).width + 24 * dpr)));
        const height = lines.length * 18 * dpr + 18 * dpr;
        const x = canvas.width - width - 14 * dpr;
        const y = canvas.height - height - 14 * dpr;
        roundedRect(context, x, y, width, height, 8 * dpr);
        context.fillStyle = "rgba(25,39,58,0.92)";
        context.fill();
        context.fillStyle = "white";
        context.textAlign = "left";
        context.textBaseline = "middle";
        lines.forEach((line, index) => context.fillText(line, x + 12 * dpr, y + (index + 1) * 18 * dpr));
        context.restore();
    }
    onLoop() {
        if (this.isFlatMode())
            this.drawFlatWorld();
        else
            this.drawHyperbolicWorld();
    }
    /** The original Poincare-disc renderer, kept as an independent view. */
    drawHyperbolicWorld() {
        const context = this.localDraw.ctxt;
        this.localDraw.clear();
        context.fillStyle = "rgb(220,220,220)";
        this.localDraw.drawOutBorder();
        context.textAlign = "center";
        context.fillStyle = "rgb(0,0,255)";
        for (const [hash, rotor] of this.atlasTile.rotors) {
            const block = this.getBlock(hash);
            if (!block && !this.debugDraw)
                continue;
            if (this.highLightGetD && block?.text?.match(/^获取(.+)推理素$/))
                context.fillStyle = "rgb(255,255,0)";
            else
                context.fillStyle = ["rgb(255,255,255)", "rgb(220,220,220)", "rgb(250,160,20)", "rgb(200,255,20)", "rgb(180,255,240)"][block?.type ?? TileBlockType.Wall];
            this.localDraw.drawPolygon(this.atlasTile, this.localCamMat.mul(rotor), this.navigateDraw);
        }
        for (const [hash, rotor] of this.atlasTile.rotors) {
            const block = this.getBlock(hash);
            if (!block) {
                if (this.debugDraw) {
                    context.fillStyle = "rgb(0,0,0)";
                    this.localDraw.textTo(this.localCamMat.mul(rotor).apply(new Hvec()), hash);
                }
                continue;
            }
            context.fillStyle = ["rgb(0,80,0)", "rgb(60,60,255)", "rgb(33,38,255)", "rgb(255,0,0)", "rgb(30,20,100)"][block.type];
            let text = block.text ?? "";
            if (this.prettyPrint) {
                if (text.endsWith("#p") || text.endsWith("#d")) {
                    text = text.replaceAll("V", "∀").replaceAll("/|", "∣").replaceAll(">=", "≥").replaceAll("<=", "≤").replaceAll("<>", "↔").replaceAll(/E([^q])/g, "∃$1").replaceAll("@", "∈").replaceAll("~", "¬")
                        .replaceAll(">", " → ").replaceAll("<", "⊂").replaceAll("U", "∪").replaceAll("I", "∩")
                        .replaceAll("&", "∧").replaceAll("|", "∨").replaceAll("∨∨", "|").replaceAll("omega", "ω").replaceAll("X", "×").replaceAll("*", "×")
                        .replaceAll("N", "ℕ").replaceAll("Z", "ℤ").replaceAll("Q", "ℚ").replaceAll("R", "ℝ").replaceAll("ℝel", "Rel");
                }
                else if (text.endsWith("#t")) {
                    text = text.replaceAll("~=", "≃").replaceAll("->", " → ").replaceAll("*", "▪").replaceAll("L", "λ").replaceAll("S", "Σ").replaceAll("P", "Π")
                        .replaceAll("X", "×").replaceAll("λiftU", "LiftU").replaceAll("λist", "List").replaceAll("Σet", "Set").replaceAll("Σ1", "S1").replaceAll("Σ2", "S2").replaceAll("Σ3", "S3").replaceAll("Πrop", "Prop").replaceAll("Πushout", "Pushout").replaceAll("Σus", "Sus").replaceAll("Σum", "Sum");
                }
            }
            else if (text.endsWith("#p") || text.endsWith("#d")) {
                text = text.replaceAll("||", "|");
            }
            this.localDraw.textTo(this.localCamMat.mul(rotor).apply(new Hvec()), text);
        }
        context.fillStyle = "rgba(0,0,0,0.2)";
        this.localDraw.drawPlayer();
    }
    drawFlatWorld() {
        const model = this.ensureModel();
        const context = this.localDraw.ctxt;
        const canvas = this.localDraw.canvas;
        const dpr = window.devicePixelRatio;
        this.localDraw.clear();
        this.drawBackground(context);
        this.screenNodes = [];
        this.screenTargets = [];
        if (!model.nodes.has(model.currentHash)) {
            context.fillStyle = "#8d2431";
            context.font = `${18 * dpr}px system-ui, sans-serif`;
            context.textAlign = "center";
            context.fillText("存档所在地图节点不存在", canvas.width / 2, canvas.height / 2);
            return;
        }
        const edges = this.activeEdges(model);
        const routes = model.reachableRoutes();
        const region = model.reachableRegion();
        const highlightedEdges = region.highlightedEdgeIds;
        const routeScreens = new Map();
        const orderedEdges = edges.slice().sort((first, second) => Number(highlightedEdges.has(first.id)) - Number(highlightedEdges.has(second.id)));
        for (const edge of orderedEdges)
            routeScreens.set(edge.id, this.drawRoute(context, edge, highlightedEdges.has(edge.id)));
        const nodeHashes = this.activeNodes(model);
        const coords = this.activeCoords(model);
        const margin = 150 * dpr;
        for (const hash of nodeHashes) {
            const coord = coords.get(hash);
            if (!coord)
                continue;
            const point = this.worldToScreen(coord);
            if (point.x < -margin || point.y < -margin || point.x > canvas.width + margin || point.y > canvas.height + margin)
                continue;
            this.screenNodes.push({ hash, x: point.x, y: point.y });
        }
        const bounds = { left: 52 * dpr, right: canvas.width - 52 * dpr, top: 112 * dpr, bottom: canvas.height - 52 * dpr };
        for (const route of routes) {
            const target = this.routeTarget(route, route.edge ? routeScreens.get(route.edge.id) ?? [] : [], bounds);
            if (target)
                this.screenTargets.push(target);
        }
        const clickableHashes = new Set(this.screenTargets.filter(target => !target.portal && !target.routeChoice).map(target => target.hash));
        this.screenNodes.sort((a, b) => (a.hash === model.currentHash ? 1 : 0) - (b.hash === model.currentHash ? 1 : 0));
        const nodeRadius = this.worldScale() * NODE_WORLD_DIAMETER / 2;
        for (const node of this.screenNodes)
            this.drawNode(context, node, clickableHashes.has(node.hash), nodeRadius, region.highlightedNodes.has(node.hash));
        this.drawCurrentCursor(context, routeScreens, nodeRadius);
        for (const target of this.screenTargets.filter(target => target.portal))
            this.drawPortal(context, target);
        for (const target of this.screenTargets.filter(target => target.routeChoice))
            this.drawRouteChoice(context, target);
        if (this.debugDraw) {
            context.save();
            context.font = `${9 * dpr}px monospace`;
            context.fillStyle = "#1d2633";
            context.textAlign = "left";
            for (const node of this.screenNodes)
                context.fillText(node.hash || "[]", node.x + 10 * dpr, node.y + 12 * dpr);
            context.restore();
        }
        if (this.navigateDraw) {
            context.save();
            context.strokeStyle = "rgba(42,78,128,0.45)";
            context.setLineDash([5 * dpr, 6 * dpr]);
            context.beginPath();
            context.arc(canvas.width / 2 + this.panX, canvas.height / 2 + this.panY, 42 * dpr, 0, Math.PI * 2);
            context.stroke();
            context.restore();
        }
        this.drawInfo(context);
        this.drawHoverCard(context);
    }
    hoverAt(x, y) {
        if (!this.isFlatMode())
            return { changed: false, clickable: false };
        let nearestTarget = null;
        let nearestDistance = Infinity;
        for (const target of this.screenTargets) {
            const distance = Math.hypot(x - target.x, y - target.y);
            if (distance <= target.radius + 8 * window.devicePixelRatio && distance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = distance;
            }
        }
        let nearestNode = null;
        nearestDistance = Infinity;
        for (const node of this.screenNodes) {
            const distance = Math.hypot(x - node.x, y - node.y);
            if (distance <= node.radius + 7 * window.devicePixelRatio && distance < nearestDistance) {
                nearestNode = node;
                nearestDistance = distance;
            }
        }
        const nextEdge = nearestTarget?.route.id ?? null;
        const nextNode = nearestNode?.hash ?? null;
        const changed = nextEdge !== this.hoveredEdge || nextNode !== this.hoveredNode;
        this.hoveredEdge = nextEdge;
        this.hoveredNode = nextNode;
        return { changed, clickable: nearestTarget !== null };
    }
    activateAt(x, y) {
        if (!this.isFlatMode())
            return false;
        let nearest = null;
        let nearestDistance = Infinity;
        for (const target of this.screenTargets) {
            const distance = Math.hypot(x - target.x, y - target.y);
            if (distance <= target.radius + 10 * window.devicePixelRatio && distance < nearestDistance) {
                nearest = target;
                nearestDistance = distance;
            }
        }
        if (!nearest)
            return false;
        return this.moveAlong(nearest.route);
    }
    moveAlong(route) {
        const model = this.ensureModel();
        const path = route?.path;
        if (!path?.length)
            return false;
        const oldCurrent = model.currentHash;
        let movedHash = oldCurrent;
        for (const hash of path.slice(1)) {
            const tile = hash ? hash.split(",").map(Number) : [];
            if (!this.hitTest(tile))
                break;
            this.currentTile = tile;
            movedHash = hash;
            this.onStepToAnotherTile();
        }
        this.localCamMat = new Rotor();
        this.invalidateMap();
        if (movedHash !== oldCurrent) {
            this.atlasTile.generateRotors(this.currentTile);
            if (this.overviewMode) {
                this.ensureModel();
            }
            else {
                const before = model.sourceCoords.get(movedHash);
                const desiredBackAngle = before ? Math.atan2(before.y, before.x) + this.viewRotation + Math.PI : this.viewRotation;
                const rebuilt = this.ensureModel();
                const back = rebuilt.sourceCoords.get(oldCurrent);
                if (back)
                    this.viewRotation = desiredBackAngle - Math.atan2(back.y, back.x);
                this.panX = 0;
                this.panY = 0;
            }
        }
        this.onStateChange();
        return movedHash !== oldCurrent;
    }
    moveInDirection(x, y) {
        if (!this.isFlatMode())
            return false;
        const model = this.ensureModel();
        const length = Math.hypot(x, y);
        if (!length)
            return false;
        const desiredX = x / length;
        const desiredY = y / length;
        let best = null;
        let bestScore = -Infinity;
        const coords = this.activeCoords(model);
        const routes = model.currentRoutes();
        const cursor = model.currentCursorPoint(coords) ?? { x: 0, y: 0 };
        for (const route of routes) {
            const destination = coords.get(route.destination);
            if (!destination)
                continue;
            const cosine = Math.cos(this.viewRotation);
            const sine = Math.sin(this.viewRotation);
            const offsetX = destination.x - cursor.x;
            const offsetY = destination.y - cursor.y;
            const screenX = offsetX * cosine - offsetY * sine;
            const screenY = offsetX * sine + offsetY * cosine;
            const screenLength = Math.hypot(screenX, screenY);
            const score = screenLength > 1e-9
                ? (screenX * desiredX + screenY * desiredY) / screenLength
                : (routes.length === 1 ? 1 : -Infinity);
            if (score > bestScore + 1e-9 || (Math.abs(score - bestScore) <= 1e-9 && (!best || route.steps < best.steps))) {
                bestScore = score;
                best = route;
            }
        }
        return best ? this.moveAlong(best) : false;
    }
    panBy(dx, dy) {
        if (!this.isFlatMode())
            return;
        this.panX += dx * window.devicePixelRatio;
        this.panY += dy * window.devicePixelRatio;
    }
    zoomAt(factor, x, y) {
        if (!this.isFlatMode())
            return;
        const canvas = this.localDraw.canvas;
        const dpr = window.devicePixelRatio;
        const screenX = x * dpr;
        const screenY = y * dpr;
        const oldZoom = this.zoom;
        this.zoom = clamp(this.zoom * factor, 0.08, this.overviewMode ? 128 : 32);
        const actualFactor = this.zoom / oldZoom;
        const baseX = canvas.width / 2;
        const baseY = canvas.height / 2;
        this.panX = screenX - baseX - actualFactor * (screenX - baseX - this.panX);
        this.panY = screenY - baseY - actualFactor * (screenY - baseY - this.panY);
    }
    resetView() {
        if (!this.isFlatMode()) {
            this.localCamMat = new Rotor();
            this.atlasTile.generateRotors(this.currentTile);
            return;
        }
        this.panX = 0;
        this.panY = 0;
        this.zoom = 1;
        this.viewRotation = 0;
    }
    focusCurrentNode(targetZoom = 32) {
        if (!this.isFlatMode() || !this.overviewMode)
            return false;
        const model = this.ensureModel();
        const coords = model.ensureGlobalLayout();
        const point = model.currentCursorPoint(coords) ?? coords.get(model.currentHash);
        if (!point)
            return false;
        this.zoom = clamp(targetZoom, 0.08, 128);
        const scale = this.worldScale();
        const cosine = Math.cos(this.viewRotation);
        const sine = Math.sin(this.viewRotation);
        const rotatedX = point.x * cosine - point.y * sine;
        const rotatedY = point.x * sine + point.y * cosine;
        this.panX = -rotatedX * scale;
        this.panY = -rotatedY * scale;
        this.hoveredNode = null;
        this.hoveredEdge = null;
        return true;
    }
    toggleOverview() {
        if (!this.isFlatMode())
            return this.overviewMode;
        this.overviewMode = !this.overviewMode;
        if (this.overviewMode)
            this.ensureModel().ensureGlobalLayout();
        this.hoveredNode = null;
        this.hoveredEdge = null;
        this.resetView();
        return this.overviewMode;
    }
    hitTest(tile) {
        const hash = tile.join(",");
        const block = this.getBlock(hash);
        if (!block || block.type === TileBlockType.Wall)
            return false;
        if (block.type === TileBlockType.Road)
            return true;
        if (block.type === TileBlockType.Reward) {
            if (block.text)
                this.hitReward(block, hash);
            return true;
        }
        if (block.type === TileBlockType.Gate || block.type === TileBlockType.Ordinal) {
            const passed = this.onPassGate(block.name ?? hash, block, hash);
            this.invalidateMap();
            return passed;
        }
        return false;
    }
    hitReward(block, hash, isLoading) {
        if (!block)
            return;
        this.onGetReward(block.name ?? hash, block, isLoading);
        if (block.type !== TileBlockType.Gate)
            block.text = "已" + block.text;
        block.type = TileBlockType.Road;
        this.invalidateMap();
        // A few rewards restore themselves asynchronously.
        setTimeout(() => {
            this.invalidateMap();
            this.onLoop();
        }, 5);
    }
    setTileByName(tile, text, type) {
        const block = blockMap.get(nameMap.get(tile));
        if (!block) {
            console.log("no no no!");
            return;
        }
        block.text = text;
        block.type = type;
        this.invalidateMap();
    }
    onPassOrd(hash, ord) {
        genOrdTiles(blockMap, nameMap, this.atlasTile, hash.split(",").map(Number), ord);
        this.invalidateMap();
    }
    updateCharactor(x, y) {
        x *= 10;
        y *= 10;
        const rotation = Quaternion.expset(-x, 0, x * 0.05 + 0.001, y, 0, 0.001414);
        this.localDraw.rotorL.mulsl(rotation[0]).norms();
        this.localDraw.rotorR.mulsr(rotation[1]).norms();
    }
    moveHyperbolicCamera(x, y) {
        this.localCamMat = Rotor.move(x, y).mul(this.localCamMat).normalize();
        if (isNaN(this.localCamMat.r + this.localCamMat.x + this.localCamMat.y + this.localCamMat.z))
            this.localCamMat = new Rotor();
        this.updateCharactor(x, y);
        const position = this.localCamMat.conj().apply(new Hvec());
        this.onStateChange();
        const newDomain = this.atlasTile.isInDomain(position);
        if (newDomain === -1)
            return false;
        const [newHash, direction] = this.atlasTile.getNeighborAndDir(this.currentTile, newDomain, true);
        if (!this.hitTest(newHash)) {
            const normal = this.localCamMat.conj().mul(Rotor.rotate(-Math.PI * 2 * newDomain / this.atlasTile.p)).apply(this.atlasTile.n3);
            const theta = Math.atan2(normal.y, normal.x);
            const distance = Math.hypot(x, y);
            const correctionX = Math.cos(theta) * distance - x;
            const correctionY = Math.sin(theta) * distance - y;
            this.localCamMat = Rotor.move(correctionX, correctionY).mul(this.localCamMat);
            this.updateCharactor(correctionX, correctionY);
            return false;
        }
        this.onStepToAnotherTile();
        const neighborMatrix = this.atlasTile.getNeighborMatrix(direction, newDomain);
        this.atlasTile.generateRotors(newHash);
        this.localCamMat = this.localCamMat.mul(neighborMatrix);
        this.currentTile = newHash;
        return true;
    }
    rotate(angle) {
        if (this.isFlatMode())
            this.viewRotation += angle;
        else
            this.localCamMat = Rotor.rotate(angle).mul(this.localCamMat).normalize();
    }
    moveCam(x, y) {
        return this.isFlatMode() ? this.moveInDirection(x, -y) : this.moveHyperbolicCamera(x, y);
    }
}
//# sourceMappingURL=hworld.js.map

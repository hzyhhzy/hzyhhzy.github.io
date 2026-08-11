import { Hvec, Rotor } from "./algebra.js";
import { PRECOMPUTED_GLOBAL_LAYOUT } from "./flatmap-layout.js?flat-map=41";
import { TileBlockType, blockMap } from "./maploader.js";
const EDGE_KEY_SEPARATOR = "\u0000";
const COMPACT_LAYOUT_DEPTH = 4;
const COMPACT_EDGE_LENGTH = 1.45;
const MINIMUM_NODE_DISTANCE = 1;
const MAXIMUM_COMPACT_LAYOUT_NODES = 80;
const GLOBAL_LAYER_SPACING = 1.8;
const GLOBAL_LAYER_BAND = 0.3999;
const GLOBAL_NODE_CLEARANCE = MINIMUM_NODE_DISTANCE + 1e-4;
const GLOBAL_ALIGNMENT_ITERATIONS = 80;
const GLOBAL_POLISH_ITERATIONS = 320;
const GLOBAL_TARGET_EDGE_LENGTH = 1.55;
const ABSOLUTE_ANGLE_CACHE = new Map();
let DECODED_PRECOMPUTED_GLOBAL_LAYOUT = null;
function hashToTile(hash) {
    return hash ? hash.split(",").map(Number) : [];
}
function originalEdgeKey(a, b) {
    return a < b ? a + EDGE_KEY_SEPARATOR + b : b + EDGE_KEY_SEPARATOR + a;
}
function isHintRoad(block) {
    return block?.type === TileBlockType.Road && !block.name && Boolean(block.text?.trim());
}
function hintParagraph(text) {
    return String(text ?? "").split("\n").map(line => line.trim()).filter(Boolean).join(" ");
}
function wrapAngle(angle) {
    while (angle <= -Math.PI)
        angle += Math.PI * 2;
    while (angle > Math.PI)
        angle -= Math.PI * 2;
    return angle;
}
function deterministicAngle(first, second = 0) {
    let hash = 2166136261;
    const text = `${first}\u0000${second}`;
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) / 0x100000000 * Math.PI * 2;
}
function mean(values) {
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}
function median(values) {
    if (!values.length)
        return 0;
    const ordered = values.slice().sort((first, second) => first - second);
    const middle = Math.floor(ordered.length / 2);
    return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}
/** Least-squares projection onto x[i + 1] - x[i] >= spacing. */
function isotonicMinimumSpacing(values, spacing = GLOBAL_NODE_CLEARANCE) {
    const blocks = [];
    for (let index = 0; index < values.length; index++) {
        blocks.push({ start: index, end: index + 1, value: values[index] - index * spacing, count: 1 });
        while (blocks.length >= 2 && blocks[blocks.length - 2].value > blocks[blocks.length - 1].value) {
            const right = blocks.pop();
            const left = blocks.pop();
            const count = left.count + right.count;
            blocks.push({
                start: left.start,
                end: right.end,
                value: (left.value * left.count + right.value * right.count) / count,
                count,
            });
        }
    }
    const result = new Float64Array(values.length);
    for (const block of blocks) {
        for (let index = block.start; index < block.end; index++)
            result[index] = block.value + index * spacing;
    }
    return result;
}
function angularTargetCosine(degree) {
    const degrees = ({ 2: 52, 3: 42, 4: 34, 5: 28, 6: 24 })[degree] ?? 22;
    return Math.cos(degrees * Math.PI / 180);
}
function codepointCompare(first, second) {
    return first < second ? -1 : first > second ? 1 : 0;
}
function hashSequenceChecksum(hashes) {
    let value = 2166136261;
    for (const hash of hashes) {
        for (let index = 0; index <= hash.length; index++) {
            value ^= index === hash.length ? 0 : hash.charCodeAt(index);
            value = Math.imul(value, 16777619);
        }
    }
    return (value >>> 0).toString(16).padStart(8, "0");
}
function decodedPrecomputedGlobalLayout() {
    if (DECODED_PRECOMPUTED_GLOBAL_LAYOUT)
        return DECODED_PRECOMPUTED_GLOBAL_LAYOUT;
    const binary = atob(PRECOMPUTED_GLOBAL_LAYOUT.data);
    const coordinates = new Float64Array(PRECOMPUTED_GLOBAL_LAYOUT.nodeCount * 2);
    for (let index = 0; index < coordinates.length; index++) {
        const offset = index * 2;
        let value = binary.charCodeAt(offset) | binary.charCodeAt(offset + 1) << 8;
        if (value >= 0x8000)
            value -= 0x10000;
        coordinates[index] = value * PRECOMPUTED_GLOBAL_LAYOUT.scale;
    }
    DECODED_PRECOMPUTED_GLOBAL_LAYOUT = coordinates;
    return coordinates;
}
function absoluteTileAngle(polygon, hash) {
    const cached = ABSOLUTE_ANGLE_CACHE.get(hash);
    if (cached !== undefined)
        return cached;
    const target = hashToTile(hash);
    const current = [];
    let rotor = new Rotor();
    for (const direction of target) {
        const [, reverse] = polygon.getNeighborAndDir(current, direction, false);
        rotor = rotor.mul(polygon.getNeighborMatrix(reverse, direction));
    }
    const point = rotor.apply(new Hvec());
    const angle = Number.isFinite(point.x) && Number.isFinite(point.y)
        ? Math.atan2(-point.y, point.x)
        : deterministicAngle(hash);
    ABSOLUTE_ANGLE_CACHE.set(hash, angle);
    return angle;
}
/**
 * Builds the ordinary planar graph used by the flat-map renderer.
 *
 * Every source tile remains a drawable graph node.  This deliberately keeps
 * the planar view isomorphic to the game map: empty roads, hint roads and
 * dead ends are never folded into another node or hidden inside an edge.
 */
export class FlatMapModel {
    polygon;
    getBlock;
    currentHash;
    sourceNodeHashes = null;
    sourcePassiveRoadHashes = new Set();
    sourceEmptyRoadHashes = new Set();
    nodes = new Map();
    anchors = new Set();
    edges = [];
    anchorEdges = new Map();
    passiveRepresentative = new Map();
    passiveGroups = new Map();
    omittedPassiveLeaves = new Set();
    omittedPassiveRoads = new Set();
    mergedRoadBlocks = new Map();
    rotors = new Map();
    points = new Map();
    sourceCoords = new Map();
    coords = new Map();
    visibleNodes = new Set();
    visibleEdges = [];
    outboundEdges = [];
    localRenderedEdges = [];
    localDepths = new Map();
    layoutExtent = { x: 1, y: 1 };
    layoutStats = { nodeCount: 0, ghostNodeCount: 0, edgeCount: 0, minimumNodeDistance: 1, medianEdgeLength: 1 };
    globalCoords = new Map();
    globalNodes = new Set();
    globalEdges = [];
    globalLayoutResolved = false;
    fixedLayoutUnavailable = false;
    reachableRouteCache = null;
    reachableRegionCache = null;
    usePrecomputedLayout = true;
    // Keep the established location shape for the navigation helpers.  In the
    // full-node map every valid current tile resolves to the "node" variant.
    currentLocation = null;
    globalExtent = { x: 1, y: 1 };
    globalLayoutStats = {
        nodeCount: 0,
        edgeCount: 0,
        componentCount: 0,
        layerCount: 0,
        minimumNodeDistance: 1,
        totalEdgeLength: 0,
        medianEdgeLength: 0,
        edgeLengthP90: 0,
        angularResolutionP10: 0,
        crossingCount: 0,
        layoutMilliseconds: 0,
    };
    constructor(polygon, getBlock, currentHash, sourceRoadSnapshot = null, usePrecomputedLayout = true) {
        this.polygon = polygon;
        this.getBlock = getBlock;
        this.currentHash = currentHash;
        this.usePrecomputedLayout = usePrecomputedLayout;
        if (sourceRoadSnapshot) {
            if (sourceRoadSnapshot.nodeHashes) {
                this.sourceNodeHashes = new Set(sourceRoadSnapshot.nodeHashes);
            }
            this.sourcePassiveRoadHashes = new Set(sourceRoadSnapshot.passiveRoadHashes);
            this.sourceEmptyRoadHashes = new Set(sourceRoadSnapshot.emptyRoadHashes);
        }
        else {
            for (const [hash, block] of blockMap) {
                if (block.type !== TileBlockType.Road || block.name)
                    continue;
                this.sourcePassiveRoadHashes.add(hash);
                if (!block.text?.trim())
                    this.sourceEmptyRoadHashes.add(hash);
            }
        }
        this.buildOriginalGraph();
        this.buildFullGraph();
        this.locateCurrentPosition();
        this.placeRelativeToCurrent();
        this.layoutCompactNeighborhood(COMPACT_LAYOUT_DEPTH);
    }
    /** Creates one drawable edge for every adjacency in the source map. */
    buildFullGraph() {
        this.anchors = new Set(this.nodes.keys());
        for (const hash of this.anchors)
            this.anchorEdges.set(hash, []);
        const visited = new Set();
        for (const [hash, node] of this.nodes) {
            for (const neighbor of node.neighbors) {
                const key = originalEdgeKey(hash, neighbor.hash);
                if (visited.has(key))
                    continue;
                visited.add(key);
                const edge = {
                    id: this.edges.length,
                    a: hash,
                    b: neighbor.hash,
                    path: [hash, neighbor.hash],
                    steps: 1,
                    parallelIndex: 0,
                    parallelCount: 1,
                };
                this.edges.push(edge);
                this.anchorEdges.get(hash)?.push(edge);
                this.anchorEdges.get(neighbor.hash)?.push(edge);
            }
        }
    }
    /**
     * Finds anonymous Road-only, non-functional groups that can be represented by one
     * visual node without changing any gate, reward, named landmark, or
     * traversed corridor.  Two deliberately conservative reductions are used:
     *
     * - a degree-one passive road attached to another passive road is folded
     *   into its parent (a blank dead end may simply disappear);
     * - adjacent degree-two passive roads carrying prose are folded into one
     *   ordered hint chain; wholly blank chains already become edge paths.
     *
     * The original TileBlocks remain untouched.  Map declaration order is the
     * author's narrative order, so it is used to order the merged paragraphs;
     * graph degree chooses the surviving parent/chain representative.
     */
    buildPassiveRoadGroups() {
        const passiveRoads = new Set([...this.nodes]
            .filter(([hash]) => this.sourcePassiveRoadHashes.has(hash))
            .map(([hash]) => hash));
        const parent = new Map([...passiveRoads].map(hash => [hash, hash]));
        const find = hash => {
            let root = hash;
            while (parent.get(root) !== root)
                root = parent.get(root);
            while (parent.get(hash) !== hash) {
                const next = parent.get(hash);
                parent.set(hash, root);
                hash = next;
            }
            return root;
        };
        const union = (first, second) => {
            const a = find(first);
            const b = find(second);
            if (a !== b)
                parent.set(b, a);
        };
        // Degree-two chains containing prose collapse to one prose node.  A
        // wholly blank chain is already contracted by contractEmptyRoads(), so
        // it deliberately gets no surviving representative here.
        const unseenDegreeTwo = new Set([...passiveRoads]
            .filter(hash => this.nodes.get(hash).neighbors.length === 2));
        while (unseenDegreeTwo.size) {
            const start = unseenDegreeTwo.values().next().value;
            const component = [start];
            unseenDegreeTwo.delete(start);
            for (let cursor = 0; cursor < component.length; cursor++) {
                for (const neighbor of this.nodes.get(component[cursor]).neighbors) {
                    if (!unseenDegreeTwo.has(neighbor.hash))
                        continue;
                    unseenDegreeTwo.delete(neighbor.hash);
                    component.push(neighbor.hash);
                }
            }
            const carriesText = component.some(hash => isHintRoad(this.nodes.get(hash).block))
                || component.some(hash => this.nodes.get(hash).neighbors.some(neighbor => passiveRoads.has(neighbor.hash)
                    && this.nodes.get(neighbor.hash).neighbors.length === 1
                    && isHintRoad(this.nodes.get(neighbor.hash).block)));
            if (carriesText && component.length > 1) {
                for (let index = 1; index < component.length; index++)
                    union(component[0], component[index]);
            }
        }
        // Fold passive leaves into a passive parent.  A blank leaf directly
        // attached to a functional tile, or a blank isolated tile, contains
        // neither information nor a route onward, so it can disappear.
        for (const hash of passiveRoads) {
            const node = this.nodes.get(hash);
            if (!node.neighbors.length) {
                if (!node.block.text?.trim())
                    this.omittedPassiveLeaves.add(hash);
                continue;
            }
            if (node.neighbors.length !== 1)
                continue;
            const neighbor = node.neighbors[0].hash;
            if (passiveRoads.has(neighbor))
                union(hash, neighbor);
            else if (!node.block.text?.trim())
                this.omittedPassiveLeaves.add(hash);
        }
        const sourceOrder = new Map([...blockMap.keys()].map((hash, index) => [hash, index]));
        const groups = new Map();
        for (const hash of passiveRoads) {
            const root = find(hash);
            if (!groups.has(root))
                groups.set(root, []);
            groups.get(root).push(hash);
        }
        for (const members of groups.values()) {
            if (members.length < 2)
                continue;
            members.sort((first, second) => (sourceOrder.get(first) ?? Infinity) - (sourceOrder.get(second) ?? Infinity));
            const representative = members.slice().sort((first, second) => {
                const degreeDifference = this.nodes.get(second).neighbors.length - this.nodes.get(first).neighbors.length;
                return degreeDifference || (sourceOrder.get(first) ?? Infinity) - (sourceOrder.get(second) ?? Infinity);
            })[0];
            this.passiveGroups.set(representative, members);
            for (const hash of members)
                this.passiveRepresentative.set(hash, representative);
            this.mergedRoadBlocks.set(representative, {
                ...this.nodes.get(representative).block,
                mergedTexts: members.map(hash => this.nodes.get(hash).block.text).filter(text => text?.trim()),
                text: members.map(hash => hintParagraph(this.nodes.get(hash).block.text)).filter(Boolean).join("\n"),
            });
        }
    }
    displayBlock(hash) {
        const representative = this.passiveRepresentative.get(hash);
        if (!representative)
            return this.nodes.get(hash)?.block ?? this.getBlock(hash);
        if (representative === hash)
            return this.mergedRoadBlocks.get(hash);
        // A legacy save can stand on a source tile that is folded into an edge.
        // Its paragraph is still shown only once on the stable representative.
        const block = this.nodes.get(hash)?.block;
        return block ? { ...block, text: "" } : block;
    }
    mergedRoadCount(hash) {
        return this.passiveGroups.get(hash)?.length ?? 1;
    }
    buildOriginalGraph() {
        // The in-game planar view is a fixed drawing of the map as it exists
        // immediately after initMap().  Ordinal exploration appends procedural
        // tiles to blockMap, but those tiles belong exclusively to the
        // hyperbolic view and must never invalidate the fixed layout.
        const hashes = this.sourceNodeHashes
            ? new Set(this.sourceNodeHashes)
            : new Set(blockMap.keys());
        // Standalone tooling can still construct a model without a source-map
        // snapshot. Preserve its bounded procedural discovery for that case;
        // HWorld always supplies the fixed snapshot above.
        if (!this.sourceNodeHashes) {
            const currentBlock = this.getBlock(this.currentHash);
            if (currentBlock)
                hashes.add(this.currentHash);
            const queue = currentBlock ? [[this.currentHash, 0]] : [];
            const discovered = new Set(queue.map(([hash]) => hash));
            let cursor = 0;
            while (cursor < queue.length && discovered.size < 2048) {
                const [hash, depth] = queue[cursor++];
                if (depth >= 10)
                    continue;
                const tile = hashToTile(hash);
                for (let direction = 0; direction < this.polygon.p; direction++) {
                    const neighbor = this.polygon.getNeighborAndDir(tile, direction, true)[0].join(",");
                    if (discovered.has(neighbor))
                        continue;
                    const block = this.getBlock(neighbor);
                    if (!block)
                        continue;
                    discovered.add(neighbor);
                    hashes.add(neighbor);
                    queue.push([neighbor, depth + 1]);
                }
            }
        }
        for (const hash of hashes) {
            const block = this.getBlock(hash);
            if (block)
                this.nodes.set(hash, { hash, block, neighbors: [] });
        }
        for (const [hash, node] of this.nodes) {
            const tile = hashToTile(hash);
            for (let direction = 0; direction < this.polygon.p; direction++) {
                const [neighborTile, reverse] = this.polygon.getNeighborAndDir(tile, direction, true);
                const neighbor = neighborTile.join(",");
                if (!this.nodes.has(neighbor))
                    continue;
                node.neighbors.push({ hash: neighbor, direction, reverse });
            }
        }
    }
    contractEmptyRoads() {
        for (const [hash, node] of this.nodes) {
            const representative = this.passiveRepresentative.get(hash);
            const foldedRoad = representative && representative !== hash;
            const omittedLeaf = this.omittedPassiveLeaves.has(hash);
            if (!foldedRoad && !omittedLeaf && (!this.sourceEmptyRoadHashes.has(hash) || node.neighbors.length !== 2)) {
                this.anchors.add(hash);
            }
        }
        for (const anchor of this.anchors)
            this.anchorEdges.set(anchor, []);
        const visited = new Set();
        for (const anchor of this.anchors) {
            const start = this.nodes.get(anchor);
            if (!start)
                continue;
            for (const first of start.neighbors) {
                if (visited.has(originalEdgeKey(anchor, first.hash)))
                    continue;
                const path = [anchor];
                let previous = anchor;
                let current = first.hash;
                let guard = 0;
                while (guard++ <= this.nodes.size) {
                    visited.add(originalEdgeKey(previous, current));
                    path.push(current);
                    if (this.anchors.has(current))
                        break;
                    const node = this.nodes.get(current);
                    const next = node?.neighbors.find(neighbor => neighbor.hash !== previous);
                    if (!next) {
                        // A folded degree-one hint is intentionally represented
                        // by its parent.  Its cul-de-sac has no gameplay effect
                        // and therefore does not need a drawable route.
                        const representative = this.passiveRepresentative.get(current);
                        if ((representative && representative !== current) || this.omittedPassiveLeaves.has(current))
                            break;
                        this.anchors.add(current);
                        if (!this.anchorEdges.has(current))
                            this.anchorEdges.set(current, []);
                        break;
                    }
                    previous = current;
                    current = next.hash;
                }
                const destination = path[path.length - 1];
                if (!this.anchors.has(destination)) {
                    for (const hash of path.slice(1))
                        this.omittedPassiveRoads.add(hash);
                    continue;
                }
                const edge = {
                    id: this.edges.length,
                    a: anchor,
                    b: destination,
                    path,
                    steps: path.length - 1,
                };
                this.edges.push(edge);
                this.anchorEdges.get(anchor)?.push(edge);
                if (destination !== anchor)
                    this.anchorEdges.get(destination)?.push(edge);
            }
        }
        const parallelGroups = new Map();
        for (const edge of this.edges) {
            const key = originalEdgeKey(edge.a, edge.b);
            if (!parallelGroups.has(key))
                parallelGroups.set(key, []);
            parallelGroups.get(key).push(edge);
        }
        for (const group of parallelGroups.values()) {
            group.forEach((edge, index) => {
                edge.parallelIndex = index;
                edge.parallelCount = group.length;
            });
        }
    }
    locateCurrentPosition() {
        if (!this.nodes.has(this.currentHash))
            return;
        if (this.anchors.has(this.currentHash)) {
            this.currentLocation = { kind: "node", hash: this.currentHash };
            return;
        }
        for (const edge of this.edges) {
            const index = edge.path.indexOf(this.currentHash);
            if (index <= 0 || index >= edge.path.length - 1)
                continue;
            this.currentLocation = {
                kind: "edge",
                edge,
                index,
                ratio: index / Math.max(1, edge.path.length - 1),
            };
            return;
        }
        // Passive leaves and discarded dead-end chains are not part of any
        // compressed edge.  Keep only the shortest source path back to a real
        // compressed node; the discarded source tiles never enter the graph.
        const queue = [this.currentHash];
        const parent = new Map([[this.currentHash, null]]);
        let destination = null;
        for (let cursor = 0; cursor < queue.length && !destination; cursor++) {
            const hash = queue[cursor];
            for (const neighbor of this.nodes.get(hash)?.neighbors ?? []) {
                if (parent.has(neighbor.hash))
                    continue;
                parent.set(neighbor.hash, hash);
                if (this.anchors.has(neighbor.hash)) {
                    destination = neighbor.hash;
                    break;
                }
                queue.push(neighbor.hash);
            }
        }
        if (!destination)
            return;
        const path = [destination];
        while (path[path.length - 1] !== this.currentHash)
            path.push(parent.get(path[path.length - 1]));
        path.reverse();
        this.currentLocation = { kind: "projection", hash: destination, path };
    }
    currentSeedHashes() {
        if (this.currentLocation?.kind === "node")
            return [this.currentLocation.hash];
        if (this.currentLocation?.kind === "edge") {
            return [...new Set([this.currentLocation.edge.a, this.currentLocation.edge.b])];
        }
        if (this.currentLocation?.kind === "projection")
            return [this.currentLocation.hash];
        return [];
    }
    currentRoutes() {
        if (this.currentLocation?.kind === "node") {
            return (this.anchorEdges.get(this.currentHash) ?? []).map((edge, index) => {
                const fromA = edge.a === this.currentHash;
                const path = fromA ? edge.path : edge.path.slice().reverse();
                return {
                    id: `${edge.id}:${index}:${path[path.length - 1]}`,
                    edge,
                    destination: path[path.length - 1],
                    path,
                    ratio: fromA ? 0 : 1,
                    steps: path.length - 1,
                };
            });
        }
        if (this.currentLocation?.kind === "edge") {
            const { edge, index, ratio } = this.currentLocation;
            const routes = [];
            const toA = edge.path.slice(0, index + 1).reverse();
            const toB = edge.path.slice(index);
            if (toA.length > 1)
                routes.push({
                    id: `${edge.id}:a`, edge, destination: edge.a, path: toA, ratio, steps: toA.length - 1,
                });
            if (toB.length > 1)
                routes.push({
                    id: `${edge.id}:b`, edge, destination: edge.b, path: toB, ratio, steps: toB.length - 1,
                });
            return routes;
        }
        if (this.currentLocation?.kind === "projection") {
            const path = this.currentLocation.path;
            return [{
                    id: `exit:${this.currentLocation.hash}`,
                    edge: null,
                    destination: this.currentLocation.hash,
                    path,
                    ratio: 0,
                    steps: path.length - 1,
                }];
        }
        return [];
    }
    /**
     * Finds every tile that can be reached through Road tiles, plus the first
     * non-wall ring around that Road component.  This is intentionally a
     * read-only graph search: unopened gates and rewards are inspected only by
     * type and never passed to HWorld.hitTest().
     *
     * Each returned route ends either on a reachable Road or on exactly one
     * frontier tile.  Consequently a failed frontier gate leaves the player
     * on the closest reachable Road tile.
     */
    reachableRoutes() {
        if (this.reachableRouteCache)
            return this.reachableRouteCache;
        if (!this.nodes.has(this.currentHash)) {
            this.reachableRegionCache = {
                reachableNodes: new Set(),
                frontierNodes: new Set(),
                highlightedNodes: new Set(),
                highlightedEdgeIds: new Set(),
            };
            return [];
        }
        const parent = new Map([[this.currentHash, null]]);
        const queue = [this.currentHash];
        const frontierParent = new Map();
        let cursor = 0;
        while (cursor < queue.length) {
            const hash = queue[cursor++];
            for (const neighbor of this.nodes.get(hash)?.neighbors ?? []) {
                const block = this.getBlock(neighbor.hash);
                if (!block || block.type === TileBlockType.Wall)
                    continue;
                if (block.type === TileBlockType.Road) {
                    if (parent.has(neighbor.hash))
                        continue;
                    parent.set(neighbor.hash, hash);
                    queue.push(neighbor.hash);
                }
                else if (!parent.has(neighbor.hash) && !frontierParent.has(neighbor.hash)) {
                    frontierParent.set(neighbor.hash, hash);
                }
            }
        }
        const reachableNodes = new Set(parent.keys());
        const frontierNodes = new Set(frontierParent.keys());
        const highlightedNodes = new Set([...reachableNodes, ...frontierNodes]);
        const highlightedEdgeIds = new Set();
        for (const edge of this.edges) {
            if (highlightedNodes.has(edge.a) && highlightedNodes.has(edge.b)) {
                highlightedEdgeIds.add(edge.id);
            }
        }
        this.reachableRegionCache = {
            reachableNodes,
            frontierNodes,
            highlightedNodes,
            highlightedEdgeIds,
        };
        const pathTo = (hash, finalParent = null) => {
            const path = finalParent === null ? [hash] : [hash, finalParent];
            let current = finalParent === null ? parent.get(hash) : parent.get(finalParent);
            while (current !== null && current !== undefined) {
                path.push(current);
                current = parent.get(current);
            }
            path.reverse();
            return path;
        };
        const routes = [];
        for (const hash of parent.keys()) {
            if (hash === this.currentHash)
                continue;
            const path = pathTo(hash);
            routes.push({
                id: `reachable:${hash}`,
                edge: null,
                destination: hash,
                path,
                ratio: 0,
                steps: path.length - 1,
                frontier: false,
            });
        }
        for (const [hash, previous] of frontierParent) {
            const path = pathTo(hash, previous);
            routes.push({
                id: `frontier:${hash}`,
                edge: null,
                destination: hash,
                path,
                ratio: 0,
                steps: path.length - 1,
                frontier: true,
            });
        }
        this.reachableRouteCache = routes;
        return routes;
    }
    reachableRegion() {
        if (!this.reachableRegionCache)
            this.reachableRoutes();
        return this.reachableRegionCache;
    }
    currentCursorPoint(coords) {
        if (this.currentLocation?.kind === "node")
            return coords.get(this.currentLocation.hash) ?? null;
        if (this.currentLocation?.kind === "projection")
            return coords.get(this.currentLocation.hash) ?? null;
        if (this.currentLocation?.kind !== "edge")
            return null;
        const first = coords.get(this.currentLocation.edge.a);
        const second = coords.get(this.currentLocation.edge.b);
        if (!first || !second)
            return null;
        const ratio = this.currentLocation.ratio;
        return {
            x: first.x * (1 - ratio) + second.x * ratio,
            y: first.y * (1 - ratio) + second.y * ratio,
        };
    }
    placeRelativeToCurrent() {
        if (!this.nodes.has(this.currentHash))
            return;
        this.rotors.set(this.currentHash, new Rotor());
        const queue = [this.currentHash];
        let cursor = 0;
        while (cursor < queue.length) {
            const hash = queue[cursor++];
            const rotor = this.rotors.get(hash);
            for (const neighbor of this.nodes.get(hash).neighbors) {
                if (this.rotors.has(neighbor.hash))
                    continue;
                const nextRotor = rotor.mul(this.polygon.getNeighborMatrix(neighbor.reverse, neighbor.direction));
                this.rotors.set(neighbor.hash, nextRotor);
                queue.push(neighbor.hash);
            }
        }
        for (const [hash, rotor] of this.rotors) {
            const point = rotor.apply(new Hvec());
            this.points.set(hash, point);
            // Spatial projection of the unit hyperboloid.  Dividing by two
            // normalises the minimum distance between distinct tile centres
            // to one: |v-w| >= 2 sinh(d(v,w)/2) >= 2.
            this.sourceCoords.set(hash, { x: point.x / 2, y: -point.y / 2 });
        }
    }
    geometricAngle(hash) {
        const point = this.sourceCoords.get(hash);
        if (point) {
            const hasInfiniteCoordinate = !Number.isFinite(point.x) || !Number.isFinite(point.y);
            const finiteX = hasInfiniteCoordinate ? (Number.isFinite(point.x) ? 0 : Math.sign(point.x)) : point.x;
            const finiteY = hasInfiniteCoordinate ? (Number.isFinite(point.y) ? 0 : Math.sign(point.y)) : point.y;
            const maximum = Math.max(Math.abs(finiteX), Math.abs(finiteY));
            if (maximum > 0)
                return Math.atan2(finiteY / maximum, finiteX / maximum);
        }
        return deterministicAngle(hash);
    }
    /**
     * Large unlocked regions are already laid out by the precomputed global
     * planar drawing. Reusing those coordinates keeps rebuilding the local
     * view linear-time after every move instead of running the quadratic
     * compact stress solver over hundreds of Road nodes.
     */
    layoutPrecomputedNeighborhood(hashes, renderedEdges) {
        const stableHashes = [...this.anchors].sort(codepointCompare);
        if (stableHashes.length !== PRECOMPUTED_GLOBAL_LAYOUT.nodeCount
            || hashSequenceChecksum(stableHashes) !== PRECOMPUTED_GLOBAL_LAYOUT.checksum)
            return false;
        const stableIndexes = new Map(stableHashes.map((hash, index) => [hash, index]));
        if (hashes.some(hash => !stableIndexes.has(hash)))
            return false;
        const packed = decodedPrecomputedGlobalLayout();
        const raw = new Map(hashes.map(hash => {
            const index = stableIndexes.get(hash);
            return [hash, { x: packed[index * 2], y: packed[index * 2 + 1] }];
        }));
        const edgeLengths = renderedEdges.map(edge => {
            const first = raw.get(edge.a);
            const second = raw.get(edge.b);
            return Math.hypot(first.x - second.x, first.y - second.y);
        });
        const rawMedianEdgeLength = median(edgeLengths) || COMPACT_EDGE_LENGTH;
        const scale = Math.max(1, COMPACT_EDGE_LENGTH / Math.max(rawMedianEdgeLength, 1e-6));
        this.coords.clear();
        for (const [hash, point] of raw)
            this.coords.set(hash, { x: point.x * scale, y: point.y * scale });
        const cursorPoint = this.currentCursorPoint(this.coords)
            ?? this.coords.get(this.currentHash) ?? { x: 0, y: 0 };
        let extentX = 1;
        let extentY = 1;
        for (const hash of hashes) {
            const point = this.coords.get(hash);
            point.x -= cursorPoint.x;
            point.y -= cursorPoint.y;
            extentX = Math.max(extentX, Math.abs(point.x));
            extentY = Math.max(extentY, Math.abs(point.y));
        }
        this.layoutExtent = { x: extentX, y: extentY };
        this.layoutStats = {
            nodeCount: this.visibleNodes.size,
            ghostNodeCount: hashes.length - this.visibleNodes.size,
            edgeCount: renderedEdges.length,
            minimumNodeDistance: PRECOMPUTED_GLOBAL_LAYOUT.minimumNodeDistance * scale,
            medianEdgeLength: rawMedianEdgeLength * scale,
        };
        return true;
    }
    /**
     * Places only the useful local neighbourhood.  Graph distance controls
     * the layout, not hyperbolic distance or the number of contracted road
     * tiles, so remote branches do not explode towards infinity.
     *
     * This is a deterministic stress-majorisation layout.  It gives every
     * graph edge roughly the same target length, then resolves close pairs
     * and scales the result so distinct visible nodes stay at least one unit
     * apart.  The original graph and every contracted path remain untouched.
     */
    layoutCompactNeighborhood(_maxDepth = COMPACT_LAYOUT_DEPTH) {
        const seeds = this.currentSeedHashes();
        if (!seeds.length)
            return;
        const region = this.reachableRegion();
        this.visibleNodes = new Set(region.highlightedNodes);
        for (const hash of seeds)
            this.visibleNodes.add(hash);
        this.visibleEdges = this.edges.filter(edge => this.visibleNodes.has(edge.a) && this.visibleNodes.has(edge.b));
        this.outboundEdges = this.edges.filter(edge => {
            const firstVisible = this.visibleNodes.has(edge.a);
            const secondVisible = this.visibleNodes.has(edge.b);
            if (firstVisible === secondVisible)
                return false;
            const visible = firstVisible ? edge.a : edge.b;
            if (!region.frontierNodes.has(visible))
                return false;
            const hidden = firstVisible ? edge.b : edge.a;
            const block = this.getBlock(hidden);
            return block && block.type !== TileBlockType.Wall;
        });
        this.localRenderedEdges = [...this.visibleEdges, ...this.outboundEdges];
        const layoutNodes = new Set(this.visibleNodes);
        for (const edge of this.outboundEdges) {
            layoutNodes.add(edge.a);
            layoutNodes.add(edge.b);
        }
        const renderedEdgeIds = new Set(this.localRenderedEdges.map(edge => edge.id));
        const depth = new Map(seeds.filter(hash => layoutNodes.has(hash)).map(hash => [hash, 0]));
        const queue = seeds.slice();
        let cursor = 0;
        while (cursor < queue.length) {
            const hash = queue[cursor++];
            const currentDepth = depth.get(hash);
            for (const edge of this.anchorEdges.get(hash) ?? []) {
                if (!renderedEdgeIds.has(edge.id))
                    continue;
                const other = edge.a === hash ? edge.b : edge.a;
                if (!layoutNodes.has(other) || depth.has(other))
                    continue;
                depth.set(other, currentDepth + 1);
                queue.push(other);
            }
        }
        this.localDepths = depth;
        const rawAngles = new Map([...layoutNodes].map(hash => [hash, this.geometricAngle(hash)]));
        const hashes = [...layoutNodes].sort((first, second) => {
            const byDepth = (depth.get(first) ?? Infinity) - (depth.get(second) ?? Infinity);
            if (byDepth)
                return byDepth;
            const byAngle = (rawAngles.get(first) ?? 0) - (rawAngles.get(second) ?? 0);
            return byAngle || first.localeCompare(second);
        });
        if (hashes.length > MAXIMUM_COMPACT_LAYOUT_NODES
            && this.layoutPrecomputedNeighborhood(hashes, this.localRenderedEdges))
            return;
        const indexes = new Map(hashes.map((hash, index) => [hash, index]));
        const positions = hashes.map(() => ({ x: 0, y: 0 }));
        if (this.currentLocation?.kind === "edge" && seeds.length === 2) {
            const first = this.sourceCoords.get(this.currentLocation.edge.a);
            const second = this.sourceCoords.get(this.currentLocation.edge.b);
            let dx = (second?.x ?? 1) - (first?.x ?? 0);
            let dy = (second?.y ?? 0) - (first?.y ?? 0);
            let length = Math.hypot(dx, dy);
            if (length < 1e-7) {
                const angle = deterministicAngle(seeds[0], seeds[1]);
                dx = Math.cos(angle);
                dy = Math.sin(angle);
                length = 1;
            }
            const ratio = this.currentLocation.ratio;
            const firstPosition = positions[indexes.get(this.currentLocation.edge.a)];
            const secondPosition = positions[indexes.get(this.currentLocation.edge.b)];
            firstPosition.x = -dx / length * COMPACT_EDGE_LENGTH * ratio;
            firstPosition.y = -dy / length * COMPACT_EDGE_LENGTH * ratio;
            secondPosition.x = dx / length * COMPACT_EDGE_LENGTH * (1 - ratio);
            secondPosition.y = dy / length * COMPACT_EDGE_LENGTH * (1 - ratio);
        }
        const maximumDepth = Math.max(0, ...depth.values());
        for (let level = 1; level <= maximumDepth; level++) {
            const levelHashes = hashes.filter(hash => depth.get(hash) === level);
            if (!levelHashes.length)
                continue;
            let sine = 0;
            let cosine = 0;
            for (let index = 0; index < levelHashes.length; index++) {
                const template = -Math.PI + Math.PI * 2 * index / levelHashes.length;
                const difference = rawAngles.get(levelHashes[index]) - template;
                sine += Math.sin(difference);
                cosine += Math.cos(difference);
            }
            const offset = Math.atan2(sine, cosine);
            const radius = level * COMPACT_EDGE_LENGTH;
            for (let index = 0; index < levelHashes.length; index++) {
                const hash = levelHashes[index];
                const rawAngle = rawAngles.get(hash);
                const uniformAngle = -Math.PI + Math.PI * 2 * index / levelHashes.length + offset;
                const angle = rawAngle + wrapAngle(uniformAngle - rawAngle) * 0.45;
                const position = positions[indexes.get(hash)];
                position.x = radius * Math.cos(angle);
                position.y = radius * Math.sin(angle);
            }
        }
        const adjacency = hashes.map(() => []);
        for (const edge of this.localRenderedEdges) {
            const first = indexes.get(edge.a);
            const second = indexes.get(edge.b);
            if (first === second)
                continue;
            adjacency[first].push(second);
            adjacency[second].push(first);
        }
        const distances = hashes.map((_, source) => {
            const result = new Int16Array(hashes.length);
            result.fill(-1);
            result[source] = 0;
            const pending = [source];
            let pendingCursor = 0;
            while (pendingCursor < pending.length) {
                const current = pending[pendingCursor++];
                for (const neighbor of adjacency[current]) {
                    if (result[neighbor] >= 0)
                        continue;
                    result[neighbor] = result[current] + 1;
                    pending.push(neighbor);
                }
            }
            return result;
        });
        const rootIndex = indexes.get(seeds[0]);
        const iterations = hashes.length > 100 ? 120 : 190;
        for (let iteration = 0; iteration < iterations; iteration++) {
            const following = positions.map(() => ({ x: 0, y: 0 }));
            const cooling = 0.42 * (1 - iteration / (iterations + 40));
            for (let source = 0; source < hashes.length; source++) {
                let weightedX = 0;
                let weightedY = 0;
                let totalWeight = 0;
                for (let destination = 0; destination < hashes.length; destination++) {
                    const graphDistance = distances[source][destination];
                    if (graphDistance <= 0)
                        continue;
                    let dx = positions[source].x - positions[destination].x;
                    let dy = positions[source].y - positions[destination].y;
                    let length = Math.hypot(dx, dy);
                    if (length < 1e-7) {
                        const angle = deterministicAngle(hashes[source], hashes[destination]);
                        dx = Math.cos(angle);
                        dy = Math.sin(angle);
                        length = 1;
                    }
                    const weight = 1 / (graphDistance * graphDistance);
                    const desiredLength = COMPACT_EDGE_LENGTH * graphDistance;
                    weightedX += weight * (positions[destination].x + dx / length * desiredLength);
                    weightedY += weight * (positions[destination].y + dy / length * desiredLength);
                    totalWeight += weight;
                }
                const targetX = totalWeight ? weightedX / totalWeight : positions[source].x;
                const targetY = totalWeight ? weightedY / totalWeight : positions[source].y;
                following[source].x = positions[source].x * (1 - cooling) + targetX * cooling;
                following[source].y = positions[source].y * (1 - cooling) + targetY * cooling;
            }
            const root = following[rootIndex];
            for (const position of following) {
                position.x -= root.x;
                position.y -= root.y;
            }
            for (let index = 0; index < positions.length; index++)
                positions[index] = following[index];
        }
        for (let pass = 0; pass < 24; pass++) {
            const displacement = positions.map(() => ({ x: 0, y: 0 }));
            for (let first = 0; first < positions.length; first++) {
                for (let second = first + 1; second < positions.length; second++) {
                    let dx = positions[first].x - positions[second].x;
                    let dy = positions[first].y - positions[second].y;
                    let distance = Math.hypot(dx, dy);
                    if (distance >= MINIMUM_NODE_DISTANCE)
                        continue;
                    if (distance < 1e-7) {
                        const angle = deterministicAngle(hashes[first], hashes[second]);
                        dx = Math.cos(angle) * 1e-4;
                        dy = Math.sin(angle) * 1e-4;
                        distance = 1e-4;
                    }
                    const push = (MINIMUM_NODE_DISTANCE - distance) * 0.52 / distance;
                    displacement[first].x += dx * push;
                    displacement[first].y += dy * push;
                    displacement[second].x -= dx * push;
                    displacement[second].y -= dy * push;
                }
            }
            for (let index = 0; index < positions.length; index++) {
                positions[index].x += displacement[index].x;
                positions[index].y += displacement[index].y;
            }
            const root = positions[rootIndex];
            for (const position of positions) {
                position.x -= root.x;
                position.y -= root.y;
            }
        }
        let minimumDistance = Infinity;
        for (let first = 0; first < positions.length; first++) {
            for (let second = first + 1; second < positions.length; second++) {
                minimumDistance = Math.min(minimumDistance, Math.hypot(positions[first].x - positions[second].x, positions[first].y - positions[second].y));
            }
        }
        if (!Number.isFinite(minimumDistance))
            minimumDistance = MINIMUM_NODE_DISTANCE;
        const edgeLengths = this.localRenderedEdges
            .filter(edge => edge.a !== edge.b)
            .map(edge => {
            const first = positions[indexes.get(edge.a)];
            const second = positions[indexes.get(edge.b)];
            return Math.hypot(first.x - second.x, first.y - second.y);
        })
            .sort((first, second) => first - second);
        const medianEdgeLength = edgeLengths[Math.floor(edgeLengths.length / 2)] || COMPACT_EDGE_LENGTH;
        const scale = Math.max(MINIMUM_NODE_DISTANCE / Math.max(minimumDistance, 1e-6), COMPACT_EDGE_LENGTH / Math.max(medianEdgeLength, 1e-6));
        const referenceRoute = this.currentRoutes().find(route => route.edge && this.visibleEdges.includes(route.edge));
        const referenceHash = referenceRoute?.destination;
        const referenceIndex = referenceHash === undefined ? undefined : indexes.get(referenceHash);
        const referencePosition = referenceIndex === undefined ? null : positions[referenceIndex];
        const rotation = referencePosition
            ? rawAngles.get(referenceHash) - Math.atan2(referencePosition.y, referencePosition.x)
            : 0;
        const rotationCosine = Math.cos(rotation);
        const rotationSine = Math.sin(rotation);
        for (let index = 0; index < hashes.length; index++) {
            const x = positions[index].x * scale;
            const y = positions[index].y * scale;
            const rotated = {
                x: x * rotationCosine - y * rotationSine,
                y: x * rotationSine + y * rotationCosine,
            };
            this.coords.set(hashes[index], rotated);
        }
        const cursorPoint = this.currentCursorPoint(this.coords) ?? { x: 0, y: 0 };
        let extentX = 1;
        let extentY = 1;
        for (const hash of hashes) {
            const point = this.coords.get(hash);
            point.x -= cursorPoint.x;
            point.y -= cursorPoint.y;
            extentX = Math.max(extentX, Math.abs(point.x));
            extentY = Math.max(extentY, Math.abs(point.y));
        }
        this.layoutExtent = { x: extentX, y: extentY };
        this.layoutStats = {
            nodeCount: this.visibleNodes.size,
            ghostNodeCount: hashes.length - this.visibleNodes.size,
            edgeCount: this.localRenderedEdges.length,
            minimumNodeDistance: minimumDistance * scale,
            medianEdgeLength: medianEdgeLength * scale,
        };
    }
    ensureGlobalLayout() {
        if (!this.globalLayoutResolved)
            this.layoutGlobalOverview();
        return this.globalCoords;
    }
    applyPrecomputedGlobalLayout() {
        const stableHashes = [...this.globalNodes].sort(codepointCompare);
        if (stableHashes.length !== PRECOMPUTED_GLOBAL_LAYOUT.nodeCount
            || hashSequenceChecksum(stableHashes) !== PRECOMPUTED_GLOBAL_LAYOUT.checksum)
            return false;
        const coordinates = decodedPrecomputedGlobalLayout();
        stableHashes.forEach((hash, index) => this.globalCoords.set(hash, {
            x: coordinates[index * 2],
            y: coordinates[index * 2 + 1],
        }));
        return true;
    }
    centerGlobalCoordinates() {
        const points = [...this.globalCoords.values()];
        if (!points.length) {
            this.globalExtent = { x: 1, y: 1 };
            return;
        }
        const left = Math.min(...points.map(point => point.x));
        const right = Math.max(...points.map(point => point.x));
        const top = Math.min(...points.map(point => point.y));
        const bottom = Math.max(...points.map(point => point.y));
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        let extentX = 1;
        let extentY = 1;
        for (const [hash, point] of this.globalCoords) {
            const centered = { x: point.x - centerX, y: point.y - centerY };
            this.globalCoords.set(hash, centered);
            extentX = Math.max(extentX, Math.abs(centered.x));
            extentY = Math.max(extentY, Math.abs(centered.y));
        }
        this.globalExtent = { x: extentX, y: extentY };
    }
    crossingInformation(x, y, edgeA, edgeB) {
        let count = 0;
        const involved = new Uint8Array(x.length);
        for (let first = 0; first < edgeA.length; first++) {
            const a = edgeA[first];
            const b = edgeB[first];
            const ax = x[a];
            const ay = y[a];
            const bx = x[b];
            const by = y[b];
            const leftAB = Math.min(ax, bx);
            const rightAB = Math.max(ax, bx);
            const topAB = Math.min(ay, by);
            const bottomAB = Math.max(ay, by);
            for (let second = first + 1; second < edgeA.length; second++) {
                const c = edgeA[second];
                const d = edgeB[second];
                if (a === c || a === d || b === c || b === d)
                    continue;
                const cx = x[c];
                const cy = y[c];
                const dx = x[d];
                const dy = y[d];
                if (Math.max(cx, dx) <= leftAB || Math.min(cx, dx) >= rightAB
                    || Math.max(cy, dy) <= topAB || Math.min(cy, dy) >= bottomAB)
                    continue;
                const sideC = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
                const sideD = (bx - ax) * (dy - ay) - (by - ay) * (dx - ax);
                if (sideC * sideD >= 0)
                    continue;
                const sideA = (dx - cx) * (ay - cy) - (dy - cy) * (ax - cx);
                const sideB = (dx - cx) * (by - cy) - (dy - cy) * (bx - cx);
                if (sideA * sideB >= 0)
                    continue;
                count++;
                involved[a] = involved[b] = involved[c] = involved[d] = 1;
            }
        }
        return { count, involved };
    }
    nearbyPairs(x, y, radius = 1.32) {
        const cells = new Map();
        for (let index = 0; index < x.length; index++) {
            const cellX = Math.floor(x[index] / radius);
            const cellY = Math.floor(y[index] / radius);
            const key = `${cellX},${cellY}`;
            if (!cells.has(key))
                cells.set(key, []);
            cells.get(key).push(index);
        }
        const first = [];
        const second = [];
        const radiusSquared = radius * radius;
        for (let index = 0; index < x.length; index++) {
            const cellX = Math.floor(x[index] / radius);
            const cellY = Math.floor(y[index] / radius);
            for (let offsetX = -1; offsetX <= 1; offsetX++) {
                for (let offsetY = -1; offsetY <= 1; offsetY++) {
                    for (const other of cells.get(`${cellX + offsetX},${cellY + offsetY}`) ?? []) {
                        if (other <= index)
                            continue;
                        const dx = x[other] - x[index];
                        const dy = y[other] - y[index];
                        if (dx * dx + dy * dy >= radiusSquared)
                            continue;
                        first.push(index);
                        second.push(other);
                    }
                }
            }
        }
        return { first, second };
    }
    polishOverviewComponent(x, y, anchorX, anchorY, layerIndexes, edgeA, edgeB, adjacency, rootIndex) {
        const nodeCount = x.length;
        if (nodeCount < 3 || !edgeA.length)
            return;
        const baselineCrossings = this.crossingInformation(x, y, edgeA, edgeB).count;
        const tripleCenter = [];
        const tripleFirst = [];
        const tripleSecond = [];
        const tripleTarget = [];
        for (let center = 0; center < nodeCount; center++) {
            const neighbors = adjacency[center];
            if (neighbors.length < 2)
                continue;
            const target = angularTargetCosine(neighbors.length);
            for (let first = 0; first < neighbors.length; first++) {
                for (let second = first + 1; second < neighbors.length; second++) {
                    tripleCenter.push(center);
                    tripleFirst.push(neighbors[first]);
                    tripleSecond.push(neighbors[second]);
                    tripleTarget.push(target);
                }
            }
        }
        const gradientX = new Float64Array(nodeCount);
        const gradientY = new Float64Array(nodeCount);
        const firstMomentX = new Float64Array(nodeCount);
        const firstMomentY = new Float64Array(nodeCount);
        const secondMomentX = new Float64Array(nodeCount);
        const secondMomentY = new Float64Array(nodeCount);
        let nearby = { first: [], second: [] };
        let betaOnePower = 1;
        let betaTwoPower = 1;
        for (let iteration = 0; iteration < GLOBAL_POLISH_ITERATIONS; iteration++) {
            if (iteration % 10 === 0)
                nearby = this.nearbyPairs(x, y);
            gradientX.fill(0);
            gradientY.fill(0);
            for (let edge = 0; edge < edgeA.length; edge++) {
                const first = edgeA[edge];
                const second = edgeB[edge];
                const dx = x[second] - x[first];
                const dy = y[second] - y[first];
                const length = Math.max(1e-6, Math.hypot(dx, dy));
                const coefficient = 2 * (length - GLOBAL_TARGET_EDGE_LENGTH) / length / edgeA.length;
                const gx = dx * coefficient;
                const gy = dy * coefficient;
                gradientX[first] -= gx;
                gradientY[first] -= gy;
                gradientX[second] += gx;
                gradientY[second] += gy;
            }
            const pairNormalizer = Math.max(1, nodeCount * 4);
            for (let pair = 0; pair < nearby.first.length; pair++) {
                const first = nearby.first[pair];
                const second = nearby.second[pair];
                const dx = x[second] - x[first];
                const dy = y[second] - y[first];
                const length = Math.max(1e-6, Math.hypot(dx, dy));
                let coefficient = 0;
                if (length < 1.04)
                    coefficient += 95 * 2 * (length - 1.04) / length / pairNormalizer;
                if (length < 1.32)
                    coefficient += 1.8 * 2 * (length - 1.32) / length / pairNormalizer;
                const gx = dx * coefficient;
                const gy = dy * coefficient;
                gradientX[first] -= gx;
                gradientY[first] -= gy;
                gradientX[second] += gx;
                gradientY[second] += gy;
            }
            const angularWeight = 24 + 30 * iteration / GLOBAL_POLISH_ITERATIONS;
            const tripleNormalizer = Math.max(1, tripleCenter.length);
            for (let triple = 0; triple < tripleCenter.length; triple++) {
                const center = tripleCenter[triple];
                const first = tripleFirst[triple];
                const second = tripleSecond[triple];
                const firstX = x[first] - x[center];
                const firstY = y[first] - y[center];
                const secondX = x[second] - x[center];
                const secondY = y[second] - y[center];
                const firstLength = Math.max(1e-6, Math.hypot(firstX, firstY));
                const secondLength = Math.max(1e-6, Math.hypot(secondX, secondY));
                const firstUnitX = firstX / firstLength;
                const firstUnitY = firstY / firstLength;
                const secondUnitX = secondX / secondLength;
                const secondUnitY = secondY / secondLength;
                const cosine = firstUnitX * secondUnitX + firstUnitY * secondUnitY;
                if (cosine <= tripleTarget[triple])
                    continue;
                const factor = angularWeight * 2 * (cosine - tripleTarget[triple]) / tripleNormalizer;
                const firstGradientX = factor * (secondUnitX - cosine * firstUnitX) / firstLength;
                const firstGradientY = factor * (secondUnitY - cosine * firstUnitY) / firstLength;
                const secondGradientX = factor * (firstUnitX - cosine * secondUnitX) / secondLength;
                const secondGradientY = factor * (firstUnitY - cosine * secondUnitY) / secondLength;
                gradientX[first] += firstGradientX;
                gradientY[first] += firstGradientY;
                gradientX[second] += secondGradientX;
                gradientY[second] += secondGradientY;
                gradientX[center] -= firstGradientX + secondGradientX;
                gradientY[center] -= firstGradientY + secondGradientY;
            }
            let squaredNorm = 0;
            for (let index = 0; index < nodeCount; index++) {
                gradientX[index] += .004 * (x[index] - anchorX[index]) / nodeCount;
                gradientY[index] += .004 * (y[index] - anchorY[index]) / nodeCount
                    + .08 * 2 * (y[index] - anchorY[index]) / nodeCount;
                squaredNorm += gradientX[index] * gradientX[index] + gradientY[index] * gradientY[index];
            }
            const norm = Math.sqrt(squaredNorm);
            const gradientScale = norm > 10 ? 10 / norm : 1;
            betaOnePower *= .9;
            betaTwoPower *= .999;
            const correctionOne = 1 - betaOnePower;
            const correctionTwo = 1 - betaTwoPower;
            for (let index = 0; index < nodeCount; index++) {
                const gx = gradientX[index] * gradientScale;
                const gy = gradientY[index] * gradientScale;
                firstMomentX[index] = .9 * firstMomentX[index] + .1 * gx;
                firstMomentY[index] = .9 * firstMomentY[index] + .1 * gy;
                secondMomentX[index] = .999 * secondMomentX[index] + .001 * gx * gx;
                secondMomentY[index] = .999 * secondMomentY[index] + .001 * gy * gy;
                x[index] -= .045 * (firstMomentX[index] / correctionOne)
                    / (Math.sqrt(secondMomentX[index] / correctionTwo) + 1e-8);
                y[index] -= .045 * (firstMomentY[index] / correctionOne)
                    / (Math.sqrt(secondMomentY[index] / correctionTwo) + 1e-8);
            }
            for (const indexes of layerIndexes) {
                const projected = isotonicMinimumSpacing(indexes.map(index => x[index]));
                indexes.forEach((index, position) => x[index] = projected[position]);
            }
            for (let index = 0; index < nodeCount; index++) {
                y[index] = Math.max(anchorY[index] - GLOBAL_LAYER_BAND, Math.min(anchorY[index] + GLOBAL_LAYER_BAND, y[index]));
            }
            const rootX = x[rootIndex];
            for (let index = 0; index < nodeCount; index++)
                x[index] -= rootX;
        }
        for (let pass = 0; pass < 16; pass++) {
            const crossings = this.crossingInformation(x, y, edgeA, edgeB);
            if (crossings.count <= baselineCrossings)
                break;
            for (let index = 0; index < nodeCount; index++) {
                if (crossings.involved[index])
                    y[index] = anchorY[index] + (y[index] - anchorY[index]) * .58;
            }
        }
    }
    layoutOverviewComponent(component, optimise = false) {
        const orderedByAngle = [...component].sort((first, second) => {
            const difference = absoluteTileAngle(this.polygon, first) - absoluteTileAngle(this.polygon, second);
            return difference || first.localeCompare(second);
        });
        const root = component.has("") ? "" : orderedByAngle[0];
        const depths = new Map([[root, 0]]);
        const pending = [root];
        let cursor = 0;
        while (cursor < pending.length) {
            const hash = pending[cursor++];
            for (const edge of this.anchorEdges.get(hash) ?? []) {
                const other = edge.a === hash ? edge.b : edge.a;
                if (!component.has(other) || depths.has(other))
                    continue;
                depths.set(other, depths.get(hash) + 1);
                pending.push(other);
            }
        }
        const layers = new Map();
        for (const hash of component) {
            const level = depths.get(hash) ?? 0;
            if (!layers.has(level))
                layers.set(level, []);
            layers.get(level).push(hash);
        }
        for (const nodes of layers.values()) {
            nodes.sort((first, second) => {
                const difference = absoluteTileAngle(this.polygon, first) - absoluteTileAngle(this.polygon, second);
                return difference || first.localeCompare(second);
            });
        }
        const hashes = [...component].sort((first, second) => first.localeCompare(second));
        const indexes = new Map(hashes.map((hash, index) => [hash, index]));
        let x = new Float64Array(hashes.length);
        const y = new Float64Array(hashes.length);
        const depthValues = hashes.map(hash => depths.get(hash) ?? 0);
        const layerIndexes = [...layers.entries()]
            .sort((first, second) => first[0] - second[0])
            .map(([, nodes]) => nodes.map(hash => indexes.get(hash)));
        for (const [level, nodes] of layers) {
            const offset = -(nodes.length - 1) / 2;
            nodes.forEach((hash, position) => {
                const index = indexes.get(hash);
                x[index] = offset + position;
                y[index] = level * GLOBAL_LAYER_SPACING;
            });
        }
        const adjacencySets = hashes.map(() => new Set());
        const edgeA = [];
        const edgeB = [];
        for (const edge of this.edges) {
            if (edge.a === edge.b || !component.has(edge.a) || !component.has(edge.b))
                continue;
            const first = indexes.get(edge.a);
            const second = indexes.get(edge.b);
            edgeA.push(first);
            edgeB.push(second);
            adjacencySets[first].add(second);
            adjacencySets[second].add(first);
        }
        const adjacency = adjacencySets.map(neighbors => [...neighbors]);
        const rootIndex = indexes.get(root);
        for (let iteration = 0; iteration < GLOBAL_ALIGNMENT_ITERATIONS; iteration++) {
            const following = x.slice();
            const blend = .58 * (1 - iteration / (GLOBAL_ALIGNMENT_ITERATIONS + 80));
            for (const indexesInLayer of layerIndexes) {
                const targets = [];
                for (const index of indexesInLayer) {
                    const neighbors = adjacency[index].filter(other => depthValues[other] !== depthValues[index]);
                    const neighborX = neighbors.length ? mean(neighbors.map(other => x[other])) : x[index];
                    targets.push(x[index] * (1 - blend) + neighborX * blend);
                }
                const projected = isotonicMinimumSpacing(targets);
                const offsets = [];
                indexesInLayer.forEach((index, position) => {
                    const neighbors = adjacency[index].filter(other => depthValues[other] !== depthValues[index]);
                    if (neighbors.length)
                        offsets.push(mean(neighbors.map(other => x[other])) - projected[position]);
                });
                const translation = offsets.length ? median(offsets) : -mean(projected);
                indexesInLayer.forEach((index, position) => following[index] = projected[position] + translation);
            }
            const rootX = following[rootIndex];
            for (let index = 0; index < following.length; index++)
                following[index] -= rootX;
            x = following;
        }
        const anchorX = x.slice();
        const anchorY = y.slice();
        if (optimise)
            this.polishOverviewComponent(x, y, anchorX, anchorY, layerIndexes, edgeA, edgeB, adjacency, rootIndex);
        const positions = new Map();
        hashes.forEach((hash, index) => positions.set(hash, { x: x[index], y: y[index] }));
        return {
            positions,
            layerCount: layers.size,
            bounds: {
                left: Math.min(...x),
                right: Math.max(...x),
                top: Math.min(...y),
                bottom: Math.max(...y),
            },
        };
    }
    globalMetrics(componentCount, layerCount, started, knownMinimumNodeDistance = null, knownCrossingCount = null) {
        const hashes = [...this.globalNodes].filter(hash => this.globalCoords.has(hash));
        const indexes = new Map(hashes.map((hash, index) => [hash, index]));
        const x = new Float64Array(hashes.map(hash => this.globalCoords.get(hash).x));
        const y = new Float64Array(hashes.map(hash => this.globalCoords.get(hash).y));
        let minimumNodeDistance = knownMinimumNodeDistance ?? Infinity;
        if (knownMinimumNodeDistance === null) {
            for (let first = 0; first < hashes.length; first++) {
                for (let second = first + 1; second < hashes.length; second++) {
                    minimumNodeDistance = Math.min(minimumNodeDistance, Math.hypot(x[first] - x[second], y[first] - y[second]));
                }
            }
        }
        const edgeLengths = [];
        const edgeA = [];
        const edgeB = [];
        const incidentAngles = hashes.map(() => []);
        for (const edge of this.globalEdges) {
            const first = indexes.get(edge.a);
            const second = indexes.get(edge.b);
            if (first === undefined || second === undefined || first === second)
                continue;
            const dx = x[second] - x[first];
            const dy = y[second] - y[first];
            edgeLengths.push(Math.hypot(dx, dy));
            edgeA.push(first);
            edgeB.push(second);
            incidentAngles[first].push(Math.atan2(dy, dx));
            incidentAngles[second].push(Math.atan2(-dy, -dx));
        }
        edgeLengths.sort((first, second) => first - second);
        const angularGaps = [];
        for (const angles of incidentAngles) {
            if (angles.length < 2)
                continue;
            angles.sort((first, second) => first - second);
            for (let index = 0; index < angles.length; index++) {
                const gap = (angles[(index + 1) % angles.length] - angles[index] + Math.PI * 2) % (Math.PI * 2);
                angularGaps.push(gap * 180 / Math.PI);
            }
        }
        angularGaps.sort((first, second) => first - second);
        const percentile = (values, ratio) => values.length ? values[Math.floor((values.length - 1) * ratio)] : 0;
        return {
            nodeCount: this.globalNodes.size,
            edgeCount: this.globalEdges.length,
            componentCount,
            layerCount,
            minimumNodeDistance: Number.isFinite(minimumNodeDistance) ? minimumNodeDistance : 1,
            totalEdgeLength: edgeLengths.reduce((sum, value) => sum + value, 0),
            medianEdgeLength: percentile(edgeLengths, .5),
            edgeLengthP90: percentile(edgeLengths, .9),
            angularResolutionP10: percentile(angularGaps, .1),
            crossingCount: knownCrossingCount ?? this.crossingInformation(x, y, edgeA, edgeB).count,
            layoutMilliseconds: performance.now() - started,
        };
    }
    /**
     * Creates a stable overview of every source map node.  It starts from
     * the source map's planar cyclic order, aligns connected layers, and then
     * jointly minimises edge length and narrow incident-edge angles.  Ordered
     * one-unit layer projection is a hard constraint, so nodes cannot overlap;
     * a final selective damping pass restores the source layout's crossing
     * count.  Tiny disconnected data components are packed below the map.
     */
    layoutGlobalOverview() {
        const started = performance.now();
        this.globalLayoutResolved = true;
        this.fixedLayoutUnavailable = false;
        this.globalCoords.clear();
        this.globalNodes = new Set(this.anchors);
        this.globalEdges = this.edges.slice();
        if (this.usePrecomputedLayout) {
            if (this.applyPrecomputedGlobalLayout()) {
                this.centerGlobalCoordinates();
                this.globalLayoutStats = this.globalMetrics(PRECOMPUTED_GLOBAL_LAYOUT.componentCount, PRECOMPUTED_GLOBAL_LAYOUT.layerCount, started, PRECOMPUTED_GLOBAL_LAYOUT.minimumNodeDistance, PRECOMPUTED_GLOBAL_LAYOUT.crossingCount);
                return;
            }
            // Never replace the curated planar drawing with the old layered
            // tree fallback in the browser. A mismatched fixed graph is safer
            // to report as unavailable than to silently change geometry.
            this.fixedLayoutUnavailable = true;
            this.globalExtent = { x: 1, y: 1 };
            this.globalLayoutStats = {
                ...this.globalLayoutStats,
                nodeCount: this.globalNodes.size,
                edgeCount: this.globalEdges.length,
                layoutMilliseconds: performance.now() - started,
            };
            return;
        }
        const unvisited = new Set(this.globalNodes);
        const components = [];
        while (unvisited.size) {
            const start = unvisited.values().next().value;
            const component = new Set([start]);
            const pending = [start];
            unvisited.delete(start);
            let cursor = 0;
            while (cursor < pending.length) {
                const hash = pending[cursor++];
                for (const edge of this.anchorEdges.get(hash) ?? []) {
                    const other = edge.a === hash ? edge.b : edge.a;
                    if (!unvisited.has(other))
                        continue;
                    unvisited.delete(other);
                    component.add(other);
                    pending.push(other);
                }
            }
            components.push(component);
        }
        components.sort((first, second) => second.size - first.size);
        const main = components.length ? this.layoutOverviewComponent(components[0], true) : null;
        if (main) {
            const centerX = (main.bounds.left + main.bounds.right) / 2;
            const centerY = (main.bounds.top + main.bounds.bottom) / 2;
            for (const [hash, point] of main.positions) {
                this.globalCoords.set(hash, { x: point.x - centerX, y: point.y - centerY });
            }
        }
        if (main && components.length > 1) {
            const mainWidth = main.bounds.right - main.bounds.left;
            const stripLeft = -mainWidth / 2;
            const stripRight = mainWidth / 2;
            const stripTop = (main.bounds.bottom - main.bounds.top) / 2 + 5;
            let cursorX = stripLeft;
            let cursorY = stripTop;
            let rowHeight = 0;
            for (const component of components.slice(1)) {
                const layout = this.layoutOverviewComponent(component);
                const width = Math.max(2, layout.bounds.right - layout.bounds.left);
                const height = Math.max(2, layout.bounds.bottom - layout.bounds.top);
                if (cursorX + width > stripRight && cursorX > stripLeft) {
                    cursorX = stripLeft;
                    cursorY += rowHeight + 3;
                    rowHeight = 0;
                }
                for (const [hash, point] of layout.positions) {
                    this.globalCoords.set(hash, {
                        x: point.x - layout.bounds.left + cursorX,
                        y: point.y - layout.bounds.top + cursorY,
                    });
                }
                cursorX += width + 3;
                rowHeight = Math.max(rowHeight, height);
            }
        }
        if (!main) {
            this.globalExtent = { x: 1, y: 1 };
            return;
        }
        this.centerGlobalCoordinates();
        this.globalLayoutStats = this.globalMetrics(components.length, main.layerCount, started);
    }
    edgeFromCurrent(edge, destination = null) {
        return this.currentRoutes().find(route => route.edge === edge
            && (destination === null || route.destination === destination))?.path ?? null;
    }
    localEdges(_maxDepth = COMPACT_LAYOUT_DEPTH) {
        return this.localRenderedEdges;
    }
    routePoints(edge, samplesPerStep = 5) {
        const result = [];
        for (let index = 0; index < edge.path.length - 1; index++) {
            const hash = edge.path[index];
            const nextHash = edge.path[index + 1];
            const rotor = this.rotors.get(hash);
            const neighbor = this.nodes.get(hash)?.neighbors.find(candidate => candidate.hash === nextHash);
            if (!rotor || !neighbor)
                continue;
            // Interpolate in the tile's local frame, where values stay small,
            // then transform the sample.  This avoids catastrophic cancellation
            // on long empty corridors whose far-end coordinates are enormous.
            const origin = new Hvec();
            const localTarget = this.polygon.getNeighborMatrix(neighbor.reverse, neighbor.direction).apply(origin);
            const precalculated = Hvec.precalcLerp(origin, localTarget);
            for (let sample = index ? 1 : 0; sample <= samplesPerStep; sample++) {
                const localPoint = Hvec.fastLerp(origin, localTarget, sample / samplesPerStep, precalculated);
                const point = rotor.apply(localPoint);
                result.push({ x: point.x / 2, y: -point.y / 2 });
            }
        }
        return result;
    }
}
//# sourceMappingURL=flatmap.js.map

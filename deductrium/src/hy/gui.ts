import { HWorld } from "./hworld.js";

export class HyperGui {
    canvas = document.getElementById("hyper") as HTMLCanvasElement;
    geometryModeButton = document.getElementById("geometry-mode-toggle") as HTMLButtonElement;
    mapModeButton = document.getElementById("map-mode-toggle") as HTMLButtonElement;
    recenterCurrentButton = document.getElementById("recenter-current") as HTMLButtonElement;
    world = new HWorld(this.canvas);
    moveSpeed = 0.5;
    touchSpeed = 0.1;
    needUpdate = true;
    keyDowns = new Set<string>();
    active = true;
    dragging = false;
    outside = false;
    dragDistance = 0;
    pointerStartX = 0;
    pointerStartY = 0;
    lastPointerX = 0;
    lastPointerY = 0;
    touchDistance = 0;
    prevTime = performance.now();

    constructor() {
        window.onresize = () => this.onresize();
        this.onresize();
        this.updateModeControls();
        this.geometryModeButton.addEventListener("click", () => this.toggleGeometryMode());
        this.mapModeButton.addEventListener("click", () => this.toggleMapMode());
        this.recenterCurrentButton.addEventListener("click", () => this.focusCurrentNode());

        this.canvas.addEventListener("mousedown", event => {
            if (event.button !== 0) return;
            event.preventDefault();
            this.dragging = true;
            this.dragDistance = 0;
            this.pointerStartX = this.lastPointerX = event.offsetX;
            this.pointerStartY = this.lastPointerY = event.offsetY;
            this.outside = !this.world.isFlatMode() && this.world.localDraw.hitTestPoincareDisk(event.offsetX, event.offsetY);
            this.canvas.style.cursor = this.world.isFlatMode() ? "grabbing" : "default";
        });

        this.canvas.addEventListener("mousemove", event => {
            if (this.dragging && (event.buttons & 1)) {
                const dx = event.offsetX - this.lastPointerX;
                const dy = event.offsetY - this.lastPointerY;
                this.dragDistance += Math.hypot(dx, dy);
                if (this.world.isFlatMode()) {
                    this.world.panBy(dx, dy);
                } else if (this.outside) {
                    const centerX = this.canvas.width / 2 / window.devicePixelRatio;
                    const centerY = this.canvas.height / 2 / window.devicePixelRatio;
                    this.world.rotate(
                        Math.atan2(this.lastPointerY - centerY, this.lastPointerX - centerX)
                        - Math.atan2(event.offsetY - centerY, event.offsetX - centerX),
                    );
                } else {
                    this.world.moveCam(-dx / 1000, dy / 1000);
                }
                this.lastPointerX = event.offsetX;
                this.lastPointerY = event.offsetY;
                this.needUpdate = true;
            }
            if (!this.world.isFlatMode()) return;
            const result = this.world.hoverAt(event.offsetX * window.devicePixelRatio, event.offsetY * window.devicePixelRatio);
            if (!this.dragging) this.canvas.style.cursor = result.clickable ? "pointer" : "grab";
            if (result.changed) this.needUpdate = true;
        });

        window.addEventListener("mouseup", event => {
            if (!this.dragging) return;
            const wasClick = this.dragDistance < 5;
            this.dragging = false;
            this.canvas.style.cursor = this.world.isFlatMode() ? "grab" : "default";
            if (wasClick && this.world.isFlatMode()) {
                const rectangle = this.canvas.getBoundingClientRect();
                this.world.activateAt(
                    (event.clientX - rectangle.left) * window.devicePixelRatio,
                    (event.clientY - rectangle.top) * window.devicePixelRatio,
                );
            }
            this.needUpdate = true;
        });

        this.canvas.addEventListener("mouseleave", () => {
            if (!this.dragging && this.world.isFlatMode()) {
                const result = this.world.hoverAt(-1, -1);
                if (result.changed) this.needUpdate = true;
            }
        });

        this.canvas.addEventListener("wheel", event => {
            if (!this.world.isFlatMode()) return;
            event.preventDefault();
            this.world.zoomAt(Math.exp(-event.deltaY * 0.0012), event.offsetX, event.offsetY);
            this.needUpdate = true;
        }, { passive: false });

        this.canvas.addEventListener("dblclick", event => {
            event.preventDefault();
            this.world.resetView();
            this.needUpdate = true;
        });

        document.addEventListener("keydown", event => {
            const target = event.target;
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
            this.keyDowns.add(event.code);
            if (!this.active || event.repeat) return;
            const directions = {
                KeyW: [0, -1], ArrowUp: [0, -1],
                KeyS: [0, 1], ArrowDown: [0, 1],
                KeyA: [-1, 0], ArrowLeft: [-1, 0],
                KeyD: [1, 0], ArrowRight: [1, 0],
            };
            if (directions[event.code]) {
                event.preventDefault();
                if (this.world.isFlatMode()) {
                    const [x, y] = directions[event.code];
                    this.world.moveInDirection(x, y);
                    this.needUpdate = true;
                }
            } else if (event.code === "KeyR") {
                this.world.resetView();
                this.needUpdate = true;
            } else if (event.code === "KeyM" && this.world.isFlatMode() && !this.mapModeButton.hidden) {
                event.preventDefault();
                this.toggleMapMode();
            } else if (event.code === "KeyV") {
                event.preventDefault();
                this.toggleGeometryMode();
            } else if (event.code === "KeyQ" || event.code === "KeyE") {
                this.world.rotate((event.code === "KeyQ" ? -1 : 1) * Math.PI / 12);
                this.needUpdate = true;
            }
        });
        document.addEventListener("keyup", event => this.keyDowns.delete(event.code));
        window.addEventListener("blur", () => this.blur());

        this.canvas.addEventListener("touchstart", event => {
            event.preventDefault();
            if (this.world.isFlatMode() && event.targetTouches.length === 2) {
                this.touchDistance = Math.hypot(
                    event.targetTouches[0].clientX - event.targetTouches[1].clientX,
                    event.targetTouches[0].clientY - event.targetTouches[1].clientY,
                );
                this.dragging = false;
                return;
            }
            const touch = event.targetTouches[0];
            if (!touch) return;
            this.dragging = true;
            this.dragDistance = 0;
            this.pointerStartX = this.lastPointerX = touch.clientX;
            this.pointerStartY = this.lastPointerY = touch.clientY;
            const rectangle = this.canvas.getBoundingClientRect();
            this.outside = !this.world.isFlatMode() && this.world.localDraw.hitTestPoincareDisk(
                touch.clientX - rectangle.left,
                touch.clientY - rectangle.top,
            );
        }, { passive: false });

        this.canvas.addEventListener("touchmove", event => {
            event.preventDefault();
            const rectangle = this.canvas.getBoundingClientRect();
            if (this.world.isFlatMode() && event.targetTouches.length === 2) {
                const first = event.targetTouches[0];
                const second = event.targetTouches[1];
                const distance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
                if (this.touchDistance) this.world.zoomAt(distance / this.touchDistance, (first.clientX + second.clientX) / 2 - rectangle.left, (first.clientY + second.clientY) / 2 - rectangle.top);
                this.touchDistance = distance;
                this.needUpdate = true;
                return;
            }
            const touch = event.targetTouches[0];
            if (!touch || !this.dragging) return;
            const dx = touch.clientX - this.lastPointerX;
            const dy = touch.clientY - this.lastPointerY;
            this.dragDistance += Math.hypot(dx, dy);
            if (this.world.isFlatMode()) {
                this.world.panBy(dx, dy);
            } else if (this.outside) {
                const centerX = rectangle.left + this.canvas.clientWidth / 2;
                const centerY = rectangle.top + this.canvas.clientHeight / 2;
                this.world.rotate(
                    Math.atan2(this.lastPointerY - centerY, this.lastPointerX - centerX)
                    - Math.atan2(touch.clientY - centerY, touch.clientX - centerX),
                );
            } else {
                this.world.moveCam(this.touchSpeed * dx / this.canvas.clientWidth, -this.touchSpeed * dy / this.canvas.clientWidth);
            }
            this.lastPointerX = touch.clientX;
            this.lastPointerY = touch.clientY;
            this.needUpdate = true;
        }, { passive: false });

        this.canvas.addEventListener("touchend", event => {
            event.preventDefault();
            if (this.world.isFlatMode() && this.dragging && this.dragDistance < 7) {
                const rectangle = this.canvas.getBoundingClientRect();
                this.world.activateAt(
                    (this.pointerStartX - rectangle.left) * window.devicePixelRatio,
                    (this.pointerStartY - rectangle.top) * window.devicePixelRatio,
                );
            }
            this.dragging = false;
            this.touchDistance = 0;
            this.needUpdate = true;
        }, { passive: false });

        this.canvas.addEventListener("contextmenu", event => event.preventDefault());
        const prettyPrintInput = document.querySelector("#panel-0 input") as HTMLInputElement;
        prettyPrintInput.onfocus = () => prettyPrintInput.blur();
        prettyPrintInput.addEventListener("change", () => {
            this.world.prettyPrint = !prettyPrintInput.checked;
            this.needUpdate = true;
        });

        this.mainLoop();
    }

    blur() {
        this.keyDowns.clear();
        this.dragging = false;
    }

    updateModeControls() {
        const flat = this.world.isFlatMode();
        this.geometryModeButton.textContent = flat ? "切换到双曲几何 (V)" : "切换到平面图 (V)";
        this.mapModeButton.hidden = true;
        this.mapModeButton.textContent = this.world.overviewMode ? "返回局部地图 (M)" : "显示完整地图 (M)";
        this.recenterCurrentButton.hidden = !flat || !this.world.overviewMode;
        this.canvas.style.cursor = flat ? "grab" : "default";
    }

    toggleGeometryMode() {
        this.world.toggleGeometryMode();
        this.keyDowns.clear();
        this.dragging = false;
        this.updateModeControls();
        this.needUpdate = true;
    }

    toggleMapMode() {
        if (!this.world.isFlatMode()) return;
        this.world.toggleOverview();
        this.updateModeControls();
        this.needUpdate = true;
    }

    focusCurrentNode() {
        if (this.world.focusCurrentNode(32)) this.needUpdate = true;
    }

    onresize() {
        if (!this.canvas.clientHeight || !this.canvas.clientWidth) return;
        this.canvas.width = Math.round(this.canvas.clientWidth * window.devicePixelRatio);
        this.canvas.height = Math.round(this.canvas.clientHeight * window.devicePixelRatio);
        this.needUpdate = true;
        this.world.onLoop();
    }

    mainLoop() {
        const now = performance.now();
        const deltaTime = Math.min((now - this.prevTime) / 1000, 0.3);
        this.prevTime = now;
        if (this.active && !this.world.isFlatMode()) {
            if (this.keyDowns.has("KeyW") || this.keyDowns.has("ArrowUp")) {
                this.world.moveCam(0, this.moveSpeed * deltaTime);
                this.needUpdate = true;
            }
            if (this.keyDowns.has("KeyS") || this.keyDowns.has("ArrowDown")) {
                this.world.moveCam(0, -this.moveSpeed * deltaTime);
                this.needUpdate = true;
            }
            if (this.keyDowns.has("KeyA") || this.keyDowns.has("ArrowLeft")) {
                this.world.moveCam(-this.moveSpeed * deltaTime, 0);
                this.needUpdate = true;
            }
            if (this.keyDowns.has("KeyD") || this.keyDowns.has("ArrowRight")) {
                this.world.moveCam(this.moveSpeed * deltaTime, 0);
                this.needUpdate = true;
            }
        }
        if (this.active && this.needUpdate) {
            this.world.onLoop();
            this.needUpdate = false;
        }
        window.requestAnimationFrame(() => this.mainLoop());
    }
}

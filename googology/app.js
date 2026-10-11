(function bootstrapGoogologyScale(global) {
    'use strict';

    const Core = global.GoogologyScaleCore;
    const I18n = global.GoogologyI18n;
    const MathRenderer = global.GoogologyMath;
    const JUMPS = {
        start: [1.1, 1.6, 0], epsilon: [3.4, 2.2, 0],
        bms: [6.45, 2.2, 0], frontier: [7.4, 1.4, 0],
        pto: [10.5, 1.2, 0], laver: [11, 1.4, 1],
        btbms: [9.5, 1.8, 2], friedman: [12, 1.6, 3],
        end: [15, 2, 0]
    };

    function requireElement(selector) {
        const element = document.querySelector(selector);
        if (!element) throw new Error('Missing scale element: ' + selector);
        return element;
    }

    function searchableText(html) {
        const element = document.createElement('div');
        element.innerHTML = html || '';
        const plain = element.textContent || '';
        return plain.toLowerCase()
            .replace(/\\(?:operatorname|mathrm|text|left|right|!)/g, '')
            .replace(/\\(?:varepsilon|epsilon)/g, 'e')
            .replace(/\\omega/g, 'w')
            .replace(/ε/g, 'e').replace(/ω/g, 'w')
            .replace(/[^a-z0-9\u3400-\u9fff]/g, '');
    }

    class GoogologyScaleApp {
        constructor(data) {
            this.data = data;
            this.elements = {};
            const ids = [
                'app', 'map-viewport', 'ruler-container', 'svg-layer',
                'items-container', 'ticks-container', 'zoom-level',
                'filter-controls', 'check-zoom-level', 'zoom-manual-control',
                'zoom-slider', 'zoom-manual-label', 'controls', 'detail-modal',
                'language-select', 'entry-search', 'entry-directory',
                'directory-toggle', 'search-results', 'result-count',
                'jump-select', 'help-button', 'copy-entry-link'
            ];
            ids.forEach((id) => { this.elements[id] = requireElement('#' + id); });
            this.state = Core.createState();
            this.drag = null;
            this.suppressClick = false;
            this.renderFrame = null;
            this.activeItem = null;
            this.modal = new global.GoogologyDetailModal(this.elements['detail-modal']);
            I18n.availableLocales().forEach((locale) => {
                const option = document.createElement('option');
                option.value = locale.code;
                option.textContent = locale.name;
                this.elements['language-select'].appendChild(option);
            });
            this.syncTranslations();
            this.localized = this.localizeData();
            this.renderer = new global.GoogologyScaleRenderer({
                root: this.elements.app,
                ruler: this.elements['ruler-container'],
                svgLayer: this.elements['svg-layer'],
                itemsContainer: this.elements['items-container'],
                ticksContainer: this.elements['ticks-container'],
                zoomDisplay: this.elements['zoom-level'],
                ...this.localized,
                onOpenDetail: (content, item) => this.openDetail(content, item)
            });
            this.rebuildSearchIndex();
            this.bindControls();
            this.bindViewport();
            this.syncControls();
            I18n.subscribe(() => this.applyLocale());
            window.addEventListener('hashchange', () => this.openHash());
            this.jump('frontier');
            this.openHash();
        }

        localizeData() {
            return {
                items: I18n.localizeItems(this.data.items),
                axisSegments: I18n.localizeAxisSegments(this.data.axisSegments, 'axisSegments'),
                axisSubSegments: I18n.localizeAxisSegments(this.data.axisSubSegments, 'axisSubSegments'),
                branchNames: I18n.localizeBranches(this.data.branchNames)
            };
        }

        syncTranslations() {
            document.title = I18n.t('ui.documentTitle');
            document.querySelectorAll('[data-i18n]').forEach((el) => {
                el.textContent = I18n.t(el.dataset.i18n);
            });
            document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
                el.setAttribute('aria-label', I18n.t(el.dataset.i18nAriaLabel));
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
                el.placeholder = I18n.t(el.dataset.i18nPlaceholder);
            });
            this.elements['language-select'].value = I18n.getLocale();
        }

        applyLocale() {
            const openId = !this.elements['detail-modal'].hidden && this.activeItem;
            this.syncTranslations();
            this.localized = this.localizeData();
            this.renderer.setContent(this.localized);
            this.rebuildSearchIndex();
            this.syncControls();
            this.renderResults();
            if (openId) {
                const item = this.localized.items.find((entry) => entry.id === openId);
                this.openDetail(item.detail, item);
            } else {
                this.modal.close();
            }
            this.renderNow();
        }

        viewport() {
            return { width: this.elements.app.clientWidth, height: this.elements.app.clientHeight };
        }

        bindControls() {
            const el = this.elements;
            el['language-select'].addEventListener('change', () => I18n.setLocale(el['language-select'].value));
            el['filter-controls'].addEventListener('click', (event) => {
                const button = event.target.closest('[data-filter]');
                if (!button) return;
                this.state = { ...this.state, filter: button.dataset.filter };
                this.syncControls();
                this.renderNow();
                this.renderResults();
            });
            el['check-zoom-level'].addEventListener('change', () => {
                this.state = { ...this.state, zoomFilterEnabled: el['check-zoom-level'].checked };
                this.syncControls();
                this.renderNow();
            });
            el['zoom-slider'].addEventListener('input', () => {
                this.state = { ...this.state, manualZoomLevel: Number(el['zoom-slider'].value) };
                this.syncControls();
                this.renderNow();
            });
            el.controls.addEventListener('click', (event) => {
                const button = event.target.closest('button');
                if (!button) return;
                if (button.dataset.action === 'reset') {
                    const width = this.viewport().width;
                    const margin = width < 600 ? 16 : 45;
                    const zoom = (width - margin * 2) / (Core.CONFIG.RULER.END * Core.CONFIG.VIEW.PIXELS_PER_UNIT);
                    this.state = { ...this.state, zoom, offsetX: margin };
                    this.renderNow();
                    this.scrollToBranch(0);
                } else if (button.dataset.zoomFactor) {
                    this.zoom(Number(button.dataset.zoomFactor), this.viewport().width / 2);
                }
            });
            el['jump-select'].addEventListener('change', () => this.jump(el['jump-select'].value));
            el['directory-toggle'].addEventListener('click', () => {
                this.setDirectory(el['entry-directory'].hidden);
                if (!el['entry-directory'].hidden) el['entry-search'].focus();
            });
            el['entry-search'].addEventListener('input', () => {
                this.setDirectory(true);
                this.renderResults();
            });
            el['entry-search'].addEventListener('keydown', (event) => {
                if (event.key === 'Escape') this.setDirectory(false);
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    el['search-results'].querySelector('button')?.focus();
                }
                if (event.key === 'Enter') el['search-results'].querySelector('button')?.click();
            });
            el['search-results'].addEventListener('click', (event) => {
                const button = event.target.closest('[data-item-id]');
                if (button) this.focusItem(button.dataset.itemId);
            });
            el['help-button'].addEventListener('click', () => this.openDetail(I18n.get('guide')));
            el['copy-entry-link'].addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(location.href);
                    el['copy-entry-link'].textContent = I18n.t('ui.copied');
                } catch {
                    el['copy-entry-link'].textContent = I18n.t('ui.copyFallback');
                }
            });
        }

        bindViewport() {
            const app = this.elements.app;
            const scroll = this.elements['map-viewport'];
            app.addEventListener('wheel', (event) => {
                if (event.ctrlKey || event.shiftKey) return;
                event.preventDefault();
                if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                    this.state = Core.panBy(this.state, -event.deltaX, this.viewport().width);
                    this.requestRender();
                } else {
                    const rect = app.getBoundingClientRect();
                    this.zoom(event.deltaY < 0 ? 1.1 : 1 / 1.1, event.clientX - rect.left);
                }
            }, { passive: false });
            app.addEventListener('pointerdown', (event) => {
                if (event.button !== 0 || !event.isPrimary) return;
                this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false, touch: event.pointerType === 'touch' };
                this.suppressClick = false;
            });
            app.addEventListener('pointermove', (event) => {
                const drag = this.drag;
                if (!drag || drag.id !== event.pointerId) return;
                const dx = event.clientX - drag.x;
                const dy = event.clientY - drag.y;
                if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true;
                drag.x = event.clientX;
                drag.y = event.clientY;
                if (drag.moved) {
                    if (!app.hasPointerCapture(event.pointerId)) app.setPointerCapture(event.pointerId);
                    app.classList.add('is-dragging');
                    this.state = Core.panBy(this.state, dx, this.viewport().width);
                    if (!drag.touch) scroll.scrollTop -= dy;
                    this.requestRender();
                }
            });
            const endDrag = (event) => {
                if (!this.drag || this.drag.id !== event.pointerId) return;
                this.suppressClick = this.drag.moved;
                this.drag = null;
                app.classList.remove('is-dragging');
                if (app.hasPointerCapture(event.pointerId)) app.releasePointerCapture(event.pointerId);
            };
            app.addEventListener('pointerup', endDrag);
            app.addEventListener('pointercancel', endDrag);
            app.addEventListener('lostpointercapture', (event) => {
                if (event.target === app) endDrag(event);
            });
            app.addEventListener('click', (event) => {
                if (this.suppressClick) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.suppressClick = false;
                }
            }, true);
            app.addEventListener('keydown', (event) => {
                if (event.target !== app) return;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    this.state = Core.panBy(this.state, event.key === 'ArrowLeft' ? 150 : -150, this.viewport().width);
                    this.renderNow();
                } else if (event.key === '+' || event.key === '=') this.zoom(1.25, this.viewport().width / 2);
                else if (event.key === '-') this.zoom(0.8, this.viewport().width / 2);
                else if (event.key === 'Home') { event.preventDefault(); this.jump('start'); }
                else if (event.key === 'End') { event.preventDefault(); this.jump('end'); }
            });
            window.addEventListener('resize', () => {
                this.state = { ...this.state, offsetX: Core.clampOffset(this.state.offsetX, this.state.zoom, this.viewport().width) };
                this.requestRender();
            });
        }

        syncControls() {
            const el = this.elements;
            el['filter-controls'].querySelectorAll('[data-filter]').forEach((button) => {
                const active = button.dataset.filter === this.state.filter;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', String(active));
            });
            el['check-zoom-level'].checked = this.state.zoomFilterEnabled;
            el['zoom-manual-control'].hidden = this.state.zoomFilterEnabled;
            el['zoom-slider'].value = this.state.manualZoomLevel;
            el['zoom-manual-label'].textContent = I18n.t('ui.filters.manualLevel', { level: this.state.manualZoomLevel });
        }

        setDirectory(open) {
            this.elements['entry-directory'].hidden = !open;
            this.elements['directory-toggle'].setAttribute('aria-expanded', String(open));
            if (open) this.renderResults();
        }

        rebuildSearchIndex() {
            this.searchIndex = this.localized.items.map((item) => {
                const otherLocale = I18n.getLocale() === 'en' ? 'zh-CN' : 'en';
                const other = I18n.get('items.' + item.id, { locale: otherLocale });
                const prose = (item.detail?.sections || []).map((section) => section.type === 'code' ? '' : section.html || '').join(' ');
                const representations = [item, other].flatMap((entry) => entry?.detail?.representations || [])
                    .map((field) => field.label + ' ' + field.html).join(' ');
                return { item, search: searchableText(item.label + ' ' + (other?.label || '') + ' ' + prose + ' ' + representations) };
            }).sort((a, b) => a.item.value - b.item.value);
        }

        renderResults() {
            if (this.elements['entry-directory'].hidden) return;
            const query = searchableText(this.elements['entry-search'].value);
            const matches = this.searchIndex.filter(({ item, search }) =>
                search.includes(query) && Core.passesFilter(Core.createItemModel(item), this.state.filter)
            );
            const fragment = document.createDocumentFragment();
            matches.forEach(({ item }) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.itemId = item.id;
                button.className = 'directory-entry';
                const label = document.createElement('span');
                label.innerHTML = item.label;
                const tag = document.createElement('small');
                tag.textContent = item.branch ? this.localized.branchNames[item.branch].text : I18n.t('ui.mainAxis');
                button.append(label, tag);
                fragment.appendChild(button);
            });
            if (!matches.length) {
                const empty = document.createElement('p');
                empty.className = 'empty-results';
                empty.textContent = I18n.t('ui.noResults');
                fragment.appendChild(empty);
            }
            this.elements['search-results'].replaceChildren(fragment);
            MathRenderer.render(this.elements['search-results']);
            this.elements['result-count'].textContent = I18n.t('ui.resultCount', { count: matches.length });
        }

        jump(key) {
            const target = JUMPS[key] || JUMPS.frontier;
            this.centerOn(target[0], target[1]);
            this.scrollToBranch(target[2]);
        }

        centerOn(value, zoom) {
            const width = this.viewport().width;
            this.state = { ...this.state, zoom, offsetX: Core.clampOffset(width / 2 - value * Core.CONFIG.VIEW.PIXELS_PER_UNIT * zoom, zoom, width) };
            this.renderNow();
        }

        scrollToBranch(branch) {
            const y = this.viewport().height / 2 + (Core.CONFIG.BRANCH_Y_OFFSETS[branch] || 0);
            this.elements['map-viewport'].scrollTop = y - this.elements['map-viewport'].clientHeight / 2;
        }

        focusItem(id) {
            const item = this.localized.items.find((entry) => entry.id === id);
            if (!item) return;
            this.state = { ...this.state, filter: 'all', manualZoomLevel: Math.max(this.state.manualZoomLevel, item.zoomLevel) };
            this.syncControls();
            this.centerOn(item.value, Math.max(1.6, Core.CONFIG.ZOOM_LEVELS[item.zoomLevel] || 0));
            this.scrollToBranch(item.branch || 0);
            this.setDirectory(false);
            const trigger = this.elements.app.querySelector('[data-item-id="' + item.id + '"][role="button"]');
            if (trigger) trigger.focus({ preventScroll: true });
            if (item.detail) this.openDetail(item.detail, item);
        }

        openHash() {
            const id = location.hash.slice(1);
            if (/^item-\d+$/.test(id)) this.focusItem(id);
        }

        openDetail(content, item) {
            this.activeItem = item?.id || null;
            const button = this.elements['copy-entry-link'];
            button.hidden = !this.activeItem;
            button.textContent = I18n.t('ui.copyLink');
            if (this.activeItem) history.replaceState(null, '', '#' + this.activeItem);
            this.modal.show(content);
        }

        zoom(factor, anchorX) {
            const width = this.viewport().width;
            const overviewZoom = (width - (width < 600 ? 32 : 90)) / (Core.CONFIG.RULER.END * Core.CONFIG.VIEW.PIXELS_PER_UNIT);
            this.state = Core.zoomAt(this.state, { factor, anchorX, minZoom: Math.min(overviewZoom, Core.CONFIG.VIEW.MIN_BUTTON_ZOOM), viewportWidth: width });
            this.requestRender();
        }

        requestRender() {
            if (this.renderFrame !== null) return;
            this.renderFrame = window.requestAnimationFrame(() => {
                this.renderFrame = null;
                this.renderer.render(this.state, this.viewport());
            });
        }

        renderNow() {
            if (this.renderFrame !== null) window.cancelAnimationFrame(this.renderFrame);
            this.renderFrame = null;
            this.renderer.render(this.state, this.viewport());
        }
    }

    I18n.initialize({ fallbackLocale: 'zh-CN' });
    new GoogologyScaleApp({ items, axisSegments, axisSubSegments, branchNames });
}(globalThis));

(function bootstrapGoogologyScale(global) {
    'use strict';

    const Core = global.GoogologyScaleCore;
    const Renderer = global.GoogologyScaleRenderer;
    const DetailModal = global.GoogologyDetailModal;
    const I18n = global.GoogologyI18n;

    if (!Core || !Renderer || !DetailModal || !I18n) {
        throw new Error('Googology Scale failed to load its application modules.');
    }

    function requireElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Missing required Googology Scale element: ${selector}`);
        }
        return element;
    }

    class GoogologyScaleApp {
        constructor(data) {
            this.data = data;
            this.i18n = I18n;
            this.elements = {
                app: requireElement('#app'),
                ruler: requireElement('#ruler-container'),
                svgLayer: requireElement('#svg-layer'),
                items: requireElement('#items-container'),
                ticks: requireElement('#ticks-container'),
                zoomDisplay: requireElement('#zoom-level'),
                filterControls: requireElement('#filter-controls'),
                zoomFilter: requireElement('#check-zoom-level'),
                manualZoomControls: requireElement('#zoom-manual-control'),
                zoomSlider: requireElement('#zoom-slider'),
                zoomManualLabel: requireElement('#zoom-manual-label'),
                controls: requireElement('#controls'),
                modal: requireElement('#detail-modal'),
                modalDialog: requireElement('#detail-modal .modal-content'),
                modalClose: requireElement('#detail-modal .modal-close'),
                languageSelect: requireElement('#language-select')
            };

            this.state = Core.createState({
                filter: 'all',
                zoomFilterEnabled: this.elements.zoomFilter.checked,
                manualZoomLevel: Number.parseInt(this.elements.zoomSlider.value, 10)
            });
            this.drag = { active: false, lastX: 0 };
            this.renderFrame = null;

            this.syncLanguageOptions();
            this.syncTranslations();

            const localizedData = this.localizeData();
            this.modal = new DetailModal(this.elements.modal);
            this.renderer = new Renderer({
                root: this.elements.app,
                ruler: this.elements.ruler,
                svgLayer: this.elements.svgLayer,
                itemsContainer: this.elements.items,
                ticksContainer: this.elements.ticks,
                zoomDisplay: this.elements.zoomDisplay,
                items: localizedData.items,
                axisSegments: localizedData.axisSegments,
                axisSubSegments: localizedData.axisSubSegments,
                branchNames: localizedData.branchNames,
                onOpenDetail: (content) => this.modal.show(content)
            });

            this.bindControls();
            this.bindViewportInteractions();
            this.unsubscribeLocale = this.i18n.subscribe(() => {
                this.applyLocale();
            });
            this.syncControls();
            this.resetView();
        }

        localizeData() {
            return {
                items: this.i18n.localizeItems(this.data.items),
                axisSegments: this.i18n.localizeAxisSegments(
                    this.data.axisSegments,
                    'axisSegments'
                ),
                axisSubSegments: this.i18n.localizeAxisSegments(
                    this.data.axisSubSegments,
                    'axisSubSegments'
                ),
                branchNames: this.i18n.localizeBranches(
                    this.data.branchNames
                )
            };
        }

        syncLanguageOptions() {
            const fragment = document.createDocumentFragment();

            this.i18n.availableLocales().forEach((locale) => {
                const option = document.createElement('option');
                option.value = locale.code;
                option.textContent = locale.name;
                fragment.appendChild(option);
            });

            this.elements.languageSelect.replaceChildren(fragment);
            this.elements.languageSelect.value = this.i18n.getLocale();
        }

        syncTranslations() {
            document.title = this.i18n.t('ui.documentTitle');

            document.querySelectorAll('[data-i18n]').forEach((element) => {
                element.textContent = this.i18n.t(element.dataset.i18n);
            });

            document.querySelectorAll('[data-i18n-aria-label]').forEach(
                (element) => {
                    element.setAttribute(
                        'aria-label',
                        this.i18n.t(element.dataset.i18nAriaLabel)
                    );
                }
            );

            this.elements.modalDialog.setAttribute(
                'aria-label',
                this.i18n.t('ui.modalLabel')
            );
            this.elements.modalClose.setAttribute(
                'aria-label',
                this.i18n.t('ui.modalClose')
            );
            this.elements.languageSelect.value = this.i18n.getLocale();
            this.syncManualZoomLabel();
        }

        applyLocale() {
            this.syncTranslations();
            this.renderer.setContent(this.localizeData());
            this.modal.close();
            this.renderNow();
        }

        viewport() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }

        bindControls() {
            this.elements.languageSelect.addEventListener(
                'change',
                () => {
                    this.i18n.setLocale(
                        this.elements.languageSelect.value
                    );
                }
            );

            this.elements.filterControls.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-filter]');
                if (!button || !this.elements.filterControls.contains(button)) {
                    return;
                }

                this.state = {
                    ...this.state,
                    filter: button.dataset.filter
                };
                this.syncFilterButtons();
                this.renderNow();
            });

            this.elements.zoomFilter.addEventListener('change', () => {
                this.state = {
                    ...this.state,
                    zoomFilterEnabled: this.elements.zoomFilter.checked
                };
                this.syncZoomMode();
                this.renderNow();
            });

            this.elements.zoomSlider.addEventListener('input', () => {
                const manualZoomLevel = Number.parseInt(this.elements.zoomSlider.value, 10);
                this.state = {
                    ...this.state,
                    manualZoomLevel
                };
                this.syncManualZoomLabel();
                this.renderNow();
            });

            this.elements.controls.addEventListener('click', (event) => {
                const button = event.target.closest('button');
                if (!button || !this.elements.controls.contains(button)) {
                    return;
                }

                if (button.dataset.action === 'reset') {
                    this.resetView();
                    return;
                }

                if (button.dataset.zoomFactor) {
                    this.changeZoom(
                        Number.parseFloat(button.dataset.zoomFactor),
                        window.innerWidth / 2,
                        Core.CONFIG.VIEW.MIN_BUTTON_ZOOM
                    );
                }
            });
        }

        bindViewportInteractions() {
            this.elements.app.addEventListener('wheel', (event) => {
                if (event.ctrlKey) {
                    return;
                }

                event.preventDefault();
                const factor = event.deltaY < 0
                    ? Core.CONFIG.VIEW.WHEEL_FACTOR
                    : 1 / Core.CONFIG.VIEW.WHEEL_FACTOR;

                this.state = Core.zoomAt(this.state, {
                    factor,
                    anchorX: event.clientX,
                    minZoom: Core.CONFIG.VIEW.MIN_WHEEL_ZOOM,
                    viewportWidth: window.innerWidth
                });
                this.requestRender();
            }, { passive: false });

            this.elements.app.addEventListener('mousedown', (event) => {
                this.drag.active = true;
                this.drag.lastX = event.clientX;
                this.elements.app.classList.add('is-dragging');
            });

            window.addEventListener('mousemove', (event) => {
                if (!this.drag.active) {
                    return;
                }

                const deltaX = event.clientX - this.drag.lastX;
                this.drag.lastX = event.clientX;
                this.state = Core.panBy(this.state, deltaX, window.innerWidth);
                this.requestRender();
            });

            window.addEventListener('mouseup', () => {
                this.drag.active = false;
                this.elements.app.classList.remove('is-dragging');
            });

            window.addEventListener('resize', () => {
                this.state = {
                    ...this.state,
                    offsetX: Core.clampOffset(
                        this.state.offsetX,
                        this.state.zoom,
                        window.innerWidth
                    )
                };
                this.requestRender();
            });
        }

        syncControls() {
            this.syncFilterButtons();
            this.syncZoomMode();
            this.syncManualZoomLabel();
        }

        syncManualZoomLabel() {
            const level = String(this.state.manualZoomLevel);
            this.elements.zoomManualLabel.textContent = this.i18n.t(
                'ui.filters.manualLevel',
                { level }
            );
        }

        syncFilterButtons() {
            this.elements.filterControls.querySelectorAll('button[data-filter]').forEach((button) => {
                const isActive = button.dataset.filter === this.state.filter;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
        }

        syncZoomMode() {
            this.elements.manualZoomControls.hidden = this.state.zoomFilterEnabled;
        }

        resetView() {
            this.state = Core.resetView(this.state, window.innerWidth);
            this.renderNow();
        }

        changeZoom(factor, anchorX, minZoom) {
            this.state = Core.zoomAt(this.state, {
                factor,
                anchorX,
                minZoom,
                viewportWidth: window.innerWidth
            });
            this.renderNow();
        }

        requestRender() {
            if (this.renderFrame !== null) {
                return;
            }

            this.renderFrame = window.requestAnimationFrame(() => {
                this.renderFrame = null;
                this.renderer.render(this.state, this.viewport());
            });
        }

        renderNow() {
            if (this.renderFrame !== null) {
                window.cancelAnimationFrame(this.renderFrame);
                this.renderFrame = null;
            }
            this.renderer.render(this.state, this.viewport());
        }
    }

    I18n.initialize({ fallbackLocale: 'zh-CN' });

    new GoogologyScaleApp({
        items,
        axisSegments,
        axisSubSegments,
        branchNames
    });
}(globalThis));

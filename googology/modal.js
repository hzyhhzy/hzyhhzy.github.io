(function (global) {
    'use strict';

    class GoogologyDetailModal {
        constructor(root) {
            this.documentRenderer = global.GoogologyContentDocument;
            this.root = typeof root === 'string'
                ? document.querySelector(root)
                : root;

            if (!this.documentRenderer) {
                throw new Error(
                    'GoogologyContentDocument must be loaded before modal.js.'
                );
            }

            if (!this.root) {
                throw new Error('GoogologyDetailModal requires a modal root element.');
            }

            this.body = this.root.querySelector('#modal-body');
            this.closeButton = this.root.querySelector('.modal-close');
            this.document = this.root.ownerDocument || document;
            this.previouslyFocused = null;

            if (!this.body || !this.closeButton) {
                throw new Error(
                    'GoogologyDetailModal requires #modal-body and .modal-close elements.'
                );
            }

            this.handleCloseClick = this.close.bind(this);
            this.handleOverlayClick = (event) => {
                if (event.target === this.root) {
                    this.close();
                }
            };
            this.handleKeyDown = (event) => {
                if (this.root.hidden || this.root.querySelector('dialog[open]')) {
                    return;
                }

                if (event.key === 'Tab') {
                    const focusable = Array.from(this.root.querySelectorAll(
                        'button, a[href], input, select, textarea, [tabindex="0"]'
                    )).filter((element) => !element.hidden && !element.disabled && element.getClientRects().length);
                    const first = focusable[0] || this.closeButton;
                    const last = focusable[focusable.length - 1] || first;
                    if (event.shiftKey && this.document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && this.document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                    return;
                }
                if (event.key !== 'Escape') return;

                event.preventDefault();
                event.stopPropagation();
                this.close();
            };

            this.closeButton.addEventListener('click', this.handleCloseClick);
            this.root.addEventListener('click', this.handleOverlayClick);
            this.document.addEventListener('keydown', this.handleKeyDown);
            this.close();
        }

        show(content) {
            if (this.root.hidden) {
                this.previouslyFocused = this.document.activeElement;
            }

            this.documentRenderer.render(this.body, content);
            if (typeof content === 'string') {
                this.enhanceLegacyCodeBlocks();
            }
            this.highlightCodeBlocks();
            if (this.body.parentElement) this.body.parentElement.scrollTop = 0;
            this.setOpen(true);
            this.closeButton.focus();
        }

        close() {
            const wasOpen = !this.root.hidden;
            const focusTarget = this.previouslyFocused;

            this.setOpen(false);
            this.previouslyFocused = null;

            if (
                wasOpen &&
                focusTarget &&
                typeof focusTarget.focus === 'function'
            ) {
                focusTarget.focus();
            }
        }

        showModal(content) {
            this.show(content);
        }

        closeModal() {
            this.close();
        }

        enhanceLegacyCodeBlocks() {
            this.body.querySelectorAll('h3').forEach((header) => {
                const codeBlock = header.nextElementSibling;

                if (
                    !codeBlock
                    || (codeBlock.tagName !== 'CODE' && codeBlock.tagName !== 'PRE')
                ) {
                    return;
                }

                const language = header.innerText.trim();
                const codeHtml = codeBlock.innerHTML.replace(/<br\s*\/?>/gi, '\n');
                const ideWindow = document.createElement('div');
                const ideHeader = document.createElement('div');
                const ideControls = document.createElement('div');
                const ideTitle = document.createElement('div');
                const pre = document.createElement('pre');
                const code = document.createElement('code');

                ideWindow.className = 'ide-window';
                ideHeader.className = 'ide-header';
                ideControls.className = 'ide-controls';
                ideTitle.className = 'ide-title';
                ideTitle.textContent = language;
                pre.className = 'ide-content';
                code.className = `language-${language.toLowerCase()}`;
                code.innerHTML = codeHtml;

                ['red', 'yellow', 'green'].forEach((color) => {
                    const dot = document.createElement('div');
                    dot.className = `ide-dot ${color}`;
                    ideControls.appendChild(dot);
                });

                ideHeader.append(ideControls, ideTitle);
                pre.appendChild(code);
                ideWindow.append(ideHeader, pre);

                header.replaceWith(ideWindow);
                codeBlock.remove();
            });
        }

        highlightCodeBlocks() {
            if (!global.hljs) {
                return;
            }

            this.body.querySelectorAll('pre code').forEach((block) => {
                global.hljs.highlightElement(block);
            });
        }

        setOpen(isOpen) {
            this.root.hidden = !isOpen;
            this.root.setAttribute('aria-hidden', String(!isOpen));
            if (this.document.querySelectorAll) {
                this.document.querySelectorAll('.site-header, .explorer-toolbar, .workspace, .map-footer')
                    .forEach((element) => { element.inert = isOpen; });
            }
        }
    }

    global.GoogologyDetailModal = GoogologyDetailModal;
})(window);

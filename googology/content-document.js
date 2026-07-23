(function createContentDocumentRenderer(global) {
    'use strict';

    function createElement(documentRef, tagName, className) {
        var element = documentRef.createElement(tagName);
        if (className) {
            element.className = className;
        }
        return element;
    }

    function appendHtml(container, html) {
        var template = container.ownerDocument.createElement('template');
        template.innerHTML = html || '';
        container.appendChild(template.content.cloneNode(true));
    }

    function createCodeWindow(documentRef, section) {
        var language = section.language || 'text';
        var title = section.title || language;
        var windowElement = createElement(
            documentRef,
            'div',
            'ide-window'
        );
        var header = createElement(documentRef, 'div', 'ide-header');
        var controls = createElement(documentRef, 'div', 'ide-controls');
        var titleElement = createElement(
            documentRef,
            'div',
            'ide-title'
        );
        var pre = createElement(documentRef, 'pre', 'ide-content');
        var code = createElement(documentRef, 'code');

        ['red', 'yellow', 'green'].forEach(function (color) {
            controls.appendChild(
                createElement(documentRef, 'span', 'ide-dot ' + color)
            );
        });

        titleElement.textContent = title;
        code.className = 'language-' + language.toLowerCase();
        code.textContent = section.source || '';
        pre.appendChild(code);
        header.append(controls, titleElement);
        windowElement.append(header, pre);
        return windowElement;
    }

    function appendList(container, section) {
        var documentRef = container.ownerDocument;
        var list = createElement(
            documentRef,
            section.ordered ? 'ol' : 'ul'
        );

        (section.items || []).forEach(function (item) {
            var listItem = createElement(documentRef, 'li');

            if (typeof item === 'string') {
                listItem.innerHTML = item;
            } else {
                listItem.innerHTML = item.html || '';
                if (item.children) {
                    appendList(listItem, {
                        ordered: Boolean(item.ordered),
                        items: item.children
                    });
                }
            }

            list.appendChild(listItem);
        });

        container.appendChild(list);
    }

    function appendSection(container, section) {
        var documentRef = container.ownerDocument;
        var element;

        switch (section.type) {
            case 'html':
                appendHtml(container, section.html);
                break;
            case 'paragraph':
                element = createElement(documentRef, 'p');
                element.innerHTML = section.html || '';
                container.appendChild(element);
                break;
            case 'heading':
                element = createElement(
                    documentRef,
                    'h' + Math.max(3, Math.min(6, section.level || 3))
                );
                element.innerHTML = section.html || '';
                container.appendChild(element);
                break;
            case 'list':
                appendList(container, section);
                break;
            case 'code':
                container.appendChild(
                    createCodeWindow(documentRef, section)
                );
                break;
            case 'note':
                element = createElement(
                    documentRef,
                    'aside',
                    'detail-note'
                );
                element.innerHTML = section.html || '';
                container.appendChild(element);
                break;
            default:
                throw new Error(
                    'Unsupported content section type: ' + section.type
                );
        }
    }

    function render(container, detail) {
        container.replaceChildren();

        if (!detail) {
            return;
        }

        if (typeof detail === 'string') {
            container.innerHTML = detail;
            if (global.GoogologyMath) {
                global.GoogologyMath.render(container);
            }
            return;
        }

        if (detail.title) {
            var title = createElement(
                container.ownerDocument,
                'h2'
            );
            title.innerHTML = detail.title;
            container.appendChild(title);
        }

        (detail.sections || []).forEach(function (section) {
            appendSection(container, section);
        });

        if (global.GoogologyMath) {
            global.GoogologyMath.render(container);
        }
    }

    function hasCode(detail) {
        if (!detail) {
            return false;
        }

        if (typeof detail === 'string') {
            return detail.includes('<code') || detail.includes('<pre');
        }

        return (detail.sections || []).some(function (section) {
            return section.type === 'code';
        });
    }

    global.GoogologyContentDocument = Object.freeze({
        render: render,
        hasCode: hasCode
    });
}(globalThis));

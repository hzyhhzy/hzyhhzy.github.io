(function createI18nRegistry(global) {
    'use strict';

    var locales = Object.create(null);
    var messages = Object.create(null);
    var listeners = new Set();
    var currentLocale = null;
    var fallbackLocale = 'zh-CN';
    var storageKey = 'googology-scale.locale';

    function isPlainObject(value) {
        return Boolean(value) &&
            typeof value === 'object' &&
            !Array.isArray(value);
    }

    function merge(target, source) {
        Object.keys(source || {}).forEach(function (key) {
            var incoming = source[key];

            if (isPlainObject(incoming)) {
                if (!isPlainObject(target[key])) {
                    target[key] = {};
                }
                merge(target[key], incoming);
                return;
            }

            target[key] = incoming;
        });

        return target;
    }

    function readPath(source, path) {
        return String(path)
            .split('.')
            .reduce(function (value, key) {
                return value == null ? undefined : value[key];
            }, source);
    }

    function interpolate(value, variables) {
        if (typeof value !== 'string' || !variables) {
            return value;
        }

        return value.replace(/\{([a-zA-Z0-9_]+)\}/g, function (
            match,
            key
        ) {
            return Object.prototype.hasOwnProperty.call(variables, key)
                ? String(variables[key])
                : match;
        });
    }

    function registerLocale(definition) {
        if (!definition || !definition.code || !definition.name) {
            throw new Error('A locale requires code and name.');
        }

        locales[definition.code] = Object.freeze({
            code: definition.code,
            name: definition.name,
            direction: definition.direction || 'ltr'
        });

        if (!messages[definition.code]) {
            messages[definition.code] = {};
        }
    }

    function registerMessages(locale, bundle) {
        if (!messages[locale]) {
            messages[locale] = {};
        }
        merge(messages[locale], bundle);
    }

    function hasLocale(locale) {
        return Boolean(locales[locale]);
    }

    function availableLocales() {
        return Object.keys(locales).map(function (code) {
            return locales[code];
        });
    }

    function resolveLocale(requested) {
        if (hasLocale(requested)) {
            return requested;
        }

        var baseLanguage = String(requested || '').split('-')[0];
        var baseMatch = Object.keys(locales).find(function (code) {
            return code.split('-')[0] === baseLanguage;
        });

        if (baseMatch) {
            return baseMatch;
        }

        if (hasLocale(fallbackLocale)) {
            return fallbackLocale;
        }

        return Object.keys(locales)[0] || null;
    }

    function readSavedLocale() {
        try {
            return global.localStorage.getItem(storageKey);
        } catch (error) {
            return null;
        }
    }

    function saveLocale(locale) {
        try {
            global.localStorage.setItem(storageKey, locale);
        } catch (error) {
            // Storage can be unavailable for local files or restricted contexts.
        }
    }

    function initialize(options) {
        var settings = options || {};
        fallbackLocale = settings.fallbackLocale || fallbackLocale;

        var requested = settings.locale ||
            readSavedLocale() ||
            global.document.documentElement.lang ||
            global.navigator.language;
        var resolved = resolveLocale(requested);

        if (!resolved) {
            throw new Error('No Googology Scale locales have been registered.');
        }

        setLocale(resolved, { persist: false, notify: false });
        return currentLocale;
    }

    function setLocale(locale, options) {
        var settings = options || {};
        var resolved = resolveLocale(locale);

        if (!resolved) {
            throw new Error('Unknown locale: ' + locale);
        }

        currentLocale = resolved;
        global.document.documentElement.lang = resolved;
        global.document.documentElement.dir =
            locales[resolved].direction;

        if (settings.persist !== false) {
            saveLocale(resolved);
        }

        if (settings.notify !== false) {
            listeners.forEach(function (listener) {
                listener(resolved);
            });
        }

        return resolved;
    }

    function get(path, options) {
        var settings = options || {};
        var locale = settings.locale || currentLocale;
        var value = readPath(messages[locale], path);

        if (value === undefined && locale !== fallbackLocale) {
            value = readPath(messages[fallbackLocale], path);
        }

        return value;
    }

    function getLocalizedRecord(path) {
        var fallbackValue = readPath(messages[fallbackLocale], path);
        var localizedValue = readPath(messages[currentLocale], path);

        if (localizedValue === undefined) {
            return isPlainObject(fallbackValue)
                ? merge({}, fallbackValue)
                : fallbackValue;
        }

        if (
            isPlainObject(fallbackValue) &&
            isPlainObject(localizedValue)
        ) {
            return merge(
                merge({}, fallbackValue),
                localizedValue
            );
        }

        return localizedValue;
    }

    function t(path, variables, options) {
        var value = get(path, options);
        return interpolate(
            typeof value === 'string' ? value : String(path),
            variables
        );
    }

    function localizeItems(items) {
        return items.map(function (item) {
            var content = getLocalizedRecord('items.' + item.id);

            if (!content) {
                throw new Error(
                    'Missing item translation for ' +
                    item.id +
                    ' in ' +
                    currentLocale
                );
            }

            return Object.assign({}, item, content);
        });
    }

    function localizeAxisSegments(segments, namespace) {
        return segments.map(function (segment) {
            var content = getLocalizedRecord(
                namespace + '.' + segment.id
            );

            if (!content) {
                throw new Error(
                    'Missing axis translation for ' +
                    segment.id +
                    ' in ' +
                    currentLocale
                );
            }

            return Object.assign({}, segment, content);
        });
    }

    function localizeBranches(branches) {
        return Object.keys(branches).reduce(function (localized, key) {
            var branch = branches[key];
            var content = getLocalizedRecord(
                'branches.' + branch.id
            );

            if (!content) {
                throw new Error(
                    'Missing branch translation for ' +
                    branch.id +
                    ' in ' +
                    currentLocale
                );
            }

            localized[key] = Object.assign({}, branch, content);
            return localized;
        }, {});
    }

    function subscribe(listener) {
        listeners.add(listener);
        return function unsubscribe() {
            listeners.delete(listener);
        };
    }

    global.GoogologyI18n = Object.freeze({
        registerLocale: registerLocale,
        registerMessages: registerMessages,
        initialize: initialize,
        setLocale: setLocale,
        getLocale: function () {
            return currentLocale;
        },
        get: get,
        t: t,
        hasLocale: hasLocale,
        availableLocales: availableLocales,
        localizeItems: localizeItems,
        localizeAxisSegments: localizeAxisSegments,
        localizeBranches: localizeBranches,
        subscribe: subscribe
    });
}(globalThis));

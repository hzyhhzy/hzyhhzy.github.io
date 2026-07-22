(function () {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  var STORAGE_KEY = "preferred-language";
  var DEFAULT_LANGUAGE = "en";
  var supportedLanguages = ["en", "zh"];
  var textFallbacks = new WeakMap();
  var attributeFallbacks = new WeakMap();
  var lastDialogTrigger = null;

  function normalizeLanguage(value) {
    if (!value) return DEFAULT_LANGUAGE;
    var normalized = String(value).trim().toLowerCase();
    if (normalized === "zh" || normalized === "zh-cn" || normalized.indexOf("zh-") === 0) {
      return "zh";
    }
    return supportedLanguages.indexOf(normalized) !== -1 ? normalized : DEFAULT_LANGUAGE;
  }

  function readStoredLanguage() {
    try {
      return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // The preference remains active for this page when storage is unavailable.
    }
  }

  function readDictionary() {
    var source = document.getElementById("page-i18n");
    if (!source) return {};
    try {
      return JSON.parse(source.textContent || "{}");
    } catch (error) {
      return {};
    }
  }

  var dictionary = readDictionary();

  function translation(language, key) {
    if (!key) return undefined;
    if (dictionary[language] && Object.prototype.hasOwnProperty.call(dictionary[language], key)) {
      return dictionary[language][key];
    }
    if (language === "zh" && dictionary["zh-CN"] && Object.prototype.hasOwnProperty.call(dictionary["zh-CN"], key)) {
      return dictionary["zh-CN"][key];
    }
    return undefined;
  }

  function rememberText(element) {
    if (!textFallbacks.has(element)) textFallbacks.set(element, element.textContent);
    return textFallbacks.get(element);
  }

  function rememberAttribute(element, attribute) {
    var values = attributeFallbacks.get(element);
    if (!values) {
      values = {};
      attributeFallbacks.set(element, values);
    }
    if (!Object.prototype.hasOwnProperty.call(values, attribute)) {
      values[attribute] = element.getAttribute(attribute);
    }
    return values[attribute];
  }

  function applyTextTranslations(language) {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var fallback = rememberText(element);
      var translated = translation(language, element.dataset.i18n);
      element.textContent = translated === undefined ? fallback : translated;
    });

    document.querySelectorAll("[data-en][data-zh]").forEach(function (element) {
      rememberText(element);
      element.textContent = language === "zh" ? element.dataset.zh : element.dataset.en;
    });

    document.querySelectorAll("[data-lang-content]").forEach(function (element) {
      element.hidden = normalizeLanguage(element.dataset.langContent) !== language;
    });
  }

  function setTranslatedAttribute(element, attribute, key, language) {
    var fallback = rememberAttribute(element, attribute);
    var translated = translation(language, key);
    var nextValue = translated === undefined ? fallback : translated;
    if (nextValue === null || nextValue === undefined) {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, nextValue);
    }
  }

  function applyAttributeTranslations(language) {
    document.querySelectorAll("[data-i18n-content]").forEach(function (element) {
      setTranslatedAttribute(element, "content", element.dataset.i18nContent, language);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      setTranslatedAttribute(element, "aria-label", element.dataset.i18nAriaLabel, language);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      setTranslatedAttribute(element, "placeholder", element.dataset.i18nPlaceholder, language);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (element) {
      element.dataset.i18nAttr.split(";").forEach(function (pair) {
        var separator = pair.indexOf(":");
        if (separator < 1) return;
        var attribute = pair.slice(0, separator).trim();
        var key = pair.slice(separator + 1).trim();
        if (attribute && key) setTranslatedAttribute(element, attribute, key, language);
      });
    });
  }

  function controlLanguage(control) {
    return normalizeLanguage(
      control.dataset.languageOption ||
      control.dataset.langOption ||
      control.value
    );
  }

  function updateControls(language) {
    document.querySelectorAll("[data-language-option], [data-lang-option]").forEach(function (control) {
      var active = controlLanguage(control) === language;
      control.setAttribute("aria-pressed", active ? "true" : "false");
      if (active) control.setAttribute("aria-current", "true");
      else control.removeAttribute("aria-current");
    });

    document.querySelectorAll("[data-language-select]").forEach(function (select) {
      select.value = language;
    });
  }

  function applyLanguage(value, options) {
    var language = normalizeLanguage(value);
    var settings = options || {};
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.language = language;
    applyTextTranslations(language);
    applyAttributeTranslations(language);
    updateControls(language);
    if (settings.persist !== false) storeLanguage(language);
    document.dispatchEvent(new CustomEvent("languagechange", {
      detail: { language: language }
    }));
  }

  function setupLanguageControls() {
    document.addEventListener("click", function (event) {
      var control = event.target.closest("[data-language-option], [data-lang-option]");
      if (!control) return;
      applyLanguage(controlLanguage(control));
    });

    document.addEventListener("change", function (event) {
      if (!event.target.matches("[data-language-select]")) return;
      applyLanguage(event.target.value);
    });

    window.addEventListener("storage", function (event) {
      if (event.key === STORAGE_KEY) applyLanguage(event.newValue, { persist: false });
    });
  }

  function setupDialogs() {
    document.addEventListener("click", function (event) {
      var openControl = event.target.closest("[data-dialog-open]");
      if (openControl) {
        var dialogId = openControl.dataset.dialogOpen || openControl.getAttribute("aria-controls") || "";
        var dialog = document.getElementById(dialogId.replace(/^#/, ""));
        if (!dialog) return;
        lastDialogTrigger = openControl;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        return;
      }

      var closeControl = event.target.closest("[data-dialog-close]");
      if (closeControl) {
        var parentDialog = closeControl.closest("dialog");
        if (closeControl.closest('form[method="dialog"]')) return;
        if (parentDialog && typeof parentDialog.close === "function") parentDialog.close();
        else if (parentDialog) parentDialog.removeAttribute("open");
      }

      if (typeof HTMLDialogElement !== "undefined" && event.target instanceof HTMLDialogElement && event.target.open) {
        var bounds = event.target.getBoundingClientRect();
        var inside = event.clientX >= bounds.left && event.clientX <= bounds.right &&
          event.clientY >= bounds.top && event.clientY <= bounds.bottom;
        if (!inside) event.target.close();
      }
    });

    document.querySelectorAll("dialog").forEach(function (dialog) {
      dialog.addEventListener("close", function () {
        if (lastDialogTrigger && document.contains(lastDialogTrigger)) lastDialogTrigger.focus();
        lastDialogTrigger = null;
      });
    });
  }

  function setupCatalog() {
    var search = document.querySelector("[data-catalog-search]");
    var items = Array.from(document.querySelectorAll("[data-catalog-item]"));
    var filters = Array.from(document.querySelectorAll("[data-catalog-filter]"));
    if (!items.length || (!search && !filters.length)) return;

    var activeFilter = "all";

    function filterValue(control) {
      return (control.dataset.catalogFilter || control.value || "all").toLowerCase();
    }

    function searchableText(item) {
      var bilingualText = Array.from(item.querySelectorAll("[data-i18n]")).map(function (element) {
        var english = rememberText(element);
        var chinese = translation("zh", element.dataset.i18n) || "";
        return english + " " + chinese;
      }).join(" ");
      return ((item.dataset.search || "") + " " + item.textContent + " " + bilingualText).toLocaleLowerCase();
    }

    function updateCount(count) {
      document.querySelectorAll("[data-catalog-count]").forEach(function (element) {
        var templateKey = element.dataset.i18nCount;
        var language = document.documentElement.dataset.language || DEFAULT_LANGUAGE;
        var template = templateKey ? translation(language, templateKey) : undefined;
        if (template === undefined && element.dataset.countTemplateEn && element.dataset.countTemplateZh) {
          template = language === "zh" ? element.dataset.countTemplateZh : element.dataset.countTemplateEn;
        }
        element.textContent = template === undefined ? String(count) : String(template).replace("{count}", count);
      });
      document.querySelectorAll("[data-catalog-empty]").forEach(function (element) {
        element.hidden = count !== 0;
      });
    }

    function applyCatalogFilters() {
      var query = search ? search.value.trim().toLocaleLowerCase() : "";
      var visibleCount = 0;
      items.forEach(function (item) {
        var types = (item.dataset.resourceTypes || "").toLowerCase().split(/[\s,]+/).filter(Boolean);
        var matchesType = activeFilter === "all" || types.indexOf(activeFilter) !== -1;
        var matchesQuery = !query || searchableText(item).indexOf(query) !== -1;
        item.hidden = !(matchesType && matchesQuery);
        if (!item.hidden) visibleCount += 1;
      });
      document.querySelectorAll("[data-catalog-section]").forEach(function (section) {
        section.hidden = !section.querySelector("[data-catalog-item]:not([hidden])");
      });
      document.querySelectorAll("[data-catalog-directory]").forEach(function (directory) {
        var visibleLinks = 0;
        directory.querySelectorAll('a[href^="#"]').forEach(function (link) {
          var target = document.getElementById(link.getAttribute("href").slice(1));
          var item = link.closest("li") || link;
          item.hidden = Boolean(target && target.hidden);
          if (!item.hidden) visibleLinks += 1;
        });
        directory.hidden = visibleLinks === 0;
      });
      updateCount(visibleCount);
    }

    if (search) search.addEventListener("input", applyCatalogFilters);
    filters.forEach(function (control) {
      control.addEventListener("click", function () {
        activeFilter = filterValue(control);
        filters.forEach(function (candidate) {
          candidate.setAttribute("aria-pressed", filterValue(candidate) === activeFilter ? "true" : "false");
        });
        applyCatalogFilters();
      });
    });
    document.addEventListener("languagechange", applyCatalogFilters);
    applyCatalogFilters();
  }

  setupLanguageControls();
  setupDialogs();
  applyLanguage(readStoredLanguage(), { persist: false });
  setupCatalog();
})();

(function () {
  "use strict";

  var page = document.querySelector(".prototype-page");
  if (!page) return;

  var groups = Array.from(page.querySelectorAll("[data-ledger-group]"));
  var expandAll = page.querySelector("[data-ledger-expand-all]");
  var collapseAll = page.querySelector("[data-ledger-collapse-all]");
  var viewport = page.querySelector("[data-ledger-viewport]");
  var table = page.querySelector("[data-ledger-table]");
  var topScroll = page.querySelector("[data-ledger-top-scroll]");
  var topSpacer = page.querySelector("[data-ledger-top-spacer]");
  var dialog = document.getElementById("ledger-detail-dialog");
  var dialogTitle = dialog ? dialog.querySelector("[data-ledger-dialog-title]") : null;
  var dialogKicker = dialog ? dialog.querySelector("[data-ledger-dialog-kicker]") : null;
  var dialogBody = dialog ? dialog.querySelector("[data-ledger-dialog-body]") : null;
  var dialogClose = dialog ? dialog.querySelector(".ledger-dialog-close") : null;
  var activeTrigger = null;
  var activeTemplateId = "";
  var activeKind = "";

  function language() {
    return document.documentElement.dataset.language === "zh" ? "zh" : "en";
  }

  function setGroupCollapsed(group, collapsed) {
    var toggle = group.querySelector("[data-ledger-toggle]");
    var openLabel = group.querySelector("[data-ledger-open]");
    var closedLabel = group.querySelector("[data-ledger-closed]");
    group.classList.toggle("is-collapsed", collapsed);
    if (toggle) toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    if (openLabel) openLabel.hidden = collapsed;
    if (closedLabel) closedLabel.hidden = !collapsed;
  }

  function groupHasVisibleRows(group) {
    return Array.from(group.querySelectorAll("[data-catalog-item]")).some(function (row) {
      return !row.hidden;
    });
  }

  function revealMatchingGroups() {
    groups.forEach(function (group) {
      if (!group.hidden && groupHasVisibleRows(group)) setGroupCollapsed(group, false);
    });
  }

  function updateLanguageDependentUi() {
    var currentLanguage = language();
    var search = page.querySelector("[data-catalog-search]");
    if (search) {
      search.placeholder = currentLanguage === "zh" ? search.dataset.placeholderZh : search.dataset.placeholderEn;
    }
    if (dialogClose) dialogClose.setAttribute("aria-label", currentLanguage === "zh" ? "关闭" : "Close");
    if (dialog && dialog.open && activeTemplateId) renderActiveDialog();
  }

  function setupAccessibleActionNames() {
    page.querySelectorAll("[data-catalog-item]").forEach(function (row, rowIndex) {
      var title = row.querySelector(".game-title");
      if (!title) return;
      if (!title.id) title.id = "ledger-game-title-" + (rowIndex + 1);
      row.querySelectorAll("[data-ledger-dialog]").forEach(function (button, actionIndex) {
        var label = button.querySelector("[data-en][data-zh]");
        if (!label) return;
        if (!label.id) label.id = "ledger-action-label-" + (rowIndex + 1) + "-" + (actionIndex + 1);
        button.setAttribute("aria-labelledby", title.id + " " + label.id);
        button.setAttribute("aria-controls", "ledger-detail-dialog");
      });
    });
  }

  function renderActiveDialog() {
    if (!dialog || !dialogBody || !dialogTitle || !dialogKicker || !activeTemplateId || !activeTrigger) return;
    var template = document.getElementById(activeTemplateId);
    if (!template || !template.content) return;
    var currentLanguage = language();
    var content = template.content.querySelector('[data-detail-lang="' + currentLanguage + '"]');
    var row = activeTrigger.closest("[data-catalog-item]");
    var gameTitle = row ? row.querySelector(".game-title") : null;
    dialogTitle.textContent = gameTitle ? gameTitle.textContent.trim() : "";
    dialogKicker.textContent = activeKind === "rules"
      ? (currentLanguage === "zh" ? "规则" : "Rules")
      : (currentLanguage === "zh" ? "结论" : "Finding");
    dialogBody.replaceChildren(content ? content.cloneNode(true) : document.createTextNode(""));
    dialogBody.scrollTop = 0;
  }

  function openDialog(trigger) {
    if (!dialog) return;
    activeTrigger = trigger;
    activeTemplateId = trigger.dataset.template || "";
    activeKind = trigger.dataset.ledgerDialog || "details";
    renderActiveDialog();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function jumpToGroup(targetId) {
    if (!viewport || !table) return;
    var target = document.getElementById(targetId);
    if (!target) return;
    if (target.matches("[data-ledger-group]")) setGroupCollapsed(target, false);
    var firstRow = target.querySelector("tr");
    var header = table.tHead;
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    if (firstRow) {
      viewport.scrollTo({
        top: Math.max(0, firstRow.offsetTop - headerHeight),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }
  }

  function updateTopScrollbar() {
    if (!viewport || !table || !topScroll || !topSpacer) return;
    var reservedGutter = Math.max(0, topScroll.clientWidth - viewport.clientWidth);
    topSpacer.style.width = table.scrollWidth + reservedGutter + "px";
    topScroll.hidden = table.scrollWidth <= viewport.clientWidth + 1;
    if (!topScroll.hidden) topScroll.scrollLeft = viewport.scrollLeft;
  }

  function mirrorScroll(source, destination) {
    if (!destination) return;
    if (Math.abs(destination.scrollLeft - source.scrollLeft) > 0.5) {
      destination.scrollLeft = source.scrollLeft;
    }
  }

  function moveTopScrollbarWithKeyboard(event) {
    if (!topScroll || !viewport) return;
    var step = Math.max(48, Math.round(viewport.clientWidth * 0.12));
    var next = topScroll.scrollLeft;
    if (event.key === "ArrowRight") next += step;
    else if (event.key === "ArrowLeft") next -= step;
    else if (event.key === "PageDown") next += viewport.clientWidth * 0.8;
    else if (event.key === "PageUp") next -= viewport.clientWidth * 0.8;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = topScroll.scrollWidth;
    else return;
    event.preventDefault();
    topScroll.scrollLeft = next;
    mirrorScroll(topScroll, viewport);
  }

  groups.forEach(function (group) {
    setGroupCollapsed(group, false);
  });

  page.addEventListener("click", function (event) {
    var dialogTrigger = event.target.closest("[data-ledger-dialog]");
    if (dialogTrigger) {
      openDialog(dialogTrigger);
      return;
    }

    var toggle = event.target.closest("[data-ledger-toggle]");
    if (toggle) {
      var group = toggle.closest("[data-ledger-group]");
      if (group) setGroupCollapsed(group, !group.classList.contains("is-collapsed"));
      return;
    }

    if (event.target.closest("[data-ledger-expand-all]")) {
      groups.forEach(function (group) { setGroupCollapsed(group, false); });
      return;
    }

    if (event.target.closest("[data-ledger-collapse-all]")) {
      groups.forEach(function (group) { setGroupCollapsed(group, true); });
      return;
    }

    var jump = event.target.closest("[data-ledger-jump]");
    if (jump) {
      event.preventDefault();
      jumpToGroup(jump.dataset.ledgerJump);
      return;
    }

    if (event.target.closest("[data-catalog-filter]")) {
      window.queueMicrotask(revealMatchingGroups);
    }
  });

  page.addEventListener("input", function (event) {
    if (event.target.matches("[data-catalog-search]")) window.queueMicrotask(revealMatchingGroups);
  });

  document.addEventListener("languagechange", updateLanguageDependentUi);

  if (dialog) {
    dialog.addEventListener("close", function () {
      if (activeTrigger && document.contains(activeTrigger)) activeTrigger.focus();
      activeTrigger = null;
      activeTemplateId = "";
      activeKind = "";
      if (dialogBody) dialogBody.replaceChildren();
    });
  }

  if (viewport && topScroll) {
    viewport.addEventListener("scroll", function () { mirrorScroll(viewport, topScroll); }, { passive: true });
    topScroll.addEventListener("scroll", function () { mirrorScroll(topScroll, viewport); }, { passive: true });
    topScroll.addEventListener("keydown", moveTopScrollbarWithKeyboard);
  }

  if (typeof ResizeObserver === "function" && viewport && table) {
    var resizeObserver = new ResizeObserver(updateTopScrollbar);
    resizeObserver.observe(viewport);
    resizeObserver.observe(table);
  } else {
    window.addEventListener("resize", updateTopScrollbar);
  }

  setupAccessibleActionNames();
  updateLanguageDependentUi();
  updateTopScrollbar();
})();

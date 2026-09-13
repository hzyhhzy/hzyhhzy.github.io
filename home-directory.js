(function () {
  "use strict";

  var filterBar = document.querySelector(".directory-tools");
  var filters = Array.from(document.querySelectorAll("[data-project-filter]"));
  var projects = Array.from(document.querySelectorAll(".repo-row[data-category]"));
  var count = document.querySelector(".project-count");
  var currentFilter = "all";
  var sections = Array.from(document.querySelectorAll(".home-section"));
  var sectionLinks = Array.from(document.querySelectorAll(".section-nav a"));
  var header = document.querySelector(".site-header");
  var scrollPending = false;

  function updateSectionNavigation() {
    var boundary = (header ? header.getBoundingClientRect().height : 0) + 100;
    var activeSection = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= boundary) activeSection = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      activeSection = sections[sections.length - 1];
    }
    sectionLinks.forEach(function (link) {
      if (activeSection && link.hash === "#" + activeSection.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollPending = false;
  }

  function updateProjects() {
    var visibleCount = 0;
    projects.forEach(function (project) {
      project.hidden = currentFilter !== "all" && project.dataset.category !== currentFilter;
      if (!project.hidden) visibleCount += 1;
    });
    filters.forEach(function (filter) {
      filter.setAttribute("aria-pressed", String(filter.dataset.projectFilter === currentFilter));
    });
    if (count) {
      count.textContent = document.documentElement.dataset.language === "zh"
        ? visibleCount + " 个项目"
        : visibleCount + (visibleCount === 1 ? " project" : " projects");
    }
    updateSectionNavigation();
  }

  function queueNavigationUpdate() {
    if (scrollPending) return;
    scrollPending = true;
    window.requestAnimationFrame(updateSectionNavigation);
  }

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      currentFilter = filter.dataset.projectFilter;
      updateProjects();
    });
  });
  if (filterBar && projects.length) filterBar.hidden = false;
  document.addEventListener("languagechange", updateProjects);
  window.addEventListener("scroll", queueNavigationUpdate, { passive: true });
  window.addEventListener("resize", queueNavigationUpdate);
  updateProjects();
})();

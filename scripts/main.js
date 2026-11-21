/* ============================================================
   Shared behaviour: filters, search, copy-to-clipboard, reveal
   Every initializer is optional, so this file works on all pages.
   ============================================================ */

(function () {
  "use strict";

  function initCatalog() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-searchable]"));
    if (!items.length) return;

    var searchInput = document.getElementById("search-input");
    var groups = Array.prototype.slice.call(document.querySelectorAll("[data-filter-name]"));
    var state = {};
    var query = "";

    groups.forEach(function (group) {
      var name = group.getAttribute("data-filter-name");
      state[name] = "all";

      var buttons = Array.prototype.slice.call(group.querySelectorAll(".filter-btn"));
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          buttons.forEach(function (other) {
            other.classList.remove("active");
            other.setAttribute("aria-pressed", "false");
          });
          button.classList.add("active");
          button.setAttribute("aria-pressed", "true");
          state[name] = button.getAttribute("data-filter-value") || "all";
          apply();
        });
      });
    });

    function apply() {
      var visible = 0;

      items.forEach(function (item) {
        var matchesFilters = Object.keys(state).every(function (name) {
          var value = state[name];
          return value === "all" || item.getAttribute("data-" + name) === value;
        });
        var matchesSearch = !query || item.textContent.toLowerCase().indexOf(query) !== -1;
        var show = matchesFilters && matchesSearch;

        item.hidden = !show;
        if (show) visible += 1;
      });

      var empty = document.querySelector("[data-empty]");
      if (empty) empty.hidden = visible !== 0;
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        query = searchInput.value.toLowerCase().trim();
        apply();
      });
    }
  }

  function initCopyButtons() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-copy]"));
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      var label = button.querySelector("[data-copy-label]");
      var original = label ? label.textContent : "";
      var timer;

      button.addEventListener("click", function () {
        copyText(button.getAttribute("data-copy") || "");

        button.classList.add("copied");
        if (label) label.textContent = "Copied!";
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          button.classList.remove("copied");
          if (label) label.textContent = original;
        }, 1600);
      });
    });
  }

  function initCopyTargets() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-copy-target]"));

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.getElementById(button.getAttribute("data-copy-target"));
        if (!target) return;

        copyText(target.textContent);
        var original = button.textContent;
        button.textContent = "Copied!";
        button.classList.add("copied");
        window.setTimeout(function () {
          button.textContent = original;
          button.classList.remove("copied");
        }, 1400);
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
    } catch (error) {
      /* clipboard not available */
    }
    document.body.removeChild(area);
  }

  function initReveal() {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function init() {
    initCatalog();
    initCopyButtons();
    initCopyTargets();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

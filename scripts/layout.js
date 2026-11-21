/* ============================================================
   Shared layout: header, footer, theme and navigation
   No dependencies — plain JavaScript.
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Resolve the site root from this script's own path, so the same file works
  // from index.html, pages/, pages/writeups/ and deeper folders.
  var scriptPath =
    (document.currentScript && document.currentScript.getAttribute("src")) || "";
  var root = scriptPath.replace(/(^|\/)scripts\/layout\.js(\?.*)?$/, "$1");
  if (!root || root === scriptPath) root = "./";

  var NAV = [
    { label: "Home", href: root + "index.html", section: "home" },
    { label: "About", href: root + "pages/about.html", section: "about" },
    { label: "Projects", href: root + "pages/works.html", section: "projects" },
    { label: "Skills", href: root + "pages/skills.html", section: "skills" },
    { label: "Writeups", href: root + "pages/writeups.html", section: "writeups" },
    { label: "Labs", href: root + "pages/Labs/labs.html", section: "labs" }
  ];

  var ICONS = {
    sun:
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"/></svg>',
    menu:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  function currentSection() {
    var file = window.location.pathname.split("/").pop() || "index.html";
    if (!file || file === "") return "home";
    if (file === "index.html") return "home";
    if (file === "about.html") return "about";
    if (file === "works.html") return "projects";
    if (file === "skills.html") return "skills";
    if (file.indexOf("wr-") === 0 || file === "machines.html" || file.indexOf("mc-") === 0 || file === "writeups.html") {
      return "writeups";
    }
    return "labs";
  }

  function buildHeader() {
    var active = currentSection();
    var links = NAV.map(function (item) {
      var isActive = item.section === active ? ' class="active" aria-current="page"' : "";
      return '<a href="' + item.href + '"' + isActive + ">" + item.label + "</a>";
    }).join("");

    var header = document.createElement("header");
    header.className = "site-header";
    header.setAttribute("id", "site-header");
    header.innerHTML =
      '<div class="nav">' +
      '<a class="brand" href="' + root + 'index.html" aria-label="Diego Chávez — home">' +
      '<span class="brand-mark">&gt;_</span>Diego Chávez<span class="brand-dot">.</span></a>' +
      '<nav class="nav-links" id="primary-nav" aria-label="Main navigation">' +
      links +
      "</nav>" +
      '<button class="icon-btn theme-toggle" type="button" aria-label="Switch color theme" title="Switch color theme">' +
      ICONS.sun +
      ICONS.moon +
      "</button>" +
      '<button class="icon-btn nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="primary-nav">' +
      ICONS.menu +
      "</button>" +
      "</div>";

    document.body.insertBefore(header, document.body.firstChild);
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.setAttribute("id", "site-footer");
    footer.innerHTML =
      '<div class="container footer-inner">' +
      "<p>&copy; " +
      new Date().getFullYear() +
      " Diego Chávez · Built with HTML, CSS &amp; JS.</p>" +
      '<div class="footer-links">' +
      '<a href="mailto:aldebaran.gzz.dc@gmail.com">Email</a>' +
      '<a href="https://www.linkedin.com/in/diego-chávez-offsec" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="#top">Back to top ↑</a>' +
      "</div>" +
      "</div>";
    document.body.appendChild(footer);
  }

  function getStoredTheme() {
    try {
      return window.localStorage.getItem("dc-theme");
    } catch (error) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      window.localStorage.setItem("dc-theme", value);
    } catch (error) {
      /* storage can be unavailable in private mode */
    }
  }

  function initTheme() {
    var theme = getStoredTheme() === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);

    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    button.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
      storeTheme(theme);
    });
  }

  function initMobileNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    if (!header || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    header.addEventListener("click", function (event) {
      if (event.target.closest(".nav-links a")) {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  buildHeader();
  buildFooter();
  initTheme();
  initMobileNav();
})();

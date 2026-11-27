/* =========================================================
   Shared behaviour: mobile navigation + site configuration.
   No edits needed here; change assets/js/site-config.js instead.
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var PROFILE_LABELS = {
    googleScholar: "Google Scholar",
    orcid: "ORCID",
    linkedin: "LinkedIn",
    researchgate: "ResearchGate"
  };
  var DOC_LABELS = {
    cv: "Curriculum Vitae",
    research: "Research Statement",
    teaching: "Teaching Statement"
  };

  function isHttps(url) { return typeof url === "string" && /^https:\/\//i.test(url); }
  /* Documents must be files inside this site (assets/docs/...pdf). */
  function safeFile(f) { return typeof f === "string" && /^assets\/docs\/[A-Za-z0-9._-]+\.pdf$/.test(f); }
  function hidden(t) { var s = document.createElement("span"); s.className = "visually-hidden"; s.textContent = t; return s; }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    var label = toggle.querySelector(".nav-toggle-label");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) setOpen(false);
    });
  }

  /* ---------- Configuration ---------- */
  function applyConfig() {
    var c = window.SITE_CONFIG;
    if (!c) return;

    ["degreeStatus", "degreeRole", "degreeYears"].forEach(function (key) {
      if (typeof c[key] === "string" && c[key].trim()) {
        document.querySelectorAll('[data-config="' + key + '"]').forEach(function (el) {
          el.textContent = c[key];
        });
      }
    });
    if (c.email) {
      document.querySelectorAll('[data-config="email"]').forEach(function (el) {
        el.textContent = c.email;
        el.setAttribute("href", "mailto:" + c.email);
      });
    }
    if (c.lastUpdated) {
      document.querySelectorAll('[data-config="lastUpdated"]').forEach(function (el) {
        el.textContent = c.lastUpdated;
      });
    }

    // Profile links: active only when a full https URL is configured.
    if (c.profiles) {
      document.querySelectorAll("[data-profile]").forEach(function (el) {
        var key = el.getAttribute("data-profile");
        var url = c.profiles[key];
        var name = PROFILE_LABELS[key] || key;
        if (isHttps(url)) {
          var a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          var icon = el.querySelector("svg.p-icon"); /* keep the page's icon, if any */
          if (icon) a.appendChild(icon);
          a.appendChild(document.createTextNode(name));
          a.appendChild(hidden(" (opens in a new tab)"));
          el.replaceChildren(a);
        }
      });
    }

    // Documents: active only when approved and a file path is set.
    if (c.documents) {
      document.querySelectorAll("[data-doc]").forEach(function (el) {
        var key = el.getAttribute("data-doc");
        var d = c.documents[key];
        if (d && d.approved === true && safeFile(d.file)) {
          var label = DOC_LABELS[key] || key;
          var strong = document.createElement("strong");
          strong.textContent = label;
          var type = document.createElement("span");
          type.className = "doc-type";
          type.textContent = "PDF";
          var actions = document.createElement("span");
          actions.className = "doc-actions";
          var view = document.createElement("a");
          view.className = "btn btn--outline btn--sm";
          view.href = d.file;
          view.target = "_blank";
          view.rel = "noopener noreferrer";
          view.textContent = "View PDF";
          view.appendChild(hidden(": " + label + " (opens in a new tab)"));
          var dl = document.createElement("a");
          dl.className = "btn btn--outline btn--sm";
          dl.href = d.file;
          dl.setAttribute("download", "Mehdi-Torbat-Esfahani-" + label.replace(/ /g, "-").replace("Curriculum-Vitae", "CV") + ".pdf");
          dl.textContent = "Download PDF";
          dl.appendChild(hidden(": " + label));
          actions.append(view, " ", dl);
          el.replaceChildren(strong, " ", type, " ", actions);
          el.classList.add("available");
        }
      });
      var cv = c.documents.cv;
      if (cv && cv.approved === true && safeFile(cv.file)) {
        document.querySelectorAll("[data-cv-link]").forEach(function (a) {
          /* keep links that already point at the file (e.g. root-absolute on 404.html) */
          var h = a.getAttribute("href") || "";
          if (h.slice(-cv.file.length) !== cv.file) a.setAttribute("href", cv.file);
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        });
      }
    }
  }

  /* Scripts load at the end of <body>, so the page elements already exist:
     run immediately (before first paint where possible) to avoid layout shift. */
  function ready(fn) {
    if (document.body) fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () { initNav(); applyConfig(); });
})();

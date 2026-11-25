/* =========================================================
   Gallery: renders items from assets/data/gallery.js into
   Photos (three subsections) and Videos, with an accessible
   photo viewer.
   No edits needed here; add media in assets/data/gallery.js.
   ========================================================= */
(function () {
  "use strict";
  var SECTIONS = { "research-results": "Research Results & Figures", "field-experiments": "Field Experiments", "conferences": "Conferences" };
  var VIDEO_TYPES = { mp4: "video/mp4", webm: "video/webm", ogv: "video/ogg", ogg: "video/ogg", m4v: "video/mp4", mov: "video/mp4" };

  /* Scripts load at the end of <body>, so the page elements already exist:
     run immediately (before first paint where possible) to avoid layout shift. */
  function ready(fn) {
    if (document.body) fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  /* Only files inside this website (relative paths) are allowed. */
  function safePath(p) {
    return typeof p === "string" && p.trim() !== "" && !/^[a-z][a-z0-9+.-]*:/i.test(p.trim()) && p.indexOf("//") !== 0;
  }
  function text(tag, cls, value) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    el.textContent = value;
    return el;
  }
  function validDate(d) { return typeof d === "string" && /^\d{4}(-\d{2}(-\d{2})?)?$/.test(d); }
  function formatDate(d) {
    var parts = d.split("-");
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if (parts.length === 1) return parts[0];
    var m = months[parseInt(parts[1], 10) - 1] || "";
    return parts.length === 2 ? m + " " + parts[0] : m + " " + parseInt(parts[2], 10) + ", " + parts[0];
  }

  /* Check every entry; skip (and report in the browser console) any that are incomplete. */
  function validate(raw) {
    var ok = [];
    (Array.isArray(raw) ? raw : []).forEach(function (it, i) {
      var n = "Gallery item " + (i + 1);
      if (!it || (it.type !== "photo" && it.type !== "video")) { console.warn(n + ': type must be "photo" or "video" — skipped.'); return; }
      if (it.type === "photo" && !SECTIONS[it.section]) { console.warn(n + ': photos need section "research-results", "field-experiments", or "conferences" — skipped.'); return; }
      if (!safePath(it.src)) { console.warn(n + ": src must be a file path inside the website — skipped."); return; }
      if (it.type === "photo" && !(typeof it.alt === "string" && it.alt.trim())) { console.warn(n + ": photos need alt text — skipped."); return; }
      ok.push(it);
    });
    return ok;
  }

  function caption(it) {
    var cap = document.createElement("figcaption");
    cap.className = "g-caption";
    var meta = document.createElement("p");
    meta.className = "g-meta";
    if (validDate(it.date)) {
      var t = text("time", "", formatDate(it.date));
      t.setAttribute("datetime", it.date);
      meta.appendChild(t);
      cap.appendChild(meta);
    }
    if (it.title) cap.appendChild(text(it.type === "video" ? "h3" : "h4", "g-title", it.title));
    if (it.description) cap.appendChild(text("p", "g-desc", it.description));
    return cap;
  }

  ready(function () {
    var viewer = document.getElementById("gallery-viewer");
    if (!viewer) return;
    var vImg = document.getElementById("viewer-img");
    var vTitle = document.getElementById("viewer-title");
    var vCap = document.getElementById("viewer-caption");
    var vPos = document.getElementById("viewer-pos");
    var items = validate(window.GALLERY_ITEMS);
    var groups = {};
    Array.prototype.forEach.call(document.querySelectorAll("[data-gallery-section]"), function (el) {
      groups[el.getAttribute("data-gallery-section")] = { grid: el.querySelector(".gallery-grid"), empty: el.querySelector(".g-empty"), n: 0 };
    });
    var cards = [];
    var current = -1, opener = null;

    items.forEach(function (it) {
      var g = groups[it.type === "video" ? "videos" : it.section];
      if (!g) return;
      var li = document.createElement("li");
      li.className = "g-card";
      li.setAttribute("data-type", it.type);
      var fig = document.createElement("figure");
      if (it.type === "photo") {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-thumb";
        btn.setAttribute("aria-label", "Open larger view: " + (it.title || it.alt));
        var img = document.createElement("img");
        img.src = it.src;
        img.alt = it.alt;
        img.loading = "lazy";
        img.decoding = "async";
        btn.appendChild(img);
        btn.addEventListener("click", function () { openViewer(li, btn); });
        fig.appendChild(btn);
      } else {
        var v = document.createElement("video");
        v.controls = true;
        v.preload = "metadata";
        v.setAttribute("playsinline", "");
        v.className = "g-video";
        v.setAttribute("aria-label", it.title ? "Video: " + it.title : "Video");
        if (safePath(it.poster)) v.poster = it.poster;
        var source = document.createElement("source");
        source.src = it.src;
        var ext = (it.src.split(".").pop() || "").toLowerCase();
        if (VIDEO_TYPES[ext]) source.type = VIDEO_TYPES[ext];
        v.appendChild(source);
        if (safePath(it.captions)) {
          var tr = document.createElement("track");
          tr.kind = "captions"; tr.src = it.captions; tr.srclang = "en"; tr.label = "English";
          v.appendChild(tr);
        }
        var fallback = document.createElement("a");
        fallback.href = it.src;
        fallback.textContent = "Download the video";
        v.appendChild(fallback);
        fig.appendChild(v);
      }
      fig.appendChild(caption(it));
      li.appendChild(fig);
      li._item = it;
      g.grid.appendChild(li);
      g.n += 1;
      cards.push(li);
    });
    /* Subsections with items hide their "will be added soon" note. */
    Object.keys(groups).forEach(function (k) { if (groups[k].n && groups[k].empty) groups[k].empty.hidden = true; });

    /* ---- Viewer (photos only; moves among the photos of the same subsection) ---- */
    var listFor = null;
    function visiblePhotos() {
      return cards.filter(function (li) { return li.getAttribute("data-type") === "photo" && li.parentNode === listFor; });
    }
    function show(li) {
      var it = li._item, list = visiblePhotos();
      current = list.indexOf(li);
      vImg.src = it.src;
      vImg.alt = it.alt;
      vTitle.textContent = it.title || it.alt;
      var parts = [];
      if (validDate(it.date)) parts.push(formatDate(it.date));
      if (it.description) parts.push(it.description);
      vCap.textContent = parts.join(" — ");
      vCap.hidden = parts.length === 0;
      vPos.textContent = "Photo " + (current + 1) + " of " + list.length;
      var multi = list.length > 1;
      viewer.querySelector('[data-viewer="prev"]').hidden = !multi;
      viewer.querySelector('[data-viewer="next"]').hidden = !multi;
    }
    function step(d) {
      var list = visiblePhotos();
      if (list.length < 2) return;
      show(list[(current + d + list.length) % list.length]);
    }
    function openViewer(li, btn) {
      opener = btn;
      listFor = li.parentNode;
      show(li);
      if (typeof viewer.showModal === "function") viewer.showModal();
      else viewer.setAttribute("open", "");
      viewer.querySelector('[data-viewer="close"]').focus();
    }
    function closeViewer() {
      if (typeof viewer.close === "function") viewer.close();
      else { viewer.removeAttribute("open"); onClosed(); }
    }
    function onClosed() {
      vImg.src = "data:,";
      if (opener) opener.focus();
    }
    viewer.addEventListener("close", onClosed);
    viewer.querySelector('[data-viewer="close"]').addEventListener("click", closeViewer);
    viewer.querySelector('[data-viewer="prev"]').addEventListener("click", function () { step(-1); });
    viewer.querySelector('[data-viewer="next"]').addEventListener("click", function () { step(1); });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });
    viewer.addEventListener("click", function (e) { if (e.target === viewer) closeViewer(); });
  });
})();

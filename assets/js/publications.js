/* =========================================================
   Publication filters (type x year).
   Without JavaScript the full list is shown and the filter
   panel stays hidden. Entries are filtered by their
   data-type and data-year attributes in publications.html.
   ========================================================= */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    var panel = document.getElementById("pub-filters");
    if (!panel) return;
    var buttons = Array.prototype.slice.call(panel.querySelectorAll(".filter-btn"));
    var yearSelect = document.getElementById("pub-year");
    var count = document.getElementById("pub-count");
    var empty = document.getElementById("pub-empty");
    var items = Array.prototype.slice.call(document.querySelectorAll(".pub"));
    var groups = Array.prototype.slice.call(document.querySelectorAll(".pub-group"));
    var state = { type: "all", year: "all" };

    function apply() {
      var shown = 0;
      items.forEach(function (li) {
        var okType = state.type === "all" || li.getAttribute("data-type") === state.type;
        var okYear = state.year === "all" || li.getAttribute("data-year") === state.year;
        var visible = okType && okYear;
        li.hidden = !visible;
        if (visible) shown += 1;
      });
      groups.forEach(function (g) {
        g.hidden = !g.querySelector(".pub:not([hidden])");
      });
      count.textContent = "Showing " + shown + " of " + items.length + " entries";
      empty.hidden = shown !== 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.type = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        apply();
      });
    });
    yearSelect.addEventListener("change", function () {
      state.year = yearSelect.value;
      apply();
    });

    panel.hidden = false;
    apply();
  });
})();

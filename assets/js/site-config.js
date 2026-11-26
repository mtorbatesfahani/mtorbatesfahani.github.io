/* =========================================================
   SITE CONFIGURATION — edit this file to update the site.
   Changes here apply to every page (see README.md).
   Leave a value as "" to keep a link inactive.
   ========================================================= */
window.SITE_CONFIG = {
  // ---- ACADEMIC STATUS: the ONLY place the Ph.D. status is written. ----
  // Every page reads these three values. The pages themselves contain only a
  // neutral, always-true fallback ("Doctoral studies in Civil Engineering")
  // for visitors without JavaScript, so nothing can go out of date.
  //
  // When the degree is officially conferred, change all three, e.g.
  //   degreeStatus: "Ph.D. in Civil Engineering, The University of Texas at San Antonio (2026)",
  //   degreeRole:   "Ph.D. graduate",
  //   degreeYears:  "2023 – 2026",
  degreeStatus: "Ph.D. Candidate in Civil Engineering — Expected December 2026", // hero, About, Projects, footer
  degreeRole: "Ph.D. candidate",       // About biography: "I am a ___ in Civil Engineering at ..."
  degreeYears: "2023 – present",       // About > Education, Ph.D. row

  email: "mehdi.torbatesfahani@my.utsa.edu",

  // Academic profile links (full https:// URLs). They open in a new tab.
  // Empty = shown as inactive text "(link forthcoming)".
  profiles: {
    googleScholar: "https://scholar.google.com/citations?user=h_LpC_QAAAAJ&hl=en&oi=ao",
    orcid: "https://orcid.org/0009-0005-9942-5715",
    linkedin: "https://www.linkedin.com/in/mehditorbat",
    researchgate: "https://www.researchgate.net/profile/Mehdi-Torbat-Esfahani-2"
  },

  // Documents on the Contact page (View PDF / Download PDF) and the gold CV button.
  // To update a document, upload the new PDF to assets/docs/ with the SAME file name.
  documents: {
    cv:       { approved: true, file: "assets/docs/mehdi-torbat-esfahani-cv.pdf" },
    research: { approved: true, file: "assets/docs/mehdi-torbat-esfahani-research-statement.pdf" },
    teaching: { approved: true, file: "assets/docs/mehdi-torbat-esfahani-teaching-statement.pdf" }
  },

  // Footer "Last updated" text.
  lastUpdated: "November 2026"
};

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

  // Academic profile links. Paste the full URL (https://...) once verified.
  // Empty = shown as inactive text "(link forthcoming)".
  profiles: {
    googleScholar: "",
    orcid: "",
    linkedin: "",
    researchgate: ""
  },

  // Downloadable documents. Put the approved PDF in assets/docs/
  // with this exact file name, then set approved: true.
  documents: {
    cv:       { approved: false, file: "assets/docs/Torbat-Esfahani-CV.pdf" },
    research: { approved: false, file: "assets/docs/Torbat-Esfahani-Research-Statement.pdf" },
    teaching: { approved: false, file: "assets/docs/Torbat-Esfahani-Teaching-Statement.pdf" }
  },

  // Footer "Last updated" text.
  lastUpdated: "November 2026"
};

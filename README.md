# Mehdi Torbat Esfahani — Academic Website

A static academic website: plain HTML, CSS and a small amount of JavaScript. It needs no database, no build step and no paid service, and it is designed for free hosting on GitHub Pages.

**Live site:** https://mtorbatesfahani.github.io/ (GitHub Pages user site, `main` branch, root folder).

---

## 1. Preview on your computer

1. Unzip the package.
2. Double-click `index.html` to open it in your browser. All pages, the menu and the publication filters work offline.

Optional, closest to the live site: open a terminal in this folder, run `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## 2. Folder structure

```
index.html            Home
about.html            About
research.html         Research
teaching.html         Teaching
publications.html     Publications (with filters)
projects.html         Research Projects
experience.html       Professional Experience
honors.html           Honors & Service
contact.html          Contact
404.html              "Page not found" page (GitHub Pages uses it automatically)
sitemap.xml           For search engines (edit USERNAME before deployment)
.nojekyll             Tells GitHub Pages to serve the files exactly as they are
robots.txt            For search engines (edit USERNAME before deployment)
assets/
  css/tokens.css      Colours, fonts, sizes (design system)
  css/site.css        Layout and components
  js/site-config.js   ← THE FILE YOU WILL EDIT MOST
  js/site.js          Menu and configuration logic (no edits needed)
  js/publications.js  Publication filters (no edits needed)
  fonts/              Source Sans 3 web fonts + licence
  img/favicon.svg     Browser tab icon
  docs/               Put approved PDF documents here
```

## 3. Everyday updates in `assets/js/site-config.js`

Open the file in any text editor, such as Notepad, TextEdit or VS Code. Change the text between the quotation marks and save.

| What | Setting | Example |
|---|---|---|
| Degree line (hero, About, Projects, footer) | `degreeStatus` | When the degree is conferred: `"Ph.D. in Civil Engineering, The University of Texas at San Antonio (2026)"` |
| Role in the About biography | `degreeRole` | `"Ph.D. graduate"` |
| Ph.D. dates in About > Education | `degreeYears` | `"2023 – 2026"` |
| Email | `email` | your new address, in quotation marks |
| Profile links | `profiles.googleScholar`, `orcid`, `linkedin`, `researchgate` | Paste the full `https://...` address. Empty `""` shows "(link forthcoming)". |
| CV and statements | `documents.cv` / `research` / `teaching` | Copy the approved PDF into `assets/docs/` using the file name shown, then set `approved: true` |
| Footer date | `lastUpdated` | `"January 2027"` |

**The Ph.D. status is written in one place only: `site-config.js`.** No HTML page contains the status text. Each page holds a neutral fallback ("Doctoral studies in Civil Engineering") that stays true before and after graduation. Visitors without JavaScript see that fallback, and everyone else sees the exact status from the configuration. Changing the three status lines above updates every page at once, so no page can be left with old text.

When you graduate, you will probably also want to revise the About biography by hand, for example its description of your current appointments. That is ordinary content editing, not status configuration.

## 4. Editing page text

Each page is an ordinary HTML file. Open it in a text editor and change the words between the tags. Leave the tags themselves (`<p>`, `</p>` and so on) and the `class="..."` parts untouched.

## 5. Adding or changing a publication

In `publications.html`, each entry is one block like this:

```html
<li class="pub" data-type="journal" data-year="2025">
  <div class="pub-meta"><span class="badge badge--published">Published</span><span>Journal article · 2025</span></div>
  <p class="cite"><span class="me">Torbat Esfahani, M.</span>, Co-author, A. (2025). “Title.” <em>Journal</em>, 1(1), 1–10.</p>
</li>
```

1. Copy an existing block from the right group and paste it at the top of that group's list.
2. Edit the citation text, `data-year` and the year in the meta line.
3. **When a submitted manuscript's status changes:**
   - **Published:** move its block into "Journal articles". Set `data-type="journal"`, add `data-year`, and use `badge badge--published` with the text `Published`.
   - **Under review or under revision:** change the badge text to `Under Review` or `Under Revision` (keep `badge--submitted`). To give it its own filter button, add a group `<section class="pub-group">…</section>` with a new `data-type` (for example `review`), and a button `<button type="button" class="filter-btn" data-filter="review" aria-pressed="false">Under Review</button>` next to the others.
4. When you add a new year, also add `<option value="2027">2027</option>` to the Year list near the top of the page.
5. Filter types used: `journal`, `submitted`, `chapter`, `conference`, `prep`, `report`, `talk`.

## 6. Adding the heading font (Source Serif 4)

Headings currently use Georgia, a built-in serif font. To use the approved Source Serif 4:

1. Download Source Serif 4 from Google Fonts or Adobe's GitHub repository (free, SIL Open Font License).
2. Convert or rename the variable font to `SourceSerif4-Variable.woff2` (woff2 recommended), copy it into `assets/fonts/`, and add the licence file `OFL-SourceSerif4.txt`.
3. In `assets/css/tokens.css`, remove the `/*` and `*/` around the "Source Serif 4" block.

## 7. Adding a headshot

1. Save the photo as `assets/img/portrait.jpg` (about 560 × 680 px).
2. In `index.html`, replace the `<div class="portrait" …>…</div>` block with:
   `<img class="portrait" src="assets/img/portrait.jpg" alt="Mehdi Torbat Esfahani" width="280" height="340" style="object-fit:cover">`

## 8. Deployment to GitHub Pages (only after final approval)

1. Create a GitHub repository named exactly `USERNAME.github.io`, replacing USERNAME with your GitHub username. Keep it **private** until you are ready; note that GitHub Pages from a private repository requires a paid plan. On a free plan, the repository must be public when you publish.
2. Upload every file and folder in this package to the repository root.
3. In `sitemap.xml` and `robots.txt`, replace `USERNAME` with your username.
4. Go to repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, then choose the `main` branch and the `/ (root)` folder.
5. After a few minutes, the site is live at `https://USERNAME.github.io/`.
6. **Custom domain later:** add it under Settings → Pages → Custom domain. GitHub creates a `CNAME` file. Then update the addresses in `sitemap.xml` and `robots.txt`. All page links are relative, so nothing else needs to change.

## 9. Privacy rules for this site

Never add a personal phone number, home address or birth information. Never add mentee names without their consent, unverified profile links, unapproved documents, or confidential project information.

## 10. Credits and licences

Source Sans 3 © Adobe, SIL Open Font License 1.1 (`assets/fonts/OFL-SourceSans3.txt`). The site code is written for the owner and may be modified freely.

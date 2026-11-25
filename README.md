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
gallery.html          Gallery (content comes from assets/data/gallery.js)
contact.html          Contact
404.html              "Page not found" page (GitHub Pages uses it automatically)
sitemap.xml           For search engines (set to https://mtorbatesfahani.github.io/)
.nojekyll             Tells GitHub Pages to serve the files exactly as they are
robots.txt            For search engines (set to https://mtorbatesfahani.github.io/)
assets/
  css/tokens.css      Colours, fonts, sizes (design system)
  css/site.css        Layout and components
  js/site-config.js   ← THE FILE YOU WILL EDIT MOST
  js/site.js          Menu and configuration logic (no edits needed)
  js/publications.js  Publication filters (no edits needed)
  js/gallery.js       Gallery display and photo viewer (no edits needed)
  data/gallery.js     ← GALLERY ENTRIES: add photos and videos here
  gallery/photos/     Gallery photos
  gallery/videos/     Gallery videos (and .vtt captions)
  fonts/              Source Sans 3 web fonts + licence
  img/favicon.svg     Browser tab icon
  img/portrait.*      Homepage headshot (.webp and .jpg)
  img/cover-*.*       Homepage cover photograph (1536 and 768 px; .webp and .jpg)
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

## 7. Headshot

The homepage shows `assets/img/portrait.webp` (or `portrait.jpg` in older browsers). Replace both files when you change the photo. To replace the photo, save the new image under exactly that name and upload it. A portrait-shaped image of about 560 × 680 px works best. The frame crops it to fill (`object-fit: cover`), keeping the top of the photo, so the face stays visible. If the file is missing, the page shows the "MTE" monogram instead.

## 7b. Homepage cover photograph

The homepage uses the LinkedIn-style layout: a full-width cover photograph with the circular headshot overlapping its lower edge. The cover is decorative (`alt=""`), so screen readers skip it. Browsers automatically choose the right size and format:

| File | Used for |
|---|---|
| `assets/img/cover-2172.webp` / `cover-2172.jpg` | Very wide screens (full original size) |
| `assets/img/cover-1536.webp` / `cover-1536.jpg` | Laptops, tablets and high-resolution phones |
| `assets/img/cover-768.webp` / `cover-768.jpg` | Small phones |
| `assets/img/portrait.webp` / `portrait.jpg` | Headshot |

WebP is used by modern browsers; the JPEG copies are for older ones. The cover is a 3:1 image and is never stretched: wide screens trim a little from the top and bottom, and phones trim the sides, keeping the crane, skyline and digital-twin building in view.

**To replace the cover:** use only a photograph you have the right to publish. Make 2172, 1536 and 768 px-wide versions, each as JPEG and WebP, with the same file names. Upload all six, replacing the old files. A replacement with a different shape (not 3:1) also needs `width` and `height` updated in `index.html`. The banner shows a wide horizontal band of the photo, so keep the important subjects in the upper-middle part of the image. If the cover files are missing, the banner shows plain navy.

## 7a. Gallery: adding photos and videos

The Gallery page has two sections:

- **Photos**, with three subsections: **Research Results & Figures**, **Field Experiments**, and **Conferences**.
- **Videos**.

You never edit `gallery.html`. Each photo or video is one entry in **`assets/data/gallery.js`**, and the page places it in the right section automatically. A subsection with no entries shows "Photographs will be added soon." (or "Videos will be added soon.").

1. **Prepare the file.**
   - Photos: JPEG, about 1600 px on the long side, under 1 MB.
   - Videos: MP4 (H.264), short, under 25 MB. That is the GitHub web-upload limit per file; files over 100 MB are refused.
   - Remove location (GPS) data from photos. The tool `prepare_media.py` in your review package does this, and resizes the photo, in one step.
   - Use only images you have the right to publish, and that show people who agree to appear.
2. **Name it simply,** with lowercase letters, numbers and dashes and no spaces. Example: `2026-03-crc-presentation.jpg`.
3. **Upload it** to `assets/gallery/photos/` or `assets/gallery/videos/`.
4. **Add an entry** at the top of the list in `assets/data/gallery.js`.

   A photo:

```js
  {
    type: "photo",
    section: "field-experiments",  // research-results | field-experiments | conferences
    src: "assets/gallery/photos/2026-03-field-setup.jpg",
    alt: "What the photo shows, for screen readers",   // required for photos
    title: "Optional title",
    date: "2026-03",               // optional: 2026, 2026-03, or 2026-03-15
    description: "Optional one or two sentences."
  },
```

   A video (no `section` needed; every video goes under Videos):

```js
  {
    type: "video",
    src: "assets/gallery/videos/2026-03-demo.mp4",
    poster: "assets/gallery/photos/2026-03-demo-poster.jpg",   // optional preview image
    captions: "assets/gallery/videos/2026-03-demo.vtt",       // optional, recommended
    title: "Optional title",
    date: "2026",
    description: "Optional one or two sentences."
  },
```

5. **Check the entry.** Mind the commas between entries and the quotation marks. If an entry is incomplete (no alt text, a missing or misspelled `section`, or a web address instead of a file path), the gallery skips it and shows the reason in the browser console (F12 → Console). The rest of the gallery still works.

Clicking a photo opens a larger view; the arrow keys move between photos in the same subsection, and Esc closes it.

## 8. Updating the live site (https://mtorbatesfahani.github.io/)

The site is served from the repository `mtorbatesfahani.github.io`, branch `main`, folder `/ (root)`. Every file in this package goes to the same path in the repository. Uploading **adds or replaces** files with the same name and path. It **never deletes** other files, so files you added yourself are kept.

**Web upload (no software needed):**

1. Open the repository on GitHub and choose **Add file → Upload files**.
2. Open the `upload` folder on your computer, select **everything inside it** (not the `upload` folder itself), and drag it onto the page. Folders such as `assets` keep their structure.
3. On a Mac, hidden files such as `.nojekyll` are not visible. That file is already in the repository and doesn't change, so you don't need to upload it.
4. Under **Commit changes**, write a short message (for example, "Add Gallery, cover and headshot"), keep **Commit directly to the main branch**, and select **Commit changes**.
5. After one or two minutes, open https://mtorbatesfahani.github.io/ and press Ctrl+F5 (Cmd+Shift+R on a Mac) to reload without the cache.

**Never** use "Delete" on files or folders unless you mean to, and don't upload the `review`, `screenshots` or `tools` folders from a review package.

**To undo an update:** in the repository, open **Commits**, choose the update's commit, and use **Revert** (in GitHub Desktop: right-click the commit → Revert). The previous version comes back.

**Custom domain later:** add it under Settings → Pages → Custom domain. GitHub creates a `CNAME` file. Then update the addresses in `sitemap.xml` and `robots.txt`. All page links are relative, so nothing else needs to change.

## 9. Privacy rules for this site

Never add a personal phone number, home address or birth information. Never add mentee names without their consent, unverified profile links, unapproved documents, or confidential project information.

## 10. Credits and licences

Source Sans 3 © Adobe, SIL Open Font License 1.1 (`assets/fonts/OFL-SourceSans3.txt`). The site code is written for the owner and may be modified freely.

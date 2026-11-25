/* =========================================================
   GALLERY DATA: the only file you edit to add photos and videos.
   See README.md, section 7a "Gallery: adding photos and videos".

   The Gallery page has two sections:
     PHOTOS, with three subsections chosen by "section":
       "research-results"   -> Research Results & Figures
       "field-experiments"  -> Field Experiments
       "conferences"        -> Conferences
     VIDEOS: every entry with type "video" (no "section" needed).

   One entry per item, inside the square brackets [ ... ].
   Separate entries with commas.

   Fields
     type         "photo" or "video"                          (required)
     section      photos only: "research-results",
                  "field-experiments", or "conferences"       (required for photos)
     src          path to the file, e.g.
                  "assets/gallery/photos/my-photo.jpg"        (required)
     alt          what the photo shows, for screen readers    (required for photos)
     title        short title                                 (optional)
     date         "2026", "2026-03", or "2026-03-15"          (optional)
     description  one or two sentences                        (optional)
     poster       video only: preview image path              (optional)
     captions     video only: captions file (.vtt) path       (optional, recommended)

   Within each subsection, items appear in the order listed here;
   put the newest first. Use only facts and images you are
   comfortable publishing. Remove location data (GPS) from photos
   before uploading (see README).
   ========================================================= */
window.GALLERY_ITEMS = [

  /* --- Example photo (remove the two slash-star markers to use) ---
  {
    type: "photo",
    section: "field-experiments",
    src: "assets/gallery/photos/example-photo.jpg",
    alt: "Describe what the photo shows",
    title: "Title of the photo",
    date: "2026-03",
    description: "One or two sentences about the photo."
  },
  --- end of example --- */

  /* --- Example video ---
  {
    type: "video",
    src: "assets/gallery/videos/example-video.mp4",
    poster: "assets/gallery/photos/example-video-poster.jpg",
    captions: "assets/gallery/videos/example-video.vtt",
    title: "Title of the video",
    date: "2026",
    description: "One or two sentences about the video."
  },
  --- end of example --- */

];

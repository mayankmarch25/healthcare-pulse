# Healthcare Pulse: your new site

You do not need to install anything to use this. Read the first two sections and
you are ready to publish Edition 71.

---

## 1. Publishing a new edition

Create one file in `src/content/editions/`, named after the URL you want.
For Edition 71 that means `edition-71-your-topic.md`.

Paste this in and change the details:

```markdown
---
edition: 71
title: "Your headline in sentence case"
headTitle: "Edition 71: Your headline for search results"
description: "One or two sentences. This is what Google and LinkedIn show."
category: policy
readTime: "8 MIN READ"
datePublished: "2026-08-21"
dateLine: "Published 21 Aug 2026"
relatedLabel: "More on policy"
relatedSeeAll: "/topics/policy/"
related:
  - cat: governance
    href: /edition-70-swasth-bharat.html
    ed: "ED. 70"
    title: "You cannot fix an org chart with an API"
---

Now just write. Normal paragraphs, no HTML needed.

## A subheading works like this

**Bold** and *italic* work as you would expect. Links look like
[this](https://example.com).

- Bullet points
- Work too
```

Commit it. Two minutes later the page is live at
`https://mayankmadhur.in/edition-71-your-topic.html`, with the header, footer,
share buttons, dark mode, reading progress bar, related editions, search entry
and social preview all generated for you.

`category` must be one of: `strategy`, `policy`, `digital-health`,
`geopolitics`, `pharma`, `biotech`, `governance`.

**You never touch CSS again.** If you do, you undo the whole point of this.

---

## 2. Where to edit, without installing anything

Open your repository on github.com and press the `.` key. A full code editor
opens in your browser. Create the file, type, then use the Source Control panel
on the left to commit. Nothing to install, works on a phone.

If you would rather fill in a form than type frontmatter, connect the repo to
Pages CMS (pagescms.org). It is free and reads the same schema.

---

## 3. What happens when you commit

`.github/workflows/deploy.yml` runs automatically:

1. Installs dependencies
2. Builds the site (about 5 seconds for all 68 editions)
3. **Checks the page weight budget.** If any page exceeds 120 KB of HTML, or
   total CSS exceeds 120 KB, the build fails and nothing is published.
4. Deploys to Cloudflare Pages

Step 3 is the guard rail. It is what stops the old copy-paste problem from
coming back. If it ever fails, something got pasted in that should not have
been.

### One-time setup

In your Cloudflare dashboard create a Pages project called `healthcare-pulse`.
Then in GitHub, under Settings, Secrets and variables, Actions, add:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Point `mayankmadhur.in` at the Pages project. Your URLs do not change, so
nothing breaks in search.

---

## 4. What is in here

| Folder | What it holds | Do you touch it? |
|---|---|---|
| `src/content/editions/` | One file per edition: title, date, category, related links | **Yes.** This is where you work. |
| `src/bodies/` | The original HTML of the 68 migrated editions | Only if fixing a typo in an old edition |
| `src/styles/hp.css` | The single stylesheet for the whole site | Rarely, and carefully |
| `src/layouts/`, `src/components/` | Header, footer, share bar, related carousel, author box | Only for design changes |
| `src/page-assets/` | Extra CSS or JS for the 13 editions with custom charts | No |
| `src/assets/` | Logo, social card, edition images | Add images here |
| `.github/workflows/` | The deploy pipeline | No |

The 68 old editions keep their original HTML in `src/bodies/` so they render
exactly as published. New editions are Markdown. Both go through the same
layout, so the site is visually consistent either way.

---

## 5. What this fixed

| | Before | After |
|---|---|---|
| Copies of the stylesheet | 25 forked versions, one per page | 1 |
| CSS shipped across 68 pages | 2,577 KB | 57 KB, cached once |
| Average edition page, gzipped | 15.0 KB | 5.8 KB |
| Header logo | 841 KB PNG at 1254x1254, shown at 52x52 | 0.4 KB WebP |
| Fonts | Fetched from Google on every page | Same fonts, served from your own domain |
| Chart.js | Loaded on 6 pages | Still 6, but now only where actually used |
| First visit to one edition | about 924 KB | about 86 KB |
| Cacheable share of the payload | 7% | 93% |
| Time to publish an edition | around an hour of HTML editing | around ten minutes of writing |
| Updating homepage, archive, topics | hand-edit a card into each | automatic |

**91% less to download on a first visit.** The logo was the single biggest
culprit, not the code.

---

## 6. Still to do

The list pages are now generated from `src/content/editions/`, so adding an
edition automatically updates the homepage, archive, perspectives and the topic
pages. You no longer hand-add a card every Friday.

Two things remain worth doing, neither urgent:

1. **`ask.html`** ships 38 KB of JavaScript to every page and matches on literal
   keywords you maintain by hand. Replace with Pagefind, which builds its index
   at deploy time. Cuts the JS and removes the keyword lists.
2. **The four trackers** hardcode their data in the HTML.
   `autism-dashboard.html` is 144 KB, mostly numbers. Pull the data into JSON
   and the pages get small and the data becomes reusable.

Now templated and sharing the one stylesheet: the homepage, `/archive/`,
`/perspectives/`, the eight `/topics/*` pages, `/ask/`, `/research/` and
`/index-tool/`.

Still standalone with their own inline CSS, working exactly as before:
`about.html`, `about-rich.html`, `podcast.html`, `/research/thrive-sdoh/`
and the six `/tools/*` tracker pages. These have always had their own custom
navigation rather than the site header, so that is original behaviour.


## 7. Read this too

`DESIGN-CHANGES.md` lists the 29 places where an older edition now picks up
Edition 70's newer styling. Nothing was invented, but you should confirm you are
happy with each one. The short version: older editions get the scrolling related
carousel instead of the old three-column grid.

# What changed visually, and why

Reconciling 25 forked stylesheets into one means older editions now use the
current design. That is the point of the exercise, but you should see the list
and confirm you are happy with it.

Everything below is a case where an older edition had an out-of-date value and
now inherits Edition 70's version. Nothing was invented. The 542 individual
differences across 68 pages collapse to **29 distinct changes**.

## The changes

| What | Property | Was | Now | Pages affected |
|---|---|---|---|---|
| `.site-header` | `z-index` | `10` | `60` | 66 |
| `.related` | `max-width` | `860px` | `820px` | 57 |
| `.related` | `padding` | `0 24px` | `0 clamp(18px,4vw,28px)` | 57 |
| `.related` | `margin` | `40px auto 0` | `44px auto 0` | 51 |
| `.related-grid` | `grid-template-columns` | `1fr` | `none` | 51 |
| `.related-card` | `min-height` | `110px` | `120px` | 50 |
| `.related-card` | `transition` | `transform .2s ease` | `transform .2s ease,box-shadow .2s ` | 50 |
| `.related-card:hover` | `transform` | `translateY(-3px)` | `translateY(-4px)` | 50 |
| `.related-card.cat-digital-health` | `background` | `var(--grad)` | `linear-gradient(135deg,#0FA3A3,#2E` | 50 |
| `.related` | `margin` | `40px 0 10px` | `44px auto 0` | 15 |
| `[data-theme="dark"] .cform input, [data-theme="dark"] .cform textarea` | `color` | `#DCEAEA` | `var(--ink)` | 9 |
| `.fig` | `padding` | `24px 26px` | `22px 24px` | 4 |
| `.fig` | `margin` | `32px 0` | `30px 0` | 4 |
| `.fig-sub` | `margin` | `0 0 18px` | `0 0 16px` | 4 |
| `.fig figcaption` | `margin-top` | `16px` | `14px` | 4 |
| `.fig figcaption` | `padding-top` | `14px` | `12px` | 4 |
| `.num-grid` | `grid-template-columns` | `repeat(auto-fill,minmax(220px,1fr)` | `repeat(auto-fill,minmax(200px,1fr)` | 2 |
| `.contact-section` | `padding` | `60px clamp(20px,4vw,48px)` | `clamp(44px,7vw,80px) clamp(20px,4v` | 2 |
| `.contact-inner h2` | `font-size` | `30px` | `clamp(26px,4vw,38px)` | 2 |
| `.num-big` | `font-size` | `26px` | `24px` | 1 |
| `.related-grid` | `display` | `grid` | `flex` | 1 |
| `.related-grid` | `grid-template-columns` | `repeat(3,1fr)` | `none` | 1 |
| `[data-theme="dark"] .ed-callout` | `border` | `1px solid #25373F` | `1px solid #2C3F47` | 1 |
| `[data-theme="dark"] .ed-callout p` | `color` | `#EAF4F4` | `#EAF6F6` | 1 |
| `.post-banner.cat-governance` | `background` | `linear-gradient(135deg,#1B3A4B,#4A` | `linear-gradient(135deg,#3C5A6E,#5A` | 1 |
| `.related-card.cat-governance` | `background` | `linear-gradient(135deg,#1B3A4B,#4A` | `linear-gradient(135deg,#3C5A6E,#5A` | 1 |
| `.pick-card.cat-governance` | `background` | `linear-gradient(135deg,#1B3A4B,#4A` | `linear-gradient(135deg,#3C5A6E,#5A` | 1 |
| `.card.cat-governance .card-banner` | `background` | `linear-gradient(135deg,#1B3A4B,#4A` | `linear-gradient(135deg,#3C5A6E,#5A` | 1 |
| `.stat-fill.cat-governance` | `background` | `linear-gradient(90deg,#1B3A4B,#4A7` | `linear-gradient(90deg,#3C5A6E,#5A7` | 1 |

## Reading the list

Nearly all of it is the **related editions carousel**. Older editions showed it
as a fixed three-column grid. Edition 62 onward switched to a horizontal
scrolling row with arrow buttons. Older editions now get the scrolling version.

The rest is minor spacing and shade alignment: figure padding down 2px, the
governance banner gradient standardised, the sticky header z-index raised from
10 to 60 so the header stops being overlapped.

## If you want an older edition frozen exactly as published

Tell me which one. I add its old values to
`src/page-assets/<slug>.css` and that page keeps its original look while
everything else moves forward. I would not recommend it for more than one or
two, because it reintroduces the forking problem in miniature.

## What was verified

- Every one of the 68 pages was checked declaration by declaration. Zero
  selectors were lost.
- Cascade order was checked for every pair of rules that could compete for the
  same element. Three pairs were flagged and all three proved impossible to
  co-occur, because their parent classes are mutually exclusive. **Zero real
  ordering changes.**
- After building, the readable text of all 68 pages was compared against the
  originals. **68 of 68 identical.**

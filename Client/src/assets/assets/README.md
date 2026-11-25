# CareBook assets

Logos, icons and illustrations from the CareBook designs. All are made for this course project.
Brand colours: teal `#0b7a6e`, dark teal `#075b52`, ink `#17302d`, light teal (on dark) `#12a08f`, coral accent `#e2674a`.

## Logo (`logo/`)
| File | Use it for |
| --- | --- |
| `logo.svg` | The full logo on light backgrounds (navbar) |
| `logo-on-dark.svg` | The full logo on dark backgrounds (footer) |
| `logo-mark.svg` | The square mark on its own, e.g. app icons. Also copied to `client/public/favicon.svg` |
| `logo-mark-white.svg` | The mark on a teal or photo background |
| `png/` | PNG copies for slides, documents and social posts (`logo.png`, `logo-on-dark.png`, `logo-mark-512.png`) |

The word "CareBook" in the logo is drawn as shapes (from Inter Display ExtraBold), so it looks the same on any computer, even without the font.
Keep clear space around the logo of at least half the mark's height, and don't stretch, recolour or add effects to it.

## Icons (`icons/`)
26 line icons, 24 × 24, 2px stroke. They use `currentColor`, so they take the text colour around them.

In React, either import a file as an image:
```jsx
import calendarIcon from '../assets/icons/calendar.svg';
<img src={calendarIcon} alt="" width="20" height="20" />
```
or, to colour an icon with CSS, use the `Icon` component in `components/Icon.jsx`, which draws the same shapes inline.

## Illustrations (`illustrations/`)
| File | Where it's used |
| --- | --- |
| `hero-heartbeat.svg` | The green panel behind the cards on the home page |
| `empty-calendar.svg` | The patient dashboard when there are no appointments |

## Browser tab and phone icons (`client/public/`)
`favicon.svg`, `favicon-32.png` and `apple-touch-icon.png` (180 × 180), linked from `client/index.html`.

## Design references
The full-page design mockups are in `design/mockups/` at the project root, with a preview of every asset in `design/assets-preview.png`.

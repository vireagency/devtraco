# Devtraco Limited — Website

A modern, single-page website for **Devtraco Limited**, one of Ghana's leading real estate developers since 1993.

## File Structure

```
devtraco/
├── index.html                       # Main page (all sections)
├── assets/
│   ├── css/style.css                # All styling (brand tokens + components)
│   ├── js/main.js                   # Reveals, counter, slider, filter, mobile menu
│   ├── fonts/                       # Monolith typeface (4 styles)
│   │   ├── Monolith-Light.otf
│   │   ├── Monolith-LightItalic.otf
│   │   ├── Monolith-Regular.otf
│   │   └── Monolith-RegularItalic.otf
│   └── img/devtraco-logo.png        # Brand logo
```

## Typography

The site uses **Monolith** as its single typeface across all text — headings, body, labels, navigation, and forms. Hierarchy is built from three things, not three fonts:

- **Weight**: body copy uses Light (300); headings, emphasis, and labels use Regular (400)
- **Case + tracking**: small uppercase labels with wide letter-spacing carry the role that a monospace would play in a multi-font system
- **Italic**: the `<em>` tag inside headlines (e.g. "Building Ghana's *finest addresses*") uses Monolith Italic in brand blue — this is the main expressive moment in each headline

Font files are loaded locally from `assets/fonts/` (no external font services), so the site renders the same offline and stays fast on first paint.

## How to View / Deploy

**Local preview**
Open `index.html` directly in a browser, or run a quick local server:
```bash
cd devtraco
python3 -m http.server 8080
# then visit http://localhost:8080
```

**Deploy** — drop the whole `devtraco/` folder onto any static host:
- Netlify (drag-and-drop)
- Vercel
- GitHub Pages
- Hostinger / cPanel (upload via FTP into `public_html`)

No build step. No backend required.

## Brand Colors (CSS variables in `style.css`)

| Token | Hex | Role |
|---|---|---|
| `--dt-blue` | `#1B3A8C` | Primary royal navy (from logo) |
| `--dt-blue-deep` | `#122456` | Deep navy for dark sections |
| `--dt-blue-night` | `#0A1638` | Near-black navy (stats, footer) |
| `--dt-yellow` | `#F5C518` | Primary golden yellow (from logo) |
| `--dt-yellow-warm` | `#E8B923` | Warmer gold accent |
| `--cream` | `#FAF8F2` | Warm off-white background |
| `--ink` | `#0E1320` | Body text |

To tweak any color, edit the `:root` block at the top of `style.css` — every component updates automatically.

## Sections

1. **Announcement bar** — sales line + active selling phase
2. **Header** — sticky nav with logo, anchor links, CTA
3. **Hero** — editorial split layout with floating stat callout
4. **Marquee** — auto-scrolling stat strip in brand blue
5. **About** — drop-cap editorial copy with company signature
6. **Stats** — animated counters (1,800 / 1,200 / 300 / 205 / 33)
7. **Featured Project** — full magazine-style spread for Devtraco Courts
8. **Why Devtraco** — 6-card hover grid (navy fill on hover)
9. **Projects gallery** — filterable grid (All / Current / Completed / Upcoming)
10. **Testimonials** — slider with resident quotes
11. **CTA strip** — bold yellow band
12. **Contact** — split layout: info + enquiry form
13. **Footer** — four-column with newsletter and socials

## Replacing Placeholder Imagery

The site uses Unsplash images (free for commercial use). To swap for real Devtraco photography:
- Hero: `index.html` → search `hero-visual` → replace the `<img src="...">`
- Featured project: search `featured-image` → replace
- Project gallery: each `<a class="project-card">` has its own `<img>`

Recommended dimensions: hero 1400×1050, featured 1400×900, gallery 900×1125 (4:5) or 1400×900 (wide).

## Copy / Content to Update

All copy lives in `index.html` as plain HTML. Specifically:

- **Phone**: search `+233 (0) 302 740 740` (appears 3×)
- **Email**: search `sales@devtraco.com`
- **Address**: search `Devtraco Courts, Tema`
- **Project names** (Adenta Townhomes, Sakumono Villas, The Ridge Residences, Coastal Estate): I used plausible Ghana-context placeholders — replace with your actual portfolio.

## Browser Support

Tested patterns: Chrome, Safari, Firefox, Edge — current and last two majors. Uses modern CSS (`backdrop-filter`, CSS variables, `aspect-ratio`, `clamp()`) so very old browsers will degrade gracefully.

## Performance Notes

- No jQuery — pure vanilla JS, ~5KB
- Three Google Fonts loaded (Fraunces, DM Sans, JetBrains Mono) — swap fewer weights if you want even faster paint
- Images are externally hosted (Unsplash CDN) — replace with locally optimized `.webp` files for production

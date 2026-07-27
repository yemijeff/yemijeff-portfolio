# Yemi Jeff Senbanjo — Portfolio

A 20-page editorial portfolio site for Yemi Jeff Senbanjo, Product Designer based in Lagos, Nigeria.

Design references: Stripe Press, Linear, Medium, Apple editorial.

## Repository & Deployment

- **GitHub Repository**: `https://github.com/yemijeff/yemijeff-portfolio`
- **Main Branch**: `main`

## Structure

- `index.html` — Homepage (hero, selected work, timeline, notebook preview)
- `work.html` — Case study index (editorial list)
- `case-*.html` — Case studies (Tryblie, Bankeasy with 14 real UI screenshots, Payvice, Receipt App)
- `library.html` — Filterable archive with client-side search & tag filters
- `library-*.html` — Six library entries
- `about.html` — About page with career timeline
- `resume.html` — Résumé, built directly from real CV
- `notebook-*.html` — Five essays
- `style.css` — Canonical shared stylesheet linked across all HTML pages
- `sync-css.js` — Utility script to link or inline `style.css` across all HTML pages

## Design System

- **Palette**: Background `#FAFAF8` · Text `#111111` · Secondary `#6B7280` · Border `#E7E5E4` · Surface `#FFFFFF`
- **Typography**: Headings: Newsreader (serif) · Body: Inter
- **Layout**: 12-column grid, 80px desktop margins (48px tablet, 24px mobile), 760px max content width for prose
- **Motion**: Restrained scroll reveals via `IntersectionObserver`, reading-progress bar, graceful hover states, `prefers-reduced-motion` compliance

## Running & Maintenance

No framework or server required — plain HTML/CSS/vanilla JS throughout. Open any `.html` file directly in a browser, or run a local static server:

```bash
python3 -m http.server 8000
```

### Stylesheet Sync Tool

To maintain `style.css` as the single canonical source:
- Edit `style.css` directly for any visual or layout changes.
- If standalone single-file HTML outputs are ever required (e.g. for offline previews without relative path support), run:
  ```bash
  node sync-css.js --inline
  ```
- To switch back to external stylesheet linking:
  ```bash
  node sync-css.js
  ```

## Contact & Links

- **Email**: `yemijefff@gmail.com`
- **Phone**: +234 816 404 0068
- **LinkedIn**: `https://linkedin.com/in/yemijeffsenbanjo`

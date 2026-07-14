# Yemi Jeff Senbanjo — Portfolio

A 20-page editorial portfolio site for Yemi Jeff Senbanjo, Product Designer.

Design references: Stripe Press, Linear, Medium, Apple editorial.

## Structure

- `index.html` — homepage
- `work.html` — case study index
- `case-*.html` — four full case studies (Tryblie, Bankeasy, Payvice, Receipt App)
- `library.html` — filterable archive
- `library-*.html` — six library entries
- `about.html` — about page with career timeline
- `resume.html` — résumé, built from the real CV
- `notebook-*.html` — five essays
- `style.css` — shared stylesheet (each HTML page also carries its own inlined copy of this CSS so every page works fully standalone, with or without a server)

## Design system

- Background `#FAFAF8` · Text `#111111` · Secondary `#6B7280` · Border `#E7E5E4`
- Headings: Newsreader (serif) · Body: Inter
- 12-column grid, 80px margins, 760px max content width

## Running locally

No build step — every page is plain HTML/CSS/JS. Open any `.html` file directly in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

## Known placeholders

- LinkedIn URL, Behance, and Dribbble links are placeholders — update with real profile URLs.
- Contact email in the site chrome (`hello@yemijeff.com`) differs from the real CV email (`yemijefff@gmail.com`) — reconcile before going live.
- The four main case studies (Tryblie, Bankeasy, Payvice, Receipt App) use illustrative project narratives written before the real CV was available — consider rewriting with real project context.

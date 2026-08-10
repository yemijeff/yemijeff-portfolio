# Project Handoff — Yemi Jeff Senbanjo Portfolio Site

This document is a complete brief for continuing work on this project in a new
tool/environment. It covers who this is for, what's been built, the design
system, exact file inventory, what's real vs. placeholder, and what's left to do.

Paste this whole document as context/system prompt, and give the tool access to
all files in this folder.

---

## 1. Who this is for

**Yemi Jeff Senbanjo** — Product Designer (UI/UX), Lagos, Nigeria, 6+ years of
experience across fintech, healthcare, enterprise software, community
platforms, and emerging tech (XR, AI). Currently:
- Product Designer (Digital Banking, Contract) — Bankeasy Microfinance Bank (Aug 2025–Present)
- Product Designer — ITEX Integrated Services Ltd (Dec 2024–Present)
- Previously: Lead Facilitator/Instructor at Cirvee, UI/UX Designer at The Onyx
  Truth, UI/UX Designer at Niche-Plus Healthcare, Design Facilitator at Perxels
  Design School
- Education: B.Sc. Quantity Surveying (University of Ilorin), Product Design
  Certification (Perxels), Game Design & Development (AR/VR Africa)
- Real contact: `yemijefff@gmail.com`, +234 816 404 0068
- Tools: Figma, FigJam, ChatGPT, Claude, Adobe Photoshop, Adobe Illustrator, Blender, Unity 3D

The site's job: present this as a **digital publication**, not a typical
design-portfolio grid — inspired by Stripe Press (editorial gravity), Linear
(simplicity/restraint), Medium (readability), Apple (craftsmanship). The goal
line from the original brief: *"This designer is someone I'd enjoy working
with."*

---

## 2. Design system (already implemented, keep consistent)

**Palette**
- Background `#FAFAF8`
- Primary text `#111111`
- Secondary text `#6B7280`
- Border `#E7E5E4`
- Surface `#FFFFFF`
- No brand accent color — color comes from project imagery/swatches, not UI chrome.

**Typography**
- Headings: **Newsreader** (serif), loaded from Google Fonts
- Body: **Inter**, loaded from Google Fonts
- Type scale roughly: Display 72 / H1 56 / H2 40 / H3 32 / H4 24 / Body-lg 20 / Body 18 / Small 16 / Caption 14

**Layout**
- 12-column grid, 80px desktop margins (48px tablet, 24px mobile)
- Max content width 720–760px for reading columns; 1200px wide wrapper for grids/lists
- 8pt spacing system

**Navigation**
- Logo "YJS" left, Work / Library / About / Contact right
- Nav is transparent at top of page, gains a blurred background + border only after scrolling (`.scrolled` class toggled via JS on `window.scroll`)

**Motion (intentionally subtle — avoid anything heavier)**
- Fade-up scroll reveals via `IntersectionObserver` (`.reveal` / `.reveal.in` classes)
- Reading-progress bar (case study / article pages only), driven by scroll position
- Hover: gentle translateY lifts, underline-in on links, image zoom ~1.01–1.03 scale, no shadows/gradients/glassmorphism
- Everything wrapped in `@media (prefers-reduced-motion: reduce)` to disable transitions/animation for users who ask for it

**Explicitly avoided per the original creative brief:** glassmorphism, heavy
gradients, large shadows, excessive animation, Dribbble-style grids,
Behance-style layouts, skill progress bars, software icon walls, logo walls,
busy dashboards.

---

## 3. Technical implementation notes (important — read before editing)

- **Every HTML page has its CSS fully inlined in a `<style>` tag in the
  `<head>`.** This was a deliberate fix: an external shared `style.css` didn't
  render in the preview tool being used mid-project (relative-path fetches
  weren't resolving), so each page was made fully self-contained so it renders
  correctly no matter how it's opened.
  - `style.css` still exists in the folder as the canonical/shared source, but
    **it is not currently linked by any page** — editing it alone will not
    change the live pages.
  - **This is the biggest technical debt in the project.** Any styling change
    currently has to be applied to the `<style>` block inside all ~20 HTML
    files individually. If Antigravity (or whatever tooling is doing this next)
    can restructure this into a real build step — a shared external
    `style.css` or a templating/component approach — that would meaningfully
    improve maintainability. Just make sure whatever replaces it still works
    when opened as static files (no build server assumed) unless you're also
    setting up real hosting.
- No framework, no build step — plain HTML/CSS/vanilla JS throughout.
- All internal links are relative (`work.html`, `case-bankeasy.html`, etc.) and
  have been fully audited — there are currently **zero dead `href="#"`
  links** and every internal link resolves to a real file.
- Client-side search/filter on the Library page (`library.html`) is vanilla JS,
  filtering by industry/platform/role/year/search text against `data-*`
  attributes on each card.

---

## 4. Full file inventory

| File | Purpose | Content status |
|---|---|---|
| `index.html` | Homepage — hero, current focus, selected work, experience stats, "what I believe," library preview, notebook preview, teaching, about preview, contact | Real bio/stats copy from brief; illustrative project blurbs |
| `work.html` | Case study index (editorial list, not a grid) | Real |
| `case-tryblie.html` | Case study: Tryblie (community platform) | **Illustrative/fictional narrative** — written before real CV was available. Color-swatch placeholders, no real screenshots. |
| `case-bankeasy.html` | Case study: Bankeasy (digital banking) | **Partially real** — narrative is still illustrative, but this file now has **14 real embedded screenshots** (as base64 `<img>` tags, `.has-shot` class replacing the old color-swatch placeholder divs). This file is ~2MB because of the embedded images. |
| `case-payvice.html` | Case study: Payvice (payments dashboard) | Illustrative/fictional narrative, color-swatch placeholders only |
| `case-receipt-app.html` | Case study: Receipt App (expense tracking) | Illustrative/fictional narrative, color-swatch placeholders only |
| `library.html` | Filterable archive/grid of all projects (search + industry/platform/role/year filters) | Real structure, mix of real (4 main projects) and invented smaller entries |
| `library-atlas.html` | Library entry: Atlas Design System | Invented/illustrative |
| `library-classroom-copilot.html` | Library entry: Classroom Copilot | Invented/illustrative |
| `library-handspace.html` | Library entry: Handspace (XR) | Invented/illustrative |
| `library-portfolio-review-kit.html` | Library entry: Portfolio Review Kit | Invented/illustrative |
| `library-quietfeed.html` | Library entry: Quietfeed | Invented/illustrative |
| `library-ledgerline.html` | Library entry: Ledgerline | Invented/illustrative |
| `about.html` | Story, how-I-work, career timeline, teaching, writing, outside-design, "now," contact | Real career timeline (matches CV); rest is reasonable-but-invented voice/detail |
| `resume.html` | Full résumé | **Fully real** — rebuilt directly from `Yemi_Jeff_CV2026.pdf`. Professional summary, all 6 real roles with real bullet points, real achievements, real skills/tools, real education. |
| `notebook-building-ai.html` | Essay: Building products with AI | Invented (written in Yemi's implied voice) |
| `notebook-future-xr.html` | Essay: The future of XR | Invented |
| `notebook-basketball.html` | Reflection: Design lessons from basketball | Invented |
| `notebook-books.html` | List: Books worth reading | Invented |
| `notebook-simplicity.html` | Essay: Why simplicity is difficult | Invented |
| `style.css` | Canonical shared stylesheet | **Currently orphaned — not linked by any page.** See technical notes above. |
| `README.md` | Repo documentation | Real, but written before the Bankeasy image update — may need a refresh |
| `.gitignore` | Standard ignores | Fine as-is |
| `images/bankeasy/` | Empty folder | Leftover from the Bankeasy screenshot work; images ended up inlined as base64 instead of referenced as files, so this folder is currently unused |

---

## 5. What's real vs. what needs reconciling

This is the single most important section for whoever picks this up next.

**Fully real / from source material:**
- All contact/bio facts in `resume.html`
- Career timeline dates and employers in `about.html` and `resume.html`
- Bankeasy case study now has 14 real product screenshots embedded

**Explicitly illustrative (written before the real CV was available), needs a decision:**
- The four main case study *narratives* (Tryblie, Bankeasy, Payvice, Receipt App) describe plausible but invented research findings, quotes, metrics ("31% reduction in churn," etc.), and design decisions. They are **not** accounts of Yemi's real work on these projects. Now that his real CV is available (ITEX POS/PTSP platforms, Bankeasy digital banking, Niche-Plus healthcare UX, etc.), these should ideally be rewritten to reflect real project stories — or clearly kept as portfolio "case study exercises" if that's the intent.
- All 5 Notebook essays and all 6 secondary Library entries are entirely invented content, written in a plausible voice, not sourced from Yemi.

**Known inconsistencies to resolve:**
- Site chrome (footer, contact section, nav) uses `hello@yemijeff.com`. The real CV
  uses `yemijefff@gmail.com`. `resume.html` currently uses the real one — every
  other page uses the placeholder. Pick one and make it consistent everywhere.
- `LinkedIn` links point to a placeholder URL: `https://www.linkedin.com/in/yemi-jeff-3026181a9/`. Needs the real URL.
- `Behance` and `Dribbble` links (referenced in the original creative brief's
  nav/contact spec, and present on `resume.html`) still point to `#` — need
  real URLs.
- Only Bankeasy has real screenshots; the other three case studies still use
  flat color-swatch `<div>` placeholders (e.g. `style="background:#2C4A3E;"`)
  where real UI imagery should eventually go.

---

## 6. Deployment status

- A git repo was initialized locally (in the Claude sandbox) with one clean
  commit containing all files, then packaged as `yemijeff-portfolio.zip` and a
  `yemijeff-portfolio.bundle` for the user to take and push themselves.
- **The zip's `.git` folder was accidentally excluded** during packaging — so
  the zip the user downloaded has all the files but no git history. This
  caused a string of `fatal: not a git repository` errors when the user tried
  to push.
- The user has been walked through: re-initializing git locally on their own
  machine, creating a GitHub repo (`yemijeff/yemijeff-portfolio`), and pushing.
  They hit two more snags along the way:
  1. Accidentally ran `git init` / `git add -A` in their **home directory**
     instead of the project folder (caught before real damage — macOS blocked
     git from touching protected system folders, but a stray `.git` in `~`
     needed to be removed with `rm -rf .git`).
  2. Tried to authenticate with their GitHub **password**, which GitHub no
     longer accepts for git operations — they need a **Personal Access
     Token** instead. They were mid-way through generating one
     (`github.com/settings/tokens` → Tokens (classic) → Generate new token
     (classic) → check `repo` scope) when this handoff was requested.
  3. **Security note:** a possible partial token (`WsDwP4MrbcFiBYb`) appeared
     in a terminal screenshot shared in chat — the user was told to treat it
     as compromised and revoke it on GitHub immediately if it's real. Worth
     confirming this was actually done before continuing.
- **As of this handoff, it's unconfirmed whether the push to GitHub has
  succeeded.** Whoever picks this up should check the repo at
  `github.com/yemijeff/yemijeff-portfolio` (or wherever they landed) before
  assuming deployment is done, and should NOT assume the token issue is resolved.

---

## 7. Suggested next steps, roughly in priority order

1. **Confirm the GitHub push actually completed** and the repo is in a known-good state.
2. **Decide the plan for the shared stylesheet** — re-link `style.css` properly
   (if real hosting is now in place and relative paths will resolve), or
   keep inlined-per-page but build tooling so `style.css` stays the single
   source of truth and pages are regenerated from it, rather than hand-edited
   20 times.
3. **Reconcile contact info** (`hello@yemijeff.com` vs `yemijefff@gmail.com`) site-wide.
4. **Get real URLs** for LinkedIn, Behance, Dribbble and wire them in everywhere they appear.
5. **Decide on the case studies**: rewrite Tryblie/Payvice/Receipt App with real
   project context (now that the CV is available), or explicitly relabel them
   as illustrative/concept work if they're meant to stay as-is.
6. **Source or replace remaining placeholder imagery** — only Bankeasy has real
   screenshots; the rest still use flat color-swatch divs.
7. Consider whether GitHub Pages (or another static host) should be turned on
   now that the repo exists, so this stops being "files on a laptop" and
   becomes a real, linkable, live site.

---

## 8. What NOT to change without discussion

- The overall information architecture and page structure — this was built
  directly from a detailed, approved creative brief (Stripe Press / Linear /
  Medium / Apple editorial references, specific homepage section order, case
  study structure with 15+ named sections, etc.). Restructuring it wholesale
  would undo deliberate work.
- The "no grid, editorial list" pattern for Work and the specific
  hover-preview interaction on the homepage's Selected Work section — these
  were explicit requirements, not defaults.
- The restrained motion/no-decoration visual language — it's easy to
  "improve" this into something busier; that would work against the brief.

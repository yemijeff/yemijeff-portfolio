# Implementation Plan — Yemi Jeff Senbanjo Portfolio Site Handoff & Maintenance

This plan addresses the handoff brief for continuing work on the Yemi Jeff Senbanjo portfolio website located at `/Users/adeyemijeff/Downloads/yemijeff-portfolio`.

## Current Status & Verification
- **Git Repository**: Verified locally at `/Users/adeyemijeff/Downloads/yemijeff-portfolio`. The repository is initialized, connected to remote `https://github.com/yemijeff/yemijeff-portfolio.git`, and the local `main` branch is in sync with `origin/main`.
- **Files Inventory**: All 23 project files (HTML pages, `style.css`, `README.md`, etc.) are intact.

---

## User Review Required

> [!IMPORTANT]
> **1. Contact Email Alignment**  
> Site chrome (footer/contact section across `index.html`, `about.html`, etc.) currently uses `hello@yemijeff.com`, while `resume.html` and the real CV use `yemijefff@gmail.com`. We recommend standardizing site-wide to `yemijefff@gmail.com` (or `hello@yemijeff.com` if custom domain email is active).
> 
> **2. Social Media URLs**  
> `LinkedIn` links point to `https://www.linkedin.com/in/yemi-jeff-3026181a9/`, while `Behance` and `Dribbble` currently point to `#` placeholders. We need the real URLs for Behance and Dribbble if available.
> 
> **3. Stylesheet Architecture (`style.css` vs Inlined CSS)**  
> Currently, each HTML file contains an inlined `<style>` block (~500 lines of CSS per page), while `style.css` is orphaned. We propose linking `style.css` as a shared external stylesheet `<link rel="stylesheet" href="style.css">` across all HTML pages, and keeping a lightweight sync utility or script to ensure single-source-of-truth maintainability without requiring a complex web server.

---

## Open Questions

> [!NOTE]
> - Do you prefer standardizing all contact email links to **`yemijefff@gmail.com`** across the site?
> - Do you have the active URLs for your **Behance** and **Dribbble** profiles, or should we update/hide those secondary links until provided?
> - Are the case studies for **Tryblie**, **Payvice**, and **Receipt App** intended to be rewritten with real project narratives (matching your updated CV context in ITEX / Niche-Plus / Bankeasy), or should they remain as illustrative case study demonstrations?

---

## Proposed Changes

### Core CSS Architecture & Navigation

#### [MODIFY] [style.css](file:///Users/adeyemijeff/Downloads/yemijeff-portfolio/style.css)
- Serve as the single canonical stylesheet for the entire website.
- Ensure all component classes, layout rules, typography, and responsive media queries are complete and polished.

#### [MODIFY] All HTML pages (`index.html`, `work.html`, `about.html`, `resume.html`, `library.html`, `case-*.html`, `notebook-*.html`, `library-*.html`)
- Replace duplicate `<style>` blocks with `<link rel="stylesheet" href="style.css">` (with graceful fallback capability).
- Reconcile contact email (`yemijefff@gmail.com`) across footer / contact links.
- Update social links (LinkedIn, Behance, Dribbble).

---

### Maintenance & Sync Tooling

#### [NEW] [sync-css.js](file:///Users/adeyemijeff/Downloads/yemijeff-portfolio/sync-css.js)
- A zero-dependency script that can sync `style.css` into HTML files if inlining is ever needed, or validate clean CSS linking across all 20+ HTML files.

#### [MODIFY] [README.md](file:///Users/adeyemijeff/Downloads/yemijeff-portfolio/README.md)
- Update README to reflect the current GitHub remote, stylesheet architecture, and handoff state.

---

## Verification Plan

### Automated Verification
- Run local HTTP server (`python3 -m http.server 8000` or `npx serve`) and inspect all pages.
- Execute git status to verify clean state.

### Manual Verification
- Verify navigation bar, scroll transitions, reading progress bar, and card hover effects across all HTML pages.
- Verify contact email links and social links resolve correctly.
- Test responsive layout on mobile (375px), tablet (768px), and desktop (1200px+).

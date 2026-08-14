/* =============================================================
   Yemi Jeff Senbanjo — animations.js
   Central animation controller — all 7 effects
   ============================================================= */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------
     1. PAGE TRANSITION CURTAIN
     A dark bar sweeps left-to-right on internal link clicks,
     new page fades in cleanly.
  ------------------------------------------------------- */
  function initPageTransitions() {
    if (prefersReducedMotion) return;

    // Create curtain element
    const curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.appendChild(curtain);

    // Intercept all internal link clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      // Only handle internal same-site HTML links
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto') || link.target === '_blank') return;

      e.preventDefault();
      curtain.classList.remove('exit');
      curtain.classList.add('enter');

      setTimeout(() => {
        window.location.href = href;
      }, 480);
    });

    // On page load, quickly fade out the curtain
    curtain.classList.add('exit');
    setTimeout(() => { curtain.classList.remove('exit'); }, 550);
  }

  /* -------------------------------------------------------
     2. STAGGERED HERO TEXT REVEAL
     Splits h1 in .hero into words, animates each in sequence.
  ------------------------------------------------------- */
  function initHeroTextReveal() {
    if (prefersReducedMotion) return;

    const heroH1 = document.querySelector('.hero h1');
    if (!heroH1) return;

    // Split into words while preserving em tags
    const html = heroH1.innerHTML;
    const nodes = heroH1.childNodes;
    heroH1.innerHTML = '';

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split plain text into words
        node.textContent.split(' ').forEach((word, i, arr) => {
          if (!word.trim()) return;
          const span = document.createElement('span');
          span.className = 'hero-word';
          span.textContent = word;
          heroH1.appendChild(span);
          if (i < arr.length - 1) heroH1.appendChild(document.createTextNode(' '));
        });
      } else {
        // Preserve em/strong tags — wrap their text content instead
        const el = node.cloneNode(true);
        const wrapper = document.createElement('span');
        wrapper.className = 'hero-word';
        wrapper.appendChild(el);
        heroH1.appendChild(wrapper);
      }
    });

    // Apply staggered animation delays
    const words = heroH1.querySelectorAll('.hero-word');
    words.forEach((word, i) => {
      word.style.animationDelay = `${i * 0.055}s`;
    });
  }

  /* -------------------------------------------------------
     3. CURSOR GLOW
     A blue ambient radial gradient follows the cursor.
  ------------------------------------------------------- */
  function initCursorGlow() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return; // Skip touch devices

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      // Smooth lag: glow follows at 12% lerp
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      raf = requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* -------------------------------------------------------
     4. MARQUEE TICKER
     Injected into index.html via JS — fires only on homepage.
     Injects between the hero section and the "Currently" section.
  ------------------------------------------------------- */
  function initMarquee() {
    if (prefersReducedMotion) return;

    const focusSection = document.getElementById('focus');
    if (!focusSection) return; // Only on homepage

    const items = [
      'Available for Work',
      'Product Designer',
      'Lagos · Remote',
      '6+ Years Experience',
      'UI / UX Design',
      'FinTech · Healthcare · Enterprise',
      'Design Systems',
      'Interaction Design',
      'Open to Opportunities',
    ];

    // Build two identical tracks for seamless looping
    const ticker = items.map(item => `
      <span class="marquee-item">
        <span>${item}</span>
        <span class="marquee-dot"></span>
      </span>`).join('');

    const marqueeSection = document.createElement('section');
    marqueeSection.className = 'marquee-section';
    marqueeSection.setAttribute('aria-hidden', 'true');
    marqueeSection.innerHTML = `
      <div class="marquee-track">
        ${ticker}${ticker}
      </div>`;

    focusSection.insertAdjacentElement('afterend', marqueeSection);
  }

  /* -------------------------------------------------------
     5. MAGNETIC BUTTONS
     CTAs attract slightly toward the cursor on hover.
  ------------------------------------------------------- */
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;

    // Apply to all .btn and .btn-magnetic elements
    const btns = document.querySelectorAll('.btn, .btn-magnetic');

    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1), background .25s ease, color .25s ease';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  /* -------------------------------------------------------
     6. COUNT-UP NUMBERS
     Animates stat numbers from 0 to their target on scroll.
     Target: elements with data-count="<number>" attribute.
  ------------------------------------------------------- */
  function initCountUp() {
    if (prefersReducedMotion) return;

    // Auto-populate data-count from existing .stat-num text
    document.querySelectorAll('.stat-num').forEach(el => {
      const text = el.textContent.trim();
      const match = text.match(/^[\d.]+/);
      if (match && !el.hasAttribute('data-count')) {
        el.setAttribute('data-count', match[0]);
        el.setAttribute('data-suffix', text.slice(match[0].length));
        el.textContent = '0' + (el.getAttribute('data-suffix') || '');
      }
    });

    const statEls = document.querySelectorAll('.stat-num[data-count]');
    if (!statEls.length) return;

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();

        el.classList.add('counting');

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out expo
          const eased = 1 - Math.pow(2, -10 * progress);
          const current = target * eased;
          // Show one decimal if original had it
          el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
            el.classList.remove('counting');
          }
        }

        requestAnimationFrame(update);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    statEls.forEach(el => countObserver.observe(el));
  }

  /* -------------------------------------------------------
     7. IMAGE PARALLAX
     Hero images and case study cover images scroll at 30%
     the speed of the page for a subtle depth effect.
  ------------------------------------------------------- */
  function initParallax() {
    if (prefersReducedMotion) return;

    // Target: case-shot-img in the hero position and work-preview
    const imgs = document.querySelectorAll('.case-shot-container.wide .case-shot-img, .work-preview');
    if (!imgs.length) return;

    let ticking = false;

    function updateParallax() {
      imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.bottom < -100 || rect.top > viewH + 100) return;

        const centerOffset = (rect.top + rect.height / 2) - viewH / 2;
        const shift = centerOffset * -0.08;
        img.style.transform = `translateY(${shift}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  /* -------------------------------------------------------
     STAGGERED REVEAL — enhance existing .reveal system
     Adds auto-stagger within common list containers.
  ------------------------------------------------------- */
  function initStaggeredReveal() {
    const lists = document.querySelectorAll('.focus-list, .notebook-list, .teaching-orgs, .stats-grid, .impact-grid');
    lists.forEach(list => {
      const children = list.querySelectorAll('.reveal, li');
      children.forEach((child, i) => {
        child.classList.add('reveal');
        child.style.transitionDelay = `${i * 0.07}s`;
      });
    });
  }

  /* -------------------------------------------------------
     THEME TOGGLE — Dark / Light mode with localStorage
  ------------------------------------------------------- */
  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const html = document.documentElement;

    // Apply saved preference immediately (no flash)
    const saved = localStorage.getItem('yjs-theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
    }

    function updateToggleLabel() {
      const isDark = html.getAttribute('data-theme') === 'dark' ||
        (!html.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      let next;
      if (!current) {
        next = systemPrefersDark ? 'light' : 'dark';
      } else {
        next = current === 'dark' ? 'light' : 'dark';
      }

      html.setAttribute('data-theme', next);
      localStorage.setItem('yjs-theme', next);
      updateToggleLabel();
    });

    updateToggleLabel();
  }

  /* -------------------------------------------------------
     BOOT — run all effects on DOMContentLoaded
  ------------------------------------------------------- */
  // Apply theme BEFORE render to prevent flash — runs immediately
  (function applyThemeEarly() {
    const saved = localStorage.getItem('yjs-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  /* -------------------------------------------------------
     CURRENTLY — cycling single-item text section
  ------------------------------------------------------- */
  function initCurrentlyCycler() {
    const stage = document.querySelector('.currently-stage');
    if (!stage) return;

    const items = [
      'Designing enterprise fintech products',
      'Building Tryblie',
      'Teaching Product Design',
      'Learning XR & Game Design',
      'Writing about design and technology',
    ];

    let current = 0;
    const textEl = stage.querySelector('.currently-text');
    if (!textEl) return;

    function getNextInterval() {
      // Random between 2500ms and 5000ms
      return Math.floor(Math.random() * 2500) + 2500;
    }

    function cycle() {
      // Fade out current
      textEl.classList.add('out');
      textEl.classList.remove('in');

      setTimeout(() => {
        current = (current + 1) % items.length;
        textEl.textContent = items[current];
        textEl.classList.remove('out');
        textEl.classList.add('in');

        setTimeout(() => {
          textEl.classList.remove('in');
        }, 600);

      }, 450); // matches .out animation duration

      setTimeout(cycle, getNextInterval() + 450);
    }

    // Kick off after first interval
    setTimeout(cycle, getNextInterval());
  }

  /* -------------------------------------------------------
     ABOUT TOUCH LIGHT
     A radial spotlight follows the cursor over the About hero,
     revealing the portrait by cutting a hole in the dimmer layer.
  ------------------------------------------------------- */
  function initAboutTouchLight() {
    const hero   = document.getElementById('about-hero');
    const dimmer = document.getElementById('about-hero-dimmer');
    if (!hero || !dimmer) return;

    // Skip on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return;

    if (prefersReducedMotion) {
      dimmer.style.background = 'rgba(10,10,10,0.45)';
      return;
    }

    // Spotlight is 580px radius — large, soft reveal
    const R = 580;

    let tx = -9999, ty = -9999; // target x/y
    let cx = -9999, cy = -9999; // current (lerped) x/y
    let active = false;
    let raf = null;

    function isDarkMode() {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') return true;
      if (theme === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Build spotlight gradient — fully transparent at center for maximum reveal
    function spotGradient(x, y) {
      if (isDarkMode()) {
        return `radial-gradient(circle ${R}px at ${x}px ${y}px,
          rgba(10,10,10,0.00) 0%,
          rgba(10,10,10,0.05) 38%,
          rgba(10,10,10,0.80) 80%
        )`;
      } else {
        return `radial-gradient(circle ${R}px at ${x}px ${y}px,
          rgba(245,243,240,0.00) 0%,
          rgba(245,243,240,0.06) 38%,
          rgba(245,243,240,0.82) 80%
        )`;
      }
    }

    function fullDim() {
      return isDarkMode() ? 'rgba(10,10,10,0.80)' : 'rgba(245,243,240,0.82)';
    }


    function loop() {
      if (!active) return;
      // Lerp 16% per frame — smooth but responsive
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      dimmer.style.background = spotGradient(cx, cy);
      raf = requestAnimationFrame(loop);
    }

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;

      if (!active) {
        active = true;
        cx = tx; cy = ty; // snap on first entry
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });

    hero.addEventListener('mouseleave', () => {
      active = false;
      cancelAnimationFrame(raf);
      // Smooth fade back to full dark
      dimmer.style.transition = 'background 0.55s ease';
      dimmer.style.background = fullDim();
      setTimeout(() => { dimmer.style.transition = ''; }, 600);
    });
  }


  function boot() {
    initThemeToggle();
    initAboutTouchLight();
    initCurrentlyCycler();
    initPageTransitions();
    initHeroTextReveal();
    initCursorGlow();
    initMarquee();
    initMagneticButtons();
    initCountUp();
    initParallax();
    initStaggeredReveal();
  }

})();


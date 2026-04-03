/**
 * presenter.js — Slide Presentation Mode
 *
 * Drop this script at the bottom of any slide HTML that follows the
 * dual-mode architecture (.frames > .frame > .viewport > .slide).
 *
 * Usage:  <script src="presenter.js"></script>
 *
 * Features:
 *  - "프레젠테이션" button (fixed, bottom-right)
 *  - Fullscreen overlay with cloned slides
 *  - Keyboard: P start, → Space next, ← prev, Home/End, F fullscreen, ESC exit
 *  - Touch swipe + mouse wheel navigation
 *  - Click on thumbnail frame → start at that slide
 *  - Nav bar with dots, prev/next, counter, fullscreen toggle, close
 *  - Entry animations for .anim elements
 *  - All injected DOM nodes carry class `slide-presenter-ui` for PDF-export hiding
 */

(function () {
  'use strict';

  if (window.__slidePresenterLoaded) return;
  window.__slidePresenterLoaded = true;

  /* ─────────────────────────────────────────────────────────────────
   * 0.  Watermark — author meta + HTML comment
   * ───────────────────────────────────────────────────────────────── */
  if (!document.querySelector('meta[name="author"]')) {
    const meta = document.createElement('meta');
    meta.name = 'author';
    meta.content = 'Jeongwoo';
    document.head.appendChild(meta);
  }
  if (!document.head.innerHTML.includes('Made by Jeongwoo')) {
    document.head.insertAdjacentHTML('beforeend', '\n<!-- Made by Jeongwoo -->\n');
  }

  /* ─────────────────────────────────────────────────────────────────
   * 1.  CSS injection
   * ───────────────────────────────────────────────────────────────── */
  const PRESENTER_CSS = `
/* ── Shared button token ─────────────────────────────────────── */
:root {
  --btn-h: 40px;
  --btn-px: 18px;
  --btn-fs: 13px;
  --btn-fw: 600;
  --btn-r: 10px;
  --btn-sm-h: 30px;
  --btn-sm-px: 12px;
  --btn-sm-fs: 11px;
  --btn-sm-r: 8px;
}

/* ── Present button ──────────────────────────────────────────── */
.sp-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  height: var(--btn-h);
  padding: 0 var(--btn-px);
  font-size: var(--btn-fs);
  font-weight: var(--btn-fw);
  border-radius: var(--btn-r);
  background: #24222d;
  color: #fff;
  border: none;
  font-family: inherit;
  letter-spacing: .02em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.2), 0 1px 4px rgba(0,0,0,.12);
  transition: background .15s, transform .12s, box-shadow .15s;
}
.sp-btn:hover {
  background: #3d3a4a;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0,0,0,.25);
}
.sp-btn:active { transform: translateY(0); }
.sp-btn svg { width: 14px; height: 14px; flex-shrink: 0; }

/* ── Overlay ─────────────────────────────────────────────────── */
.sp-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sp-overlay.active { display: flex; }

/* Viewport inside overlay */
.sp-overlay .viewport {
  width: 100%;
  max-width: calc((100vh - 52px) * 16 / 9);
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 0;
  box-shadow: none;
  position: relative;
  overflow: hidden;
  container-type: inline-size;
}

/* Slide transitions */
.sp-overlay .slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}
.sp-overlay .slide.state-active {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}

/* ── Nav bar ─────────────────────────────────────────────────── */
.sp-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 52px;
  padding: 0 16px;
  flex-shrink: 0;
  width: 100%;
  justify-content: center;
}

.sp-nav__btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,.08);
  border: none;
  color: rgba(255,255,255,.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background .15s, color .15s;
  flex-shrink: 0;
  font-family: inherit;
  line-height: 1;
}
.sp-nav__btn:hover { background: rgba(255,255,255,.15); color: #fff; }
.sp-nav__btn:disabled { opacity: .25; pointer-events: none; }

.sp-nav__dots {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 8px;
}

.sp-nav__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,.22);
  cursor: pointer;
  border: none;
  padding: 0;
  transition: background .2s, transform .2s;
  flex-shrink: 0;
}
.sp-nav__dot.active {
  background: var(--primary, #53acf9);
  transform: scale(1.4);
}

.sp-nav__counter {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,.35);
  font-variant-numeric: tabular-nums;
  margin: 0 8px;
  min-width: 36px;
  text-align: center;
  letter-spacing: .03em;
}
.sp-nav__counter .cur { color: var(--primary, #53acf9); }

.sp-nav__sep {
  width: 1px;
  height: 20px;
  background: rgba(255,255,255,.1);
  margin: 0 4px;
  flex-shrink: 0;
}

.sp-nav__fs {
  height: var(--btn-sm-h);
  padding: 0 var(--btn-sm-px);
  font-size: var(--btn-sm-fs);
  font-weight: var(--btn-fw);
  border-radius: var(--btn-sm-r);
  background: rgba(255,255,255,.07);
  border: none;
  color: rgba(255,255,255,.5);
  font-family: inherit;
  letter-spacing: .04em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background .15s, color .15s;
  flex-shrink: 0;
}
.sp-nav__fs:hover { background: rgba(255,255,255,.13); color: rgba(255,255,255,.8); }
.sp-nav__fs svg { width: 11px; height: 11px; flex-shrink: 0; }

.sp-nav__close {
  height: var(--btn-sm-h);
  padding: 0 var(--btn-sm-px);
  font-size: var(--btn-sm-fs);
  font-weight: var(--btn-fw);
  border-radius: var(--btn-sm-r);
  background: rgba(255,255,255,.07);
  border: none;
  color: rgba(255,255,255,.5);
  font-family: inherit;
  letter-spacing: .04em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background .15s, color .15s;
  flex-shrink: 0;
}
.sp-nav__close:hover { background: rgba(255,255,255,.13); color: rgba(255,255,255,.8); }

/* ESC hint */
.sp-esc {
  position: fixed;
  top: 16px;
  right: 20px;
  z-index: 1100;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,.2);
  letter-spacing: .06em;
  pointer-events: none;
  transition: opacity .3s;
}

/* Entry animations */
.sp-overlay .slide.state-active .anim {
  animation: spFadeUp 0.5s ease forwards;
}
.sp-overlay .slide.state-active .anim:nth-child(1) { animation-delay: 0.06s; opacity: 0; }
.sp-overlay .slide.state-active .anim:nth-child(2) { animation-delay: 0.14s; opacity: 0; }
.sp-overlay .slide.state-active .anim:nth-child(3) { animation-delay: 0.22s; opacity: 0; }
.sp-overlay .slide.state-active .anim:nth-child(4) { animation-delay: 0.30s; opacity: 0; }
.sp-overlay .slide.state-active .anim:nth-child(5) { animation-delay: 0.38s; opacity: 0; }

@keyframes spFadeUp {
  from { opacity: 0; transform: translateY(1.5cqw); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Body state */
body.sp-presenting { overflow: hidden; }
body.sp-presenting .sp-btn { display: none; }
body.sp-presenting .frames { pointer-events: none; }
`;

  const style = document.createElement('style');
  style.className = 'slide-presenter-ui';
  style.textContent = PRESENTER_CSS;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────────────────────────────
   * 2.  Detect slides
   * ───────────────────────────────────────────────────────────────── */
  const sourceSlides = [...document.querySelectorAll('.frames .slide')];
  if (!sourceSlides.length) return; // Nothing to present

  const SLIDE_COUNT = sourceSlides.length;

  /* ─────────────────────────────────────────────────────────────────
   * 3.  Create DOM
   * ───────────────────────────────────────────────────────────────── */

  // ── Present button
  const btn = document.createElement('button');
  btn.className = 'sp-btn slide-presenter-ui';
  btn.setAttribute('aria-label', '프레젠테이션 시작');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg> 프레젠테이션`;
  document.body.appendChild(btn);

  // ── Overlay
  const overlay = document.createElement('div');
  overlay.className = 'sp-overlay slide-presenter-ui';
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.innerHTML = `
    <div class="sp-esc" id="spEsc">ESC로 나가기</div>
    <div class="viewport" id="spViewport"></div>
    <nav class="sp-nav" aria-label="슬라이드 탐색">
      <button class="sp-nav__btn" id="spPrev" aria-label="이전 슬라이드" disabled>&#8249;</button>
      <div class="sp-nav__dots" id="spDots" role="tablist"></div>
      <span class="sp-nav__counter" id="spCounter"><span class="cur">1</span> / ${SLIDE_COUNT}</span>
      <div class="sp-nav__sep"></div>
      <button class="sp-nav__fs" id="spFs" aria-label="전체화면">
        <svg class="sp-fs-enter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
        <svg class="sp-fs-exit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:none"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>
        전체화면
      </button>
      <div class="sp-nav__sep"></div>
      <button class="sp-nav__close" id="spClose" aria-label="닫기">✕ 닫기</button>
      <button class="sp-nav__btn" id="spNext" aria-label="다음 슬라이드">&#8250;</button>
    </nav>
  `;
  document.body.appendChild(overlay);

  const spViewport = overlay.querySelector('#spViewport');
  const spDots     = overlay.querySelector('#spDots');
  const spCounter  = overlay.querySelector('#spCounter');
  const spPrev     = overlay.querySelector('#spPrev');
  const spNext     = overlay.querySelector('#spNext');
  const spClose    = overlay.querySelector('#spClose');
  const spFs       = overlay.querySelector('#spFs');
  const spFsEnter  = overlay.querySelector('.sp-fs-enter');
  const spFsExit   = overlay.querySelector('.sp-fs-exit');
  const spEsc      = overlay.querySelector('#spEsc');

  /* ─────────────────────────────────────────────────────────────────
   * 4.  Clone slides + build dots
   * ───────────────────────────────────────────────────────────────── */
  let clones = [];
  let dots = [];

  function buildClones() {
    spViewport.innerHTML = '';
    clones = sourceSlides.map(src => {
      const clone = src.cloneNode(true);
      clone.removeAttribute('id');
      clone.classList.remove('state-active', 'state-prev', 'state-next');
      spViewport.appendChild(clone);
      return clone;
    });
  }

  function buildDots() {
    spDots.innerHTML = '';
    dots = sourceSlides.map((_, i) => {
      const d = document.createElement('button');
      d.className = 'sp-nav__dot';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', `슬라이드 ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      spDots.appendChild(d);
      return d;
    });
  }

  buildClones();
  buildDots();

  /* ─────────────────────────────────────────────────────────────────
   * 5.  Navigation
   * ───────────────────────────────────────────────────────────────── */
  let cur = 0;
  let presenting = false;

  function goTo(i) {
    if (i < 0 || i >= SLIDE_COUNT) return;

    clones[cur].classList.remove('state-active');
    dots[cur].classList.remove('active');
    dots[cur].setAttribute('aria-selected', 'false');

    cur = i;

    clones[cur].classList.add('state-active');
    dots[cur].classList.add('active');
    dots[cur].setAttribute('aria-selected', 'true');

    spCounter.innerHTML = `<span class="cur">${cur + 1}</span> / ${SLIDE_COUNT}`;
    spPrev.disabled = cur === 0;
    spNext.disabled = cur === SLIDE_COUNT - 1;
  }

  /* ─────────────────────────────────────────────────────────────────
   * 6.  Start / Stop
   * ───────────────────────────────────────────────────────────────── */
  function startPresent(startIndex) {
    if (presenting) return;
    presenting = true;

    // Close editor if open
    if (window.__slideEditor && typeof window.__slideEditor.close === 'function') {
      window.__slideEditor.close();
    }

    // Re-clone to pick up any inline style edits from editor.js
    buildClones();

    cur = (startIndex !== undefined) ? startIndex : 0;

    clones.forEach(c => c.classList.remove('state-active'));
    dots.forEach(d => {
      d.classList.remove('active');
      d.setAttribute('aria-selected', 'false');
    });

    overlay.classList.add('active');
    document.body.classList.add('sp-presenting');

    goTo(cur);
    overlay.focus();

    setTimeout(() => { spEsc.style.opacity = '0'; }, 3000);
  }

  function stopPresent() {
    if (!presenting) return;
    presenting = false;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    overlay.classList.remove('active');
    document.body.classList.remove('sp-presenting');
    spEsc.style.opacity = '1';
    btn.focus();
  }

  // Expose for editor.js re-clone sync
  window.__slidePresenter = {
    start: startPresent,
    stop: stopPresent,
    reclone: buildClones,
    isPresenting: () => presenting,
  };

  /* ─────────────────────────────────────────────────────────────────
   * 7.  Fullscreen
   * ───────────────────────────────────────────────────────────────── */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      overlay.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    spFsEnter.style.display = isFs ? 'none' : '';
    spFsExit.style.display  = isFs ? ''     : 'none';
    spFs.lastChild.textContent = isFs ? ' 나가기' : ' 전체화면';
  });

  /* ─────────────────────────────────────────────────────────────────
   * 8.  Events
   * ───────────────────────────────────────────────────────────────── */
  btn.addEventListener('click', () => startPresent(0));
  spPrev.addEventListener('click', () => goTo(cur - 1));
  spNext.addEventListener('click', () => goTo(cur + 1));
  spClose.addEventListener('click', stopPresent);
  spFs.addEventListener('click', toggleFullscreen);

  // Click on thumbnail → start at that slide
  document.querySelectorAll('.frame').forEach(frame => {
    frame.addEventListener('click', () => {
      if (document.body.classList.contains('slide-editing')) return; // editor active
      const idx = parseInt(frame.dataset.slide, 10);
      startPresent(isNaN(idx) ? 0 : idx);
    });
    frame.style.cursor = 'pointer';
  });

  /* ─────────────────────────────────────────────────────────────────
   * 9.  Keyboard
   * ───────────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    const inInput = e.target.tagName === 'INPUT' ||
                    e.target.tagName === 'TEXTAREA' ||
                    e.target.isContentEditable;

    if (!presenting) {
      if (e.key === 'p' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !inInput) {
        startPresent(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        goTo(cur + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goTo(cur - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        goTo(cur + 1);
        break;
      case 'Home':
        e.preventDefault();
        goTo(0);
        break;
      case 'End':
        e.preventDefault();
        goTo(SLIDE_COUNT - 1);
        break;
      case 'f':
        if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
      case 'Escape':
        if (!document.fullscreenElement) {
          stopPresent();
        }
        break;
    }
  });

  /* ─────────────────────────────────────────────────────────────────
   * 10. Touch / Swipe
   * ───────────────────────────────────────────────────────────────── */
  let touchStartX = 0;
  let touchStartY = 0;

  overlay.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  overlay.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goTo(cur + 1);
      else        goTo(cur - 1);
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────────────────────
   * 11. Wheel
   * ───────────────────────────────────────────────────────────────── */
  let lastWheelTime = 0;
  overlay.addEventListener('wheel', e => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheelTime < 1000) return;
    lastWheelTime = now;
    if (e.deltaY > 0 || e.deltaX > 0) goTo(cur + 1);
    else goTo(cur - 1);
  }, { passive: false });

}());

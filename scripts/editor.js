/**
 * editor.js — Slide Style Editor
 *
 * Drop this script at the bottom of any slide HTML that follows the
 * dual-mode architecture (.frames > .frame > .viewport > .slide).
 *
 * Usage:  <script src="editor.js"></script>
 *
 * Features:
 *  - Toggle panel with "수정" button (fixed, bottom-left)
 *  - Tab 1 "글로벌": live-edit :root CSS custom property colors
 *  - Tab 2 "요소":   click-to-select element, edit computed styles inline
 *  - Presentation sync: re-clones slides before present overlay activates
 *  - Download modified HTML (editor UI stripped, inline styles preserved)
 *  - Keyboard: E toggles panel, Escape closes it, Tab cycles editable elements
 *  - All injected DOM nodes carry class `slide-editor-ui` for PDF-export hiding
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────
   * 0.  Guards — prevent double-injection
   * ───────────────────────────────────────────────────────────────── */
  if (window.__slideEditorLoaded) return;
  window.__slideEditorLoaded = true;

  /* ─────────────────────────────────────────────────────────────────
   * 1.  CSS injection
   * ───────────────────────────────────────────────────────────────── */
  const EDITOR_CSS = `
/* ── Editor panel ─────────────────────────────────────────────── */
.se-btn {
  position: fixed;
  bottom: 28px;
  right: 170px;
  z-index: 900;
  height: var(--btn-h, 40px);
  padding: 0 var(--btn-px, 18px);
  font-size: var(--btn-fs, 13px);
  font-weight: var(--btn-fw, 600);
  border-radius: var(--btn-r, 10px);
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(255,255,255,.92);
  color: #24222d;
  border: 1px solid rgba(0,0,0,.08);
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
  transition: background .15s, box-shadow .15s, transform .1s;
  letter-spacing: .01em;
}
.se-btn:hover {
  background: #fff;
  box-shadow: 0 6px 22px rgba(0,0,0,.15);
  transform: translateY(-1px);
}
.se-btn:active { transform: translateY(0); }
.se-btn__icon { font-size: 14px; line-height: 1; }

.se-panel {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: #1a1a22;
  color: #e0ddd8;
  border-radius: 12px;
  z-index: 1100;
  box-shadow: 0 8px 40px rgba(0,0,0,.45);
  font-size: 12px;
  font-family: inherit;
  border: 1px solid rgba(255,255,255,.06);
  display: none;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #3a3a48 transparent;
}
.se-panel.open { display: flex; }
.se-panel::-webkit-scrollbar { width: 5px; }
.se-panel::-webkit-scrollbar-track { background: transparent; }
.se-panel::-webkit-scrollbar-thumb { background: #3a3a48; border-radius: 4px; }

/* ── Panel header ─────────────────────────────────────────────── */
.se-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}
.se-header__title {
  font-size: 13px;
  font-weight: 700;
  color: #e8e8ee;
  letter-spacing: .01em;
}
.se-info-wrap {
  position: relative;
}
.se-info-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,.25);
  background: rgba(255,255,255,.08);
  color: rgba(255,255,255,.55);
  font-size: 11px;
  font-weight: 700;
  font-style: italic;
  font-family: Georgia, serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color .15s, color .15s, background .15s;
}
.se-info-btn:hover { border-color: rgba(255,255,255,.5); color: #fff; background: rgba(255,255,255,.15); }
.se-info-tooltip {
  display: none;
  position: fixed;
  width: 260px;
  background: #111118;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  padding: 12px 14px;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(0,0,0,.5);
}
.se-info-row {
  font-size: 11px;
  color: rgba(255,255,255,.65);
  line-height: 1.55;
  padding: 3px 0;
}
.se-info-row strong {
  color: rgba(255,255,255,.9);
  font-weight: 600;
  margin-right: 4px;
}
.se-info-row--muted {
  color: rgba(255,255,255,.35);
  font-size: 10px;
  border-top: 1px solid rgba(255,255,255,.06);
  margin-top: 4px;
  padding-top: 6px;
}
.se-header__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.se-dl-btn {
  padding: 5px 10px;
  background: rgba(83,172,249,.15);
  color: #53acf9;
  border: 1px solid rgba(83,172,249,.25);
  border-radius: 7px;
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background .15s;
  white-space: nowrap;
}
.se-dl-btn:hover { background: rgba(83,172,249,.25); }
.se-action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.06);
  color: #ccc;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 7px;
  font-size: 14px;
  cursor: pointer;
  transition: background .15s;
  font-family: inherit;
}
.se-action-btn:hover:not(:disabled) { background: rgba(255,255,255,.12); color: #fff; }
.se-action-btn:disabled { opacity: 0.3; cursor: default; }
.se-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  padding: 8px 20px;
  background: #24222d;
  color: #e0ddd8;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  box-shadow: 0 4px 16px rgba(0,0,0,.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s, transform .25s;
  z-index: 1200;
}
.se-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.se-close-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.06);
  border: none;
  border-radius: 6px;
  color: rgba(255,255,255,.45);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: background .15s, color .15s;
  flex-shrink: 0;
}
.se-close-btn:hover { background: rgba(255,255,255,.12); color: #e0ddd8; }

/* ── Tabs ─────────────────────────────────────────────────────── */
.se-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}
.se-tab {
  flex: 1;
  padding: 9px 0;
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  color: rgba(255,255,255,.35);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color .15s, border-color .15s;
  letter-spacing: .01em;
}
.se-tab.active {
  color: #53acf9;
  border-bottom-color: #53acf9;
}

/* ── Tab panes ────────────────────────────────────────────────── */
.se-pane {
  padding: 12px 14px;
  display: none;
}
.se-pane.active { display: block; }

/* ── Hint ─────────────────────────────────────────────────────── */
.se-hint {
  color: rgba(255,255,255,.25);
  font-size: 12px;
  text-align: center;
  padding: 24px 8px;
  line-height: 1.6;
}

/* ── Section label ────────────────────────────────────────────── */
.se-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.25);
  margin: 10px 0 6px;
}
.se-section-label:first-child { margin-top: 0; }

/* ── Color token row ─────────────────────────────────────────── */
.se-token-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
}
.se-token-label {
  flex: 1;
  font-size: 11px;
  color: rgba(255,255,255,.55);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.se-swatch {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,.12);
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
}
.se-swatch::-webkit-color-swatch-wrapper { padding: 0; }
.se-swatch::-webkit-color-swatch { border: none; border-radius: 4px; }
.se-swatch::-moz-color-swatch { border: none; border-radius: 4px; }
.se-hex-input {
  width: 72px;
  background: #2a2a35;
  border: 1px solid #3a3a48;
  border-radius: 6px;
  color: #e0ddd8;
  font-size: 11px;
  font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
  padding: 4px 6px;
  text-transform: uppercase;
  flex-shrink: 0;
  transition: border-color .15s;
}
.se-hex-input:focus {
  outline: none;
  border-color: #53acf9;
}
.se-text-input {
  width: 100%;
  background: #2a2a35;
  border: 1px solid #3a3a48;
  border-radius: 8px;
  color: #e0ddd8;
  font-size: 12px;
  font-family: inherit;
  padding: 8px 10px;
  line-height: 1.55;
  resize: vertical;
  margin-top: 4px;
}
.se-text-input:focus {
  outline: none;
  border-color: #53acf9;
}

/* ── Selected element header ──────────────────────────────────── */
.se-el-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(83,172,249,.1);
  border: 1px solid rgba(83,172,249,.2);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  color: #53acf9;
  font-weight: 600;
  margin-bottom: 12px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Property row ────────────────────────────────────────────── */
.se-prop-row {
  margin-bottom: 10px;
}
.se-prop-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .04em;
  color: rgba(255,255,255,.35);
  text-transform: uppercase;
  margin-bottom: 5px;
  display: block;
}
.se-prop-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Slider ───────────────────────────────────────────────────── */
.se-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: #3a3a48;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.se-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #53acf9;
  cursor: pointer;
  box-shadow: 0 0 0 2px rgba(83,172,249,.25);
  transition: box-shadow .15s;
}
.se-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 4px rgba(83,172,249,.3); }
.se-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #53acf9;
  border: none;
  cursor: pointer;
}

/* ── Number inputs ────────────────────────────────────────────── */
.se-num-input {
  width: 48px;
  background: #2a2a35;
  border: 1px solid #3a3a48;
  border-radius: 6px;
  color: #e0ddd8;
  font-size: 11px;
  font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
  padding: 4px 6px;
  text-align: right;
  transition: border-color .15s;
  flex-shrink: 0;
}
.se-num-input:focus {
  outline: none;
  border-color: #53acf9;
}
.se-unit {
  font-size: 10px;
  color: rgba(255,255,255,.3);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── 4-box spacing inputs (padding / margin) ─────────────────── */
.se-4box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4px;
  align-items: center;
}
.se-4box-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.se-4box-field label {
  font-size: 9px;
  color: rgba(255,255,255,.25);
  text-transform: uppercase;
  letter-spacing: .04em;
}
.se-4box-input {
  width: 100%;
  background: #2a2a35;
  border: 1px solid #3a3a48;
  border-radius: 5px;
  color: #e0ddd8;
  font-size: 11px;
  font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
  padding: 3px 4px;
  text-align: center;
  transition: border-color .15s;
}
.se-4box-input:focus {
  outline: none;
  border-color: #53acf9;
}

/* ── Color picker row ─────────────────────────────────────────── */
.se-color-pair {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── Hover / selection highlights (applied to slide content) ──── */
body.slide-editing .frames .slide [class*="__"]:hover,
body.slide-editing .frames .slide img:hover,
body.slide-editing .frames .slide [class*="__"] > span:hover {
  outline: 2px dashed rgba(83,172,249,0.5) !important;
  outline-offset: 2px;
  cursor: crosshair;
}
.slide-editor-selected {
  outline: 2px solid rgba(83,172,249,0.8) !important;
  outline-offset: 2px;
}
`;

  const styleEl = document.createElement('style');
  styleEl.className = 'slide-editor-ui';
  styleEl.textContent = EDITOR_CSS;
  document.head.appendChild(styleEl);

  /* ─────────────────────────────────────────────────────────────────
   * 2.  State
   * ───────────────────────────────────────────────────────────────── */
  let editorOpen    = false;
  let activeTab     = 'global';  // 'global' | 'element'
  let selectedEl    = null;      // currently selected slide element

  /* ── Undo / Redo stacks ──────────────────────────────────────── */
  const undoStack = [];
  const redoStack = [];
  const UNDO_LIMIT = 100;

  function pushUndo(entry) {
    undoStack.push(entry);
    if (undoStack.length > UNDO_LIMIT) undoStack.shift();
    redoStack.length = 0; // 새 변경이 생기면 redo 초기화
    updateUndoRedoBtn();
  }

  function applyEntry(entry, reverse) {
    const oldVal = reverse ? entry.newValue : entry.oldValue;
    const newVal = reverse ? entry.oldValue : entry.newValue;

    if (entry.type === 'prop') {
      if (entry.prop === '__text') {
        entry.el.innerHTML = newVal.split('\n').join('<br>');
      } else if (newVal === '') {
        entry.el.style.removeProperty(entry.prop);
      } else {
        entry.el.style[entry.prop] = newVal;
      }
    } else if (entry.type === 'token') {
      if (newVal === '') {
        document.documentElement.style.removeProperty(entry.varName);
      } else {
        document.documentElement.style.setProperty(entry.varName, newVal);
      }
      const row = globalPane.querySelector(`[data-var="${entry.varName}"]`);
      if (row) {
        const swatch = row.querySelector('input[type="color"]');
        const hexIn = row.querySelector('.se-global-hex');
        const cur = getComputedStyle(document.documentElement).getPropertyValue(entry.varName).trim();
        if (swatch) swatch.value = cur;
        if (hexIn) hexIn.value = cur;
      }
    }
  }

  function undo() {
    if (!undoStack.length) return;
    const entry = undoStack.pop();
    applyEntry(entry, false); // reverse = false → apply oldValue
    redoStack.push(entry);
    updateUndoRedoBtn();
    // Refresh editor panel if same element selected
    if (entry.type === 'prop' && entry.el === selectedEl) {
      buildElementPane(selectedEl);
    }
  }

  function redo() {
    if (!redoStack.length) return;
    const entry = redoStack.pop();
    applyEntry(entry, true); // reverse = true → apply newValue
    undoStack.push(entry);
    updateUndoRedoBtn();
    if (entry.type === 'prop' && entry.el === selectedEl) {
      buildElementPane(selectedEl);
    }
  }

  function updateUndoRedoBtn() {
    const undoBtn = document.getElementById('seUndoBtn');
    const redoBtn = document.getElementById('seRedoBtn');
    if (undoBtn) undoBtn.disabled = undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = redoStack.length === 0;
  }

  /* ── Save/Load (localStorage) ───────────────────────────────── */
  const SAVE_KEY = 'slide-editor:' + (document.title || location.pathname);

  function saveChanges() {
    const changes = {
      tokens: {},
      elements: [],
    };
    // Collect token overrides
    const rootStyle = document.documentElement.style;
    for (let i = 0; i < rootStyle.length; i++) {
      const name = rootStyle[i];
      changes.tokens[name] = rootStyle.getPropertyValue(name).trim();
    }
    // Collect inline style overrides on slide elements
    document.querySelectorAll('.frames .slide [style]').forEach(el => {
      if (!el.style.cssText) return;
      const path = getElementPath(el);
      if (path) changes.elements.push({ path, style: el.style.cssText });
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify(changes));
    showToast('저장됨');
  }

  function loadSavedChanges() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    try {
      const changes = JSON.parse(raw);
      // Restore tokens
      if (changes.tokens) {
        Object.entries(changes.tokens).forEach(([name, val]) => {
          document.documentElement.style.setProperty(name, val);
        });
      }
      // Restore element styles
      if (changes.elements) {
        changes.elements.forEach(({ path, style }) => {
          const el = findElementByPath(path);
          if (el) el.style.cssText = style;
        });
      }
    } catch (e) { /* ignore corrupt data */ }
  }

  /** Generate a stable CSS-path for an element (for save/load). */
  function getElementPath(el) {
    const parts = [];
    let node = el;
    while (node && node !== document.body) {
      let selector = node.tagName.toLowerCase();
      if (node.className && typeof node.className === 'string') {
        const cls = node.className.split(/\s+/).find(c => c.includes('__') || c.startsWith('s'));
        if (cls) selector += '.' + cls;
      }
      const parent = node.parentElement;
      if (parent) {
        const siblings = [...parent.children].filter(c => c.tagName === node.tagName);
        if (siblings.length > 1) {
          selector += ':nth-child(' + ([...parent.children].indexOf(node) + 1) + ')';
        }
      }
      parts.unshift(selector);
      node = node.parentElement;
    }
    return parts.join(' > ');
  }

  function findElementByPath(path) {
    try { return document.querySelector(path); } catch { return null; }
  }

  function showToast(msg) {
    let toast = document.querySelector('.se-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'se-toast slide-editor-ui';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  /* ─────────────────────────────────────────────────────────────────
   * 3.  HTML injection
   * ───────────────────────────────────────────────────────────────── */
  // ── "수정" toggle button ──────────────────────────────────────────
  const editBtn = document.createElement('button');
  editBtn.className = 'se-btn slide-editor-ui';
  editBtn.setAttribute('aria-label', '스타일 편집기 열기');
  editBtn.innerHTML = '<span class="se-btn__icon">&#9998;</span>수정';
  document.body.appendChild(editBtn);

  // ── Editor panel ──────────────────────────────────────────────────
  const panel = document.createElement('div');
  panel.className = 'se-panel slide-editor-ui';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', '슬라이드 스타일 편집기');
  panel.innerHTML = `
    <div class="se-header">
      <span class="se-header__title">스타일 편집기</span>
      <div class="se-header__actions">
        <div class="se-info-wrap">
          <button class="se-info-btn" aria-label="도움말">i</button>
          <div class="se-info-tooltip">
            <div class="se-info-row"><strong>↩ 되돌리기</strong> Ctrl+Z · 최대 100단계</div>
            <div class="se-info-row"><strong>↪ 다시 실행</strong> Ctrl+Shift+Z</div>
            <div class="se-info-row"><strong>💾 저장</strong> Ctrl+S · 브라우저에 임시저장 (새로고침 유지)</div>
            <div class="se-info-row"><strong>다운로드</strong> 수정 반영된 HTML 파일 저장 (영구)</div>
            <div class="se-info-row se-info-row--muted">브라우저 캐시 삭제 시 임시저장 초기화</div>
          </div>
        </div>
        <button class="se-action-btn" id="seUndoBtn" disabled title="되돌리기 (Ctrl+Z)">↩</button>
        <button class="se-action-btn" id="seRedoBtn" disabled title="다시 실행 (Ctrl+Shift+Z)">↪</button>
        <button class="se-action-btn" id="seSaveBtn" title="저장 (Ctrl+S)">💾</button>
        <button class="se-dl-btn" id="seDownloadBtn">다운로드</button>
        <button class="se-close-btn" id="seCloseBtn" aria-label="편집기 닫기">&#10005;</button>
      </div>
    </div>

    <div class="se-tabs">
      <button class="se-tab active" data-tab="global">글로벌</button>
      <button class="se-tab"        data-tab="element">요소</button>
    </div>

    <div class="se-pane active" id="seGlobalPane"></div>
    <div class="se-pane"        id="seElementPane">
      <div class="se-hint" id="seElementHint">슬라이드 요소를 클릭하세요</div>
      <div id="seElementProps" style="display:none;"></div>
    </div>
  `;
  document.body.appendChild(panel);

  // Shortcut references
  const globalPane   = panel.querySelector('#seGlobalPane');
  const elementPane  = panel.querySelector('#seElementPane');
  const elementHint  = panel.querySelector('#seElementHint');
  const elementProps = panel.querySelector('#seElementProps');
  const downloadBtn  = panel.querySelector('#seDownloadBtn');
  const closeBtn     = panel.querySelector('#seCloseBtn');
  const tabs         = panel.querySelectorAll('.se-tab');

  /* ─────────────────────────────────────────────────────────────────
   * 4.  Utility: color conversion helpers
   * ───────────────────────────────────────────────────────────────── */

  /**
   * Converts `rgb(r, g, b)` or `rgba(r, g, b, a)` string to `#rrggbb`.
   * Returns empty string if parsing fails (e.g. transparent).
   */
  function rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return '';
    const m = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!m) return '';
    return '#' + [m[1], m[2], m[3]]
      .map(n => parseInt(n, 10).toString(16).padStart(2, '0'))
      .join('');
  }

  /** Validates a hex color string (with or without #). Returns #rrggbb or null. */
  function normalizeHex(raw) {
    const s = raw.trim().replace(/^#/, '');
    if (/^[0-9a-f]{6}$/i.test(s)) return '#' + s.toLowerCase();
    if (/^[0-9a-f]{3}$/i.test(s)) {
      return '#' + s.split('').map(c => c + c).join('');
    }
    return null;
  }

  /** Returns true if a CSS value string looks like a color. */
  function looksLikeColor(val) {
    if (!val) return false;
    const v = val.trim();
    return v.startsWith('#') ||
           v.startsWith('rgb') ||
           v.startsWith('hsl') ||
           v === 'transparent' ||
           v === 'currentcolor' ||
           /^[a-z]+$/.test(v) && CSS.supports('color', v);
  }

  /* ─────────────────────────────────────────────────────────────────
   * 5.  Global tokens tab — build UI from :root CSS custom properties
   * ───────────────────────────────────────────────────────────────── */

  /**
   * Reads all CSS custom properties defined in :root across all
   * same-origin stylesheets. Returns { varName: resolvedValue }.
   */
  function getRootColorTokens() {
    const tokens = {};
    try {
      for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        for (const rule of rules) {
          if (!(rule instanceof CSSStyleRule)) continue;
          if (rule.selectorText !== ':root') continue;
          for (const prop of rule.style) {
            if (!prop.startsWith('--')) continue;
            const raw = rule.style.getPropertyValue(prop).trim();
            // Only surface color-like values
            if (looksLikeColor(raw)) {
              tokens[prop] = raw;
            }
          }
        }
      }
    } catch (e) {
      // Cross-origin sheets silently ignored
    }
    return tokens;
  }

  /**
   * Get the current resolved color for a CSS variable,
   * accounting for any inline override set by the editor.
   */
  function resolveToken(varName) {
    // Inline overrides on documentElement take priority
    const inline = document.documentElement.style.getPropertyValue(varName).trim();
    if (inline) return inline;
    // Walk stylesheets for the :root declaration
    try {
      for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch { continue; }
        for (const rule of rules) {
          if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':root') continue;
          const v = rule.style.getPropertyValue(varName).trim();
          if (v) return v;
        }
      }
    } catch {}
    return '';
  }

  /**
   * Builds a human-readable label from a CSS variable name.
   * e.g. --text-primary → text-primary
   */
  function tokenLabel(varName) {
    return varName.replace(/^--/, '');
  }

  /** Populates the global tokens pane. */
  function buildGlobalPane() {
    const tokens = getRootColorTokens();
    if (!Object.keys(tokens).length) {
      globalPane.innerHTML = '<div class="se-hint">CSS 변수가 없습니다</div>';
      return;
    }

    // Group tokens by prefix heuristic
    const groups = {};
    for (const [name] of Object.entries(tokens)) {
      const label = tokenLabel(name);
      // Determine group key from first segment (e.g. "text", "bg", "shadow", etc.)
      const parts = label.split('-');
      let groupKey = parts[0];
      // Normalize common groups
      if (['bg', 'background'].includes(groupKey)) groupKey = '배경';
      else if (groupKey === 'text') groupKey = '텍스트';
      else if (groupKey === 'shadow') groupKey = '그림자';
      else if (['primary', 'secondary', 'accent', 'amber', 'success', 'dark'].includes(groupKey)) groupKey = '브랜드';
      else if (groupKey === 'divider') groupKey = '구분선';
      else groupKey = '기타';
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(name);
    }

    const html = Object.entries(groups).map(([groupKey, names]) => {
      const rows = names.map(varName => {
        const resolved = resolveToken(varName);
        const hex      = rgbToHex(resolved) || (resolved.startsWith('#') ? resolved : '');
        return `
          <div class="se-token-row" data-var="${varName}">
            <span class="se-token-label" title="${varName}">${tokenLabel(varName)}</span>
            <input
              type="color"
              class="se-swatch"
              value="${hex || '#888888'}"
              data-var="${varName}"
              title="${varName}"
            />
            <input
              type="text"
              class="se-hex-input"
              value="${hex.toUpperCase() || resolved}"
              maxlength="7"
              spellcheck="false"
              data-var="${varName}"
              data-type="hex"
            />
          </div>
        `;
      }).join('');
      return `<div class="se-section-label">${groupKey}</div>${rows}`;
    }).join('');

    globalPane.innerHTML = html;

    // Bind events
    globalPane.querySelectorAll('input[type="color"][data-var]').forEach(swatch => {
      swatch.addEventListener('input', () => {
        const varName = swatch.dataset.var;
        const val     = swatch.value;
        applyGlobalToken(varName, val);
        // Sync the adjacent hex input
        const row   = swatch.closest('.se-token-row');
        const hexIn = row.querySelector('[data-type="hex"]');
        if (hexIn) hexIn.value = val.toUpperCase();
      });
    });

    globalPane.querySelectorAll('input[data-type="hex"]').forEach(hexIn => {
      hexIn.addEventListener('change', () => {
        const varName = hexIn.dataset.var;
        const hex     = normalizeHex(hexIn.value);
        if (!hex) { hexIn.style.borderColor = '#ff8a80'; return; }
        hexIn.style.borderColor = '';
        hexIn.value = hex.toUpperCase();
        applyGlobalToken(varName, hex);
        // Sync swatch
        const row   = hexIn.closest('.se-token-row');
        const swatch = row.querySelector('input[type="color"]');
        if (swatch) swatch.value = hex;
      });
      // Live update on input (accept partial typing)
      hexIn.addEventListener('input', () => {
        hexIn.style.borderColor = '';
      });
    });
  }

  /** Applies a CSS variable override to :root at runtime (with undo tracking). */
  function applyGlobalToken(varName, value) {
    const oldValue = document.documentElement.style.getPropertyValue(varName).trim();
    pushUndo({ type: 'token', varName, oldValue, newValue: value });
    document.documentElement.style.setProperty(varName, value);
  }

  /* ─────────────────────────────────────────────────────────────────
   * 6.  Element selection
   * ───────────────────────────────────────────────────────────────── */

  /**
   * Walk up from el to find the nearest BEM-child element (class contains '__').
   * Stops at .slide boundary. Returns null if none found.
   */
  // Elements that should never be selectable
  const SKIP_CLASSES = ['slide', 'viewport', 'frame', 'frames', 'page-header'];

  function findEditable(el) {
    // First pass: if the clicked element itself is a leaf span (text only, no child elements),
    // return it directly — this enables editing individual parts of "127개사" etc.
    if (el && el.tagName === 'SPAN' && el.children.length === 0 && el.textContent.trim()) {
      return el;
    }

    while (el && !el.classList.contains('slide')) {
      // Skip structural elements
      if (SKIP_CLASSES.some(c => el.classList && el.classList.contains(c))) {
        el = el.parentElement;
        continue;
      }
      // Images (emoji, photos)
      if (el.tagName === 'IMG') {
        return el;
      }
      // BEM child elements
      if (
        el.className &&
        typeof el.className === 'string' &&
        el.className.includes('__')
      ) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  /**
   * Determine if an element is a "leaf" (directly contains text)
   * vs a "container" (has child block elements like divs, lists, etc.)
   */
  function isLeafElement(el) {
    if (el.tagName === 'IMG' || el.tagName === 'SPAN') return true;
    // Has block-level children → container
    const blockChildren = el.querySelectorAll('div, ul, ol, table, section, article, nav, header, footer');
    return blockChildren.length === 0;
  }

  /** Reads computed style values and converts px → cqw. */
  function readProps(el) {
    const cs  = getComputedStyle(el);
    const vp  = el.closest('.viewport');
    const vpW = vp ? vp.offsetWidth : 960;
    const pxToCqw = px => parseFloat((parseFloat(px) / vpW * 100).toFixed(3));

    // lineHeight: convert px to unitless ratio relative to fontSize
    const fsPx = parseFloat(cs.fontSize);
    let lineHeightRatio;
    if (cs.lineHeight === 'normal') {
      lineHeightRatio = 1.2;
    } else {
      lineHeightRatio = parseFloat((parseFloat(cs.lineHeight) / fsPx).toFixed(3));
    }

    return {
      fontSize:        pxToCqw(cs.fontSize),
      lineHeight:      lineHeightRatio,
      color:           rgbToHex(cs.color),
      backgroundColor: rgbToHex(cs.backgroundColor),
      paddingTop:      pxToCqw(cs.paddingTop),
      paddingRight:    pxToCqw(cs.paddingRight),
      paddingBottom:   pxToCqw(cs.paddingBottom),
      paddingLeft:     pxToCqw(cs.paddingLeft),
      marginTop:       pxToCqw(cs.marginTop),
      marginRight:     pxToCqw(cs.marginRight),
      marginBottom:    pxToCqw(cs.marginBottom),
      marginLeft:      pxToCqw(cs.marginLeft),
    };
  }

  /** Applies a property to an element's inline style (with undo tracking). */
  function applyProp(el, prop, value, unit) {
    const oldValue = el.style[prop] || '';
    const newValue = unit ? value + unit : value;
    pushUndo({ type: 'prop', el, prop, oldValue, newValue, unit });
    el.style[prop] = newValue;
  }

  /* ─────────────────────────────────────────────────────────────────
   * 7.  Element tab UI — build property editors
   * ───────────────────────────────────────────────────────────────── */

  /** Builds an accessible tag line showing the selected element's class. */
  function elTagHTML(el) {
    if (el.tagName === 'IMG') {
      const cls = (el.className || '').split(' ')[0] || 'img';
      const alt = el.alt || el.src.split('/').pop();
      return `<div class="se-el-tag">&#9654; &lt;img&gt; ${alt.substring(0, 30)}</div>`;
    }
    const cls = (el.className || '').split(' ').find(c => c.includes('__')) || el.className || el.tagName;
    return `<div class="se-el-tag">&#9654; .${cls}</div>`;
  }

  /**
   * Creates a slider + number input combo for a single numeric property.
   * Returns { container, slider, numInput } for event binding.
   */
  function makeSliderRow(labelText, value, min, max, step, unit) {
    const row = document.createElement('div');
    row.className = 'se-prop-row';
    row.innerHTML = `
      <span class="se-prop-label">${labelText}</span>
      <div class="se-prop-controls">
        <input type="range" class="se-slider"
          min="${min}" max="${max}" step="${step}" value="${value}">
        <input type="number" class="se-num-input"
          min="${min}" max="${max}" step="${step}" value="${value}">
        ${unit ? `<span class="se-unit">${unit}</span>` : ''}
      </div>
    `;
    const slider   = row.querySelector('.se-slider');
    const numInput = row.querySelector('.se-num-input');
    // Keep slider and number input in sync
    slider.addEventListener('input', () => {
      numInput.value = slider.value;
    });
    numInput.addEventListener('input', () => {
      slider.value = numInput.value;
    });
    return { row, slider, numInput };
  }

  /**
   * Creates a color picker + hex input pair.
   * Returns { container, colorInput, hexInput }.
   */
  function makeColorRow(labelText, value) {
    const row = document.createElement('div');
    row.className = 'se-prop-row';
    row.innerHTML = `
      <span class="se-prop-label">${labelText}</span>
      <div class="se-prop-controls se-color-pair">
        <input type="color" class="se-swatch" value="${value || '#888888'}">
        <input type="text"  class="se-hex-input" value="${(value || '').toUpperCase()}"
          maxlength="7" spellcheck="false" placeholder="#------">
      </div>
    `;
    const colorInput = row.querySelector('input[type="color"]');
    const hexInput   = row.querySelector('.se-hex-input');
    // Sync hex → color
    hexInput.addEventListener('change', () => {
      const hex = normalizeHex(hexInput.value);
      if (!hex) { hexInput.style.borderColor = '#ff8a80'; return; }
      hexInput.style.borderColor = '';
      hexInput.value = hex.toUpperCase();
      colorInput.value = hex;
    });
    // Sync color → hex
    colorInput.addEventListener('input', () => {
      hexInput.value = colorInput.value.toUpperCase();
      hexInput.style.borderColor = '';
    });
    return { row, colorInput, hexInput };
  }

  /**
   * Creates 4-value box inputs (T / R / B / L) for padding/margin.
   * Returns { row, inputs: [top, right, bottom, left] }.
   */
  function make4BoxRow(labelText, vals, unit) {
    const row = document.createElement('div');
    row.className = 'se-prop-row';
    const [top, right, bottom, left] = vals;
    row.innerHTML = `
      <span class="se-prop-label">${labelText}${unit ? ' (' + unit + ')' : ''}</span>
      <div class="se-4box">
        <div class="se-4box-field">
          <label>상</label>
          <input type="number" class="se-4box-input" value="${top}" step="0.05">
        </div>
        <div class="se-4box-field">
          <label>우</label>
          <input type="number" class="se-4box-input" value="${right}" step="0.05">
        </div>
        <div class="se-4box-field">
          <label>하</label>
          <input type="number" class="se-4box-input" value="${bottom}" step="0.05">
        </div>
        <div class="se-4box-field">
          <label>좌</label>
          <input type="number" class="se-4box-input" value="${left}" step="0.05">
        </div>
      </div>
    `;
    const inputs = [...row.querySelectorAll('.se-4box-input')];
    return { row, inputs };
  }

  /**
   * Populates the element properties pane for the given element.
   */
  function buildElementPane(el) {
    elementHint.style.display  = 'none';
    elementProps.style.display = 'block';
    elementProps.innerHTML     = '';

    const props = readProps(el);
    const isImage = el.tagName === 'IMG';
    const isLeaf = isLeafElement(el);

    // ── Tag header
    elementProps.insertAdjacentHTML('beforeend', elTagHTML(el));

    // ── Text content (only for leaf text elements)
    if (!isImage && isLeaf && el.childNodes.length > 0) {
      const hasDirectText = [...el.childNodes].some(n =>
        n.nodeType === 3 && n.textContent.trim() ||
        (n.nodeType === 1 && ['SPAN', 'STRONG', 'EM', 'B', 'I', 'BR', 'A'].includes(n.tagName))
      );
      if (hasDirectText) {
        const textRow = document.createElement('div');
        textRow.className = 'se-prop-row';
        const currentText = el.innerText || '';
        textRow.innerHTML = `
          <span class="se-prop-label">텍스트</span>
          <textarea class="se-text-input" rows="${Math.min(Math.max(currentText.split('\n').length, 2), 6)}"
            spellcheck="false">${currentText}</textarea>
        `;
        const textarea = textRow.querySelector('textarea');
        textarea.addEventListener('input', () => {
          const oldText = el.innerText;
          pushUndo({ type: 'prop', el, prop: '__text', oldValue: oldText, newValue: textarea.value });
          el.innerHTML = textarea.value.split('\n').join('<br>');
        });
        elementProps.appendChild(textRow);
      }
    }

    if (isImage) {
      // ── Image: Width + Height
      const vp = el.closest('.viewport');
      const vpW = vp ? vp.offsetWidth : 960;
      const curW = parseFloat(el.style.width) || (el.offsetWidth / vpW * 100);
      const wRow = makeSliderRow('너비', curW.toFixed(2), 1, 30, 0.1, 'cqw');
      wRow.slider.addEventListener('input', () => {
        applyProp(el, 'width', wRow.slider.value, 'cqw');
        if (el.style.height) applyProp(el, 'height', wRow.slider.value, 'cqw');
        wRow.numInput.value = wRow.slider.value;
      });
      wRow.numInput.addEventListener('change', () => {
        applyProp(el, 'width', wRow.numInput.value, 'cqw');
        if (el.style.height) applyProp(el, 'height', wRow.numInput.value, 'cqw');
        wRow.slider.value = wRow.numInput.value;
      });
      elementProps.appendChild(wRow.row);

      const curH = parseFloat(el.style.height) || (el.offsetHeight / vpW * 100);
      const hRow = makeSliderRow('높이', curH.toFixed(2), 1, 30, 0.1, 'cqw');
      hRow.slider.addEventListener('input', () => {
        applyProp(el, 'height', hRow.slider.value, 'cqw');
        hRow.numInput.value = hRow.slider.value;
      });
      hRow.numInput.addEventListener('change', () => {
        applyProp(el, 'height', hRow.numInput.value, 'cqw');
        hRow.slider.value = hRow.numInput.value;
      });
      elementProps.appendChild(hRow.row);

    } else if (isLeaf) {
      // ── Leaf element: font-size, line-height, color
      const fsRow = makeSliderRow('폰트 크기', props.fontSize, 0.5, 8.0, 0.05, 'cqw');
      fsRow.slider.addEventListener('input', () => applyProp(el, 'fontSize', fsRow.slider.value, 'cqw'));
      fsRow.numInput.addEventListener('change', () => applyProp(el, 'fontSize', fsRow.numInput.value, 'cqw'));
      elementProps.appendChild(fsRow.row);

      const lhRow = makeSliderRow('줄 높이', props.lineHeight, 0.8, 2.5, 0.05, '');
      lhRow.slider.addEventListener('input', () => applyProp(el, 'lineHeight', lhRow.slider.value, ''));
      lhRow.numInput.addEventListener('change', () => applyProp(el, 'lineHeight', lhRow.numInput.value, ''));
      elementProps.appendChild(lhRow.row);

      const colorRow = makeColorRow('색상', props.color);
      colorRow.colorInput.addEventListener('input', () => applyProp(el, 'color', colorRow.colorInput.value, ''));
      colorRow.hexInput.addEventListener('change', () => {
        const hex = normalizeHex(colorRow.hexInput.value);
        if (hex) applyProp(el, 'color', hex, '');
      });
      elementProps.appendChild(colorRow.row);
    }
    // Container elements: NO font-size, line-height, color — only layout props below

    // ── Gap (for flex/grid containers)
    if (!isImage && !isLeaf) {
      const cs = getComputedStyle(el);
      const display = cs.display;
      if (display.includes('flex') || display.includes('grid')) {
        const vp = el.closest('.viewport');
        const vpW = vp ? vp.offsetWidth : 960;
        const gapPx = parseFloat(cs.gap) || 0;
        const gapCqw = parseFloat((gapPx / vpW * 100).toFixed(3));
        const gapRow = makeSliderRow('간격 (gap)', gapCqw, 0, 5, 0.05, 'cqw');
        gapRow.slider.addEventListener('input', () => applyProp(el, 'gap', gapRow.slider.value, 'cqw'));
        gapRow.numInput.addEventListener('change', () => applyProp(el, 'gap', gapRow.numInput.value, 'cqw'));
        elementProps.appendChild(gapRow.row);
      }
    }

    // ── Background color (all types)
    const bgRow = makeColorRow('배경색', props.backgroundColor);
    bgRow.colorInput.addEventListener('input', () => applyProp(el, 'backgroundColor', bgRow.colorInput.value, ''));
    bgRow.hexInput.addEventListener('change', () => {
      const hex = normalizeHex(bgRow.hexInput.value);
      if (hex) applyProp(el, 'backgroundColor', hex, '');
    });
    elementProps.appendChild(bgRow.row);

    // ── Padding
    const padRow = make4BoxRow('안쪽 여백', [
      props.paddingTop, props.paddingRight, props.paddingBottom, props.paddingLeft
    ], 'cqw');
    const padProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
    padRow.inputs.forEach((inp, idx) => {
      inp.addEventListener('input', () => applyProp(el, padProps[idx], inp.value, 'cqw'));
    });
    elementProps.appendChild(padRow.row);

    // ── Margin
    const marRow = make4BoxRow('바깥 여백', [
      props.marginTop, props.marginRight, props.marginBottom, props.marginLeft
    ], 'cqw');
    const marProps = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
    marRow.inputs.forEach((inp, idx) => {
      inp.addEventListener('input', () => applyProp(el, marProps[idx], inp.value, 'cqw'));
    });
    elementProps.appendChild(marRow.row);
  }

  /* ─────────────────────────────────────────────────────────────────
   * 8.  Panel open / close
   * ───────────────────────────────────────────────────────────────── */

  function openEditor() {
    editorOpen = true;
    panel.classList.add('open');
    document.body.classList.add('slide-editing');
    editBtn.setAttribute('aria-expanded', 'true');
    if (activeTab === 'global') buildGlobalPane();
  }

  function closeEditor() {
    editorOpen = false;
    panel.classList.remove('open');
    document.body.classList.remove('slide-editing');
    editBtn.setAttribute('aria-expanded', 'false');
    deselectElement();
  }

  function toggleEditor() {
    if (editorOpen) closeEditor(); else openEditor();
  }

  /* ─────────────────────────────────────────────────────────────────
   * 9.  Tab switching
   * ───────────────────────────────────────────────────────────────── */

  function switchTab(tabName) {
    activeTab = tabName;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    globalPane.classList.toggle('active',  tabName === 'global');
    elementPane.classList.toggle('active', tabName === 'element');
    if (tabName === 'global') buildGlobalPane();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  /* ─────────────────────────────────────────────────────────────────
   * 10. Element click interception
   * ───────────────────────────────────────────────────────────────── */

  function selectElement(el) {
    deselectElement(); // clear previous
    selectedEl = el;
    el.classList.add('slide-editor-selected');
    switchTab('element');
    buildElementPane(el);
  }

  function deselectElement() {
    if (selectedEl) {
      selectedEl.classList.remove('slide-editor-selected');
      selectedEl = null;
    }
    elementHint.style.display  = 'block';
    elementProps.style.display = 'none';
    elementProps.innerHTML     = '';
  }

  // Intercept clicks on slide content while editor is active.
  // We attach to document and check if we're in slide-editing mode.
  document.addEventListener('click', function handleSlideClick(e) {
    if (!editorOpen) return;
    // Ignore clicks inside the editor panel itself
    if (panel.contains(e.target) || editBtn.contains(e.target)) return;

    const editable = findEditable(e.target);
    if (editable) {
      e.stopPropagation();
      e.preventDefault();
      selectElement(editable);
    }
  }, true); // capture phase so we intercept before other handlers

  /* ─────────────────────────────────────────────────────────────────
   * 11. Tab key — cycle editable elements on current slide
   * ───────────────────────────────────────────────────────────────── */

  function getEditablesOnCurrentSlide() {
    // Try to find the currently visible slide in scroll view
    const slides = [...document.querySelectorAll('.frames .slide')];
    if (!slides.length) return [];
    // Use first slide as fallback; ideally we'd track the viewport in view
    const targetSlide = selectedEl
      ? selectedEl.closest('.slide')
      : slides[0];
    if (!targetSlide) return [];
    return [...targetSlide.querySelectorAll('[class*="__"]')];
  }

  /* ─────────────────────────────────────────────────────────────────
   * 12. Keyboard shortcuts
   * ───────────────────────────────────────────────────────────────── */

  document.addEventListener('keydown', e => {
    const inInput = e.target.tagName === 'INPUT' ||
                    e.target.tagName === 'TEXTAREA' ||
                    e.target.isContentEditable;

    // Ctrl+Shift+Z / Cmd+Shift+Z: redo
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z' && editorOpen) {
      e.preventDefault();
      redo();
      return;
    }

    // Ctrl+Z / Cmd+Z: undo
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z' && editorOpen) {
      e.preventDefault();
      undo();
      return;
    }

    // Ctrl+S / Cmd+S: save
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && editorOpen) {
      e.preventDefault();
      saveChanges();
      return;
    }

    // E: toggle editor (not in text inputs)
    if (e.key === 'e' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !inInput) {
      e.preventDefault();
      toggleEditor();
      return;
    }

    // Escape: close panel (not during presentation)
    if (e.key === 'Escape' && editorOpen) {
      const presenting = window.__slidePresenter && window.__slidePresenter.isPresenting();
      if (!presenting) {
        closeEditor();
      }
      return;
    }

    // Tab: cycle editable elements (only when editor is open + element tab)
    if (e.key === 'Tab' && editorOpen && activeTab === 'element') {
      e.preventDefault();
      const editables = getEditablesOnCurrentSlide();
      if (!editables.length) return;
      if (!selectedEl) {
        selectElement(editables[0]);
        return;
      }
      const idx = editables.indexOf(selectedEl);
      const nextIdx = e.shiftKey
        ? (idx - 1 + editables.length) % editables.length
        : (idx + 1) % editables.length;
      selectElement(editables[nextIdx]);
    }
  });

  /* ─────────────────────────────────────────────────────────────────
   * 13. Button events
   * ───────────────────────────────────────────────────────────────── */

  editBtn.addEventListener('click', toggleEditor);
  closeBtn.addEventListener('click', closeEditor);

  // Undo & Save buttons
  const undoBtn = panel.querySelector('#seUndoBtn');
  const redoBtn = panel.querySelector('#seRedoBtn');
  const saveBtn = panel.querySelector('#seSaveBtn');
  undoBtn.addEventListener('click', undo);
  redoBtn.addEventListener('click', redo);
  saveBtn.addEventListener('click', saveChanges);

  // Info tooltip positioning (fixed, so it escapes overflow:auto)
  const infoBtn = panel.querySelector('.se-info-btn');
  const infoTip = panel.querySelector('.se-info-tooltip');
  // Move tooltip to body so it's not clipped by panel overflow
  if (infoTip) document.body.appendChild(infoTip);
  if (infoBtn && infoTip) {
    infoBtn.addEventListener('mouseenter', () => {
      const rect = infoBtn.getBoundingClientRect();
      infoTip.style.top = (rect.bottom + 8) + 'px';
      infoTip.style.right = (window.innerWidth - rect.right) + 'px';
      infoTip.style.left = 'auto';
      infoTip.style.display = 'block';
    });
    infoBtn.addEventListener('mouseleave', () => {
      infoTip.style.display = 'none';
    });
  }

  /* ─────────────────────────────────────────────────────────────────
   * 14. Presentation sync — re-clone slides before presenting
   *
   * Presentation sync is handled by presenter.js — it re-clones slides
   * on every startPresent() call, picking up inline style edits automatically.
   * No MutationObserver needed here.
   * ───────────────────────────────────────────────────────────────── */

  /* ─────────────────────────────────────────────────────────────────
   * 15. Download modified HTML
   * ───────────────────────────────────────────────────────────────── */

  /**
   * Converts an image element to a base64 data URI.
   * Returns a promise that resolves to the data URI string,
   * or the original src if conversion fails.
   */
  function imgToBase64(img) {
    return new Promise(resolve => {
      // Already a data URI
      if (img.src && img.src.startsWith('data:')) {
        resolve(img.src);
        return;
      }
      const canvas = document.createElement('canvas');
      const naturalW = img.naturalWidth || img.width;
      const naturalH = img.naturalHeight || img.height;
      if (!naturalW || !naturalH) { resolve(img.src); return; }
      canvas.width = naturalW;
      canvas.height = naturalH;
      const ctx = canvas.getContext('2d');
      try {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        // CORS or tainted canvas — fall back to fetch
        fetch(img.src)
          .then(r => r.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(img.src);
            reader.readAsDataURL(blob);
          })
          .catch(() => resolve(img.src));
      }
    });
  }

  async function downloadHTML() {
    showToast('다운로드 준비 중...');

    // Convert all images to base64 first (on the live document)
    const imgs = [...document.querySelectorAll('.frames img')];
    const base64Map = new Map();
    await Promise.all(imgs.map(async img => {
      if (img.src && !img.src.startsWith('data:')) {
        const dataUri = await imgToBase64(img);
        if (dataUri.startsWith('data:')) {
          base64Map.set(img.src, dataUri);
        }
      }
    }));

    // Deep clone the entire document
    const clone = document.documentElement.cloneNode(true);

    // Replace image src with base64 in clone
    clone.querySelectorAll('img').forEach(img => {
      const original = img.getAttribute('src');
      if (original && base64Map.has(img.src)) {
        img.setAttribute('src', base64Map.get(img.src));
      }
      // Also check inline background-images
    });

    // Replace CSS background-image url() references with base64
    clone.querySelectorAll('[style*="url("]').forEach(el => {
      let style = el.getAttribute('style');
      for (const [origSrc, dataUri] of base64Map) {
        // Match the filename portion in url() references
        const filename = origSrc.split('/').pop();
        if (style.includes(filename)) {
          style = style.replace(new RegExp(`url\\(['"]?[^'"\\)]*${filename}['"]?\\)`, 'g'), `url('${dataUri}')`);
          el.setAttribute('style', style);
        }
      }
    });

    // Strip all editor UI elements
    clone.querySelectorAll('.slide-editor-ui').forEach(el => el.remove());

    // Strip the editor script tag
    clone.querySelectorAll('script').forEach(s => {
      if (s.src && s.src.includes('editor.js')) s.remove();
      if (s.textContent && s.textContent.includes('__slideEditorLoaded')) s.remove();
    });

    // Also strip the info tooltip if it was moved to body
    clone.querySelectorAll('.se-info-tooltip').forEach(el => el.remove());

    const html = '<!DOCTYPE html>\n' + clone.outerHTML;
    const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = (document.title || 'slides').replace(/[/\\?%*:|"<>]/g, '-') + '-edited.html';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    showToast('다운로드 완료');
  }

  downloadBtn.addEventListener('click', downloadHTML);

  /* ─────────────────────────────────────────────────────────────────
   * 16. Graceful fallback for legacy HTML (no .frames)
   *
   * If the page has no .frames wrapper, the hover highlight CSS rule
   * targeting `.frames .slide [class*="__"]:hover` won't fire.
   * Inject a fallback rule scoped to `body.slide-editing .slide`.
   * ───────────────────────────────────────────────────────────────── */

  if (!document.querySelector('.frames')) {
    const fallbackStyle = document.createElement('style');
    fallbackStyle.className = 'slide-editor-ui';
    fallbackStyle.textContent = `
      body.slide-editing .slide [class*="__"]:hover,
      body.slide-editing .slide img:hover {
        outline: 2px dashed rgba(83,172,249,0.5) !important;
        outline-offset: 2px;
        cursor: crosshair;
      }
    `;
    document.head.appendChild(fallbackStyle);
  }

  /* ─────────────────────────────────────────────────────────────────
   * 17. Init
   * ───────────────────────────────────────────────────────────────── */

  // Restore saved changes from localStorage
  loadSavedChanges();

  // Build global pane eagerly so it's ready when user opens the editor
  buildGlobalPane();

  // Expose a minimal public API for debugging
  window.__slideEditor = {
    open:    openEditor,
    close:   closeEditor,
    toggle:  toggleEditor,
    reClone: recloneForPresent,
    undo:    undo,
    save:    saveChanges,
  };

}());

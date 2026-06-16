// Theme application — builds a :root CSS block from a theme + user settings and
// injects it. A theme is { variables: { '--x': value } } + optional raw `css`.


export const ACCENT_PRESETS = [
  '#adc6ff', '#60a5fa', '#2dd4bf', '#34d399', '#a3e635',
  '#fbbf24', '#fb923c', '#ff8a80', '#f472b6', '#e879f9',
  '#c4b5fd', '#818cf8',
];

export function hexToRgba(hex, alpha) {
  if (typeof hex !== 'string') return null;
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  if (full.length !== 6) return null;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Extract [r,g,b] from an rgb()/rgba()/#hex string, or null if unparseable.
export function parseRgb(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim();
  if (s.startsWith('#')) {
    const rgba = hexToRgba(s, 1);
    if (!rgba) return null;
    str = rgba;
  }
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(n => parseFloat(n));
  if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN)) return null;
  return [parts[0], parts[1], parts[2]];
}

export function buildThemeCss(theme, settings = {}) {
  let vars = { ...(theme.variables || {}) };
  
  const mode = settings.themeMode === 'light' || (settings.themeMode === 'auto' && settings.osDarkMode === false) ? 'light' : 'dark';
  if (vars[mode]) {
    vars = { ...vars[mode] };
  }


  // Glass intensity (0–100): higher = more translucent glass surfaces.
  const intensity = typeof settings.glassIntensity === 'number' ? settings.glassIntensity : 75;
  const alpha = Math.max(0.15, Math.min(1, 1 - (intensity / 100) * 0.6));
  for (const key of ['--bg-card', '--bg-panel']) {
    const rgb = parseRgb(vars[key]);
    if (rgb) vars[key] = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(3)})`;
  }

  // App Transparency
  const appTransparency = typeof settings.appTransparency === 'number' ? settings.appTransparency : 100;
  if (appTransparency < 100) {
    if (vars['--bg-deep']) {
      const rgb = parseRgb(vars['--bg-deep']);
      if (rgb) vars['--bg-deep'] = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(appTransparency / 100).toFixed(3)})`;
    }
    vars['--gradient-dark'] = 'none';
  }

  // Accent override: recolor primary/accent + gradients from one hex.
  const accent = (settings.accentOverride || '').trim();
  if (accent && hexToRgba(accent, 1)) {
    vars['--primary'] = accent;
    vars['--accent'] = accent;
    vars['--primary-glow'] = hexToRgba(accent, 0.3);
    vars['--accent-glow'] = hexToRgba(accent, 0.3);
    vars['--border-focus'] = hexToRgba(accent, 0.5);
    vars['--gradient-primary'] = `linear-gradient(135deg, ${accent} 0%, ${accent} 100%)`;
    vars['--gradient-hover'] = `linear-gradient(135deg, ${accent} 0%, ${accent} 100%)`;
  }

  const body = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n');

  return `:root {\n${body}\n}\n${theme.css || ''}`;
}

export function applyTheme(theme, settings) {
  if (!theme) return;
  let el = document.getElementById('xf-theme');
  if (!el) {
    el = document.createElement('style');
    el.id = 'xf-theme';
    document.head.appendChild(el);
  }
  const css = buildThemeCss(theme, settings);
  el.textContent = css;
  // Cache so the next launch can paint the chosen theme instantly (no flash)
  try { localStorage.setItem('xf-theme-css', css); } catch {}
}

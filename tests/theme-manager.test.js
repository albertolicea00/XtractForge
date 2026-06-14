import { describe, it, expect } from 'vitest';
const tm = require('../electron/theme-manager');

describe('theme-manager', () => {
  it('registers built-in themes with valid shape', () => {
    const themes = tm.getAllThemes();
    expect(themes.length).toBeGreaterThanOrEqual(7);
    for (const t of themes) {
      expect(typeof t.id).toBe('string');
      expect(typeof t.name).toBe('string');
      expect(t.variables && t.variables['--primary']).toBeTruthy();
    }
  });

  it('ships XtractForge Default as the first theme', () => {
    expect(tm.getAllThemes()[0].id).toBe('xtractforge-default');
  });

  it('looks up by id', () => {
    expect(tm.getTheme('dracula').id).toBe('dracula');
    expect(tm.getTheme('nope')).toBeNull();
  });

  it('rejects an unreadable theme file', () => {
    const res = tm.loadThemeFile('/path/does/not/exist.js');
    expect(res.success).toBe(false);
    expect(res.error).toBeTruthy();
  });
});

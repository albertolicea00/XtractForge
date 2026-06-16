import { describe, it, expect } from 'vitest';
import { hexToRgba, parseRgb, buildThemeCss } from '../src/lib/theme';

describe('hexToRgba', () => {
  it('expands 3- and 6-digit hex', () => {
    expect(hexToRgba('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
    expect(hexToRgba('#34d399', 0.3)).toBe('rgba(52, 211, 153, 0.3)');
  });
  it('returns null on bad input', () => {
    expect(hexToRgba('nope', 1)).toBeNull();
    expect(hexToRgba(123, 1)).toBeNull();
  });
});

describe('parseRgb', () => {
  it('parses rgb/rgba/hex', () => {
    expect(parseRgb('rgba(46, 52, 64, 0.7)')).toEqual([46, 52, 64]);
    expect(parseRgb('#2e3440')).toEqual([46, 52, 64]);
  });
  it('returns null on unparseable', () => {
    expect(parseRgb('transparent')).toBeNull();
  });
});

describe('buildThemeCss', () => {
  const theme = { variables: { '--primary': '#111111', '--bg-card': 'rgba(10, 10, 10, 0.7)', '--bg-panel': 'rgba(5, 5, 5, 0.9)' } };

  it('emits a :root block with the theme variables', () => {
    const css = buildThemeCss(theme, {});
    expect(css).toContain(':root {');
    expect(css).toContain('--primary: #111111;');
  });

  it('accent override recolors primary', () => {
    const css = buildThemeCss(theme, { accentOverride: '#34d399' });
    expect(css).toContain('--primary: #34d399;');
    expect(css).toContain('--border-focus: rgba(52, 211, 153, 0.5);');
  });

  it('glass intensity lowers card alpha as it rises', () => {
    const solid = buildThemeCss(theme, { glassIntensity: 0 });
    const sheer = buildThemeCss(theme, { glassIntensity: 100 });
    expect(solid).toContain('--bg-card: rgba(10, 10, 10, 1.000);');
    expect(sheer).toContain('--bg-card: rgba(10, 10, 10, 0.400);');
  });


});

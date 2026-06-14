import { describe, it, expect } from 'vitest';
import { localizePlugin, resolveInstall } from '../src/lib/plugins';

describe('localizePlugin', () => {
  const p = {
    name: 'yt-dlp',
    description: 'English desc',
    tag: 'Core',
    configSchema: [{ key: 'path', label: 'Path', help: 'help en' }],
    locales: { es: { description: 'desc ES', tag: 'Núcleo', fields: { path: { label: 'Ruta', help: 'ayuda es' } } } },
  };
  it('returns base when no locale for lang', () => {
    expect(localizePlugin(p, 'fr')).toBe(p);
  });
  it('overlays translated fields', () => {
    const lp = localizePlugin(p, 'es');
    expect(lp.description).toBe('desc ES');
    expect(lp.tag).toBe('Núcleo');
    expect(lp.configSchema[0].label).toBe('Ruta');
    expect(lp.configSchema[0].help).toBe('ayuda es');
  });
  it('keeps the name untranslated', () => {
    expect(localizePlugin(p, 'es').name).toBe('yt-dlp');
  });
});

describe('resolveInstall', () => {
  const p = { installHint: 'pip install x', install: { darwin: 'brew install x', linux: 'apt install x', default: 'pip install x' } };
  it('picks the platform command', () => {
    expect(resolveInstall(p, 'darwin')).toBe('brew install x');
    expect(resolveInstall(p, 'linux')).toBe('apt install x');
  });
  it('falls back to default then installHint', () => {
    expect(resolveInstall(p, 'win32')).toBe('pip install x');
    expect(resolveInstall({ installHint: 'only hint' }, 'darwin')).toBe('only hint');
  });
});

import React from 'react';
import { Palette, FolderOpen, UploadCloud, CheckCircle2, AlertTriangle, Check, XCircle, Globe } from 'lucide-react';
import { ACCENT_PRESETS } from '../../lib/theme';

export default function ThemesTab({ t, themes, activeThemeId, handleSetTheme, themeImportResult, handleImportTheme, themeSettings, handleThemeSetting, settings, updateSetting }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header — matches the Plugins tab */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={22} style={{ color: 'var(--primary)' }} /> {t('themes.title')}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '520px', lineHeight: 1.5 }}>
            {t('themes.subtitle')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => window.api.openThemesDir()} style={{ fontSize: '13px', padding: '8px 14px' }}>
            <FolderOpen size={14} /> Themes Folder
          </button>
          <button className="btn btn-primary" onClick={handleImportTheme} style={{ fontSize: '13px', padding: '8px 14px' }}>
            <UploadCloud size={14} /> Import Theme
          </button>
        </div>
      </div>

      {themeImportResult && (
        <div className="error-banner" style={{ margin: 0, borderColor: themeImportResult.success ? 'var(--text-success)' : undefined }}>
          {themeImportResult.success ? <CheckCircle2 size={18} style={{ color: 'var(--text-success)' }} /> : <AlertTriangle size={18} />}
          <div>
            <strong>{themeImportResult.success ? `Theme "${themeImportResult.id}" imported` : 'Import failed'}</strong>
            {!themeImportResult.success && <p style={{ fontSize: '12px', marginTop: '2px' }}>{themeImportResult.error}</p>}
          </div>
        </div>
      )}      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Appearance & Window</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="toggle-group">
              <div className="toggle-row">
                <div className="toggle-details">
                  <span className="toggle-title">Native Window Titlebar</span>
                  <span className="toggle-desc">Use standard OS frame (requires restart).</span>
                </div>
                <label className="switch"><input type="checkbox" checked={!!settings?.useNativeTitlebar} onChange={(e) => updateSetting({ useNativeTitlebar: e.target.checked })} /><span className="slider"></span></label>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Zoom</label>
              <select
                value={themeSettings.fontScale ?? 100}
                onChange={(e) => handleThemeSetting({ fontScale: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', outline: 'none', fontFamily: 'var(--font-sans)', fontSize: '13px', cursor: 'pointer' }}
              >
                <option value="80">80%</option>
                <option value="90">90%</option>
                <option value="100">100% (Default)</option>
                <option value="115">115%</option>
                <option value="120">120%</option>
                <option value="135">135%</option>
                <option value="150">150%</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Glass Intensity</h3>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>{themeSettings.glassIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={themeSettings.glassIntensity}
              onChange={(e) => handleThemeSetting({ glassIntensity: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>SOLID</span><span>FROSTED</span><span>TRANSLUCENT</span>
            </div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>App Transparency</h3>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>{themeSettings.appTransparency ?? 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={themeSettings.appTransparency ?? 100}
              onChange={(e) => handleThemeSetting({ appTransparency: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>CLEAR</span><span>TRANSLUCENT</span><span>OPAQUE</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <AlertTriangle size={12} style={{ flexShrink: 0, marginTop: '2px' }} />
              Requires restart. OS may hide window shadows.
            </div>
          </div>
        </div>
      </div>

      {/* Visual Modes */}
      <div className="glass-card" style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Visual Modes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: '12px' }}>
          {themes.map(theme => {
            const active = theme.id === activeThemeId;
            return (
              <div
                key={theme.id}
                onClick={() => handleSetTheme(theme.id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${active ? 'var(--primary)' : 'var(--border-color)'}`,
                  boxShadow: active ? '0 0 0 1px var(--primary), var(--shadow-glow)' : 'none',
                  overflow: 'hidden',
                  transition: 'var(--transition-fast)',
                }}
              >
                <div style={{
                  position: 'relative',
                  height: '64px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '5px',
                  background: theme.variables['--bg-dark'] || theme.variables['--bg-deep'] || '#0f0f13',
                  backgroundImage: theme.variables['--gradient-dark'] || 'none',
                }}>
                  {active && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="#fff" />
                    </div>
                  )}
                  {(theme.swatches || []).map((c, i) => (
                    <div key={i} style={{ width: '15px', height: '15px', borderRadius: '50%', background: c, border: '2px solid rgba(255,255,255,0.15)' }} />
                  ))}
                </div>
                <div style={{ padding: '8px 10px 10px', background: 'var(--bg-hover)', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{theme.name}</span>
                    {theme.isBuiltin
                      ? <span style={{ fontSize: '9px', padding: '1px 5px', background: 'rgba(139,92,246,0.15)', color: 'var(--primary)', borderRadius: '10px' }}>built-in</span>
                      : <span style={{ fontSize: '9px', padding: '1px 5px', background: 'var(--bg-input)', color: 'var(--text-muted)', borderRadius: '10px' }}>{theme.author || 'community'}</span>}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>{theme.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Custom Accent Color</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Override the primary brand color across the entire interface.
          </p>
          <div className="toggle-row" style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="toggle-details">
              <span className="toggle-title">System Accent Color</span>
              <span className="toggle-desc">Use OS accent color for primary elements.</span>
            </div>
            <label className="switch"><input type="checkbox" checked={settings?.useSystemAccentColor !== false} onChange={(e) => updateSetting({ useSystemAccentColor: e.target.checked })} /><span className="slider"></span></label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
              <input
                type="text"
                value={themeSettings.accentOverride || ''}
                placeholder="#8B5CF6"
                onChange={(e) => handleThemeSetting({ accentOverride: e.target.value })}
                style={{ width: '90px', background: 'none', border: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '14px', outline: 'none' }}
              />
              <label title="Pick from palette" style={{ position: 'relative', width: '22px', height: '22px', borderRadius: '50%', background: themeSettings.accentOverride || 'var(--primary)', border: '1px solid var(--border-color)', cursor: 'pointer', flexShrink: 0 }}>
                <input
                  type="color"
                  value={/^#[0-9a-fA-F]{6}$/.test(themeSettings.accentOverride || '') ? themeSettings.accentOverride : '#8b5cf6'}
                  onChange={(e) => handleThemeSetting({ accentOverride: e.target.value })}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', padding: 0, border: 'none' }}
                />
              </label>
            </div>
            {ACCENT_PRESETS.map(c => (
              <button
                key={c}
                onClick={() => handleThemeSetting({ accentOverride: c })}
                aria-label={`Accent ${c}`}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', background: c, cursor: 'pointer',
                  border: (themeSettings.accentOverride || '').toLowerCase() === c.toLowerCase() ? '2px solid var(--text-primary)' : '2px solid transparent',
                  boxShadow: (themeSettings.accentOverride || '').toLowerCase() === c.toLowerCase() ? `0 0 12px ${c}` : 'none',
                }}
              />
            ))}
            <button
              onClick={() => handleThemeSetting({ accentOverride: '' })}
              title="Reset to theme default"
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <XCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Building a theme</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Themes are single <code>.js</code> files mapping CSS variables. The full authoring guide lives on GitHub.
          </p>
        </div>
        <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 14px', flexShrink: 0 }} onClick={() => window.api.openExternal('https://github.com/albertolicea00/XtractForge/blob/main/ADDONS.md#themes')}>
          <Globe size={14} /> Theme docs
        </button>
      </div>
    </div>
  );
}

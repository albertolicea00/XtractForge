// Solarized Light — warm cream surfaces with blue/cyan accents.
module.exports = {
  id: 'solarized-light',
  name: 'Solarized Light',
  description: 'Warm cream, blue accent',
  author: 'XtractForge',
  repoUrl: '',
  mode: 'light',
  swatches: ['#268bd2', '#2aa198', '#fdf6e3'],

  variables: {
    '--bg-deep': '#eee8d5',
    '--bg-dark': '#fdf6e3',
    '--bg-card': 'rgba(253, 246, 227, 0.85)',
    '--bg-panel': 'rgba(238, 232, 213, 0.95)',
    '--bg-input': 'rgba(101, 123, 131, 0.06)',
    '--bg-hover': 'rgba(101, 123, 131, 0.07)',

    '--primary': '#268bd2',
    '--primary-glow': 'rgba(38, 139, 210, 0.22)',
    '--accent': '#2aa198',
    '--accent-glow': 'rgba(42, 161, 152, 0.2)',

    '--gradient-primary': 'linear-gradient(135deg, #268bd2 0%, #2aa198 100%)',
    '--gradient-hover': 'linear-gradient(135deg, #1f7bb8 0%, #239187 100%)',
    '--gradient-dark': 'linear-gradient(180deg, #fdf6e3 0%, #eee8d5 100%)',

    '--text-primary': '#073642',
    '--text-secondary': '#586e75',
    '--text-muted': '#93a1a1',
    '--text-success': '#859900',
    '--text-error': '#dc322f',

    '--border-color': 'rgba(101, 123, 131, 0.18)',
    '--border-focus': 'rgba(38, 139, 210, 0.55)',
    '--shadow-lg': '0 10px 25px -5px rgba(101, 90, 60, 0.15), 0 8px 10px -6px rgba(101, 90, 60, 0.1)',
    '--shadow-glow': '0 0 20px rgba(38, 139, 210, 0.12)',
  },
};

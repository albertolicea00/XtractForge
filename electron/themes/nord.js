// Nord — arctic, north-bluish dark palette. Calm frost accents.
module.exports = {
  id: 'nord',
  name: 'Nord',
  description: 'Arctic frost blue',
  author: 'XtractForge',
  repoUrl: '',
  mode: 'dark',
  swatches: ['#88c0d0', '#81a1c1', '#2e3440'],

  variables: {
    '--bg-deep': '#242933',
    '--bg-dark': '#2e3440',
    '--bg-card': 'rgba(46, 52, 64, 0.7)',
    '--bg-panel': 'rgba(36, 41, 51, 0.9)',
    '--bg-input': 'rgba(59, 66, 82, 0.45)',
    '--bg-hover': 'rgba(255, 255, 255, 0.04)',

    '--primary': '#88c0d0',
    '--primary-glow': 'rgba(136, 192, 208, 0.3)',
    '--accent': '#81a1c1',
    '--accent-glow': 'rgba(129, 161, 193, 0.3)',

    '--gradient-primary': 'linear-gradient(135deg, #5e81ac 0%, #88c0d0 50%, #8fbcbb 100%)',
    '--gradient-hover': 'linear-gradient(135deg, #4f6f96 0%, #75aab8 50%, #7aa9a8 100%)',
    '--gradient-dark': 'linear-gradient(180deg, #2e3440 0%, #242933 100%)',

    '--text-primary': '#eceff4',
    '--text-secondary': '#abb2c0',
    '--text-muted': '#6c7689',
    '--text-success': '#a3be8c',
    '--text-error': '#bf616a',

    '--border-color': 'rgba(255, 255, 255, 0.08)',
    '--border-focus': 'rgba(136, 192, 208, 0.5)',
    '--shadow-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    '--shadow-glow': '0 0 20px rgba(136, 192, 208, 0.15)',
  },
};

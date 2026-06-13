// Dracula — the classic dark theme: deep slate with purple/pink accents.
module.exports = {
  id: 'dracula',
  name: 'Dracula',
  description: 'Iconic dark purple & pink',
  author: 'XtractForge',
  repoUrl: '',
  mode: 'dark',
  swatches: ['#bd93f9', '#ff79c6', '#282a36'],

  variables: {
    '--bg-deep': '#1e1f29',
    '--bg-dark': '#282a36',
    '--bg-card': 'rgba(40, 42, 54, 0.7)',
    '--bg-panel': 'rgba(33, 34, 44, 0.9)',
    '--bg-input': 'rgba(68, 71, 90, 0.4)',
    '--bg-hover': 'rgba(255, 255, 255, 0.05)',

    '--primary': '#bd93f9',
    '--primary-glow': 'rgba(189, 147, 249, 0.3)',
    '--accent': '#ff79c6',
    '--accent-glow': 'rgba(255, 121, 198, 0.3)',

    '--gradient-primary': 'linear-gradient(135deg, #bd93f9 0%, #ff79c6 100%)',
    '--gradient-hover': 'linear-gradient(135deg, #a87fe0 0%, #e667b0 100%)',
    '--gradient-dark': 'linear-gradient(180deg, #282a36 0%, #1e1f29 100%)',

    '--text-primary': '#f8f8f2',
    '--text-secondary': '#b8b9c4',
    '--text-muted': '#6d6f86',
    '--text-success': '#50fa7b',
    '--text-error': '#ff5555',

    '--border-color': 'rgba(255, 255, 255, 0.09)',
    '--border-focus': 'rgba(189, 147, 249, 0.5)',
    '--shadow-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.55), 0 8px 10px -6px rgba(0, 0, 0, 0.55)',
    '--shadow-glow': '0 0 20px rgba(189, 147, 249, 0.18)',
  },
};

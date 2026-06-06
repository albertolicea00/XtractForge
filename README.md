# XtractForge

<div align="center">

![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)

**[Download](#getting-started) · [Plugins & Addons](ADDONS.md) · [Contributing](CONTRIBUTING.md) · [Report a Bug](https://github.com/YOUR_ORG/XtractForge/issues/new?template=bug_report.yml) · [Request a Feature](https://github.com/YOUR_ORG/XtractForge/issues/new?template=feature_request.yml)**

</div>

---

**XtractForge** is a modern, open-source, cross-platform desktop app for downloading media from anywhere — YouTube, Spotify, Bilibili, DeviantArt, image galleries, and 1000+ more sites. It runs on **Electron + React + Vite** with a **plugin architecture**: every downloader is a hot-swappable plugin. Enable what you need, disable what you don't, and import community-built plugins with one click.

> **AI-powered discovery** — type what you want to find; a local Ollama model suggests content and hands you the download link.

---

## Features

| | |
|---|---|
| 🔌 **Plugin system** | Enable/disable any tool; import community plugins as plain `.js` files |
| 🤖 **AI Discover** | Describe what you want — Ollama AI suggests downloadable content |
| 🎯 **Auto-detection** | Paste any URL; XtractForge picks the right plugin automatically |
| 📊 **Download queue** | Real-time progress, speed, ETA, concurrent downloads, cancel |
| 🎞 **Format picker** | Quality presets, audio-only (MP3/M4A/WAV), or raw format selection |
| ⚙️ **Per-plugin config** | Binary paths, cookies, bitrate, AI model — all configurable in Settings |
| 🌑 **Dark UI** | Glassmorphic dark theme, native macOS/Windows/Linux window chrome |

---

## Built-in Plugins

XtractForge ships with these plugins out of the box:

| Plugin | Supported Sites |
|---|---|
| **yt-dlp** | YouTube, Vimeo, Twitter/X, TikTok, Twitch, SoundCloud, 1000+ |
| **Annie** | Bilibili, Youku, iQiyi, Weibo, Douyin |
| **Lux** | Bilibili, Douyin, Kuaishou + Annie's full site list |
| **gallery-dl** | DeviantArt, Pixiv, Reddit, Instagram, Danbooru, 200+ image galleries |
| **spotDL** | Spotify tracks, albums, and playlists (via YouTube Music) |
| **Ollama AI** | Local AI content discovery (bring your own model) |

→ Full list, install instructions, and community plugin directory: **[ADDONS.md](ADDONS.md)**

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) 16+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- The download tools you want to use (see [ADDONS.md](ADDONS.md) for install commands)

### Run from source

```bash
git clone https://github.com/YOUR_ORG/XtractForge.git
cd XtractForge
pnpm install
pnpm dev
```

### Build a distributable

```bash
pnpm package:mac     # macOS DMG + ZIP
pnpm package:win     # Windows NSIS installer
pnpm package:linux   # AppImage + deb
pnpm package:all     # All platforms
```

Packages are saved to `dist-package/`.

---

## Using XtractForge

1. **Paste a URL** in the Download tab — XtractForge identifies the right plugin automatically
2. **Choose quality** — video preset, audio-only, or pick a raw format
3. **Click Download** — progress appears in the Queue tab
4. **Discover content** — use the AI Discover tab to find content by description (requires Ollama)
5. **Manage plugins** — enable, disable, or import new plugins from the Plugins tab

Missing a tool? The Plugins tab shows which tools aren't installed, with one-line install commands.

---

## Plugins & Community Addons

XtractForge's plugin system lets anyone build and share a downloader plugin. A plugin is a single `.js` file — no framework, no bundler, just CommonJS.

→ **[ADDONS.md](ADDONS.md)** — built-in plugin details, community plugin list, install guide, and full plugin API reference

---

## Contributing

Contributions of all kinds are welcome — bug fixes, new plugins, UI improvements, documentation, and testing on different platforms.

→ **[CONTRIBUTING.md](CONTRIBUTING.md)** — development setup, project structure, plugin authoring guide, and PR checklist

Quick links:
- [Report a bug](https://github.com/YOUR_ORG/XtractForge/issues/new?template=bug_report.yml)
- [Request a feature](https://github.com/YOUR_ORG/XtractForge/issues/new?template=feature_request.yml)
- [Submit a plugin](https://github.com/YOUR_ORG/XtractForge/issues/new?template=plugin_submission.yml)

---

## Architecture

```
electron/
  main.js              Main process — IPC handlers, plugin dispatch, settings
  preload.js           Secure IPC bridge (contextBridge)
  plugin-manager.js    Plugin registry, URL routing, dependency checks, external loading
  plugins/             Built-in plugins (one self-contained .js file each)
src/
  App.jsx              React UI — Download, Queue, AI Discover, Plugins, Settings tabs
  index.css            Dark theme
```

→ Full IPC contracts, data flow diagrams, and plugin internals: **[AGENTS.md](AGENTS.md)**

---

## License & Legal

XtractForge is released under the **[MIT License](LICENSE)**.

By using this software you agree to the **[End User License Agreement (EULA)](EULA.md)**. XtractForge is a tool — you are solely responsible for using it in compliance with applicable law and the terms of service of any site you access. The developers do not endorse piracy or copyright infringement.

Third-party tools (yt-dlp, ffmpeg, Annie, Lux, gallery-dl, spotDL, Ollama) are not bundled and are governed by their own licenses.

For security vulnerabilities, see **[SECURITY.md](SECURITY.md)**.

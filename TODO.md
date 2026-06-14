# XtractForge — TODO

Status: `[ ]` todo · `[~]` wip · `[x]` done · `[!]` blocker

---

## 🚧 Active worklog (UI/UX overhaul)

Done and pending items from the current redesign pass. Mark, don't delete.

- [x] Remove Annie & Ollama; built-ins = yt-dlp, gallery-dl, spotDL, Lux
- [x] Theme system (built-in + importable `.js` themes) with live apply
- [x] Built-in themes: Cyber-Glass, Alexandria, Matrix, Dracula, Nord, Solarized Light
- [x] OS-aware install commands per plugin + copy button
- [x] Security warning for importing untrusted plugins
- [x] Explicit plugin display order (yt-dlp → gallery-dl → spotDL → Lux); imports after
- [x] Plugin repo as icon (opens browser) + per-plugin Settings button
- [x] Plugins tab as card grid + per-plugin detail/settings page
- [x] Per-plugin config moved out of general Settings; general Settings auto-saves
- [x] Field help tooltips + plugin description in settings
- [x] Persist & hydrate global settings + disabledPlugins (get-settings IPC)
- [x] Exclude disabled plugins from "active tools"
- [x] macOS draggable titlebar + no top clipping
- [x] Download view redesigned as "Extract Anything" hero
- [x] Fix Download view overflow (long save-to path, responsive grid)
- [x] Queue: statuses (Extracting / Waiting / Paused / Completed / Failed)
- [x] Queue: pause/resume, reorder, open folder, expandable live console output
- [x] Queue: summary bar (counts, total speed, free disk)
- [x] App icons for packaging + window + dev dock name/icon
- [x] XtractForge Default theme (Nord + #34d399 + mono) as default
- [x] Instant theme load (no flash) via cached CSS injected pre-mount
- [x] Extract: let user pick the extractor plugin (default = auto)
- [x] Visual consistency: Themes & Settings headers/footers match Plugins style
- [x] App version under sidebar title + update detection from GitHub
- [x] Language / i18n menu (en/es) — infra + nav/headers translated
- [x] FFmpeg (HLS/DASH/RTMP/RTSP) and curl (direct file) built-in plugins
- [x] Plugin-declared Download view (`_downloadOptions`) + per-plugin locales
- [x] Loading skeletons (sidebar tools, plugin grid)
- [x] Test system — Vitest suite (lib, plugins, managers) + `pnpm test`/`test:watch`
- [x] Refactor App.jsx → src/lib helpers + src/components tabs (1516 → 577 lines)
- [ ] i18n: translate remaining strings (settings bodies, plugin/queue/theme detail, buttons)
- [ ] Auto-download/install updates (electron-updater) — currently detect + link only
- [ ] Optional: extract hooks (useQueue/useTheme/...) to isolate re-renders (log streaming)
- [ ] Add component/DOM tests (React Testing Library) on top of the logic tests

---

## 🧪 Testing

### Unit tests (plugin logic) — Vitest, see `tests/`
- [x] Set up test runner (Vitest) — `pnpm test`
- [x] `plugin-manager`: `getDownloaderForUrl` routes correct plugin per URL
- [x] `plugin-manager`: disabled plugins are skipped in routing
- [x] `plugin-manager`: yt-dlp always returned as fallback when all others disabled
- [ ] `plugin-manager`: `loadPluginFile` rejects invalid plugin (missing id/name/type)
- [ ] `plugin-manager`: `loadExternalPlugins` skips non-.js files, logs errors per file
- [x] `plugin-manager`: `getPluginConfig` merges global + plugin-specific correctly
- [x] Each plugin: `canHandle` returns true for its sites, false for unrelated URLs
- [x] Each plugin: `parseProgress` extracts correct fields from sample output lines
- [x] Each plugin: `configSchema` has no duplicate keys
- [x] `theme-manager`: registry shape, default-first, lookup, rejects bad file
- [x] `src/lib`: format/theme/plugins helpers

### Integration tests (IPC)
- [ ] `check-dependencies` returns correct shape `{ [id]: { available, version, name, ... } }`
- [ ] `get-video-info` injects `pluginId` in response
- [ ] `set-plugin-enabled` persists to config.json correctly
- [ ] `save-plugin-configs` doesn't clobber unrelated plugin configs
- [ ] `import-plugin-file` returns `{ success: false }` for syntactically broken file
- [ ] `cancel-download` SIGTERM's correct process, not another download

### E2E / manual test checklist
- [ ] `pnpm dev` starts without errors (Vite + Electron both boot)
- [ ] URL analyze: YouTube → routes to yt-dlp
- [ ] URL analyze: Spotify → routes to spotdl
- [ ] URL analyze: Bilibili → routes to lux
- [ ] URL analyze: DeviantArt → routes to gallery-dl
- [ ] Download: yt-dlp video completes, file appears in folder
- [ ] Download: progress bar updates in real time
- [ ] Download: cancel kills process, item shows "Cancelled by user"
- [ ] Download: error (bad URL) surfaces in queue item
- [ ] Plugins tab: toggle disable yt-dlp → analyze any URL → still uses yt-dlp (it's hardcoded fallback — document this edge case)
- [ ] Plugins tab: import a valid .js plugin → appears in plugin list after import
- [ ] Plugins tab: import invalid .js → error shown, no crash
- [ ] Settings: save → reopen app → values persist (read from config.json)
- [ ] External plugin in `<userData>/plugins/` → auto-loads on next app start

---

## 🐛 Known Issues / Edge Cases

- [ ] yt-dlp can't truly be "disabled" since it's the hardcoded fallback in `getDownloaderForUrl` — decide: throw error or keep silent fallback
- [ ] `gallery-dl`: progress reporting is count-based (`#0042`), not percent — progress bar stays at 0% during download; UI should handle this case
- [ ] `spotdl`: `getInfo` returns a stub (no real metadata) because spotdl has no info-only mode — thumbnail always empty
- [ ] `startDownload` progress regex on stderr — lux writes progress to stderr, stdout is JSON; verify both streams are parsed
- [x] `App.jsx`: `disabledPlugins` now hydrated from config on mount (get-settings IPC)
- [ ] Window width (1200px) added but `electron-builder` `build.files` doesn't include `electron/plugin-manager.js` — verify packaged build resolves module

---

## ✨ Features

### Plugin system
- [ ] Plugin marketplace / registry — browse a JSON index of community plugins, install by URL
- [ ] Plugin version pinning — store which version of a plugin file was imported
- [ ] Plugin update notifications — check plugin repoUrl for newer releases
- [ ] Plugin sandboxing — run untrusted plugins in a worker process, not main process
- [ ] `yt-dlp` as non-disableable anchor (guard in `setPluginEnabled` IPC handler)

### Downloaders / new plugins
- [x] `FFmpeg` plugin — HLS/DASH/RTMP/RTSP stream recording
- [x] `curl` plugin — direct URL file download (no metadata extraction)
- [ ] `N_m3u8DL-RE` plugin — DASH/HLS stream downloader (live streams)
- [ ] `Cobalt` plugin — cobalt.tools API wrapper (Twitter, TikTok, YouTube Shorts)
- [ ] `PixelDrain` / `GoFile` plugin — file hosting sites
- [ ] Batch input — paste newline-separated URLs, each queued with correct plugin

### Download Queue
- [ ] Concurrency limiter — honor `config.maxConcurrent` (currently ignored)
- [ ] Retry failed downloads
- [ ] Download history persistence — survive app restarts (`config.json` or SQLite)
- [ ] Sort/filter queue (by status, plugin, date)
- [ ] Open downloaded file directly (not just folder)
- [ ] Per-item "change destination folder" before starting

### Settings
- [x] Load `disabledPlugins` from config on app mount
- [x] Save global settings via IPC (auto-save with inline confirmation)
- [ ] Binary auto-detect button — runs `which yt-dlp` etc. and fills path fields
- [ ] Auto-update yt-dlp: `yt-dlp -U`

### UI / UX
- [ ] Drag-and-drop URL onto window
- [ ] macOS dock badge with active download count
- [ ] System tray (Windows/Linux) — minimize to tray
- [ ] Notification on download complete (OS native)
- [ ] Keyboard shortcuts: `Cmd+V` focus URL bar, `Enter` analyze, `Cmd+D` download
- [ ] Responsive layout — sidebar collapses to icons on narrow window
- [ ] Progress ring instead of bar for audio-only downloads (indeterminate)

---

## 🏗️ Infrastructure

- [ ] Add test script to `package.json` (`vitest` or `jest`)
- [ ] ESLint config (currently none)
- [ ] `package.json` description update (still says "yt-dlp GUI")
- [ ] `package.json` author field (`albertolicea00`)
- [ ] Move inline styles in App.jsx to CSS classes (currently ~80% inline)
- [ ] Error boundary component in React (uncaught render errors crash whole UI)

### 🚀 GitHub Actions — CI/CD & Releases

- [ ] **`.github/workflows/ci.yml`** — runs on every PR:
  - Checkout, setup Node 20 + pnpm
  - `pnpm install --frozen-lockfile`
  - `pnpm build` (Vite bundle, no Electron packaging)
  - Fail PR if build errors

- [ ] **`.github/workflows/release.yml`** — runs on `push tag v*.*.*`:
  - Matrix: `ubuntu-latest`, `windows-latest`, `macos-latest`
  - Checkout + setup Node 20 + pnpm
  - `pnpm install --frozen-lockfile`
  - `pnpm build` (Vite)
  - macOS: `pnpm package:mac` → upload `dist-package/*.dmg` + `dist-package/*.zip`
  - Windows: `pnpm package:win` → upload `dist-package/*.exe` + `dist-package/*.zip`
  - Linux: `pnpm package:linux` → upload `dist-package/*.AppImage` + `dist-package/*.deb`
  - Create GitHub Release from tag, attach all artifacts
  - Secrets needed: `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` (for macOS notarization), `GH_TOKEN`

- [ ] **macOS code signing** — `electron-builder` needs `CSC_LINK` (p12 cert base64) + `CSC_KEY_PASSWORD` in repo secrets
- [ ] **macOS notarization** — add `afterSign` hook or `notarize` package; requires Apple Developer account
- [ ] **Windows code signing** — `WIN_CSC_LINK` + `WIN_CSC_KEY_PASSWORD` in repo secrets (optional but kills SmartScreen warning)
- [ ] **Auto-updater** — add `electron-updater`, configure `publish` in `electron-builder` config pointing to GitHub releases
- [ ] **Homebrew cask** — after first release, submit PR to `homebrew/homebrew-cask` or maintain personal tap `albertolicea00/homebrew-xtractforge`
- [ ] **winget manifest** — submit to `microsoft/winget-pkgs` after first release
- [ ] **Snap / AUR** — `snapcraft.yaml` for Snap Store; `PKGBUILD` for AUR submission

---

## 📖 Docs

- [ ] Plugin authoring guide (separate `docs/PLUGIN_GUIDE.md`) with full type signatures
- [ ] Changelog (`CHANGELOG.md`)
- [x] Contributing guide (`CONTRIBUTING.md`)
- [x] Code of Conduct (`CODE_OF_CONDUCT.md`)
- [x] Security policy (`SECURITY.md`)
- [x] EULA (`EULA.md`)
- [x] Issue templates (bug, feature, plugin submission)
- [x] PR template
- [ ] Screenshot / GIF in README showing each tab
- [ ] Document `<userData>` path per OS (macOS: `~/Library/Application Support/XtractForge`, Windows: `%APPDATA%\XtractForge`, Linux: `~/.config/XtractForge`)

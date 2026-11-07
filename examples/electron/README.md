# Veilkit in Electron

Veilkit runs in Electron renderer processes with zero native dependencies.

### Key Capabilities in Electron:
1. **IPC Data Load Skeletons**: Automatically mask UI components while IPC requests (`ipcRenderer.invoke`) query the main process or native system resources.
2. **Strict CSP (Content Security Policy)**: Electron apps with `default-src 'self'; style-src 'self'` should link the static stylesheet:
   ```html
   <link rel="stylesheet" href="node_modules/veilkit/dist/styles.css" />
   ```
   Or pass a CSP nonce:
   ```ts
   veil.configure({ nonce: 'your-generated-nonce' });
   ```
3. **OS Dark Mode Sync**: Listen to Electron's `nativeTheme.on('updated')` and set `data-veil-theme="dark"` on document body.
4. **Hardware Acceleration**: Veilkit's pure `transform` and `opacity` animations leverage Chromium's GPU compositor in the renderer process without consuming main thread CPU.

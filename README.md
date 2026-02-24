# Ein-Password-Generator

Chrome extension for generating strong, customizable passwords directly in the browser popup.

- Repository: `https://github.com/WFacai/Ein-Password-Generator`
- Chinese README: `README.zh-CN.md`

## Features

- Configurable password length
- Uppercase, lowercase, digits, and symbols toggles
- Optional custom symbol set
- Exclusion rules for similar and ambiguous characters
- No-repeat mode
- Optional separator formatting (for readability)
- One-click copy to clipboard

## Tech Stack

- Chrome Extension Manifest V3
- Vanilla HTML/CSS/JavaScript
- `chrome.storage.sync` for persisting settings
- `crypto.getRandomValues` for secure randomness

## Project Structure

- `EinPasswordGenerator_Unpacked/` - extension source code
- `EinPasswordGenerator_Unpacked/manifest.json` - extension manifest
- `EinPasswordGenerator_Unpacked/popup.html` - popup UI
- `EinPasswordGenerator_Unpacked/popup.css` - popup styles
- `EinPasswordGenerator_Unpacked/popup.js` - password generation logic

## Quick Start

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `EinPasswordGenerator_Unpacked`

## Security and Release Notes

- Never commit extension private keys (`*.pem`)
- Do not commit packaged binaries (`*.crx`) to source repository
- `.gitignore` already excludes both
- If a `.pem` key was exposed publicly before, rotate/regenerate it

## License

MIT License. See `LICENSE`.

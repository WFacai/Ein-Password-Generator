# Password Generator Chrome Extension

A lightweight Chrome extension popup for generating strong passwords with:

- configurable length
- uppercase/lowercase/digits/symbols toggles
- optional custom symbol set
- exclusion rules (similar/ambiguous chars)
- no-repeat mode
- separator formatting
- copy to clipboard

## Project Structure

- `EinPasswordGenerator_Unpacked/` - extension source code
- `EinPasswordGenerator_Unpacked/manifest.json` - extension manifest (MV3)

## Load Locally (Chrome)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `EinPasswordGenerator_Unpacked`

## Security Notes

- Do **not** commit private key files (`*.pem`)
- Do **not** commit packaged artifacts (`*.crx`)
- This repository is configured to ignore both via `.gitignore`

## License

MIT License. See `LICENSE`.

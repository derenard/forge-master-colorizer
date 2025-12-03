Colorizer — per-character gradient React demo

What it is

- A very small client-side React app (no build required) demonstrating per-character gradient coloring.
- Enter text, pick a start and end color. The app renders each character colored across a gradient.
- Use the "Copy formatted output" button to copy a string with the format <#HEX>char for each character.

How to use

1. Open `c:\Sites\colorizer\index.html` in your browser (double-click or use PowerShell command below).

PowerShell (open from project folder):

```powershell
# open index.html in the default browser
Start-Process .\index.html
```

2. Or serve the folder and open http://localhost:8000 (if you prefer a local server):

```powershell
# from the project folder, if you have Python installed
python -m http.server 8000; Start-Process http://localhost:8000
```

Notes

- This demo uses Babel in the browser for convenience. For production use, convert to a proper build (Vite/Create React App) and remove the in-browser Babel dependency.
- The output format is exactly like `<#HEX>char` repeated for each character, matching the example in the request.

Happy colorizing!
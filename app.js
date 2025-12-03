const { useState, useMemo } = React;

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function makeGradientColors(startHex, endHex, length) {
  if (length <= 0) return [];
  const [sr, sg, sb] = hexToRgb(startHex);
  const [er, eg, eb] = hexToRgb(endHex);
  if (length === 1) {
    return [rgbToHex(sr, sg, sb)];
  }
  const colors = [];
  for (let i = 0; i < length; i++) {
    const t = length === 1 ? 0 : i / (length - 1);
    const r = lerp(sr, er, t);
    const g = lerp(sg, eg, t);
    const b = lerp(sb, eb, t);
    colors.push(rgbToHex(r, g, b));
  }
  return colors;
}

// Generate a multi-stop gradient across an array of hex colors.
// Distributes the gradient smoothly across all stops for the given length.
function makeMultiGradientColors(stops, length) {
  if (length <= 0) return [];
  if (!stops || stops.length === 0) return [];
  if (stops.length === 1) return Array(length).fill(stops[0]);

  // Convert stops to rgb arrays
  const rgbs = stops.map(s => hexToRgb(s));
  const segments = stops.length - 1; // number of segments between stops

  if (length === 1) {
    // single character gets the first stop
    return [stops[0]];
  }

  const out = [];
  for (let i = 0; i < length; i++) {
    // normalized position along whole gradient [0..1]
    const t = i / (length - 1);
    // which segment does this t fall into
    let seg = Math.floor(t * segments);
    if (seg >= segments) seg = segments - 1; // clamp (handles t === 1)
    const localT = (t - (seg / segments)) * segments; // 0..1 within segment

    const [sr, sg, sb] = rgbs[seg];
    const [er, eg, eb] = rgbs[seg + 1];
    const r = lerp(sr, er, localT);
    const g = lerp(sg, eg, localT);
    const b = lerp(sb, eb, localT);
    out.push(rgbToHex(r, g, b));
  }

  return out;
}

function hexAverage(a, b) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(Math.round((ar + br) / 2), Math.round((ag + bg) / 2), Math.round((ab + bb) / 2));
}

const RAINBOW_COLORS = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'];

function makeRainbowColors(length) {
  if (length <= 0) return [];
  const colors = [];
  for (let i = 0; i < length; i++) {
    const colorIdx = i % RAINBOW_COLORS.length;
    colors.push(RAINBOW_COLORS[colorIdx]);
  }
  return colors;
}

function makeGoldenColors(length) {
  if (length <= 0) return [];
  const goldenColors = ['#ffcc00', '#ffdd22', '#ffee55', '#ffffaa', '#ffee55', '#ffdd22'];
  const colors = [];
  for (let i = 0; i < length; i++) {
    const colorIdx = i % goldenColors.length;
    colors.push(goldenColors[colorIdx]);
  }
  return colors;
}

function makeFadeInColors(length, baseColor) {
  if (length <= 0) return [];
  const cleaned = baseColor.replace('#', '');
  const colors = [];
  const minAlpha = 0x10;
  const maxAlpha = 0xff;
  const alphaRange = maxAlpha - minAlpha;
  
  for (let i = 0; i < length; i++) {
    const t = length === 1 ? 1 : i / (length - 1);
    const alpha = Math.round(minAlpha + alphaRange * t);
    const alphaHex = alpha.toString(16).padStart(2, '0').toUpperCase();
    colors.push(`#${cleaned}${alphaHex}`);
  }
  return colors;
}

function makeFadeOutColors(length, baseColor) {
  if (length <= 0) return [];
  const cleaned = baseColor.replace('#', '');
  const colors = [];
  const minAlpha = 0x10;
  const maxAlpha = 0xff;
  const alphaRange = maxAlpha - minAlpha;
  
  for (let i = 0; i < length; i++) {
    const t = length === 1 ? 0 : i / (length - 1);
    const alpha = Math.round(maxAlpha - alphaRange * t);
    const alphaHex = alpha.toString(16).padStart(2, '0').toUpperCase();
    colors.push(`#${cleaned}${alphaHex}`);
  }
  return colors;
}

function isVowel(char) {
  return /[aeiouAEIOU]/.test(char);
}

function optimizeColorCodes(chars, colors) {
  if (chars.length === 0) return '';
  
  let result = '';
  let currentColor = colors[0];
  let currentGroup = chars[0];
  
  for (let i = 1; i < chars.length; i++) {
    const nextColor = colors[i];
    if (nextColor === currentColor) {
      // Same color, append to current group
      currentGroup += chars[i];
    } else {
      // Color changed, output current group with color code
      result += `<${currentColor}>${currentGroup}`;
      currentColor = nextColor;
      currentGroup = chars[i];
    }
  }
  
  // Output the last group
  result += `<${currentColor}>${currentGroup}`;
  return result;
}

function ColorizerApp() {
  const [text, setText] = useState("");
  const [startColor, setStartColor] = useState('#FF0000');
  const [endColor, setEndColor] = useState('#110000');
  // gradientColors is the list of color stops for multi-gradient (min 2, max 6)
  const [gradientColors, setGradientColors] = useState([startColor, endColor]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [consonantVowelMode, setConsonantVowelMode] = useState(false);
  const [consonantColor, setConsonantColor] = useState('#FFFF00');
  const [vowelColor, setVowelColor] = useState('#00AAFF');
  const [goldenMode, setGoldenMode] = useState(false);
  const [fadeInMode, setFadeInMode] = useState(false);
  const [fadeOutMode, setFadeOutMode] = useState(false);
  const [fadeColor, setFadeColor] = useState('#FF0000');
  const [copyStatus, setCopyStatus] = useState('');

  const chars = useMemo(() => Array.from(text), [text]);
  const colors = useMemo(() => {
    if (fadeInMode) {
      // Return fade in colors from low to full opacity
      return makeFadeInColors(chars.length, fadeColor);
    } else if (fadeOutMode) {
      // Return fade out colors from full to low opacity
      return makeFadeOutColors(chars.length, fadeColor);
    } else if (goldenMode) {
      // Return golden shimmer colors
      return makeGoldenColors(chars.length);
    } else if (consonantVowelMode) {
      // Return consonant or vowel color based on character type
      return chars.map(ch => isVowel(ch) ? vowelColor : consonantColor);
    } else if (rainbowMode) {
      return makeRainbowColors(chars.length);
    } else {
      // multi-stop gradient using selected gradientColors
      return makeMultiGradientColors(gradientColors, chars.length);
    }
  }, [fadeInMode, fadeOutMode, fadeColor, goldenMode, consonantVowelMode, consonantColor, vowelColor, rainbowMode, gradientColors, chars.length]);

  const spans = chars.map((ch, idx) => {
    const hex = colors[idx] || (gradientColors && gradientColors[0]) || startColor;
    return (
      <span key={idx} className="char" style={{ color: hex }}>
        {ch}
      </span>
    );
  });

  // Build the copy string in format <#HEX>char for each character, optimized for consecutive colors
  const formattedOutput = optimizeColorCodes(chars, colors);

  const isAtLimit = formattedOutput.length > 280;

  function handleTextChange(e) {
    const newText = e.target.value;
    const newChars = Array.from(newText);
    let newColors;
    if (fadeInMode) {
      newColors = makeFadeInColors(newChars.length, fadeColor);
    } else if (fadeOutMode) {
      newColors = makeFadeOutColors(newChars.length, fadeColor);
    } else if (goldenMode) {
      newColors = makeGoldenColors(newChars.length);
    } else if (consonantVowelMode) {
      newColors = newChars.map(ch => isVowel(ch) ? vowelColor : consonantColor);
    } else if (rainbowMode) {
      newColors = makeRainbowColors(newChars.length);
    } else {
      newColors = makeMultiGradientColors(gradientColors, newChars.length);
    }
    const newOutput = optimizeColorCodes(newChars, newColors);
    
    // Only allow the change if it doesn't exceed 280 characters
    if (newOutput.length <= 280) {
      setText(newText);
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 1500);
    } catch (err) {
      setCopyStatus('Copy failed');
      console.error('copy failed', err);
    }
  }

  function handleRainbowModeChange(checked) {
    if (checked) {
      setRainbowMode(true);
      setConsonantVowelMode(false);
      setGoldenMode(false);
      setFadeInMode(false);
      setFadeOutMode(false);
    } else {
      setRainbowMode(false);
    }
  }

  function handleConsonantVowelModeChange(checked) {
    if (checked) {
      setRainbowMode(false);
      setConsonantVowelMode(true);
      setGoldenMode(false);
      setFadeInMode(false);
      setFadeOutMode(false);
    } else {
      setConsonantVowelMode(false);
    }
  }

  function handleGoldenModeChange(checked) {
    if (checked) {
      setRainbowMode(false);
      setConsonantVowelMode(false);
      setGoldenMode(true);
      setFadeInMode(false);
      setFadeOutMode(false);
    } else {
      setGoldenMode(false);
    }
  }

  function handleFadeInModeChange(checked) {
    if (checked) {
      setRainbowMode(false);
      setConsonantVowelMode(false);
      setGoldenMode(false);
      setFadeInMode(true);
      setFadeOutMode(false);
    } else {
      setFadeInMode(false);
    }
  }

  function handleFadeOutModeChange(checked) {
    if (checked) {
      setRainbowMode(false);
      setConsonantVowelMode(false);
      setGoldenMode(false);
      setFadeInMode(false);
      setFadeOutMode(true);
    } else {
      setFadeOutMode(false);
    }
  }

  // Gradient stops management (min 2, max 6)
  function updateGradientColor(idx, value) {
    const copy = [...gradientColors];
    copy[idx] = value;
    setGradientColors(copy);
    // keep start/end in sync for backwards compatibility
    if (idx === 0) setStartColor(value);
    if (idx === copy.length - 1) setEndColor(value);
  }

  function addGradientColor() {
    if (gradientColors.length >= 6) return;
    // insert a midpoint before the last stop
    const copy = [...gradientColors];
    const insertBefore = copy.length - 1;
    const a = copy[insertBefore - 1];
    const b = copy[insertBefore];
    const mid = hexAverage(a, b);
    copy.splice(insertBefore, 0, mid);
    setGradientColors(copy);
  }

  function removeGradientColor(idx) {
    if (gradientColors.length <= 2) return;
    const copy = [...gradientColors];
    copy.splice(idx, 1);
    setGradientColors(copy);
  }

  const isAnyModeActive = rainbowMode || consonantVowelMode || goldenMode || fadeInMode || fadeOutMode;

  return (
    <div className="container">
      <h1 style={{marginBottom: "6px"}}><span style={{color: "rgb(255, 0, 0)"}}>C</span><span style={{color: "rgb(225, 0, 0)"}}>o</span><span style={{color: "rgb(196, 0, 0)"}}>l</span><span style={{color: "rgb(166, 0, 0)"}}>o</span><span style={{color: "rgb(136, 0, 0)"}}>r</span><span style={{color: "rgb(106, 0, 0)"}}>i</span><span style={{color: "rgb(77, 0, 0)"}}>z</span><span style={{color: "rgb(47, 0, 0)"}}>e</span><span style={{color: "rgb(17, 0, 0)"}}>r</span></h1>
      <h5 style={{marginTop: "0px"}}>DaDerp</h5>

      <div className="controls">
        <label>
          Text:
          <input
            type="text"
            className="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text to colorize"
            disabled={isAtLimit}
          />
        </label>

        <label>
          Gradient colors:
          <div className="gradient-stops">
            {gradientColors.map((c, idx) => (
              <div key={idx} className="gradient-stop">
                <input type="color" value={c} onChange={(e) => updateGradientColor(idx, e.target.value)} disabled={isAnyModeActive} />
                <input type="text" value={c} onChange={(e) => updateGradientColor(idx, e.target.value)} className="hex-input" disabled={isAnyModeActive} />
                {gradientColors.length > 2 && (
                  <button type="button" onClick={() => removeGradientColor(idx)} disabled={isAnyModeActive}>Remove</button>
                )}
              </div>
            ))}
            <div>
              <button type="button" onClick={addGradientColor} disabled={isAnyModeActive || gradientColors.length >= 6}>Add color</button>
            </div>
          </div>
        </label>

        <label className="rainbow-toggle">
          <input
            type="checkbox"
            checked={rainbowMode}
            onChange={(e) => handleRainbowModeChange(e.target.checked)}
          />
          Rainbow mode
        </label>

        <label className="rainbow-toggle">
          <input
            type="checkbox"
            checked={consonantVowelMode}
            onChange={(e) => handleConsonantVowelModeChange(e.target.checked)}
          />
          Consonant/Vowel mode
        </label>

        <label className="rainbow-toggle">
          <input
            type="checkbox"
            checked={goldenMode}
            onChange={(e) => handleGoldenModeChange(e.target.checked)}
          />
          Golden text
        </label>

        <label className="rainbow-toggle">
          <input
            type="checkbox"
            checked={fadeInMode}
            onChange={(e) => handleFadeInModeChange(e.target.checked)}
          />
          Fade in
        </label>

        <label className="rainbow-toggle">
          <input
            type="checkbox"
            checked={fadeOutMode}
            onChange={(e) => handleFadeOutModeChange(e.target.checked)}
          />
          Fade out
        </label>

        {(fadeInMode || fadeOutMode) && (
          <label>
            Fade color:
            <input type="color" value={fadeColor} onChange={(e) => setFadeColor(e.target.value)} />
            <input type="text" value={fadeColor} onChange={(e) => setFadeColor(e.target.value)} className="hex-input" />
          </label>
        )}

        {consonantVowelMode && (
          <>
            <label>
              Consonant color:
              <input type="color" value={consonantColor} onChange={(e) => setConsonantColor(e.target.value)} />
              <input type="text" value={consonantColor} onChange={(e) => setConsonantColor(e.target.value)} className="hex-input" />
            </label>

            <label>
              Vowel color:
              <input type="color" value={vowelColor} onChange={(e) => setVowelColor(e.target.value)} />
              <input type="text" value={vowelColor} onChange={(e) => setVowelColor(e.target.value)} className="hex-input" />
            </label>
          </>
        )}
      </div>

      <section className="preview">
        <h2>Rendered example</h2>
        <div className="rendered" aria-live="polite">{spans.length ? spans : <em>(empty)</em>}</div>
      </section>

      <section className="output">
        <h2>Formatted output</h2>
        {isAtLimit && <div className="limit-warning">⚠️ Output limit reached (280 characters max)</div>}
        <textarea readOnly value={formattedOutput} rows={4} />
        <div className="actions">
          <button onClick={copyToClipboard}>Copy colorized text</button>
          <span className="status">{copyStatus}</span>
        </div>
      </section>

      <footer>
        <small>Each character is prefixed with &lt;#HEX&gt; when copied (e.g. &lt;#FF0000&gt;R&lt;#00FF00&gt;G&lt;#0000FF&gt;B)</small>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ColorizerApp />);
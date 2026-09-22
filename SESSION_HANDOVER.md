# Session Handover — ChemSim Project

## Project Overview
ChemSim — Interactive Virtual Chemistry Laboratory for Grade 9/10 FBISE PBA exam prep.
13 experiments, Mystery Lab, PBA Practice, Revision Hub, Experiment Log, Demo Mode.

## Tech Stack
- Vanilla JS, HTML5, CSS3, Canvas API
- No frameworks, no backend (static/GitHub Pages compatible)
- Global `var` declarations for browser compatibility

## Git Info
- Repo: `https://github.com/imsgi-14-3/ChemSimInnovator.git`
- Branch: `main`
- Author: `imsgi-14-3 <imsgi14.3cb2@gmail.com>`
- Last commit: `7ccd13e`

## How to Run
1. Open `ChemSimInnovator/ChemSimInnovator/index.html` in browser
2. No server needed — fully static

## Architecture

```
ChemSimInnovator/
├── index.html                          ← Entry point (root)
├── AGENTS.md                           ← Development rules
├── backend/
│   └── data/
│       ├── experiments.js              ← 13 experiment definitions
│       ├── simulationConfig.js         ← Visual/simulation config per experiment
│       └── mysteryData.js              ← Mystery Lab data
├── frontend/
│   ├── app.js                          ← Main controller (~937 lines)
│   ├── renderers/
│   │   ├── DistillationRenderer.js     ← A1 canvas (complete)
│   │   ├── ChromatographyRenderer.js   ← A2/A3 canvas (complete)
│   │   ├── TitrationRenderer.js        ← A4 canvas (needs more work)
│   │   ├── GasRenderer.js              ← A5 canvas
│   │   └── MinorExperimentRenderer.js  ← M7.1-M7.8 canvas
│   ├── components/
│   │   ├── ActionBar.js                ← Action buttons per stage
│   │   ├── InstructionPanel.js         ← Left panel instructions
│   │   ├── LaboratoryWorkspace.js      ← Canvas element (550×640)
│   │   └── Sidebar.js                  ← Experiment list
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ExperimentScreen.js
│   │   └── PBAController.js
│   └── styles/
│       ├── layout.css
│       ├── components.css
│       └── responsive.css
```

## Key Patterns

### Canvas Drawing Pattern
Each renderer has:
- `renderStage(stage, exp, state, appState)` — returns HTML for instruction panel
- `draw(canvas, ctx, state, exp)` — draws on 550×640 canvas
- `handleClick(mx, my, state, stage, appState)` — handles canvas clicks

### State Flow
1. `app.js` manages `appState` (screen, experiment, stage, state)
2. `renderExperimentStage()` renders both instruction panel + canvas
3. Action buttons trigger `handleAction()` which updates state + re-renders
4. `goNext()` advances to next stage (with completion check via `isStageCompleted()`)

### Stage Completion (A4)
```javascript
function isStageCompleted(expId, stage, state) {
  // Checks if current stage requirements are met before allowing Next
  // prepare: both Qs correct
  // fillBurette: state.titrationBuretteFilled
  // measureSample: state.titrationSampleMeasured
  // titrate: state.titrationEndpointReached || state.titrationEndpointPassed
  // calculate: state.titrationCalcChecked
  // interpret/conclude: text entered
}
```

## Experiment Canvas Status

| Exp | Name | Canvas Status |
|-----|------|---------------|
| A1 | Distillation | COMPLETE — matches reference image |
| A2 | Ink Chromatography | COMPLETE — matches reference image |
| A3 | Pb²⁺/Cd²⁺ Chromatography | COMPLETE — matches reference image |
| A4 | NaOH Titration | IN PROGRESS — basic rewrite done, needs refinement |
| A5 | Gas Detection | Original canvas (not rewritten yet) |
| M7.1-M7.8 | Minor Practicals | Original canvas (not rewritten yet) |

## A4 Titration — Current State

### What's Done
- Complete canvas rewrite with glass burette, flask, stand, clamp, stopcock
- NaOH/HCl reagent bottles with glass appearance
- Phenolphthalein indicator bottle
- Glass pipette with rubber bulb
- White tile under flask
- Flask shows pink liquid when sample is measured
- Flask color transitions pink → clear during titration
- Labels with leader lines (no overlap)
- Step completion enforcement (`isStageCompleted()`)
- Next button disabled until stage requirements met

### What Needs Work
- Flask still doesn't perfectly match reference image
- Labels could be refined further
- Slider visibility was fixed (CSS selector issue)
- Canvas needs browser testing to verify all stages work
- `handleTitrationRecordTitre()` function referenced but may need verification
- GasRenderer (A5) and MinorExperimentRenderer (M7) haven't been rewritten to match A4's quality

### A4 Canvas Config (simulationConfig.js)
```javascript
"A4": {
  stand: { baseX: 310, baseY: 580, baseW: 80, baseH: 14, rodX: 350, rodTopY: 25, rodBotY: 580, rodW: 7 },
  burette: { cx: 350, topY: 25, w: 20, h: 395, maxML: 50 },
  clamp: { cx: 350, cy: 155, w: 65, h: 12 },
  stopcock: { cx: 350, cy: 420, w: 28, h: 10 },
  flask: { cx: 345, cy: 520, bodyW: 110, bodyH: 90, neckW: 28, neckH: 55 },
  whiteTile: { cx: 345, cy: 560, w: 140, h: 14 },
  naohBottle: { cx: 85, cy: 430, w: 55, h: 100, capColor: '#2255cc' },
  hclBottle: { cx: 175, cy: 430, w: 55, h: 100, capColor: '#cc2222' },
  indicatorBottle: { cx: 475, cy: 460, w: 38, h: 65, capColor: '#eee', liquidColor: 'rgba(220,80,160,0.5)' },
  pipette: { x1: 415, y1: 580, x2: 510, y2: 593 }
}
```

### A4 Stages
```javascript
stages: ["select","objective","apparatus","prepare","fillBurette","measureSample","titrate","endpoint","record","calculate","interpret","conclude","complete"]
```

## Reference Images Location
- A1: `C:\Users\all\Downloads\ChatGPT Image Sep 22, 2026, 10_13_09 AM.png`
- A2: `C:\Users\all\Downloads\ChatGPT Image Sep 22, 2026, 10_27_07 AM.png`
- A3: `C:\Users\all\Downloads\ChatGPT Image Sep 22, 2026, 12_22_40 PM.png`
- A4: `C:\Users\all\Downloads\ChatGPT Image Sep 22, 2026, 10_50_01 AM.png` (titration reference)

## Known Issues
1. No browser testing done yet for any canvas renderer
2. A4 flask still doesn't perfectly match reference
3. A5 and M7 renderers haven't been rewritten
4. `frontend/index.html` exists but root `index.html` is the actual entry
5. Service adapter pattern exists but no remote backend configured
6. No automated tests

## Non-Negotiables
- ALL 13 experiment logic, chemistry, validation, calculations preserved exactly
- GitHub Pages compatible (static/offline)
- No frameworks — vanilla JS only
- Paper Chromatography (A2/A3) is the visual quality bar
- Canvas size: 550×640
- `var` declarations for global scope

## Next Steps When You Resume
1. Open `index.html` in browser and test A4 flow end-to-end
2. Verify slider works during titration stage
3. Verify flask color transitions work
4. Refine A4 canvas to better match reference image if needed
5. Consider rewriting A5 and M7 renderers to match A4's glass style
6. Run `git status` before starting any work

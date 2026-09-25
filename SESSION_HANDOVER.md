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
- Last commit: (see `git log --oneline -1`)

## How to Run
1. Open `index.html` in browser
2. No server needed — fully static

## Architecture

```
ChemSimInnovator/
├── index.html                          ← Entry point (root)
├── AGENTS.md                           ← Development rules
├── backend/
│   ├── data/
│   │   ├── experiments.js              ← 13 experiment definitions
│   │   ├── simulationConfig.js         ← Visual/simulation config per experiment
│   │   ├── mysteryData.js              ← 6 mystery samples with tests/observations
│   │   └── pbaQuestions.js             ← 11 PBA questions (3 Section A + 8 Section B)
│   └── services/
│       ├── mysteryService.js           ← getSample(), getSampleIds()
│       ├── pbaService.js               ← getQuestions(), getQuestion(), etc.
│       └── logService.js               ← Legacy stub (replaced by ExpLog)
├── frontend/
│   ├── app.js                          ← Main controller (~1090 lines)
│   ├── renderers/
│   │   ├── DistillationRenderer.js     ← A1 canvas (complete)
│   │   ├── ChromatographyRenderer.js   ← A2/A3 canvas (complete)
│   │   ├── TitrationRenderer.js        ← A4 canvas (complete, + HCl beaker)
│   │   ├── GasRenderer.js              ← A5 canvas (complete)
│   │   └── MinorExperimentRenderer.js  ← M7.1-M7.8 canvas (complete)
│   ├── components/
│   │   ├── ActionBar.js                ← Action buttons per stage
│   │   ├── InstructionPanel.js         ← Left panel instructions
│   │   ├── LaboratoryWorkspace.js      ← Canvas element (550×640)
│   │   └── Sidebar.js                  ← Experiment list
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ExperimentScreen.js
│   │   ├── MysteryLabScreen.js         ← Mystery Lab select/investigate/result
│   │   ├── PBAScreen.js                ← PBA Practice with inline feedback
│   │   ├── LogScreen.js                ← Experiment Log (ExpLog module)
│   │   ├── DemoScreen.js               ← Demo Mode (DemoEngine module, 13 anims)
│   │   └── PBAController.js
│   └── styles/
│       ├── layout.css
│       ├── components.css              ← All UI + mystery + log + demo styles
│       ├── design-system.css
│       └── responsive.css
```

## Current Feature Status

### ALL COMPLETE
- 13 Experiment Practicals (A1-A5, M7.1-M7.8) with canvas renderers
- PBA Practice Mode — 11 questions, inline feedback per part, total score at end
- Mystery Lab — 6 mystery samples, tool visual graphics, auto-revealed answers
- Revision Hub — MCQ quiz per experiment
- Experiment Log — full CRUD, auto-records on experiment/mystery finish
- Demo Mode — guided 5-step presentation of all features
- Learning & Revision Hub

## Demo Mode — Current State

### What's Done
- Full `DemoEngine` module in `DemoScreen.js` (~3517 lines)
- Two-column lab stage: bezel canvas (560×360) + timeline + Pause/Replay + lab notebook aside
- All 13 practical animations with live readings (`setDemoReadings`), captions (`drawCaption`), progress ring (`drawProgressRing`)
- Navy callout labels, realistic apparatus per reference photos
- CSS: `.demo-lab-stage`, `.demo-notebook`, `.demo-reading`, `.demo-briefing`, `.demo-sim-badge`, `.demo-live-dot`, responsive `@media (max-width: 860px)`
- 5-step guided presentation: Practical Lab → Experiment Log → Learning & Revision → Mystery Lab → PBA Practice

### Demo Mode Flow
1. **Intro** — Title, feature list, "Start Demo" button
2. **Practical Lab** — Auto-playing animation of selected practical (13 options)
3. **Experiment Log** — Shows log records
4. **Learning & Revision** — Feature description + Open Revision Hub button
5. **Mystery Lab** — Feature description + Open Mystery Lab button
6. **PBA Practice** — Feature description + Open PBA Practice button
7. **Complete** — Summary + Restart/Return to Main Menu

### A4 Titration Demo — Rebuilt This Session
- **From-scratch rewrite** of `animTitration` (DemoScreen.js L1560–2316)
- Backdrop: window, "Titration Determines Concentration" poster, glassware shelves, blue cabinets, steel bench with reflections
- **Real glass beaker (250 mL, HCl)** added: pour spout, rim, 50–250 graduations, HCl liquid fill, white label, glass highlights, base thickness
- Reagent bottles: ribbed screw caps, clear liquid fill with meniscus, shoulder/neck, white labels
- Conical flask: glass gradient, 50–250 marks, magenta phenolphthalein fading to colourless, swirl, glass shine
- Retort stand: black base, chrome rod, blue clamp with knobs
- Burette: 0–50 graduations, blue HCl meniscus drops with `pour`, stopcock + blue handle, falling drop
- Titration Record sheet (live titre cell), white tile, phenolphthalein bottle, pipette
- 8 navy callout labels — all boxes end above y=318 (caption bar owns y≥324)
- Tail contract preserved: `setDemoReadings` (Burette/Indicator/Endpoint) → `drawCaption` → `drawProgressRing`
- Apparatus list updated: `'Beaker (250 mL, HCl)'` added to `PRACTICAL_APPARATUS.A4`
- Cache-busted: `index.html` → `DemoScreen.js?v=a4beaker1`

### A4 Interactive Canvas — Updated This Session
- `simulationConfig.js` A4: added `hclBeaker: { cx: 250, cy: 555, w: 72, h: 85, liquidLevel: 0.55, label: 'Beaker (250 mL)\n(with HCl)' }`
- `TitrationRenderer.js`: new `drawBeaker()` (glass body, pour spout, rim, graduations, HCl liquid, label, highlights); called in `draw()` between flask and burette
- `drawReagentBottle()`: ribbed screw cap + clear liquid fill with meniscus
- `drawLabels()`: beaker label "Beaker (250 mL) / (with HCl)"

### Demo State Structure
```javascript
appState.demoState = {
  screen: 'intro',           // intro|practical|log|revision|mystery|pba|complete
  step: 0,                   // current step index (0-4)
  practicalFinished: false    // set true when A2 finishes
}
```

### Demo Integration Points
- `app.js:renderCurrentScreen()` — Routes `screen === 'demo'` to `DemoEngine.renderInto()`
- `app.js:goBack()` — Handles demo back → goHome
- `app.js:goHome()` — Resets demoState
- `app.js:finishExperiment()` — Detects practical finish in demo mode
- Sidebar button `data-screen="demo"` navigates to demo
- HomeScreen.js module card navigates to demo

## Experiment Log — Current State
- Full `ExpLog` module in `LogScreen.js` with localStorage CRUD
- Three views: Menu → List → Detail
- Auto-creates records on experiment/mystery finish
- CRUD: View, Delete individual, Clear All

## Mystery Lab — Current State
- 6 mystery samples with tool visual graphics
- Auto-revealed answers, optional notes
- Score based on tests performed

## PBA Practice — Current State
- 11 questions, inline feedback per part, total score at end

## Rendering Flow (app.js)

### renderCurrentScreen()
- PBA: calls `renderPbaScreen()` for all phases
- Mystery: calls `renderMysteryScreen()` for all phases
- Log: calls `ExpLog.renderInto(appState)`
- Demo: calls `DemoEngine.renderInto(appState)`
- Experiments: calls registered handler → `renderExperimentStage()`

### Key Navigation
- `goBack()` — handles PBA, Mystery, Log, Demo, experiment stages, then home
- `goHome()` — resets all state
- `finishExperiment()` — creates log record + detects demo practical finish

## Verification Method (No Browser)
Node/Python/browser unavailable in this environment. Tests used:
- Comment-aware brace/paren counter (all edited files: diff=0)
- Single-definition greps (`animTitration`, `drawBeaker`)
- Label y-coordinate sanity (callout bottoms ≤ 318, caption bar y≥324)
- `ctx.save()`/`ctx.restore()` balance within functions
- Tail contract grep (`setDemoReadings`, `drawCaption`, `drawProgressRing` present in `animTitration`)
- **Browser test NOT performed** — must be verified by user

## Known Issues
1. No automated tests
2. Canvas renderers need browser testing verification
3. `logService.js` is legacy stub — replaced by `ExpLog` module
4. DEVELOPMENT_LOG.md not updated this session (milestone log stale)

## Non-Negotiables (AGENTS.md)
- ALL 13 experiment logic, chemistry, validation, calculations preserved exactly
- GitHub Pages compatible (static/offline)
- No frameworks — vanilla JS only
- Paper Chromatography (A2/A3) is the visual quality bar
- Canvas sizes: Demo 550×640 (interactive), 560×360 (demo anim)
- `var` declarations for global scope
- M14 release freeze noted; demo visual work is user-directed

## Next Steps When You Resume
1. Open `index.html` in browser → Demo Mode → A4 Titration: verify new from-scratch scene renders correctly
2. Verify beaker, bottles, flask, callouts all appear above caption bar
3. Test interactive A4: Practical Lab → Titration → verify HCl beaker on bench at (250, 555)
4. Check other 12 demo animations still run (splice shifted line numbers — all funcs intact)
5. Run `git status` before starting any work
6. Update DEVELOPMENT_LOG.md when milestone approved

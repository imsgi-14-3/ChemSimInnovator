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
- Last commit: pending

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
│   │   ├── TitrationRenderer.js        ← A4 canvas (complete)
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
│   │   ├── DemoScreen.js               ← Demo Mode (DemoEngine module)
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
- Full `DemoEngine` module in `DemoScreen.js`
- 5-step guided presentation: Practical Lab → Experiment Log → Learning & Revision → Mystery Lab → PBA Practice
- Intro screen with feature list, Start/Exit buttons
- Progress dots showing completed/active/upcoming steps
- Each step has presenter instruction text + feature description + action button
- Practical step detects finish via `finishExperiment()` and shows completion badge
- Launch buttons navigate to real modules (A2 practical, Mystery Lab, PBA Practice, Revision Hub)
- Continue Demo button advances to next step
- Complete screen with summary + Restart/Return buttons
- Demo state resets on exit

### Demo Mode Flow
1. **Intro** — Title, feature list, "Start Demo" button
2. **Practical Lab** — Launch A2 Paper Chromatography → finish → completion badge → Continue
3. **Experiment Log** — Shows log records from completed practical
4. **Learning & Revision** — Feature description + Open Revision Hub button
5. **Mystery Lab** — Feature description + Open Mystery Lab button
6. **PBA Practice** — Feature description + Open PBA Practice button
7. **Complete** — Summary + Restart/Return to Main Menu

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
- `app.js:finishExperiment()` — Detects practical finish in demo mode, sets `practicalFinished = true`, returns to demo screen
- Sidebar button `data-screen="demo"` navigates to demo
- HomeScreen.js module card navigates to demo

### Demo CSS Classes
- `.demo-panel` — Container (max-width 600px, centered)
- `.demo-instruction` — Orange left-border presenter instruction box
- `.demo-step-content` — Centered step content area
- `.demo-feature-list` / `.demo-feature-box` — Feature description boxes
- `.demo-completed-badge` — Green completion notification
- `.demo-progress` — Progress dots container
- `.demo-progress-dot` — Gray dot (`.active` = orange, `.completed` = green)
- `.demo-start-btn` / `.demo-continue-btn` — Orange action buttons
- `.demo-mystery-btn` — Purple Mystery Lab button

## Experiment Log — Current State

### What's Done
- Full `ExpLog` module in `LogScreen.js` with localStorage CRUD
- Three views: Menu → List → Detail
- Auto-creates records on experiment/mystery finish
- CRUD: View, Delete individual, Clear All

## Mystery Lab — Current State

### What's Done
- 6 mystery samples with tool visual graphics
- Auto-revealed answers, optional notes
- Score based on tests performed

## PBA Practice — Current State

### What's Done
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
- `goHome()` — resets all state (experiment, pbaState, mysteryState, logState, demoState)
- `finishExperiment()` — creates log record + detects demo practical finish

## Known Issues
1. No automated tests
2. Canvas renderers need browser testing verification
3. `logService.js` is legacy stub — replaced by `ExpLog` module

## Non-Negotiables
- ALL 13 experiment logic, chemistry, validation, calculations preserved exactly
- GitHub Pages compatible (static/offline)
- No frameworks — vanilla JS only
- Paper Chromatography (A2/A3) is the visual quality bar
- Canvas size: 550×640
- `var` declarations for global scope

## Next Steps When You Resume
1. Open `index.html` in browser and test Demo Mode end-to-end
2. Click "Start Demo" → verify step progression
3. Launch A2 practical from demo → finish → verify return to demo with completion badge
4. Verify Experiment Log step shows records
5. Test Mystery Lab and PBA Practice launch buttons
6. Test Restart and Return to Main Menu
7. Run `git status` before starting any work

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
│       └── pbaService.js               ← getQuestions(), getQuestion(), etc.
├── frontend/
│   ├── app.js                          ← Main controller (~1047 lines)
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
│   │   └── PBAController.js
│   └── styles/
│       ├── layout.css
│       ├── components.css              ← All UI + mystery tool visuals
│       ├── design-system.css
│       └── responsive.css
```

## Current Feature Status

### ALL COMPLETE
- 13 Experiment Practicals (A1-A5, M7.1-M7.8) with canvas renderers
- PBA Practice Mode — 11 questions, inline feedback per part, total score at end
- Mystery Lab — 6 mystery samples, tool visual graphics, auto-revealed answers
- Revision Hub — MCQ quiz per experiment
- Experiment Log — tracks completed experiments
- Demo/Presentation Mode
- Learning & Revision Hub

## Mystery Lab — Current State

### What's Done
- 6 mystery samples: NaCl, NH₃, CuSO₄, CO₂, Naphthalene, CuSO₄ displacement
- 3-4 tests per sample with observations and interpretations
- Tool visual equipment graphics (Bunsen burner, test tubes, beakers, reagent bottles, litmus paper, funnel set)
- Animated test performance (flame flicker, steam, dripping)
- Auto-revealed answers — no typing required from students
- Optional notes — students CAN add their own observations if they want
- Score based on tests performed
- Evidence summary table in results
- Difficulty badges (Easy/Medium/Hard) and marks display

### Mystery Lab Flow
1. **Select** — Grid of 6 mystery samples with difficulty + marks
2. **Investigate** — Perform 3-4 tests, each auto-shows observation + interpretation + tool visual
3. **See Result** — Click button after all tests, score + correct identity revealed automatically

### Mystery Sample Data Structure
```javascript
{
  id, title, difficulty, marks, identity, description, conclusion,
  tests: [
    { id, name, icon, method, expectedResult, observation, interpretation }
  ]
}
```

### Tool Visual CSS Classes
- `.tool-bunsen` + `.bunsen-flame.active` — Bunsen burner with animated flame
- `.tool-rack` + `.rack-tube.filled` — Test tube rack
- `.tool-beaker` — Beaker with liquid
- `.tool-dropper` — Dropper with dripping animation
- `.tool-reagent-bottle` — Reagent bottle with label
- `.tool-litmus` + `.litmus-change.blue-change` — Litmus paper with colour change
- `.tool-funnel-set` + `.dish-steam` — Evaporating dish with funnel

## PBA Practice — Current State

### What's Done
- 11 questions total: 3 Section A (Major, 6 marks each), 8 Section B (Minor, 4 marks each)
- 4 question types: MCQ, Short Answer, Calculation, Matching
- Inline feedback after each part (correct/incorrect + explanation)
- Previous parts' feedback shown, current part highlighted
- Total result at bottom after all parts (score, percentage, grade, per-part breakdown)
- Back button, Home button, navigation flow
- A1-A5 all classified as Major (`section: "A"`) in both experiments.js and pbaQuestions.js

### PBA Flow
1. Select a question from the list
2. Answer each part — feedback shown inline after submitting
3. After all parts, see total result with breakdown table
4. Back to question list or Home

## Rendering Flow (app.js)

### renderCurrentScreen()
- Handles header, sidebar, instruction panel per screen
- PBA: calls `renderPbaScreen()` for all phases
- Mystery: calls `renderMysteryScreen()` for all phases (select + non-select)
- Experiments: calls registered handler → `renderExperimentStage()`

### Key Navigation
- `goBack()` — handles PBA phases, Mystery phases, experiment stages, then home
- `goHome()` — resets all state (experiment, pbaState, mysteryState)
- `handleAction()` — experiment stage actions (start, reset, next, prev)

## Known Issues
1. No automated tests
2. Canvas renderers need browser testing verification
3. Service adapter pattern exists but no remote backend configured

## Non-Negotiables
- ALL 13 experiment logic, chemistry, validation, calculations preserved exactly
- GitHub Pages compatible (static/offline)
- No frameworks — vanilla JS only
- Paper Chromatography (A2/A3) is the visual quality bar
- Canvas size: 550×640
- `var` declarations for global scope

## Next Steps When You Resume
1. Open `index.html` in browser and test Mystery Lab end-to-end
2. Verify all 6 mystery samples render correctly with tool visuals
3. Test PBA Practice inline feedback flow
4. Run `git status` before starting any work

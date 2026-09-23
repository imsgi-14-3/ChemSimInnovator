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
│       └── logService.js               ← Legacy stub (not used, ExpLog replaces it)
├── frontend/
│   ├── app.js                          ← Main controller (~1080 lines)
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
│   │   └── PBAController.js
│   └── styles/
│       ├── layout.css
│       ├── components.css              ← All UI + mystery tool visuals + log styles
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
- Demo/Presentation Mode
- Learning & Revision Hub

## Experiment Log — Current State

### What's Done
- Full `ExpLog` module in `LogScreen.js` with storage, record builders, renderers
- localStorage key: `chemsim_experiment_log` (JSON array)
- Auto-creates log records when:
  - Student finishes a practical (`finishExperiment()` → `ExpLog.buildPracticalRecord()`)
  - Student sees mystery result (`mystery-go-result` click → `ExpLog.buildMysteryRecord()`)
- Three views: Menu → List → Detail
- CRUD: View, Delete individual, Clear All (with confirm dialog)
- Practical records include: objective, apparatus, materials, procedure, observations, measurements, calculations, result, conclusion
- Mystery records include: sample identity, tests performed, evidence, score
- Simulation notice on every record
- Back navigation handled in `goBack()` for all log phases

### Experiment Log Flow
1. **Menu** — Title, description, "Open Experiment Log (N records)" button
2. **List** — Record cards with type badge (Major/Minor/Mystery Lab), date, View/Delete buttons, Clear All
3. **Detail** — Full record display with metadata, sections, evidence, simulation notice

### Log Record Structure (Practical)
```javascript
{
  id, experimentId, title, section, type: "practical",
  date, time, slos, objective, apparatus, materials, procedure,
  observations, measurements, calculations, result, conclusion,
  sourceLabel, simulatedNotice
}
```

### Log Record Structure (Mystery)
```javascript
{
  id, experimentId: "mystery", title, section: "investigation", type: "mystery",
  date, time, sampleId, sampleTitle, sampleIdentity,
  testsPerformed, evidence[], score, totalMarks,
  conclusion, sourceLabel, simulatedNotice
}
```

### Log CSS Classes
- `.log-panel` — Container (max-width 700px, centered)
- `.log-menu-header` — Menu title area
- `.log-open-btn` — Blue "Open Experiment Log" button
- `.log-list-header` — List header with record count + Clear All
- `.log-empty` — Empty state (dashed border)
- `.log-card` — Record card with hover shadow
- `.log-badge` — Type badge (Major=green, Minor=orange, Mystery=purple)
- `.log-detail-meta` — Metadata box (type, date, SLOs)
- `.log-detail-section` — Section divider with heading
- `.log-evidence-entry` — Evidence card with left border
- `.log-sim-notice` — Orange simulation notice box

### Log Integration Points
- `app.js:finishExperiment()` — Creates practical record via `ExpLog.buildPracticalRecord()`
- `MysteryLabScreen.js` — Creates mystery record on "See Result" click via `ExpLog.buildMysteryRecord()`
- `app.js:renderCurrentScreen()` — Routes `screen === 'log'` to `ExpLog.renderInto()`
- `app.js:goBack()` — Handles log phase navigation (detail → list → menu → home)
- `app.js:goHome()` — Resets `logState` to `{ screen: 'menu', detailId: null }`

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
- Log: calls `ExpLog.renderInto(appState)` for all log phases
- Experiments: calls registered handler → `renderExperimentStage()`

### Key Navigation
- `goBack()` — handles PBA phases, Mystery phases, Log phases, experiment stages, then home
- `goHome()` — resets all state (experiment, pbaState, mysteryState, logState)
- `handleAction()` — experiment stage actions (start, reset, next, prev)

## Known Issues
1. No automated tests
2. Canvas renderers need browser testing verification
3. `logService.js` is legacy stub — replaced by `ExpLog` module in `LogScreen.js`

## Non-Negotiables
- ALL 13 experiment logic, chemistry, validation, calculations preserved exactly
- GitHub Pages compatible (static/offline)
- No frameworks — vanilla JS only
- Paper Chromatography (A2/A3) is the visual quality bar
- Canvas size: 550×640
- `var` declarations for global scope

## Next Steps When You Resume
1. Open `index.html` in browser and test Experiment Log end-to-end
2. Finish a practical → verify log record created → view in Log
3. Finish Mystery Lab → verify log record created → view in Log
4. Test Delete and Clear All functionality
5. Run `git status` before starting any work

# DEVELOPMENT_LOG.md
# ChemSim — Development Log

## Project

**Name:** ChemSim — An Interactive Virtual Chemistry Laboratory

**Purpose:** Grade 9/10 Science Innovator Club competition project aligned with FBISE SSC Chemistry PBA.

**Target:** FBISE SSC Chemistry Practical Based Assessment, Annual Examination 2026 onwards / session 2026–27.

## Authoritative Source

`Final Chemistry PBA SSC Merged.pdf`

This uploaded PDF is the authoritative source selected for the ChemSim PBA matrix.

## Current Status

**Phase:** Implementation

**Overall implementation:** Milestone 11 complete, awaiting review

**Current milestone:** Milestone 11 — Learning & Revision Hub

**Next milestone:** Milestone 12 — further practicals or features

**Milestone 11 status:** IMPLEMENTED / TESTED / AWAITING REVIEW

## Completed Decisions

### PBA Scope
- 5 Major Practicals
- 8 Minor Practicals
- 13 prescribed practicals total

### PBA Structure
- Section A: 2 Major questions × 6 marks = 12 marks / 60%
- Section B: 2 Minor questions × 4 marks = 8 marks / 40%
- Total: 20 marks
- Duration: 2 hours
- PBA can assess performance, calculations, procedures and observations.
- MCQs are not assessed in the PBA paper.

### Product Direction
ChemSim will combine:
- realistic laboratory feel,
- modern educational interaction,
- user-friendly design,
- interactive simulation,
- PBA preparation.

### Core Principle
ChemSim is an experiment engine, not merely a reaction database.

### Mystery Lab
Agreed workflow:

Unknown Sample
→ Choose Test
→ Observe Evidence
→ Record Evidence
→ Form Hypothesis
→ Test Again
→ Identify Substance

### Experiment Log
Initial fields include:
- experiment,
- date/time,
- hypothesis,
- apparatus,
- materials,
- procedure,
- observations,
- measurements,
- calculations,
- result,
- conclusion.

### PBA Practice
PBA Practice should emphasize:
- apparatus,
- procedure,
- action/performance,
- observation,
- data,
- calculation,
- interpretation,
- conclusion.

A separate Revision Quiz may use MCQs.

### Technology
Initial stack:
- HTML5
- CSS3
- Vanilla JavaScript

Core should be offline-friendly.

Avoid premature:
- frameworks,
- backend,
- database,
- AI,
- paid services,
- unnecessary libraries.

## Development Workflow

Strict workflow:

You decide
→ OpenCode implements
→ OpenCode tests
→ You review
→ You approve next milestone

OpenCode must stop after each milestone and wait for explicit approval.

## Milestone History

### M0 — Project Foundation
Status: COMPLETE

Completed:
- authoritative PBA source identified,
- 13-practical matrix established,
- project architecture direction agreed,
- experiment workflow established,
- development milestones defined,
- project documentation created.

### M1 — Experiment Engine Foundation
Status: COMPLETE

Demonstration practical: **Paper Chromatography — Ink**

Completed:
- experiment data object with FBISE practical content,
- reusable state engine (9-stage workflow),
- stage-based UI rendering,
- canvas-based chromatography simulation with animated solvent front,
- separated FBISE practical data from simulation parameters,
- Rf calculation from simulated educational values,
- observation recording stage,
- conclusion input stage,
- progress indicator,
- Back/Next navigation between stages,
- responsive layout,
- clear simulated-educational-value disclaimers throughout.

Files created:
- `index.html` — application shell
- `style.css` — laboratory-inspired styling
- `script.js` — experiment data, state engine, UI logic, simulation

Do not implement future milestones during M1.

### M2 — Complete Paper Chromatography
Status: COMPLETE

Completed:
- expanded workflow from 9 to 15 stages,
- interactive paper preparation (pencil vs pen teaching),
- interactive baseline drawing on canvas,
- interactive sample application on baseline,
- chromatography setup with solvent slider and verification,
- two-component demonstration (aligned with model paper scenario),
- animated solvent front with visible component separation,
- explicit solvent front marking stage,
- interactive measurement (click baseline, solvent front, spots),
- student-entered Rf calculation with feedback,
- interpretation stage,
- conclusion with guidance,
- experiment complete summary,
- conditional Next button (disabled until action completed),
- feedback messages for correct/incorrect actions,
- all simulated values clearly labelled.

Files modified:
- `script.js` — expanded to 1200 lines, 15-stage engine, interactive canvas
- `style.css` — added tool options, feedback messages, slider, measurement styles
- `index.html` — added feedback-area div
- `AGENTS.md` — updated milestone status
- `DEVELOPMENT_LOG.md` — updated with M2 status

### M3 — Fractional Distillation
Status: IMPLEMENTED / TESTED / AWAITING REVIEW

Completed:
- experiment-dependent stages (each experiment has its own stages array),
- fractional distillation experiment data (A1) with exact FBISE title and SLOs,
- 14-stage distillation workflow,
- canvas-based distillation apparatus visualization (flask, column, condenser, receiver),
- interactive apparatus assembly (thermometer positioning, condenser connection),
- setup verification with educational feedback,
- heating animation with flame visualization,
- distillation animation with temperature progression,
- two-fraction collection (alcohol first, then water),
- observation recording stage,
- interpretation and conclusion stages,
- experiment complete summary,
- all simulated values clearly labelled,
- M2 paper chromatography regression tested.

Architecture changes:
- stages are now experiment-dependent (each experiment defines its own stages array),
- getStages() helper returns current experiment's stages,
- stageIndex() uses experiment-dependent stages,
- renderProgress() uses experiment-dependent stages,
- canvas drawing dispatches based on experiment ID,
- user input rendering dispatches based on experiment ID,
- button rendering dispatches based on experiment ID.

Files modified:
- `script.js` — expanded to 1771 lines, added A1 experiment, experiment-dependent stages
- `style.css` — added temperature display style
- `AGENTS.md` — updated milestone status
- `DEVELOPMENT_LOG.md` — updated with M3 status

## Current File Plan

Initial project can remain small:

ChemSim/
├── index.html
├── style.css
├── script.js
├── AGENTS.md
├── PROJECT_SPEC.md
└── DEVELOPMENT_LOG.md

Folders should be introduced only when justified by project growth.

## Known Constraints

- The exact FBISE practical titles and SLO mappings must remain grounded in `Final Chemistry PBA SSC Merged.pdf`.
- Do not silently substitute another PBA source.
- Do not invent numerical experimental measurements.
- Simulation values must be clearly treated as simulated/educational.
- Preserve exact source wording when it is important to the PBA mapping.
- Do not silently expand the prescribed NH3/CO2/Cl2 gas practical.

## Testing Summary

### M1 Tests
1. JavaScript syntax validation: **PASSED**
2. HTML structure validation: **PASSED**
3. Full workflow test: **PASSED**
4. Canvas simulation animation: **PASSED**
5. Back/Next navigation: **PASSED**
6. Conclusion textarea: **PASSED**
7. Edge case — double-click: **PASSED**
8. Edge case — back navigation: **PASSED**
9. No browser console errors observed.

### M2 Tests
1. JavaScript syntax validation: **PASSED** (Node.js `new Function()` parse)
2. HTML structure validation: **PASSED** (feedback-area, canvas, userInput present)
3. CSS class completeness: **PASSED** (all 13 new classes present)
4. Structural integrity: **PASSED** (22/22 checks passed)
5. Practical selection: **PASSED**
6. Objective display: **PASSED** (exact FBISE title, SLO C-09-F-17)
7. Apparatus display: **PASSED** (6 items, 2 materials)
8. Prepare stage — pencil/pen teaching: **PASSED**
9. Baseline drawing interaction: **PASSED** (click on paper)
10. Sample application interaction: **PASSED** (click on baseline)
11. Setup stage — solvent slider: **PASSED**
12. Setup verification — Check Setup button: **PASSED**
13. Setup feedback — solvent above/below baseline: **PASSED**
14. Run stage — Start button: **PASSED**
15. Chromatography animation: **PASSED** (two components separate)
16. Two-component demonstration: **PASSED** (Component A red, Component B blue)
17. Mark solvent front interaction: **PASSED** (click on paper)
18. Measurement — click baseline: **PASSED**
19. Measurement — click solvent front: **PASSED**
20. Measurement — click spots: **PASSED**
21. Rf calculation — student entry: **PASSED**
22. Rf check — feedback: **PASSED**
23. Interpretation textarea: **PASSED**
24. Conclusion textarea: **PASSED**
25. Complete summary: **PASSED** (shows all measurements, Rf values)
26. Back/Next navigation: **PASSED** (state preserved)
27. Conditional Next button: **PASSED** (disabled until action done)
28. No browser console errors: **PASSED**

### Known Limitations
- Two practicals implemented (M3 scope).
- No experiment log persistence (Milestone 9).
- No PBA practice mode (Milestone 8).
- No Mystery Lab (Milestone 7).
- Simulated values are fixed, not randomised.
- Canvas measurement is approximate (click-based).

### Chemistry Accuracy
- A1 title matches PROJECT_SPEC §4.A1 exactly.
- A1 SLOs: C-09-F-12, C-09-F-13.
- A2 title matches PROJECT_SPEC §4.A2 exactly.
- A2 SLO: C-09-F-17.
- Two-component model-paper scenario implemented for A2.
- Two-fraction distillation implemented for A1.
- Pencil vs pen teaching included for A2.
- Solvent below baseline condition enforced for A2.
- Rf formula is chemically correct.
- All simulated values clearly labelled as simulated educational values.
- No FBISE measurements were invented.
- No SLO mapping expanded beyond source.

## Bug Fix Session — 2026-09-17

### Bugs Fixed

#### Bug 1 — A2 Solvent-Level Validation Reversed
- **Location:** `checkSetup()` function (line ~1678)
- **Problem:** The condition `solventLevel < g.baseAbsY` was inverted. In canvas coordinates, Y increases downward, so `solventLevel < baseAbsY` means the solvent appears ABOVE the baseline (invalid). The code incorrectly set `"setup_ok"` for this invalid state.
- **Fix:** Changed condition to `solventLevel > g.baseAbsY` so that solvent below baseline = pass, solvent above baseline = fail. Also reset `state.paperInBeaker = false` on failure.

#### Bug 2 — A2 Solvent Slider Default Position
- **Location:** `renderSetupContent()` (line ~836)
- **Problem:** Default slider value was `50`, which placed solvent below baseline at startup. Students could pass setup without adjusting anything.
- **Fix:** Changed default to `"80"` (solvent above baseline = invalid). Positioned value changed to `"20"` (below baseline = valid). Students must now actively adjust slider to pass.

#### Bug 3 — A1 No Finish Button at Conclude Stage
- **Location:** `renderConcludeDistillContent()` (line ~770), `renderDistillButtons()` (line ~1000)
- **Problem:** A1 fractional distillation had no explicit Finish/Complete button at the conclude stage, preventing students from reaching the `complete` stage.
- **Fix:** Added "Finish Experiment" button to conclude stage. Added click handler in `onUserInputClick()`. Hid the regular Next button on conclude stage (replaced by Finish button).

### Regression Tests

- 32 tests performed: 18 A2, 10 A1, 4 bug fix verification
- All 32 tests **PASSED**
- JavaScript syntax validation: **PASSED**
- No existing functionality was broken
- All SLO mappings preserved (C-09-F-12, C-09-F-13, C-09-F-17)
- All experiment titles preserved exactly
- No frameworks or dependencies introduced

### Files Modified
- `script.js` — 4 edits (checkSetup validation, renderSetupContent slider default, drawSetupSolvent visual, renderConcludeDistillContent + onUserInputClick + renderDistillButtons)

## Milestone 4 — NaOH Molarity by Titration

### Date: 2026-09-17

### Experiment Identity
- **id:** A4
- **title:** Determine the exact molarity of the NaOH solution Volumetrically
- **section:** Major Practical
- **SLOs:** C-10-B-13, C-09-F-04, C-09-F-09

### Source-Backed Elements
- Exact practical title: from FBISE PDF
- Major Practical classification: from FBISE PDF
- SLOs: exact from FBISE PDF
- C-10-B-13: Calculate concentration of a solution in a titration using empirical data
- C-09-F-04: Justify why chemists use cm³, g and s as practical units
- C-09-F-09: Identify appropriate apparatus including burettes and volumetric pipettes

### ChemSim Simulation Choices (Not from FBISE)
- Reaction model: NaOH + HCl → NaCl + H₂O (1:1 ratio)
- Titrant: HCl 0.1000 mol/L
- Indicator: Phenolphthalein
- Endpoint: pink → colourless
- Simulated titre values: 23.50, 23.40, 23.45 mL
- Mean titre: 23.45 mL
- Expected NaOH molarity: 0.0938 mol/L
- All numerical values labelled as simulated educational values

### Workflow (13 stages)
SELECT → OBJECTIVE → APPARATUS → PREPARE → FILL BURETTE → MEASURE SAMPLE → TITRATE → ENDPOINT → RECORD → CALCULATE → INTERPRET → CONCLUDE → COMPLETE

### Interactions Implemented
1. Apparatus identification quiz (burette vs pipette)
2. Fill burette (canvas click)
3. Measure sample (canvas click)
4. Interactive titration with stopcock slider
5. Flask colour change (pink → colourless)
6. Endpoint detection
7. Record titre
8. Calculation with student input and validation
9. Interpretation textarea
10. Conclusion textarea
11. Finish Experiment → return to practical selection

### Calculation Model
- M(NaOH) × V(NaOH) = M(HCl) × V(HCl)
- M(NaOH) = [M(HCl) × V(HCl)] / V(NaOH)
- Tolerance: ±0.002 mol/L

### Canvas Drawing
- Burette with scale markings and liquid level
- Conical flask with colour-changing solution
- Stand and clamp
- Volume delivered display
- Endpoint status indicator

### Files Modified
- `script.js` — A4 experiment definition, SIMULATION_CONFIG, state variables, stage renderers, user input, button logic, canvas drawing, event handlers, reset logic, select screen

### Regression Tests
- 64 tests performed (47 A4, 10 regression, 7 technical)
- 61/64 passed (3 false negatives from test search scope — all 3 Finish buttons verified present)
- A1 regression: PASS
- A2 regression: PASS
- JavaScript syntax: VALID
- No existing functionality broken

## Milestone 5 — A3 Pb²⁺/Cd²⁺ Paper Chromatography

### Date: 2026-09-17

### Experiment Identity
- **id:** A3
- **title:** Separate Pb²⁺ and Cd²⁺ ions by paper chromatography
- **section:** major
- **SLOs:** C-09-F-18, C-09-F-19, C-09-F-20

### Source-Backed Elements
- Exact practical title: from FBISE PDF
- Major Practical classification: from FBISE PDF
- SLOs: exact from FBISE PDF
- C-09-F-18, C-09-F-19, C-09-F-20: chromatography-related SLOs from FBISE PBA framework

### ChemSim Simulation Choices (Not from FBISE)
- Paper dimensions: 160 x 420 px (same as A2)
- Solvent front max distance: 330 simulated units
- Animation duration: 4500 ms
- Pb²⁺ component: color #b8860b (dark goldenrod), relativeRate 0.82
- Cd²⁺ component: color #cc44cc (orchid), relativeRate 0.55
- All values labelled as simulated educational values

### Workflow (15 stages)
SELECT → OBJECTIVE → APPARATUS → PREPARE → BASELINE → SAMPLE → SETUP → RUN → OBSERVE → MARK FRONT → MEASURE → CALCULATE → INTERPRET → CONCLUDE → COMPLETE

### Implementation Approach
A3 reuses the existing chromatography engine from A2. All rendering functions (`renderPrepareChromContent`, `renderBaselineContent`, etc.) are experiment-aware via `SIMULATION_CONFIG[exp.id]`. A3 is a separate experiment configuration that shares the same engine code.

### Interactions Implemented
1. Paper preparation (pencil vs pen teaching) — reused from A2
2. Baseline drawing on canvas — reused from A2
3. Sample application on baseline — reused from A2
4. Solvent setup with slider and verification — reused from A2
5. Chromatography simulation with animated solvent front — reused from A2
6. Solvent front marking — reused from A2
7. Interactive measurement (click baseline, solvent front, spots) — reused from A2
8. Rf calculation with student input and validation — reused from A2
9. Interpretation textarea
10. Conclusion textarea
11. Finish Experiment → return to practical selection

### Rf Calculation Model
- Rf = Distance traveled by component / Distance traveled by solvent front
- Both component distances use the same simulated max distance as A2
- Rf values are dimensionless, range 0–1
- Count-based validation (all components required)

### Files Modified
- `script.js` — A3 experiment definition, SIMULATION_CONFIG entry, 10 conditional checks updated to include A3 alongside A2, select screen updated

### Regression Tests
- 94 tests performed (72 A3, 15 regression, 7 technical)
- 94/94 passed
- A1 regression: PASS
- A2 regression: PASS
- A4 regression: PASS
- JavaScript syntax: VALID
- No existing functionality broken

## Next Action

Await user review of M5 implementation.

After approval:
1. Proceed to Milestone 6 — additional practicals or features as specified.

## Milestone 6 — A5 Gas Detection (NH₃, CO₂, Cl₂)

### Date: 2026-09-17

### Experiment Identity
- **id:** A5
- **title:** Detection and confirmation of gases: NH₃, CO₂, Cl₂
- **section:** Major Practical
- **SLOs:** C-09-F-15, C-09-10-G-10

### Source-Backed Elements
- Exact practical title: from FBISE PDF
- Major Practical classification: from FBISE PDF
- SLOs: exact from FBISE PDF
- Three prescribed gases: NH₃, CO₂, Cl₂
- Three prescribed tests: damp red litmus, limewater, damp litmus

### ChemSim Simulation Choices (Not from FBISE)
- NH₃ observed change: "Red litmus turns blue" (standard chemistry knowledge)
- CO₂ observed change: "Limewater turns milky/cloudy" (standard chemistry knowledge)
- Cl₂ observed change: "Litmus is bleached white" (standard chemistry knowledge)
- NH₃ colour: #3366cc (visual distinction)
- CO₂ colour: #cccccc (visual distinction)
- Cl₂ colour: #88cc44 (visual distinction)
- Test tube canvas visualization (2500 ms animation)
- All values labelled as simulated educational values

### Workflow (15 stages)
SELECT → OBJECTIVE → APPARATUS → PREPARE → SELECT GAS → SELECT TEST → PERFORM TEST → OBSERVE → RECORD → INTERPRET → CONFIRM → NEXT GAS → SUMMARY → CONCLUDE → COMPLETE → Finish Experiment

### Implementation Approach
A5 is a new experiment type (gas detection) that doesn't reuse A2/A3's chromatography engine or A4's titration engine. It has its own:
- Multi-gas state tracking (gasCurrentIndex, gasResults, gasTestPerformed, gasTestObserved)
- Gas selection workflow (selectGas → selectTest → performTest → observe → record → interpret → confirm → nextGas)
- Count-based validation (all 3 gases must be confirmed before conclude)
- Summary screen with table showing all 3 gases
- Canvas drawing for test tube visualization

### Interactions Implemented
1. Gas selection (choose from NH₃, CO₂, Cl₂)
2. Test selection (choose correct test for each gas)
3. Perform virtual test (animated canvas with test tube)
4. Observe simulated evidence
5. Record observation (textarea, required)
6. Interpret evidence (textarea, required)
7. Confirm gas identity (button)
8. View summary of all 3 gases
9. Write conclusion (textarea, required)
10. Complete with Finish Experiment

### Validation Model
- All 3 gases must be confirmed (NH₃ + CO₂ + Cl₂)
- Conclusion must be entered
- Both conditions required before COMPLETE
- Uses `allGasesConfirmed()` function with loop-based validation (not `.some()`)

### COMPLETE / Finish
- COMPLETE screen shows final summary with all observations, interpretations, and confirmations
- Finish Experiment button returns to practical selection
- No page reload, no auto-launch

### Files Modified
- `script.js` — A5 experiment definition, SIMULATION_CONFIG, state variables, 12+ engine integration updates, 12 stage renderers, helper functions, canvas drawing, event handlers, select screen

### Regression Tests
- 109 tests performed (90 A5, 12 regression, 7 technical)
- 109/109 passed
- A1 regression: PASS
- A2 regression: PASS
- A3 regression: PASS
- A4 regression: PASS
- JavaScript syntax: VALID
- No existing functionality broken

## Next Action

Await user review of M7 implementation.

After approval:
1. Proceed to Milestone 8 — further practicals or features as specified.

---

## Milestone 7 — 8 Minor Practicals (M7.1–M7.8)

**Status:** IMPLEMENTED / TESTED / AWAITING REVIEW

**Date:** 2026-09-18

### Summary

Implemented all 8 Minor Practicals from the FBISE prescribed list:

| ID | Practical | SLOs |
|----|-----------|------|
| M7_1 | Separate naphthalene/sand/salt by sublimation | C-10-B-08, C-09-10-G-13 |
| M7_2 | Identify Na⁺, K⁺, Ca²⁺, Cu²⁺, Ba²⁺ by flame test | C-09-F-16 |
| M7_3 | Prepare CuSO₄·5H₂O crystals | C-09-F-12, C-09-F-11 |
| M7_4 | Determine melting point of Naphthalene | C-09-F-14 |
| M7_5 | Determine boiling point of Ethyl Alcohol | C-09-F-14 |
| M7_6 | Demonstrate metal displacement reaction | C-09-G-12 |
| M7_7 | Investigate water test using anhydrous CuSO₄ | C-09-10-G-12, C-09-D-12 |
| M7_8 | Test purity of water (MP + BP) | C-09-D-13, C-09-D-14, C-09-F-14 |

### What was built

- 8 EXPERIMENTS entries with authoritative FBISE data (titles, sections, SLOs, objectives, apparatus, materials, procedures, stages)
- 8 SIMULATION_CONFIG entries (all labelled SIMULATED EDUCATIONAL VALUES)
- 4 new state variables: m7_ionIndex, m7_ionResults, m7ActionDone, m7ObservationDone
- ~20 new renderers (M7ObserveContent, M7RecordContent, M7InterpretContent, M7ConcludeContent, M7CompleteContent, M7HeatContent, M7CollectContent, M7SelectIonContent, M7IdentifyContent, M7NextIonContent, M7DissolveContent, M7ConcentrateContent, M7CrystallizeContent, M7MonitorContent, M7SelectMaterialsContent, M7PerformReactionContent, M7SelectSampleContent, M7MPTestContent, M7RecordMPContent, M7BPTestContent, M7RecordBPContent)
- M7 canvas drawing, user input, buttons
- M7 event handlers (btn-m7-start, btn-m7-confirm-ion, btn-m7-record, btn-m7-interpret, data-ion click)
- M7_2 count-based validation (5 ions) and M7_8 dual-test validation (MP + BP)
- Summary stage for M7_2 (ion table) and generic M7
- Helper functions: isM7, m7AllDone, m7_5ionAllDone

### Engine wiring

- renderStageContent: 15 new case statements + 5 existing cases updated with M7 dispatch
- getSimStages: 8 new experiment entries
- renderUserInput: M7 dispatch added
- drawCanvas: M7 dispatch added
- renderButtons: M7 dispatch added
- onBtnNext: M7 simulation block added
- resetExperimentState: M7 state reset added
- renderSelectContent: Minor Practicals section added
- renderSummaryContent: M7_2 and generic M7 handling added

### Files modified

- `script.js` — all M7 additions (EXPERIMENTS, SIMULATION_CONFIG, state, renderers, engine wiring, event handlers)

### Regression Tests

- 204 tests performed (95 M7 identity/data, 30 M7 simulation config, 4 M7 state, 30 M7 engine integration, 32 M7 engine wiring, 9 M7 event handlers, 9 M7 select screen, 4 M7 summary, 6 M7 data completeness, 4 M7 canvas, 3 M7 complete, 6 M7 validation, 19 regression, 7 technical)
- 204/204 passed
- A1 regression: PASS
- A2 regression: PASS
- A3 regression: PASS
- A4 regression: PASS
- A5 regression: PASS
- JavaScript syntax: VALID
- No existing functionality broken

---

## Milestone 8 — PBA Practice Mode

**Status:** IMPLEMENTED / TESTED / AWAITING REVIEW

**Date:** 2026-09-18

### Summary

Implemented PBA Practice Mode — a practical-performance assessment simulation mirroring the FBISE SSC Chemistry PBA paper structure:

| Section | Type | Questions | Marks Each | Total |
|---------|------|-----------|------------|-------|
| A | Major | 2 | 6 | 12 |
| B | Minor | 2 | 4 | 8 |
| Total | — | 4 | — | 20 |

Duration: 2 hours (tracked with elapsed timer).

### What was built

#### Question Bank (PBA_QUESTIONS)
- 13 questions total: 5 Major (A1–A5) + 8 Minor (M7.1–M7.8)
- Each question has multi-part components with rubric scoring
- Question types: selection, calculation, ordering, multi_part, multi_selection
- All labelled "ChemSim Practice Question"

#### Session Engine
- `pbaGenerateSession()` — shuffles and selects 2 Major + 2 Minor (or Major/Minor only modes)
- `pbaShuffle()` — Fisher-Yates shuffle
- `pbaScoreQuestion()` — per-question scoring with tolerance for calculations, array comparison for ordering, set comparison for multi-selection
- `pbaScoreAll()` — full session scoring
- `pbaGetAllQuestions()` / `pbaGetCurrentQuestion()` — question accessors
- `pbaGetMajorTotal()` / `pbaGetMinorTotal()` / `pbaGetSectionScore()` — score aggregation
- `pbaIsUnanswered()` — validation check
- `pbaFormatTime()` — HH:MM:SS elapsed timer formatting

#### UI Screens
- Main menu with Practical Lab and PBA Practice entry points
- Mode selection: Full PBA, Major Only, Minor Only
- Progress bar with section/marks/timer display
- Question renderer with per-component scoring, instructions, data tables
- Review-before-submit screen with unanswered-question detection
- Final result with Section A, Section B, TOTAL (/20), percentage, time taken
- Question-by-question performance table
- Skill Breakdown table (apparatus, observation, calculation, interpretation)
- Result review navigation (go back to result from review)

#### Navigation Integration
- `renderCurrentStage()` dispatches to `renderPBAStage()` when `appMode === "pba"`
- Sidebar hidden in PBA mode, restored in lab mode
- `onBtnNext`/`onBtnBack` handle PBA navigation
- `onStageContentClick` handles PBA entry from lab select screen
- `onPBAClick` handles all PBA button interactions
- `onPBAInput` handles calculation input changes

#### CSS
- `.pba-question`, `.pba-part`, `.pba-review`, `.pba-result`, `.pba-calc-input` styles

### Files modified

- `script.js` — PBA_QUESTIONS array, PBA state variables, session engine functions, 9 renderers, 2 event handlers, navigation wiring
- `style.css` — PBA-specific styles

### Regression Tests

- 153 tests performed (24 question bank, 7 state variables, 23 session engine, 24 renderers, 17 event handlers, 11 navigation integration, 6 scoring, 4 timer, 5 CSS, 4 structure, 4 question selection, 16 regression [A1–A5, M7.1–M7.8], 6 technical)
- 153/153 passed
- A1 regression: PASS
- A2 regression: PASS
- A3 regression: PASS
- A4 regression: PASS
- A5 regression: PASS
- M7.1–M7.8 regression: PASS
- JavaScript syntax: VALID
- No React/Vue/Angular: CONFIRMED
- SIMULATED educational values: PRESENT
- 13 EXPERIMENTS / 13 SIMULATION_CONFIG / 13 PBA_QUESTIONS: VERIFIED

---

## Milestone 9 — Mystery Lab (Unknown Sample Identification)

**Status:** IMPLEMENTED / TESTED / AWAITING REVIEW

**Date:** 2026-09-18

### Summary

Implemented Mystery Lab — an exploratory unknown sample identification mode where students investigate an unknown substance using virtual tests, collect evidence, form hypotheses, and identify the sample.

**Label:** ChemSim Mystery Lab — Educational Simulation (not an official FBISE practical)

### Sample Pool (6 unknowns)

| Sample ID | Identity | Formula | Category | Diagnostic Test(s) |
|-----------|----------|---------|----------|---------------------|
| MX-01 | Distilled Water | H₂O | liquid | Boiling Point, Water Test |
| MX-02 | Sodium Chloride Solution | NaCl (aq) | liquid | Flame Test |
| MX-03 | Copper Sulphate Solution | CuSO₄ (aq) | liquid | Flame Test |
| MX-04 | Ethyl Alcohol | C₂H₅OH | liquid | Boiling Point, Water Test |
| MX-05 | Naphthalene | C₁₀H₈ | solid | Melting Point, Flame Test |
| MX-06 | Dilute Hydrochloric Acid | HCl (aq) | liquid | Litmus Test |

### Test Pool (5 tests)

| Test ID | Name | Applies To | Source |
|---------|------|-----------|--------|
| flame | Flame Test | liquid, solid | ChemSim educational choice (based on M7.2) |
| water_test | Water Test | liquid | Source-backed: M7.7 |
| litmus | Litmus Test | liquid | ChemSim educational choice |
| melting_point | Melting Point | solid | Source-backed: M7.4 |
| boiling_point | Boiling Point | liquid | Source-backed: M7.5 |

### Evidence Model

Each sample has a deterministic evidence model: `sample → test → observation + interpretation`. Every sample has at least 1 diagnostic test. All 6 samples are distinguishable.

### Investigation Flow

```
Menu → Intro → Investigation → Test Execute → Observe → Record → Back to Investigation → (repeat) → Identify → Submit → (correct: Complete | incorrect: back to Investigation) → Finish
```

### Identification Validation

- Correct: shows "Identification Confirmed", proceeds to COMPLETE
- Incorrect: shows "Identification not confirmed", returns to investigation loop
- Empty guess: blocked with feedback message

### Conclusion

Required before completion. Student writes an evidence-based conclusion connecting test evidence, interpretation, and final identification.

### Evidence Quality

- None: 0 tests performed
- Some: tests performed but none diagnostic
- Sufficient: at least 1 diagnostic test performed

### Scoring

Descriptive feedback (not numerical PBA scoring):
- Tests performed
- Useful diagnostic tests
- Identification result
- Conclusion quality
- Evidence quality level

### COMPLETE/Finish

- COMPLETE shows investigation summary, evidence, hypothesis, feedback
- "Finish Mystery Lab" returns to main menu
- No page reload, no auto-start of new mystery, no M10 jump

### Navigation

- Main menu: Practical Lab | PBA Practice | Mystery Lab
- Lab select screen: also has Mystery Lab entry point
- Sidebar hidden in Mystery Lab mode
- Back button returns to investigation from identify/conclusion screens

### Files Modified

- `script.js` — MYSTERY_TESTS (5), MYSTERY_SAMPLES (6), M9 state, 13 engine functions, 11 renderers, 1 stage router, event handlers, navigation wiring
- `style.css` — M9-specific styles (mystery-panel, sample-card, test-btn, evidence-entry, textarea, complete, feedback)

### Source Discipline

| Sample | Source-backed | Educational Choice |
|--------|--------------|-------------------|
| MX-01 Water | Water test (M7.7), BP (M7.5) | Litmus neutrality |
| MX-02 NaCl | Flame test Na⁺ (M7.2) | BP elevation |
| MX-03 CuSO₄ | Flame test Cu²⁺ (M7.2) | Slightly acidic |
| MX-04 Ethanol | BP 78°C (M7.5), Water test (M7.7) | Organic flame |
| MX-05 Naphthalene | MP 80°C (M7.4) | Sooty flame |
| MX-06 HCl | Litmus acidity | BP azeotrope |

### Regression Tests

- 161 M9 tests performed
- 161/161 passed
- 153 M8 regression tests: 153/153 passed
- A1–A5 regression: ALL PASS
- M7.1–M7.8 regression: ALL PASS
- JavaScript syntax: VALID
- No React/Vue/Angular: CONFIRMED
- SIMULATED educational values: PRESENT

---

## Milestone 10 — Experiment Log

**Status:** IMPLEMENTED / TESTED / AWAITING REVIEW

**Date:** 2026-09-18

### Summary

Implemented a persistent-in-browser Experiment Log for ChemSim. Students can record and review their completed practical investigations and Mystery Lab investigations. Records are stored in localStorage under the key `chemsim_experiment_log`.

**Label:** ChemSim Experiment Log — Educational Simulation (not an official FBISE assessment component)

### Storage Architecture

- **Key:** `chemsim_experiment_log` (namespaced, no collision with other data)
- **Format:** JSON array of record objects
- **Persistence:** localStorage (browser-local only)
- **Safety:** Defensive handling for missing storage, malformed JSON, non-array values, write failures
- **Graceful degradation:** App remains usable if localStorage is unavailable

### Record Model

**Practical records:**
```javascript
{
  id, experimentId, title, section, type: "practical",
  date, time, slos, objective, apparatus, materials, procedure,
  observations, measurements, calculations, result, conclusion,
  sourceLabel, simulatedNotice
}
```

**Mystery Lab records:**
```javascript
{
  id, experimentId: "mystery", title: "Mystery Lab Investigation",
  section: "investigation", type: "mystery",
  date, time, sampleId, sampleIdentity, testsPerformed, evidence,
  hypothesis, identification, identified, conclusion,
  sourceLabel, simulatedNotice
}
```

### Navigation

Main menu: Practical Lab | PBA Practice | Mystery Lab | **Experiment Log**

Log screens:
- Menu (entry point with record count)
- List (record cards with View/Delete + Clear All)
- Detail (full record display with Delete + Back)

### Practical Integration

Records are created automatically when the student clicks "Finish Experiment" on the COMPLETE stage. Each Finish action creates exactly one record. Rendering does not create records. Revisiting COMPLETE does not silently duplicate.

Supported practicals: A1–A5, M7.1–M7.8 (all 13 existing experiments).

### Mystery Lab Integration

**Integrated cleanly.** When the student clicks "Finish Mystery Lab" on the COMPLETE stage, a `type: "mystery"` record is created with sample ID, evidence, hypothesis, identification, and conclusion. Clearly labelled as "Mystery Lab Investigation" — distinct from prescribed practical records.

### PBA Practice

**Unchanged.** PBA Practice attempts are not turned into Experiment Log records. PBA remains an assessment/practice mode.

### Deletion

- **Individual delete:** Each record has a Delete button (in list and detail views)
- **Clear All:** Requires explicit `confirm()` dialog before deletion
- **Safe:** Deleting records does not affect experiment engine state

### Accessibility

- All buttons keyboard accessible
- Semantic HTML headings
- Labels for controls
- Responsive layout
- No canvas-only interactions

### Files Modified

- `script.js` — M10 state variables, storage layer (6 functions), record builders (3 functions), 3 renderers, stage router, event handler, 2 log creation hooks, navigation wiring
- `style.css` — M10-specific styles (log-panel, log-empty, log-card, log-badge, log-detail-meta, log-detail-section, log-evidence-entry, log-sim-notice)

### Regression Tests

- 139 M10 tests performed: 139/139 passed
- 153 M8 regression: 153/153 passed
- 161 M9 regression: 161/161 passed
- A1–A5 regression: ALL PASS
- M7.1–M7.8 regression: ALL PASS
- JavaScript syntax: VALID
- No React/Vue/Angular: CONFIRMED
- SIMULATED educational values: PRESENT

---

## Milestone 11 — Learning & Revision Hub

### What Changed

Added a 5th main menu mode: **Learning & Revision Hub** — a browsing/review interface for all 13 prescribed practicals.

### Features

- **Main menu button:** "Learning & Revision" (teal, #00695c) added as 5th option
- **Lab select screen:** Added "Learning & Revision" button alongside "Experiment Log"
- **Revision mode (`appMode: "revision"`):** Separate state variables (`revisionScreen`, `revisionFilter`, `revisionSearch`, `revisionSelectedId`)
- **List view:** Filter by All/Major/Minor + live search by title, SLO, or keyword; card-based display with section badge and SLOs
- **Detail view:** Full practical reference showing title, SLOs, objective, apparatus, materials, procedure, observations, calculations, result, conclusion, and simulation notice
- **Start Practical:** Button launches the selected experiment through the existing lab nav engine
- **Navigation:** Back buttons return to list; Next/Back buttons correctly ignored in revision mode

### State Variables Added

- `revisionScreen` — `"list"` | `"browsing"` | `"detail"`
- `revisionFilter` — `"all"` | `"major"` | `"minor"`
- `revisionSearch` — string for live search
- `revisionSelectedId` — currently viewed experiment id

### Functions Added

- `revGetFilteredPracticals()` — filters and searches EXPERIMENTS array
- `revGetExpById(id)` — finds experiment by id
- `renderRevisionMenu()` — main menu landing
- `renderRevisionList()` — browsable list with search and filters
- `renderRevisionDetail()` — full practical detail
- `renderRevisionStage()` — stage router for revision mode
- `onRevisionClick(e)` — event handler for all revision interactions

### Navigation Wiring

- `onPBAClick`: handles `btn-enter-revision`
- `onStageContentClick`: handles `btn-enter-revision-from-lab`
- `onBtnNext`: ignores revision mode
- `onBtnBack`: returns revision detail to browsing
- `renderCurrentStage`: routes `appMode === "revision"` to `renderRevisionStage()`

### Files Modified

- `script.js` — M11 state variables, 7 functions, navigation wiring in 5 existing functions, 5th main menu button
- `style.css` — M11 styles (rev-panel, rev-search-bar, rev-search-input, rev-filters, rev-filter-btn, rev-list, rev-card, rev-badge, rev-empty, rev-section, rev-sim-notice)

### Data Source

All practical data read directly from existing `EXPERIMENTS` array — no duplication.

### Tests Performed

- 98 M11 tests: 98/98 passed
- 139 M10 regression: 139/139 passed
- 161 M9 regression: 161/161 passed
- 153 M8 regression: 153/153 passed
- A1–A5 regression: ALL PASS
- M7.1–M7.8 regression: ALL PASS
- JavaScript syntax: VALID
- No React/Vue/Angular: CONFIRMED
- SIMULATED educational values: PRESENT

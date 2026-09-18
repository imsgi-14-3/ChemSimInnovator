# PROJECT_SPEC.md
# ChemSim — Interactive Virtual Chemistry Laboratory

## 1. Project Purpose

ChemSim is an interactive virtual chemistry laboratory designed for Grade 9/10 students and a Science Innovator Club competition.

Its central purpose is to transform the prescribed FBISE SSC Chemistry Practical Based Assessment content into an engaging, interactive educational laboratory.

The application should combine:
- realistic laboratory concepts,
- modern educational interaction,
- clear student guidance,
- simulation of apparatus and chemical behavior,
- practical observation,
- measurement/data handling,
- calculation,
- evidence-based conclusions,
- PBA preparation.

ChemSim is an educational simulation and does not replace supervised physical laboratory work.

## 2. Authoritative Source

The authoritative source for the PBA practical scope is:

`Final Chemistry PBA SSC Merged.pdf`

This document is the source of truth for:
- prescribed practical titles,
- Major/Minor classification,
- SLO mappings,
- PBA structure,
- model-paper assessment patterns.

Do not replace its practical list with another chemistry practical list.

The framework covers implementation from Annual Examinations 2026 onwards and is based on the National Curriculum of Pakistan 2022–23 and Scheme of Studies 2006.

## 3. FBISE PBA Structure

According to the authoritative PDF:

### Section A — Major Practicals
- 2 questions × 6 marks = 12 marks
- 60%

### Section B — Minor Practicals
- 2 questions × 4 marks = 8 marks
- 40%

Total:
- 20 marks
- 2 hours

The framework indicates that questions may assess performance, calculation, procedure, and observations.

Notebook/viva marks are not part of the PBA allocation.

MCQs are not assessed in the PBA paper.

## 4. Prescribed Major Practicals

### A1
Separation of mixture of water and alcohols by fractional distillation

SLOs:
- C-09-F-12
- C-09-F-13

ChemSim capabilities:
- apparatus recognition,
- apparatus setup,
- controlled simulated heating,
- temperature observation,
- vapor/condensation visualization,
- collection of distillate,
- interpretation,
- conclusion.

PBA focus:
- apparatus labeling,
- purpose of apparatus components,
- which liquid vaporizes first and why,
- approximately 78°C interpretation,
- confirming the distillate,
- controlled heating.

### A2
Separate given mixture of inks by paper chromatography

SLO:
- C-09-F-17

ChemSim capabilities:
- prepare chromatography paper,
- baseline,
- sample spotting,
- solvent setup,
- simulated solvent movement,
- component separation,
- observation,
- distance measurement,
- Rf calculation,
- conclusion.

PBA focus:
- baseline,
- pencil use,
- sample placement,
- solvent setup,
- completion/removal,
- composition conclusion,
- Rf.

### A3
Separate the Pb²⁺ and Cd²⁺ ions by paper chromatography

SLOs:
- C-09-F-18
- C-09-F-19
- C-09-F-20

ChemSim capabilities:
- chromatogram interpretation,
- locating-agent concept,
- known/unknown comparison,
- substance identification,
- Rf-related analysis.

PBA focus:
- locating agents,
- interpretation,
- comparison,
- identification,
- relevant calculations.

This practical is a strong candidate for Mystery Lab integration.

### A4
Determine the exact molarity of the NaOH solution Volumetrically

SLOs:
- C-10-B-13
- C-09-F-04
- C-09-F-09

ChemSim capabilities:
- apparatus selection,
- simulated measurement,
- titration workflow,
- reading data,
- repeated readings where appropriate,
- concentration calculation,
- result and conclusion.

PBA focus:
- empirical data,
- measurement apparatus,
- concentration determination,
- appropriate units and interpretation.

### A5
Detection and confirmation of gases:

a. Ammonia, NH₃, using damp red litmus paper
b. Carbon dioxide, CO₂, using limewater
c. Chlorine, Cl₂, using damp litmus paper

SLOs:
- C-09-F-15
- C-09-10-G-10

ChemSim capabilities:
- choose a test,
- perform simulated test,
- observe evidence,
- record evidence,
- identify gas,
- conclude.

Important:
The prescribed practical explicitly lists NH3, CO2, and Cl2. Do not silently expand the practical list to other gases.

## 5. Prescribed Minor Practicals

### B1
Separate naphthalene from the given mixture of sand and salt by sublimation

SLOs:
- C-10-B-08
- C-09-10-G-13

ChemSim:
- separation-method selection,
- simulated setup,
- simulated process,
- observation,
- conclusion.

Preserve the exact source wording for the practical title.

### B2
Identify following metal ions by flame test (Na⁺, K⁺, Ca²⁺, Cu²⁺, Ba²⁺)

SLO:
- C-09-F-16

ChemSim:
- simulated wire-cleaning step,
- sample testing,
- flame observation,
- ion identification.

PBA focus:
- cleaning wire,
- holding wire correctly,
- interpreting flame colour,
- identification.

### B3
Prepare pure crystals of CuSO₄·5H₂O

SLOs:
- C-09-F-12
- C-09-F-11

ChemSim:
- solution/crystallization concept,
- simulated preparation,
- cooling,
- crystal formation,
- observation,
- conclusion.

### B4
Determine the melting point of Naphthalene

SLO:
- C-09-F-14

ChemSim:
- simulated temperature observation,
- state-change recognition,
- melting-point interpretation,
- purity reasoning.

### B5
Determine the boiling point of Ethyl Alcohol

SLO:
- C-09-F-14

ChemSim:
- simulated heating/temperature observation,
- repeated measurement,
- data recording,
- accuracy/precision interpretation.

PBA focus:
- boiling point,
- accuracy,
- precision.

### B6
Demonstrate a metal displacement reaction in aqueous medium

SLO:
- C-09-G-12

ChemSim:
- select metal/solution scenario,
- simulated interaction,
- observation,
- displacement interpretation,
- conclusion.

The model paper includes the zinc + copper(II) sulfate scenario.

### B7
Investigate chemical tests for the presence of water using anhydrous copper(II) sulfate

SLOs:
- C-09-10-G-12
- C-09-D-12

ChemSim:
- select test,
- simulated evidence,
- record observation,
- conclusion.

### B8
Test the purity of water using melting point and boiling point

SLOs:
- C-09-D-13
- C-09-D-14
- C-09-F-14

ChemSim:
- sample comparison,
- melting-point data,
- boiling-point data,
- interpretation,
- purity conclusion.

This is a high-value PBA simulation because the model paper uses comparative melting/boiling-point data.

## 6. General SLO Coverage

The source notes:
- C-09-10-G-06 to C-09-10-G-09 are valid for all experiments.
- C-09-10-G-10 and C-09-10-G-14 to C-09-10-G-20 apply where relevant.

Do not assign these to an experiment unless their applicability is supported by the source.

## 7. Core Product Modules

Long-term navigation:

- Home
- Virtual Lab
- Experiments
- Mystery Lab
- PBA Practice
- Experiment Log
- About

Do not implement all modules in one milestone.

## 8. Core Experiment Workflow

ChemSim should be based on a reusable experiment workflow:

Select Practical
↓
Objective
↓
Prepare Apparatus
↓
Select/Measure Materials
↓
Perform Procedure
↓
Observe
↓
Record Data
↓
Calculate / Analyze
↓
Conclusion
↓
Assessment

Not every practical needs every stage.

Examples:

Chromatography:
Setup → Run → Observe → Measure → Calculate → Conclusion

Titration:
Setup → Measure → Titrate → Read → Calculate → Conclusion

Flame test:
Setup → Test → Observe → Identify → Conclusion

## 9. Experiment Data Model

Conceptual structure:

{
  id: "...",
  title: "...",
  section: "major|minor",
  slos: [],
  objective: "...",
  apparatus: [],
  materials: [],
  procedure: [],
  variables: {},
  observations: {},
  calculations: {},
  result: {},
  conclusion: {},
  assessment: [],
  simulation: {}
}

Chemistry/practical data should be separated from presentation/UI logic as the application grows.

## 10. Experiment Log

Initial log fields:

- experiment ID
- experiment title
- date
- time
- hypothesis
- apparatus
- materials
- procedure
- observations
- measurements
- calculations
- result
- conclusion

Initial implementation should prefer browser-local storage rather than a database.

## 11. Hypothesis / Evidence Model

For investigations and Mystery Lab:

Unknown/sample
↓
Choose test
↓
Observe evidence
↓
Record evidence
↓
Form hypothesis
↓
Test again
↓
Compare evidence
↓
Identify/Conclude

The system should reward evidence-based reasoning rather than guessing.

## 12. PBA Practice

PBA Practice should simulate practical assessment skills:

- apparatus identification,
- procedure selection,
- action/performance decisions,
- observations,
- measurements,
- calculations,
- interpretation,
- conclusions,
- practical scenarios.

Optional Revision Quiz:
- may use MCQs for general revision.
- must remain separate conceptually from the actual PBA assessment format.

## 13. Simulation Philosophy

The virtual lab should feel like a laboratory, while remaining accessible and user-friendly.

Students should control meaningful variables/actions where appropriate.

Avoid a trivial:
`Select A + Select B → Show Answer`

Instead, use:
- setup,
- action,
- animation,
- observation,
- evidence,
- data,
- reasoning.

Simulation should be educationally accurate and clearly distinguish simulated values from real measurements.

## 14. UI / UX

Initial visual direction:
- clean,
- modern,
- laboratory-inspired,
- student-friendly,
- readable,
- not overly cluttered.

The final competition interface may evolve after the core engine is stable.

Do not prioritize decorative animation over functional educational interaction.

## 15. Technology Constraints

Initial stack:
- HTML5
- CSS3
- Vanilla JavaScript

Core:
- offline-friendly

Avoid initially:
- React
- Vue
- Angular
- Node/backend
- database
- paid services
- unnecessary external libraries
- AI features

A backend should only be introduced later if an approved requirement genuinely needs it.

## 16. Development Philosophy

Start with the smallest working application.

Do not build the final architecture prematurely.

The project should evolve:

small working prototype
→ reusable engine
→ first complete practical
→ more practicals
→ Mystery Lab
→ PBA Practice
→ Experiment Log
→ competition polish

## 17. Milestones

### Milestone 0 — Project Foundation
Status: COMPLETE

Includes:
- PBA source identified,
- PBA matrix created,
- project direction agreed,
- architecture direction agreed,
- documentation created.

### Milestone 1 — Experiment Engine Foundation
Status: NEXT / NOT YET APPROVED FOR IMPLEMENTATION

Goal:
- establish reusable experiment representation,
- create basic workflow/state handling,
- create first demonstration practical,
- demonstrate interaction between structured data and UI.

First demonstration:
Paper Chromatography — Ink.

Must NOT include the entire application.

### Milestone 2 — Complete Paper Chromatography

### Milestone 3 — Fractional Distillation

### Milestone 4 — NaOH Volumetric Determination

### Milestone 5 — Remaining Major Practicals

### Milestone 6 — Minor Practicals

### Milestone 7 — Mystery Lab

### Milestone 8 — PBA Practice

### Milestone 9 — Experiment Log

### Milestone 10 — Testing, Accessibility, Performance and Competition Polish

## 18. Milestone 1 Scope

Milestone 1 should demonstrate:

- experiment data object,
- objective,
- apparatus/procedure representation,
- basic experiment state/workflow,
- simulation area,
- user action,
- observation recording,
- conclusion recording,
- basic Rf calculation support where appropriate,
- readable code,
- separation of chemistry data from UI logic where practical.

Milestone 1 should NOT include:
- all 13 experiments,
- full Mystery Lab,
- full PBA Practice,
- login/accounts,
- cloud database,
- backend,
- AI,
- weather/API,
- unnecessary libraries,
- final competition polish.

## 19. Milestone 1 Success Criteria

A student should be able to open ChemSim and:

1. Select the demonstration practical.
2. Read its objective.
3. See the relevant simulated apparatus.
4. Perform the basic workflow.
5. Observe simulated chromatography behavior.
6. Record an observation.
7. Enter a conclusion.
8. Access basic Rf calculation support where appropriate.
9. Complete the demonstration without browser console errors.

## 20. Quality Gate

Before moving to the next milestone:

- application runs,
- core workflow works,
- no known critical errors,
- chemistry behavior matches the approved specification,
- code is understandable,
- no unapproved features have been added,
- OpenCode reports tests and stops.

The user must approve the next milestone explicitly.

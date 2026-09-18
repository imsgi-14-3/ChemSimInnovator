# AGENTS.md
# ChemSim — Development Rules for OpenCode

## 1. Project Identity

Project: ChemSim — An Interactive Virtual Chemistry Laboratory

Target:
- Grade 9/10 Science Innovator Club competition project
- FBISE SSC Chemistry Practical Based Assessment (PBA)
- Annual Examination 2026 onwards / session 2026–27

Authoritative PBA source:
- `Final Chemistry PBA SSC Merged.pdf`
- This uploaded PDF is the authoritative source for the prescribed practical list and PBA/SLO mapping.

## 2. Core Development Principle

Work according to this sequence:

You decide → OpenCode implements → OpenCode tests → You review → You approve the next milestone.

OpenCode MUST NOT autonomously proceed to future milestones.

When a milestone is completed:
1. Test it.
2. Report what was changed.
3. Report tests performed.
4. Report known issues.
5. Stop and wait for explicit approval.

## 3. Technology

Initial technology:
- HTML5
- CSS3
- Vanilla JavaScript

Core application should be offline-friendly.

Do not introduce React, Vue, Angular, Node/backend, databases, paid services, or unnecessary libraries unless a later approved milestone explicitly requires them.

## 4. Inspect Before Editing

Before modifying the project:
- Inspect the complete current file structure.
- Read `PROJECT_SPEC.md`.
- Read `DEVELOPMENT_LOG.md`.
- Read relevant existing code.
- Identify existing functionality.
- Preserve working functionality.

Never rewrite working code without a clear reason.

## 5. Incremental Development

Do not build the entire application at once.

Implement only the currently approved milestone.

If a requirement is ambiguous or an architectural decision would materially affect the project:
- explain the ambiguity,
- propose options,
- stop for approval.

## 6. Chemistry Accuracy

Chemistry content must be grounded in the authoritative FBISE PDF.

Rules:
- Do not invent practicals or SLO mappings.
- Preserve the exact FBISE wording for practical titles where used as source labels.
- Verify equations, observations, classifications, calculations, and expected results before implementation.
- Do not invent numerical measurements.
- Clearly distinguish simulated values from real laboratory measurements.
- Educational simplifications must be documented.
- The application is an educational simulation, not a replacement for supervised laboratory work.

Important source distinctions:
- The prescribed gas practical explicitly lists NH3, CO2, and Cl2.
- Do not silently expand that prescribed practical to other gases.
- Preserve unusual source wording rather than silently "correcting" it.

## 7. Safety

ChemSim is a supervised educational/virtual laboratory.

Do not provide instructions intended to facilitate unsupervised real-world chemical experimentation, chemical sourcing, or hazardous handling.

Simulation behavior may represent practical concepts without enabling unsafe real-world use.

## 8. Architecture Principles

The application should be built around reusable engines rather than 13 independent mini-applications.

Long-term conceptual architecture:

CHEMSIM
├── PRACTICALS
├── MYSTERY LAB
└── PBA PRACTICE
        ↓
  EXPERIMENT ENGINE
  ├── Apparatus Engine
  ├── Procedure Engine
  ├── Chemistry/Simulation Engine
  ├── Observation/Data Engine
  ├── Calculation Engine
  └── Assessment Engine
        ↓
   EXPERIMENT LOG

However, start small. Do not create folders or abstractions prematurely. Modularize when the codebase genuinely requires it.

## 9. Data Separation

Chemistry/practical data should be separated from UI logic as the project grows.

Experiment records should be structured so that the same engine can support multiple practicals.

Conceptual experiment structure:

{
  id,
  title,
  section,
  slos,
  objective,
  apparatus,
  materials,
  procedure,
  observations,
  calculations,
  result,
  conclusion,
  assessment,
  simulation
}

## 10. PBA Alignment

PBA Practice must reflect practical assessment skills, including:
- apparatus identification,
- procedure,
- performance/action,
- observation,
- data/measurement,
- calculation,
- interpretation,
- conclusion.

Do not treat the PBA as an MCQ-only assessment.

The FBISE framework states that MCQs are not assessed in the PBA paper. An optional separate Revision Quiz may contain MCQs for general revision.

## 11. Code Quality

Keep code:
- readable,
- maintainable,
- appropriately commented,
- logically named,
- suitable for a student project,
- free of unnecessary complexity.

Avoid premature optimization and unnecessary dependencies.

## 12. Testing

After significant changes:
- run the application,
- test the main user workflow,
- check browser console errors,
- test edge cases relevant to the milestone,
- verify that existing functionality still works.

Do not claim a test was performed if it was not actually performed.

## 13. Documentation

Maintain:
- `PROJECT_SPEC.md`
- `DEVELOPMENT_LOG.md`

Update the development log after approved milestones.

Do not change project requirements silently. Record approved architectural changes.

## 14. Milestone Control

Current state:
- Milestone 0 — Project Foundation / Specification: complete
- Milestone 1 — Experiment Engine Foundation: complete
- Milestone 2 — Complete Paper Chromatography: complete
- Milestone 3 — Fractional Distillation: complete
- Milestone 4 — NaOH Molarity by Titration: complete
- Milestone 5 — A3 Pb²⁺/Cd²⁺ Paper Chromatography: complete
- Milestone 6 — A5 Gas Detection (NH₃, CO₂, Cl₂): complete
- Milestone 7 — 8 Minor Practicals (M7.1–M7.8): complete, awaiting review
- Milestone 8 — PBA Practice Mode: complete, awaiting review

Milestone 1 is NOT automatically approved for implementation.

The first OpenCode task after these documents are placed in the project is an inspection-only task.

## 15. Authoritative-Source Principle

Every practical must follow:

> **Authoritative practical data first → reusable experiment structure → separate simulation configuration → meaningful student interaction → PBA-aligned observation/calculation/interpretation → clearly labelled simulated values.**

### A. Authoritative Experiment Definition

The experiment definition must contain only information supported by the authoritative source:

```javascript
{
  id, title, section, slos, objective,
  apparatus, materials, procedure, variables,
  observations, calculations, result, conclusion, assessment
}
```

Do not put invented numerical values, colours, timings, temperatures, rates, or other simulation-only parameters into this authoritative definition unless the source explicitly provides them.

### B. Simulation Configuration

Keep simulation-only behaviour separately in `SIMULATION_CONFIG`:

- animation timing
- visual positions
- simulated temperatures
- simulated volumes
- simulated boiling behaviour
- visual appearance
- educational demonstration values

Every such value must be clearly identified as:

> **Simulated educational value — not a real laboratory measurement**

### C. Source Discipline

1. If supported by the FBISE PDF → it may be presented as source-backed.
2. If it is a simulation choice → label it as simulated.
3. If it is not supported by the source and is not necessary → omit it.
4. Never present a simulation parameter as an FBISE requirement.
5. Never invent an official result, observation, temperature, measurement, or numerical value.
6. Do not assign an SLO to a practical merely because a related concept appears elsewhere in the PDF.

## 16. Stop Conditions

Stop and report if:
- a required chemistry fact is uncertain,
- source requirements conflict,
- existing code conflicts with the specification,
- a requested feature requires an unapproved technology,
- the milestone boundary would be crossed,
- testing reveals a significant unresolved issue.

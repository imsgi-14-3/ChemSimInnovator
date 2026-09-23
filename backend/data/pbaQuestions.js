/* ================================================================
   ChemSim — PBA Practice Questions
   FBISE SSC Chemistry PBA aligned questions
   Section A: Major Practicals (6 marks each)
   Section B: Minor Practicals (4 marks each)
   ================================================================ */

var PBA_QUESTIONS = [
  /* ============================================================
     SECTION A — Major Practicals
     ============================================================ */

  /* --- A1: Fractional Distillation --- */
  {
    id: "PBA_A1_Q1",
    experimentId: "A1",
    section: "A",
    title: "Fractional Distillation — Apparatus & Procedure",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Why is a fractionating column used instead of simple distillation?",
        options: [
          "To cool the vapour more quickly",
          "To improve separation efficiency between components with close boiling points",
          "To increase the pressure inside the flask",
          "To prevent the mixture from boiling"
        ],
        correct: 1,
        hint: "A fractionating column provides multiple condensation-evaporation cycles."
      },
      {
        type: "mcq",
        question: "Where should the thermometer bulb be positioned during fractional distillation?",
        options: [
          "Submerged in the liquid mixture",
          "At the bottom of the flask",
          "At the branch of the fractionating column (column head)",
          "Inside the condenser"
        ],
        correct: 2,
        hint: "The thermometer measures the temperature of the vapour that is distilling."
      },
      {
        type: "mcq",
        question: "What is the purpose of adding boiling chips to the flask?",
        options: [
          "To change the boiling point of the mixture",
          "To absorb impurities",
          "To prevent bumping during heating",
          "To speed up the distillation process"
        ],
        correct: 2,
        hint: "Boiling chips provide nucleation sites for smooth, even boiling."
      },
      {
        type: "short",
        question: "During fractional distillation of a water-alcohol mixture, the first fraction distils at approximately 78°C. What does this indicate?",
        expected: "Alcohol (ethanol) has a lower boiling point (~78°C) than water (100°C), so it distils first.",
        keywords: ["alcohol", "lower boiling point", "78", "distils first"],
        marks: 2
      }
    ]
  },

  /* --- A2: Ink Chromatography --- */
  {
    id: "PBA_A2_Q1",
    experimentId: "A2",
    section: "A",
    title: "Paper Chromatography — Technique & Rf Calculation",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Why must a pencil line (not ink) be used for the baseline in chromatography?",
        options: [
          "Pencil is easier to see on paper",
          "Ink would dissolve and separate, interfering with the results",
          "Pencil lines are more absorbent",
          "It is a tradition with no scientific reason"
        ],
        correct: 1,
        hint: "Ink contains dye components that would dissolve in the solvent."
      },
      {
        type: "mcq",
        question: "In paper chromatography, the solvent level must be:",
        options: [
          "Above the baseline so the sample washes away",
          "Below the baseline so the sample is not directly dissolved",
          "Exactly at the baseline",
          "At the same height as the solvent front"
        ],
        correct: 1,
        hint: "If the solvent is above the baseline, the spot will dissolve into the bulk solvent."
      },
      {
        type: "calc",
        question: "A chromatogram shows the solvent front at 8.5 cm from the baseline. A component spot is at 3.2 cm from the baseline. Calculate the Rf value.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 8.5, componentDist: 3.2 },
        correct: 0.376,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "A student obtains Rf values of 0.42 and 0.78 from an ink mixture. Explain what this tells you about the ink.",
        expected: "The ink mixture contains at least two different components (dyes) that have different affinities for the mobile and stationary phases.",
        keywords: ["two components", "different", "separated", "dyes"],
        marks: 1
      }
    ]
  },

  /* --- A3: Pb²⁺/Cd²⁺ Chromatography --- */
  {
    id: "PBA_A3_Q1",
    experimentId: "A3",
    section: "A",
    title: "Ion Separation by Paper Chromatography",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "In the chromatographic separation of Pb²⁺ and Cd²⁺ ions, the spots are identified by:",
        options: [
          "Measuring the mass of each spot",
          "Using appropriate colour indicators or reagents after development",
          "Smelling the chromatogram",
          "Heating the paper to burn off excess solvent"
        ],
        correct: 1,
        hint: "After development, specific reagents or indicators reveal the location of each ion."
      },
      {
        type: "mcq",
        question: "Two ion spots are found at distances of 4.0 cm and 6.5 cm from the baseline, with the solvent front at 10.0 cm. Which ion has the higher Rf value?",
        options: [
          "The ion at 4.0 cm (Rf = 0.40)",
          "The ion at 6.5 cm (Rf = 0.65)",
          "Both ions have the same Rf value",
          "Cannot be determined without more information"
        ],
        correct: 1,
        hint: "Higher Rf means the component travelled further relative to the solvent."
      },
      {
        type: "calc",
        question: "Calculate the Rf value for an ion spot found 5.4 cm from the baseline when the solvent front is 9.0 cm.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 9.0, componentDist: 5.4 },
        correct: 0.600,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "Why is it important to mark the solvent front immediately after removing the paper from the beaker?",
        expected: "The solvent evaporates quickly from the paper. If not marked immediately, the solvent front position is lost, making Rf calculations impossible.",
        keywords: ["evaporate", "lost", "position", "mark quickly"],
        marks: 1
      }
    ]
  },

  /* --- A4: NaOH Molarity by Titration --- */
  {
    id: "PBA_A4_Q1",
    experimentId: "A4",
    section: "A",
    title: "Acid-Base Titration — Technique & Calculation",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Why is phenolphthalein a suitable indicator for this titration?",
        options: [
          "It changes colour in acidic solutions only",
          "It changes sharply from pink (in NaOH) to colourless (at the endpoint) for a strong acid–strong base titration",
          "It is cheaper than other indicators",
          "It reacts with both the acid and base simultaneously"
        ],
        correct: 1,
        hint: "Phenolphthalein is pink in alkaline solutions and colourless in acidic solutions."
      },
      {
        type: "mcq",
        question: "Before filling the burette with HCl solution, the burette should be:",
        options: [
          "Filled directly with distilled water",
          "Rinsed with the HCl solution to prevent dilution",
          "Left dry with no rinsing",
          "Rinsed with NaOH solution first"
        ],
        correct: 1,
        hint: "Rinsing with the solution to be used prevents dilution by residual water."
      },
      {
        type: "mcq",
        question: "During titration, the conical flask is placed on a white tile to:",
        options: [
          "Heat the solution evenly",
          "Make it easier to detect the colour change at the endpoint",
          "Prevent the flask from sliding",
          "Absorb any spilled solution"
        ],
        correct: 1,
        hint: "A white background makes subtle colour changes more visible."
      },
      {
        type: "calc",
        question: "25.0 mL of NaOH solution required 22.5 mL of 0.100 mol/L HCl to reach the endpoint. Calculate the molarity of the NaOH solution using M₁V₁ = M₂V₂.",
        formula: "M(NaOH) × V(NaOH) = M(HCl) × V(HCl)",
        given: { mHCl: 0.100, vHCl: 22.5, vNaOH: 25.0 },
        correct: 0.090,
        tolerance: 0.001,
        unit: "mol/L",
        marks: 2
      }
    ]
  },

  /* --- A5: Gas Detection --- */
  {
    id: "PBA_A5_Q1",
    experimentId: "A5",
    section: "A",
    title: "Gas Detection — Tests and Confirmations",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Which test confirms the presence of NH₃ gas?",
        options: [
          "Bubble through limewater — it turns milky",
          "Hold damp red litmus paper — it turns blue",
          "Hold damp blue litmus paper — it turns red",
          "Pass through silver nitrate — a white precipitate forms"
        ],
        correct: 1,
        hint: "NH₃ is basic (alkaline) and turns damp red litmus paper blue."
      },
      {
        type: "mcq",
        question: "When CO₂ is bubbled through limewater, the observation is:",
        options: [
          "The solution turns dark blue",
          "The solution turns milky (white precipitate forms)",
          "No visible change occurs",
          "The solution turns pink"
        ],
        correct: 1,
        hint: "CO₂ reacts with Ca(OH)₂ to form insoluble CaCO₃."
      },
      {
        type: "mcq",
        question: "What is the characteristic observation when Cl₂ gas contacts damp litmus paper?",
        options: [
          "The litmus turns blue and stays blue",
          "The litmus turns red then bleaches to white/colorless",
          "The litmus paper dissolves immediately",
          "No change occurs"
        ],
        correct: 1,
        hint: "Cl₂ dissolves in water to form HClO which bleaches the dye."
      },
      {
        type: "short",
        question: "A gas is passed through limewater and the solution turns milky. The gas also turns damp blue litmus paper red. Identify the gas and explain your reasoning.",
        expected: "The gas is CO₂. It turns limewater milky (forming CaCO₃ precipitate) and turns blue litmus red because the resulting carbonic acid is acidic.",
        keywords: ["CO₂", "limewater milky", "acidic", "carbonic acid"],
        marks: 2
      }
    ]
  },

  /* ============================================================
     SECTION B — Minor Practicals
     ============================================================ */

  /* --- M7.1: Sublimation --- */
  {
    id: "PBA_M71_Q1",
    experimentId: "M7_1",
    section: "B",
    title: "Sublimation — Separating Naphthalene",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Which component of the naphthalene-sand-salt mixture undergoes sublimation?",
        options: [
          "Sand",
          "Salt (NaCl)",
          "Naphthalene",
          "All three components sublime"
        ],
        correct: 2,
        hint: "Sublimation is the transition from solid directly to vapour. Naphthalene has this property."
      },
      {
        type: "mcq",
        question: "What is the purpose of the inverted funnel lined with filter paper?",
        options: [
          "To filter the mixture during heating",
          "To collect the sublimed naphthalene vapour as it condenses",
          "To prevent the dish from cracking",
          "To measure the temperature during heating"
        ],
        correct: 1,
        hint: "The vapour condenses on the cooler surface of the funnel."
      },
      {
        type: "short",
        question: "After sublimation, what remains in the evaporating dish?",
        expected: "Sand and salt remain in the dish as they do not sublime.",
        keywords: ["sand", "salt", "remain", "residue"],
        marks: 2
      }
    ]
  },

  /* --- M7.2: Flame Test --- */
  {
    id: "PBA_M72_Q1",
    experimentId: "M7_2",
    section: "B",
    title: "Flame Test — Ion Identification",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Why must the platinum wire be cleaned with concentrated HCl between each test?",
        options: [
          "To make the wire hotter",
          "To remove residual ions and prevent cross-contamination",
          "To dissolve the wire coating",
          "To increase the flame temperature"
        ],
        correct: 1,
        hint: "Residual ions from a previous test would give a false colour in the next test."
      },
      {
        type: "match",
        question: "Match each ion with its characteristic flame colour:",
        pairs: [
          { left: "Na⁺", right: "Yellow", id: "na" },
          { left: "K⁺", right: "Violet/Lilac", id: "k" },
          { left: "Cu²⁺", right: "Blue-Green", id: "cu" },
          { left: "Ca²⁺", right: "Brick Red", id: "ca" }
        ],
        marks: 2
      },
      {
        type: "short",
        question: "A flame test produces a yellow colour. Identify the likely ion present.",
        expected: "The yellow flame colour indicates the presence of sodium ions (Na⁺).",
        keywords: ["sodium", "Na⁺", "yellow"],
        marks: 1
      }
    ]
  },

  /* --- M7.3: Crystal Preparation --- */
  {
    id: "PBA_M73_Q1",
    experimentId: "M7_3",
    section: "B",
    title: "CuSO₄·5H₂O Crystal Preparation",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Why should the solution be cooled slowly rather than quickly after concentration?",
        options: [
          "Slow cooling saves energy",
          "Slow cooling produces larger, purer crystals",
          "Quick cooling causes the solution to boil",
          "It makes no difference to the crystal quality"
        ],
        correct: 1,
        hint: "Rapid cooling traps impurities and produces small, imperfect crystals."
      },
      {
        type: "mcq",
        question: "What is the correct formula for copper(II) sulphate pentahydrate?",
        options: [
          "CuSO₄",
          "CuSO₄·5H₂O",
          "Cu₂SO₄·5H₂O",
          "CuSO₄·H₂O"
        ],
        correct: 1,
        hint: "The compound contains 5 molecules of water of crystallisation."
      },
      {
        type: "short",
        question: "Describe the appearance of pure CuSO₄·5H₂O crystals.",
        expected: "The crystals are blue, transparent, and have a regular geometric shape.",
        keywords: ["blue", "transparent", "regular", "geometric"],
        marks: 2
      }
    ]
  },

  /* --- M7.4 & M7.5: Melting/Boiling Point --- */
  {
    id: "PBA_M74_Q1",
    experimentId: "M7_4",
    section: "B",
    title: "Melting Point Determination",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Why is a water bath used instead of direct heating to determine the melting point?",
        options: [
          "Water baths are cheaper",
          "Direct heating causes uneven temperature and an inaccurate reading",
          "Water baths increase the melting point",
          "Direct heating melts the capillary tube"
        ],
        correct: 1,
        hint: "A water bath provides uniform, gentle heating for an accurate observation."
      },
      {
        type: "mcq",
        question: "The melting point of pure naphthalene is approximately:",
        options: [
          "0°C",
          "80°C",
          "100°C",
          "200°C"
        ],
        correct: 1,
        hint: "Naphthalene melts at around 80°C."
      },
      {
        type: "short",
        question: "If a substance melts over a wide temperature range (e.g., 75–85°C), what does this suggest about its purity?",
        expected: "A wide melting range indicates the presence of impurities. Pure substances melt sharply at a specific temperature.",
        keywords: ["impure", "impurities", "wide range", "not sharp"],
        marks: 2
      }
    ]
  },

  /* --- M7.6: Displacement Reaction --- */
  {
    id: "PBA_M76_Q1",
    experimentId: "M7_6",
    section: "B",
    title: "Metal Displacement Reaction",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "When zinc granules are added to copper(II) sulphate solution, what is observed?",
        options: [
          "No change occurs",
          "The solution turns green and copper deposits on the zinc",
          "The solution turns colourless and brown copper deposits form on the zinc",
          "A gas is evolved rapidly"
        ],
        correct: 2,
        hint: "Zinc is more reactive than copper and displaces it from solution."
      },
      {
        type: "mcq",
        question: "What type of reaction is this?",
        options: [
          "Decomposition reaction",
          "Displacement (replacement) reaction",
          "Combination reaction",
          "Neutralisation reaction"
        ],
        correct: 1,
        hint: "A more reactive metal replaces a less reactive metal in solution."
      },
      {
        type: "short",
        question: "Write the balanced chemical equation for the reaction between zinc and copper(II) sulphate solution.",
        expected: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
        keywords: ["Zn", "CuSO₄", "ZnSO₄", "Cu", "balanced"],
        marks: 2
      }
    ]
  },

  /* --- M7.7: Water Test --- */
  {
    id: "PBA_M77_Q1",
    experimentId: "M7_7",
    section: "B",
    title: "Test for Water Using Anhydrous CuSO₄",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "What colour change indicates the presence of water when using anhydrous copper(II) sulphate?",
        options: [
          "Blue to white",
          "White to blue",
          "Green to brown",
          "Colourless to red"
        ],
        correct: 1,
        hint: "Anhydrous CuSO₄ is white; it turns blue when it absorbs water to form CuSO₄·5H₂O."
      },
      {
        type: "mcq",
        question: "Anhydrous copper(II) sulphate is used as a test for water because:",
        options: [
          "It dissolves completely in water",
          "It shows a distinctive and irreversible colour change in the presence of water",
          "It is the only white powder that changes colour",
          "It reacts with all liquids"
        ],
        correct: 1,
        hint: "The colour change from white to blue is specific and indicates water absorption."
      },
      {
        type: "short",
        question: "A student adds water to a white powder and the powder turns blue. What is the white powder, and what is the chemical name of the blue product?",
        expected: "The white powder is anhydrous copper(II) sulphate (CuSO₄). The blue product is copper(II) sulphate pentahydrate (CuSO₄·5H₂O).",
        keywords: ["anhydrous CuSO₄", "CuSO₄·5H₂O", "pentahydrate"],
        marks: 2
      }
    ]
  },

  /* --- M7.8: Water Purity --- */
  {
    id: "PBA_M78_Q1",
    experimentId: "M7_8",
    section: "B",
    title: "Purity of Water — MP and BP",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Pure water at standard atmospheric pressure has a boiling point of:",
        options: [
          "0°C",
          "50°C",
          "100°C",
          "212°C"
        ],
        correct: 2,
        hint: "100°C is the standard boiling point of pure water at 1 atm."
      },
      {
        type: "mcq",
        question: "If a water sample boils at 102°C instead of 100°C, this suggests:",
        options: [
          "The thermometer is broken",
          "The water is impure (contains dissolved substances)",
          "The atmospheric pressure is above standard",
          "Both B and C are possible explanations"
        ],
        correct: 3,
        hint: "Impurities raise the boiling point, and higher pressure also increases it."
      },
      {
        type: "short",
        question: "Explain how melting point and boiling point data can be used together to assess the purity of a water sample.",
        expected: "Pure water melts at 0°C and boils at 100°C at standard pressure. If the observed values deviate from these, the sample contains impurities. Concordance with standard values indicates high purity.",
        keywords: ["0°C", "100°C", "deviate", "impure", "standard values"],
        marks: 2
      }
    ]
  }
];

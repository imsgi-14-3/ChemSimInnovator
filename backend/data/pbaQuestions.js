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
  },

  /* ============================================================
     SECTION A — Variant questions (Q2 / Q3 per practical)
     ============================================================ */

  /* --- A1: Fractional Distillation — Q2 --- */
  {
    id: "PBA_A1_Q2",
    experimentId: "A1",
    section: "A",
    title: "Fractional Distillation — Apparatus Check",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The glass beads (porcelain chips) packed in the fractionating column provide:",
        options: [
          "Extra fuel for heating",
          "A large surface area for repeated condensation and vaporisation of the vapour",
          "A catalyst for the separation",
          "Colour to the distillate"
        ],
        correct: 1,
        hint: "Each surface lets vapour condense and re-vaporise, improving separation."
      },
      {
        type: "mcq",
        question: "Cold water is circulated through the condenser in order to:",
        options: [
          "Heat the vapour so it distils faster",
          "Cool the vapour so it condenses back into a liquid",
          "Increase the boiling point of the mixture",
          "Dissolve the glass beads"
        ],
        correct: 1,
        hint: "The condenser's job is to turn vapour back into liquid."
      },
      {
        type: "short",
        question: "State two checks a student should make before starting to heat the mixture.",
        expected: "All apparatus joints are secure and the apparatus is clamped firmly; boiling chips have been added; water is flowing through the condenser (in at the bottom, out at the top).",
        keywords: ["secure", "clamp", "boiling chips", "condenser water"],
        marks: 2
      },
      {
        type: "short",
        question: "While collecting the first fraction, the temperature starts rising above 78°C. What does this indicate?",
        expected: "The lower-boiling component (alcohol) has finished distilling, and water (the higher-boiling component) is beginning to distil, so the next fraction would be impure.",
        keywords: ["alcohol", "finished", "water", "beginning"],
        marks: 2
      }
    ]
  },

  /* --- A1: Fractional Distillation — Q3 --- */
  {
    id: "PBA_A1_Q3",
    experimentId: "A1",
    section: "A",
    title: "Fractional Distillation — Separation Logic",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The mixture is heated gently and steadily rather than strongly in order to:",
        options: [
          "Boil away all the water at once",
          "Allow the vapour to form steadily and improve the separation of components",
          "Lower the boiling point of alcohol",
          "Melt the glass beads"
        ],
        correct: 1,
        hint: "Gentle heating gives the column time to separate the components."
      },
      {
        type: "mcq",
        question: "The liquid collected in the receiving flask is called the:",
        options: [
          "Residue",
          "Distillate",
          "Indicator",
          "Filtrate"
        ],
        correct: 1,
        hint: "The condensed liquid that passes through the condenser is the distillate."
      },
      {
        type: "short",
        question: "In the water–alcohol mixture, which component remains in the flask after the first fraction distils, and why?",
        expected: "Water remains in the flask because it has a higher boiling point (100°C) than alcohol (~78°C), so it vaporises later.",
        keywords: ["water", "remains", "higher boiling", "100"],
        marks: 2
      },
      {
        type: "short",
        question: "Name the separation technique used here and state the property it depends on.",
        expected: "Fractional distillation; it depends on the difference in boiling points of the components of the mixture.",
        keywords: ["fractional distillation", "boiling point", "difference", "components"],
        marks: 2
      }
    ]
  },

  /* --- A2: Ink Chromatography — Q2 --- */
  {
    id: "PBA_A2_Q2",
    experimentId: "A2",
    section: "A",
    title: "Paper Chromatography — Developing the Chromatogram",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The beaker is covered with a watch glass during development to:",
        options: [
          "Prevent the solvent from evaporating",
          "Heat the solvent",
          "Press the paper flat",
          "Dissolve the pencil line"
        ],
        correct: 0,
        hint: "An open beaker lets solvent evaporate and the run become uneven."
      },
      {
        type: "mcq",
        question: "The solvent rises up the chromatography paper by:",
        options: [
          "Diffusion of the ink only",
          "Capillary action of the paper",
          "Gravity",
          "Boiling of the solvent"
        ],
        correct: 1,
        hint: "The paper fibres draw the solvent upwards."
      },
      {
        type: "calc",
        question: "A chromatogram has a solvent front 7.5 cm from the baseline and a component spot 3.0 cm from the baseline. Calculate the Rf value.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 7.5, componentDist: 3.0 },
        correct: 0.400,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "Why must the ink spot be completely dry before the paper is placed in the solvent?",
        expected: "If the spot is wet it can dissolve and wash away into the bulk solvent, spreading the sample and ruining the separation.",
        keywords: ["dry", "dissolve", "wash", "spread"],
        marks: 2
      }
    ]
  },

  /* --- A2: Ink Chromatography — Q3 --- */
  {
    id: "PBA_A2_Q3",
    experimentId: "A2",
    section: "A",
    title: "Paper Chromatography — Technique & Rf Practice",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The chromatography paper strip used is approximately:",
        options: [
          "15 cm x 3 cm",
          "5 cm x 30 cm",
          "30 cm x 30 cm",
          "3 cm x 3 cm"
        ],
        correct: 0,
        hint: "A long narrow strip fits the beaker and gives room to measure distances."
      },
      {
        type: "mcq",
        question: "A valid Rf value always lies:",
        options: [
          "Between 0 and 1",
          "Greater than 1",
          "Between 1 and 2",
          "Equal to the solvent front distance"
        ],
        correct: 0,
        hint: "The component cannot travel farther than the solvent front."
      },
      {
        type: "calc",
        question: "A component travels 6.5 cm when the solvent front travels 10.0 cm. Calculate its Rf value.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 10.0, componentDist: 6.5 },
        correct: 0.650,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "Explain why different components of an ink travel different distances up the paper.",
        expected: "Components differ in their solubility in the mobile solvent and their affinity for the stationary paper, so some travel faster/further and others slower/less far.",
        keywords: ["solubility", "affinity", "mobile", "stationary"],
        marks: 2
      }
    ]
  },

  /* --- A3: Ion Chromatography — Q2 --- */
  {
    id: "PBA_A3_Q2",
    experimentId: "A3",
    section: "A",
    title: "Ion Separation — Measurement & Rf",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The distance of each ion spot is measured from:",
        options: [
          "The top of the paper",
          "The pencil baseline",
          "The edge of the beaker",
          "The solvent surface"
        ],
        correct: 1,
        hint: "All distances in chromatography start from the baseline."
      },
      {
        type: "mcq",
        question: "Cd²⁺ appears at 6.0 cm and Pb²⁺ at 3.6 cm with the solvent front at 12.0 cm. Which ion has the higher Rf value?",
        options: [
          "Cd²⁺ (Rf = 0.50)",
          "Pb²⁺ (Rf = 0.30)",
          "Both have equal Rf values",
          "Rf cannot be compared this way"
        ],
        correct: 0,
        hint: "Rf = distance of spot / distance of solvent front."
      },
      {
        type: "calc",
        question: "An ion spot is 4.5 cm from the baseline and the solvent front is 9.0 cm from the baseline. Calculate the Rf value.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 9.0, componentDist: 4.5 },
        correct: 0.500,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "Explain how Pb²⁺ and Cd²⁺ ions are separated from each other during development of the chromatogram.",
        expected: "The two ions move at different rates because they have different affinities for the paper (stationary phase) and different solubilities in the solvent (mobile phase), so they end up at different heights.",
        keywords: ["different", "affinities", "rates", "solvent"],
        marks: 2
      }
    ]
  },

  /* --- A3: Ion Chromatography — Q3 --- */
  {
    id: "PBA_A3_Q3",
    experimentId: "A3",
    section: "A",
    title: "Ion Separation — Interpretation & Error",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "After development the ion spots appear at different heights mainly because:",
        options: [
          "The ions have different affinities for the stationary paper and the mobile solvent",
          "One ion is heavier than the other only",
          "The spots were drawn at different sizes",
          "The beaker was covered"
        ],
        correct: 0,
        hint: "Partition between the two phases determines how far each ion travels."
      },
      {
        type: "mcq",
        question: "An Rf value of 0 for a component means that the component:",
        options: [
          "Travelled with the solvent front",
          "Did not move from the baseline",
          "Is not present in the mixture",
          "Has evaporated from the paper"
        ],
        correct: 1,
        hint: "Rf = 0 means zero distance travelled."
      },
      {
        type: "calc",
        question: "A spot lies 2.0 cm from the baseline when the solvent front is 8.0 cm from the baseline. Calculate the Rf value.",
        formula: "Rf = Distance of component / Distance of solvent front",
        given: { solventFront: 8.0, componentDist: 2.0 },
        correct: 0.250,
        tolerance: 0.01,
        unit: "",
        marks: 2
      },
      {
        type: "short",
        question: "A student calculates an Rf value greater than 1. Suggest a likely error in the measurement.",
        expected: "The distance of the spot was probably measured from the wrong point (for example from the top of the paper or from the solvent front), or the solvent front was marked incorrectly, so the component distance exceeded the solvent front distance.",
        keywords: ["measured", "wrong", "baseline", "error"],
        marks: 2
      }
    ]
  },

  /* --- A4: Titration — Q2 --- */
  {
    id: "PBA_A4_Q2",
    experimentId: "A4",
    section: "A",
    title: "Acid-Base Titration — Endpoint & Repeat",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "The endpoint of the titration is reached when:",
        options: [
          "The solution first turns pink",
          "One extra drop of HCl makes the pink colour disappear permanently",
          "The burette is refilled",
          "The flask is weighed"
        ],
        correct: 1,
        hint: "The end point is the permanent loss of the pink colour."
      },
      {
        type: "mcq",
        question: "Titres are described as concordant when they agree within:",
        options: [
          "0.01 mL",
          "0.10 mL",
          "1.0 mL",
          "10.0 mL"
        ],
        correct: 1,
        hint: "The procedure states concordant results are within 0.10 mL."
      },
      {
        type: "calc",
        question: "25.0 mL of NaOH solution required 20.0 mL of 0.100 mol/L HCl to reach the endpoint. Calculate the molarity of the NaOH solution.",
        formula: "M(NaOH) × V(NaOH) = M(HCl) × V(HCl)",
        given: { mHCl: 0.100, vHCl: 20.0, vNaOH: 25.0 },
        correct: 0.080,
        tolerance: 0.001,
        unit: "mol/L",
        marks: 2
      },
      {
        type: "short",
        question: "Why is the titration repeated until concordant results are obtained?",
        expected: "Repeating gives reliable, consistent titre values; the mean of concordant titres reduces random error and makes the calculated molarity more accurate.",
        keywords: ["reliable", "accurate", "mean", "concordant"],
        marks: 2
      }
    ]
  },

  /* --- A4: Titration — Q3 --- */
  {
    id: "PBA_A4_Q3",
    experimentId: "A4",
    section: "A",
    title: "Acid-Base Titration — Readings & Errors",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Phenolphthalein indicator is added to the solution in the:",
        options: [
          "Burette",
          "Conical flask (NaOH solution)",
          "Wash bottle",
          "Beaker holding excess HCl"
        ],
        correct: 1,
        hint: "The sample being determined (NaOH) sits in the flask with the indicator."
      },
      {
        type: "mcq",
        question: "The titre (volume delivered) is calculated as:",
        options: [
          "Initial reading + final reading",
          "Final reading − initial reading",
          "Initial reading − final reading",
          "Twice the final reading"
        ],
        correct: 1,
        hint: "Volume delivered is the difference between the two burette readings."
      },
      {
        type: "calc",
        question: "20.0 mL of NaOH solution required 16.0 mL of 0.250 mol/L HCl to reach the endpoint. Calculate the molarity of the NaOH solution.",
        formula: "M(NaOH) × V(NaOH) = M(HCl) × V(HCl)",
        given: { mHCl: 0.250, vHCl: 16.0, vNaOH: 20.0 },
        correct: 0.200,
        tolerance: 0.001,
        unit: "mol/L",
        marks: 2
      },
      {
        type: "short",
        question: "An air bubble is left in the burette tip at the start of the titration. Explain how this affects the calculated molarity of the NaOH.",
        expected: "During the titration the bubble is flushed out, so the burette reading includes liquid that did not enter the flask. The titre is larger than the true volume delivered, so the calculated molarity of NaOH is too high.",
        keywords: ["titre", "larger", "too high", "bubble"],
        marks: 2
      }
    ]
  },

  /* --- A5: Gas Detection — Q2 --- */
  {
    id: "PBA_A5_Q2",
    experimentId: "A5",
    section: "A",
    title: "Gas Detection — Damp Litmus & Confirmation",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Litmus paper must be damp for the gas tests because:",
        options: [
          "Dry litmus is not litmus any more",
          "The gas must dissolve in water to form the acidic or alkaline solution that changes the indicator colour",
          "Water acts as a catalyst that produces the gas",
          "Damp paper burns more slowly"
        ],
        correct: 1,
        hint: "The indicator responds to H⁺ or OH⁻ ions formed when the gas dissolves in water."
      },
      {
        type: "mcq",
        question: "The bleaching of damp litmus by chlorine gas is caused by:",
        options: [
          "The formation of hypochlorous acid (HClO) when Cl₂ dissolves in water",
          "The chlorine turning the paper green",
          "The water evaporating from the paper",
          "The chlorine freezing on the paper"
        ],
        correct: 0,
        hint: "Cl₂ + water gives HClO, which bleaches the dye."
      },
      {
        type: "short",
        question: "State the test used to detect NH₃ gas.",
        expected: "Hold damp red litmus paper near the gas; it turns blue, showing that the gas is alkaline (NH₃).",
        keywords: ["damp red litmus", "blue", "alkaline", "NH₃"],
        marks: 2
      },
      {
        type: "short",
        question: "State one safety precaution when handling a Cl₂ gas sample.",
        expected: "Chlorine is toxic/poisonous, so it must not be inhaled; work in a well-ventilated area or fume cupboard and avoid smelling the gas directly.",
        keywords: ["toxic", "poisonous", "inhale", "ventilated"],
        marks: 2
      }
    ]
  },

  /* --- A5: Gas Detection — Q3 --- */
  {
    id: "PBA_A5_Q3",
    experimentId: "A5",
    section: "A",
    title: "Gas Detection — Reagents & Identification",
    marks: 6,
    parts: [
      {
        type: "mcq",
        question: "Limewater is a solution of:",
        options: [
          "Sodium hydroxide (NaOH)",
          "Calcium hydroxide (Ca(OH)₂)",
          "Sodium chloride (NaCl)",
          "Copper(II) sulphate (CuSO₄)"
        ],
        correct: 1,
        hint: "Limewater is slaked lime dissolved in water."
      },
      {
        type: "mcq",
        question: "The white precipitate that makes limewater turn milky with CO₂ is:",
        options: [
          "Calcium carbonate (CaCO₃)",
          "Calcium chloride (CaCl₂)",
          "Sodium carbonate (Na₂CO₃)",
          "Copper carbonate"
        ],
        correct: 0,
        hint: "CO₂ reacts with Ca(OH)₂ to form insoluble CaCO₃."
      },
      {
        type: "short",
        question: "A colourless, odourless gas turns limewater milky. Identify the gas and explain the observation.",
        expected: "The gas is carbon dioxide (CO₂). It reacts with limewater (calcium hydroxide) to form insoluble calcium carbonate, which appears as a white precipitate/milkiness.",
        keywords: ["CO₂", "limewater", "calcium carbonate", "precipitate"],
        marks: 2
      },
      {
        type: "short",
        question: "Explain why litmus paper must be damp when testing a gas with it.",
        expected: "The gas must dissolve in the water on the paper to form an acidic or alkaline solution; only then can the indicator change colour.",
        keywords: ["dissolve", "water", "acidic", "indicator"],
        marks: 2
      }
    ]
  },

  /* ============================================================
     SECTION B — Variant questions (Q2 / Q3 per practical)
     ============================================================ */

  /* --- M7.1: Sublimation — Q2 --- */
  {
    id: "PBA_M71_Q2",
    experimentId: "M7_1",
    section: "B",
    title: "Sublimation — Process & Apparatus",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Sublimation is the change of state from:",
        options: [
          "Liquid to gas",
          "Solid directly to vapour without passing through the liquid state",
          "Gas to liquid",
          "Solid to liquid"
        ],
        correct: 1,
        hint: "Solid → vapour in one step is sublimation."
      },
      {
        type: "mcq",
        question: "After heating, the solid naphthalene is collected on:",
        options: [
          "The evaporating dish",
          "The inverted funnel (on the filter paper)",
          "The tripod stand",
          "The glass rod"
        ],
        correct: 1,
        hint: "The vapour rises and deposits on the cooler funnel surface."
      },
      {
        type: "short",
        question: "Why is the funnel lined with filter paper?",
        expected: "The filter paper provides a cool surface on which the naphthalene vapour condenses/deposits as a solid, and makes the sublimate easy to collect.",
        keywords: ["cool surface", "condense", "deposit", "collect"],
        marks: 2
      }
    ]
  },

  /* --- M7.1: Sublimation — Q3 --- */
  {
    id: "PBA_M71_Q3",
    experimentId: "M7_1",
    section: "B",
    title: "Sublimation — Separating the Residue",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Sand and salt remain in the dish because:",
        options: [
          "They sublime at this temperature",
          "They do not sublime when the mixture is gently heated",
          "They are lighter than naphthalene",
          "They are dissolved by the filter paper"
        ],
        correct: 1,
        hint: "Only naphthalene has the property of sublimation here."
      },
      {
        type: "mcq",
        question: "After sublimation, the best way to separate salt from the sand left in the dish is to:",
        options: [
          "Heat the residue strongly until everything melts",
          "Dissolve the residue in water, filter off the sand, then evaporate the filtrate",
          "Add more naphthalene",
          "Cool the residue in a freezer"
        ],
        correct: 1,
        hint: "Salt dissolves in water; sand does not."
      },
      {
        type: "short",
        question: "What change of state occurs when the naphthalene vapour touches the cool funnel?",
        expected: "The vapour cools and changes directly back into solid naphthalene, which deposits on the funnel (deposition/reverse sublimation).",
        keywords: ["vapour", "solid", "cools", "deposits"],
        marks: 2
      }
    ]
  },

  /* --- M7.2: Flame Test — Q2 --- */
  {
    id: "PBA_M72_Q2",
    experimentId: "M7_2",
    section: "B",
    title: "Flame Test — Identification",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "A flame test is used to identify:",
        options: [
          "Metal cations (positive ions) in salts",
          "Only anions in salts",
          "The mass of the salt",
          "The volume of the sample"
        ],
        correct: 0,
        hint: "Each metal ion gives its own characteristic flame colour."
      },
      {
        type: "mcq",
        question: "Which ion produces an apple-green flame?",
        options: [
          "Na⁺",
          "K⁺",
          "Ba²⁺",
          "Ca²⁺"
        ],
        correct: 2,
        hint: "Ba²⁺ gives the apple-green flame colour."
      },
      {
        type: "short",
        question: "State the flame colours given by Na⁺ and Ca²⁺.",
        expected: "Na⁺ gives a yellow flame; Ca²⁺ gives a brick-red flame.",
        keywords: ["yellow", "brick red", "sodium", "calcium"],
        marks: 2
      }
    ]
  },

  /* --- M7.2: Flame Test — Q3 --- */
  {
    id: "PBA_M72_Q3",
    experimentId: "M7_2",
    section: "B",
    title: "Flame Test — Clean Wire & Errors",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "The platinum wire is heated in the flame after cleaning with HCl until:",
        options: [
          "It glows red hot permanently",
          "It gives no colour in the flame",
          "It melts",
          "It changes to green"
        ],
        correct: 1,
        hint: "A colourless flame confirms the wire is clean."
      },
      {
        type: "mcq",
        question: "A student sees a yellow flame for every sample tested. The most likely reason is:",
        options: [
          "All samples contain sodium",
          "The wire was not cleaned properly, so sodium from the previous test contaminated the next",
          "The Bunsen burner is too cold",
          "The room lights are yellow"
        ],
        correct: 1,
        hint: "Residual ions on the wire give a false colour in the next test."
      },
      {
        type: "short",
        question: "Explain how skipping the wire-cleaning step between tests affects the results.",
        expected: "Ions left on the wire from the previous sample contaminate the next one and give a false flame colour, so the identification of the ion becomes unreliable.",
        keywords: ["contamination", "false", "colour", "previous"],
        marks: 2
      }
    ]
  },

  /* --- M7.3: Crystal Preparation — Q2 --- */
  {
    id: "PBA_M73_Q2",
    experimentId: "M7_3",
    section: "B",
    title: "CuSO₄ Crystals — Dissolving & Filtration",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "The CuSO₄ solution is heated to:",
        options: [
          "Boil away all the water immediately",
          "Concentrate the solution by evaporating some of the water",
          "Decompose the copper sulphate",
          "Freeze the crystals"
        ],
        correct: 1,
        hint: "Evaporation makes the solution more concentrated before cooling."
      },
      {
        type: "mcq",
        question: "Filter paper and funnel are used in this preparation to:",
        options: [
          "Remove insoluble impurities from the solution",
          "Heat the solution faster",
          "Add colour to the crystals",
          "Measure the volume of water"
        ],
        correct: 0,
        hint: "Filtration removes anything that does not dissolve."
      },
      {
        type: "short",
        question: "Why is distilled water (instead of tap water) used to dissolve the copper sulphate?",
        expected: "Tap water may contain dissolved impurities that would get incorporated into the crystals; distilled water is pure so the crystals remain pure.",
        keywords: ["impurities", "pure", "distilled", "tap"],
        marks: 2
      }
    ]
  },

  /* --- M7.3: Crystal Preparation — Q3 --- */
  {
    id: "PBA_M73_Q3",
    experimentId: "M7_3",
    section: "B",
    title: "CuSO₄ Crystals — Hydration & Purity",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Water of crystallisation means:",
        options: [
          "Water molecules fixed in the crystal structure of the compound",
          "Water that is only on the surface and can be wiped off",
          "Water used as a solvent during the test",
          "Water produced by a chemical reaction"
        ],
        correct: 0,
        hint: "CuSO₄·5H₂O contains five molecules of water per formula unit."
      },
      {
        type: "mcq",
        question: "If the solution is cooled very quickly, the crystals obtained will be:",
        options: [
          "Large and pure",
          "Small and likely to be impure",
          "Colourless",
          "Free of water of crystallisation"
        ],
        correct: 1,
        hint: "Rapid cooling traps impurities and gives small crystals."
      },
      {
        type: "short",
        question: "State two properties you would use to judge whether the prepared CuSO₄·5H₂O crystals are pure.",
        expected: "The crystals should be blue, transparent and of regular geometric shape; a pure sample would also melt sharply at a definite temperature (a broad melting range would indicate impurities).",
        keywords: ["blue", "regular", "sharp", "pure"],
        marks: 2
      }
    ]
  },

  /* --- M7.4: Melting Point — Q2 --- */
  {
    id: "PBA_M74_Q2",
    experimentId: "M7_4",
    section: "B",
    title: "Melting Point — Capillary & Thermometer",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "The capillary tube containing the naphthalene is attached to the thermometer so that:",
        options: [
          "The sample is heated directly by the flame",
          "The temperature of the sample can be measured accurately as it is heated",
          "The thermometer can be cooled faster",
          "The sample does not touch the water"
        ],
        correct: 1,
        hint: "The sample and thermometer must be at the same temperature."
      },
      {
        type: "mcq",
        question: "The melting point is recorded when:",
        options: [
          "The water in the bath starts to boil",
          "The solid first begins to melt (first drop of liquid appears)",
          "The thermometer reads 100°C",
          "The solid turns into a gas"
        ],
        correct: 1,
        hint: "The onset of melting gives the melting point."
      },
      {
        type: "short",
        question: "Why must the water bath be heated slowly as the expected melting point is approached?",
        expected: "Slow, uniform heating ensures the sample temperature matches the thermometer reading, giving an accurate melting point; rapid heating would pass the true value before it can be read.",
        keywords: ["uniform", "accurate", "slow", "temperature"],
        marks: 2
      }
    ]
  },

  /* --- M7.4: Melting Point — Q3 --- */
  {
    id: "PBA_M74_Q3",
    experimentId: "M7_4",
    section: "B",
    title: "Melting Point — Accuracy & Identification",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Melting point is used in the laboratory mainly to:",
        options: [
          "Identify a substance and assess its purity",
          "Measure the mass of a sample",
          "Determine the colour of a solid",
          "Find the solubility of a solid"
        ],
        correct: 0,
        hint: "Each pure substance has a characteristic sharp melting point."
      },
      {
        type: "mcq",
        question: "The melting point determination is repeated in order to:",
        options: [
          "Use up the sample",
          "Confirm the accuracy and reliability of the reading",
          "Lower the melting point",
          "Dry the capillary tube"
        ],
        correct: 1,
        hint: "The procedure says to repeat for accuracy."
      },
      {
        type: "short",
        question: "Explain how a melting point determination can help identify an unknown solid.",
        expected: "The observed melting point (and whether it is sharp) is compared with the known values of possible substances; a matching sharp melting point supports the identification and indicates purity.",
        keywords: ["compare", "known", "purity", "identify"],
        marks: 2
      }
    ]
  },

  /* --- M7.6: Displacement — Q2 --- */
  {
    id: "PBA_M76_Q2",
    experimentId: "M7_6",
    section: "B",
    title: "Displacement Reaction — Observations",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Zinc is added to copper(II) sulphate solution because:",
        options: [
          "Zinc is less reactive than copper",
          "Zinc is more reactive than copper and can displace it from solution",
          "Zinc dissolves only in cold water",
          "Copper is more reactive than zinc"
        ],
        correct: 1,
        hint: "A more reactive metal displaces a less reactive one."
      },
      {
        type: "mcq",
        question: "The brown deposit formed on the zinc granules is:",
        options: [
          "Zinc oxide",
          "Copper metal",
          "Iron",
          "Sulphur"
        ],
        correct: 1,
        hint: "Copper is displaced from the solution and coats the zinc."
      },
      {
        type: "short",
        question: "Explain why the blue colour of the copper(II) sulphate solution fades during the reaction.",
        expected: "Cu²⁺ ions are removed from the solution as copper metal deposits on the zinc; the Zn²⁺ ions that replace them form a colourless zinc sulphate solution.",
        keywords: ["Cu²⁺", "removed", "deposits", "colourless"],
        marks: 2
      }
    ]
  },

  /* --- M7.6: Displacement — Q3 --- */
  {
    id: "PBA_M76_Q3",
    experimentId: "M7_6",
    section: "B",
    title: "Displacement Reaction — Predictions",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "After the reaction, the solution contains:",
        options: [
          "Copper(II) sulphate",
          "Zinc sulphate (ZnSO₄)",
          "Sodium sulphate",
          "Unchanged copper(II) sulphate only"
        ],
        correct: 1,
        hint: "Zinc takes copper's place in the sulphate."
      },
      {
        type: "mcq",
        question: "If copper strips are placed in zinc sulphate solution, no reaction occurs because:",
        options: [
          "Copper is less reactive than zinc",
          "Copper is more reactive than zinc",
          "The solution is too cold",
          "Copper does not react with any sulphate"
        ],
        correct: 0,
        hint: "A less reactive metal cannot displace a more reactive one."
      },
      {
        type: "short",
        question: "Predict what is observed if magnesium ribbon is used instead of zinc with copper(II) sulphate solution, and explain.",
        expected: "Magnesium is more reactive than zinc, so it also displaces copper; the reaction is more vigorous, the brown copper deposit still forms and the blue colour fades faster.",
        keywords: ["more reactive", "vigorous", "displaces", "magnesium"],
        marks: 2
      }
    ]
  },

  /* --- M7.7: Water Test — Q2 --- */
  {
    id: "PBA_M77_Q2",
    experimentId: "M7_7",
    section: "B",
    title: "Water Test — Procedure & Reversibility",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "CuSO₄·5H₂O is described as:",
        options: [
          "Anhydrous copper(II) sulphate",
          "Hydrated copper(II) sulphate",
          "Copper metal",
          "Copper hydroxide"
        ],
        correct: 1,
        hint: "The 5H₂O shows that water molecules are part of the crystal."
      },
      {
        type: "mcq",
        question: "Water of crystallisation can be driven off from the blue crystals by:",
        options: [
          "Adding more water",
          "Heating the crystals",
          "Cooling the crystals in ice",
          "Dissolving them in oil"
        ],
        correct: 1,
        hint: "Heating reverses the change, leaving white anhydrous CuSO₄."
      },
      {
        type: "short",
        question: "Why must the anhydrous copper(II) sulphate powder be completely dry before starting the test?",
        expected: "If the powder already contains moisture it will already be blue or turn blue with any liquid, giving a false positive and hiding the presence (or absence) of water in the sample.",
        keywords: ["dry", "false", "already", "moisture"],
        marks: 2
      }
    ]
  },

  /* --- M7.7: Water Test — Q3 --- */
  {
    id: "PBA_M77_Q3",
    experimentId: "M7_7",
    section: "B",
    title: "Water Test — Interpreting the Result",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "When water is added to anhydrous CuSO₄ the colour change white → blue is a:",
        options: [
          "Physical change only",
          "Chemical change in which a new hydrated compound forms",
          "Change caused by lighting",
          "Change caused by pressure"
        ],
        correct: 1,
        hint: "CuSO₄·5H₂O is a new compound with different properties."
      },
      {
        type: "mcq",
        question: "If the white powder stays white after adding the liquid, the correct conclusion is that:",
        options: [
          "The liquid contains water",
          "The liquid is free from water (no water present)",
          "The powder has expired",
          "The test needs heating"
        ],
        correct: 1,
        hint: "No colour change means no water reacted with the powder."
      },
      {
        type: "short",
        question: "Describe the test for water using anhydrous copper(II) sulphate, from start to conclusion.",
        expected: "Place some white anhydrous CuSO₄ on a watch glass, add a few drops of the liquid, and observe: if the powder turns blue, water is present in the liquid.",
        keywords: ["white", "drops", "blue", "watch glass"],
        marks: 2
      }
    ]
  },

  /* --- M7.8: Water Purity — Q2 --- */
  {
    id: "PBA_M78_Q2",
    experimentId: "M7_8",
    section: "B",
    title: "Water Purity — Standard Values",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "Pure water at standard atmospheric pressure melts at:",
        options: [
          "0°C",
          "100°C",
          "50°C",
          "25°C"
        ],
        correct: 0,
        hint: "The standard melting point of pure water is 0°C."
      },
      {
        type: "mcq",
        question: "Dissolved impurities in a water sample generally cause its boiling point to:",
        options: [
          "Fall below 100°C",
          "Rise above 100°C",
          "Stay exactly at 100°C always",
          "Become equal to the melting point"
        ],
        correct: 1,
        hint: "Impurities raise the boiling point of a liquid."
      },
      {
        type: "short",
        question: "A water sample boils at 100°C but melts at 5°C. What can you conclude about its purity?",
        expected: "The melting point deviation from 0°C shows the sample contains impurities, even though the boiling point appears normal; purity must be judged from both measurements together.",
        keywords: ["impure", "melting", "deviation", "both"],
        marks: 2
      }
    ]
  },

  /* --- M7.8: Water Purity — Q3 --- */
  {
    id: "PBA_M78_Q3",
    experimentId: "M7_8",
    section: "B",
    title: "Water Purity — Pressure & Reliability",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "The boiling point of water is quoted at a fixed pressure of:",
        options: [
          "0 atm",
          "1 standard atmosphere",
          "10 atm",
          "Any pressure gives 100°C"
        ],
        correct: 1,
        hint: "Boiling point depends on external pressure; standard is 1 atm."
      },
      {
        type: "mcq",
        question: "A water sample boils at 98°C instead of 100°C. The most likely explanation is:",
        options: [
          "The water contains dissolved impurities (which would raise the boiling point)",
          "The atmospheric pressure is below the standard value",
          "The thermometer is reading far too high",
          "The sample was heated too quickly"
        ],
        correct: 1,
        hint: "Lower external pressure lowers the boiling point; impurities would raise it."
      },
      {
        type: "short",
        question: "Explain why boiling point alone may not be sufficient to assess the purity of a water sample.",
        expected: "The boiling point also depends on the atmospheric pressure, so it can be affected by conditions other than purity; the melting point should be measured as well and both values compared with the standard values.",
        keywords: ["pressure", "both", "melting", "reliable"],
        marks: 2
      }
    ]
  },

  /* ============================================================
     M7.5 — Boiling Point of Ethyl Alcohol (practical had no
     PBA questions before; added from experiments.js M7_5)
     ============================================================ */

  {
    id: "PBA_M75_Q1",
    experimentId: "M7_5",
    section: "B",
    title: "Boiling Point of Ethyl Alcohol — Apparatus",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "During the determination, the thermometer bulb is placed at the flask neck to measure:",
        options: [
          "The temperature of the liquid only",
          "The temperature of the vapour just as it distils",
          "The temperature of the Bunsen flame",
          "The temperature of the room"
        ],
        correct: 1,
        hint: "The boiling point is the temperature of the vapour in equilibrium with the liquid."
      },
      {
        type: "mcq",
        question: "Boiling chips are added to the flask before heating in order to:",
        options: [
          "Prevent bumping (violent uneven boiling)",
          "Raise the boiling point",
          "Colour the alcohol",
          "Absorb the vapour"
        ],
        correct: 0,
        hint: "Boiling chips give nucleation sites for smooth boiling."
      },
      {
        type: "short",
        question: "State the approximate boiling point of pure ethyl alcohol and compare it with that of water.",
        expected: "Pure ethyl alcohol boils at about 78°C, which is lower than the boiling point of water (100°C).",
        keywords: ["78", "lower", "water", "boils"],
        marks: 2
      }
    ]
  },

  {
    id: "PBA_M75_Q2",
    experimentId: "M7_5",
    section: "B",
    title: "Boiling Point of Ethyl Alcohol — Recording & Errors",
    marks: 4,
    parts: [
      {
        type: "mcq",
        question: "If the thermometer bulb touches the liquid in the flask, the recorded temperature will be:",
        options: [
          "Lower than the true boiling point of the vapour",
          "Higher than the true vapour temperature, giving an inaccurate reading",
          "Unaffected",
          "Exactly 100°C"
        ],
        correct: 1,
        hint: "The bulb must measure the vapour, not the heated liquid."
      },
      {
        type: "mcq",
        question: "The purpose of the condenser in this set-up is to:",
        options: [
          "Cool the vapour so it condenses back into liquid",
          "Heat the alcohol faster",
          "Measure the volume of the alcohol",
          "Hold the thermometer in place"
        ],
        correct: 0,
        hint: "Condensers turn vapour back into liquid."
      },
      {
        type: "short",
        question: "Why is the temperature recorded when it remains steady during boiling?",
        expected: "A pure liquid boils at a fixed temperature; while it boils the temperature stays constant, so a steady reading gives an accurate boiling point.",
        keywords: ["constant", "fixed", "steady", "boils"],
        marks: 2
      }
    ]
  }
];

/* ================================================================
   ChemSim — script.js
   Milestone 3: Fractional Distillation + Paper Chromatography
   ================================================================ */

/* ==============================================================
   SECTION 1: EXPERIMENT DATA
   Authoritative FBISE practical data — separate from simulation.
   ============================================================== */

var EXPERIMENTS = [
  {
    id: "A1",
    title: "Separate mixture of water and alcohols by fractional distillation",
    section: "major",
    slos: ["C-09-F-12", "C-09-F-13"],
    objective:
      "To separate a mixture of water and alcohols by fractional distillation and identify the distillate collected at the lower boiling point.",
    apparatus: [
      { name: "Round-bottom flask (250 mL)", desc: "To hold the water-alcohol mixture" },
      { name: "Fractionating column", desc: "Packed column to improve separation efficiency" },
      { name: "Thermometer", desc: "To monitor the vapour temperature at the column head" },
      { name: "Condenser", desc: "To cool and condense the alcohol vapour" },
      { name: "Receiving flask", desc: "To collect the distillate" },
      { name: "Bunsen burner / heating mantle", desc: "To provide controlled heating" },
      { name: "Retort stand and clamps", desc: "To support the apparatus" },
      { name: "Glass beads / porcelain chips", desc: "Packing material for the fractionating column" }
    ],
    materials: [
      { name: "Given mixture of water and alcohol", type: "sample" },
      { name: "Ice (optional, for cooling)", type: "other" }
    ],
    procedure: [
      "Assemble the fractional distillation apparatus: round-bottom flask, fractionating column, thermometer at the column head, condenser, and receiving flask.",
      "Ensure all glassware joints are secure and the condenser water supply is connected.",
      "Pour the water-alcohol mixture into the round-bottom flask. Add a few boiling chips to prevent bumping.",
      "Position the thermometer bulb at the branch of the fractionating column to measure vapour temperature.",
      "Begin heating the round-bottom flask gently and steadily.",
      "Observe the temperature reading as heating continues. The temperature will rise and then stabilise when the lower-boiling component begins to distil.",
      "Collect the first fraction of distillate when the temperature stabilises.",
      "Record the temperature at which the distillate is collected.",
      "Continue heating. Note any change in temperature as the second component begins to distil.",
      "Stop heating when sufficient distillate has been collected or when the temperature rises significantly.",
      "Allow the apparatus to cool before disassembly.",
      "Record your observations and interpret the results."
    ],
    observations: {
      note: "Record the temperature at which the first fraction distils and the volume collected.",
      fields: [
        { id: "initialTemp", label: "Initial temperature (°C)", type: "number" },
        { id: "firstFracTemp", label: "Temperature at which first fraction distils (°C)", type: "number" },
        { id: "distillateVol", label: "Volume of distillate collected (mL)", type: "number" }
      ]
    },
    calculations: [],
    result: {
      note: "The lower-boiling component (alcohol) distils first at a lower temperature, while water remains in the flask."
    },
    conclusion: {
      note: "State whether the mixture was separated successfully by fractional distillation. Identify which component distilled first."
    },
    stages: [
      "select", "objective", "apparatus", "prepare", "setUp",
      "checkSetup", "startHeating", "monitor", "observe",
      "collect", "record", "interpret", "conclude", "complete"
    ]
  },
  {
    id: "A2",
    title: "Separate given mixture of inks by paper chromatography",
    section: "major",
    slos: ["C-09-F-17"],
    objective:
      "To separate a given mixture of inks by paper chromatography and determine the number of components present.",
    apparatus: [
      { name: "Chromatography paper", desc: "Filter paper strip (approx. 15 cm x 3 cm)" },
      { name: "Beaker (250 mL)", desc: "To hold the chromatography solvent" },
      { name: "Pencil", desc: "To draw the baseline — ink must not be used for the baseline" },
      { name: "Capillary tube", desc: "To apply a small, concentrated spot of ink on the baseline" },
      { name: "Ruler", desc: "To measure distances from the baseline to each spot and to the solvent front" },
      { name: "Cover / watch glass", desc: "To cover the beaker during development" }
    ],
    materials: [
      { name: "Given ink mixture (sample)", type: "sample" },
      { name: "Chromatography solvent (water or appropriate solvent)", type: "solvent" }
    ],
    procedure: [
      "Draw a pencil line approximately 2 cm from the bottom edge of the chromatography paper. This is the baseline.",
      "Using the capillary tube, apply a small, concentrated spot of the ink mixture at the centre of the baseline.",
      "Allow the spot to dry completely. Repeat spotting if necessary to ensure sufficient sample.",
      "Pour a small amount of solvent into the beaker. The depth should be less than the distance from the baseline to the bottom of the paper.",
      "Carefully lower the paper into the beaker so that the solvent level is below the baseline. Ensure the paper does not touch the walls of the beaker.",
      "Cover the beaker with a watch glass or lid. Allow the solvent to rise up the paper by capillary action.",
      "When the solvent front is approximately 1 cm from the top of the paper, remove the paper carefully.",
      "Mark the position of the solvent front immediately with a pencil before it dries.",
      "Allow the chromatogram to dry.",
      "Measure the distance from the baseline to each separated spot using a ruler.",
      "Measure the distance from the baseline to the solvent front.",
      "Calculate the Retention factor (Rf) for each component: Rf = (distance travelled by component) / (distance travelled by solvent front)."
    ],
    observations: {
      note: "Record the colours, number of spots, and their distances from the baseline.",
      fields: [
        { id: "numComponents", label: "Number of components separated", type: "number" },
        { id: "solventFrontDist", label: "Distance from baseline to solvent front (cm)", type: "number" }
      ],
      componentFields: [
        { id: "spotColour", label: "Spot colour", type: "text" },
        { id: "spotDist", label: "Distance from baseline to spot (cm)", type: "number" }
      ]
    },
    calculations: [
      "Rf = Distance traveled by component / Distance traveled by solvent front",
      "Note: Rf values are dimensionless and range between 0 and 1."
    ],
    result: {
      note: "State the number of components identified in the ink mixture and their Rf values."
    },
    conclusion: {
      note: "State whether the ink mixture was separated successfully. List the components identified."
    },
    stages: [
      "select", "objective", "apparatus", "prepare", "baseline",
      "sample", "setup", "run", "observe", "markFront",
      "measure", "calculate", "interpret", "conclude", "complete"
    ]
  },
  {
    id: "A3",
    title: "Separate Pb²⁺ and Cd²⁺ ions by paper chromatography",
    section: "major",
    slos: ["C-09-F-18", "C-09-F-19", "C-09-F-20"],
    objective:
      "To separate Pb²⁺ and Cd²⁺ ions by paper chromatography and identify the separated components.",
    apparatus: [
      { name: "Chromatography paper", desc: "Filter paper strip (approx. 15 cm x 3 cm)" },
      { name: "Beaker (250 mL)", desc: "To hold the chromatography solvent" },
      { name: "Pencil", desc: "To draw the baseline — ink must not be used for the baseline" },
      { name: "Capillary tube", desc: "To apply a small, concentrated spot of the ion mixture on the baseline" },
      { name: "Ruler", desc: "To measure distances from the baseline to each spot and to the solvent front" },
      { name: "Cover / watch glass", desc: "To cover the beaker during development" }
    ],
    materials: [
      { name: "Pb²⁺ ion solution (sample)", type: "sample" },
      { name: "Cd²⁺ ion solution (sample)", type: "sample" },
      { name: "Chromatography solvent", type: "solvent" }
    ],
    procedure: [
      "Draw a pencil line approximately 2 cm from the bottom edge of the chromatography paper. This is the baseline.",
      "Using the capillary tube, apply a small, concentrated spot of the Pb²⁺/Cd²⁺ ion mixture at the centre of the baseline.",
      "Allow the spot to dry completely. Repeat spotting if necessary to ensure sufficient sample.",
      "Pour a small amount of solvent into the beaker. The depth should be less than the distance from the baseline to the bottom of the paper.",
      "Carefully lower the paper into the beaker so that the solvent level is below the baseline. Ensure the paper does not touch the walls of the beaker.",
      "Cover the beaker with a watch glass or lid. Allow the solvent to rise up the paper by capillary action.",
      "When the solvent front is approximately 1 cm from the top of the paper, remove the paper carefully.",
      "Mark the position of the solvent front immediately with a pencil before it dries.",
      "Allow the chromatogram to dry.",
      "Identify the separated ion spots using the simulation colour information.",
      "Measure the distance from the baseline to each separated spot using a ruler.",
      "Measure the distance from the baseline to the solvent front.",
      "Calculate the Retention factor (Rf) for each component: Rf = (distance travelled by component) / (distance travelled by solvent front)."
    ],
    observations: {
      note: "Record the number of separated spots, their distances from the baseline, and the solvent front distance.",
      fields: [
        { id: "numComponents", label: "Number of components separated", type: "number" },
        { id: "solventFrontDist", label: "Distance from baseline to solvent front (cm)", type: "number" }
      ],
      componentFields: [
        { id: "spotColour", label: "Spot colour", type: "text" },
        { id: "spotDist", label: "Distance from baseline to spot (cm)", type: "number" }
      ]
    },
    calculations: [
      "Rf = Distance traveled by component / Distance traveled by solvent front",
      "Note: Rf values are dimensionless and range between 0 and 1."
    ],
    result: {
      note: "State the number of ions identified and their Rf values."
    },
    conclusion: {
      note: "State whether the Pb²⁺ and Cd²⁺ ions were separated successfully. List the ions identified."
    },
    stages: [
      "select", "objective", "apparatus", "prepare", "baseline",
      "sample", "setup", "run", "observe", "markFront",
      "measure", "calculate", "interpret", "conclude", "complete"
    ]
  },
  {
    id: "A4",
    title: "Determine the exact molarity of the NaOH solution Volumetrically",
    section: "Major Practical",
    slos: ["C-10-B-13", "C-09-F-04", "C-09-F-09"],
    objective:
      "To determine the exact molarity of a NaOH solution by titrating it against a standard HCl solution of known concentration.",
    apparatus: [
      { name: "Burette (50 mL)", desc: "To deliver variable volumes of HCl solution accurately" },
      { name: "Volumetric pipette (25 mL)", desc: "To measure a fixed volume of NaOH solution into the conical flask" },
      { name: "Conical flask (250 mL)", desc: "To hold the NaOH solution during titration" },
      { name: "Retort stand and clamp", desc: "To hold the burette vertically" },
      { name: "White tile / white paper", desc: "Placed under the flask to see the colour change clearly" },
      { name: "Wash bottle", desc: "To rinse glassware with distilled water" },
      { name: "Beaker (250 mL)", desc: "To hold the HCl titrant solution" }
    ],
    materials: [
      { name: "Standardised HCl solution (0.1000 mol/L)", type: "titrant" },
      { name: "NaOH solution (concentration to be determined)", type: "sample" },
      { name: "Phenolphthalein indicator", type: "indicator" },
      { name: "Distilled water", type: "other" }
    ],
    procedure: [
      "Rinse the burette with the HCl solution, then fill it above the zero mark. Open the tap to remove air bubbles and adjust to exactly 0.00 mL.",
      "Rinse the volumetric pipette with the NaOH solution. Pipette 25.00 mL of NaOH solution into a clean conical flask.",
      "Add 2–3 drops of phenolphthalein indicator to the NaOH solution in the flask. The solution will be pink.",
      "Place the conical flask on a white tile under the burette.",
      "Slowly add HCl from the burette while swirling the flask. As the endpoint approaches, the pink colour will fade more slowly.",
      "At the endpoint, one extra drop of HCl causes the pink colour to disappear permanently. Record the final burette reading.",
      "Repeat the titration at least twice more until concordant results (within 0.10 mL) are obtained.",
      "Calculate the molarity of NaOH using: M(NaOH) × V(NaOH) = M(HCl) × V(HCl)."
    ],
    observations: {
      note: "Record initial and final burette readings and the titre volume for each trial.",
      fields: [
        { id: "initialReading", label: "Initial burette reading (mL)", type: "number" },
        { id: "finalReading", label: "Final burette reading (mL)", type: "number" },
        { id: "titre", label: "Titre / delivered volume (mL)", type: "number" },
        { id: "endpointObs", label: "Endpoint observation", type: "text" }
      ]
    },
    calculations: [
      "Titre = Final reading − Initial reading",
      "At the endpoint: moles NaOH = moles HCl (1:1 ratio)",
      "M(NaOH) × V(NaOH) = M(HCl) × V(HCl)",
      "M(NaOH) = [M(HCl) × V(HCl)] / V(NaOH)"
    ],
    result: {
      note: "The molarity of the NaOH solution calculated from the mean titre of concordant results."
    },
    conclusion: {
      note: "State the determined molarity of the NaOH solution and comment on the accuracy and concordance of your results."
    },
    stages: [
      "select", "objective", "apparatus", "prepare", "fillBurette",
      "measureSample", "titrate", "endpoint", "record",
      "calculate", "interpret", "conclude", "complete"
    ]
  },
  {
    id: "A5",
    title: "Detection and confirmation of gases: NH₃, CO₂, Cl₂",
    section: "Major Practical",
    slos: ["C-09-F-15", "C-09-10-G-10"],
    objective:
      "To detect and confirm the presence of NH₃, CO₂, and Cl₂ gases using appropriate chemical tests.",
    apparatus: [
      { name: "Test tubes (3)", desc: "To hold gas samples for testing" },
      { name: "Gas jar", desc: "To collect and hold gas for delivery" },
      { name: "Delivery tube", desc: "To direct gas from jar to test tube" },
      { name: "Bunsen burner (optional)", desc: "For gentle warming if needed" },
      { name: "Test tube holder", desc: "To hold test tubes during testing" },
      { name: "Wash bottle", desc: "To moisten litmus paper with distilled water" }
    ],
    materials: [
      { name: "NH₃ gas sample", type: "sample" },
      { name: "CO₂ gas sample", type: "sample" },
      { name: "Cl₂ gas sample", type: "sample" },
      { name: "Damp red litmus paper", type: "indicator" },
      { name: "Limewater (calcium hydroxide solution)", type: "reagent" },
      { name: "Damp litmus paper (both red and blue)", type: "indicator" },
      { name: "Distilled water", type: "other" }
    ],
    procedure: [
      "For NH₃: Hold damp red litmus paper near the gas. Observe the colour change.",
      "For CO₂: Bubble the gas through limewater. Observe any change in the limewater.",
      "For Cl₂: Hold damp litmus paper near the gas. Observe the bleaching effect.",
      "Record the observation for each gas test.",
      "Interpret the evidence and confirm the identity of each gas."
    ],
    observations: {
      note: "Record the observation for each gas test.",
      fields: [
        { id: "nh3Obs", label: "NH₃ observation", type: "text" },
        { id: "co2Obs", label: "CO₂ observation", type: "text" },
        { id: "cl2Obs", label: "Cl₂ observation", type: "text" }
      ]
    },
    calculations: [],
    result: {
      note: "State the confirmation of each gas based on the test results."
    },
    conclusion: {
      note: "Write a conclusion summarising the detection and confirmation of all three gases."
    },
    stages: [
      "select", "objective", "apparatus", "prepare", "selectGas",
      "selectTest", "performTest", "observe", "record",
      "interpret", "confirm", "nextGas", "summary", "conclude", "complete"
    ]
  },
  {
    id: "M7_1",
    title: "Separate naphthalene from given mixture of sand and salt by sublimation",
    section: "Minor Practical",
    slos: ["C-10-B-08", "C-09-10-G-13"],
    objective: "To separate naphthalene from a given mixture of sand and salt by sublimation.",
    apparatus: [
      { name: "Evaporating dish", desc: "To hold the mixture during heating" },
      { name: "Bunsen burner", desc: "To provide heat for sublimation" },
      { name: "Funnel (inverted)", desc: "To collect sublimed naphthalene vapour" },
      { name: "Filter paper", desc: "To line the funnel for collection" },
      { name: "Tripod stand and gauze", desc: "To support the evaporating dish" },
      { name: "Glass rod", desc: "To stir the mixture if needed" }
    ],
    materials: [
      { name: "Given mixture of naphthalene, sand, and salt", type: "sample" }
    ],
    procedure: [
      "Place the given mixture in the evaporating dish.",
      "Cover the dish with an inverted funnel lined with filter paper.",
      "Heat the dish gently using a Bunsen burner.",
      "Observe the sublimation process as naphthalene vapour rises and condenses on the funnel.",
      "Allow the apparatus to cool.",
      "Examine the sublimate collected on the funnel and the residue in the dish.",
      "Record your observations."
    ],
    observations: { note: "Record observations of the sublimation process and the separated components.", fields: [] },
    calculations: [],
    result: { note: "Naphthalene sublimes and is collected on the funnel; sand and salt remain in the dish." },
    conclusion: { note: "State whether the separation was successful and identify the components." },
    stages: ["select", "objective", "apparatus", "prepare", "heat", "observe", "collect", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_2",
    title: "Identify Na⁺, K⁺, Ca²⁺, Cu²⁺, Ba²⁺ by flame test",
    section: "Minor Practical",
    slos: ["C-09-F-16"],
    objective: "To identify Na⁺, K⁺, Ca²⁺, Cu²⁺, and Ba²⁺ ions by flame test.",
    apparatus: [
      { name: "Platinum/nichrome wire", desc: "To hold the ion sample in the flame" },
      { name: "Bunsen burner", desc: "To produce the flame for testing" },
      { name: "Concentrated HCl", desc: "To clean the wire between tests" },
      { name: "Watch glass", desc: "To hold small amounts of sample" }
    ],
    materials: [
      { name: "Na⁺ salt sample", type: "sample" },
      { name: "K⁺ salt sample", type: "sample" },
      { name: "Ca²⁺ salt sample", type: "sample" },
      { name: "Cu²⁺ salt sample", type: "sample" },
      { name: "Ba²⁺ salt sample", type: "sample" },
      { name: "Concentrated HCl", type: "reagent" }
    ],
    procedure: [
      "Clean the platinum wire by dipping in concentrated HCl and holding in the flame until no colour is observed.",
      "Dip the clean wire in the first salt sample and hold it in the Bunsen burner flame.",
      "Observe and record the flame colour.",
      "Repeat for each of the five ion samples, cleaning the wire between each test.",
      "Identify each ion based on its characteristic flame colour."
    ],
    observations: { note: "Record the flame colour observed for each ion.", fields: [] },
    calculations: [],
    result: { note: "Each ion produces a characteristic flame colour that allows identification." },
    conclusion: { note: "List all five ions and their identified flame colours." },
    stages: ["select", "objective", "apparatus", "prepare", "selectIon", "performTest", "observe", "record", "identify", "nextIon", "summary", "conclude", "complete"]
  },
  {
    id: "M7_3",
    title: "Prepare pure crystals CuSO₄·5H₂O",
    section: "Minor Practical",
    slos: ["C-09-F-12", "C-09-F-11"],
    objective: "To prepare pure crystals of copper(II) sulphate pentahydrate (CuSO₄·5H₂O).",
    apparatus: [
      { name: "Beaker (250 mL)", desc: "To dissolve the copper sulphate" },
      { name: "Glass rod", desc: "To stir during dissolving" },
      { name: "Bunsen burner", desc: "To heat the solution" },
      { name: "Tripod stand and gauze", desc: "To support the beaker" },
      { name: "Evaporating dish", desc: "For concentration by evaporation" },
      { name: "Filter paper and funnel", desc: "For filtration if needed" }
    ],
    materials: [
      { name: "Copper(II) sulphate (CuSO₄) powder", type: "sample" },
      { name: "Distilled water", type: "other" }
    ],
    procedure: [
      "Dissolve copper(II) sulphate powder in a minimum amount of warm distilled water.",
      "Filter the solution if impurities are present.",
      "Heat the solution to concentrate it by evaporation.",
      "Allow the solution to cool slowly for crystal formation.",
      "Observe the blue crystals of CuSO₄·5H₂O that form.",
      "Record your observations."
    ],
    observations: { note: "Record observations of the crystal formation process.", fields: [] },
    calculations: [],
    result: { note: "Blue crystals of CuSO₄·5H₂O are formed upon slow cooling." },
    conclusion: { note: "State whether pure crystals were obtained and describe their appearance." },
    stages: ["select", "objective", "apparatus", "prepare", "dissolve", "concentrate", "crystallize", "observe", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_4",
    title: "Determine melting point of Naphthalene",
    section: "Minor Practical",
    slos: ["C-09-F-14"],
    objective: "To determine the melting point of naphthalene.",
    apparatus: [
      { name: "Capillary tube", desc: "To hold the naphthalene sample" },
      { name: "Thermometer", desc: "To measure temperature" },
      { name: "Beaker with water", desc: "Water bath for gentle heating" },
      { name: "Bunsen burner", desc: "To heat the water bath" },
      { name: "Tripod stand", desc: "To support the beaker" }
    ],
    materials: [
      { name: "Naphthalene (pure)", type: "sample" },
      { name: "Distilled water", type: "other" }
    ],
    procedure: [
      "Pack a small amount of naphthalene into a capillary tube.",
      "Attach the capillary tube to a thermometer.",
      "Place both in a water bath and heat gently.",
      "Observe the temperature at which naphthalene begins to melt.",
      "Record the melting point.",
      "Repeat for accuracy."
    ],
    observations: { note: "Record the temperature at which naphthalene melts.", fields: [] },
    calculations: [],
    result: { note: "The melting point of naphthalene is observed at a specific temperature range." },
    conclusion: { note: "State the observed melting point and comment on purity." },
    stages: ["select", "objective", "apparatus", "prepare", "heat", "monitor", "observe", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_5",
    title: "Determine boiling point of Ethyl Alcohol",
    section: "Minor Practical",
    slos: ["C-09-F-14"],
    objective: "To determine the boiling point of ethyl alcohol (ethanol).",
    apparatus: [
      { name: "Round-bottom flask", desc: "To hold the ethyl alcohol" },
      { name: "Thermometer", desc: "To measure vapour temperature" },
      { name: "Condenser", desc: "To condense the vapour" },
      { name: "Bunsen burner", desc: "To heat the flask" },
      { name: "Retort stand and clamps", desc: "To support the apparatus" }
    ],
    materials: [
      { name: "Ethyl alcohol (ethanol)", type: "sample" },
      { name: "Boiling chips", type: "other" }
    ],
    procedure: [
      "Pour ethyl alcohol into the round-bottom flask with boiling chips.",
      "Set up the distillation apparatus with thermometer at the flask neck.",
      "Heat gently until boiling begins.",
      "Record the temperature at which boiling occurs.",
      "Repeat for accuracy."
    ],
    observations: { note: "Record the temperature at which ethyl alcohol boils.", fields: [] },
    calculations: [],
    result: { note: "The boiling point of ethyl alcohol is observed at a specific temperature." },
    conclusion: { note: "State the observed boiling point and comment on purity." },
    stages: ["select", "objective", "apparatus", "prepare", "heat", "monitor", "observe", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_6",
    title: "Demonstrate a metal displacement reaction in aqueous medium",
    section: "Minor Practical",
    slos: ["C-09-G-12"],
    objective: "To demonstrate a metal displacement reaction in aqueous medium.",
    apparatus: [
      { name: "Test tubes (2)", desc: "To hold the solutions" },
      { name: "Beaker", desc: "For waste disposal" },
      { name: "Tweezers/forceps", desc: "To handle metal pieces" }
    ],
    materials: [
      { name: "Zinc granules", type: "sample" },
      { name: "Copper(II) sulphate solution", type: "reagent" }
    ],
    procedure: [
      "Place copper(II) sulphate solution in a test tube.",
      "Add zinc granules to the solution.",
      "Observe the changes that occur.",
      "Record the colour change and any deposits formed.",
      "Interpret the displacement reaction."
    ],
    observations: { note: "Record observations of colour change and deposits.", fields: [] },
    calculations: [],
    result: { note: "Zinc displaces copper from copper(II) sulphate solution." },
    conclusion: { note: "Write the displacement reaction and explain the observation." },
    stages: ["select", "objective", "apparatus", "selectMaterials", "performReaction", "observe", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_7",
    title: "Investigate chemical tests for presence of water using anhydrous copper(II) sulfate",
    section: "Minor Practical",
    slos: ["C-09-10-G-12", "C-09-D-12"],
    objective: "To investigate chemical tests for the presence of water using anhydrous copper(II) sulfate.",
    apparatus: [
      { name: "Watch glass", desc: "To hold the anhydrous copper sulphate" },
      { name: "Dropper/pipette", desc: "To add water to the sample" }
    ],
    materials: [
      { name: "Anhydrous copper(II) sulphate (white powder)", type: "sample" },
      { name: "Distilled water", type: "other" }
    ],
    procedure: [
      "Place a small amount of anhydrous copper(II) sulphate on a watch glass.",
      "Observe the initial white colour.",
      "Add a few drops of distilled water.",
      "Observe the colour change.",
      "Record and interpret the result."
    ],
    observations: { note: "Record the colour change observed.", fields: [] },
    calculations: [],
    result: { note: "Anhydrous copper(II) sulphate turns blue in the presence of water." },
    conclusion: { note: "Explain how this test confirms the presence of water." },
    stages: ["select", "objective", "apparatus", "prepare", "selectSample", "performTest", "observe", "record", "interpret", "conclude", "complete"]
  },
  {
    id: "M7_8",
    title: "Test purity of water using melting point and boiling point",
    section: "Minor Practical",
    slos: ["C-09-D-13", "C-09-D-14", "C-09-F-14"],
    objective: "To test the purity of water using melting point and boiling point determination.",
    apparatus: [
      { name: "Capillary tube", desc: "For melting point test" },
      { name: "Thermometer", desc: "To measure temperature" },
      { name: "Beaker with water", desc: "Water bath" },
      { name: "Bunsen burner", desc: "To heat" },
      { name: "Round-bottom flask", desc: "For boiling point test" },
      { name: "Condenser", desc: "To condense vapour" }
    ],
    materials: [
      { name: "Ice (for melting point)", type: "sample" },
      { name: "Water sample (for boiling point)", type: "sample" }
    ],
    procedure: [
      "Melting Point: Determine the melting point of ice using a capillary tube and water bath.",
      "Record the melting point temperature.",
      "Boiling Point: Determine the boiling point of the water sample using distillation apparatus.",
      "Record the boiling point temperature.",
      "Compare results with known pure water values (0°C melting, 100°C boiling).",
      "Interpret the purity based on the results."
    ],
    observations: { note: "Record melting point and boiling point data.", fields: [] },
    calculations: [],
    result: { note: "Pure water melts at 0°C and boils at 100°C at standard pressure." },
    conclusion: { note: "State whether the water sample is pure based on the melting and boiling point data." },
    stages: ["select", "objective", "apparatus", "prepare", "meltingPointTest", "recordMP", "boilingPointTest", "recordBP", "interpret", "conclude", "complete"]
  }
];

/* ==============================================================
   SECTION 2: SIMULATION DATA
   Clearly identified as SIMULATED EDUCATIONAL VALUES.
   These are NOT real laboratory measurements or FBISE data.
   ============================================================== */

var SIMULATION_CONFIG = {
  "A2": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    paper: {
      width: 160,
      height: 420,
      baselineY: 350,
      topY: 20
    },
    solventFrontMaxDist: 330,
    animationDurationMs: 4500,
    components: [
      { name: "Component A", color: "#cc0000", relativeRate: 0.78 },
      { name: "Component B", color: "#0044cc", relativeRate: 0.45 }
    ]
  },
  "A3": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    paper: {
      width: 160,
      height: 420,
      baselineY: 350,
      topY: 20
    },
    solventFrontMaxDist: 330,
    animationDurationMs: 4500,
    components: [
      { name: "Pb²⁺ (Lead ion)", color: "#b8860b", relativeRate: 0.82 },
      { name: "Cd²⁺ (Cadmium ion)", color: "#cc44cc", relativeRate: 0.55 }
    ]
  },
  "A1": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    animationDurationMs: 6000,
    heatingDurationMs: 2000,
    firstFraction: {
      name: "Alcohol (ethanol)",
      boilingPoint: 78,
      color: "rgba(200, 220, 255, 0.6)"
    },
    secondFraction: {
      name: "Water",
      boilingPoint: 100,
      color: "rgba(180, 210, 240, 0.4)"
    },
    initialTemp: 25,
    flask: {
      x: 200, y: 350, width: 100, height: 80
    },
    column: {
      x: 230, y: 180, width: 40, height: 170
    },
    condenser: {
      x: 310, y: 180, width: 120, height: 25
    },
    receiver: {
      x: 420, y: 260, width: 60, height: 80
    }
  },
  "A4": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    hclConcentration: 0.1000,
    naohVolume: 25.00,
    endpointVolume: 23.50,
    endpointTolerance: 0.20,
    trials: [
      { initial: 0.00, final: 23.50, titre: 23.50 },
      { initial: 0.00, final: 23.40, titre: 23.40 },
      { initial: 0.00, final: 23.45, titre: 23.45 }
    ],
    meanTitre: 23.45,
    expectedMolarity: 0.0938,
    burette: { x: 180, y: 60, width: 22, height: 340, maxML: 50 },
    flask: { x: 160, y: 420, width: 80, height: 90 },
    stand: { x: 170, y: 40, width: 8, height: 480 },
    clamp: { x: 168, y: 180, width: 50, height: 10 }
  },
  "A5": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    gases: [
      {
        id: "NH3",
        name: "NH₃",
        fullName: "Ammonia",
        correctTest: "damp_red_litmus",
        correctTestLabel: "Damp red litmus",
        testOptions: [
          { id: "damp_red_litmus", label: "Damp red litmus paper" },
          { id: "limewater", label: "Limewater" },
          { id: "damp_blue_litmus", label: "Damp blue litmus paper" }
        ],
        observedChange: "Red litmus turns blue",
        colour: "#3366cc",
        litmusColourAfter: "#3366cc",
        explanation: "NH₃ is alkaline — it turns damp red litmus blue."
      },
      {
        id: "CO2",
        name: "CO₂",
        fullName: "Carbon dioxide",
        correctTest: "limewater",
        correctTestLabel: "Limewater",
        testOptions: [
          { id: "damp_red_litmus", label: "Damp red litmus paper" },
          { id: "limewater", label: "Limewater" },
          { id: "damp_blue_litmus", label: "Damp blue litmus paper" }
        ],
        observedChange: "Limewater turns milky/cloudy",
        colour: "#cccccc",
        limeColourAfter: "#e8e8e0",
        explanation: "CO₂ reacts with limewater to form insoluble calcium carbonate, turning it milky."
      },
      {
        id: "Cl2",
        name: "Cl₂",
        fullName: "Chlorine",
        correctTest: "damp_litmus",
        correctTestLabel: "Damp litmus",
        testOptions: [
          { id: "damp_red_litmus", label: "Damp red litmus paper" },
          { id: "limewater", label: "Limewater" },
          { id: "damp_litmus", label: "Damp litmus paper" }
        ],
        observedChange: "Litmus is bleached white",
        colour: "#88cc44",
        litmusColourAfter: "#f0f0e0",
        explanation: "Cl₂ is a bleaching agent — it bleaches damp litmus paper white."
      }
    ]
  },
  "M7_1": {
    label: "SIMULATED EDUCATIONAL VALUES",
    heatDurationMs: 3000,
    naphthaleneSublimes: true
  },
  "M7_2": {
    label: "SIMULATED EDUCATIONAL VALUES",
    ions: [
      { id: "Na", name: "Na⁺", flameColour: "Yellow", flameHex: "#ffcc00" },
      { id: "K", name: "K⁺", flameColour: "Lilac/Violet", flameHex: "#cc66ff" },
      { id: "Ca", name: "Ca²⁺", flameColour: "Brick red", flameHex: "#cc4422" },
      { id: "Cu", name: "Cu²⁺", flameColour: "Blue-green", flameHex: "#22aa66" },
      { id: "Ba", name: "Ba²⁺", flameColour: "Apple green", flameHex: "#66cc22" }
    ]
  },
  "M7_3": {
    label: "SIMULATED EDUCATIONAL VALUES",
    crystalColour: "#3366cc",
    dissolveDurationMs: 2000,
    crystallizeDurationMs: 3000
  },
  "M7_4": {
    label: "SIMULATED EDUCATIONAL VALUES",
    expectedMeltingPoint: 80.26,
    heatDurationMs: 4000
  },
  "M7_5": {
    label: "SIMULATED EDUCATIONAL VALUES",
    expectedBoilingPoint: 78.37,
    heatDurationMs: 4000
  },
  "M7_6": {
    label: "SIMULATED EDUCATIONAL VALUES",
    metal1: "Zn",
    metal2: "Cu",
    solution1Colour: "#3366cc",
    solution2Colour: "#cc6622",
    reactionDurationMs: 2500
  },
  "M7_7": {
    label: "SIMULATED EDUCATIONAL VALUES",
    initialColour: "#f0f0f0",
    finalColour: "#3366cc",
    testDurationMs: 1500
  },
  "M7_8": {
    label: "SIMULATED EDUCATIONAL VALUES",
    expectedMP: 0,
    expectedBP: 100,
    mpDurationMs: 3000,
    bpDurationMs: 3000
  }
};

/* ==============================================================
   SECTION 3: STATE
   ============================================================== */

var state = {
  currentStage: "select",
  selectedExperimentId: null,
  experiment: null,
  simulation: null,
  baselineDrawn: false,
  sampleApplied: false,
  solventPositioned: false,
  solventFrontMarked: false,
  paperInBeaker: false,
  measurePhase: "idle",
  measuredComponents: [],
  measuredSolventFront: false,
  solventFrontDist: 0,
  rfAnswers: {},
  interpretation: "",
  conclusion: "",
  prepareTool: null,
  feedback: "",
  distSetupComplete: false,
  distThermometerOk: false,
  distCondenserOk: false,
  distHeating: false,
  distTemperature: 25,
  distPhase: "idle",
  distCollected: false,
  distObservations: "",
  titrationRinseDone: false,
  titrationApparatusChoice1: null,
  titrationApparatusChoice2: null,
  titrationBuretteFilled: false,
  titrationSampleMeasured: false,
  titrationVolume: 0,
  titrationEndpointReached: false,
  titrationEndpointPassed: false,
  titrationReadingRecorded: false,
  titrationTrialIndex: 0,
  titrationTrials: [],
  titrationCalcAnswer: "",
  titrationCalcChecked: false,
  gasCurrentIndex: 0,
  gasResults: {},
  gasTestPerformed: false,
  gasTestObserved: false,
  m7_ionIndex: 0,
  m7_ionResults: {},
  m7ActionDone: false,
  m7ObservationDone: false
};

/* ==============================================================
   SECTION 4: HELPERS — experiment-aware stages
   ============================================================== */

function getStages() {
  if (state.experiment && state.experiment.stages) {
    return state.experiment.stages;
  }
  return ["select"];
}

function stageIndex(name) {
  return getStages().indexOf(name);
}

function canGoBack() {
  return stageIndex(state.currentStage) > 0;
}

function canGoNext() {
  return stageIndex(state.currentStage) < getStages().length - 1;
}

function nextStage() {
  if (!canGoNext()) return;
  var stages = getStages();
  var idx = stageIndex(state.currentStage);
  state.currentStage = stages[idx + 1];
  state.feedback = "";
  renderCurrentStage();
}

function prevStage() {
  if (!canGoBack()) return;
  var stages = getStages();
  var idx = stageIndex(state.currentStage);
  state.currentStage = stages[idx - 1];
  state.feedback = "";
  renderCurrentStage();
}

/* ==============================================================
   SECTION 5: DOM
   ============================================================== */

var dom = {};

function cacheDom() {
  dom.practicalList = document.getElementById("practical-list");
  dom.stageTitle = document.getElementById("stage-title");
  dom.stageProgress = document.getElementById("stage-progress");
  dom.stageContent = document.getElementById("stage-content");
  dom.simulationArea = document.getElementById("simulation-area");
  dom.canvas = document.getElementById("sim-canvas");
  dom.ctx = dom.canvas.getContext("2d");
  dom.userInputArea = document.getElementById("user-input-area");
  dom.btnBack = document.getElementById("btn-back");
  dom.btnNext = document.getElementById("btn-next");
  dom.feedbackArea = document.getElementById("feedback-area");
}

/* ==============================================================
   SECTION 6: RENDERING
   ============================================================== */

function renderCurrentStage() {
  renderProgress();
  renderStageContent();
  renderSimulationArea();
  renderUserInput();
  renderFeedback();
  renderButtons();
  renderSidebarActive();
}

/* ── Progress dots ─────────────────────────────── */

function renderProgress() {
  var stages = getStages();
  var html = "";
  for (var i = 0; i < stages.length; i++) {
    var cls = "progress-dot";
    if (i < stageIndex(state.currentStage)) cls += " completed";
    if (i === stageIndex(state.currentStage)) cls += " active";
    html += '<span class="' + cls + '"></span>';
  }
  dom.stageProgress.innerHTML = html;
}

/* ── Sidebar ───────────────────────────────────── */

function renderSidebar() {
  var html = "";
  for (var i = 0; i < EXPERIMENTS.length; i++) {
    var exp = EXPERIMENTS[i];
    html += '<li data-id="' + exp.id + '">' + exp.id + ". " +
      capitalizeFirst(exp.section) + " — " + truncate(exp.title, 40) + "</li>";
  }
  dom.practicalList.innerHTML = html;
  var items = dom.practicalList.querySelectorAll("li");
  for (var j = 0; j < items.length; j++) {
    items[j].addEventListener("click", onPracticalSelect);
  }
}

function renderSidebarActive() {
  var items = dom.practicalList.querySelectorAll("li");
  for (var i = 0; i < items.length; i++) {
    if (items[i].getAttribute("data-id") === state.selectedExperimentId) {
      items[i].classList.add("active");
    } else {
      items[i].classList.remove("active");
    }
  }
}

/* ── Stage Content ─────────────────────────────── */

function renderStageContent() {
  var exp = state.experiment;
  var id = exp ? exp.id : "";
  var html = "";
  switch (state.currentStage) {
    case "select":       html = renderSelectContent(); break;
    case "objective":    html = renderObjectiveContent(exp); break;
    case "apparatus":    html = renderApparatusContent(exp); break;
    case "prepare":
      if (id === "A2" || id === "A3") html = renderPrepareChromContent(exp);
      else if (id === "A4") html = renderPrepareTitrationContent(exp);
      else if (id === "A5") html = renderPrepareGasContent(exp);
      else html = renderPrepareDistillContent(exp);
      break;
    case "baseline":     html = renderBaselineContent(exp); break;
    case "sample":       html = renderSampleContent(exp); break;
    case "setup":        html = renderSetupContent(exp); break;
    case "fillBurette":  html = renderFillBuretteContent(exp); break;
    case "measureSample": html = renderMeasureSampleContent(exp); break;
    case "setUp":        html = renderSetUpDistillContent(exp); break;
    case "checkSetup":   html = renderCheckSetupContent(exp); break;
    case "startHeating": html = renderStartHeatingContent(exp); break;
    case "monitor":      html = renderMonitorContent(exp); break;
    case "run":          html = renderRunContent(exp); break;
    case "observe":
      if (id === "A2" || id === "A3") html = renderObserveChromContent(exp);
      else if (id === "A5") html = renderGasObserveContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7ObserveContent(exp);
      else html = renderObserveDistillContent(exp);
      break;
    case "markFront":    html = renderMarkFrontContent(exp); break;
    case "collect":      html = renderCollectContent(exp); break;
    case "measure":      html = renderMeasureContent(exp); break;
    case "titrate":      html = renderTitrateContent(exp); break;
    case "endpoint":     html = renderEndpointContent(exp); break;
    case "calculate":
      if (id === "A4") html = renderCalculateTitrationContent(exp);
      else html = renderCalculateContent(exp);
      break;
    case "record":
      if (id === "A4") html = renderRecordTitrationContent(exp);
      else if (id === "A5") html = renderGasRecordContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7RecordContent(exp);
      else html = renderRecordContent(exp);
      break;
    case "interpret":
      if (id === "A2" || id === "A3") html = renderInterpretChromContent(exp);
      else if (id === "A4") html = renderInterpretTitrationContent(exp);
      else if (id === "A5") html = renderGasInterpretContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7InterpretContent(exp);
      else html = renderInterpretDistillContent(exp);
      break;
    case "conclude":
      if (id === "A2" || id === "A3") html = renderConcludeChromContent(exp);
      else if (id === "A4") html = renderConcludeTitrationContent(exp);
      else if (id === "A5") html = renderGasConcludeContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7ConcludeContent(exp);
      else html = renderConcludeDistillContent(exp);
      break;
    case "complete":
      if (id === "A2" || id === "A3") html = renderCompleteChromContent(exp);
      else if (id === "A4") html = renderCompleteTitrationContent(exp);
      else if (id === "A5") html = renderCompleteGasContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7CompleteContent(exp);
      else html = renderCompleteDistillContent(exp);
      break;
    case "selectGas":    html = renderSelectGasContent(exp); break;
    case "selectTest":   html = renderSelectTestContent(exp); break;
    case "performTest":  html = renderPerformTestContent(exp); break;
    case "confirm":      html = renderConfirmGasContent(exp); break;
    case "nextGas":      html = renderNextGasContent(exp); break;
    case "summary":      html = renderSummaryContent(exp); break;
    case "heat":         html = renderM7HeatContent(exp); break;
    case "collect":      html = renderM7CollectContent(exp); break;
    case "selectIon":    html = renderM7SelectIonContent(exp); break;
    case "identify":     html = renderM7IdentifyContent(exp); break;
    case "nextIon":      html = renderM7NextIonContent(exp); break;
    case "dissolve":     html = renderM7DissolveContent(exp); break;
    case "concentrate":  html = renderM7ConcentrateContent(exp); break;
    case "crystallize":  html = renderM7CrystallizeContent(exp); break;
    case "monitor":      if (id && id.indexOf("M7") === 0) html = renderM7MonitorContent(exp); else html = renderMonitorContent(exp); break;
    case "selectMaterials": html = renderM7SelectMaterialsContent(exp); break;
    case "performReaction": html = renderM7PerformReactionContent(exp); break;
    case "selectSample": html = renderM7SelectSampleContent(exp); break;
    case "meltingPointTest": html = renderM7MPTestContent(exp); break;
    case "recordMP":     html = renderM7RecordMPContent(exp); break;
    case "boilingPointTest": html = renderM7BPTestContent(exp); break;
    case "recordBP":     html = renderM7RecordBPContent(exp); break;
  }
  dom.stageContent.innerHTML = html;
}

/* ── Shared stage renderers ────────────────────── */

function renderSelectContent() {
  return '<h3>Select a Practical</h3>' +
    '<p>Choose an experiment from the sidebar to begin.</p>' +
    '<p><strong>Major Practicals:</strong></p><ul>' +
    '<li><strong>A1</strong> — Fractional Distillation</li>' +
    '<li><strong>A2</strong> — Paper Chromatography</li>' +
    '<li><strong>A3</strong> — Paper Chromatography (Pb²⁺ / Cd²⁺)</li>' +
    '<li><strong>A4</strong> — NaOH Molarity by Titration</li>' +
    '<li><strong>A5</strong> — Gas Detection (NH₃, CO₂, Cl₂)</li>' +
    '</ul>' +
    '<p><strong>Minor Practicals:</strong></p><ul>' +
    '<li><strong>M7.1</strong> — Sublimation (Naphthalene/Sand/Salt)</li>' +
    '<li><strong>M7.2</strong> — Flame Tests (5 Ions)</li>' +
    '<li><strong>M7.3</strong> — CuSO₄·5H₂O Crystals</li>' +
    '<li><strong>M7.4</strong> — Melting Point (Naphthalene)</li>' +
    '<li><strong>M7.5</strong> — Boiling Point (Ethyl Alcohol)</li>' +
    '<li><strong>M7.6</strong> — Metal Displacement</li>' +
    '<li><strong>M7.7</strong> — Water Test (Anhydrous CuSO₄)</li>' +
    '<li><strong>M7.8</strong> — Water Purity Test</li>' +
    '</ul>';
}

function renderObjectiveContent(exp) {
  if (!exp) return "";
  return '<h3>Objective</h3>' +
    '<p><span class="label">Practical</span>' + escapeHtml(exp.title) + '</p>' +
    '<p><span class="label">Section</span>' + capitalizeFirst(exp.section) + ' Practical</p>' +
    '<p><span class="label">SLO</span>' +
    exp.slos.map(function(s) { return '<span class="slo-tag">' + escapeHtml(s) + '</span>'; }).join("") +
    '</p>' +
    '<p style="margin-top:0.75rem;"><span class="label">Objective</span>' + escapeHtml(exp.objective) + '</p>';
}

function renderApparatusContent(exp) {
  if (!exp) return "";
  var html = '<h3>Apparatus & Materials</h3>';
  html += '<p class="label">Apparatus</p><ul>';
  for (var i = 0; i < exp.apparatus.length; i++) {
    var a = exp.apparatus[i];
    html += '<li><div class="apparatus-item">' +
      '<span class="apparatus-name">' + escapeHtml(a.name) + '</span>' +
      '<span class="apparatus-desc">' + escapeHtml(a.desc) + '</span>' +
      '</div></li>';
  }
  html += '</ul>';
  html += '<p class="label" style="margin-top:0.75rem;">Materials</p><ul>';
  for (var j = 0; j < exp.materials.length; j++) {
    var m = exp.materials[j];
    html += '<li>' + escapeHtml(m.name) +
      ' <span class="slo-tag">' + escapeHtml(m.type) + '</span></li>';
  }
  html += '</ul>';
  return html;
}

/* ── Chromatography stage renderers ────────────── */

function renderPrepareChromContent(exp) {
  if (!exp) return "";
  var html = '<h3>Prepare the Chromatography Paper</h3>';
  html += '<p>Before beginning, you need to select the correct tool for drawing the baseline.</p>';
  html += '<div class="interactive-prompt">';
  html += '<p class="label">Which tool should you use to draw the baseline?</p>';
  html += '<div class="tool-options">';
  html += '<button class="btn btn-tool" data-tool="pencil" id="btn-tool-pencil">Pencil</button>';
  html += '<button class="btn btn-tool" data-tool="pen" id="btn-tool-pen">Pen (ink)</button>';
  html += '</div>';
  if (state.prepareTool === "pen") {
    html += '<div class="feedback-incorrect">Incorrect. The baseline must be drawn with pencil, not pen. ' +
      'If you use pen, the ink will dissolve in the solvent and interfere with the chromatogram.</div>';
  }
  if (state.prepareTool === "pencil") {
    html += '<div class="feedback-correct">Correct. The baseline is drawn with pencil. ' +
      'Pencil (graphite) does not dissolve in the solvent and will not interfere with the chromatogram.</div>';
  }
  html += '</div>';
  html += '<div class="sim-note">In a real laboratory, always use pencil for chromatography baselines.</div>';
  return html;
}

function renderBaselineContent(exp) {
  if (!exp) return "";
  var html = '<h3>Draw the Baseline</h3>';
  html += '<p>Click on the chromatography paper to draw the baseline with pencil.</p>';
  html += '<p>The baseline should be a straight horizontal line near the bottom of the paper.</p>';
  if (state.baselineDrawn) {
    html += '<div class="feedback-correct">Baseline drawn with pencil.</div>';
  }
  html += '<div class="sim-note">Click on the paper in the simulation area to place the baseline.</div>';
  return html;
}

function renderSampleContent(exp) {
  if (!exp) return "";
  var html = '<h3>Apply the Ink Sample</h3>';
  html += '<p>Using the capillary tube, apply a small, concentrated spot of the ink mixture at the centre of the baseline.</p>';
  html += '<p>Click on the baseline (the pencil line) to place the ink spot.</p>';
  if (state.sampleApplied) {
    html += '<div class="feedback-correct">Sample applied at the centre of the baseline.</div>';
  }
  html += '<div class="sim-note">The spot should be small and concentrated.</div>';
  return html;
}

function renderSetupContent(exp) {
  if (!exp) return "";
  var html = '<h3>Set Up the Chromatography</h3>';
  html += '<p>Position the chromatography paper in the beaker with solvent.</p>';
  html += '<p>The key conditions:</p>';
  html += '<ul>';
  html += '<li>The solvent level must be <strong>below</strong> the baseline.</li>';
  html += '<li>The paper must not touch the walls of the beaker.</li>';
  html += '</ul>';
  html += '<p>Click <strong>Check Setup</strong> to verify the arrangement.</p>';
  if (state.feedback === "solvent_above_baseline") {
    html += '<div class="feedback-incorrect">The solvent level is above the baseline. Lower the solvent level below the baseline.</div>';
  }
  if (state.feedback === "setup_ok") {
    html += '<div class="feedback-correct">Setup verified. The solvent level is below the baseline.</div>';
  }
  html += '<div class="sim-note">Adjust the solvent slider to set the correct level.</div>';
  return html;
}

function renderRunContent(exp) {
  if (!exp) return "";
  var html = '<h3>Run the Chromatography</h3>';
  html += '<p>The solvent is rising through the paper by capillary action.</p>';
  html += '<p>Observe the ink components separating as the solvent front advances.</p>';
  if (state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Chromatography complete.</div>';
  }
  html += '<div class="sim-note">⚠ This is a simulated animation. Observed colours and distances are simulated educational values, not real laboratory measurements.</div>';
  return html;
}

function renderObserveChromContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var numComponents = sim ? sim.components.length : "—";
  var html = '<h3>Observe the Chromatogram</h3>';
  html += '<p>Examine the separated spots on the chromatogram.</p>';
  html += '<p class="label">Record your observation</p>';
  html += '<p>The ink mixture has separated into <strong>' + numComponents + ' distinct spots</strong>.</p>';
  html += '<div class="sim-note">The colours shown are simulated educational values.</div>';
  return html;
}

function renderMarkFrontContent(exp) {
  if (!exp) return "";
  var html = '<h3>Mark the Solvent Front</h3>';
  html += '<p>Click on the paper to mark the position of the solvent front.</p>';
  html += '<p>This should be done immediately after removing the paper from the beaker.</p>';
  if (state.solventFrontMarked) {
    html += '<div class="feedback-correct">Solvent front marked with pencil.</div>';
  }
  html += '<div class="sim-note">Click near the top of the wet area on the paper.</div>';
  return html;
}

function renderMeasureContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Measure Distances</h3>';
  html += '<p>Measure the distance from the baseline to each separated spot and to the solvent front.</p>';
  html += '<p>Click the points on the simulation to measure.</p>';
  html += '<div class="sim-note">Distances below are simulated educational values.</div>';
  if (state.measurePhase === "done") {
    html += '<table class="measure-table">';
    html += '<thead><tr><th>Component</th><th>Colour</th><th>Distance (cm)</th></tr></thead><tbody>';
    for (var i = 0; i < state.measuredComponents.length; i++) {
      var mc = state.measuredComponents[i];
      html += '<tr><td>' + escapeHtml(mc.name) + '</td>' +
        '<td><span class="color-swatch" style="background:' + mc.color + ';"></span></td>' +
        '<td>' + mc.distance.toFixed(2) + '</td></tr>';
    }
    html += '<tr style="font-weight:600;"><td>Solvent front</td><td>—</td><td>' +
      state.solventFrontDist.toFixed(2) + '</td></tr>';
    html += '</tbody></table>';
  }
  return html;
}

function renderCalculateContent(exp) {
  if (!exp) return "";
  var html = '<h3>Calculate Rf Values</h3>';
  html += '<p class="label">Formula</p>';
  html += '<p class="rf-formula">Rf = Distance traveled by component / Distance traveled by solvent front</p>';
  html += '<div class="sim-note">Enter your calculated Rf values below.</div>';
  var sim = SIMULATION_CONFIG[exp.id];
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Component</th><th>Colour</th><th>Distance (cm)</th><th>Solvent (cm)</th><th>Your Rf</th><th></th></tr></thead><tbody>';
  for (var i = 0; i < sim.components.length; i++) {
    var c = sim.components[i];
    var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
    var sDist = state.solventFrontDist || 0;
    var key = "rf_" + i;
    var userVal = state.rfAnswers[key] || "";
    html += '<tr><td>' + escapeHtml(c.name) + '</td>' +
      '<td><span class="color-swatch" style="background:' + c.color + ';"></span></td>' +
      '<td>' + dist.toFixed(2) + '</td><td>' + sDist.toFixed(2) + '</td>' +
      '<td><input type="number" step="0.01" min="0" max="1" data-rf-key="' + key + '" value="' + escapeHtml(String(userVal)) + '" class="rf-input"></td>' +
      '<td><span class="rf-feedback" id="rf-fb-' + key + '"></span></td></tr>';
  }
  html += '</tbody></table>';
  return html;
}

function renderInterpretChromContent(exp) {
  if (!exp) return "";
  var html = '<h3>Interpret the Chromatogram</h3>';
  html += '<p>Based on your observations and measurements, interpret the chromatogram.</p>';
  html += '<p class="label">Guiding question</p>';
  html += '<p>When the ink mixture separates into distinct spots, what does this tell you about the composition of the mixture?</p>';
  html += '<p style="margin-top:0.5rem;">Write your interpretation below:</p>';
  return html;
}

function renderConcludeChromContent(exp) {
  if (!exp) return "";
  var html = '<h3>Conclusion</h3>';
  html += '<p>Write your conclusion based on your observations, measurements, and interpretation.</p>';
  html += '<p>Your conclusion should address:</p>';
  html += '<ul>';
  html += '<li>Whether the ink mixture was separated successfully</li>';
  html += '<li>How many components were identified</li>';
  html += '<li>The Rf values of each component</li>';
  html += '</ul>';
  html += '<p style="margin-top:0.5rem;">Enter your conclusion below:</p>';
  return html;
}

function renderCompleteChromContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Experiment Complete</h3>';
  html += '<p class="label">Summary</p>';
  html += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
  html += '<p><strong>Section:</strong> ' + capitalizeFirst(exp.section) + ' Practical</p>';
  html += '<p><strong>SLO:</strong> ' + exp.slos.join(", ") + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>Components separated:</strong> ' + sim.components.length + '</p>';
  for (var i = 0; i < sim.components.length; i++) {
    var c = sim.components[i];
    var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
    var rf = state.rfAnswers["rf_" + i] || "—";
    html += '<p>' + escapeHtml(c.name) + ' — <span class="color-swatch" style="background:' + c.color + ';"></span> ' +
      'Distance: ' + dist.toFixed(2) + ' cm, Rf: ' + rf + '</p>';
  }
  html += '<p><strong>Solvent front:</strong> ' + (state.solventFrontDist ? state.solventFrontDist.toFixed(2) + ' cm' : '—') + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p class="label">Your Interpretation</p><p>' + escapeHtml(state.interpretation || "—") + '</p>';
  html += '<p class="label" style="margin-top:0.5rem;">Your Conclusion</p><p>' + escapeHtml(state.conclusion || "—") + '</p>';
  html += '<div class="sim-note">All measurements and values are simulated educational values.</div>';
  html += '<button class="btn btn-primary" id="btn-finish-experiment" style="margin-top:1rem;">Finish Experiment</button>';
  return html;
}

/* ── Distillation stage renderers ──────────────── */

function renderPrepareDistillContent(exp) {
  if (!exp) return "";
  var html = '<h3>Prepare the Apparatus</h3>';
  html += '<p>Before assembling the fractional distillation apparatus, identify the key components.</p>';
  html += '<p class="label">Important setup points:</p>';
  html += '<ul>';
  html += '<li>The thermometer bulb must be positioned at the branch of the fractionating column.</li>';
  html += '<li>The condenser must be connected with cooling water flowing.</li>';
  html += '<li>The receiving flask must be in place to collect the distillate.</li>';
  html += '</ul>';
  html += '<div class="sim-note">These are standard laboratory procedures for fractional distillation.</div>';
  return html;
}

function renderSetUpDistillContent(exp) {
  if (!exp) return "";
  var html = '<h3>Set Up the Apparatus</h3>';
  html += '<p>Assemble the fractional distillation apparatus by positioning the components correctly.</p>';
  html += '<p>Click on the simulation area to position each component.</p>';
  if (!state.distThermometerOk) {
    html += '<div class="measure-hint">Click on the <strong>fractionating column head</strong> to position the thermometer.</div>';
  } else if (!state.distCondenserOk) {
    html += '<div class="measure-hint">Thermometer positioned. Now click on the <strong>condenser</strong> to connect cooling water.</div>';
  } else {
    html += '<div class="feedback-correct">Apparatus assembled. Click <strong>Check Setup</strong> to verify.</div>';
  }
  return html;
}

function renderCheckSetupContent(exp) {
  if (!exp) return "";
  var html = '<h3>Check the Setup</h3>';
  html += '<p>Before heating, verify that the apparatus is correctly assembled.</p>';
  html += '<p>Key checks:</p>';
  html += '<ul>';
  html += '<li>Thermometer bulb at the column head — ' +
    (state.distThermometerOk ? '<span style="color:#28a745;">✓ Correct</span>' : '<span style="color:#dc3545;">✗ Not positioned</span>') + '</li>';
  html += '<li>Condenser connected with cooling water — ' +
    (state.distCondenserOk ? '<span style="color:#28a745;">✓ Connected</span>' : '<span style="color:#dc3545;">✗ Not connected</span>') + '</li>';
  html += '</ul>';
  if (state.distThermometerOk && state.distCondenserOk) {
    html += '<div class="feedback-correct">Setup verified. You may proceed to heating.</div>';
    state.distSetupComplete = true;
  } else {
    html += '<div class="feedback-incorrect">Setup incomplete. Return to the Setup stage to position all components.</div>';
    state.distSetupComplete = false;
  }
  return html;
}

function renderStartHeatingContent(exp) {
  if (!exp) return "";
  var html = '<h3>Start Heating</h3>';
  html += '<p>Begin heating the round-bottom flask gently and steadily.</p>';
  html += '<p>Click <strong>Start Heating</strong> to begin the distillation.</p>';
  if (state.distHeating) {
    html += '<div class="feedback-correct">Heating in progress. The mixture is being heated.</div>';
  }
  html += '<div class="sim-note">⚠ This is a simulated animation. Temperature values are simulated educational values.</div>';
  return html;
}

function renderMonitorContent(exp) {
  if (!exp) return "";
  var html = '<h3>Monitor the Distillation</h3>';
  html += '<p>Observe the distillation process. Watch the temperature and the vapour movement.</p>';
  html += '<p class="label">Current temperature</p>';
  html += '<p class="temp-display">' + state.distTemperature.toFixed(1) + ' °C</p>';
  if (state.distTemperature >= 78 && state.distTemperature < 95) {
    html += '<p>The temperature has stabilised near the boiling point of the alcohol. The first fraction is being collected.</p>';
  } else if (state.distTemperature >= 95) {
    html += '<p>The temperature is rising. The alcohol has mostly distilled over. Water is beginning to distil.</p>';
  }
  html += '<div class="sim-note">Temperature values are simulated educational values, not real laboratory measurements.</div>';
  return html;
}

function renderObserveDistillContent(exp) {
  if (!exp) return "";
  var html = '<h3>Observe the Distillation</h3>';
  html += '<p>Examine the distillation process and the collected distillate.</p>';
  html += '<p class="label">Record your observation</p>';
  html += '<p>The mixture has been separated by fractional distillation. The lower-boiling component (alcohol) distilled first.</p>';
  html += '<div class="sim-note">Observations are based on simulated educational values.</div>';
  return html;
}

function renderCollectContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Collect the Distillate</h3>';
  html += '<p>The first fraction has been collected in the receiving flask.</p>';
  html += '<p class="label">First fraction</p>';
  html += '<p>' + escapeHtml(sim.firstFraction.name) + ' — collected at approximately ' + sim.firstFraction.boilingPoint + ' °C (simulated).</p>';
  if (!state.distCollected) {
    html += '<p>Click <strong>Record Collection</strong> to confirm collection.</p>';
  } else {
    html += '<div class="feedback-correct">Distillate collected and recorded.</div>';
  }
  html += '<div class="sim-note">Volume and temperature are simulated educational values.</div>';
  return html;
}

function renderRecordContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Record Observations</h3>';
  html += '<p>Record your observations from the fractional distillation experiment.</p>';
  html += '<p class="label">Simulated data (for reference)</p>';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Parameter</th><th>Value</th><th>Note</th></tr></thead><tbody>';
  html += '<tr><td>Initial temperature</td><td>' + sim.initialTemp + ' °C</td><td>Simulated</td></tr>';
  html += '<tr><td>First fraction temperature</td><td>' + sim.firstFraction.boilingPoint + ' °C</td><td>Simulated</td></tr>';
  html += '<tr><td>Second fraction temperature</td><td>' + sim.secondFraction.boilingPoint + ' °C</td><td>Simulated</td></tr>';
  html += '</tbody></table>';
  html += '<div class="sim-note">All values are simulated educational values, not real laboratory measurements.</div>';
  return html;
}

function renderInterpretDistillContent(exp) {
  if (!exp) return "";
  var html = '<h3>Interpret the Results</h3>';
  html += '<p>Based on your observations, interpret the fractional distillation results.</p>';
  html += '<p class="label">Guiding questions</p>';
  html += '<ul>';
  html += '<li>Which component distilled first and why?</li>';
  html += '<li>What does the temperature stabilisation indicate?</li>';
  html += '<li>How does fractional distillation separate the mixture?</li>';
  html += '</ul>';
  html += '<p style="margin-top:0.5rem;">Write your interpretation below:</p>';
  return html;
}

function renderConcludeDistillContent(exp) {
  if (!exp) return "";
  var html = '<h3>Conclusion</h3>';
  html += '<p>Write your conclusion based on your observations and interpretation.</p>';
  html += '<p>Your conclusion should address:</p>';
  html += '<ul>';
  html += '<li>Whether the mixture was separated successfully</li>';
  html += '<li>Which component distilled first</li>';
  html += '<li>The significance of the temperature at which the first fraction collected</li>';
  html += '</ul>';
  html += '<p style="margin-top:0.5rem;">Enter your conclusion below:</p>';
  return html;
}

function renderCompleteDistillContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Experiment Complete</h3>';
  html += '<p class="label">Summary</p>';
  html += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
  html += '<p><strong>Section:</strong> ' + capitalizeFirst(exp.section) + ' Practical</p>';
  html += '<p><strong>SLOs:</strong> ' + exp.slos.join(", ") + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>First fraction:</strong> ' + escapeHtml(sim.firstFraction.name) +
    ' (simulated boiling point: ' + sim.firstFraction.boilingPoint + ' °C)</p>';
  html += '<p><strong>Second fraction:</strong> ' + escapeHtml(sim.secondFraction.name) +
    ' (simulated boiling point: ' + sim.secondFraction.boilingPoint + ' °C)</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p class="label">Your Interpretation</p><p>' + escapeHtml(state.interpretation || "—") + '</p>';
  html += '<p class="label" style="margin-top:0.5rem;">Your Conclusion</p><p>' + escapeHtml(state.conclusion || "—") + '</p>';
  html += '<div class="sim-note">All temperature and volume values are simulated educational values, not real laboratory measurements.</div>';
  html += '<button class="btn btn-primary" id="btn-finish-experiment" style="margin-top:1rem;">Finish Experiment</button>';
  return html;
}

/* ── Titration stage renderers ─────────────────── */

function renderPrepareTitrationContent(exp) {
  if (!exp) return "";
  var html = '<h3>Prepare the Titration</h3>';
  html += '<p>Before beginning the titration, identify the correct apparatus for each task.</p>';
  html += '<div class="interactive-prompt">';
  html += '<p class="label">Question 1: Which apparatus delivers accurately measured variable volumes?</p>';
  html += '<div class="tool-options">';
  html += '<button class="btn btn-tool" data-tool="burette" id="btn-tool-burette">Burette</button>';
  html += '<button class="btn btn-tool" data-tool="measuring-cylinder" id="btn-tool-cylinder">Measuring cylinder</button>';
  html += '<button class="btn btn-tool" data-tool="beaker" id="btn-tool-beaker">Beaker</button>';
  html += '</div>';
  if (state.titrationApparatusChoice1 === "burette") {
    html += '<div class="feedback-correct">Correct. A burette delivers variable volumes of liquid accurately.</div>';
  } else if (state.titrationApparatusChoice1 && state.titrationApparatusChoice1 !== "burette") {
    html += '<div class="feedback-incorrect">Incorrect. A burette is used to deliver accurately measured variable volumes. A measuring cylinder and beaker are not precise enough for titration.</div>';
  }
  html += '</div>';
  html += '<div class="interactive-prompt" style="margin-top:1rem;">';
  html += '<p class="label">Question 2: Which apparatus measures a fixed volume of solution precisely?</p>';
  html += '<div class="tool-options">';
  html += '<button class="btn btn-tool" data-tool="volumetric-pipette" id="btn-tool-pipette">Volumetric pipette</button>';
  html += '<button class="btn btn-tool" data-tool="burette2" id="btn-tool-burette2">Burette</button>';
  html += '<button class="btn btn-tool" data-tool="dropper" id="btn-tool-dropper">Dropper</button>';
  html += '</div>';
  if (state.titrationApparatusChoice2 === "volumetric-pipette") {
    html += '<div class="feedback-correct">Correct. A volumetric pipette measures a fixed volume (e.g. 25.00 mL) precisely.</div>';
  } else if (state.titrationApparatusChoice2 && state.titrationApparatusChoice2 !== "volumetric-pipette") {
    html += '<div class="feedback-incorrect">Incorrect. A volumetric pipette is used to measure a fixed volume precisely.</div>';
  }
  html += '</div>';
  html += '<div class="sim-note">ChemSim educational simulation choice: Standard chemistry conventions used for apparatus identification.</div>';
  return html;
}

function renderFillBuretteContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Fill the Burette</h3>';
  html += '<p>Rinse the burette with HCl solution, then fill it above the zero mark.</p>';
  html += '<p>Open the tap to remove air bubbles and adjust to exactly 0.00 mL.</p>';
  html += '<p class="label">Simulated titrant</p>';
  html += '<p>HCl concentration: <strong>' + sim.hclConcentration.toFixed(4) + ' mol/L</strong></p>';
  html += '<div class="sim-note">Simulated educational value — not a real laboratory measurement.</div>';
  if (state.titrationBuretteFilled) {
    html += '<div class="feedback-correct">Burette filled and ready. Initial reading: 0.00 mL.</div>';
  }
  return html;
}

function renderMeasureSampleContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Measure the NaOH Sample</h3>';
  html += '<p>Using the volumetric pipette, measure 25.00 mL of NaOH solution into the conical flask.</p>';
  html += '<p>Add 2–3 drops of phenolphthalein indicator. The solution will turn <strong>pink</strong>.</p>';
  html += '<p class="label">Simulated sample</p>';
  html += '<p>NaOH volume: <strong>' + sim.naohVolume.toFixed(2) + ' mL</strong></p>';
  html += '<div class="sim-note">Simulated educational value — not a real laboratory measurement.</div>';
  if (state.titrationSampleMeasured) {
    html += '<div class="feedback-correct">NaOH sample prepared with indicator. Solution is pink.</div>';
  }
  return html;
}

function renderTitrateContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var trialNum = state.titrationTrialIndex + 1;
  var totalTrials = sim.trials.length;
  var html = '<h3>Titrate — Trial ' + trialNum + ' of ' + totalTrials + '</h3>';
  html += '<p>Slowly add HCl from the burette while watching the flask colour.</p>';
  html += '<p>Use the <strong>stopcock slider</strong> to control the flow rate.</p>';
  html += '<p class="label">Current burette reading</p>';
  html += '<p class="temp-display">' + state.titrationVolume.toFixed(2) + ' mL</p>';
  if (state.titrationEndpointReached && !state.titrationEndpointPassed) {
    html += '<div class="feedback-correct">Endpoint reached! The pink colour has just disappeared. Stop adding HCl.</div>';
  } else if (state.titrationEndpointPassed) {
    html += '<div class="feedback-incorrect">Endpoint passed! Too much HCl was added. The solution is now acidic.</div>';
  }
  html += '<div class="sim-note">⚠ This is a simulated titration. Volume values are simulated educational values.</div>';
  return html;
}

function renderEndpointContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Endpoint Observation</h3>';
  html += '<p>The endpoint has been reached.</p>';
  html += '<p class="label">What happened at the endpoint?</p>';
  html += '<p>The <strong>pink colour disappeared</strong> and the solution became <strong>colourless</strong> after adding one extra drop of HCl.</p>';
  html += '<p>This indicates that all the NaOH has been neutralised by the HCl.</p>';
  html += '<p class="label">Reaction</p>';
  html += '<p class="rf-formula">NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)</p>';
  html += '<div class="sim-note">ChemSim educational simulation choice: Phenolphthalein indicator (colourless in acid, pink in base).</div>';
  return html;
}

function renderRecordTitrationContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Record Titration Results</h3>';
  html += '<p>Record the burette readings for each trial.</p>';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Trial</th><th>Initial (mL)</th><th>Final (mL)</th><th>Titre (mL)</th></tr></thead><tbody>';
  for (var i = 0; i < sim.trials.length; i++) {
    var t = sim.trials[i];
    var recorded = state.titrationTrials[i];
    html += '<tr>';
    html += '<td>' + (i + 1) + (i === 0 ? ' (rough)' : i === sim.trials.length - 1 ? ' (concordant)' : ' (concordant)') + '</td>';
    html += '<td>' + t.initial.toFixed(2) + '</td>';
    html += '<td>' + t.final.toFixed(2) + '</td>';
    html += '<td>' + t.titre.toFixed(2) + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  html += '<p class="label" style="margin-top:0.75rem;">Mean titre (concordant): ' + sim.meanTitre.toFixed(2) + ' mL</p>';
  html += '<div class="sim-note">All values are simulated educational values, not real laboratory measurements.</div>';
  return html;
}

function renderCalculateTitrationContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Calculate NaOH Molarity</h3>';
  html += '<p class="label">Formula</p>';
  html += '<p class="rf-formula">M(NaOH) × V(NaOH) = M(HCl) × V(HCl)</p>';
  html += '<p class="label">Known values (simulated)</p>';
  html += '<p>HCl concentration: ' + sim.hclConcentration.toFixed(4) + ' mol/L</p>';
  html += '<p>HCl volume (mean titre): ' + sim.meanTitre.toFixed(2) + ' mL = ' + (sim.meanTitre / 1000).toFixed(6) + ' L</p>';
  html += '<p>NaOH volume: ' + sim.naohVolume.toFixed(2) + ' mL = ' + (sim.naohVolume / 1000).toFixed(6) + ' L</p>';
  html += '<p class="label" style="margin-top:0.75rem;">Calculate M(NaOH)</p>';
  html += '<p>M(NaOH) = [M(HCl) × V(HCl)] / V(NaOH)</p>';
  html += '<p>M(NaOH) = [' + sim.hclConcentration.toFixed(4) + ' × ' + sim.meanTitre.toFixed(2) + '] / ' + sim.naohVolume.toFixed(2) + '</p>';
  html += '<label for="calc-answer">Your answer (mol/L):</label>';
  html += '<input type="number" step="0.0001" min="0" max="1" id="calc-answer" value="' + escapeHtml(String(state.titrationCalcAnswer)) + '" style="width:120px;margin-top:0.25rem;">';
  html += '<button class="btn btn-accent" id="btn-check-calc" style="margin-left:0.5rem;">Check</button>';
  if (state.titrationCalcChecked) {
    var userVal = parseFloat(state.titrationCalcAnswer);
    if (!isNaN(userVal) && Math.abs(userVal - sim.expectedMolarity) < 0.002) {
      html += '<div class="feedback-correct">Correct! M(NaOH) = ' + sim.expectedMolarity.toFixed(4) + ' mol/L</div>';
    } else {
      html += '<div class="feedback-incorrect">Expected ~' + sim.expectedMolarity.toFixed(4) + ' mol/L. Check your calculation.</div>';
    }
  }
  html += '<div class="sim-note">Simulated educational values. This is not a real laboratory measurement.</div>';
  return html;
}

function renderInterpretTitrationContent(exp) {
  if (!exp) return "";
  var html = '<h3>Interpret the Results</h3>';
  html += '<p>Based on your titration data, interpret the calculated molarity.</p>';
  html += '<p class="label">Guiding questions</p>';
  html += '<ul>';
  html += '<li>What does the calculated molarity tell you about the NaOH solution?</li>';
  html += '<li>How close were your concordant titre values?</li>';
  html += '<li>What are possible sources of error in this titration?</li>';
  html += '</ul>';
  html += '<p style="margin-top:0.5rem;">Write your interpretation below:</p>';
  return html;
}

function renderConcludeTitrationContent(exp) {
  if (!exp) return "";
  var html = '<h3>Conclusion</h3>';
  html += '<p>Write your conclusion based on your titration data and interpretation.</p>';
  html += '<p>Your conclusion should address:</p>';
  html += '<ul>';
  html += '<li>The determined molarity of the NaOH solution</li>';
  html += '<li>The concordance of your titre values</li>';
  html += '<li>Any factors that may have affected the accuracy</li>';
  html += '</ul>';
  html += '<p style="margin-top:0.5rem;">Enter your conclusion below:</p>';
  return html;
}

function renderCompleteTitrationContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG[exp.id];
  var html = '<h3>Experiment Complete</h3>';
  html += '<p class="label">Summary</p>';
  html += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
  html += '<p><strong>Section:</strong> ' + capitalizeFirst(exp.section) + '</p>';
  html += '<p><strong>SLOs:</strong> ' + exp.slos.join(", ") + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>HCl concentration:</strong> ' + sim.hclConcentration.toFixed(4) + ' mol/L (simulated)</p>';
  html += '<p><strong>NaOH volume:</strong> ' + sim.naohVolume.toFixed(2) + ' mL (simulated)</p>';
  html += '<p><strong>Mean titre:</strong> ' + sim.meanTitre.toFixed(2) + ' mL (simulated)</p>';
  html += '<p><strong>Determined NaOH molarity:</strong> ' + sim.expectedMolarity.toFixed(4) + ' mol/L (simulated)</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p class="label">Your Interpretation</p><p>' + escapeHtml(state.interpretation || "—") + '</p>';
  html += '<p class="label" style="margin-top:0.5rem;">Your Conclusion</p><p>' + escapeHtml(state.conclusion || "—") + '</p>';
  html += '<div class="sim-note">All volume and concentration values are simulated educational values, not real laboratory measurements.</div>';
  html += '<button class="btn btn-primary" id="btn-finish-experiment" style="margin-top:1rem;">Finish Experiment</button>';
  return html;
}

/* ── Simulation Area ───────────────────────────── */

function getSimStages() {
  var id = state.experiment ? state.experiment.id : "";
  if (id === "A2" || id === "A3") {
    return ["prepare", "baseline", "sample", "setup", "run", "observe", "markFront", "measure", "calculate"];
  }
  if (id === "A1") {
    return ["setUp", "checkSetup", "startHeating", "monitor", "observe", "collect"];
  }
  if (id === "A4") {
    return ["fillBurette", "measureSample", "titrate", "endpoint"];
  }
  if (id === "A5") {
    return ["performTest"];
  }
  if (id === "M7_1") return ["heat"];
  if (id === "M7_2") return ["performTest"];
  if (id === "M7_3") return ["dissolve", "concentrate", "crystallize"];
  if (id === "M7_4" || id === "M7_5") return ["heat"];
  if (id === "M7_6") return ["performReaction"];
  if (id === "M7_7") return ["performTest"];
  if (id === "M7_8") return ["meltingPointTest", "boilingPointTest"];
  return [];
}

function renderSimulationArea() {
  var simStages = getSimStages();
  if (simStages.indexOf(state.currentStage) !== -1) {
    dom.simulationArea.classList.remove("hidden");
    drawCanvas();
  } else {
    dom.simulationArea.classList.add("hidden");
  }
}

/* ── User Input Area ───────────────────────────── */

function renderUserInput() {
  var id = state.experiment ? state.experiment.id : "";
  var html = "";

  if (id === "A2" || id === "A3") {
    html += renderChromUserInput();
  } else if (id === "A1") {
    html += renderDistillUserInput();
  } else if (id === "A4") {
    html += renderTitrationUserInput();
  } else if (id === "A5") {
    html += renderGasUserInput();
  } else if (id && id.indexOf("M7") === 0) {
    html += renderM7UserInput();
  }

  dom.userInputArea.innerHTML = html;
  attachInputListeners();
}

function renderChromUserInput() {
  var html = "";
  if (state.currentStage === "setup") {
    html += '<label for="solvent-slider">Solvent Level</label>';
    html += '<input type="range" id="solvent-slider" min="0" max="100" value="' +
      (state.solventPositioned ? "20" : "80") + '" class="solvent-slider">';
    html += '<p class="slider-hint">Adjust so solvent level is below the baseline (dashed line).</p>';
    html += '<button class="btn btn-accent" id="btn-check-setup">Check Setup</button>';
  }
  if (state.currentStage === "run" && (!state.simulation || !state.simulation.done)) {
    html += '<button class="btn btn-primary" id="btn-start-run">Start Chromatography</button>';
  }
  if (state.currentStage === "measure") {
    if (state.measurePhase === "idle") {
      html += '<p class="measure-hint">Click the <strong>baseline</strong> on the paper to start measuring.</p>';
    } else if (state.measurePhase === "baseline_done") {
      html += '<p class="measure-hint">Now click the <strong>solvent front</strong>.</p>';
    } else if (state.measurePhase === "solvent_done") {
      html += '<p class="measure-hint">Now click each <strong>separated spot</strong> to measure.</p>';
    }
  }
  if (state.currentStage === "calculate") {
    html += '<button class="btn btn-accent" id="btn-check-rf">Check Rf Values</button>';
  }
  if (state.currentStage === "interpret") {
    html += '<label for="interpretation-input">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" placeholder="Write your interpretation here...">' +
      escapeHtml(state.interpretation) + '</textarea>';
  }
  if (state.currentStage === "conclude") {
    html += '<label for="conclusion-input">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" placeholder="Write your conclusion here...">' +
      escapeHtml(state.conclusion) + '</textarea>';
  }
  return html;
}

function renderDistillUserInput() {
  var html = "";
  if (state.currentStage === "startHeating" && !state.distHeating) {
    html += '<button class="btn btn-primary" id="btn-start-heating">Start Heating</button>';
  }
  if (state.currentStage === "collect" && !state.distCollected) {
    html += '<button class="btn btn-accent" id="btn-record-collection">Record Collection</button>';
  }
  if (state.currentStage === "interpret") {
    html += '<label for="interpretation-input">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" placeholder="Write your interpretation here...">' +
      escapeHtml(state.interpretation) + '</textarea>';
  }
  if (state.currentStage === "conclude") {
    html += '<label for="conclusion-input">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" placeholder="Write your conclusion here...">' +
      escapeHtml(state.conclusion) + '</textarea>';
  }
  return html;
}

function renderTitrationUserInput() {
  var html = "";
  if (state.currentStage === "fillBurette" && !state.titrationBuretteFilled) {
    html += '<button class="btn btn-primary" id="btn-fill-burette">Fill Burette</button>';
  }
  if (state.currentStage === "measureSample" && !state.titrationSampleMeasured) {
    html += '<button class="btn btn-primary" id="btn-measure-sample">Measure Sample</button>';
  }
  if (state.currentStage === "titrate") {
    html += '<label for="stopcock-slider">Stopcock Control</label>';
    html += '<input type="range" id="stopcock-slider" min="0" max="100" value="0" class="solvent-slider">';
    html += '<p class="slider-hint">Slide to open the stopcock. Move toward endpoint carefully.</p>';
    if (state.titrationEndpointReached || state.titrationEndpointPassed) {
      html += '<button class="btn btn-accent" id="btn-record-titre">Record Titre</button>';
    }
  }
  if (state.currentStage === "interpret") {
    html += '<label for="interpretation-input">Your Interpretation</label>';
    html += '<textarea id="interpretation-input" placeholder="Write your interpretation here...">' +
      escapeHtml(state.interpretation) + '</textarea>';
  }
  if (state.currentStage === "conclude") {
    html += '<label for="conclusion-input">Your Conclusion</label>';
    html += '<textarea id="conclusion-input" placeholder="Write your conclusion here...">' +
      escapeHtml(state.conclusion) + '</textarea>';
  }
  return html;
}

function attachInputListeners() {
  var slider = document.getElementById("solvent-slider");
  if (slider) {
    slider.addEventListener("input", function() {
      state.solventPositioned = true;
      drawCanvas();
    });
  }
  var interp = document.getElementById("interpretation-input");
  if (interp) {
    interp.addEventListener("input", function() {
      state.interpretation = interp.value;
    });
  }
  var conc = document.getElementById("conclusion-input");
  if (conc) {
    conc.addEventListener("input", function() {
      state.conclusion = conc.value;
    });
  }
  var rfInputs = document.querySelectorAll(".rf-input");
  for (var i = 0; i < rfInputs.length; i++) {
    rfInputs[i].addEventListener("input", function() {
      var key = this.getAttribute("data-rf-key");
      state.rfAnswers[key] = this.value;
    });
  }
  var checkRfBtn = document.getElementById("btn-check-rf");
  if (checkRfBtn) {
    checkRfBtn.addEventListener("click", checkRfValues);
  }
  var stopcock = document.getElementById("stopcock-slider");
  if (stopcock) {
    stopcock.addEventListener("input", function() {
      handleTitrationSlider(parseInt(this.value, 10));
    });
  }
  var calcAnswer = document.getElementById("calc-answer");
  if (calcAnswer) {
    calcAnswer.addEventListener("input", function() {
      state.titrationCalcAnswer = this.value;
    });
  }
  var checkCalcBtn = document.getElementById("btn-check-calc");
  if (checkCalcBtn) {
    checkCalcBtn.addEventListener("click", function() {
      state.titrationCalcChecked = true;
      renderStageContent();
    });
  }
}

/* ── Feedback Area ─────────────────────────────── */

function renderFeedback() {
  if (dom.feedbackArea) {
    dom.feedbackArea.innerHTML = "";
  }
}

/* ── Buttons ───────────────────────────────────── */

function renderButtons() {
  var idx = stageIndex(state.currentStage);
  var stages = getStages();
  var id = state.experiment ? state.experiment.id : "";

  if (idx > 0) {
    dom.btnBack.style.display = "";
    dom.btnBack.disabled = false;
  } else {
    dom.btnBack.style.display = "none";
  }

  if (state.currentStage === "select") {
    dom.btnNext.style.display = "none";
  } else if (state.currentStage === "complete") {
    dom.btnNext.style.display = "none";
  } else if (id === "A2" || id === "A3") {
    renderChromButtons();
  } else if (id === "A1") {
    renderDistillButtons();
  } else if (id === "A4") {
    renderTitrationButtons();
  } else if (id === "A5") {
    renderGasButtons();
  } else if (id && id.indexOf("M7") === 0) {
    renderM7Buttons();
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

function renderChromButtons() {
  if (state.currentStage === "conclude") {
    var sim = SIMULATION_CONFIG[state.experiment.id];
    var numComponents = sim ? sim.components.length : 0;
    var rfFilled = state.rfAnswers ? Object.keys(state.rfAnswers).filter(function(k) { return String(state.rfAnswers[k]).trim() !== ""; }).length : 0;
    var a2Ready = state.simulation && state.simulation.done &&
      state.solventFrontMarked &&
      state.measurePhase === "done" &&
      numComponents > 0 && rfFilled >= numComponents &&
      state.interpretation && state.interpretation.trim().length > 0 &&
      state.conclusion && state.conclusion.trim().length > 0;
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = a2Ready ? "Next" : "Complete all steps first";
    dom.btnNext.disabled = !a2Ready;
  } else if (state.currentStage === "prepare" && !state.prepareTool) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "baseline" && !state.baselineDrawn) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "sample" && !state.sampleApplied) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "setup" && !state.paperInBeaker) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "run" && state.simulation && !state.simulation.done) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Running...";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "run" && state.simulation && state.simulation.done) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  } else if (state.currentStage === "markFront" && !state.solventFrontMarked) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "measure" && state.measurePhase !== "done") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

function renderDistillButtons() {
  if (state.currentStage === "conclude") {
    var a1Ready = state.simulation && state.simulation.done &&
      state.distCollected &&
      state.interpretation && state.interpretation.trim().length > 0 &&
      state.conclusion && state.conclusion.trim().length > 0;
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = a1Ready ? "Next" : "Complete all steps first";
    dom.btnNext.disabled = !a1Ready;
  } else if (state.currentStage === "setUp" && (!state.distThermometerOk || !state.distCondenserOk)) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "checkSetup" && !state.distSetupComplete) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "startHeating" && !state.distHeating) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "monitor" && state.simulation && !state.simulation.done) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Distilling...";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "monitor" && state.simulation && state.simulation.done) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  } else if (state.currentStage === "collect" && !state.distCollected) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

function renderTitrationButtons() {
  if (state.currentStage === "prepare") {
    var bothAnswered = state.titrationApparatusChoice1 && state.titrationApparatusChoice2;
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = bothAnswered ? "Next" : "Answer both questions";
    dom.btnNext.disabled = !bothAnswered;
  } else if (state.currentStage === "fillBurette" && !state.titrationBuretteFilled) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "measureSample" && !state.titrationSampleMeasured) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "titrate") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = !state.titrationEndpointReached;
  } else if (state.currentStage === "conclude") {
    var t4Ready = state.titrationTrials.length > 0 && state.titrationCalcChecked &&
      state.interpretation && state.interpretation.trim().length > 0 &&
      state.conclusion && state.conclusion.trim().length > 0;
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = t4Ready ? "Next" : "Complete all steps first";
    dom.btnNext.disabled = !t4Ready;
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

/* ==============================================================
   SECTION 7: CANVAS DRAWING
   All values are SIMULATED EDUCATIONAL VALUES.
   ============================================================== */

function drawCanvas() {
  var ctx = dom.ctx;
  var cw = dom.canvas.width;
  var ch = dom.canvas.height;
  ctx.clearRect(0, 0, cw, ch);
  var id = state.experiment ? state.experiment.id : "";
  if (id === "A2" || id === "A3") {
    drawChromCanvas(ctx, cw, ch);
  } else if (id === "A1") {
    drawDistillCanvas(ctx, cw, ch);
  } else if (id === "A4") {
    drawTitrationCanvas(ctx, cw, ch);
  } else if (id === "A5") {
    drawGasCanvas(ctx, cw, ch);
  } else if (id && id.indexOf("M7") === 0) {
    drawM7Canvas(ctx, cw, ch);
  }
}

/* ── Chromatography Canvas ─────────────────────── */

function getCanvasGeometry() {
  var sim = state.experiment ? SIMULATION_CONFIG[state.experiment.id] : null;
  if (!sim) return null;
  var cw = dom.canvas.width;
  var ch = dom.canvas.height;
  var paperW = sim.paper.width;
  var paperH = sim.paper.height;
  var paperX = (cw - paperW) / 2;
  var paperTop = (ch - paperH) / 2;
  var baseAbsY = paperTop + sim.paper.baselineY;
  var topAbsY = paperTop + sim.paper.topY;
  return { cw: cw, ch: ch, paperW: paperW, paperH: paperH, paperX: paperX, paperTop: paperTop, baseAbsY: baseAbsY, topAbsY: topAbsY, sim: sim };
}

function drawChromCanvas(ctx, cw, ch) {
  var g = getCanvasGeometry();
  if (!g) return;
  drawPaperStrip(ctx, g);
  drawBeakerBg(ctx, g);
  if (state.currentStage === "prepare") drawPrepareTool(ctx, g);
  if (state.baselineDrawn || state.currentStage === "baseline") drawBaseline(ctx, g);
  if (state.sampleApplied || state.currentStage === "sample") drawSampleSpot(ctx, g);
  if (state.currentStage === "setup") drawSetupSolvent(ctx, g);
  if (state.currentStage === "run" && state.simulation) drawRunningSim(ctx, g);
  if (["observe","markFront","measure","calculate","interpret","conclude","complete"].indexOf(state.currentStage) !== -1 && state.simulation) drawCompletedChrom(ctx, g);
  if (state.currentStage === "measure") drawMeasureOverlay(ctx, g);
}

function drawPaperStrip(ctx, g) {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#b0b0b0";
  ctx.lineWidth = 1;
  ctx.fillRect(g.paperX, g.paperTop, g.paperW, g.paperH);
  ctx.strokeRect(g.paperX, g.paperTop, g.paperW, g.paperH);
}

function drawBeakerBg(ctx, g) {
  var bx = g.paperX - 35;
  var bw = g.paperW + 70;
  var bh = g.paperH + 50;
  var by = g.paperTop + g.paperH - bh + 65;
  ctx.fillStyle = "#e8edf2";
  ctx.strokeStyle = "#9aa8b5";
  ctx.lineWidth = 2;
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeRect(bx, by, bw, bh);
}

function drawPrepareTool(ctx, g) {
  if (state.prepareTool === "pencil") {
    ctx.fillStyle = "#555";
    ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 5, 40, 10);
    ctx.fillStyle = "#333";
    ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 5, 8, 10);
    ctx.fillStyle = "#888";
    ctx.font = "10px sans-serif";
    ctx.fillText("pencil", g.paperX - 50, g.paperTop + g.paperH / 2 + 20);
  } else if (state.prepareTool === "pen") {
    ctx.fillStyle = "#222";
    ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 36, 8);
    ctx.fillStyle = "#0044cc";
    ctx.fillRect(g.paperX - 50, g.paperTop + g.paperH / 2 - 4, 6, 8);
    ctx.fillStyle = "#cc0000";
    ctx.font = "10px sans-serif";
    ctx.fillText("pen (ink)", g.paperX - 50, g.paperTop + g.paperH / 2 + 18);
  }
}

function drawBaseline(ctx, g) {
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(g.paperX + 10, g.baseAbsY);
  ctx.lineTo(g.paperX + g.paperW - 10, g.baseAbsY);
  ctx.stroke();
  ctx.fillStyle = "#888";
  ctx.font = "10px sans-serif";
  ctx.fillText("baseline (pencil)", g.paperX + g.paperW + 4, g.baseAbsY + 4);
}

function drawSampleSpot(ctx, g) {
  var sx = g.paperX + g.paperW / 2;
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(sx, g.baseAbsY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("ink spot", sx + 10, g.baseAbsY + 4);
}

function drawSetupSolvent(ctx, g) {
  var slider = document.getElementById("solvent-slider");
  var val = slider ? parseInt(slider.value, 10) : 50;
  var bx = g.paperX - 35;
  var bw = g.paperW + 70;
  var bh = g.paperH + 50;
  var by = g.paperTop + g.paperH - bh + 65;
  var solventLevel = by + bh - (val / 100) * bh * 0.4;
  ctx.fillStyle = "rgba(180, 210, 240, 0.5)";
  ctx.fillRect(bx + 2, solventLevel, bw - 4, by + bh - solventLevel - 2);
  ctx.strokeStyle = "#4a90d9";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(bx + 2, solventLevel);
  ctx.lineTo(bx + bw - 2, solventLevel);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#4a90d9";
  ctx.font = "10px sans-serif";
  ctx.fillText("solvent", bx + bw + 4, solventLevel + 4);
  drawBaseline(ctx, g);
  if (solventLevel > g.baseAbsY) {
    ctx.fillStyle = "rgba(40, 167, 69, 0.7)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("✓ Solvent below baseline", g.paperX - 50, g.paperTop + 20);
  } else {
    ctx.fillStyle = "rgba(220, 53, 69, 0.7)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("✗ Solvent above baseline!", g.paperX - 50, g.paperTop + 20);
  }
}

function drawRunningSim(ctx, g) {
  var elapsed = Date.now() - state.simulation.startTime;
  var progress = Math.min(elapsed / g.sim.animationDurationMs, 1);
  var solventFrontY = g.sim.paper.baselineY - progress * (g.sim.paper.baselineY - g.sim.paper.topY);
  var solventAbsY = g.paperTop + solventFrontY;
  ctx.fillStyle = "rgba(180, 210, 240, 0.2)";
  ctx.fillRect(g.paperX + 2, solventAbsY, g.paperW - 4, g.baseAbsY - solventAbsY);
  ctx.strokeStyle = "rgba(100, 160, 220, 0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(g.paperX + 8, solventAbsY);
  ctx.lineTo(g.paperX + g.paperW - 8, solventAbsY);
  ctx.stroke();
  for (var i = 0; i < g.sim.components.length; i++) {
    var c = g.sim.components[i];
    var spotDist = progress * (g.sim.paper.baselineY - g.sim.paper.topY) * c.relativeRate;
    var spotAbsY = g.baseAbsY - spotDist;
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(g.paperX + g.paperW / 2, spotAbsY, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  if (progress < 1) {
    requestAnimationFrame(function() { drawCanvas(); });
  } else {
    state.simulation.done = true;
    renderButtons();
  }
}

function drawCompletedChrom(ctx, g) {
  ctx.fillStyle = "rgba(180, 210, 240, 0.15)";
  ctx.fillRect(g.paperX + 2, g.topAbsY, g.paperW - 4, g.baseAbsY - g.topAbsY);
  if (state.solventFrontMarked || state.currentStage === "markFront") {
    ctx.strokeStyle = "rgba(100, 160, 220, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(g.paperX + 8, g.topAbsY);
    ctx.lineTo(g.paperX + g.paperW - 8, g.topAbsY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#6aa0cc";
    ctx.font = "10px sans-serif";
    ctx.fillText("solvent front", g.paperX + g.paperW + 4, g.topAbsY + 4);
  }
  drawBaseline(ctx, g);
  for (var i = 0; i < g.sim.components.length; i++) {
    var c = g.sim.components[i];
    var spotDist = (g.sim.paper.baselineY - g.sim.paper.topY) * c.relativeRate;
    var spotAbsY = g.baseAbsY - spotDist;
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(g.paperX + g.paperW / 2, spotAbsY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#333";
    ctx.font = "10px sans-serif";
    ctx.fillText(c.name + " (sim)", g.paperX + g.paperW / 2 + 14, spotAbsY + 4);
  }
}

function drawMeasureOverlay(ctx, g) {
  if (state.measurePhase === "baseline_done" || state.measurePhase === "solvent_done" || state.measurePhase === "done") {
    ctx.strokeStyle = "rgba(220, 53, 69, 0.6)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(g.paperX + g.paperW / 2 - 30, g.baseAbsY);
    ctx.lineTo(g.paperX + g.paperW / 2 + 30, g.baseAbsY);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (state.measurePhase === "solvent_done" || state.measurePhase === "done") {
    ctx.strokeStyle = "rgba(40, 167, 69, 0.6)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(g.paperX + g.paperW / 2 - 30, g.topAbsY);
    ctx.lineTo(g.paperX + g.paperW / 2 + 30, g.topAbsY);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

/* ── Distillation Canvas ───────────────────────── */

function drawDistillCanvas(ctx, cw, ch) {
  var sim = SIMULATION_CONFIG["A1"];
  if (!sim) return;
  var f = sim.flask;
  var col = sim.column;
  var cd = sim.condenser;
  var rc = sim.receiver;

  drawDistillFlask(ctx, f);
  drawDistillColumn(ctx, col);
  drawDistillThermometer(ctx, col);
  drawDistillCondenser(ctx, cd);
  drawDistillReceiver(ctx, rc);
  drawDistillConnections(ctx, f, col, cd, rc);

  if (state.currentStage === "startHeating" || state.currentStage === "monitor") {
    drawDistillHeating(ctx, f, sim);
  }
  if (state.simulation && (state.currentStage === "monitor" || state.currentStage === "observe" || state.currentStage === "collect")) {
    drawDistillAnimation(ctx, f, col, cd, rc, sim);
  }
}

function drawDistillFlask(ctx, f) {
  ctx.fillStyle = "#f0f0f0";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2, f.height * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);
  ctx.strokeRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);

  var liquidLevel = state.distHeating ? 0.6 : 0.7;
  ctx.fillStyle = "rgba(200, 220, 255, 0.5)";
  ctx.beginPath();
  ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2 - 3, f.height * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("round-bottom flask", f.x - 10, f.y + f.height + 15);
}

function drawDistillColumn(ctx, col) {
  ctx.fillStyle = "#e8e8e8";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1.5;
  ctx.fillRect(col.x, col.y, col.width, col.height);
  ctx.strokeRect(col.x, col.y, col.width, col.height);

  ctx.fillStyle = "#bbb";
  for (var i = 0; i < 6; i++) {
    var by = col.y + 15 + i * 25;
    ctx.beginPath();
    ctx.arc(col.x + col.width / 2, by, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("fractionating column", col.x - 20, col.y + col.height + 15);
}

function drawDistillThermometer(ctx, col) {
  var tx = col.x + col.width + 8;
  var ty = col.y + 5;
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(tx, ty, 4, 40);
  ctx.fillStyle = "#ddd";
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1;
  ctx.fillRect(tx - 2, ty, 8, 40);
  ctx.strokeRect(tx - 2, ty, 8, 40);
  ctx.beginPath();
  ctx.arc(tx + 2, ty + 42, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4444";
  ctx.fill();
  ctx.stroke();

  var temp = state.distTemperature || 25;
  var fillH = Math.min(35, (temp / 110) * 35);
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(tx, ty + 40 - fillH, 4, fillH);

  ctx.fillStyle = "#333";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText(temp.toFixed(1) + " °C", tx + 12, ty + 25);
  ctx.font = "9px sans-serif";
  ctx.fillStyle = "#888";
  ctx.fillText("(simulated)", tx + 12, ty + 37);

  if (state.distThermometerOk) {
    ctx.fillStyle = "rgba(40, 167, 69, 0.7)";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("✓", tx - 15, ty + 25);
  }
}

function drawDistillCondenser(ctx, cd) {
  ctx.fillStyle = "#d0e8f0";
  ctx.strokeStyle = "#6aa0cc";
  ctx.lineWidth = 1.5;
  ctx.fillRect(cd.x, cd.y, cd.width, cd.height);
  ctx.strokeRect(cd.x, cd.y, cd.width, cd.height);

  ctx.strokeStyle = "#4a90d9";
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(cd.x + 5, cd.y + cd.height / 2);
  ctx.lineTo(cd.x + cd.width - 5, cd.y + cd.height / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (state.distCondenserOk) {
    ctx.fillStyle = "rgba(74, 144, 217, 0.4)";
    ctx.fillRect(cd.x + 2, cd.y + 2, cd.width - 4, cd.height - 4);
    ctx.fillStyle = "#4a90d9";
    ctx.font = "9px sans-serif";
    ctx.fillText("water flow →", cd.x + cd.width / 2 - 20, cd.y + cd.height / 2 + 3);
  }

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("condenser", cd.x + cd.width / 2 - 20, cd.y - 5);
}

function drawDistillReceiver(ctx, rc) {
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1.5;
  ctx.fillRect(rc.x, rc.y, rc.width, rc.height);
  ctx.strokeRect(rc.x, rc.y, rc.width, rc.height);

  if (state.distCollected) {
    ctx.fillStyle = "rgba(200, 220, 255, 0.5)";
    ctx.fillRect(rc.x + 3, rc.y + rc.height * 0.5, rc.width - 6, rc.height * 0.45);
  }

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("receiving flask", rc.x - 5, rc.y + rc.height + 15);
}

function drawDistillConnections(ctx, f, col, cd, rc) {
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(f.x + f.width / 2, f.y);
  ctx.lineTo(col.x + col.width / 2, col.y + col.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(col.x + col.width, col.y + 10);
  ctx.lineTo(cd.x, cd.y + cd.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cd.x + cd.width, cd.y + cd.height / 2);
  ctx.lineTo(rc.x + rc.width / 2, rc.y);
  ctx.stroke();
}

function drawDistillHeating(ctx, f, sim) {
  for (var i = 0; i < 5; i++) {
    var fx = f.x + f.width * 0.2 + Math.random() * f.width * 0.6;
    var fy = f.y + f.height + 5 + Math.random() * 10;
    ctx.fillStyle = "rgba(255, 100, 0, 0.6)";
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx - 3, fy + 8 + Math.random() * 5);
    ctx.lineTo(fx + 3, fy + 8 + Math.random() * 5);
    ctx.closePath();
    ctx.fill();
  }
}

function drawDistillAnimation(ctx, f, col, cd, rc, sim) {
  if (!state.simulation) return;
  var elapsed = Date.now() - state.simulation.startTime;
  var progress = Math.min(elapsed / sim.animationDurationMs, 1);

  var temp = sim.initialTemp + progress * (sim.secondFraction.boilingPoint - sim.initialTemp);
  if (progress < 0.5) {
    temp = sim.initialTemp + progress * 2 * (sim.firstFraction.boilingPoint - sim.initialTemp);
  } else {
    temp = sim.firstFraction.boilingPoint + (progress - 0.5) * 2 * (sim.secondFraction.boilingPoint - sim.firstFraction.boilingPoint);
  }
  state.distTemperature = Math.min(temp, sim.secondFraction.boilingPoint);

  var vapourY = col.y + col.height - progress * col.height;
  ctx.fillStyle = "rgba(200, 220, 255, 0.3)";
  ctx.fillRect(col.x + 3, vapourY, col.width - 6, col.y + col.height - vapourY);

  if (progress > 0.3) {
    var dropProgress = (progress - 0.3) / 0.7;
    var dropX = cd.x + dropProgress * cd.width;
    ctx.fillStyle = "rgba(180, 210, 240, 0.6)";
    ctx.beginPath();
    ctx.arc(dropX, cd.y + cd.height / 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (progress > 0.5) {
    var collectH = (progress - 0.5) * 2 * rc.height * 0.4;
    ctx.fillStyle = sim.firstFraction.color;
    ctx.fillRect(rc.x + 3, rc.y + rc.height - collectH - 3, rc.width - 6, collectH);
  }

  renderMonitorContent(state.experiment);

  if (progress < 1) {
    requestAnimationFrame(function() { drawCanvas(); });
  } else {
    state.simulation.done = true;
    state.distTemperature = sim.secondFraction.boilingPoint;
    renderStageContent();
    renderButtons();
  }
}

/* ── Titration Canvas ──────────────────────────── */

function drawTitrationCanvas(ctx, cw, ch) {
  var sim = SIMULATION_CONFIG["A4"];
  if (!sim) return;
  var b = sim.burette;
  var f = sim.flask;
  var st = sim.stand;
  var cl = sim.clamp;

  drawTitrationStand(ctx, st);
  drawTitrationClamp(ctx, cl, b);
  drawTitrationBurette(ctx, b, sim);
  drawTitrationFlask(ctx, f, sim);
  drawTitrationLabel(ctx, b, f);
}

function drawTitrationStand(ctx, st) {
  ctx.fillStyle = "#666";
  ctx.fillRect(st.x, st.y, st.width, st.height);
  ctx.fillStyle = "#888";
  ctx.fillRect(st.x - 15, st.y + st.height - 5, st.width + 30, 8);
}

function drawTitrationClamp(ctx, cl, b) {
  ctx.fillStyle = "#555";
  ctx.fillRect(cl.x, cl.y, cl.width, cl.height);
  ctx.fillRect(b.x - 3, cl.y + 2, 6, cl.height - 4);
}

function drawTitrationBurette(ctx, b, sim) {
  ctx.fillStyle = "#e8e8e8";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1.5;
  ctx.fillRect(b.x, b.y, b.width, b.height);
  ctx.strokeRect(b.x, b.y, b.width, b.height);

  var mlToPixel = b.height / b.maxML;
  var liquidTop = b.y + state.titrationVolume * mlToPixel;
  ctx.fillStyle = "rgba(180, 210, 240, 0.5)";
  ctx.fillRect(b.x + 2, liquidTop, b.width - 4, b.y + b.height - liquidTop - 2);

  ctx.strokeStyle = "#4a90d9";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(b.x + 2, liquidTop);
  ctx.lineTo(b.x + b.width - 2, liquidTop);
  ctx.stroke();

  for (var ml = 0; ml <= b.maxML; ml += 5) {
    var y = b.y + ml * mlToPixel;
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(b.x, y);
    ctx.lineTo(b.x + (ml % 10 === 0 ? 10 : 5), y);
    ctx.stroke();
    if (ml % 10 === 0) {
      ctx.fillStyle = "#666";
      ctx.font = "9px sans-serif";
      ctx.fillText(ml + "", b.x + 12, y + 3);
    }
  }

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("burette (HCl)", b.x - 10, b.y - 8);
}

function drawTitrationFlask(ctx, f, sim) {
  ctx.fillStyle = "#f0f0f0";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2, f.height * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);
  ctx.strokeRect(f.x + f.width * 0.3, f.y, f.width * 0.4, f.height * 0.4);

  var frac = Math.min(state.titrationVolume / sim.endpointVolume, 1.2);
  var r, g, b2;
  if (frac < 0.85) {
    r = 220; g = 100; b2 = 180;
  } else if (frac < 1.0) {
    var t = (frac - 0.85) / 0.15;
    r = Math.round(220 - t * 200);
    g = Math.round(100 - t * 80);
    b2 = Math.round(180 - t * 160);
  } else {
    r = 255; g = 255; b2 = 255;
  }
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b2 + ", 0.6)";
  ctx.beginPath();
  ctx.ellipse(f.x + f.width / 2, f.y + f.height * 0.7, f.width / 2 - 3, f.height * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#555";
  ctx.font = "10px sans-serif";
  ctx.fillText("conical flask (NaOH + indicator)", f.x - 30, f.y + f.height + 15);
}

function drawTitrationLabel(ctx, b, f) {
  var vol = state.titrationVolume.toFixed(2);
  ctx.fillStyle = "#333";
  ctx.font = "bold 11px sans-serif";
  ctx.fillText("Delivered: " + vol + " mL", b.x + b.width + 8, b.y + b.height / 2);
  ctx.font = "9px sans-serif";
  ctx.fillStyle = "#888";
  ctx.fillText("(simulated)", b.x + b.width + 8, b.y + b.height / 2 + 12);

  if (state.titrationEndpointReached && !state.titrationEndpointPassed) {
    ctx.fillStyle = "rgba(40, 167, 69, 0.7)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("✓ Endpoint reached", f.x - 20, f.y - 15);
  } else if (state.titrationEndpointPassed) {
    ctx.fillStyle = "rgba(220, 53, 69, 0.7)";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("✗ Endpoint passed!", f.x - 20, f.y - 15);
  }
}

/* ==============================================================
   SECTION 8B: M7 MINOR PRACTICALS — Shared Helpers & Stage Renderers
   ============================================================== */

function isM7(id) { return id && id.indexOf("M7") === 0; }

function m7AllDone(exp) {
  if (!exp) return false;
  return state.m7ActionDone && state.m7ObservationDone &&
    state.interpretation && state.interpretation.trim().length > 0 &&
    state.conclusion && state.conclusion.trim().length > 0;
}

function m7_5ionAllDone() {
  var sim = SIMULATION_CONFIG["M7_2"];
  if (!sim) return false;
  for (var i = 0; i < sim.ions.length; i++) {
    if (!state.m7_ionResults[sim.ions[i].id]) return false;
  }
  return true;
}

/* ── Shared M7 stage renderers ────────────────── */

function renderM7ObserveContent(exp) {
  if (!exp) return "";
  var html = '<h3>Observe</h3>';
  html += '<p>Examine the evidence from the experiment.</p>';
  html += '<p class="label">Simulated observation</p>';
  if (state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Observation recorded.</div>';
  } else {
    html += '<p>Complete the experiment action first.</p>';
  }
  html += '<div class="sim-note">Observations shown are simulated educational values.</div>';
  return html;
}

function renderM7RecordContent(exp) {
  if (!exp) return "";
  var html = '<h3>Record Observation</h3>';
  html += '<p>Record what you observed during the experiment.</p>';
  html += '<label for="m7-record-input">Your observation</label>';
  html += '<textarea id="m7-record-input" placeholder="Describe what you observed...">' +
    escapeHtml(state.interpretation || "") + '</textarea>';
  return html;
}

function renderM7InterpretContent(exp) {
  if (!exp) return "";
  var html = '<h3>Interpret</h3>';
  html += '<p>Based on your observation, interpret the results.</p>';
  html += '<label for="m7-interpret-input">Your interpretation</label>';
  html += '<textarea id="m7-interpret-input" placeholder="Write your interpretation here...">' +
    escapeHtml(state.interpretation || "") + '</textarea>';
  return html;
}

function renderM7ConcludeContent(exp) {
  if (!exp) return "";
  var html = '<h3>Conclusion</h3>';
  html += '<p>Write a conclusion for this experiment.</p>';
  html += '<label for="conclusion-input">Your Conclusion</label>';
  html += '<textarea id="conclusion-input" placeholder="Write your conclusion here...">' +
    escapeHtml(state.conclusion || "") + '</textarea>';
  return html;
}

function renderM7CompleteContent(exp) {
  if (!exp) return "";
  var html = '<h3>Experiment Complete</h3>';
  html += '<p class="label">Summary</p>';
  html += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
  html += '<p><strong>Section:</strong> ' + capitalizeFirst(exp.section) + '</p>';
  html += '<p><strong>SLO:</strong> ' + exp.slos.join(", ") + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>Observation:</strong> ' + escapeHtml(state.interpretation || "—") + '</p>';
  html += '<p><strong>Interpretation:</strong> ' + escapeHtml(state.interpretation || "—") + '</p>';
  html += '<p><strong>Conclusion:</strong> ' + escapeHtml(state.conclusion || "—") + '</p>';
  html += '<div class="sim-note">SIMULATED EDUCATIONAL VALUES — not real laboratory measurements.</div>';
  html += '<button class="btn btn-primary" id="btn-finish-experiment" style="margin-top:1rem;">Finish Experiment</button>';
  return html;
}

/* ── M7.1 Sublimation ─────────────────────────── */

function renderM7HeatContent(exp) {
  if (!exp) return "";
  var html = '<h3>Heat the Mixture</h3>';
  html += '<p>Heat the mixture in the evaporating dish to sublime the naphthalene.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Naphthalene has sublimed and collected on the funnel.</div>';
  } else {
    html += '<p>Click <strong>Start Heating</strong> to begin.</p>';
  }
  return html;
}

function renderM7CollectContent(exp) {
  if (!exp) return "";
  var html = '<h3>Collect Sublimate</h3>';
  html += '<p>Allow the apparatus to cool. The sublimed naphthalene is collected on the filter paper lining the funnel.</p>';
  html += '<p>Residue in the dish: <strong>sand and salt</strong></p>';
  html += '<p>Sublimate on funnel: <strong>naphthalene</strong></p>';
  return html;
}

/* ── M7.2 Flame Tests ─────────────────────────── */

function renderM7SelectIonContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG["M7_2"];
  var html = '<h3>Select an Ion</h3>';
  html += '<p>Choose the next ion to test.</p>';
  html += '<div class="tool-options">';
  for (var i = 0; i < sim.ions.length; i++) {
    var ion = sim.ions[i];
    var done = state.m7_ionResults[ion.id];
    var cls = done ? "btn btn-tool" : "btn btn-accent";
    html += '<button class="' + cls + '" data-ion="' + ion.id + '" ' + (done ? "disabled" : "") + '>' + ion.name + (done ? " ✓" : "") + '</button>';
  }
  html += '</div>';
  return html;
}

function renderM7IdentifyContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG["M7_2"];
  var ion = sim.ions[state.m7_ionIndex];
  if (!ion) return "";
  var res = state.m7_ionResults[ion.id] || {};
  var html = '<h3>Identify: ' + ion.name + '</h3>';
  html += '<p>Based on the flame colour, identify the ion.</p>';
  html += '<p class="label">Evidence</p>';
  html += '<p>Ion: <strong>' + ion.name + '</strong></p>';
  html += '<p>Flame colour: <strong>' + ion.flameColour + '</strong></p>';
  return html;
}

function renderM7NextIonContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG["M7_2"];
  var ion = sim.ions[state.m7_ionIndex];
  var doneCount = 0;
  for (var i = 0; i < sim.ions.length; i++) {
    if (state.m7_ionResults[sim.ions[i].id]) doneCount++;
  }
  var html = '<h3>Ion Identified: ' + (ion ? ion.name : "") + '</h3>';
  html += '<div class="feedback-correct">' + (ion ? ion.name : "") + ' identified.</div>';
  html += '<p>Identified: ' + doneCount + ' / ' + sim.ions.length + '</p>';
  if (doneCount < sim.ions.length) {
    html += '<p>Click <strong>Next</strong> to test the next ion.</p>';
  } else {
    html += '<p>All ions tested! Click <strong>Next</strong> to view the summary.</p>';
  }
  return html;
}

/* ── M7.3 CuSO₄ Crystals ─────────────────────── */

function renderM7DissolveContent(exp) {
  if (!exp) return "";
  var html = '<h3>Dissolve CuSO₄</h3>';
  html += '<p>Dissolve copper(II) sulphate powder in warm distilled water.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">CuSO₄ dissolved. Blue solution obtained.</div>';
  } else {
    html += '<p>Click <strong>Start</strong> to dissolve.</p>';
  }
  return html;
}

function renderM7ConcentrateContent(exp) {
  if (!exp) return "";
  var html = '<h3>Concentrate the Solution</h3>';
  html += '<p>Heat the solution to concentrate it by evaporation.</p>';
  html += '<div class="sim-note">ChemSim educational simulation choice.</div>';
  return html;
}

function renderM7CrystallizeContent(exp) {
  if (!exp) return "";
  var html = '<h3>Crystallize</h3>';
  html += '<p>Allow the solution to cool slowly for crystal formation.</p>';
  html += '<p>Blue crystals of CuSO₄·5H₂O should form.</p>';
  html += '<div class="sim-note">Crystal formation is a simulated educational value.</div>';
  return html;
}

/* ── M7.4/M7.5 Melting/Boiling Point ─────────── */

function renderM7MonitorContent(exp) {
  if (!exp) return "";
  var id = exp.id;
  var html = '<h3>Monitor Temperature</h3>';
  if (id === "M7_4") {
    html += '<p>Observe the temperature as naphthalene is heated.</p>';
    html += '<p>Expected melting point: <strong>~80°C</strong> (simulated)</p>';
  } else if (id === "M7_5") {
    html += '<p>Observe the temperature as ethyl alcohol is heated.</p>';
    html += '<p>Expected boiling point: <strong>~78°C</strong> (simulated)</p>';
  }
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Temperature recorded.</div>';
  } else {
    html += '<p>Click <strong>Start Heating</strong> to begin.</p>';
  }
  html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
  return html;
}

/* ── M7.6 Metal Displacement ──────────────────── */

function renderM7SelectMaterialsContent(exp) {
  if (!exp) return "";
  var html = '<h3>Select Materials</h3>';
  html += '<p>This experiment demonstrates the displacement of copper by zinc.</p>';
  html += '<p><strong>Metal:</strong> Zinc (Zn) granules</p>';
  html += '<p><strong>Solution:</strong> Copper(II) sulphate (CuSO₄)</p>';
  html += '<div class="sim-note">ChemSim educational simulation choice.</div>';
  return html;
}

function renderM7PerformReactionContent(exp) {
  if (!exp) return "";
  var html = '<h3>Perform Displacement Reaction</h3>';
  html += '<p>Add zinc granules to copper(II) sulphate solution.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Reaction complete. Colour change observed.</div>';
  } else {
    html += '<p>Click <strong>Start Reaction</strong> to begin.</p>';
  }
  return html;
}

/* ── M7.7 Water Test ──────────────────────────── */

function renderM7SelectSampleContent(exp) {
  if (!exp) return "";
  var html = '<h3>Select Sample</h3>';
  html += '<p>This test uses anhydrous copper(II) sulphate to detect water.</p>';
  html += '<p><strong>Sample:</strong> Anhydrous CuSO₄ (white powder)</p>';
  html += '<p><strong>Reagent:</strong> Distilled water</p>';
  return html;
}

/* ── M7.8 Water Purity ────────────────────────── */

function renderM7MPTestContent(exp) {
  if (!exp) return "";
  var html = '<h3>Melting Point Test</h3>';
  html += '<p>Determine the melting point of ice.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Melting point: 0°C (simulated)</div>';
  } else {
    html += '<p>Click <strong>Start Test</strong> to begin.</p>';
  }
  html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
  return html;
}

function renderM7RecordMPContent(exp) {
  if (!exp) return "";
  var html = '<h3>Record Melting Point</h3>';
  html += '<p>Record the observed melting point.</p>';
  html += '<p>Observed melting point: <strong>0°C</strong> (simulated)</p>';
  html += '<label for="m7-mp-record">Your record</label>';
  html += '<textarea id="m7-mp-record" placeholder="Record the melting point...">' +
    escapeHtml(state.interpretation || "") + '</textarea>';
  return html;
}

function renderM7BPTestContent(exp) {
  if (!exp) return "";
  var html = '<h3>Boiling Point Test</h3>';
  html += '<p>Determine the boiling point of the water sample.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Boiling point: 100°C (simulated)</div>';
  } else {
    html += '<p>Click <strong>Start Test</strong> to begin.</p>';
  }
  html += '<div class="sim-note">Temperature values are simulated educational values.</div>';
  return html;
}

function renderM7RecordBPContent(exp) {
  if (!exp) return "";
  var html = '<h3>Record Boiling Point</h3>';
  html += '<p>Record the observed boiling point.</p>';
  html += '<p>Observed boiling point: <strong>100°C</strong> (simulated)</p>';
  html += '<label for="m7-bp-record">Your record</label>';
  html += '<textarea id="m7-bp-record" placeholder="Record the boiling point...">' +
    escapeHtml(state.conclusion || "") + '</textarea>';
  return html;
}

/* ── M7 Canvas Drawing ────────────────────────── */

function drawM7Canvas(ctx, cw, ch) {
  var id = state.experiment ? state.experiment.id : "";
  if (!isM7(id)) return;
  ctx.fillStyle = "#e8edf2";
  ctx.fillRect(0, 0, cw, ch);
  var cx = cw / 2;
  ctx.fillStyle = "#333";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  if (id === "M7_2") {
    var sim = SIMULATION_CONFIG["M7_2"];
    var ion = sim.ions[state.m7_ionIndex];
    if (ion && state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = ion.flameHex;
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#333";
      ctx.fillText(ion.name + " — " + ion.flameColour, cx, ch / 2 + 80);
    } else {
      ctx.fillText("Flame test", cx, 30);
    }
  } else if (id === "M7_3") {
    ctx.fillText("CuSO₄·5H₂O Crystals", cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = "#3366cc";
      for (var i = 0; i < 5; i++) {
        ctx.fillRect(cx - 40 + i * 16, ch / 2 - 10, 12, 20);
      }
    }
  } else if (id === "M7_6") {
    ctx.fillText("Zn + CuSO₄ Displacement", cx, 30);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = "#cc6622";
      ctx.fillRect(cx - 30, ch / 2 - 20, 60, 40);
      ctx.fillStyle = "#333";
      ctx.fillText("Colour changed", cx, ch / 2 + 40);
    }
  } else {
    ctx.fillText(exp.title.substring(0, 40), cx, 30);
  }
  ctx.fillStyle = "#888";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("(simulated)", 10, ch - 10);
}

function onM7CanvasClick(mx, my) {
  // M7 canvas clicks — no interaction needed for most
}

/* ── M7 User Input & Buttons ──────────────────── */

function renderM7UserInput() {
  var id = state.experiment ? state.experiment.id : "";
  var html = "";
  if (id === "M7_1") {
    if (state.currentStage === "heat" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start Heating</button>';
    } else if (state.currentStage === "heat" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (id === "M7_2") {
    if (state.currentStage === "selectIon") {
      var sim = SIMULATION_CONFIG["M7_2"];
      html += '<div class="tool-options">';
      for (var i = 0; i < sim.ions.length; i++) {
        var ion = sim.ions[i];
        var done = state.m7_ionResults[ion.id];
        html += '<button class="btn ' + (done ? "btn-tool" : "btn-accent") + '" data-ion="' + ion.id + '" ' + (done ? "disabled" : "") + '>' + ion.name + (done ? " ✓" : "") + '</button>';
      }
      html += '</div>';
    }
    if (state.currentStage === "performTest" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start Flame Test</button>';
    } else if (state.currentStage === "performTest" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
    if (state.currentStage === "identify") {
      html += '<button class="btn btn-accent" id="btn-m7-confirm-ion">Confirm Identification</button>';
    }
    if (state.currentStage === "nextIon") {
      var sim2 = SIMULATION_CONFIG["M7_2"];
      var doneCount = 0;
      for (var j = 0; j < sim2.ions.length; j++) {
        if (state.m7_ionResults[sim2.ions[j].id]) doneCount++;
      }
      html += '<button class="btn btn-accent" id="btn-go-next">' + (doneCount < sim2.ions.length ? "Test Next Ion" : "View Summary") + '</button>';
    }
  }
  if (id === "M7_3") {
    if (state.currentStage === "dissolve" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start</button>';
    } else if (state.currentStage === "dissolve" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (id === "M7_4" || id === "M7_5") {
    if (state.currentStage === "heat" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start Heating</button>';
    } else if (state.currentStage === "heat" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (id === "M7_6") {
    if (state.currentStage === "performReaction" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start Reaction</button>';
    } else if (state.currentStage === "performReaction" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (id === "M7_7") {
    if (state.currentStage === "performTest" && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Add Water</button>';
    } else if (state.currentStage === "performTest" && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (id === "M7_8") {
    if ((state.currentStage === "meltingPointTest" || state.currentStage === "boilingPointTest") && !state.m7ActionDone) {
      html += '<button class="btn btn-primary" id="btn-m7-start">Start Test</button>';
    } else if ((state.currentStage === "meltingPointTest" || state.currentStage === "boilingPointTest") && state.m7ActionDone) {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (state.currentStage === "record" || state.currentStage === "recordMP" || state.currentStage === "recordBP") {
    html += '<button class="btn btn-accent" id="btn-m7-record">Record & Continue</button>';
  }
  if (state.currentStage === "interpret") {
    html += '<button class="btn btn-accent" id="btn-m7-interpret">Submit Interpretation</button>';
  }
  return html;
}

function renderM7Buttons() {
  var id = state.experiment ? state.experiment.id : "";
  if (state.currentStage === "selectIon") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "selectMaterials" || state.currentStage === "selectSample") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  } else if (state.simulation && !state.simulation.done) {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "In progress...";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "conclude") {
    var ready = m7AllDone(state.experiment);
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = ready ? "Next" : "Complete all steps first";
    dom.btnNext.disabled = !ready;
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

function startM7Action() {
  state.simulation = { startTime: Date.now(), done: false };
  state.m7ActionDone = false;
  renderCurrentStage();
  drawCanvas();
  var delay = 2500;
  setTimeout(function() {
    state.simulation.done = true;
    state.m7ActionDone = true;
    state.m7ObservationDone = true;
    renderStageContent();
    renderButtons();
    drawCanvas();
  }, delay);
}

function confirmM7Ion() {
  var sim = SIMULATION_CONFIG["M7_2"];
  var ion = sim.ions[state.m7_ionIndex];
  if (ion) {
    state.m7_ionResults[ion.id] = true;
    state.currentStage = "nextIon";
    renderCurrentStage();
  }
}

/* ==============================================================
   SECTION 9: SIMULATION CONTROL
   ============================================================== */

function onPracticalSelect(e) {
  var id = e.currentTarget.getAttribute("data-id");
  state.selectedExperimentId = id;
  state.experiment = findExperiment(id);
  var stages = getStages();
  state.currentStage = stages[1] || "objective";
  resetExperimentState();
  renderCurrentStage();
}

function resetExperimentState() {
  state.simulation = null;
  state.baselineDrawn = false;
  state.sampleApplied = false;
  state.solventPositioned = false;
  state.solventFrontMarked = false;
  state.paperInBeaker = false;
  state.measurePhase = "idle";
  state.measuredComponents = [];
  state.measuredSolventFront = false;
  state.solventFrontDist = 0;
  state.rfAnswers = {};
  state.interpretation = "";
  state.conclusion = "";
  state.prepareTool = null;
  state.feedback = "";
  state.distSetupComplete = false;
  state.distThermometerOk = false;
  state.distCondenserOk = false;
  state.distHeating = false;
  state.distTemperature = SIMULATION_CONFIG["A1"] ? SIMULATION_CONFIG["A1"].initialTemp : 25;
  state.distPhase = "idle";
  state.distCollected = false;
  state.distObservations = "";
  state.titrationRinseDone = false;
  state.titrationApparatusChoice1 = null;
  state.titrationApparatusChoice2 = null;
  state.titrationBuretteFilled = false;
  state.titrationSampleMeasured = false;
  state.titrationVolume = 0;
  state.titrationEndpointReached = false;
  state.titrationEndpointPassed = false;
  state.titrationReadingRecorded = false;
  state.titrationTrialIndex = 0;
  state.titrationTrials = [];
  state.titrationCalcAnswer = "";
  state.titrationCalcChecked = false;
  state.gasCurrentIndex = 0;
  state.gasResults = {};
  state.gasTestPerformed = false;
  state.gasTestObserved = false;
  state.m7_ionIndex = 0;
  state.m7_ionResults = {};
  state.m7ActionDone = false;
  state.m7ObservationDone = false;
}

function onBtnNext() {
  var id = state.experiment ? state.experiment.id : "";
  if ((id === "A2" || id === "A3") && state.currentStage === "run" && state.simulation && !state.simulation.done) {
    return;
  }
  if (id === "A5" && state.currentStage === "performTest" && state.simulation && !state.simulation.done) {
    return;
  }
  if (id && id.indexOf("M7") === 0 && state.simulation && !state.simulation.done) {
    return;
  }
  if (id === "A1" && state.currentStage === "monitor" && state.simulation && !state.simulation.done) {
    return;
  }
  nextStage();
}

function onBtnBack() {
  prevStage();
}

function onCanvasClick(e) {
  var rect = dom.canvas.getBoundingClientRect();
  var scaleX = dom.canvas.width / rect.width;
  var scaleY = dom.canvas.height / rect.height;
  var mx = (e.clientX - rect.left) * scaleX;
  var my = (e.clientY - rect.top) * scaleY;
  var id = state.experiment ? state.experiment.id : "";

  if (id === "A2" || id === "A3") {
    onChromCanvasClick(mx, my);
  } else if (id === "A1") {
    onDistillCanvasClick(mx, my);
  } else if (id === "A4") {
    onTitrationCanvasClick(mx, my);
  } else if (id === "A5") {
    onGasCanvasClick(mx, my);
  }
}

function onChromCanvasClick(mx, my) {
  var g = getCanvasGeometry();
  if (!g) return;
  switch (state.currentStage) {
    case "baseline":
      if (mx >= g.paperX && mx <= g.paperX + g.paperW && Math.abs(my - g.baseAbsY) < 30) {
        state.baselineDrawn = true;
        renderCurrentStage();
      }
      break;
    case "sample":
      if (!state.baselineDrawn) { state.feedback = "Draw the baseline first."; renderCurrentStage(); return; }
      if (Math.abs(my - g.baseAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
        state.sampleApplied = true;
        renderCurrentStage();
      } else if (mx >= g.paperX && mx <= g.paperX + g.paperW) {
        state.feedback = "Place the ink spot on the baseline.";
        renderCurrentStage();
      }
      break;
    case "markFront":
      if (state.simulation && state.simulation.done && Math.abs(my - g.topAbsY) < 40 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
        state.solventFrontMarked = true;
        renderCurrentStage();
      }
      break;
    case "measure":
      handleMeasureClick(g, mx, my);
      break;
  }
}

function onDistillCanvasClick(mx, my) {
  var sim = SIMULATION_CONFIG["A1"];
  if (!sim) return;
  var col = sim.column;
  var cd = sim.condenser;

  if (state.currentStage === "setUp") {
    if (!state.distThermometerOk) {
      var nearColHead = mx >= col.x - 10 && mx <= col.x + col.width + 20 && my >= col.y - 10 && my <= col.y + 30;
      if (nearColHead) {
        state.distThermometerOk = true;
        renderCurrentStage();
      }
    } else if (!state.distCondenserOk) {
      var nearCondenser = mx >= cd.x - 10 && mx <= cd.x + cd.width + 10 && my >= cd.y - 15 && my <= cd.y + cd.height + 15;
      if (nearCondenser) {
        state.distCondenserOk = true;
        renderCurrentStage();
      }
    }
  }
}

function onTitrationCanvasClick(mx, my) {
  var sim = SIMULATION_CONFIG["A4"];
  if (!sim) return;
  if (state.currentStage === "fillBurette" && !state.titrationBuretteFilled) {
    var nearBurette = mx >= sim.burette.x - 20 && mx <= sim.burette.x + sim.burette.width + 20 &&
      my >= sim.burette.y - 10 && my <= sim.burette.y + sim.burette.height + 10;
    if (nearBurette) {
      state.titrationBuretteFilled = true;
      renderCurrentStage();
    }
  }
  if (state.currentStage === "measureSample" && !state.titrationSampleMeasured) {
    var nearFlask = mx >= sim.flask.x - 20 && mx <= sim.flask.x + sim.flask.width + 20 &&
      my >= sim.flask.y - 20 && my <= sim.flask.y + sim.flask.height + 20;
    if (nearFlask) {
      state.titrationSampleMeasured = true;
      renderCurrentStage();
    }
  }
}

function handleTitrationSlider(val) {
  var sim = SIMULATION_CONFIG["A4"];
  if (!sim || state.currentStage !== "titrate") return;
  var newVolume = (val / 100) * sim.burette.maxML;
  state.titrationVolume = Math.min(newVolume, sim.burette.maxML);

  if (state.titrationVolume >= sim.endpointVolume - sim.endpointTolerance &&
      state.titrationVolume <= sim.endpointVolume + sim.endpointTolerance) {
    state.titrationEndpointReached = true;
    state.titrationEndpointPassed = false;
  } else if (state.titrationVolume > sim.endpointVolume + sim.endpointTolerance) {
    state.titrationEndpointReached = false;
    state.titrationEndpointPassed = true;
  } else {
    state.titrationEndpointReached = false;
    state.titrationEndpointPassed = false;
  }
  renderStageContent();
  renderButtons();
  drawCanvas();
}

function handleMeasureClick(g, mx, my) {
  if (state.measurePhase === "idle") {
    if (Math.abs(my - g.baseAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
      state.measurePhase = "baseline_done";
      renderCurrentStage();
    }
  } else if (state.measurePhase === "baseline_done") {
    if (Math.abs(my - g.topAbsY) < 25 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
      state.measurePhase = "solvent_done";
      var sim = SIMULATION_CONFIG[state.experiment.id];
      state.solventFrontDist = sim.solventFrontMaxDist / 35;
      renderCurrentStage();
    }
  } else if (state.measurePhase === "solvent_done") {
    var sim = SIMULATION_CONFIG[state.experiment.id];
    for (var i = 0; i < sim.components.length; i++) {
      var c = sim.components[i];
      var spotDist = (sim.paper.baselineY - sim.paper.topY) * c.relativeRate;
      var spotAbsY = g.baseAbsY - spotDist;
      if (Math.abs(my - spotAbsY) < 15 && mx >= g.paperX && mx <= g.paperX + g.paperW) {
        var already = state.measuredComponents.some(function(mc) { return mc.name === c.name; });
        if (!already) {
          state.measuredComponents.push({ name: c.name, color: c.color, distance: sim.solventFrontMaxDist * c.relativeRate / 35 });
          if (state.measuredComponents.length === sim.components.length) state.measurePhase = "done";
          renderCurrentStage();
        }
        break;
      }
    }
  }
}

function onStageContentClick(e) {
  var target = e.target;
  if (target.classList.contains("btn-tool")) {
    var tool = target.getAttribute("data-tool");
    var gasAttr = target.getAttribute("data-gas");
    var testAttr = target.getAttribute("data-test");
    var ionAttr = target.getAttribute("data-ion");
    if (gasAttr && state.experiment && state.experiment.id === "A5") {
      var sim = SIMULATION_CONFIG["A5"];
      for (var i = 0; i < sim.gases.length; i++) {
        if (sim.gases[i].id === gasAttr) {
          state.gasCurrentIndex = i;
          state.gasTestPerformed = false;
          state.gasTestObserved = false;
          state.currentStage = "selectTest";
          renderCurrentStage();
          break;
        }
      }
    } else if (testAttr && state.experiment && state.experiment.id === "A5") {
      var gas = getGasByIndex(state.gasCurrentIndex);
      if (gas) {
        state.gasResults[gas.id] = state.gasResults[gas.id] || {};
        state.gasResults[gas.id].selectedTest = testAttr;
        state.currentStage = "performTest";
        renderCurrentStage();
      }
    } else if (ionAttr && state.experiment && state.experiment.id === "M7_2") {
      var simM72 = SIMULATION_CONFIG["M7_2"];
      for (var mi = 0; mi < simM72.ions.length; mi++) {
        if (simM72.ions[mi].id === ionAttr && !state.m7_ionResults[ionAttr]) {
          state.m7_ionIndex = mi;
          state.m7ActionDone = false;
          state.currentStage = "performTest";
          renderCurrentStage();
          break;
        }
      }
    } else if (state.currentStage === "prepare" && state.experiment && state.experiment.id === "A4") {
      if (tool === "burette" || tool === "measuring-cylinder" || tool === "beaker") {
        state.titrationApparatusChoice1 = tool;
      } else if (tool === "volumetric-pipette" || tool === "burette2" || tool === "dropper") {
        state.titrationApparatusChoice2 = tool;
      }
    } else {
      state.prepareTool = tool;
    }
    renderCurrentStage();
  }
}

function onUserInputClick(e) {
  var target = e.target;
  if (target.id === "btn-check-setup") checkSetup();
  if (target.id === "btn-start-run" && !state.simulation) startChromSimulation();
  if (target.id === "btn-start-heating" && !state.simulation) startDistillSimulation();
  if (target.getAttribute && target.getAttribute("data-gas") && state.experiment && state.experiment.id === "A5") {
    var gasId = target.getAttribute("data-gas");
    var simA5 = SIMULATION_CONFIG["A5"];
    for (var gi = 0; gi < simA5.gases.length; gi++) {
      if (simA5.gases[gi].id === gasId) {
        state.gasCurrentIndex = gi;
        state.gasTestPerformed = false;
        state.gasTestObserved = false;
        state.currentStage = "selectTest";
        renderCurrentStage();
        break;
      }
    }
  }
  if (target.getAttribute && target.getAttribute("data-test") && state.experiment && state.experiment.id === "A5") {
    var gasT = getGasByIndex(state.gasCurrentIndex);
    if (gasT) {
      state.gasResults[gasT.id] = state.gasResults[gasT.id] || {};
      state.gasResults[gasT.id].selectedTest = target.getAttribute("data-test");
      state.currentStage = "performTest";
      renderCurrentStage();
    }
  }
  if (target.id === "btn-record-collection") {
    state.distCollected = true;
    renderCurrentStage();
  }
  if (target.id === "btn-fill-burette") {
    state.titrationBuretteFilled = true;
    renderCurrentStage();
  }
  if (target.id === "btn-measure-sample") {
    state.titrationSampleMeasured = true;
    renderCurrentStage();
  }
  if (target.id === "btn-record-titre") {
    var sim = SIMULATION_CONFIG["A4"];
    if (sim && state.titrationTrialIndex < sim.trials.length) {
      state.titrationTrials.push({
        volume: state.titrationVolume,
        endpointReached: state.titrationEndpointReached
      });
      state.titrationTrialIndex++;
      state.titrationVolume = 0;
      state.titrationEndpointReached = false;
      state.titrationEndpointPassed = false;
      renderCurrentStage();
    }
  }
  if (target.id === "btn-perform-test" && !state.simulation) {
    startGasTest();
  }
  if (target.id === "btn-go-next") {
    if (state.currentStage === "performTest" && state.gasTestPerformed) {
      state.currentStage = "observe";
      renderCurrentStage();
    } else if (state.currentStage === "nextGas") {
      var sim3 = SIMULATION_CONFIG["A5"];
      var confirmedCount = 0;
      for (var k = 0; k < sim3.gases.length; k++) {
        if (gasIsConfirmed(sim3.gases[k].id)) confirmedCount++;
      }
      if (confirmedCount < sim3.gases.length) {
        state.currentStage = "selectGas";
        renderCurrentStage();
      } else {
        state.currentStage = "summary";
        renderCurrentStage();
      }
    }
  }
  if (target.id === "btn-record-gas") {
    var gasKey = getGasKey(state.gasCurrentIndex);
    var recEl = document.getElementById("gas-record-input");
    if (recEl && recEl.value.trim()) {
      state.gasResults[gasKey] = state.gasResults[gasKey] || {};
      state.gasResults[gasKey].recorded = recEl.value.trim();
      state.currentStage = "interpret";
      renderCurrentStage();
    }
  }
  if (target.id === "btn-interpret-gas") {
    var gasKey2 = getGasKey(state.gasCurrentIndex);
    var interpEl = document.getElementById("gas-interpret-input");
    if (interpEl && interpEl.value.trim()) {
      state.gasResults[gasKey2] = state.gasResults[gasKey2] || {};
      state.gasResults[gasKey2].interpretation = interpEl.value.trim();
      state.currentStage = "confirm";
      renderCurrentStage();
    }
  }
  if (target.id === "btn-confirm-gas") {
    var gasKey3 = getGasKey(state.gasCurrentIndex);
    state.gasResults[gasKey3] = state.gasResults[gasKey3] || {};
    state.gasResults[gasKey3].confirmed = true;
    state.currentStage = "nextGas";
    renderCurrentStage();
  }
  if (target.id === "btn-go-summary") {
    state.currentStage = "summary";
    renderCurrentStage();
  }
  if (target.id === "btn-m7-start") {
    startM7Action();
  }
  if (target.id === "btn-m7-confirm-ion") {
    confirmM7Ion();
  }
  if (target.id === "btn-m7-record") {
    var recEl = document.getElementById("m7-record-input") || document.getElementById("m7-mp-record") || document.getElementById("m7-bp-record");
    if (recEl && recEl.value.trim()) {
      state.interpretation = recEl.value.trim();
    }
    if (state.currentStage === "recordMP") {
      state.currentStage = "boilingPointTest";
    } else if (state.currentStage === "recordBP") {
      state.currentStage = "interpret";
    } else {
      state.currentStage = "interpret";
    }
    state.m7ActionDone = false;
    renderCurrentStage();
  }
  if (target.id === "btn-m7-interpret") {
    var interpEl = document.getElementById("m7-interpret-input");
    if (interpEl && interpEl.value.trim()) {
      state.interpretation = interpEl.value.trim();
      state.currentStage = "conclude";
      renderCurrentStage();
    }
  }
  if (target.id === "btn-go-next") {
    var id = state.experiment ? state.experiment.id : "";
    if (id === "M7_1") {
      state.currentStage = "collect";
      renderCurrentStage();
    } else if (id === "M7_2") {
      var sim = SIMULATION_CONFIG["M7_2"];
      var doneCount = 0;
      for (var k = 0; k < sim.ions.length; k++) {
        if (state.m7_ionResults[sim.ions[k].id]) doneCount++;
      }
      if (doneCount < sim.ions.length) {
        state.m7ActionDone = false;
        state.currentStage = "selectIon";
      } else {
        state.currentStage = "summary";
      }
      renderCurrentStage();
    } else if (id === "M7_3") {
      var stages = state.experiment.stages;
      var ci = stages.indexOf(state.currentStage);
      if (ci < stages.length - 1) {
        state.m7ActionDone = false;
        state.currentStage = stages[ci + 1];
      }
      renderCurrentStage();
    } else if (id === "M7_8") {
      if (state.currentStage === "meltingPointTest") {
        state.m7ActionDone = false;
        state.currentStage = "recordMP";
      } else if (state.currentStage === "boilingPointTest") {
        state.m7ActionDone = false;
        state.currentStage = "recordBP";
      }
      renderCurrentStage();
    } else {
      nextStage();
    }
  }
  if (target.id === "btn-finish-experiment") {
    if (state.currentStage === "complete") {
      state.currentStage = "select";
      state.selectedExperimentId = null;
      state.experiment = null;
      renderCurrentStage();
    } else {
      nextStage();
    }
  }
}

/* ==============================================================
   SECTION 8A: A5 GAS DETECTION — Stage Renderers & Helpers
   ============================================================== */

function getGasKey(index) {
  var sim = SIMULATION_CONFIG["A5"];
  if (!sim || !sim.gases[index]) return null;
  return sim.gases[index].id;
}

function getGasByIndex(index) {
  var sim = SIMULATION_CONFIG["A5"];
  if (!sim || !sim.gases[index]) return null;
  return sim.gases[index];
}

function gasIsConfirmed(gasId) {
  return state.gasResults[gasId] && state.gasResults[gasId].confirmed;
}

function allGasesConfirmed() {
  var sim = SIMULATION_CONFIG["A5"];
  if (!sim) return false;
  for (var i = 0; i < sim.gases.length; i++) {
    if (!gasIsConfirmed(sim.gases[i].id)) return false;
  }
  return true;
}

function renderPrepareGasContent(exp) {
  if (!exp) return "";
  var html = '<h3>Prepare for Gas Detection</h3>';
  html += '<p>You will test three gases: NH₃, CO₂, and Cl₂.</p>';
  html += '<p>For each gas, you will:</p>';
  html += '<ul>';
  html += '<li>Select the gas</li>';
  html += '<li>Select the appropriate test</li>';
  html += '<li>Perform the virtual test</li>';
  html += '<li>Observe and record the evidence</li>';
  html += '<li>Interpret and confirm the gas</li>';
  html += '</ul>';
  html += '<div class="sim-note">All observations shown are simulated educational values.</div>';
  return html;
}

function renderSelectGasContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG["A5"];
  var html = '<h3>Select a Gas</h3>';
  html += '<p>Choose the next gas to test.</p>';
  html += '<div class="tool-options">';
  for (var i = 0; i < sim.gases.length; i++) {
    var g = sim.gases[i];
    var done = gasIsConfirmed(g.id);
    var cls = done ? "btn btn-tool" : "btn btn-accent";
    var label = g.name + (done ? " ✓ Confirmed" : "");
    html += '<button class="' + cls + '" data-gas="' + g.id + '" ' + (done ? "disabled" : "") + '>' + label + '</button>';
  }
  html += '</div>';
  return html;
}

function renderSelectTestContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var html = '<h3>Select Test for ' + gas.name + '</h3>';
  html += '<p>Choose the correct test to identify <strong>' + gas.fullName + '</strong>.</p>';
  html += '<div class="tool-options">';
  for (var i = 0; i < gas.testOptions.length; i++) {
    var t = gas.testOptions[i];
    html += '<button class="btn btn-tool" data-test="' + t.id + '">' + t.label + '</button>';
  }
  html += '</div>';
  html += '<div class="sim-note">Select the most appropriate test for this gas.</div>';
  return html;
}

function renderPerformTestContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var res = state.gasResults[gas.id] || {};
  var html = '<h3>Perform Test: ' + gas.name + '</h3>';
  html += '<p>Gas: <strong>' + gas.fullName + '</strong></p>';
  html += '<p>Test: <strong>' + gas.correctTestLabel + '</strong></p>';
  if (state.gasTestPerformed && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Test performed. Observation: ' + gas.observedChange + '</div>';
    html += '<div class="sim-note">This is a simulated educational value.</div>';
  } else {
    html += '<p>Click <strong>Start Test</strong> to perform the virtual test.</p>';
  }
  return html;
}

function renderGasObserveContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var html = '<h3>Observe: ' + gas.name + '</h3>';
  html += '<p>Examine the evidence from the test.</p>';
  html += '<p class="label">Simulated observation</p>';
  html += '<p><strong>' + gas.observedChange + '</strong></p>';
  html += '<div class="sim-note">The observation shown is a simulated educational value.</div>';
  return html;
}

function renderGasRecordContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var res = state.gasResults[gas.id] || {};
  var html = '<h3>Record Observation: ' + gas.name + '</h3>';
  html += '<p>Record what you observed during the test.</p>';
  html += '<label for="gas-record-input">Your observation</label>';
  html += '<textarea id="gas-record-input" placeholder="Describe what you observed...">' +
    escapeHtml(res.recorded || "") + '</textarea>';
  return html;
}

function renderGasInterpretContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var res = state.gasResults[gas.id] || {};
  var html = '<h3>Interpret: ' + gas.name + '</h3>';
  html += '<p>Based on your observation, what does this tell you about the gas?</p>';
  html += '<p class="label">Guiding question</p>';
  html += '<p>Does the evidence confirm the identity of ' + gas.fullName + '?</p>';
  html += '<label for="gas-interpret-input">Your interpretation</label>';
  html += '<textarea id="gas-interpret-input" placeholder="Write your interpretation here...">' +
    escapeHtml(res.interpretation || "") + '</textarea>';
  return html;
}

function renderConfirmGasContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return "";
  var res = state.gasResults[gas.id] || {};
  var html = '<h3>Confirm: ' + gas.name + '</h3>';
  html += '<p>Based on your observation and interpretation, confirm the identity of the gas.</p>';
  html += '<p class="label">Evidence</p>';
  html += '<p>Gas: <strong>' + gas.fullName + '</strong></p>';
  html += '<p>Test: <strong>' + gas.correctTestLabel + '</strong></p>';
  html += '<p>Observation: <strong>' + (res.recorded || "—") + '</strong></p>';
  html += '<p>Interpretation: <strong>' + (res.interpretation || "—") + '</strong></p>';
  html += '<p>Expected observation: <strong>' + gas.observedChange + '</strong></p>';
  html += '<div class="sim-note">Click Confirm to mark this gas as identified.</div>';
  return html;
}

function renderNextGasContent(exp) {
  if (!exp) return "";
  var gas = getGasByIndex(state.gasCurrentIndex);
  var sim = SIMULATION_CONFIG["A5"];
  var confirmedCount = 0;
  for (var i = 0; i < sim.gases.length; i++) {
    if (gasIsConfirmed(sim.gases[i].id)) confirmedCount++;
  }
  var html = '<h3>Gas Confirmed: ' + (gas ? gas.name : "") + '</h3>';
  html += '<div class="feedback-correct">' + (gas ? gas.name : "") + ' has been confirmed.</div>';
  html += '<p>Confirmed: ' + confirmedCount + ' / ' + sim.gases.length + '</p>';
  if (confirmedCount < sim.gases.length) {
    html += '<p>Click <strong>Next</strong> to test the next gas.</p>';
  } else {
    html += '<p>All gases tested! Click <strong>Next</strong> to view the summary.</p>';
  }
  return html;
}

function renderSummaryContent(exp) {
  if (!exp) return "";
  var id = exp.id;
  if (id === "M7_2") {
    var simM72 = SIMULATION_CONFIG["M7_2"];
    var html = '<h3>Summary of Flame Tests</h3>';
    html += '<table class="measure-table">';
    html += '<thead><tr><th>Ion</th><th>Flame Colour</th><th>Identified</th></tr></thead><tbody>';
    for (var i = 0; i < simM72.ions.length; i++) {
      var ion = simM72.ions[i];
      var res = state.m7_ionResults[ion.id];
      html += '<tr>';
      html += '<td>' + ion.name + '</td>';
      html += '<td>' + ion.flameColour + '</td>';
      html += '<td>' + (res ? "✓" : "—") + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table>';
    html += '<div class="sim-note">All observations are simulated educational values.</div>';
    return html;
  }
  if (id && id.indexOf("M7") === 0) {
    var html2 = '<h3>Experiment Summary</h3>';
    html2 += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
    html2 += '<p>Observations recorded are simulated educational values.</p>';
    return html2;
  }
  var sim = SIMULATION_CONFIG["A5"];
  var htmlA5 = '<h3>Summary of Gas Tests</h3>';
  htmlA5 += '<table class="measure-table">';
  htmlA5 += '<thead><tr><th>Gas</th><th>Test</th><th>Recorded Observation</th><th>Interpretation</th><th>Confirmation</th></tr></thead><tbody>';
  for (var i2 = 0; i2 < sim.gases.length; i2++) {
    var g = sim.gases[i2];
    var res2 = state.gasResults[g.id] || {};
    htmlA5 += '<tr>';
    htmlA5 += '<td>' + g.name + '</td>';
    htmlA5 += '<td>' + g.correctTestLabel + '</td>';
    htmlA5 += '<td>' + escapeHtml(res2.recorded || "—") + '</td>';
    htmlA5 += '<td>' + escapeHtml(res2.interpretation || "—") + '</td>';
    htmlA5 += '<td>' + (res2.confirmed ? "✓ Confirmed" : "—") + '</td>';
    htmlA5 += '</tr>';
  }
  htmlA5 += '</tbody></table>';
  htmlA5 += '<div class="sim-note">All observations are simulated educational values.</div>';
  return htmlA5;
}

function renderGasConcludeContent(exp) {
  if (!exp) return "";
  var html = '<h3>Conclusion</h3>';
  html += '<p>Write a conclusion summarising the detection and confirmation of all three gases.</p>';
  html += '<p>Your conclusion should address:</p>';
  html += '<ul>';
  html += '<li>Which gases were tested</li>';
  html += '<li>Which tests confirmed each gas</li>';
  html += '<li>The key observations for each gas</li>';
  html += '</ul>';
  html += '<label for="conclusion-input">Your Conclusion</label>';
  html += '<textarea id="conclusion-input" placeholder="Write your conclusion here...">' +
    escapeHtml(state.conclusion || "") + '</textarea>';
  return html;
}

function renderCompleteGasContent(exp) {
  if (!exp) return "";
  var sim = SIMULATION_CONFIG["A5"];
  var html = '<h3>Experiment Complete</h3>';
  html += '<p class="label">Summary</p>';
  html += '<p><strong>Practical:</strong> ' + escapeHtml(exp.title) + '</p>';
  html += '<p><strong>Section:</strong> ' + capitalizeFirst(exp.section) + ' Practical</p>';
  html += '<p><strong>SLO:</strong> ' + exp.slos.join(", ") + '</p>';
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p><strong>Gases confirmed:</strong> ' + sim.gases.length + '</p>';
  for (var i = 0; i < sim.gases.length; i++) {
    var g = sim.gases[i];
    var res = state.gasResults[g.id] || {};
    html += '<p>' + g.name + ' — Test: ' + g.correctTestLabel + ' — ' + (res.confirmed ? "✓ Confirmed" : "—") + '</p>';
    html += '<p style="margin-left:1rem;">Observation: ' + escapeHtml(res.recorded || "—") + '</p>';
    html += '<p style="margin-left:1rem;">Interpretation: ' + escapeHtml(res.interpretation || "—") + '</p>';
  }
  html += '<hr style="margin:0.75rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<p class="label">Your Conclusion</p><p>' + escapeHtml(state.conclusion || "—") + '</p>';
  html += '<div class="sim-note">All observations are simulated educational values.</div>';
  html += '<button class="btn btn-primary" id="btn-finish-experiment" style="margin-top:1rem;">Finish Experiment</button>';
  return html;
}

/* ── A5 Canvas Drawing ────────────────────────── */

function drawGasCanvas(ctx, cw, ch) {
  if (state.currentStage !== "performTest") return;
  var gas = getGasByIndex(state.gasCurrentIndex);
  if (!gas) return;
  var cx = cw / 2;
  var cy = ch / 2;
  var sim = SIMULATION_CONFIG["A5"];
  var gasConfig = null;
  for (var i = 0; i < sim.gases.length; i++) {
    if (sim.gases[i].id === gas.id) { gasConfig = sim.gases[i]; break; }
  }
  if (!gasConfig) return;

  ctx.fillStyle = "#e8edf2";
  ctx.fillRect(0, 0, cw, ch);

  ctx.fillStyle = "#333";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Test: " + gas.correctTestLabel, cx, 30);

  var tubeX = cx - 25;
  var tubeY = 60;
  var tubeW = 50;
  var tubeH = 160;

  ctx.strokeStyle = "#666";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tubeX, tubeY);
  ctx.lineTo(tubeX, tubeY + tubeH);
  ctx.arcTo(tubeX, tubeY + tubeH + 20, tubeX + tubeW / 2, tubeY + tubeH + 20, 25);
  ctx.arcTo(tubeX + tubeW, tubeY + tubeH + 20, tubeX + tubeW, tubeY + tubeH, 25);
  ctx.lineTo(tubeX + tubeW, tubeY);
  ctx.stroke();

  if (gas.id === "CO2") {
    var limeCol = (state.gasTestPerformed && state.simulation && state.simulation.done)
      ? gasConfig.limeColourAfter : "#e8e8e0";
    ctx.fillStyle = limeCol;
    ctx.fillRect(tubeX + 4, tubeY + tubeH - 60, tubeW - 8, 60);
    ctx.fillStyle = "#555";
    ctx.font = "10px sans-serif";
    ctx.fillText("limewater", cx, tubeY + tubeH - 25);
  }

  if (state.gasTestPerformed && state.simulation && state.simulation.done) {
    var litmusY = tubeY + 10;
    if (gas.id === "NH3") {
      ctx.fillStyle = gasConfig.litmusColourAfter;
      ctx.fillRect(cx - 15, litmusY, 30, 15);
      ctx.fillStyle = "#333";
      ctx.font = "10px sans-serif";
      ctx.fillText("red → blue", cx, litmusY + 30);
    } else if (gas.id === "Cl2") {
      ctx.fillStyle = gasConfig.litmusColourAfter;
      ctx.fillRect(cx - 15, litmusY, 30, 15);
      ctx.fillStyle = "#333";
      ctx.font = "10px sans-serif";
      ctx.fillText("bleached white", cx, litmusY + 30);
    } else if (gas.id === "CO2") {
      ctx.fillStyle = "rgba(220,53,69,0.5)";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("Limewater turned milky!", cx, tubeY + 10);
    }
  }

  ctx.fillStyle = "#888";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("(simulated)", 10, ch - 10);
  ctx.textAlign = "center";
}

function onGasCanvasClick(mx, my) {
  // A5 performTest stage — no canvas click interaction needed
}

/* ── A5 User Input & Buttons ──────────────────── */

function renderGasUserInput() {
  var html = "";
  if (state.currentStage === "selectGas") {
    var sim = SIMULATION_CONFIG["A5"];
    html += '<div class="tool-options">';
    for (var i = 0; i < sim.gases.length; i++) {
      var g = sim.gases[i];
      var done = gasIsConfirmed(g.id);
      var cls = done ? "btn btn-tool" : "btn btn-accent";
      html += '<button class="' + cls + '" data-gas="' + g.id + '" ' + (done ? "disabled" : "") + '>' + g.name + (done ? " ✓" : "") + '</button>';
    }
    html += '</div>';
  }
  if (state.currentStage === "selectTest") {
    var gas = getGasByIndex(state.gasCurrentIndex);
    if (gas) {
      html += '<div class="tool-options">';
      for (var j = 0; j < gas.testOptions.length; j++) {
        var t = gas.testOptions[j];
        html += '<button class="btn btn-tool" data-test="' + t.id + '">' + t.label + '</button>';
      }
      html += '</div>';
    }
  }
  if (state.currentStage === "performTest") {
    if (!state.gasTestPerformed || !state.simulation || !state.simulation.done) {
      html += '<button class="btn btn-primary" id="btn-perform-test">Start Test</button>';
    } else {
      html += '<button class="btn btn-accent" id="btn-go-next">Next</button>';
    }
  }
  if (state.currentStage === "record") {
    html += '<button class="btn btn-accent" id="btn-record-gas">Record & Continue</button>';
  }
  if (state.currentStage === "interpret") {
    html += '<button class="btn btn-accent" id="btn-interpret-gas">Submit Interpretation</button>';
  }
  if (state.currentStage === "confirm") {
    html += '<button class="btn btn-primary" id="btn-confirm-gas">Confirm Gas</button>';
  }
  if (state.currentStage === "nextGas") {
    var sim2 = SIMULATION_CONFIG["A5"];
    var confirmedCount = 0;
    for (var k = 0; k < sim2.gases.length; k++) {
      if (gasIsConfirmed(sim2.gases[k].id)) confirmedCount++;
    }
    if (confirmedCount < sim2.gases.length) {
      html += '<button class="btn btn-accent" id="btn-go-next">Test Next Gas</button>';
    } else {
      html += '<button class="btn btn-accent" id="btn-go-summary">View Summary</button>';
    }
  }
  if (state.currentStage === "conclude") {
    html += '<button class="btn btn-accent" id="btn-go-summary">View Summary</button>';
  }
  return html;
}

function renderGasButtons() {
  if (state.currentStage === "selectGas") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "selectTest") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "performTest") {
    if (state.gasTestPerformed && state.simulation && state.simulation.done) {
      dom.btnNext.style.display = "";
      dom.btnNext.textContent = "Next";
      dom.btnNext.disabled = false;
    } else {
      dom.btnNext.style.display = "";
      dom.btnNext.textContent = "Perform test first";
      dom.btnNext.disabled = true;
    }
  } else if (state.currentStage === "record") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "interpret") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "confirm") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = true;
  } else if (state.currentStage === "nextGas") {
    var sim = SIMULATION_CONFIG["A5"];
    var confirmedCount = 0;
    for (var i = 0; i < sim.gases.length; i++) {
      if (gasIsConfirmed(sim.gases[i].id)) confirmedCount++;
    }
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = confirmedCount < sim.gases.length ? "Test Next Gas" : "View Summary";
    dom.btnNext.disabled = false;
  } else if (state.currentStage === "summary") {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  } else if (state.currentStage === "conclude") {
    var a5Ready = allGasesConfirmed() &&
      state.conclusion && state.conclusion.trim().length > 0;
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = a5Ready ? "Next" : "Complete all steps first";
    dom.btnNext.disabled = !a5Ready;
  } else {
    dom.btnNext.style.display = "";
    dom.btnNext.textContent = "Next";
    dom.btnNext.disabled = false;
  }
}

function startGasTest() {
  state.simulation = { startTime: Date.now(), done: false };
  state.gasTestPerformed = false;
  state.gasTestObserved = false;
  renderCurrentStage();
  drawCanvas();
  var sim = SIMULATION_CONFIG["A5"];
  var delay = 2500;
  setTimeout(function() {
    state.simulation.done = true;
    state.gasTestPerformed = true;
    state.gasTestObserved = true;
    var gas = getGasByIndex(state.gasCurrentIndex);
    if (gas) {
      state.gasResults[gas.id] = state.gasResults[gas.id] || {};
      state.gasResults[gas.id].gas = gas.id;
      state.gasResults[gas.id].selectedTest = gas.correctTest;
      state.gasResults[gas.id].performed = true;
      state.gasResults[gas.id].observed = true;
    }
    renderStageContent();
    renderButtons();
    drawCanvas();
  }, delay);
}

/* ==============================================================
   SECTION 9: SIMULATION CONTROL
   ============================================================== */

function checkSetup() {
  var slider = document.getElementById("solvent-slider");
  var val = slider ? parseInt(slider.value, 10) : 50;
  var g = getCanvasGeometry();
  if (!g) return;
  var bx = g.paperX - 35;
  var bw = g.paperW + 70;
  var bh = g.paperH + 50;
  var by = g.paperTop + g.paperH - bh + 65;
  var solventLevel = by + bh - (val / 100) * bh * 0.4;
  if (solventLevel > g.baseAbsY) {
    state.feedback = "setup_ok";
    state.paperInBeaker = true;
  } else {
    state.feedback = "solvent_above_baseline";
    state.paperInBeaker = false;
  }
  renderStageContent();
  drawCanvas();
}

function startChromSimulation() {
  state.simulation = { startTime: Date.now(), done: false };
  state.currentStage = "run";
  renderCurrentStage();
  drawCanvas();
  var sim = SIMULATION_CONFIG[state.experiment.id];
  setTimeout(function() {
    state.simulation.done = true;
    renderStageContent();
    renderButtons();
  }, sim.animationDurationMs + 200);
}

function startDistillSimulation() {
  state.distHeating = true;
  state.simulation = { startTime: Date.now(), done: false };
  state.currentStage = "monitor";
  renderCurrentStage();
  drawCanvas();
}

function checkRfValues() {
  var sim = SIMULATION_CONFIG[state.experiment.id];
  var solventDist = state.solventFrontDist;
  for (var i = 0; i < sim.components.length; i++) {
    var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
    var expectedRf = dist / solventDist;
    var key = "rf_" + i;
    var userVal = parseFloat(state.rfAnswers[key]);
    var fbEl = document.getElementById("rf-fb-" + key);
    if (isNaN(userVal) || userVal === 0) {
      if (fbEl) fbEl.textContent = "Enter a value";
    } else if (Math.abs(userVal - expectedRf) < 0.05) {
      if (fbEl) { fbEl.textContent = "✓ Correct"; fbEl.className = "rf-feedback rf-correct"; }
    } else {
      if (fbEl) { fbEl.textContent = "✗ Expected ~" + expectedRf.toFixed(3); fbEl.className = "rf-feedback rf-incorrect"; }
    }
  }
}

/* ==============================================================
   SECTION 10: INITIALIZATION
   ============================================================== */

function init() {
  cacheDom();
  renderSidebar();
  renderCurrentStage();
  dom.btnNext.addEventListener("click", onBtnNext);
  dom.btnBack.addEventListener("click", onBtnBack);
  dom.canvas.addEventListener("click", onCanvasClick);
  dom.stageContent.addEventListener("click", onStageContentClick);
  dom.userInputArea.addEventListener("click", onUserInputClick);
}

/* ==============================================================
   SECTION 11: UTILITIES
   ============================================================== */

function findExperiment(id) {
  for (var i = 0; i < EXPERIMENTS.length; i++) {
    if (EXPERIMENTS[i].id === id) return EXPERIMENTS[i];
  }
  return null;
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.substring(0, max) + "...";
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", init);

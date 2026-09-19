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
    section: "major",
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
    section: "major",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
    section: "minor",
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
   SECTION 2B: PBA PRACTICE — Question Bank
   ============================================================== */

var PBA_QUESTIONS = [
  // ── MAJOR PRACTICALS (Section A, 6 marks each) ──────────

  // A1 — Fractional Distillation
  {
    id: "MAJ_A1_Q1",
    practicalId: "A1",
    section: "A",
    marks: 6,
    prompt: "You are given a mixture of water and ethanol. Describe the apparatus setup for fractional distillation and explain the role of each major component.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 2, prompt: "List the apparatus needed for fractional distillation.", type: "selection_multi", options: ["Round-bottom flask", "Fractionating column", "Condenser", "Thermometer", "Bunsen burner", "Beaker", "Evaporating dish", "Filter funnel"], correctAnswers: ["Round-bottom flask", "Fractionating column", "Condenser", "Thermometer", "Bunsen burner"] },
      { component: "Procedure", marks: 2, prompt: "Arrange the distillation steps in the correct order.", type: "ordering", steps: ["Assemble the apparatus with fractionating column", "Add the mixture to the round-bottom flask", "Heat gently and monitor temperature", "Collect distillate when temperature stabilises"], correctOrder: [0, 1, 2, 3] },
      { component: "Observation", marks: 1, prompt: "At what temperature does ethanol distil?", type: "measurement", unit: "°C", expectedValue: 78, tolerance: 2 },
      { component: "Interpretation", marks: 1, prompt: "Why is a fractionating column used instead of simple distillation?", type: "selection", options: ["To increase the surface area for repeated condensation and vaporisation", "To cool the vapour more quickly", "To hold the thermometer in place", "To prevent bumping"], correctAnswer: 0 }
    ]
  },
  // A2 — Paper Chromatography (Ink)
  {
    id: "MAJ_A2_Q1",
    practicalId: "A2",
    section: "A",
    marks: 6,
    prompt: "A student separates the components of an ink using paper chromatography. Answer the following questions about the procedure and results.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "Why is a pencil line used instead of pen for the baseline?", type: "selection", options: ["Pencil graphite does not dissolve in the solvent", "Pencil marks are easier to see", "Pen ink would interfere with the chromatogram", "Pencil is cheaper"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "Where should the ink spot be placed relative to the baseline?", type: "selection", options: ["On the baseline", "Below the baseline", "Above the baseline", "At the top of the paper"], correctAnswer: 1 },
      { component: "Observation", marks: 2, prompt: "A chromatogram shows three spots. The solvent front travelled 8.0 cm. Spot A is at 2.4 cm, Spot B is at 5.6 cm, Spot C is at 7.2 cm. Calculate the Rf value of Spot B.", type: "calculation", expectedValue: 0.7, tolerance: 0.05, unit: "" },
      { component: "Interpretation", marks: 1, prompt: "What does an Rf value of 0.30 indicate about a component?", type: "selection", options: ["It is less soluble in the solvent and/or more strongly adsorbed", "It is more soluble in the solvent", "It has a higher molecular weight", "It is more volatile"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "Two different inks produce identical chromatograms. What can you conclude?", type: "selection", options: ["They likely contain the same dye components", "They are definitely the same ink", "They have the same colour", "They were dissolved in the same solvent"], correctAnswer: 0 }
    ]
  },
  // A3 — Pb²⁺/Cd²⁺ Paper Chromatography
  {
    id: "MAJ_A3_Q1",
    practicalId: "A3",
    section: "A",
    marks: 6,
    prompt: "A mixture containing Pb²⁺ and Cd²⁺ ions is separated by paper chromatography using HCl as the solvent. Answer the following.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "What is used to detect the separated ions on the chromatogram?", type: "selection", options: ["Potassium iodide solution", "Sodium hydroxide solution", "Litmus paper", "Phenolphthalein"], correctAnswer: 0 },
      { component: "Observation", marks: 2, prompt: "On the chromatogram, Pb²⁺ appears as a yellow spot and Cd²⁺ as a brown spot. If the solvent front is 10 cm, Pb²⁺ spot is at 3.0 cm, and Cd²⁺ spot is at 6.5 cm, calculate the Rf of Cd²⁺.", type: "calculation", expectedValue: 0.65, tolerance: 0.05, unit: "" },
      { component: "Interpretation", marks: 2, prompt: "Which ion travels further and why?", type: "selection", options: ["Cd²⁺ travels further because it is more soluble in the mobile phase", "Pb²⁺ travels further because it is heavier", "Both travel the same distance", "Neither travels from the baseline"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "What is the purpose of running a reference sample alongside the mixture?", type: "selection", options: ["To confirm the identity of separated ions by comparison", "To make the chromatogram develop faster", "To prevent the solvent from evaporating", "To increase the Rf values"], correctAnswer: 0 }
    ]
  },
  // A4 — NaOH Volumetric Analysis
  {
    id: "MAJ_A4_Q1",
    practicalId: "A4",
    section: "A",
    marks: 6,
    prompt: "You titrate a 25.00 cm³ sample of NaOH solution against 0.1000 mol/dm³ HCl using phenolphthalein indicator. The average titre is 23.45 cm³. Answer the following.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "Which apparatus is used to measure exactly 25.00 cm³ of NaOH?", type: "selection", options: ["Volumetric pipette", "Measuring cylinder", "Beaker", "Burette"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "Why is the burette rinsed with the acid solution before filling?", type: "selection", options: ["To remove water that would dilute the acid", "To warm the burette", "To check for leaks", "To clean dust from the burette"], correctAnswer: 0 },
      { component: "Calculation", marks: 2, prompt: "Calculate the molarity of NaOH. (M₁V₁ = M₂V₂ where acid is M₁V₁ and base is M₂V₂)", type: "calculation", expectedValue: 0.0938, tolerance: 0.002, unit: "mol/dm³" },
      { component: "Interpretation", marks: 1, prompt: "Why are concordant titres (within 0.10 cm³) required?", type: "selection", options: ["To ensure the result is reliable and reproducible", "To make the calculation simpler", "To use less acid solution", "To complete the titration faster"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "At the endpoint, phenolphthalein changes from:", type: "selection", options: ["Pink to colourless", "Colourless to pink", "Yellow to orange", "Blue to green"], correctAnswer: 0 }
    ]
  },
  // A5 — Gas Detection
  {
    id: "MAJ_A5_Q1",
    practicalId: "A5",
    section: "A",
    marks: 6,
    prompt: "Three colourless gases — NH₃, CO₂, and Cl₂ — are to be identified using appropriate chemical tests. Answer the following.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "What is used to deliver a gas sample to a test reagent?", type: "selection", options: ["Delivering tube", "Glass rod", "Dropper", "Watch glass"], correctAnswer: 0 },
      { component: "Observation", marks: 2, prompt: "NH₃ is tested with damp red litmus paper. What change is observed?", type: "selection", options: ["Red litmus turns blue", "Blue litmus turns red", "No change", "Paper turns brown"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "CO₂ is tested with limewater. What observation confirms CO₂?", type: "selection", options: ["Limewater turns milky/cloudy", "Limewater turns yellow", "Bubbles form only", "No visible change"], correctAnswer: 0 },
      { component: "Interpretation", marks: 1, prompt: "Cl₂ gas turns damp blue litmus paper red, then white. What does the second change indicate?", type: "selection", options: ["Chlorine has bleaching action", "Chlorine is acidic", "Chlorine is alkaline", "The paper is wet"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "Which test uniquely identifies NH₃ among the three gases?", type: "selection", options: ["Damp red litmus turns blue (alkaline gas)", "Limewater turns milky", "Damp litmus is bleached", "Burns with a pop sound"], correctAnswer: 0 }
    ]
  },

  // ── MINOR PRACTICALS (Section B, 4 marks each) ──────────

  // M7.1 — Sublimation
  {
    id: "MIN_M71_Q1",
    practicalId: "M7_1",
    section: "B",
    marks: 4,
    prompt: "A mixture of naphthalene, sand, and salt is to be separated. Answer the following about the sublimation of naphthalene.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "Which apparatus is used to collect the sublimed naphthalene?", type: "selection", options: ["Inverted funnel lined with filter paper", "Beaker", "Measuring cylinder", "Evaporating dish"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "What type of heating is required for sublimation?", type: "selection", options: ["Gentle heating with a Bunsen burner", "Strong heating with a blast burner", "Heating in a water bath", "No heating required"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "Where does the naphthalene deposit during sublimation?", type: "selection", options: ["On the cool surface of the inverted funnel", "At the bottom of the evaporating dish", "On the tripod stand", "It evaporates completely"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "After sublimation, what remains in the evaporating dish?", type: "selection", options: ["Sand and salt", "Naphthalene only", "Sand only", "Nothing — the dish is empty"], correctAnswer: 0 }
    ]
  },
  // M7.2 — Flame Tests
  {
    id: "MIN_M72_Q1",
    practicalId: "M7_2",
    section: "B",
    marks: 4,
    prompt: "A student identifies five ions by flame test. Match each ion to its characteristic flame colour.",
    type: "multi_part",
    parts: [
      { component: "Observation", marks: 1, prompt: "Which ion produces a yellow flame?", type: "selection", options: ["Na⁺", "K⁺", "Ca²⁺", "Cu²⁺", "Ba²⁺"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "Which ion produces a blue-green flame?", type: "selection", options: ["Cu²⁺", "Na⁺", "K⁺", "Ca²⁺", "Ba²⁺"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "Why is the wire cleaned with HCl between tests?", type: "selection", options: ["To remove residue from the previous sample", "To make the wire hotter", "To change the flame colour", "To prevent rusting"], correctAnswer: 0 },
      { component: "Interpretation", marks: 1, prompt: "K⁺ produces a lilac flame. What observation would mask this colour?", type: "selection", options: ["Na⁺ contamination giving intense yellow", "Ca²⁺ giving brick-red", "Cu²⁺ giving blue-green", "Ba²⁺ giving green"], correctAnswer: 0 }
    ]
  },
  // M7.3 — CuSO₄ Crystals
  {
    id: "MIN_M73_Q1",
    practicalId: "M7_3",
    section: "B",
    marks: 4,
    prompt: "Describe the preparation of copper(II) sulphate pentahydrate crystals.",
    type: "multi_part",
    parts: [
      { component: "Procedure", marks: 1, prompt: "What is the first step in preparing CuSO₄·5H₂O crystals?", type: "selection", options: ["Dissolve CuSO₄ powder in warm distilled water", "Heat the solution to boiling", "Filter the solution", "Add ice to the solution"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "After dissolving, what should be done before crystallisation?", type: "selection", options: ["Filter to remove impurities", "Add more water", "Add NaOH", "Cool rapidly in ice"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "What is the colour of CuSO₄·5H₂O crystals?", type: "selection", options: ["Blue", "White", "Green", "Red"], correctAnswer: 0 },
      { component: "Interpretation", marks: 1, prompt: "Why should the solution cool slowly rather than rapidly?", type: "selection", options: ["To form larger, purer crystals", "To save time", "To prevent evaporation", "To change the colour"], correctAnswer: 0 }
    ]
  },
  // M7.4 — Melting Point
  {
    id: "MIN_M74_Q1",
    practicalId: "M7_4",
    section: "B",
    marks: 4,
    prompt: "A student determines the melting point of naphthalene. Answer the following.",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "Which apparatus holds the naphthalene sample during melting point determination?", type: "selection", options: ["Capillary tube", "Beaker", "Test tube", "Evaporating dish"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "How should the water bath be heated?", type: "selection", options: ["Gradually, to ensure uniform temperature rise", "Rapidly, to save time", "At full flame intensity", "In a microwave"], correctAnswer: 0 },
      { component: "Measurement", marks: 1, prompt: "The expected melting point of pure naphthalene is approximately:", type: "calculation", expectedValue: 80, tolerance: 2, unit: "°C" },
      { component: "Interpretation", marks: 1, prompt: "If the observed melting point is lower than expected, what does this suggest?", type: "selection", options: ["The sample may be impure", "The thermometer is faulty", "The sample is heated too slowly", "The water bath is too hot"], correctAnswer: 0 }
    ]
  },
  // M7.5 — Boiling Point
  {
    id: "MIN_M75_Q1",
    practicalId: "M7_5",
    section: "B",
    marks: 4,
    prompt: "A student determines the boiling point of ethyl alcohol (ethanol).",
    type: "multi_part",
    parts: [
      { component: "Apparatus", marks: 1, prompt: "Where should the thermometer bulb be placed during distillation?", type: "selection", options: ["At the branch of the flask, level with the side arm", "In the liquid at the bottom", "Above the flask", "In the condenser"], correctAnswer: 0 },
      { component: "Procedure", marks: 1, prompt: "Why are boiling chips added before heating?", type: "selection", options: ["To ensure smooth, even boiling and prevent bumping", "To increase the boiling point", "To change the colour", "To absorb impurities"], correctAnswer: 0 },
      { component: "Measurement", marks: 1, prompt: "The expected boiling point of ethanol is approximately:", type: "calculation", expectedValue: 78, tolerance: 2, unit: "°C" },
      { component: "Interpretation", marks: 1, prompt: "If the boiling point is higher than expected, what could be the reason?", type: "selection", options: ["The ethanol is contaminated with a higher-boiling impurity", "The thermometer is inaccurate", "Too many boiling chips were used", "The condenser is too cold"], correctAnswer: 0 }
    ]
  },
  // M7.6 — Metal Displacement
  {
    id: "MIN_M76_Q1",
    practicalId: "M7_6",
    section: "B",
    marks: 4,
    prompt: "Zinc granules are added to copper(II) sulphate solution. Answer the following about the displacement reaction.",
    type: "multi_part",
    parts: [
      { component: "Observation", marks: 1, prompt: "What change in colour of the solution is observed?", type: "selection", options: ["Blue solution becomes colourless/pale", "Colourless solution turns blue", "Solution turns yellow", "No colour change"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "What is deposited on the zinc surface?", type: "selection", options: ["Red-brown copper metal", "White zinc powder", "Green copper hydroxide", "Blue copper sulphate crystals"], correctAnswer: 0 },
      { component: "Interpretation", marks: 1, prompt: "Write the displacement reaction. Which is correct?", type: "selection", options: ["Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)", "Cu(s) + ZnSO₄(aq) → CuSO₄(aq) + Zn(s)", "Zn(s) + Cu(s) → ZnCu(s)", "ZnSO₄(aq) + CuSO₄(aq) → No reaction"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "What does this reaction demonstrate about the reactivity series?", type: "selection", options: ["Zinc is more reactive than copper", "Copper is more reactive than zinc", "Both have equal reactivity", "Neither is reactive"], correctAnswer: 0 }
    ]
  },
  // M7.7 — Water Test
  {
    id: "MIN_M77_Q1",
    practicalId: "M7_7",
    section: "B",
    marks: 4,
    prompt: "Anhydrous copper(II) sulphate is used to test for the presence of water. Answer the following.",
    type: "multi_part",
    parts: [
      { component: "Observation", marks: 1, prompt: "What is the initial colour of anhydrous CuSO₄?", type: "selection", options: ["White", "Blue", "Green", "Pink"], correctAnswer: 0 },
      { component: "Observation", marks: 1, prompt: "What colour change occurs when water is added?", type: "selection", options: ["White turns to blue", "Blue turns to white", "Green turns to brown", "No change"], correctAnswer: 0 },
      { component: "Interpretation", marks: 1, prompt: "What does the colour change indicate?", type: "selection", options: ["Water is present — CuSO₄ becomes hydrated", "The sample is dry", "The CuSO₄ has decomposed", "A chemical reaction with air occurred"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "Why is this test described as a chemical test for water?", type: "selection", options: ["Because a chemical change (hydration) produces a visible colour change", "Because it uses chemicals", "Because it involves heating", "Because it measures pH"], correctAnswer: 0 }
    ]
  },
  // M7.8 — Water Purity
  {
    id: "MIN_M78_Q1",
    practicalId: "M7_8",
    section: "B",
    marks: 4,
    prompt: "The purity of a water sample is tested by determining its melting point and boiling point.",
    type: "multi_part",
    parts: [
      { component: "Measurement", marks: 1, prompt: "The expected melting point of pure water (ice) at standard pressure is:", type: "calculation", expectedValue: 0, tolerance: 1, unit: "°C" },
      { component: "Measurement", marks: 1, prompt: "The expected boiling point of pure water at standard pressure is:", type: "calculation", expectedValue: 100, tolerance: 2, unit: "°C" },
      { component: "Interpretation", marks: 1, prompt: "If the boiling point is slightly above 100°C, what does this suggest?", type: "selection", options: ["The water may contain dissolved impurities (e.g. salt)", "The water is definitely pure", "The thermometer is broken", "The water is frozen"], correctAnswer: 0 },
      { component: "Conclusion", marks: 1, prompt: "Pure water has a melting point of 0°C and boiling point of 100°C. A sample melts at -1°C and boils at 103°C. What is the most likely conclusion?", type: "selection", options: ["The sample is impure", "The sample is pure", "The sample is distilled water only", "The sample contains no dissolved substances"], correctAnswer: 0 }
    ]
  }
];

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
  m7ObservationDone: false,

  // -- PBA Practice Mode (M8) --
  appMode: "lab",                   // "lab" | "pba" | "mystery"
  pbaScreen: "menu",               // "menu" | "mode_select" | "generating" | "section_a" | "section_b" | "review" | "result"
  pbaSession: null,                // { sessionId, startedAt, mode, majorQuestions, minorQuestions, answers, marks, totalMarks, submitted, timerStarted, timerElapsed }
  pbaCurrentSection: "A",          // "A" | "B"
  pbaCurrentIndex: 0,              // Current question index within section
  pbaTimerInterval: null,          // setInterval reference for live timer

  // -- Mystery Lab (M9) --
  mysteryScreen: "menu",           // "menu" | "intro" | "investigation" | "test_execute" | "observe" | "interpret" | "identify" | "conclusion" | "complete"
  mysterySession: null,            // { sampleId, sampleLabel, testsPerformed, evidence, hypothesis, identified, conclusion, completed, startedAt }

  // -- Experiment Log (M10) --
  logScreen: "list",               // "list" | "detail"
  logDetailId: null,               // id of record being viewed

  // -- Learning & Revision (M11) --
  revisionScreen: "list",          // "list" | "detail"
  revisionFilter: "all",           // "all" | "major" | "minor"
  revisionSearch: "",
  revisionSelectedId: null,

  // -- Demo Mode (M13) --
  demoActive: false,                 // true when in demo flow
  demoScreen: "intro",              // "intro" | "practical" | "log" | "revision" | "mystery" | "pba" | "complete"
  demoStep: 0,                      // current step index (0-based)
  demoPracticalFinished: false      // set true when A2 finish is detected
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
   SECTION 8C: PBA PRACTICE — Session Engine & Renderers
   ============================================================== */

function pbaGenerateSession() {
  var majorPool = PBA_QUESTIONS.filter(function(q) { return q.section === "A"; });
  var minorPool = PBA_QUESTIONS.filter(function(q) { return q.section === "B"; });
  var shuffled = pbaShuffle(majorPool.slice());
  var selectedMajor = shuffled.slice(0, 2);
  var shuffledMinor = pbaShuffle(minorPool.slice());
  var selectedMinor = shuffledMinor.slice(0, 2);
  var answers = {};
  var marks = {};
  for (var i = 0; i < selectedMajor.length; i++) {
    var q = selectedMajor[i];
    answers[q.id] = {};
    marks[q.id] = 0;
    if (q.parts) {
      for (var p = 0; p < q.parts.length; p++) {
        answers[q.id][p] = null;
        marks[q.id] = 0;
      }
    }
  }
  for (var j = 0; j < selectedMinor.length; j++) {
    var q2 = selectedMinor[j];
    answers[q2.id] = {};
    marks[q2.id] = 0;
    if (q2.parts) {
      for (var p2 = 0; p2 < q2.parts.length; p2++) {
        answers[q2.id][p2] = null;
      }
    }
  }
  state.pbaSession = {
    sessionId: "PBA_" + Date.now(),
    startedAt: Date.now(),
    mode: "full",
    majorQuestions: selectedMajor,
    minorQuestions: selectedMinor,
    answers: answers,
    marks: marks,
    totalMarks: 0,
    submitted: false,
    timerStarted: false,
    timerElapsed: 0
  };
}

function pbaShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function pbaScoreQuestion(question) {
  if (!question || !question.parts) return 0;
  var total = 0;
  for (var i = 0; i < question.parts.length; i++) {
    var part = question.parts[i];
    var answer = state.pbaSession.answers[question.id][i];
    if (answer === null || answer === undefined) continue;
    if (part.type === "selection") {
      if (answer === part.correctAnswer) total += part.marks;
    } else if (part.type === "selection_multi") {
      var correct = part.correctAnswers;
      var selected = answer;
      if (selected && selected.length === correct.length) {
        var allCorrect = true;
        for (var k = 0; k < correct.length; k++) {
          if (selected.indexOf(correct[k]) === -1) { allCorrect = false; break; }
        }
        if (allCorrect) total += part.marks;
      }
    } else if (part.type === "ordering") {
      var expected = part.correctOrder;
      var given = answer;
      if (given && given.length === expected.length) {
        var orderCorrect = true;
        for (var m = 0; m < expected.length; m++) {
          if (given[m] !== expected[m]) { orderCorrect = false; break; }
        }
        if (orderCorrect) total += part.marks;
      }
    } else if (part.type === "calculation") {
      var num = parseFloat(answer);
      if (!isNaN(num)) {
        var diff = Math.abs(num - part.expectedValue);
        if (diff <= part.tolerance) total += part.marks;
      }
    }
  }
  return total;
}

function pbaScoreAll() {
  var sess = state.pbaSession;
  if (!sess) return;
  var allQ = sess.majorQuestions.concat(sess.minorQuestions);
  var total = 0;
  for (var i = 0; i < allQ.length; i++) {
    sess.marks[allQ[i].id] = pbaScoreQuestion(allQ[i]);
    total += sess.marks[allQ[i].id];
  }
  sess.totalMarks = total;
}

function pbaGetAllQuestions() {
  var s = state.pbaSession;
  if (!s) return [];
  return s.majorQuestions.concat(s.minorQuestions);
}

function pbaGetCurrentQuestion() {
  var all = pbaGetAllQuestions();
  var idx = state.pbaCurrentIndex;
  return all[idx] || null;
}

function pbaGetMajorTotal() {
  var s = state.pbaSession;
  if (!s) return 0;
  var t = 0;
  for (var i = 0; i < s.majorQuestions.length; i++) t += s.majorQuestions[i].marks;
  return t;
}

function pbaGetMinorTotal() {
  var s = state.pbaSession;
  if (!s) return 0;
  var t = 0;
  for (var i = 0; i < s.minorQuestions.length; i++) t += s.minorQuestions[i].marks;
  return t;
}

function pbaGetSectionScore(section) {
  var s = state.pbaSession;
  if (!s) return 0;
  var total = 0;
  var qs = section === "A" ? s.majorQuestions : s.minorQuestions;
  for (var i = 0; i < qs.length; i++) total += (s.marks[qs[i].id] || 0);
  return total;
}

function pbaIsUnanswered(question) {
  if (!question || !question.parts) return false;
  var ans = state.pbaSession.answers[question.id];
  if (!ans) return true;
  for (var i = 0; i < question.parts.length; i++) {
    if (ans[i] === null || ans[i] === undefined) return true;
    if (question.parts[i].type === "selection_multi" && (!ans[i] || ans[i].length === 0)) return true;
    if (question.parts[i].type === "ordering" && (!ans[i] || ans[i].length === 0)) return true;
  }
  return false;
}

function pbaFormatTime(ms) {
  var sec = Math.floor(ms / 1000);
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

/* ── PBA Renderers ─────────────────────────── */

function renderPBAMenu() {
  var html = '<div class="home-container">';
  html += '<div class="home-brand">';
  html += '<h2>CHEMSIM</h2>';
  html += '<p class="subtitle">Interactive Virtual Chemistry Laboratory</p>';
  html += '</div>';
  html += '<div class="home-modules">';
  html += '<div class="home-card home-card-accent" id="btn-enter-lab" tabindex="0" role="button" aria-label="Open Practical Lab">';
  html += '<div class="home-card-icon">&#128300;</div>';
  html += '<div class="home-card-title">Practical Lab</div>';
  html += '<div class="home-card-desc">Hands-on experiments: distillation, chromatography, titration, gas tests.</div>';
  html += '</div>';
  html += '<div class="home-card home-card-accent pba" id="btn-enter-pba" tabindex="0" role="button" aria-label="Open PBA Practice">';
  html += '<div class="home-card-icon">&#128203;</div>';
  html += '<div class="home-card-title">PBA Practice</div>';
  html += '<div class="home-card-desc">Simulate the FBISE Chemistry Practical Based Assessment.</div>';
  html += '</div>';
  html += '<div class="home-card home-card-accent mystery" id="btn-enter-mystery" tabindex="0" role="button" aria-label="Open Mystery Lab">';
  html += '<div class="home-card-icon">&#128270;</div>';
  html += '<div class="home-card-title">Mystery Lab</div>';
  html += '<div class="home-card-desc">Investigate an unknown sample using virtual tests.</div>';
  html += '</div>';
  html += '<div class="home-card home-card-accent log" id="btn-enter-log" tabindex="0" role="button" aria-label="Open Experiment Log">';
  html += '<div class="home-card-icon">&#128214;</div>';
  html += '<div class="home-card-title">Experiment Log</div>';
  html += '<div class="home-card-desc">Review completed experiments and recorded results.</div>';
  html += '</div>';
  html += '<div class="home-card home-card-accent revision" id="btn-enter-revision" tabindex="0" role="button" aria-label="Open Learning and Revision Hub">';
  html += '<div class="home-card-icon">&#128218;</div>';
  html += '<div class="home-card-title">Learning & Revision</div>';
  html += '<div class="home-card-desc">Browse all practicals, apparatus, procedures and SLOs.</div>';
  html += '</div>';
  html += '<div class="home-card home-card-accent demo" id="btn-enter-demo" tabindex="0" role="button" aria-label="Start Demo Mode">';
  html += '<div class="home-card-icon">&#9654;</div>';
  html += '<div class="home-card-title">Demo Mode</div>';
  html += '<div class="home-card-desc">Guided presentation of ChemSim\'s key features.</div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="home-note">';
  html += '<div class="sim-note">';
  html += '<strong>PBA Structure:</strong> Section A (Major) 2 x 6 = 12 marks (60%) &middot; Section B (Minor) 2 x 4 = 8 marks (40%) &middot; Total: 20 marks | Duration: 2 hours';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}


function renderPBAModeSelect() {
  var html = '<div style="text-align:center;padding:2rem;">';
  html += '<h3>PBA Practice Mode</h3>';
  html += '<p>Choose a practice mode:</p>';
  html += '<button class="btn btn-primary" id="btn-pba-full" style="display:block;width:100%;max-width:350px;margin:0.75rem auto;padding:1rem;">Full PBA Session<br><small>2 Major + 2 Minor | 20 marks | 2 hours</small></button>';
  html += '<button class="btn btn-accent" id="btn-pba-major" style="display:block;width:100%;max-width:350px;margin:0.75rem auto;padding:1rem;">Major Practice<br><small>2 Major questions | 12 marks</small></button>';
  html += '<button class="btn btn-accent" id="btn-pba-minor" style="display:block;width:100%;max-width:350px;margin:0.75rem auto;padding:1rem;">Minor Practice<br><small>2 Minor questions | 8 marks</small></button>';
  html += '<button class="btn btn-secondary" id="btn-pba-back" style="margin-top:1.5rem;">← Back to Menu</button>';
  html += '</div>';
  return html;
}

function renderPBAProgress() {
  var s = state.pbaSession;
  if (!s) return "";
  var all = pbaGetAllQuestions();
  var total = all.length;
  var html = '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">';
  html += '<div>';
  html += '<strong>' + (state.pbaCurrentSection === "A" ? "Section A — Major" : "Section B — Minor") + '</strong>';
  html += '<span style="margin-left:0.5rem;">Question ' + (state.pbaCurrentIndex + 1) + ' of ' + total + '</span>';
  html += '</div>';
  html += '<div style="margin-left:auto;">';
  html += '<span>Marks: ' + s.totalMarks + '/20</span>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderPBAQuestion() {
  var q = pbaGetCurrentQuestion();
  if (!q) return "<p>No question loaded.</p>";
  var s = state.pbaSession;
  var html = '<div class="pba-question">';
  html += '<div class="label">ChemSim Practice Question</div>';
  html += '<h3>' + (q.section === "A" ? "Major" : "Minor") + ' Question — ' + q.marks + ' marks</h3>';
  html += '<p><strong>' + q.prompt + '</strong></p>';
  if (q.parts) {
    for (var i = 0; i < q.parts.length; i++) {
      var part = q.parts[i];
      var ans = s.answers[q.id] ? s.answers[q.id][i] : null;
      html += '<div class="pba-part" style="margin:1rem 0;padding:1rem;border:1px solid var(--color-border);border-radius:8px;">';
      html += '<p><strong>' + part.component + '</strong> (' + part.marks + ' mark' + (part.marks > 1 ? 's' : '') + ')</p>';
      html += '<p>' + part.prompt + '</p>';
      if (part.type === "selection") {
        html += '<div class="tool-options">';
        for (var j = 0; j < part.options.length; j++) {
          var selClass = ans === j ? "btn btn-tool selected" : "btn btn-tool";
          html += '<button class="' + selClass + '" data-qid="' + q.id + '" data-part="' + i + '" data-ans="' + j + '">' + part.options[j] + '</button>';
        }
        html += '</div>';
      } else if (part.type === "selection_multi") {
        html += '<div class="tool-options">';
        for (var j2 = 0; j2 < part.options.length; j2++) {
          var sel = (ans && ans.indexOf(part.options[j2]) !== -1);
          var selClass2 = sel ? "btn btn-tool selected" : "btn btn-tool";
          html += '<button class="' + selClass2 + '" data-qid="' + q.id + '" data-part="' + i + '" data-multi="' + part.options[j2] + '">' + part.options[j2] + '</button>';
        }
        html += '</div>';
        html += '<p class="sim-note" style="margin-top:0.5rem;">Select all that apply</p>';
      } else if (part.type === "ordering") {
        var steps = part.steps.slice();
        var userOrder = ans || steps.map(function(_, idx) { return idx; });
        for (var k = 0; k < userOrder.length; k++) {
          var stepIdx = userOrder[k];
          html += '<div class="procedure-step" data-qid="' + q.id + '" data-part="' + i + '" data-step="' + stepIdx + '">';
          html += '<span class="step-number">' + (k + 1) + '</span>';
          html += '<span>' + steps[stepIdx] + '</span>';
          html += '<span style="margin-left:auto;">';
          if (k > 0) html += '<button class="btn btn-tool" data-qid="' + q.id + '" data-part="' + i + '" data-move="-1" data-pos="' + k + '">▲</button> ';
          if (k < userOrder.length - 1) html += '<button class="btn btn-tool" data-qid="' + q.id + '" data-part="' + i + '" data-move="1" data-pos="' + k + '">▼</button>';
          html += '</span>';
          html += '</div>';
        }
      } else if (part.type === "calculation") {
        html += '<div style="margin-top:0.5rem;">';
        html += '<input type="number" step="any" class="pba-calc-input" data-qid="' + q.id + '" data-part="' + i + '" value="' + (ans !== null && ans !== undefined ? ans : '') + '" placeholder="Enter value..." style="padding:0.5rem;border:1px solid var(--color-border);border-radius:4px;width:150px;">';
        if (part.unit) html += ' <span>' + part.unit + '</span>';
        html += '</div>';
      }
      html += '</div>';
    }
  }
  html += '</div>';
  return html;
}

function renderPBAReview() {
  var s = state.pbaSession;
  if (!s) return "";
  var all = pbaGetAllQuestions();
  var html = '<div class="pba-review">';
  html += '<h3>Review Answers</h3>';
  html += '<p>Check your answers before final submission.</p>';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Section</th><th>Question</th><th>Marks</th><th>Status</th><th>Action</th></tr></thead><tbody>';
  for (var i = 0; i < all.length; i++) {
    var q = all[i];
    var unanswered = pbaIsUnanswered(q);
    html += '<tr>';
    html += '<td>' + (q.section === "A" ? "Major" : "Minor") + '</td>';
    html += '<td>' + q.prompt.substring(0, 50) + '...</td>';
    html += '<td>' + q.marks + '</td>';
    html += '<td>' + (unanswered ? '<span style="color:var(--color-error);">Unanswered</span>' : '<span style="color:var(--color-success);">Answered</span>') + '</td>';
    html += '<td><button class="btn btn-tool pba-goto" data-idx="' + i + '">Go to</button></td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  html += '<div style="margin-top:1rem;">';
  html += '<button class="btn btn-primary" id="btn-pba-submit">Submit PBA</button>';
  html += '<button class="btn btn-secondary" id="btn-pba-review-back" style="margin-left:0.5rem;">Back to Questions</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderPBAResult() {
  var s = state.pbaSession;
  if (!s) return "";
  var majorScore = pbaGetSectionScore("A");
  var minorScore = pbaGetSectionScore("B");
  var majorMax = pbaGetMajorTotal();
  var minorMax = pbaGetMinorTotal();
  var totalMax = majorMax + minorMax;
  var pct = totalMax > 0 ? Math.round((s.totalMarks / totalMax) * 100) : 0;
  var elapsed = s.timerElapsed || (Date.now() - s.startedAt);
  var html = '<div class="pba-result" style="text-align:center;padding:1.5rem;">';
  html += '<h2>PBA Practice Result</h2>';
  html += '<p class="label">ChemSim Practice Scoring</p>';
  html += '<div style="display:flex;justify-content:center;gap:2rem;margin:1.5rem 0;flex-wrap:wrap;">';
  html += '<div style="text-align:center;">';
  html += '<p><strong>Section A — Major</strong></p>';
  html += '<p style="font-size:1.5rem;font-weight:bold;">' + majorScore + '/' + majorMax + '</p>';
  html += '</div>';
  html += '<div style="text-align:center;">';
  html += '<p><strong>Section B — Minor</strong></p>';
  html += '<p style="font-size:1.5rem;font-weight:bold;">' + minorScore + '/' + minorMax + '</p>';
  html += '</div>';
  html += '<div style="text-align:center;">';
  html += '<p><strong>TOTAL</strong></p>';
  html += '<p style="font-size:2rem;font-weight:bold;">' + s.totalMarks + '/' + totalMax + '</p>';
  html += '<p>' + pct + '%</p>';
  html += '</div>';
  html += '</div>';
  html += '<p>Time taken: ' + pbaFormatTime(elapsed) + '</p>';
  html += '<hr style="margin:1rem 0;border:none;border-top:1px solid var(--color-border);">';
  html += '<h3>Question-by-Question Performance</h3>';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Section</th><th>Question</th><th>Marks</th><th>Score</th></tr></thead><tbody>';
  var all = pbaGetAllQuestions();
  for (var i = 0; i < all.length; i++) {
    var q = all[i];
    html += '<tr>';
    html += '<td>' + (q.section === "A" ? "Major" : "Minor") + '</td>';
    html += '<td>' + q.prompt.substring(0, 40) + '...</td>';
    html += '<td>' + q.marks + '</td>';
    html += '<td>' + (s.marks[q.id] || 0) + '/' + q.marks + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  html += '<h3 style="margin-top:1.5rem;">Skill Breakdown</h3>';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Skill</th><th>Score</th></tr></thead><tbody>';
  var skills = {};
  for (var j = 0; j < all.length; j++) {
    var q2 = all[j];
    if (q2.parts) {
      for (var p = 0; p < q2.parts.length; p++) {
        var comp = q2.parts[p].component;
        if (!skills[comp]) skills[comp] = { earned: 0, total: 0 };
        skills[comp].total += q2.parts[p].marks;
        var ans = s.answers[q2.id] ? s.answers[q2.id][p] : null;
        if (ans !== null && ans !== undefined) {
          if (q2.parts[p].type === "selection" && ans === q2.parts[p].correctAnswer) skills[comp].earned += q2.parts[p].marks;
          else if (q2.parts[p].type === "calculation") {
            var num = parseFloat(ans);
            if (!isNaN(num) && Math.abs(num - q2.parts[p].expectedValue) <= q2.parts[p].tolerance) skills[comp].earned += q2.parts[p].marks;
          } else if (q2.parts[p].type === "selection_multi") {
            var correct = q2.parts[p].correctAnswers;
            if (ans && ans.length === correct.length) {
              var allC = true;
              for (var c = 0; c < correct.length; c++) { if (ans.indexOf(correct[c]) === -1) { allC = false; break; } }
              if (allC) skills[comp].earned += q2.parts[p].marks;
            }
          } else if (q2.parts[p].type === "ordering") {
            var exp = q2.parts[p].correctOrder;
            if (ans && ans.length === exp.length) {
              var ordOk = true;
              for (var o = 0; o < exp.length; o++) { if (ans[o] !== exp[o]) { ordOk = false; break; } }
              if (ordOk) skills[comp].earned += q2.parts[p].marks;
            }
          }
        }
      }
    }
  }
  for (var sk in skills) {
    html += '<tr><td>' + sk + '</td><td>' + skills[sk].earned + '/' + skills[sk].total + '</td></tr>';
  }
  html += '</tbody></table>';
  html += '<div style="margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-pba-finish">Finish PBA Practice</button>';
  html += '<button class="btn btn-secondary" id="btn-pba-result-review" style="margin-left:0.5rem;">Review Answers</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderPBATimer() {
  var s = state.pbaSession;
  if (!s || !s.timerStarted) return "";
  var elapsed = Date.now() - s.timerStarted + s.timerElapsed;
  return '<div style="text-align:right;font-family:monospace;">Time: ' + pbaFormatTime(elapsed) + ' / 2:00:00</div>';
}

function pbaUpdateTimer() {
  var timerEl = document.getElementById("pba-timer-display");
  if (timerEl && state.pbaSession && state.pbaSession.timerStarted) {
    var elapsed = Date.now() - state.pbaSession.timerStarted + state.pbaSession.timerElapsed;
    timerEl.textContent = "Time: " + pbaFormatTime(elapsed) + " / 2:00:00";
  }
}

/* ── PBA Event Handlers ─────────────────────── */

function onPBAClick(e) {
  var target = e.target;
  var card = target.closest ? target.closest(".home-card") : null;
  var id = (card && card.id) ? card.id : target.id;

  // Main menu buttons
  if (id === "btn-enter-lab") {
    state.appMode = "lab";
    state.currentStage = "select";
    renderCurrentStage();
    renderSidebar();
    return;
  }
  if (id === "btn-enter-pba") {
    state.appMode = "pba";
    state.pbaScreen = "mode_select";
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-mystery") {
    state.appMode = "mystery";
    state.mysteryScreen = "menu";
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-log") {
    state.appMode = "log";
    state.logScreen = "list";
    state.logDetailId = null;
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-revision") {
    state.appMode = "revision";
    state.revisionScreen = "list";
    state.revisionFilter = "all";
    state.revisionSearch = "";
    state.revisionSelectedId = null;
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-demo") {
    state.appMode = "demo";
    state.demoActive = true;
    state.demoScreen = "intro";
    state.demoStep = 0;
    state.demoPracticalFinished = false;
    renderCurrentStage();
    return;
  }

  // Mode select buttons
  if (target.id === "btn-pba-full" || target.id === "btn-pba-major" || target.id === "btn-pba-minor") {
    state.pbaScreen = "generating";
    renderCurrentStage();
    setTimeout(function() {
      pbaGenerateSession();
      if (target.id === "btn-pba-major") {
        state.pbaSession.minorQuestions = [];
      } else if (target.id === "btn-pba-minor") {
        state.pbaSession.majorQuestions = [];
      }
      state.pbaCurrentSection = "A";
      state.pbaCurrentIndex = 0;
      state.pbaScreen = "question";
      state.pbaSession.timerStarted = Date.now();
      state.pbaSession.timerElapsed = 0;
      if (state.pbaTimerInterval) clearInterval(state.pbaTimerInterval);
      state.pbaTimerInterval = setInterval(pbaUpdateTimer, 1000);
      renderCurrentStage();
    }, 800);
    return;
  }
  if (target.id === "btn-pba-back") {
    state.pbaScreen = "menu";
    renderCurrentStage();
    return;
  }

  // Navigation buttons
  if (target.id === "btn-pba-prev") {
    if (state.pbaCurrentIndex > 0) {
      state.pbaCurrentIndex--;
      var allQ = pbaGetAllQuestions();
      state.pbaCurrentSection = allQ[state.pbaCurrentIndex].section;
      renderCurrentStage();
    }
    return;
  }
  if (target.id === "btn-pba-next") {
    var allQ2 = pbaGetAllQuestions();
    if (state.pbaCurrentIndex < allQ2.length - 1) {
      state.pbaCurrentIndex++;
      state.pbaCurrentSection = allQ2[state.pbaCurrentIndex].section;
      renderCurrentStage();
    } else {
      state.pbaScreen = "review";
      renderCurrentStage();
    }
    return;
  }
  if (target.id === "btn-pba-review-back") {
    state.pbaScreen = "question";
    renderCurrentStage();
    return;
  }

  // Submit
  if (target.id === "btn-pba-submit") {
    pbaScoreAll();
    state.pbaSession.submitted = true;
    if (state.pbaSession.timerStarted) {
      state.pbaSession.timerElapsed += Date.now() - state.pbaSession.timerStarted;
      state.pbaSession.timerStarted = false;
    }
    state.pbaScreen = "result";
    renderCurrentStage();
    return;
  }

  // Review goto
  if (target.classList.contains("pba-goto")) {
    var idx = parseInt(target.getAttribute("data-idx"), 10);
    var allQ3 = pbaGetAllQuestions();
    state.pbaCurrentIndex = idx;
    state.pbaCurrentSection = allQ3[idx].section;
    state.pbaScreen = "question";
    renderCurrentStage();
    return;
  }

  // Result actions
  if (target.id === "btn-pba-finish") {
    state.pbaScreen = "menu";
    state.pbaSession = null;
    state.pbaCurrentIndex = 0;
    state.pbaCurrentSection = "A";
    if (state.pbaTimerInterval) { clearInterval(state.pbaTimerInterval); state.pbaTimerInterval = null; }
    renderCurrentStage();
    renderSidebar();
    return;
  }
  if (target.id === "btn-pba-result-review") {
    state.pbaScreen = "result_review";
    renderCurrentStage();
    return;
  }

  // Selection answers
  if (target.classList.contains("btn-tool") && target.getAttribute("data-qid") && target.getAttribute("data-ans") !== null) {
    var qid = target.getAttribute("data-qid");
    var partIdx = parseInt(target.getAttribute("data-part"), 10);
    var ansIdx = parseInt(target.getAttribute("data-ans"), 10);
    if (state.pbaSession.answers[qid]) {
      state.pbaSession.answers[qid][partIdx] = ansIdx;
      renderCurrentStage();
    }
    return;
  }

  // Multi-selection answers
  if (target.classList.contains("btn-tool") && target.getAttribute("data-multi")) {
    var qid2 = target.getAttribute("data-qid");
    var partIdx2 = parseInt(target.getAttribute("data-part"), 10);
    var val = target.getAttribute("data-multi");
    if (state.pbaSession.answers[qid2]) {
      var current = state.pbaSession.answers[qid2][partIdx2] || [];
      if (typeof current === "string") current = [current];
      var pos = current.indexOf(val);
      if (pos === -1) current.push(val);
      else current.splice(pos, 1);
      state.pbaSession.answers[qid2][partIdx2] = current;
      renderCurrentStage();
    }
    return;
  }

  // Ordering — move
  if (target.getAttribute("data-move")) {
    var qid3 = target.getAttribute("data-qid");
    var partIdx3 = parseInt(target.getAttribute("data-part"), 10);
    var dir = parseInt(target.getAttribute("data-move"), 10);
    var pos = parseInt(target.getAttribute("data-pos"), 10);
    if (state.pbaSession.answers[qid3]) {
      var arr = state.pbaSession.answers[qid3][partIdx3];
      if (arr && arr.length > 0) {
        var swapIdx = pos + dir;
        if (swapIdx >= 0 && swapIdx < arr.length) {
          var tmp = arr[pos];
          arr[pos] = arr[swapIdx];
          arr[swapIdx] = tmp;
          renderCurrentStage();
        }
      }
    }
    return;
  }

  // Back to menu from result
  if (target.id === "btn-pba-back-menu") {
    state.pbaScreen = "menu";
    state.pbaSession = null;
    renderCurrentStage();
    return;
  }
}

function onPBAInput(e) {
  var target = e.target;
  if (target.classList.contains("pba-calc-input")) {
    var qid = target.getAttribute("data-qid");
    var partIdx = parseInt(target.getAttribute("data-part"), 10);
    if (state.pbaSession.answers[qid]) {
      state.pbaSession.answers[qid][partIdx] = target.value;
    }
  }
}

/* ==============================================================
   SECTION 9: SIMULATION CONTROL
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
  if (state.appMode === "pba") {
    renderPBAStage();
    return;
  }
  if (state.appMode === "mystery") {
    renderMysteryStage();
    return;
  }
  if (state.appMode === "log") {
    renderLogStage();
    return;
  }
  if (state.appMode === "revision") {
    renderRevisionStage();
    return;
  }
  if (state.appMode === "demo") {
    renderDemoStage();
    return;
  }
  // Restore sidebar when in lab mode
  var sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.style.display = "";
  renderProgress();
  renderStageContent();
  renderSimulationArea();
  renderUserInput();
  renderFeedback();
  renderButtons();
  renderSidebarActive();
}

function renderPBAStage() {
  var stageContent = document.getElementById("stage-content");
  var stageTitle = document.getElementById("stage-title");
  var stageProgress = document.getElementById("stage-progress");
  var simulationArea = document.getElementById("simulation-area");
  var userInputArea = document.getElementById("user-input-area");
  var feedbackArea = document.getElementById("feedback-area");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var sidebar = document.getElementById("sidebar");
  var practicalList = document.getElementById("practical-list");

  sidebar.style.display = "none";
  simulationArea.classList.add("hidden");
  userInputArea.innerHTML = "";
  feedbackArea.innerHTML = "";

  if (state.pbaScreen === "menu") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderPBAMenu();
    btnBack.style.display = "none";
    btnNext.style.display = "none";
  } else if (state.pbaScreen === "mode_select") {
    stageTitle.textContent = "PBA Practice";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderPBAModeSelect();
    btnBack.style.display = "none";
    btnNext.style.display = "none";
  } else if (state.pbaScreen === "generating") {
    stageTitle.textContent = "Generating PBA...";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = '<div style="text-align:center;padding:3rem;"><p>Generating your PBA practice session...</p><div class="sim-note">Selecting questions from the prescribed practical pool.</div></div>';
    btnBack.style.display = "none";
    btnNext.style.display = "none";
  } else if (state.pbaScreen === "question") {
    var allQ = pbaGetAllQuestions();
    var q = allQ[state.pbaCurrentIndex];
    stageTitle.textContent = "PBA Practice";
    stageProgress.innerHTML = renderPBAProgress();
    stageContent.innerHTML = renderPBAQuestion();
    userInputArea.innerHTML = renderPBATimer();
    btnBack.style.display = state.pbaCurrentIndex > 0 ? "" : "none";
    btnBack.textContent = "← Previous";
    btnNext.style.display = "";
    btnNext.textContent = state.pbaCurrentIndex < allQ.length - 1 ? "Next →" : "Review Answers";
    btnNext.className = "btn btn-primary";
    // Listen for selection clicks within stage content
    stageContent.onclick = onPBAClick;
    userInputArea.onclick = onPBAClick;
  } else if (state.pbaScreen === "review") {
    stageTitle.textContent = "Review Answers";
    stageProgress.innerHTML = renderPBAProgress();
    stageContent.innerHTML = renderPBAReview();
    btnBack.style.display = "none";
    btnNext.style.display = "none";
    stageContent.onclick = onPBAClick;
  } else if (state.pbaScreen === "result") {
    stageTitle.textContent = "PBA Result";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderPBAResult();
    btnBack.style.display = "none";
    btnNext.style.display = "none";
    stageContent.onclick = onPBAClick;
  } else if (state.pbaScreen === "result_review") {
    stageTitle.textContent = "Review Answers";
    stageProgress.innerHTML = "";
    // Show all questions with correct answers
    var all = pbaGetAllQuestions();
    var s = state.pbaSession;
    var html = '<div class="pba-question">';
    html += '<div class="label">ChemSim Practice Question — Review</div>';
    for (var i = 0; i < all.length; i++) {
      var qr = all[i];
      html += '<h3>' + (qr.section === "A" ? "Major" : "Minor") + ' Question ' + (i + 1) + ' — ' + qr.marks + ' marks</h3>';
      html += '<p><strong>' + qr.prompt + '</strong></p>';
      if (qr.parts) {
        for (var p = 0; p < qr.parts.length; p++) {
          var part = qr.parts[p];
          var ans = s.answers[qr.id] ? s.answers[qr.id][p] : null;
          var earned = 0;
          if (part.type === "selection" && ans === part.correctAnswer) earned = part.marks;
          else if (part.type === "calculation") {
            var num = parseFloat(ans);
            if (!isNaN(num) && Math.abs(num - part.expectedValue) <= part.tolerance) earned = part.marks;
          }
          html += '<div style="margin:0.5rem 0;padding:0.75rem;border-left:3px solid ' + (earned > 0 ? 'var(--color-success)' : 'var(--color-error)') + ';background:' + (earned > 0 ? '#e8f5e9' : '#ffebee') + ';border-radius:4px;">';
          html += '<p><strong>' + part.component + '</strong> (' + part.marks + ' mark' + (part.marks > 1 ? 's' : '') + ') — Scored: ' + earned + '/' + part.marks + '</p>';
          html += '<p>' + part.prompt + '</p>';
          if (part.type === "selection") {
            var given = ans !== null ? part.options[ans] : "No answer";
            var correct = part.options[part.correctAnswer];
            html += '<p>Your answer: <strong>' + given + '</strong></p>';
            if (earned === 0) html += '<p>Correct answer: <strong>' + correct + '</strong></p>';
          } else if (part.type === "calculation") {
            html += '<p>Your answer: <strong>' + (ans !== null && ans !== undefined ? ans : "No answer") + '</strong></p>';
            html += '<p>Expected: <strong>' + part.expectedValue + ' ± ' + part.tolerance + ' ' + (part.unit || "") + '</strong></p>';
          }
          html += '</div>';
        }
      }
    }
    html += '</div>';
    stageContent.innerHTML = html;
    btnBack.style.display = "";
    btnBack.textContent = "← Back to Result";
    btnNext.style.display = "none";
    btnBack.onclick = function() {
      state.pbaScreen = "result";
      renderCurrentStage();
      btnBack.onclick = onBtnBack;
    };
  }
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
    html += '<li data-id="' + exp.id + '" tabindex="0" role="button" aria-label="' + escapeHtml(exp.title) + '">' + exp.id + ". " +
      capitalizeFirst(exp.section) + " — " + truncate(exp.title, 40) + "</li>";
  }
  dom.practicalList.innerHTML = html;
  var items = dom.practicalList.querySelectorAll("li");
  for (var j = 0; j < items.length; j++) {
    items[j].addEventListener("click", onPracticalSelect);
    items[j].addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPracticalSelect.call(this, e);
      }
    });
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
      else if (isM7(id)) html = renderM7PrepareContent(exp);
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
    case "monitor":
      if (id && id.indexOf("M7") === 0) html = renderM7MonitorContent(exp);
      else html = renderMonitorContent(exp);
      break;
    case "run":          html = renderRunContent(exp); break;
    case "observe":
      if (id === "A2" || id === "A3") html = renderObserveChromContent(exp);
      else if (id === "A5") html = renderGasObserveContent(exp);
      else if (id && id.indexOf("M7") === 0) html = renderM7ObserveContent(exp);
      else html = renderObserveDistillContent(exp);
      break;
    case "markFront":    html = renderMarkFrontContent(exp); break;
    case "collect":
      if (id && id.indexOf("M7") === 0) html = renderM7CollectContent(exp);
      else html = renderCollectContent(exp);
      break;
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
    case "performTest":
      if (id === "M7_7") html = renderM7PerformTestContent(exp);
      else html = renderPerformTestContent(exp);
      break;
    case "confirm":      html = renderConfirmGasContent(exp); break;
    case "nextGas":      html = renderNextGasContent(exp); break;
    case "summary":      html = renderSummaryContent(exp); break;
    case "heat":         html = renderM7HeatContent(exp); break;
    case "selectIon":    html = renderM7SelectIonContent(exp); break;
    case "identify":     html = renderM7IdentifyContent(exp); break;
    case "nextIon":      html = renderM7NextIonContent(exp); break;
    case "dissolve":     html = renderM7DissolveContent(exp); break;
    case "concentrate":  html = renderM7ConcentrateContent(exp); break;
    case "crystallize":  html = renderM7CrystallizeContent(exp); break;
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
    '<button class="btn btn-accent" id="btn-enter-pba-from-lab" style="margin-bottom:1rem;">PBA Practice →</button>' +
    '<button class="btn btn-primary" id="btn-enter-mystery-from-lab" style="margin-bottom:1rem;background:#6a1b9a;">Mystery Lab →</button>' +
    '<button class="btn btn-primary" id="btn-enter-log-from-lab" style="margin-bottom:1rem;background:#1565c0;">Experiment Log →</button>' +
    '<button class="btn btn-primary" id="btn-enter-revision-from-lab" style="margin-bottom:1rem;background:#00695c;">Learning & Revision →</button>' +
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
      renderButtons();
    });
  }
  var conc = document.getElementById("conclusion-input");
  if (conc) {
    conc.addEventListener("input", function() {
      state.conclusion = conc.value;
      renderButtons();
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

function renderM7PrepareContent(exp) {
  if (!exp) return "";
  var html = '<h3>Prepare</h3>';
  html += '<p><strong>' + escapeHtml(exp.title) + '</strong></p>';
  html += '<p>Gather the required apparatus and materials listed in the previous step.</p>';
  html += '<p>Once ready, click <strong>Next</strong> to proceed.</p>';
  html += '<div class="sim-note">This is an educational simulation.</div>';
  return html;
}

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

function renderM7PerformTestContent(exp) {
  if (!exp) return "";
  var html = '<h3>Perform Water Test</h3>';
  html += '<p>Add distilled water to the anhydrous CuSO₄ powder on the watch glass.</p>';
  if (state.m7ActionDone && state.simulation && state.simulation.done) {
    html += '<div class="feedback-correct">Water added. CuSO₄ turned from white to blue.</div>';
    html += '<div class="sim-note">This is a simulated educational value.</div>';
  } else {
    html += '<p>Click <strong>Add Water</strong> to perform the test.</p>';
  }
  return html;
}

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
    } else {
      ctx.fillStyle = "#4488cc";
      ctx.fillRect(cx - 25, ch / 2 - 30, 50, 50);
      ctx.fillStyle = "#333";
      ctx.fillText("CuSO₄ solution", cx, ch / 2 + 40);
      ctx.fillStyle = "#888";
      ctx.fillText("Add Zn granules to begin", cx, ch / 2 + 60);
    }
  } else if (id === "M7_4") {
    ctx.fillText("Melting Point — Naphthalene", cx, 30);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(cx - 60, ch / 2 - 40, 120, 80);
    ctx.fillStyle = "#cc3333";
    ctx.fillRect(cx - 5, ch / 2 - 35, 10, 70);
    ctx.fillStyle = "#333";
    ctx.fillText("Thermometer", cx + 70, ch / 2);
    ctx.fillStyle = "#aab";
    ctx.fillRect(cx - 15, ch / 2 + 10, 30, 25);
    ctx.fillStyle = "#333";
    ctx.fillText("Capillary tube", cx + 70, ch / 2 + 25);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = "#28a745";
      ctx.fillText("MP observed: 80°C (simulated)", cx, ch / 2 + 80);
    }
  } else if (id === "M7_5") {
    ctx.fillText("Boiling Point — Ethyl Alcohol", cx, 30);
    ctx.fillStyle = "#ddd";
    ctx.beginPath();
    ctx.arc(cx, ch / 2 + 10, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#88ccee";
    ctx.beginPath();
    ctx.arc(cx, ch / 2 + 10, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#cc3333";
    ctx.fillRect(cx - 3, ch / 2 - 50, 6, 45);
    ctx.fillStyle = "#333";
    ctx.fillText("Thermometer", cx + 60, ch / 2 - 20);
    ctx.fillText("Round-bottom flask", cx, ch / 2 + 65);
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = "#28a745";
      ctx.fillText("BP observed: 78°C (simulated)", cx, ch / 2 + 85);
    }
  } else if (id === "M7_7") {
    ctx.fillText("Water Test — Anhydrous CuSO₄", cx, 30);
    ctx.fillStyle = "#f5f5f0";
    ctx.beginPath();
    ctx.arc(cx, ch / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (state.m7ActionDone && state.simulation && state.simulation.done) {
      ctx.fillStyle = "#3366cc";
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#333";
      ctx.fillText("CuSO₄ turned blue (water detected)", cx, ch / 2 + 70);
    } else {
      ctx.fillStyle = "#eee";
      ctx.beginPath();
      ctx.arc(cx, ch / 2, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#333";
      ctx.fillText("Watch glass with white CuSO₄ powder", cx, ch / 2 + 70);
    }
  } else if (id === "M7_8") {
    ctx.fillText("Water Purity Test (MP + BP)", cx, 30);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(cx - 80, ch / 2 - 20, 60, 50);
    ctx.fillStyle = "#88ccee";
    ctx.fillRect(cx - 75, ch / 2 - 15, 50, 40);
    ctx.fillStyle = "#cc3333";
    ctx.fillRect(cx - 52, ch / 2 - 45, 6, 35);
    ctx.fillStyle = "#333";
    ctx.fillText("Beaker + Thermometer", cx + 30, ch / 2);
    if (state.currentStage === "meltingPointTest" || state.currentStage === "recordMP") {
      ctx.fillText("Measuring melting point...", cx, ch / 2 + 60);
    } else if (state.currentStage === "boilingPointTest" || state.currentStage === "recordBP") {
      ctx.fillText("Measuring boiling point...", cx, ch / 2 + 60);
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
  if (state.appMode === "pba") {
    // PBA navigation handled by onPBAClick
    var allQ = pbaGetAllQuestions();
    if (state.pbaCurrentIndex < allQ.length - 1) {
      state.pbaCurrentIndex++;
      state.pbaCurrentSection = allQ[state.pbaCurrentIndex].section;
      renderCurrentStage();
    } else {
      state.pbaScreen = "review";
      renderCurrentStage();
    }
    return;
  }
  if (state.appMode === "mystery") {
    // Mystery Lab navigation handled by onMysteryClick
    return;
  }
  if (state.appMode === "log") {
    // Log navigation handled by onLogClick
    return;
  }
  if (state.appMode === "revision") {
    // Revision navigation handled by onRevisionClick
    return;
  }
  if (state.appMode === "demo") {
    // Demo navigation handled by onDemoClick
    return;
  }
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
  if (state.appMode === "pba") {
    if (state.pbaCurrentIndex > 0) {
      state.pbaCurrentIndex--;
      var allQ = pbaGetAllQuestions();
      state.pbaCurrentSection = allQ[state.pbaCurrentIndex].section;
      renderCurrentStage();
    }
    return;
  }
  if (state.appMode === "mystery") {
    if (state.mysteryScreen === "intro") {
      state.mysteryScreen = "menu";
      renderCurrentStage();
    } else if (state.mysteryScreen === "investigation" || state.mysteryScreen === "test_execute" || state.mysteryScreen === "observe" || state.mysteryScreen === "interpret") {
      state.mysteryScreen = "investigation";
      renderCurrentStage();
    } else if (state.mysteryScreen === "identify") {
      state.mysteryScreen = "investigation";
      renderCurrentStage();
    } else if (state.mysteryScreen === "conclusion") {
      state.mysteryScreen = "investigation";
      renderCurrentStage();
    } else if (state.mysteryScreen === "complete") {
      state.mysteryScreen = "menu";
      renderCurrentStage();
    }
    return;
  }
  if (state.appMode === "log") {
    if (state.logScreen === "detail") {
      state.logScreen = "list";
      state.logDetailId = null;
      renderCurrentStage();
    }
    return;
  }
  if (state.appMode === "revision") {
    if (state.revisionScreen === "detail") {
      state.revisionScreen = "list";
      state.revisionSelectedId = null;
      renderCurrentStage();
    }
    return;
  }
  if (state.appMode === "demo") {
    if (state.demoScreen !== "intro") {
      state.demoScreen = "intro";
      state.demoStep = 0;
      state.demoActive = false;
      state.appMode = "pba";
      state.pbaScreen = "menu";
      renderCurrentStage();
    }
    return;
  }
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
  var card = target.closest ? target.closest(".home-card") : null;
  var id = (card && card.id) ? card.id : target.id;

  // Main menu home cards
  if (id === "btn-enter-lab") {
    state.appMode = "lab";
    state.currentStage = "select";
    renderCurrentStage();
    renderSidebar();
    return;
  }
  if (id === "btn-enter-pba") {
    state.appMode = "pba";
    state.pbaScreen = "mode_select";
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-mystery") {
    state.appMode = "mystery";
    state.mysteryScreen = "menu";
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-log") {
    state.appMode = "log";
    state.logScreen = "list";
    state.logDetailId = null;
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-revision") {
    state.appMode = "revision";
    state.revisionScreen = "list";
    state.revisionFilter = "all";
    state.revisionSearch = "";
    state.revisionSelectedId = null;
    renderCurrentStage();
    return;
  }
  if (id === "btn-enter-demo") {
    state.appMode = "demo";
    state.demoActive = true;
    state.demoScreen = "intro";
    state.demoStep = 0;
    state.demoPracticalFinished = false;
    renderCurrentStage();
    return;
  }

  // Lab select screen navigation
  if (target.id === "btn-enter-pba-from-lab") {
    state.appMode = "pba";
    state.pbaScreen = "menu";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-enter-mystery-from-lab") {
    state.appMode = "mystery";
    state.mysteryScreen = "menu";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-enter-log-from-lab") {
    state.appMode = "log";
    state.logScreen = "list";
    state.logDetailId = null;
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-enter-revision-from-lab") {
    state.appMode = "revision";
    state.revisionScreen = "list";
    state.revisionFilter = "all";
    state.revisionSearch = "";
    state.revisionSelectedId = null;
    renderCurrentStage();
    return;
  }
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
      expLogCreateFromPractical();
      state.currentStage = "select";
      state.selectedExperimentId = null;
      state.experiment = null;
      renderCurrentStage();
      demoCheckPracticalFinish();
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
   SECTION 9B: MYSTERY LAB (M9)
   ============================================================== */

/* ---- Mystery Lab: Available Tests ---- */

var MYSTERY_TESTS = [
  {
    id: "flame",
    name: "Flame Test",
    purpose: "Identify metallic ions by their characteristic flame colour.",
    appliesTo: ["liquid", "solid"],
    description: "Hold a clean platinum wire in the sample, then place it in a Bunsen flame. Observe the flame colour.",
    source: "ChemSim educational simulation choice — based on standard flame test technique from M7.2"
  },
  {
    id: "water_test",
    name: "Water Test",
    purpose: "Detect the presence of water using anhydrous copper sulphate.",
    appliesTo: ["liquid"],
    description: "Add a small amount of the sample to white anhydrous CuSO₄ powder. Observe any colour change.",
    source: "Source-backed: M7.7 prescribed practical (water test using anhydrous CuSO₄)"
  },
  {
    id: "litmus",
    name: "Litmus Test",
    purpose: "Determine whether the sample is acidic, basic, or neutral.",
    appliesTo: ["liquid"],
    description: "Place a drop of the sample on red and blue litmus paper. Observe any colour changes.",
    source: "ChemSim educational simulation choice — standard litmus test technique"
  },
  {
    id: "melting_point",
    name: "Melting Point",
    purpose: "Determine the temperature at which a solid sample melts.",
    appliesTo: ["solid"],
    description: "Heat the solid sample slowly and record the temperature at which it completely melts.",
    source: "Source-backed: M7.4 prescribed practical (melting point of naphthalene)"
  },
  {
    id: "boiling_point",
    name: "Boiling Point",
    purpose: "Determine the temperature at which a liquid sample boils.",
    appliesTo: ["liquid"],
    description: "Heat the liquid sample slowly and record the temperature at which it boils steadily.",
    source: "Source-backed: M7.5 prescribed practical (boiling point of ethyl alcohol)"
  }
];

/* ---- Mystery Lab: Unknown Sample Pool ---- */

var MYSTERY_SAMPLES = [
  {
    id: "MX-01",
    identity: "Distilled Water",
    formula: "H₂O",
    category: "liquid",
    label: "A clear, colourless liquid with no detectable odour.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["boiling_point", "water_test"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "No characteristic flame colour observed. The flame remains pale blue.", interpretation: "No metallic ions detected in the sample." },
      water_test: { observation: "White anhydrous CuSO₄ powder turns blue upon adding the sample.", interpretation: "Water is present in the sample." },
      litmus: { observation: "No colour change observed in either red or blue litmus paper.", interpretation: "The sample is neutral (neither acidic nor basic)." },
      melting_point: { observation: "Sample remains liquid at 0°C; no solid phase observed.", interpretation: "Melting point is below 0°C, consistent with a liquid at room temperature." },
      boiling_point: { observation: "Liquid boils steadily at approximately 100°C.", interpretation: "Boiling point of 100°C is consistent with distilled water." }
    }
  },
  {
    id: "MX-02",
    identity: "Sodium Chloride Solution",
    formula: "NaCl (aq)",
    category: "liquid",
    label: "A clear, colourless liquid with no detectable odour.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["flame"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "Intense yellow flame observed when the sample is introduced into the Bunsen flame.", interpretation: "Sodium ions (Na⁺) are present in the sample." },
      water_test: { observation: "White anhydrous CuSO₄ powder turns blue upon adding the sample.", interpretation: "Water is present — this is an aqueous solution." },
      litmus: { observation: "No colour change observed in either red or blue litmus paper.", interpretation: "The solution is neutral, consistent with a neutral salt solution." },
      melting_point: { observation: "Sample remains liquid at 0°C; no solid phase observed.", interpretation: "Melting point is below 0°C — sample is a liquid at room temperature." },
      boiling_point: { observation: "Liquid boils at approximately 103°C.", interpretation: "Boiling point elevated above 100°C, indicating a dissolved solute raises the boiling point." }
    }
  },
  {
    id: "MX-03",
    identity: "Copper Sulphate Solution",
    formula: "CuSO₄ (aq)",
    category: "liquid",
    label: "A clear, blue-coloured liquid.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["flame"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "Green (blue-green) flame observed when the sample is introduced into the Bunsen flame.", interpretation: "Copper ions (Cu²⁺) are present in the sample." },
      water_test: { observation: "White anhydrous CuSO₄ powder turns blue upon adding the sample.", interpretation: "Water is present — this is an aqueous solution." },
      litmus: { observation: "Blue litmus paper turns slightly red. Red litmus remains unchanged.", interpretation: "The solution is slightly acidic, consistent with copper sulphate hydrolysis." },
      melting_point: { observation: "Sample remains liquid at 0°C; no solid phase observed.", interpretation: "Melting point is below 0°C — sample is a liquid at room temperature." },
      boiling_point: { observation: "Liquid boils at approximately 102°C.", interpretation: "Boiling point elevated above 100°C, indicating a dissolved solute raises the boiling point." }
    }
  },
  {
    id: "MX-04",
    identity: "Ethyl Alcohol",
    formula: "C₂H₅OH",
    category: "liquid",
    label: "A clear, colourless liquid with a characteristic sweet smell.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["boiling_point", "water_test"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "Pale blue flame observed, not characteristic of any metallic ion. No coloured flame.", interpretation: "No metallic ions detected — likely an organic (non-metallic) substance." },
      water_test: { observation: "White anhydrous CuSO₄ powder remains white. No colour change.", interpretation: "No water detected in the sample — this is a non-aqueous liquid." },
      litmus: { observation: "No colour change observed in either red or blue litmus paper.", interpretation: "The sample is neutral." },
      melting_point: { observation: "Sample remains liquid at 0°C; no solid phase observed.", interpretation: "Melting point is below 0°C — sample is a liquid at room temperature." },
      boiling_point: { observation: "Liquid boils at approximately 78°C.", interpretation: "Boiling point of 78°C is significantly below 100°C, consistent with ethyl alcohol (ethanol)." }
    }
  },
  {
    id: "MX-05",
    identity: "Naphthalene",
    formula: "C₁₀H₈",
    category: "solid",
    label: "A white crystalline solid with a characteristic mothball-like odour.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["melting_point", "flame"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "Sooty yellow flame with visible black smoke when heated.", interpretation: "Organic/aromatic compound — sooty flame indicates high carbon content." },
      water_test: { observation: "White anhydrous CuSO₄ powder remains white when sample is added.", interpretation: "No water detected — sample is a dry solid." },
      litmus: { observation: "No colour change observed in either red or blue litmus paper.", interpretation: "The sample is neutral." },
      melting_point: { observation: "Solid crystals melt at approximately 80°C.", interpretation: "Melting point of 80°C is consistent with naphthalene (C₁₀H₈)." },
      boiling_point: { observation: "Sample is solid at room temperature — boiling point test not applicable.", interpretation: "Sample is a solid, not a liquid. Boiling point determination requires a liquid sample." }
    }
  },
  {
    id: "MX-06",
    identity: "Dilute Hydrochloric Acid",
    formula: "HCl (aq)",
    category: "liquid",
    label: "A clear, colourless liquid with a sharp, pungent odour.",
    minTestsForDiagnosis: 1,
    diagnosticTests: ["litmus"],
    hypothesisOptions: ["Distilled Water", "Ethyl Alcohol", "Dilute Hydrochloric Acid", "Sodium Chloride Solution", "Copper Sulphate Solution", "Naphthalene"],
    evidence: {
      flame: { observation: "No characteristic flame colour observed. The flame remains pale blue.", interpretation: "No metallic ions detected in the sample." },
      water_test: { observation: "White anhydrous CuSO₄ powder turns blue upon adding the sample.", interpretation: "Water is present — this is an aqueous solution." },
      litmus: { observation: "Blue litmus paper turns red. Red litmus remains unchanged.", interpretation: "The sample is acidic — blue litmus turns red in the presence of an acid." },
      melting_point: { observation: "Sample remains liquid at 0°C; no solid phase observed.", interpretation: "Melting point is below 0°C — sample is a liquid at room temperature." },
      boiling_point: { observation: "Liquid boils at approximately 108°C.", interpretation: "Boiling point elevated above 100°C — consistent with a dilute acid solution (azeotrope behaviour)." }
    }
  }
];

/* ---- Mystery Lab: Session Engine ---- */

function mysteryShuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function mysteryGenerateSession() {
  var shuffled = mysteryShuffle(MYSTERY_SAMPLES);
  var chosen = shuffled[0];
  return {
    sampleId: chosen.id,
    sampleLabel: chosen.label,
    testsPerformed: [],
    evidence: [],
    hypothesis: null,
    identified: false,
    conclusion: "",
    completed: false,
    startedAt: Date.now()
  };
}

function mysteryGetSample() {
  if (!state.mysterySession) return null;
  for (var i = 0; i < MYSTERY_SAMPLES.length; i++) {
    if (MYSTERY_SAMPLES[i].id === state.mysterySession.sampleId) return MYSTERY_SAMPLES[i];
  }
  return null;
}

function mysteryGetTestById(testId) {
  for (var i = 0; i < MYSTERY_TESTS.length; i++) {
    if (MYSTERY_TESTS[i].id === testId) return MYSTERY_TESTS[i];
  }
  return null;
}

function mysteryIsTestPerformed(testId) {
  if (!state.mysterySession) return false;
  return state.mysterySession.testsPerformed.indexOf(testId) !== -1;
}

function mysteryGetAvailableTests() {
  var sample = mysteryGetSample();
  if (!sample) return [];
  var cat = sample.category;
  var available = [];
  for (var i = 0; i < MYSTERY_TESTS.length; i++) {
    if (MYSTERY_TESTS[i].appliesTo.indexOf(cat) !== -1) {
      available.push(MYSTERY_TESTS[i]);
    }
  }
  return available;
}

function mysteryPerformTest(testId) {
  var sample = mysteryGetSample();
  if (!sample || !state.mysterySession) return null;
  if (mysteryIsTestPerformed(testId)) return null;
  var evidenceData = sample.evidence[testId];
  if (!evidenceData) return null;
  var testInfo = mysteryGetTestById(testId);
  state.mysterySession.testsPerformed.push(testId);
  var entry = {
    testId: testId,
    testName: testInfo ? testInfo.name : testId,
    observation: evidenceData.observation,
    interpretation: evidenceData.interpretation,
    studentObservation: "",
    studentInterpretation: ""
  };
  state.mysterySession.evidence.push(entry);
  return entry;
}

function mysteryGetEvidenceCount() {
  if (!state.mysterySession) return 0;
  return state.mysterySession.evidence.length;
}

function mysteryHasDiagnosticEvidence() {
  var sample = mysteryGetSample();
  if (!sample) return false;
  var evidence = state.mysterySession.evidence;
  for (var i = 0; i < evidence.length; i++) {
    if (sample.diagnosticTests.indexOf(evidence[i].testId) !== -1) return true;
  }
  return false;
}

function mysteryGetEvidenceQuality() {
  var count = mysteryGetEvidenceCount();
  if (count === 0) return "none";
  if (mysteryHasDiagnosticEvidence()) return "sufficient";
  return "some";
}

function mysteryValidateIdentification(guess) {
  var sample = mysteryGetSample();
  if (!sample) return false;
  return guess.toLowerCase().trim() === sample.identity.toLowerCase().trim();
}

function mysteryScoreInvestigation() {
  if (!state.mysterySession) return { tests: 0, useful: 0, identified: false, conclusionWritten: false, quality: "none" };
  var tests = state.mysterySession.testsPerformed.length;
  var sample = mysteryGetSample();
  var useful = 0;
  if (sample) {
    for (var i = 0; i < state.mysterySession.testsPerformed.length; i++) {
      if (sample.diagnosticTests.indexOf(state.mysterySession.testsPerformed[i]) !== -1) useful++;
    }
  }
  return {
    tests: tests,
    useful: useful,
    identified: state.mysterySession.identified,
    conclusionWritten: state.mysterySession.conclusion.length > 10,
    quality: mysteryGetEvidenceQuality()
  };
}

function mysteryFormatTime(ms) {
  var totalSec = Math.floor(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

/* ---- Mystery Lab: Renderers ---- */

function renderMysteryMenu() {
  var html = '<div style="text-align:center;padding:2rem;">';
  html += '<h2>Mystery Lab</h2>';
  html += '<p class="subtitle">Unknown Sample Identification</p>';
  html += '<p style="max-width:450px;margin:1rem auto;color:var(--color-text-secondary);">You will receive an unknown sample. Use the available virtual tests to investigate, collect evidence, form a hypothesis, and identify the substance.</p>';
  html += '<div style="margin-top:2rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-start" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:1rem;font-size:1.1rem;background:#6a1b9a;">Start Investigation</button>';
  html += '<button class="btn btn-secondary" id="btn-mystery-back-to-menu" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:0.75rem;">← Back to Main Menu</button>';
  html += '</div>';
  html += '<div class="sim-note" style="max-width:400px;margin:2rem auto;text-align:left;">';
  html += '<strong>How it works:</strong><br>';
  html += '1. Receive an unknown sample<br>';
  html += '2. Choose and perform virtual tests<br>';
  html += '3. Record your observations<br>';
  html += '4. Interpret the evidence<br>';
  html += '5. Form and revise your hypothesis<br>';
  html += '6. Identify the sample and write a conclusion<br><br>';
  html += '<em>ChemSim Mystery Lab — Educational Simulation</em>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderMysteryIntro() {
  var s = state.mysterySession;
  var html = '<div class="mystery-panel">';
  html += '<div class="label">ChemSim Mystery Lab — Educational Simulation</div>';
  html += '<h3>Unknown Sample Received</h3>';
  html += '<div class="mystery-sample-card">';
  html += '<p><strong>Sample ID:</strong> ' + s.sampleId + '</p>';
  html += '<p>' + escapeHtml(s.sampleLabel) + '</p>';
  html += '</div>';
  html += '<p style="margin-top:1rem;">Your task: Use the available tests to identify this unknown.</p>';
  html += '<p>You may perform multiple tests. Choose wisely — each test reveals evidence.</p>';
  html += '<div style="margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-begin" style="padding:0.75rem 2rem;font-size:1rem;">Begin Investigation →</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderMysteryInvestigation() {
  var s = state.mysterySession;
  var sample = mysteryGetSample();
  var available = mysteryGetAvailableTests();
  var quality = mysteryGetEvidenceQuality();
  var elapsed = Date.now() - s.startedAt;

  var html = '<div class="mystery-investigation">';

  /* Header: unknown sample */
  html += '<div class="mystery-panel mystery-panel-header">';
  html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">';
  html += '<div><strong>UNKNOWN SAMPLE</strong> — ' + s.sampleId + '</div>';
  html += '<div style="color:var(--color-text-secondary);font-size:0.85rem;">Time: ' + mysteryFormatTime(elapsed) + ' | Evidence: ' + mysteryGetEvidenceCount() + ' test(s) | Quality: ' + quality + '</div>';
  html += '</div>';
  html += '</div>';

  /* Available tests */
  html += '<div class="mystery-panel">';
  html += '<h4>Available Tests</h4>';
  var anyAvail = false;
  for (var i = 0; i < available.length; i++) {
    var t = available[i];
    var done = mysteryIsTestPerformed(t.id);
    anyAvail = true;
    html += '<button class="btn btn-tool mystery-test-btn" data-mystery-test="' + t.id + '"' + (done ? ' disabled style="opacity:0.5;cursor:default;"' : '') + '>';
    html += escapeHtml(t.name);
    if (done) html += ' ✓';
    html += '</button>';
  }
  if (!anyAvail) html += '<p style="color:var(--color-text-secondary);">No tests available for this sample type.</p>';
  html += '</div>';

  /* Evidence Board */
  html += renderMysteryEvidenceBoard();

  /* Hypothesis */
  html += renderMysteryHypothesisPanel();

  /* Action buttons */
  html += '<div class="mystery-panel" style="text-align:center;">';
  html += '<button class="btn btn-primary" id="btn-mystery-identify" style="margin:0.5rem;padding:0.75rem 2rem;">Identify Sample</button>';
  html += '</div>';

  html += '</div>';
  return html;
}

function renderMysteryEvidenceBoard() {
  var s = state.mysterySession;
  if (!s || s.evidence.length === 0) {
    return '<div class="mystery-panel"><h4>Evidence Board</h4><p style="color:var(--color-text-secondary);">No evidence collected yet. Perform a test to begin.</p></div>';
  }
  var html = '<div class="mystery-panel">';
  html += '<h4>Evidence Board (' + s.evidence.length + ' test' + (s.evidence.length !== 1 ? 's' : '') + ')</h4>';
  for (var i = 0; i < s.evidence.length; i++) {
    var e = s.evidence[i];
    html += '<div class="mystery-evidence-entry">';
    html += '<div class="mystery-evidence-header">';
    html += '<strong>Test ' + (i + 1) + ': ' + escapeHtml(e.testName) + '</strong>';
    html += '</div>';
    html += '<p><em>Simulated Observation:</em> ' + escapeHtml(e.observation) + '</p>';
    html += '<p><em>Chemical Interpretation:</em> ' + escapeHtml(e.interpretation) + '</p>';
    html += '<div style="margin-top:0.5rem;">';
    html += '<label style="font-size:0.85rem;display:block;margin-bottom:0.25rem;">Your observation notes:</label>';
    html += '<textarea class="mystery-textarea" data-evidence-idx="' + i + '" data-evidence-field="obs" rows="2" placeholder="Record what you observed...">' + escapeHtml(e.studentObservation) + '</textarea>';
    html += '</div>';
    html += '<div style="margin-top:0.5rem;">';
    html += '<label style="font-size:0.85rem;display:block;margin-bottom:0.25rem;">Your interpretation:</label>';
    html += '<textarea class="mystery-textarea" data-evidence-idx="' + i + '" data-evidence-field="interp" rows="2" placeholder="What does this evidence suggest?">' + escapeHtml(e.studentInterpretation) + '</textarea>';
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function renderMysteryHypothesisPanel() {
  var s = state.mysterySession;
  var sample = mysteryGetSample();
  if (!sample) return '';
  var html = '<div class="mystery-panel">';
  html += '<h4>Form Your Hypothesis</h4>';
  html += '<p style="font-size:0.9rem;color:var(--color-text-secondary);">What do you think the unknown sample is? You can revise your hypothesis as you collect more evidence.</p>';
  html += '<div style="margin:0.75rem 0;">';
  html += '<select id="mystery-hypothesis-select" style="padding:0.5rem;font-size:1rem;width:100%;max-width:400px;">';
  html += '<option value="">— Select your hypothesis —</option>';
  for (var i = 0; i < sample.hypothesisOptions.length; i++) {
    var opt = sample.hypothesisOptions[i];
    var sel = (s.hypothesis === opt) ? ' selected' : '';
    html += '<option value="' + escapeHtml(opt) + '"' + sel + '>' + escapeHtml(opt) + '</option>';
  }
  html += '</select>';
  html += '</div>';
  html += '<button class="btn btn-secondary" id="btn-mystery-record-hypothesis" style="padding:0.5rem 1.5rem;">Record Hypothesis</button>';
  if (s.hypothesis) {
    html += '<p style="margin-top:0.5rem;font-size:0.9rem;"><strong>Current hypothesis:</strong> ' + escapeHtml(s.hypothesis) + '</p>';
  }
  html += '</div>';
  return html;
}

function renderMysteryTestExecute() {
  var s = state.mysterySession;
  var lastTest = s.testsPerformed[s.testsPerformed.length - 1];
  var testInfo = mysteryGetTestById(lastTest);
  var html = '<div class="mystery-panel">';
  html += '<div class="label">ChemSim Mystery Lab — Performing Test</div>';
  html += '<h3>' + escapeHtml(testInfo.name) + '</h3>';
  html += '<p><strong>Purpose:</strong> ' + escapeHtml(testInfo.purpose) + '</p>';
  html += '<p style="margin-top:0.75rem;">' + escapeHtml(testInfo.description) + '</p>';
  html += '<div class="mystery-test-visual">';
  html += '<div style="text-align:center;padding:2rem;background:var(--color-bg);border-radius:8px;border:1px solid var(--color-border);">';
  html += '<p style="font-size:1.1rem;margin-bottom:1rem;">🔬 Performing ' + escapeHtml(testInfo.name) + '...</p>';
  html += '<div class="mystery-animation">';
  html += '<p style="font-size:2rem;">⚗️</p>';
  html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);">SIMULATED EDUCATIONAL VALUES — not real laboratory measurements</p>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-view-observation" style="padding:0.75rem 2rem;font-size:1rem;">View Observation →</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderMysteryObserve() {
  var s = state.mysterySession;
  var lastEvidence = s.evidence[s.evidence.length - 1];
  if (!lastEvidence) {
    state.mysteryScreen = "investigation";
    return renderMysteryInvestigation();
  }
  var html = '<div class="mystery-panel">';
  html += '<div class="label">ChemSim Mystery Lab — Observation</div>';
  html += '<h3>Simulated Observation: ' + escapeHtml(lastEvidence.testName) + '</h3>';
  html += '<div class="mystery-observation-card">';
  html += '<p><strong>What happened:</strong></p>';
  html += '<p style="padding:1rem;background:var(--color-bg);border-left:3px solid var(--color-primary);border-radius:4px;">' + escapeHtml(lastEvidence.observation) + '</p>';
  html += '</div>';
  html += '<div class="mystery-interpretation-card" style="margin-top:1rem;">';
  html += '<p><strong>Chemical interpretation:</strong></p>';
  html += '<p style="padding:1rem;background:#e8f5e9;border-left:3px solid var(--color-success);border-radius:4px;">' + escapeHtml(lastEvidence.interpretation) + '</p>';
  html += '</div>';
  html += '<p style="margin-top:1rem;font-size:0.85rem;color:var(--color-text-secondary);">SIMULATED EDUCATIONAL VALUES — not real laboratory measurements</p>';
  html += '<div style="text-align:center;margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-record-evidence" style="padding:0.75rem 2rem;font-size:1rem;">Record Evidence & Continue →</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderMysteryInterpret() {
  return renderMysteryInvestigation();
}

function renderMysteryIdentify() {
  var s = state.mysterySession;
  var sample = mysteryGetSample();
  if (!sample) return '';
  var html = '<div class="mystery-panel">';
  html += '<div class="label">ChemSim Mystery Lab — Final Identification</div>';
  html += '<h3>Identify the Unknown Sample</h3>';
  html += '<p>You have collected ' + mysteryGetEvidenceCount() + ' piece(s) of evidence.</p>';
  html += '<div style="margin:1rem 0;">';
  html += '<p><strong>Select your identification:</strong></p>';
  html += '<select id="mystery-identify-select" style="padding:0.5rem;font-size:1rem;width:100%;max-width:400px;">';
  html += '<option value="">— Select the unknown substance —</option>';
  for (var i = 0; i < sample.hypothesisOptions.length; i++) {
    var opt = sample.hypothesisOptions[i];
    html += '<option value="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</option>';
  }
  html += '</select>';
  html += '</div>';
  html += '<div style="margin:1rem 0;">';
  html += '<label style="display:block;margin-bottom:0.5rem;"><strong>Evidence-based conclusion:</strong></label>';
  html += '<textarea id="mystery-conclusion-input" class="mystery-textarea" rows="4" placeholder="The evidence from [test 1] and [test 2] supports the identification of [substance] because [reasoning]...">' + escapeHtml(s.conclusion) + '</textarea>';
  html += '</div>';
  html += '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;margin-top:1rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-submit-identification" style="padding:0.75rem 2rem;">Submit Identification</button>';
  html += '<button class="btn btn-secondary" id="btn-mystery-back-investigation" style="padding:0.75rem 2rem;">← Back to Investigation</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderMysteryComplete() {
  var s = state.mysterySession;
  var sample = mysteryGetSample();
  var score = mysteryScoreInvestigation();
  var elapsed = Date.now() - s.startedAt;

  var html = '<div class="mystery-panel mystery-complete">';
  html += '<div class="label">ChemSim Mystery Lab — Investigation Complete</div>';
  html += '<h3>Investigation Summary</h3>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<p style="font-size:2rem;font-weight:bold;color:var(--color-success);">✓ Identification Confirmed</p>';
  html += '<p style="font-size:1.1rem;">The unknown sample is: <strong>' + escapeHtml(sample.identity) + '</strong> (' + escapeHtml(sample.formula) + ')</p>';
  html += '</div>';
  html += '<div class="mystery-summary-table">';
  html += '<table class="measure-table">';
  html += '<thead><tr><th>Detail</th><th>Result</th></tr></thead><tbody>';
  html += '<tr><td>Sample ID</td><td>' + s.sampleId + '</td></tr>';
  html += '<tr><td>Identity</td><td>' + escapeHtml(sample.identity) + '</td></tr>';
  html += '<tr><td>Tests Performed</td><td>' + score.tests + '</td></tr>';
  html += '<tr><td>Useful Diagnostic Tests</td><td>' + score.useful + '</td></tr>';
  html += '<tr><td>Evidence Quality</td><td>' + score.quality + '</td></tr>';
  html += '<tr><td>Identification</td><td style="color:var(--color-success);">Correct</td></tr>';
  html += '<tr><td>Conclusion Written</td><td>' + (score.conclusionWritten ? 'Yes' : 'Not recorded') + '</td></tr>';
  html += '<tr><td>Time Taken</td><td>' + mysteryFormatTime(elapsed) + '</td></tr>';
  html += '</tbody></table>';
  html += '</div>';

  /* Evidence Summary */
  html += '<h4 style="margin-top:1.5rem;">Evidence Summary</h4>';
  for (var i = 0; i < s.evidence.length; i++) {
    var e = s.evidence[i];
    var isDiagnostic = sample.diagnosticTests.indexOf(e.testId) !== -1;
    html += '<div class="mystery-evidence-entry">';
    html += '<p>' + (isDiagnostic ? '✓' : '○') + ' <strong>' + escapeHtml(e.testName) + '</strong></p>';
    html += '<p style="font-size:0.9rem;">' + escapeHtml(e.observation) + '</p>';
    html += '</div>';
  }

  /* Conclusion */
  if (s.conclusion) {
    html += '<h4 style="margin-top:1rem;">Your Conclusion</h4>';
    html += '<div style="padding:1rem;background:var(--color-bg);border-left:3px solid var(--color-primary);border-radius:4px;">';
    html += '<p>' + escapeHtml(s.conclusion) + '</p>';
    html += '</div>';
  }

  /* Hypothesis */
  if (s.hypothesis) {
    html += '<h4 style="margin-top:1rem;">Your Hypothesis</h4>';
    html += '<p>' + escapeHtml(s.hypothesis) + (s.hypothesis === sample.identity ? ' (correct)' : ' (revised before identification)') + '</p>';
  }

  /* Feedback */
  html += '<div class="mystery-feedback" style="margin-top:1.5rem;">';
  html += '<h4>Investigation Feedback</h4>';
  html += '<ul>';
  html += '<li>Tests performed: ' + score.tests + '</li>';
  html += '<li>Useful evidence: ' + score.useful + ' diagnostic test(s)</li>';
  html += '<li>Identification: Correct</li>';
  html += '<li>Conclusion: ' + (score.conclusionWritten ? 'Evidence-based conclusion recorded' : 'No conclusion recorded') + '</li>';
  html += '</ul>';
  html += '</div>';

  html += '<div style="text-align:center;margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-mystery-finish" style="padding:0.75rem 2rem;font-size:1rem;background:#6a1b9a;">Finish Mystery Lab</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

/* ---- Mystery Lab: Stage Router ---- */

function renderMysteryStage() {
  var stageContent = document.getElementById("stage-content");
  var stageTitle = document.getElementById("stage-title");
  var stageProgress = document.getElementById("stage-progress");
  var simulationArea = document.getElementById("simulation-area");
  var userInputArea = document.getElementById("user-input-area");
  var feedbackArea = document.getElementById("feedback-area");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var sidebar = document.getElementById("sidebar");

  sidebar.style.display = "none";
  simulationArea.classList.add("hidden");
  userInputArea.innerHTML = "";
  feedbackArea.innerHTML = "";
  btnBack.style.display = "none";
  btnNext.style.display = "none";

  if (state.mysteryScreen === "menu") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderMysteryMenu();
    stageContent.onclick = onMysteryClick;
  } else if (state.mysteryScreen === "intro") {
    stageTitle.textContent = "Mystery Lab";
    stageProgress.innerHTML = '<span class="label">New Investigation</span>';
    stageContent.innerHTML = renderMysteryIntro();
    stageContent.onclick = onMysteryClick;
  } else if (state.mysteryScreen === "investigation") {
    stageTitle.textContent = "Mystery Lab — Investigation";
    stageProgress.innerHTML = '<span class="label">' + state.mysterySession.sampleId + ' | Evidence: ' + mysteryGetEvidenceCount() + '</span>';
    stageContent.innerHTML = renderMysteryInvestigation();
    stageContent.onclick = onMysteryClick;
    stageContent.oninput = onMysteryInput;
    userInputArea.onclick = onMysteryClick;
  } else if (state.mysteryScreen === "test_execute") {
    stageTitle.textContent = "Mystery Lab — Performing Test";
    stageProgress.innerHTML = '<span class="label">' + state.mysterySession.sampleId + '</span>';
    stageContent.innerHTML = renderMysteryTestExecute();
    stageContent.onclick = onMysteryClick;
  } else if (state.mysteryScreen === "observe") {
    stageTitle.textContent = "Mystery Lab — Observation";
    stageProgress.innerHTML = '<span class="label">' + state.mysterySession.sampleId + '</span>';
    stageContent.innerHTML = renderMysteryObserve();
    stageContent.onclick = onMysteryClick;
    stageContent.oninput = onMysteryInput;
  } else if (state.mysteryScreen === "identify") {
    stageTitle.textContent = "Mystery Lab — Identification";
    stageProgress.innerHTML = '<span class="label">' + state.mysterySession.sampleId + ' | Evidence: ' + mysteryGetEvidenceCount() + '</span>';
    stageContent.innerHTML = renderMysteryIdentify();
    stageContent.onclick = onMysteryClick;
    stageContent.oninput = onMysteryInput;
  } else if (state.mysteryScreen === "complete") {
    stageTitle.textContent = "Mystery Lab — Complete";
    stageProgress.innerHTML = '';
    stageContent.innerHTML = renderMysteryComplete();
    stageContent.onclick = onMysteryClick;
  }
}

/* ---- Mystery Lab: Event Handler ---- */

function onMysteryClick(e) {
  var target = e.target;

  /* Main menu */
  if (target.id === "btn-mystery-start") {
    state.mysterySession = mysteryGenerateSession();
    state.mysteryScreen = "intro";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-mystery-back-to-menu") {
    state.appMode = "pba";
    state.mysteryScreen = "menu";
    renderCurrentStage();
    return;
  }

  /* Intro */
  if (target.id === "btn-mystery-begin") {
    state.mysteryScreen = "investigation";
    renderCurrentStage();
    return;
  }

  /* Test selection */
  if (target.classList.contains("mystery-test-btn") && target.getAttribute("data-mystery-test")) {
    var testId = target.getAttribute("data-mystery-test");
    if (!mysteryIsTestPerformed(testId)) {
      mysteryPerformTest(testId);
      state.mysteryScreen = "test_execute";
      renderCurrentStage();
    }
    return;
  }

  /* View observation */
  if (target.id === "btn-mystery-view-observation") {
    state.mysteryScreen = "observe";
    renderCurrentStage();
    return;
  }

  /* Record evidence and continue */
  if (target.id === "btn-mystery-record-evidence") {
    state.mysteryScreen = "investigation";
    renderCurrentStage();
    return;
  }

  /* Record hypothesis */
  if (target.id === "btn-mystery-record-hypothesis") {
    var sel = document.getElementById("mystery-hypothesis-select");
    if (sel && sel.value) {
      state.mysterySession.hypothesis = sel.value;
      renderCurrentStage();
    }
    return;
  }

  /* Make identification */
  if (target.id === "btn-mystery-identify") {
    state.mysteryScreen = "identify";
    renderCurrentStage();
    return;
  }

  /* Submit identification */
  if (target.id === "btn-mystery-submit-identification") {
    var identifySel = document.getElementById("mystery-identify-select");
    var conclusionInput = document.getElementById("mystery-conclusion-input");
    var guess = identifySel ? identifySel.value : "";
    var conclusion = conclusionInput ? conclusionInput.value : "";
    state.mysterySession.conclusion = conclusion;
    if (!guess) {
      var fb = document.getElementById("feedback-area");
      if (fb) fb.textContent = "Please select an identification before submitting.";
      return;
    }
    if (mysteryValidateIdentification(guess)) {
      state.mysterySession.identified = true;
      state.mysterySession.completed = true;
      state.mysteryScreen = "complete";
      renderCurrentStage();
    } else {
      var fbEl = document.getElementById("feedback-area");
      if (fbEl) fbEl.textContent = "Identification not confirmed. Review your evidence and perform another useful test.";
      state.mysteryScreen = "investigation";
      renderCurrentStage();
    }
    return;
  }

  /* Back to investigation from identify */
  if (target.id === "btn-mystery-back-investigation") {
    var ci2 = document.getElementById("mystery-conclusion-input");
    if (ci2) state.mysterySession.conclusion = ci2.value;
    state.mysteryScreen = "investigation";
    renderCurrentStage();
    return;
  }

  /* Finish */
  if (target.id === "btn-mystery-finish") {
    expLogCreateFromMystery();
    state.mysterySession = null;
    state.mysteryScreen = "menu";
    state.appMode = "pba";
    renderCurrentStage();
    renderSidebar();
    return;
  }

  /* Evidence textareas */
  if (target.classList.contains("mystery-textarea")) {
    var idx = parseInt(target.getAttribute("data-evidence-idx"), 10);
    var field = target.getAttribute("data-evidence-field");
    if (state.mysterySession && state.mysterySession.evidence[idx]) {
      if (field === "obs") state.mysterySession.evidence[idx].studentObservation = target.value;
      else if (field === "interp") state.mysterySession.evidence[idx].studentInterpretation = target.value;
    }
    return;
  }
}

/* ---- Mystery Lab: Input Handler ---- */

function onMysteryInput(e) {
  var target = e.target;
  if (target.classList.contains("mystery-textarea")) {
    var idx = parseInt(target.getAttribute("data-evidence-idx"), 10);
    var field = target.getAttribute("data-evidence-field");
    if (state.mysterySession && state.mysterySession.evidence[idx]) {
      if (field === "obs") state.mysterySession.evidence[idx].studentObservation = target.value;
      else if (field === "interp") state.mysterySession.evidence[idx].studentInterpretation = target.value;
    }
  }
}

/* ==============================================================
   SECTION 9C: EXPERIMENT LOG (M10)
   ============================================================== */

var EXP_LOG_STORAGE_KEY = "chemsim_experiment_log";

/* ---- M10: Storage Layer ---- */

function expLogLoad() {
  try {
    if (typeof localStorage === "undefined") return [];
    var raw = localStorage.getItem(EXP_LOG_STORAGE_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}

function expLogSave(records) {
  try {
    if (typeof localStorage === "undefined") return false;
    localStorage.setItem(EXP_LOG_STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (e) {
    return false;
  }
}

function expLogAdd(record) {
  var records = expLogLoad();
  records.unshift(record);
  return expLogSave(records);
}

function expLogDelete(recordId) {
  var records = expLogLoad();
  var found = false;
  for (var i = 0; i < records.length; i++) {
    if (records[i].id === recordId) {
      records.splice(i, 1);
      found = true;
      break;
    }
  }
  if (found) expLogSave(records);
  return found;
}

function expLogClearAll() {
  return expLogSave([]);
}

function expLogGetById(recordId) {
  var records = expLogLoad();
  for (var i = 0; i < records.length; i++) {
    if (records[i].id === recordId) return records[i];
  }
  return null;
}

/* ---- M10: Record Builders ---- */

function expLogTimestamp() {
  var now = new Date();
  var date = now.getFullYear() + "-" +
    ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" +
    (now.getDate() < 10 ? "0" : "") + now.getDate();
  var time = ((now.getHours() < 10 ? "0" : "") + now.getHours()) + ":" +
    ((now.getMinutes() < 10 ? "0" : "") + now.getMinutes()) + ":" +
    ((now.getSeconds() < 10 ? "0" : "") + now.getSeconds());
  return { date: date, time: time, ts: now.getTime() };
}

function expLogBuildPracticalRecord(exp, state) {
  var ts = expLogTimestamp();
  var id = "LOG-" + ts.ts + "-" + Math.random().toString(36).substring(2, 6);

  /* Collect experiment-specific observations/measurements */
  var observations = "";
  var measurements = "";
  var calculations = "";
  var result = "";
  var conclusion = state.conclusion || "";

  if (exp.id === "A1") {
    var sim = SIMULATION_CONFIG["A1"];
    observations = "First fraction: " + sim.firstFraction.name + " at " + sim.firstFraction.boilingPoint + " °C. " +
      "Second fraction: " + sim.secondFraction.name + " at " + sim.secondFraction.boilingPoint + " °C.";
    measurements = "Temperature monitored throughout distillation. Distillate collected at stabilised boiling points.";
    result = sim.firstFraction.name + " distils first at the lower boiling point, while " + sim.secondFraction.name + " remains in the flask.";
  } else if (exp.id === "A2" || exp.id === "A3") {
    var simC = SIMULATION_CONFIG[exp.id];
    var parts = [];
    for (var i = 0; i < simC.components.length; i++) {
      var c = simC.components[i];
      var dist = state.measuredComponents[i] ? state.measuredComponents[i].distance : 0;
      var rf = state.rfAnswers["rf_" + i] || "—";
      parts.push(c.name + ": distance=" + dist.toFixed(2) + " cm, Rf=" + rf);
    }
    observations = parts.join("; ");
    measurements = "Component distances and Rf values measured. Solvent front: " + (state.solventFrontDist ? state.solventFrontDist.toFixed(2) + " cm" : "—") + ".";
    result = "Components separated by paper chromatography based on different Rf values.";
  } else if (exp.id === "A4") {
    var simT = SIMULATION_CONFIG["A4"];
    observations = "HCl concentration: " + simT.hclConcentration.toFixed(4) + " mol/L. NaOH volume: " + simT.naohVolume.toFixed(2) + " mL. Mean titre: " + simT.meanTitre.toFixed(2) + " mL.";
    measurements = "Mean titre value used for molarity calculation.";
    calculations = "NaOH molarity = " + simT.expectedMolarity.toFixed(4) + " mol/L.";
    result = "Exact molarity of NaOH determined volumetrically as " + simT.expectedMolarity.toFixed(4) + " mol/L.";
  } else if (exp.id === "A5") {
    var simG = SIMULATION_CONFIG["A5"];
    var gasObs = [];
    for (var gi = 0; gi < simG.gases.length; gi++) {
      var g = simG.gases[gi];
      var res = state.gasResults[g.id] || {};
      gasObs.push(g.name + ": test=" + g.correctTestLabel + ", observation=" + (res.recorded || "—") + ", interpretation=" + (res.interpretation || "—") + ", confirmed=" + (res.confirmed ? "yes" : "no"));
    }
    observations = gasObs.join("; ");
    measurements = "Three gases tested and confirmed using appropriate chemical tests.";
    result = "NH₃ confirmed with damp red litmus, CO₂ confirmed with limewater, Cl₂ confirmed with damp litmus.";
  } else if (exp.id && exp.id.indexOf("M7") === 0) {
    observations = state.interpretation || "";
    measurements = "Observations recorded during the practical.";
    result = "Experiment completed. Observations recorded.";
  }

  return {
    id: id,
    experimentId: exp.id,
    title: exp.title,
    section: exp.section,
    type: "practical",
    date: ts.date,
    time: ts.time,
    slos: exp.slos || [],
    objective: exp.objective || "",
    apparatus: exp.apparatus || [],
    materials: exp.materials || [],
    procedure: exp.procedure || [],
    observations: observations,
    measurements: measurements,
    calculations: calculations,
    result: result,
    conclusion: conclusion,
    sourceLabel: "FBISE prescribed practical",
    simulatedNotice: "All measurements and values are simulated educational values, not real laboratory measurements."
  };
}

function expLogBuildMysteryRecord(mSession) {
  var ts = expLogTimestamp();
  var id = "LOG-" + ts.ts + "-" + Math.random().toString(36).substring(2, 6);
  var sample = mysteryGetSample();

  var evidenceText = [];
  for (var i = 0; i < mSession.evidence.length; i++) {
    var e = mSession.evidence[i];
    evidenceText.push(e.testName + ": " + e.observation + " (interpretation: " + e.interpretation + ")");
  }

  return {
    id: id,
    experimentId: "mystery",
    title: "Mystery Lab Investigation",
    section: "investigation",
    type: "mystery",
    date: ts.date,
    time: ts.time,
    sampleId: mSession.sampleId,
    sampleIdentity: sample ? sample.identity : "Unknown",
    testsPerformed: mSession.testsPerformed.slice(),
    evidence: evidenceText,
    hypothesis: mSession.hypothesis || "",
    identification: sample ? sample.identity : "Unknown",
    identified: mSession.identified,
    conclusion: mSession.conclusion || "",
    sourceLabel: "ChemSim Mystery Lab — Educational Simulation",
    simulatedNotice: "All observations are simulated educational values, not real laboratory measurements."
  };
}

/* ---- M10: Renderers ---- */

function renderLogMenu() {
  var records = expLogLoad();
  var count = records.length;

  var html = '<div style="text-align:center;padding:2rem;">';
  html += '<h2>ChemSim Experiment Log</h2>';
  html += '<p class="subtitle">A browser-local record of your ChemSim educational investigations.</p>';
  html += '<p style="max-width:450px;margin:1rem auto;color:var(--color-text-secondary);">Review your completed practicals and Mystery Lab investigations. Records are stored locally in your browser.</p>';
  html += '<div style="margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-log-open" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:1rem;font-size:1.1rem;background:#1565c0;">Open Experiment Log (' + count + ' record' + (count !== 1 ? 's' : '') + ')</button>';
  html += '<button class="btn btn-secondary" id="btn-log-back-to-menu" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:0.75rem;">← Back to Main Menu</button>';
  html += '</div>';
  html += '<div class="sim-note" style="max-width:400px;margin:2rem auto;text-align:left;">';
  html += '<strong>About the Experiment Log:</strong><br>';
  html += 'Records are created automatically when you finish a practical or Mystery Lab investigation.<br><br>';
  html += '<em>Simulation values are educationally simulated and are not real laboratory measurements.</em>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderLogList() {
  var records = expLogLoad();
  var html = '<div class="log-panel">';
  html += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">';
  html += '<div>';
  html += '<h3>Experiment Log</h3>';
  html += '<p style="font-size:0.9rem;color:var(--color-text-secondary);">' + records.length + ' record' + (records.length !== 1 ? 's' : '') + ' saved</p>';
  html += '</div>';
  html += '<div style="display:flex;gap:0.5rem;">';
  if (records.length > 0) {
    html += '<button class="btn btn-secondary" id="btn-log-clear-all" style="font-size:0.85rem;padding:0.4rem 1rem;">Clear All</button>';
  }
  html += '</div>';
  html += '</div>';

  if (records.length === 0) {
    html += '<div class="log-empty">';
    html += '<p style="font-size:1.1rem;margin-bottom:0.5rem;">No experiment records yet.</p>';
    html += '<p style="color:var(--color-text-secondary);">Complete a practical or Mystery Lab investigation to create your first record.</p>';
    html += '</div>';
  } else {
    for (var i = 0; i < records.length; i++) {
      var r = records[i];
      var typeLabel = r.type === "mystery" ? "Mystery Lab" : (r.section === "major" ? "Major" : "Minor");
      var typeColor = r.type === "mystery" ? "#6a1b9a" : (r.section === "major" ? "var(--color-primary)" : "var(--color-accent, #ff9800)");
      html += '<div class="log-card">';
      html += '<div style="display:flex;justify-content:space-between;align-items:start;gap:1rem;">';
      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">';
      html += '<span class="log-badge" style="background:' + typeColor + ';">' + typeLabel + '</span>';
      html += '<strong style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(r.title) + '</strong>';
      html += '</div>';
      html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);margin:0;">' + r.date + ' at ' + r.time + '</p>';
      if (r.type === "mystery" && r.sampleId) {
        html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);margin:0;">Sample: ' + r.sampleId + '</p>';
      }
      html += '</div>';
      html += '<div style="display:flex;gap:0.5rem;flex-shrink:0;">';
      html += '<button class="btn btn-secondary btn-log-view" data-log-id="' + r.id + '" style="font-size:0.85rem;padding:0.4rem 0.75rem;">View</button>';
      html += '<button class="btn btn-secondary btn-log-delete" data-log-id="' + r.id + '" style="font-size:0.85rem;padding:0.4rem 0.75rem;color:var(--color-error, #d32f2f);">Delete</button>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    }
  }

  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-log-back-from-list" style="padding:0.5rem 1.5rem;">← Back to Main Menu</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderLogDetail() {
  var record = expLogGetById(state.logDetailId);
  if (!record) {
    state.logScreen = "list";
    return renderLogList();
  }

  var html = '<div class="log-panel log-detail">';
  html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">';
  html += '<h3>' + escapeHtml(record.title) + '</h3>';
  html += '<button class="btn btn-secondary btn-log-delete" data-log-id="' + record.id + '" style="font-size:0.85rem;padding:0.4rem 0.75rem;color:var(--color-error, #d32f2f);">Delete</button>';
  html += '</div>';

  /* Metadata */
  html += '<div class="log-detail-meta">';
  var typeLabel = record.type === "mystery" ? "Mystery Lab Investigation" : (record.section === "major" ? "Major Practical" : "Minor Practical");
  html += '<p><strong>Type:</strong> ' + typeLabel + '</p>';
  html += '<p><strong>Date:</strong> ' + record.date + ' at ' + record.time + '</p>';
  if (record.slos && record.slos.length > 0) {
    html += '<p><strong>SLOs:</strong> ' + record.slos.join(", ") + '</p>';
  }
  html += '</div>';

  if (record.type === "mystery") {
    /* Mystery Lab detail */
    html += '<div class="log-detail-section">';
    if (record.sampleId) html += '<p><strong>Sample ID:</strong> ' + escapeHtml(record.sampleId) + '</p>';
    if (record.sampleIdentity) html += '<p><strong>Identity:</strong> ' + escapeHtml(record.sampleIdentity) + '</p>';
    if (record.testsPerformed && record.testsPerformed.length > 0) {
      html += '<p><strong>Tests Performed:</strong> ' + record.testsPerformed.length + '</p>';
    }
    if (record.hypothesis) html += '<p><strong>Hypothesis:</strong> ' + escapeHtml(record.hypothesis) + '</p>';
    html += '<p><strong>Identification Correct:</strong> ' + (record.identified ? 'Yes' : 'No') + '</p>';
    if (record.evidence && record.evidence.length > 0) {
      html += '<h4>Evidence</h4>';
      for (var i = 0; i < record.evidence.length; i++) {
        html += '<div class="log-evidence-entry"><p>' + escapeHtml(record.evidence[i]) + '</p></div>';
      }
    }
    if (record.conclusion) {
      html += '<h4>Conclusion</h4>';
      html += '<p>' + escapeHtml(record.conclusion) + '</p>';
    }
    html += '</div>';
  } else {
    /* Practical detail */
    if (record.objective) {
      html += '<div class="log-detail-section">';
      html += '<h4>Objective</h4>';
      html += '<p>' + escapeHtml(record.objective) + '</p>';
      html += '</div>';
    }
    if (record.apparatus && record.apparatus.length > 0) {
      html += '<div class="log-detail-section">';
      html += '<h4>Apparatus</h4>';
      html += '<ul>';
      for (var ai = 0; ai < record.apparatus.length; ai++) {
        var a = record.apparatus[ai];
        html += '<li>' + escapeHtml(a.name) + (a.desc ? ' — ' + escapeHtml(a.desc) : '') + '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }
    if (record.materials && record.materials.length > 0) {
      html += '<div class="log-detail-section">';
      html += '<h4>Materials</h4>';
      html += '<ul>';
      for (var mi = 0; mi < record.materials.length; mi++) {
        html += '<li>' + escapeHtml(record.materials[mi].name) + '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }
    if (record.procedure && record.procedure.length > 0) {
      html += '<div class="log-detail-section">';
      html += '<h4>Procedure</h4>';
      html += '<ol>';
      for (var pi = 0; pi < record.procedure.length; pi++) {
        html += '<li>' + escapeHtml(record.procedure[pi]) + '</li>';
      }
      html += '</ol>';
      html += '</div>';
    }
    if (record.observations) {
      html += '<div class="log-detail-section">';
      html += '<h4>Observations</h4>';
      html += '<p>' + escapeHtml(record.observations) + '</p>';
      html += '</div>';
    }
    if (record.measurements) {
      html += '<div class="log-detail-section">';
      html += '<h4>Measurements</h4>';
      html += '<p>' + escapeHtml(record.measurements) + '</p>';
      html += '</div>';
    }
    if (record.calculations) {
      html += '<div class="log-detail-section">';
      html += '<h4>Calculations</h4>';
      html += '<p>' + escapeHtml(record.calculations) + '</p>';
      html += '</div>';
    }
    if (record.result) {
      html += '<div class="log-detail-section">';
      html += '<h4>Result</h4>';
      html += '<p>' + escapeHtml(record.result) + '</p>';
      html += '</div>';
    }
    if (record.conclusion) {
      html += '<div class="log-detail-section">';
      html += '<h4>Conclusion</h4>';
      html += '<p>' + escapeHtml(record.conclusion) + '</p>';
      html += '</div>';
    }
  }

  /* Simulation notice */
  html += '<div class="log-sim-notice">';
  html += '<p>' + escapeHtml(record.simulatedNotice || "All measurements are simulated educational values.") + '</p>';
  html += '</div>';

  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-log-back-from-detail" style="padding:0.5rem 1.5rem;">← Back to Log</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

/* ---- M10: Stage Router ---- */

function renderLogStage() {
  var stageContent = document.getElementById("stage-content");
  var stageTitle = document.getElementById("stage-title");
  var stageProgress = document.getElementById("stage-progress");
  var simulationArea = document.getElementById("simulation-area");
  var userInputArea = document.getElementById("user-input-area");
  var feedbackArea = document.getElementById("feedback-area");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var sidebar = document.getElementById("sidebar");

  sidebar.style.display = "none";
  simulationArea.classList.add("hidden");
  userInputArea.innerHTML = "";
  feedbackArea.innerHTML = "";
  btnBack.style.display = "none";
  btnNext.style.display = "none";

  if (state.logScreen === "list") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderLogMenu();
    stageContent.onclick = onLogClick;
  } else if (state.logScreen === "detail") {
    stageTitle.textContent = "Experiment Log";
    stageProgress.innerHTML = '<span class="label">Record Detail</span>';
    stageContent.innerHTML = renderLogDetail();
    stageContent.onclick = onLogClick;
  }
}

/* ---- M10: Event Handler ---- */

function onLogClick(e) {
  var target = e.target;

  /* Main menu */
  if (target.id === "btn-log-open") {
    state.logScreen = "list";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-log-back-to-menu") {
    state.appMode = "pba";
    state.logScreen = "list";
    renderCurrentStage();
    return;
  }

  /* List navigation */
  if (target.id === "btn-log-back-from-list") {
    state.appMode = "pba";
    state.logScreen = "list";
    renderCurrentStage();
    return;
  }

  /* View record */
  if (target.classList.contains("btn-log-view")) {
    var viewId = target.getAttribute("data-log-id");
    state.logDetailId = viewId;
    state.logScreen = "detail";
    renderCurrentStage();
    return;
  }

  /* Delete record */
  if (target.classList.contains("btn-log-delete")) {
    var delId = target.getAttribute("data-log-id");
    expLogDelete(delId);
    if (state.logScreen === "detail") {
      state.logScreen = "list";
      state.logDetailId = null;
    }
    renderCurrentStage();
    return;
  }

  /* Clear all */
  if (target.id === "btn-log-clear-all") {
    if (confirm("Are you sure you want to delete ALL experiment log records? This cannot be undone.")) {
      expLogClearAll();
      renderCurrentStage();
    }
    return;
  }

  /* Back from detail */
  if (target.id === "btn-log-back-from-detail") {
    state.logScreen = "list";
    state.logDetailId = null;
    renderCurrentStage();
    return;
  }
}

/* ---- M10: Log Creation Hooks ---- */

function expLogCreateFromPractical() {
  var exp = state.experiment;
  if (!exp) return;
  var record = expLogBuildPracticalRecord(exp, state);
  expLogAdd(record);
}

/* ==============================================================
   SECTION 9D: LEARNING & REVISION HUB (M11)
   ============================================================== */

/* ---- M11: Helpers ---- */

function revGetFilteredPracticals() {
  var filter = state.revisionFilter;
  var search = (state.revisionSearch || "").toLowerCase();
  var results = [];
  for (var i = 0; i < EXPERIMENTS.length; i++) {
    var exp = EXPERIMENTS[i];
    if (filter === "major" && exp.section !== "major") continue;
    if (filter === "minor" && exp.section !== "minor") continue;
    if (search) {
      var haystack = (exp.title + " " + (exp.slos || []).join(" ") + " " + (exp.objective || "") + " " + (exp.section || "")).toLowerCase();
      if (haystack.indexOf(search) === -1) continue;
    }
    results.push(exp);
  }
  return results;
}

function revGetExpById(id) {
  for (var i = 0; i < EXPERIMENTS.length; i++) {
    if (EXPERIMENTS[i].id === id) return EXPERIMENTS[i];
  }
  return null;
}

/* ---- M11: Renderers ---- */

function renderRevisionMenu() {
  var count = EXPERIMENTS.length;
  var html = '<div style="text-align:center;padding:2rem;">';
  html += '<h2>Learning & Revision Hub</h2>';
  html += '<p class="subtitle">Review practical skills before attempting experiments.</p>';
  html += '<p style="max-width:450px;margin:1rem auto;color:var(--color-text-secondary);">Browse all ' + count + ' prescribed practicals (5 Major + 8 Minor). Review objectives, apparatus, procedures, and key concepts.</p>';
  html += '<div style="margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-rev-open" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:1rem;font-size:1.1rem;background:#00695c;">Open Revision Hub</button>';
  html += '<button class="btn btn-secondary" id="btn-rev-back-to-menu" style="display:block;width:100%;max-width:300px;margin:0.75rem auto;padding:0.75rem;">← Back to Main Menu</button>';
  html += '</div>';
  html += '<div class="sim-note" style="max-width:400px;margin:2rem auto;text-align:left;">';
  html += '<strong>About this hub:</strong><br>';
  html += 'A ChemSim educational feature for revision. Not an official FBISE assessment component.<br><br>';
  html += '<em>Simulation values are educationally simulated and are not real laboratory measurements.</em>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderRevisionList() {
  var practicals = revGetFilteredPracticals();
  var filter = state.revisionFilter;
  var majorCount = 0, minorCount = 0;
  for (var c = 0; c < EXPERIMENTS.length; c++) {
    if (EXPERIMENTS[c].section === "major") majorCount++;
    else minorCount++;
  }
  var html = '<div class="rev-panel">';
  html += '<div class="rev-search-bar">';
  html += '<label for="rev-search-input" style="font-size:0.85rem;display:block;margin-bottom:0.25rem;">Search practicals:</label>';
  html += '<input type="text" id="rev-search-input" class="rev-search-input" placeholder="Search by title, SLO, or keyword..." value="' + escapeHtml(state.revisionSearch || '') + '">';
  html += '</div>';
  html += '<div class="rev-filters">';
  html += '<button class="btn btn-tool rev-filter-btn' + (filter === "all" ? " active" : "") + '" data-rev-filter="all">All (' + EXPERIMENTS.length + ')</button>';
  html += '<button class="btn btn-tool rev-filter-btn' + (filter === "major" ? " active" : "") + '" data-rev-filter="major">Major (' + majorCount + ')</button>';
  html += '<button class="btn btn-tool rev-filter-btn' + (filter === "minor" ? " active" : "") + '" data-rev-filter="minor">Minor (' + minorCount + ')</button>';
  html += '</div>';
  if (practicals.length === 0) {
    html += '<div class="rev-empty"><p>No practicals match your search.</p></div>';
  } else {
    html += '<div class="rev-list">';
    for (var i = 0; i < practicals.length; i++) {
      var exp = practicals[i];
      var sLabel = exp.section === "major" ? "Major" : "Minor";
      var sColor = exp.section === "major" ? "var(--color-primary)" : "var(--color-accent, #ff9800)";
      html += '<div class="rev-card">';
      html += '<div style="display:flex;justify-content:space-between;align-items:start;gap:1rem;">';
      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">';
      html += '<span class="rev-badge" style="background:' + sColor + ';">' + sLabel + '</span>';
      html += '<strong style="font-size:0.95rem;">' + escapeHtml(exp.title) + '</strong>';
      html += '</div>';
      if (exp.slos && exp.slos.length > 0) {
        html += '<p style="font-size:0.8rem;color:var(--color-text-secondary);margin:0;">SLOs: ' + exp.slos.join(", ") + '</p>';
      }
      html += '</div>';
      html += '<button class="btn btn-secondary btn-rev-view" data-rev-id="' + exp.id + '" style="font-size:0.85rem;padding:0.4rem 0.75rem;flex-shrink:0;">Review</button>';
      html += '</div></div>';
    }
    html += '</div>';
  }
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-rev-back-from-list" style="padding:0.5rem 1.5rem;">← Back to Main Menu</button>';
  html += '</div></div>';
  return html;
}

function renderRevisionDetail() {
  var exp = revGetExpById(state.revisionSelectedId);
  if (!exp) { state.revisionScreen = "list"; return renderRevisionList(); }
  var html = '<div class="rev-panel rev-detail">';
  var sLabel = exp.section === "major" ? "Major Practical" : "Minor Practical";
  var sColor = exp.section === "major" ? "var(--color-primary)" : "var(--color-accent, #ff9800)";
  html += '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">';
  html += '<span class="rev-badge" style="background:' + sColor + ';">' + sLabel + '</span>';
  html += '<h3 style="margin:0;">' + escapeHtml(exp.title) + '</h3></div>';
  if (exp.slos && exp.slos.length > 0) {
    html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);margin:0 0 1rem 0;">SLOs: ' + exp.slos.join(", ") + '</p>';
  }
  if (exp.objective) { html += '<div class="rev-section"><h4>Objective</h4><p>' + escapeHtml(exp.objective) + '</p></div>'; }
  if (exp.apparatus && exp.apparatus.length > 0) {
    html += '<div class="rev-section"><h4>Key Apparatus</h4><ul>';
    for (var ai = 0; ai < exp.apparatus.length; ai++) {
      var a = exp.apparatus[ai];
      html += '<li><strong>' + escapeHtml(a.name) + '</strong>' + (a.desc ? ' — ' + escapeHtml(a.desc) : '') + '</li>';
    }
    html += '</ul></div>';
  }
  if (exp.materials && exp.materials.length > 0) {
    html += '<div class="rev-section"><h4>Materials</h4><ul>';
    for (var mi = 0; mi < exp.materials.length; mi++) { html += '<li>' + escapeHtml(exp.materials[mi].name) + '</li>'; }
    html += '</ul></div>';
  }
  if (exp.procedure && exp.procedure.length > 0) {
    html += '<div class="rev-section"><h4>Procedure</h4><ol>';
    for (var pi = 0; pi < exp.procedure.length; pi++) { html += '<li>' + escapeHtml(exp.procedure[pi]) + '</li>'; }
    html += '</ol></div>';
  }
  if (exp.observations) {
    html += '<div class="rev-section"><h4>Observations</h4>';
    if (exp.observations.note) html += '<p>' + escapeHtml(exp.observations.note) + '</p>';
    if (exp.observations.fields && exp.observations.fields.length > 0) {
      html += '<ul>';
      for (var oi = 0; oi < exp.observations.fields.length; oi++) { html += '<li>' + escapeHtml(exp.observations.fields[oi].label) + '</li>'; }
      html += '</ul>';
    }
    html += '</div>';
  }
  if (exp.calculations && exp.calculations.length > 0) {
    html += '<div class="rev-section"><h4>Calculations</h4>';
    for (var ci = 0; ci < exp.calculations.length; ci++) { html += '<p>' + escapeHtml(exp.calculations[ci]) + '</p>'; }
    html += '</div>';
  }
  if (exp.result) { html += '<div class="rev-section"><h4>Result</h4><p>' + escapeHtml(exp.result.note || "") + '</p></div>'; }
  if (exp.conclusion) { html += '<div class="rev-section"><h4>Conclusion</h4><p>' + escapeHtml(exp.conclusion.note || "") + '</p></div>'; }
  html += '<div class="rev-sim-notice"><p>SIMULATED EDUCATIONAL VALUE — NOT A REAL LABORATORY MEASUREMENT</p></div>';
  html += '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;margin-top:1.5rem;">';
  html += '<button class="btn btn-primary" id="btn-rev-start-practical" data-rev-start="' + exp.id + '" style="padding:0.75rem 2rem;background:#00695c;">Start Practical →</button>';
  html += '<button class="btn btn-secondary" id="btn-rev-back-from-detail" style="padding:0.75rem 2rem;">← Back to Revision</button>';
  html += '</div></div>';
  return html;
}

/* ---- M11: Stage Router ---- */

function renderRevisionStage() {
  var stageContent = document.getElementById("stage-content");
  var stageTitle = document.getElementById("stage-title");
  var stageProgress = document.getElementById("stage-progress");
  var simulationArea = document.getElementById("simulation-area");
  var userInputArea = document.getElementById("user-input-area");
  var feedbackArea = document.getElementById("feedback-area");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var sidebar = document.getElementById("sidebar");
  sidebar.style.display = "none";
  simulationArea.classList.add("hidden");
  userInputArea.innerHTML = "";
  feedbackArea.innerHTML = "";
  btnBack.style.display = "none";
  btnNext.style.display = "none";
  if (state.revisionScreen === "list") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderRevisionMenu();
    stageContent.onclick = onRevisionClick;
  } else if (state.revisionScreen === "browsing") {
    stageTitle.textContent = "Revision Hub";
    stageProgress.innerHTML = '<span class="label">' + revGetFilteredPracticals().length + ' practicals</span>';
    stageContent.innerHTML = renderRevisionList();
    stageContent.onclick = onRevisionClick;
    var searchEl = document.getElementById("rev-search-input");
    if (searchEl) {
      searchEl.addEventListener("input", function() {
        state.revisionSearch = searchEl.value;
        stageContent.innerHTML = renderRevisionList();
        stageContent.onclick = onRevisionClick;
        var newSearchEl = document.getElementById("rev-search-input");
        if (newSearchEl) {
          var val = newSearchEl.value;
          newSearchEl.focus();
          newSearchEl.setSelectionRange(val.length, val.length);
        }
      });
    }
  } else if (state.revisionScreen === "detail") {
    stageTitle.textContent = "Revision Hub";
    stageProgress.innerHTML = '<span class="label">Practical Detail</span>';
    stageContent.innerHTML = renderRevisionDetail();
    stageContent.onclick = onRevisionClick;
  }
}

/* ---- M11: Event Handler ---- */

function onRevisionClick(e) {
  var target = e.target;
  if (target.id === "btn-rev-open") {
    state.revisionScreen = "browsing";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-rev-back-to-menu") {
    state.appMode = "pba";
    state.revisionScreen = "list";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-rev-back-from-list") {
    state.appMode = "pba";
    state.revisionScreen = "list";
    renderCurrentStage();
    return;
  }
  if (target.classList.contains("rev-filter-btn") && target.getAttribute("data-rev-filter")) {
    state.revisionFilter = target.getAttribute("data-rev-filter");
    stageContent = document.getElementById("stage-content");
    stageContent.innerHTML = renderRevisionList();
    stageContent.onclick = onRevisionClick;
    var sEl = document.getElementById("rev-search-input");
    if (sEl) {
      sEl.addEventListener("input", function() {
        state.revisionSearch = sEl.value;
        stageContent.innerHTML = renderRevisionList();
        stageContent.onclick = onRevisionClick;
        var nEl = document.getElementById("rev-search-input");
        if (nEl) { var v = nEl.value; nEl.focus(); nEl.setSelectionRange(v.length, v.length); }
      });
    }
    return;
  }
  if (target.classList.contains("btn-rev-view") && target.getAttribute("data-rev-id")) {
    state.revisionSelectedId = target.getAttribute("data-rev-id");
    state.revisionScreen = "detail";
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-rev-back-from-detail") {
    state.revisionScreen = "browsing";
    state.revisionSelectedId = null;
    renderCurrentStage();
    return;
  }
  if (target.id === "btn-rev-start-practical" || (target.classList.contains("btn-rev-start-practical") && target.getAttribute("data-rev-start"))) {
    var startId = target.getAttribute("data-rev-start");
    if (startId) {
      var expObj = revGetExpById(startId);
      if (expObj) {
        state.appMode = "lab";
        state.revisionScreen = "list";
        state.selectedExperimentId = startId;
        state.experiment = expObj;
        state.currentStage = "objective";
        resetExperimentState();
        renderCurrentStage();
        renderSidebar();
      }
    }
    return;
  }
}



function expLogCreateFromMystery() {
  var s = state.mysterySession;
  if (!s) return;
  var record = expLogBuildMysteryRecord(s);
  expLogAdd(record);
}

/* ==============================================================
   SECTION 9E: DEMO MODE (M13)
   ============================================================== */

/* ---- M13: Demo Flow Definition ---- */

var DEMO_STEPS = [
  { id: "practical", label: "Practical Lab", instruction: "Demonstrate the experiment workflow. Complete the paper chromatography practical to see how ChemSim guides students through apparatus, setup, observation, and conclusion." },
  { id: "log", label: "Experiment Log", instruction: "Show how the completed practical is automatically recorded in the browser's local storage." },
  { id: "revision", label: "Learning & Revision", instruction: "Show how students can browse and review all 13 prescribed practicals with search and filtering." },
  { id: "mystery", label: "Mystery Lab", instruction: "Demonstrate the investigation interface: choose tests, collect evidence, form a hypothesis, and identify the unknown sample." },
  { id: "pba", label: "PBA Practice", instruction: "Demonstrate the practical-skills assessment workflow with timed questions and scoring." }
];

/* ---- M13: Renderers ---- */

function renderDemoStage() {
  var stageContent = document.getElementById("stage-content");
  var stageTitle = document.getElementById("stage-title");
  var stageProgress = document.getElementById("stage-progress");
  var simulationArea = document.getElementById("simulation-area");
  var userInputArea = document.getElementById("user-input-area");
  var feedbackArea = document.getElementById("feedback-area");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var sidebar = document.getElementById("sidebar");

  sidebar.style.display = "none";
  simulationArea.classList.add("hidden");
  userInputArea.innerHTML = "";
  feedbackArea.innerHTML = "";
  btnBack.style.display = "none";
  btnNext.style.display = "none";

  if (state.demoScreen === "intro") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderDemoIntro();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "practical") {
    stageTitle.textContent = "Demo: Practical Lab";
    stageProgress.innerHTML = renderDemoProgress(0);
    stageContent.innerHTML = renderDemoStepPractical();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "log") {
    stageTitle.textContent = "Demo: Experiment Log";
    stageProgress.innerHTML = renderDemoProgress(1);
    stageContent.innerHTML = renderDemoStepLog();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "revision") {
    stageTitle.textContent = "Demo: Learning & Revision";
    stageProgress.innerHTML = renderDemoProgress(2);
    stageContent.innerHTML = renderDemoStepRevision();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "mystery") {
    stageTitle.textContent = "Demo: Mystery Lab";
    stageProgress.innerHTML = renderDemoProgress(3);
    stageContent.innerHTML = renderDemoStepMystery();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "pba") {
    stageTitle.textContent = "Demo: PBA Practice";
    stageProgress.innerHTML = renderDemoProgress(4);
    stageContent.innerHTML = renderDemoStepPBA();
    stageContent.onclick = onDemoClick;
  } else if (state.demoScreen === "complete") {
    stageTitle.textContent = "";
    stageProgress.innerHTML = "";
    stageContent.innerHTML = renderDemoComplete();
    stageContent.onclick = onDemoClick;
  }
}

function renderDemoIntro() {
  var html = '<div style="text-align:center;padding:2rem;max-width:500px;margin:0 auto;">';
  html += '<h2 style="margin-bottom:0.5rem;">ChemSim Demonstration Mode</h2>';
  html += '<p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">A guided tour of ChemSim\'s interactive virtual chemistry laboratory.</p>';
  html += '<div style="background:var(--color-bg);border-radius:var(--radius);padding:1rem;margin-bottom:1.5rem;text-align:left;">';
  html += '<p style="font-size:0.9rem;margin-bottom:0.75rem;">This demonstration walks through ChemSim\'s key features:</p>';
  html += '<ol style="font-size:0.9rem;padding-left:1.25rem;">';
  for (var i = 0; i < DEMO_STEPS.length; i++) {
    html += '<li style="margin-bottom:0.35rem;"><strong>' + DEMO_STEPS[i].label + '</strong></li>';
  }
  html += '</ol>';
  html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);margin-top:0.75rem;">The demonstration uses existing educational simulations. You may interact with each module normally.</p>';
  html += '</div>';
  html += '<button class="btn btn-primary" id="btn-demo-start" style="padding:0.75rem 2rem;font-size:1rem;background:#e65100;">Start Demo</button>';
  html += '<br>';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="margin-top:0.75rem;">Exit Demo</button>';
  html += '</div>';
  return html;
}

function renderDemoProgress(stepIndex) {
  var html = '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;margin-bottom:0.5rem;">';
  for (var i = 0; i < DEMO_STEPS.length; i++) {
    var cls = "progress-dot";
    if (i < stepIndex) cls += " completed";
    else if (i === stepIndex) cls += " active";
    html += '<span class="' + cls + '" title="' + DEMO_STEPS[i].label + '"></span>';
  }
  html += '<span class="label" style="margin-left:0.5rem;">Step ' + (stepIndex + 1) + ' of ' + DEMO_STEPS.length + ': ' + DEMO_STEPS[stepIndex].label + '</span>';
  html += '</div>';
  return html;
}

function renderDemoStepPractical() {
  var html = '<div class="demo-panel">';
  html += '<div class="demo-instruction">';
  html += '<strong>Presenter:</strong> ' + DEMO_STEPS[0].instruction;
  html += '</div>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<h3>Paper Chromatography (A2)</h3>';
  html += '<p style="color:var(--color-text-secondary);margin:0.5rem 0 1rem 0;">Separate a mixture of inks by paper chromatography</p>';
  if (state.demoPracticalFinished) {
    html += '<div class="feedback-correct" style="max-width:400px;margin:0 auto 1rem auto;">Practical completed! The record has been saved to the Experiment Log.</div>';
    html += '<button class="btn btn-primary" id="btn-demo-next-step" style="padding:0.75rem 2rem;background:#e65100;">Continue Demo →</button>';
  } else {
    html += '<button class="btn btn-primary" id="btn-demo-launch-practical" style="padding:0.75rem 2rem;">Launch Practical →</button>';
  }
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="font-size:0.85rem;">Exit Demo</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDemoStepLog() {
  var records = expLogLoad();
  var html = '<div class="demo-panel">';
  html += '<div class="demo-instruction">';
  html += '<strong>Presenter:</strong> ' + DEMO_STEPS[1].instruction;
  html += '</div>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<h3>Experiment Log</h3>';
  if (records.length > 0) {
    html += '<p style="color:var(--color-text-secondary);margin:0.5rem 0;">' + records.length + ' record(s) saved locally in this browser.</p>';
    html += '<div style="text-align:left;max-width:400px;margin:1rem auto;">';
    for (var i = 0; i < Math.min(records.length, 3); i++) {
      var r = records[i];
      html += '<div class="log-card" style="margin-bottom:0.5rem;">';
      html += '<strong>' + escapeHtml(r.title) + '</strong><br>';
      html += '<small style="color:var(--color-text-secondary);">' + escapeHtml(r.date) + ' ' + escapeHtml(r.time) + '</small>';
      html += '</div>';
    }
    if (records.length > 3) html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);">...and ' + (records.length - 3) + ' more</p>';
    html += '</div>';
  } else {
    html += '<p style="color:var(--color-text-secondary);">No records yet. Complete a practical to see it logged here.</p>';
  }
  html += '<button class="btn btn-primary" id="btn-demo-next-step" style="padding:0.75rem 2rem;margin-top:1rem;background:#e65100;">Continue Demo →</button>';
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="font-size:0.85rem;">Exit Demo</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDemoStepRevision() {
  var html = '<div class="demo-panel">';
  html += '<div class="demo-instruction">';
  html += '<strong>Presenter:</strong> ' + DEMO_STEPS[2].instruction;
  html += '</div>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<h3>Learning & Revision Hub</h3>';
  html += '<p style="color:var(--color-text-secondary);margin:0.5rem 0 1rem 0;">Browse all 13 prescribed practicals (5 Major + 8 Minor)</p>';
  html += '<div style="text-align:left;max-width:400px;margin:0 auto;background:var(--color-bg);border-radius:var(--radius);padding:1rem;">';
  html += '<p style="font-size:0.85rem;margin-bottom:0.5rem;"><strong>Features:</strong></p>';
  html += '<ul style="font-size:0.85rem;padding-left:1.25rem;">';
  html += '<li>Search by title, SLO, or keyword</li>';
  html += '<li>Filter by Major / Minor</li>';
  html += '<li>View full practical details</li>';
  html += '<li>Launch any practical directly</li>';
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-primary" id="btn-demo-open-revision" style="padding:0.75rem 2rem;margin-top:1rem;">Open Revision Hub →</button>';
  html += '<br>';
  html += '<button class="btn btn-primary" id="btn-demo-next-step" style="padding:0.75rem 2rem;margin-top:0.75rem;background:#e65100;">Continue Demo →</button>';
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="font-size:0.85rem;">Exit Demo</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDemoStepMystery() {
  var html = '<div class="demo-panel">';
  html += '<div class="demo-instruction">';
  html += '<strong>Presenter:</strong> ' + DEMO_STEPS[3].instruction;
  html += '</div>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<h3>Mystery Lab</h3>';
  html += '<p style="color:var(--color-text-secondary);margin:0.5rem 0 1rem 0;">Investigate an unknown sample using virtual tests</p>';
  html += '<div style="text-align:left;max-width:400px;margin:0 auto;background:var(--color-bg);border-radius:var(--radius);padding:1rem;">';
  html += '<p style="font-size:0.85rem;margin-bottom:0.5rem;"><strong>Investigation process:</strong></p>';
  html += '<ul style="font-size:0.85rem;padding-left:1.25rem;">';
  html += '<li>Choose from 5 virtual tests</li>';
  html += '<li>Record observations and evidence</li>';
  html += '<li>Form a hypothesis</li>';
  html += '<li>Identify the unknown sample</li>';
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-primary" id="btn-demo-open-mystery" style="padding:0.75rem 2rem;margin-top:1rem;background:#6a1b9a;">Open Mystery Lab →</button>';
  html += '<br>';
  html += '<button class="btn btn-primary" id="btn-demo-next-step" style="padding:0.75rem 2rem;margin-top:0.75rem;background:#e65100;">Continue Demo →</button>';
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="font-size:0.85rem;">Exit Demo</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDemoStepPBA() {
  var html = '<div class="demo-panel">';
  html += '<div class="demo-instruction">';
  html += '<strong>Presenter:</strong> ' + DEMO_STEPS[4].instruction;
  html += '</div>';
  html += '<div style="text-align:center;margin:1.5rem 0;">';
  html += '<h3>PBA Practice</h3>';
  html += '<p style="color:var(--color-text-secondary);margin:0.5rem 0 1rem 0;">Practical-skills assessment workflow</p>';
  html += '<div style="text-align:left;max-width:400px;margin:0 auto;background:var(--color-bg);border-radius:var(--radius);padding:1rem;">';
  html += '<p style="font-size:0.85rem;margin-bottom:0.5rem;"><strong>PBA features:</strong></p>';
  html += '<ul style="font-size:0.85rem;padding-left:1.25rem;">';
  html += '<li>20-mark timed assessment</li>';
  html += '<li>Major and Minor question sections</li>';
  html += '<li>Multiple question types</li>';
  html += '<li>Instant scoring and review</li>';
  html += '</ul>';
  html += '</div>';
  html += '<button class="btn btn-accent" id="btn-demo-open-pba" style="padding:0.75rem 2rem;margin-top:1rem;">Open PBA Practice →</button>';
  html += '<br>';
  html += '<button class="btn btn-primary" id="btn-demo-next-step" style="padding:0.75rem 2rem;margin-top:0.75rem;background:#e65100;">Continue Demo →</button>';
  html += '</div>';
  html += '<div style="text-align:center;margin-top:1rem;">';
  html += '<button class="btn btn-secondary" id="btn-demo-exit" style="font-size:0.85rem;">Exit Demo</button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function renderDemoComplete() {
  var html = '<div style="text-align:center;padding:2rem;max-width:500px;margin:0 auto;">';
  html += '<h2 style="margin-bottom:0.5rem;">Demonstration Complete</h2>';
  html += '<p style="color:var(--color-text-secondary);margin-bottom:1.5rem;">You have explored ChemSim\'s key features:</p>';
  html += '<div style="text-align:left;max-width:350px;margin:0 auto 1.5rem 0;background:var(--color-bg);border-radius:var(--radius);padding:1rem;">';
  html += '<ul style="font-size:0.9rem;padding-left:1.25rem;">';
  html += '<li><strong>Practical Lab</strong> — Interactive experiments with simulation</li>';
  html += '<li><strong>PBA Practice</strong> — Timed assessment workflow</li>';
  html += '<li><strong>Mystery Lab</strong> — Unknown sample investigation</li>';
  html += '<li><strong>Experiment Log</strong> — Local record keeping</li>';
  html += '<li><strong>Learning & Revision</strong> — Practical reference hub</li>';
  html += '</ul>';
  html += '</div>';
  html += '<p style="font-size:0.85rem;color:var(--color-text-secondary);margin-bottom:1.5rem;">ChemSim is an educational simulation for FBISE SSC Chemistry Practical Based Assessment preparation.</p>';
  html += '<button class="btn btn-primary" id="btn-demo-restart" style="padding:0.75rem 2rem;margin-right:0.5rem;">Restart Demo</button>';
  html += '<button class="btn btn-secondary" id="btn-demo-exit-complete" style="padding:0.75rem 2rem;">Return to Main Menu</button>';
  html += '</div>';
  return html;
}

/* ---- M13: Event Handler ---- */

function onDemoClick(e) {
  var target = e.target;

  if (target.id === "btn-demo-start") {
    state.demoScreen = "practical";
    state.demoStep = 0;
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-exit" || target.id === "btn-demo-exit-complete") {
    state.appMode = "pba";
    state.pbaScreen = "menu";
    state.demoActive = false;
    state.demoScreen = "intro";
    state.demoStep = 0;
    state.demoPracticalFinished = false;
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-launch-practical") {
    state.appMode = "lab";
    state.currentStage = "select";
    state.demoActive = true;
    renderCurrentStage();
    renderSidebar();
    return;
  }

  if (target.id === "btn-demo-next-step") {
    state.demoStep++;
    if (state.demoStep >= DEMO_STEPS.length) {
      state.demoScreen = "complete";
    } else {
      state.demoScreen = DEMO_STEPS[state.demoStep].id;
    }
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-open-revision") {
    state.appMode = "revision";
    state.revisionScreen = "list";
    state.revisionFilter = "all";
    state.revisionSearch = "";
    state.revisionSelectedId = null;
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-open-mystery") {
    state.appMode = "mystery";
    state.mysteryScreen = "menu";
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-open-pba") {
    state.appMode = "pba";
    state.pbaScreen = "mode_select";
    renderCurrentStage();
    return;
  }

  if (target.id === "btn-demo-restart") {
    state.demoScreen = "intro";
    state.demoStep = 0;
    state.demoPracticalFinished = false;
    renderCurrentStage();
    return;
  }
}

/* ---- M13: Demo Finish Detection ---- */

function demoCheckPracticalFinish() {
  if (state.demoActive && state.demoScreen === "practical" && state.currentStage === "select" && !state.experiment) {
    if (!state.demoPracticalFinished) {
      state.demoPracticalFinished = true;
      renderCurrentStage();
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
  dom.stageContent.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      var card = e.target.closest ? e.target.closest(".home-card") : null;
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });
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

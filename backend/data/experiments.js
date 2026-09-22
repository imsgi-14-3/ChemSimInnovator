/* ================================================================
   ChemSim — experiments.js
   Extracted experiment data from script.js
   ================================================================ */

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

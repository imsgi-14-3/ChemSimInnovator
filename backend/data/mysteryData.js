/* ================================================================
   ChemSim — Mystery Lab Data
   Unknown sample identification challenges

   Challenge settings (simulated assessment parameters, not FBISE
   requirements):
     maxTests  — test budget: how many distinct tests may be run
     timeLimit — case time limit in seconds (time bonus if finished early)
     hintCost  — marks deducted per hint revealed
     candidates— suspect list: one correct identity + look-alike decoys
     keywords  — per-test key ideas graded in the student's interpretation
   ================================================================ */

var MYSTERY_SAMPLES = [
  {
    id: "M1",
    title: "Unknown White Powder",
    description: "A white crystalline powder was found in the laboratory. Identify the substance using chemical tests.",
    difficulty: "Easy",
    marks: 10,
    maxTests: 3,
    timeLimit: 300,
    hintCost: 1,
    identity: "Sodium Chloride (NaCl)",
    candidates: [
      { id: "c1", label: "Sodium Chloride (NaCl)", correct: true },
      { id: "c2", label: "Potassium Chloride (KCl)" },
      { id: "c3", label: "Sodium Nitrate (NaNO₃)" }
    ],
    tests: [
      {
        id: "flame",
        name: "Flame Test",
        icon: "🔥",
        description: "Hold a sample on a platinum wire in the Bunsen burner flame.",
        observation: "Intense yellow flame colour observed.",
        interpretation: "Yellow flame confirms the presence of Na⁺ ions.",
        keywords: ["yellow", "sodium"],
        hint: "Different metal ions produce characteristic flame colours."
      },
      {
        id: "dissolve",
        name: "Solubility Test",
        icon: "💧",
        description: "Add a small amount of the powder to distilled water and stir.",
        observation: "The powder dissolves completely in water to form a colourless solution.",
        interpretation: "The substance is soluble in water, suggesting an ionic compound.",
        keywords: ["soluble", "dissolves", "ionic"],
        hint: "Soluble ionic compounds dissolve to form colourless solutions."
      },
      {
        id: "silver_nitrate",
        name: "Silver Nitrate Test",
        icon: "🧪",
        description: "Add a few drops of silver nitrate (AgNO₃) solution to the dissolved sample.",
        observation: "A white curdy precipitate forms which is soluble in ammonium hydroxide.",
        interpretation: "White precipitate with AgNO₃ confirms the presence of Cl⁻ ions.",
        keywords: ["chloride", "agcl", "precipitate", "cl⁻"],
        hint: "Cl⁻ ions react with Ag⁺ to form insoluble AgCl (white precipitate)."
      },
      {
        id: "litmus",
        name: "Litmus Test",
        icon: "📄",
        description: "Test the solution with red and blue litmus paper.",
        observation: "Both red and blue litmus paper show no colour change.",
        interpretation: "The solution is neutral, consistent with NaCl (salt of strong acid + strong base).",
        keywords: ["neutral", "no change", "strong acid"],
        hint: "NaCl is a neutral salt — it doesn't affect litmus."
      }
    ],
    correctTests: ["flame", "silver_nitrate"],
    conclusion: "Based on the yellow flame (Na⁺) and white precipitate with AgNO₃ (Cl⁻), the unknown is Sodium Chloride (NaCl)."
  },

  {
    id: "M2",
    title: "Unknown Gas",
    description: "A colourless gas with a pungent smell was collected in a gas jar. Identify the gas.",
    difficulty: "Easy",
    marks: 10,
    maxTests: 3,
    timeLimit: 300,
    hintCost: 1,
    identity: "Ammonia (NH₃)",
    candidates: [
      { id: "c1", label: "Ammonia (NH₃)", correct: true },
      { id: "c2", label: "Hydrogen Chloride (HCl)" },
      { id: "c3", label: "Carbon Dioxide (CO₂)" }
    ],
    tests: [
      {
        id: "litmus_red",
        name: "Damp Red Litmus Test",
        icon: "📄",
        description: "Hold damp red litmus paper near the gas jar opening.",
        observation: "Damp red litmus paper turns blue.",
        interpretation: "The gas is alkaline (basic). NH₃ dissolves in water to form NH₄OH which is basic.",
        keywords: ["blue", "basic", "alkaline"],
        hint: "Basic gases turn red litmus blue."
      },
      {
        id: "litmus_blue",
        name: "Damp Blue Litmus Test",
        icon: "📄",
        description: "Hold damp blue litmus paper near the gas jar opening.",
        observation: "Damp blue litmus paper remains blue (no change).",
        interpretation: "Confirms the gas is not acidic. Combined with red litmus turning blue, it is basic.",
        keywords: ["no change", "basic", "not acidic"],
        hint: "If a gas is basic, blue litmus won't change."
      },
      {
        id: "smell",
        name: "Odour Test",
        icon: "👃",
        description: "Waft the gas towards your nose gently (do not inhale directly).",
        observation: "A strong, pungent, choking smell is detected.",
        interpretation: "The characteristic pungent smell is typical of ammonia gas.",
        keywords: ["pungent", "choking", "ammonia"],
        hint: "NH₃ has a very distinctive sharp smell."
      },
      {
        id: "hcl",
        name: "Concentrated HCl Test",
        icon: "🧪",
        description: "Hold a glass rod dipped in concentrated HCl near the gas jar.",
        observation: "Dense white fumes are produced.",
        interpretation: "NH₃(g) + HCl(g) → NH₄Cl(s) — white fumes of ammonium chloride confirm NH₃.",
        keywords: ["ammonium chloride", "white fumes", "nh4cl"],
        hint: "NH₃ reacts with HCl vapour to form white solid particles."
      }
    ],
    correctTests: ["litmus_red", "hcl"],
    conclusion: "The gas turns damp red litmus blue (basic) and produces white fumes with concentrated HCl. The gas is Ammonia (NH₃)."
  },

  {
    id: "M3",
    title: "Unknown Metal Ion Solution",
    description: "A blue-coloured solution was found on a shelf. Identify the metal ion present.",
    difficulty: "Medium",
    marks: 10,
    maxTests: 3,
    timeLimit: 240,
    hintCost: 1,
    identity: "Copper(II) Sulphate (CuSO₄)",
    candidates: [
      { id: "c1", label: "Copper(II) Sulphate (CuSO₄)", correct: true },
      { id: "c2", label: "Iron(II) Sulphate (FeSO₄)" },
      { id: "c3", label: "Zinc Sulphate (ZnSO₄)" }
    ],
    tests: [
      {
        id: "appearance",
        name: "Visual Inspection",
        icon: "👁",
        description: "Observe the colour of the solution.",
        observation: "The solution has a distinctive blue colour.",
        interpretation: "Blue colour in aqueous solutions often indicates Cu²⁺ ions.",
        keywords: ["blue", "copper", "cu²⁺"],
        hint: "Cu²⁺ ions are blue in solution."
      },
      {
        id: "flame",
        name: "Flame Test",
        icon: "🔥",
        description: "Dip a clean platinum wire in the solution and hold in the Bunsen burner flame.",
        observation: "Blue-green (emerald green) flame colour observed.",
        interpretation: "Blue-green flame confirms the presence of Cu²⁺ ions.",
        keywords: ["blue-green", "blue green", "copper"],
        hint: "Copper produces a characteristic blue-green flame."
      },
      {
        id: "naoh",
        name: "Sodium Hydroxide Test",
        icon: "🧪",
        description: "Add dilute NaOH solution to the sample.",
        observation: "A pale blue precipitate forms which is insoluble in excess NaOH.",
        interpretation: "Cu²⁺ + 2OH⁻ → Cu(OH)₂ — pale blue precipitate confirms copper ions.",
        keywords: ["pale blue", "hydroxide", "precipitate"],
        hint: "Cu(OH)₂ is a pale blue precipitate."
      },
      {
        id: "nh3",
        name: "Ammonia Test",
        icon: "🧪",
        description: "Add dilute ammonia solution to the sample, then excess ammonia.",
        observation: "First a pale blue precipitate forms, then dissolves in excess ammonia to give a deep blue solution.",
        interpretation: "Cu²⁺ forms [Cu(NH₃)₄]²⁺ complex — deep blue colour confirms copper.",
        keywords: ["deep blue", "complex", "excess"],
        hint: "Copper forms a deep blue tetrammine complex with excess NH₃."
      }
    ],
    correctTests: ["flame", "naoh"],
    conclusion: "Blue solution + blue-green flame + pale blue precipitate with NaOH → the solution contains Copper(II) Sulphate (CuSO₄)."
  },

  {
    id: "M4",
    title: "Unknown Colourless Gas",
    description: "A colourless, odourless gas was collected. It turned limewater milky. Identify the gas.",
    difficulty: "Easy",
    marks: 10,
    maxTests: 3,
    timeLimit: 300,
    hintCost: 1,
    identity: "Carbon Dioxide (CO₂)",
    candidates: [
      { id: "c1", label: "Carbon Dioxide (CO₂)", correct: true },
      { id: "c2", label: "Carbon Monoxide (CO)" },
      { id: "c3", label: "Nitrogen (N₂)" }
    ],
    tests: [
      {
        id: "limewater",
        name: "Limewater Test",
        icon: "🧪",
        description: "Bubble the gas through clear limewater (calcium hydroxide solution).",
        observation: "The limewater turns milky (cloudy white precipitate forms).",
        interpretation: "CO₂ + Ca(OH)₂ → CaCO₃(s) + H₂O — white precipitate of calcium carbonate confirms CO₂.",
        keywords: ["milky", "caco₃", "calcium carbonate"],
        hint: "CO₂ is the only common gas that turns limewater milky."
      },
      {
        id: "burning_splint",
        name: "Burning Splint Test",
        icon: "🔥",
        description: "Insert a burning splint into the gas jar.",
        observation: "The burning splint is extinguished.",
        interpretation: "CO₂ does not support combustion — it extinguishes flames.",
        keywords: ["extinguish", "combustion", "support"],
        hint: "CO₂ is used in fire extinguishers because it doesn't support burning."
      },
      {
        id: "smell",
        name: "Odour Test",
        icon: "👃",
        description: "Waft the gas gently towards your nose.",
        observation: "The gas is odourless and colourless.",
        interpretation: "CO₂ is a colourless, odourless gas — consistent with the observation.",
        keywords: ["odourless", "colorless", "colourless"],
        hint: "Many common gases are odourless. This helps narrow down possibilities."
      },
      {
        id: "litmus",
        name: "Litmus Test",
        icon: "📄",
        description: "Dissolve the gas in water and test with litmus paper.",
        observation: "Red litmus stays red, blue litmus turns red.",
        interpretation: "CO₂ + H₂O → H₂CO₃ (carbonic acid) — slightly acidic solution.",
        keywords: ["acidic", "carbonic", "weak"],
        hint: "CO₂ dissolves in water to form a weak acid."
      }
    ],
    correctTests: ["limewater"],
    conclusion: "The gas turns limewater milky (CaCO₃ precipitate) and is odourless. The gas is Carbon Dioxide (CO₂)."
  },

  {
    id: "M5",
    title: "Unknown Solid — Heating Test",
    description: "A white solid was heated in an evaporating dish. A white sublimate collected on an inverted funnel. Identify the solid.",
    difficulty: "Medium",
    marks: 10,
    maxTests: 3,
    timeLimit: 240,
    hintCost: 1,
    identity: "Naphthalene (in a mixture with sand)",
    candidates: [
      { id: "c1", label: "Naphthalene", correct: true },
      { id: "c2", label: "Iodine" },
      { id: "c3", label: "Ammonium Chloride (NH₄Cl)" }
    ],
    tests: [
      {
        id: "sublimation",
        name: "Sublimation Test",
        icon: "🔥",
        description: "Heat the mixture gently in an evaporating dish covered with an inverted funnel lined with filter paper.",
        observation: "White crystalline solid sublimes and deposits on the funnel. A gritty residue remains in the dish.",
        interpretation: "Naphthalene sublimes (solid → vapour → solid). Sand does not sublime and remains as residue.",
        keywords: ["sublime", "sublimation", "funnel", "vapour"],
        hint: "Sublimation is the direct transition from solid to vapour without passing through the liquid state."
      },
      {
        id: "residue_test",
        name: "Residue Examination",
        icon: "👁",
        description: "Examine the residue left in the evaporating dish after heating.",
        observation: "A gritty, greyish-brown solid remains in the dish.",
        interpretation: "The residue is sand (SiO₂) which does not sublime and has a gritty texture.",
        keywords: ["sand", "gritty", "residue", "sio₂"],
        hint: "Sand is insoluble and does not sublime."
      },
      {
        id: "smell",
        name: "Odour of Sublimate",
        icon: "👃",
        description: "Carefully smell the white sublimate collected on the funnel.",
        observation: "The sublimate has a characteristic mothball-like smell.",
        interpretation: "Naphthalene has a distinctive mothball odour, confirming its identity.",
        keywords: ["mothball", "naphthalene", "moth"],
        hint: "Naphthalene is commonly used in mothballs."
      },
      {
        id: "solubility",
        name: "Solubility of Sublimate",
        icon: "💧",
        description: "Scrape some sublimate and test its solubility in water.",
        observation: "The white sublimate is insoluble in water.",
        interpretation: "Naphthalene is a non-polar organic compound and does not dissolve in water.",
        keywords: ["insoluble", "organic", "non-polar"],
        hint: "Organic compounds like naphthalene are often insoluble in water."
      }
    ],
    correctTests: ["sublimation", "smell"],
    conclusion: "A white solid sublimes with a mothball smell, and gritty sand remains. The solid is Naphthalene (mixed with sand)."
  },

  {
    id: "M6",
    title: "Unknown Salt Solution",
    description: "A green-coloured solution was found. A zinc granule was added and a brown deposit formed. Identify the salt.",
    difficulty: "Medium",
    marks: 10,
    maxTests: 3,
    timeLimit: 240,
    hintCost: 1,
    identity: "Copper(II) Sulphate (CuSO₄) — Displacement",
    candidates: [
      { id: "c1", label: "Copper(II) Sulphate (CuSO₄)", correct: true },
      { id: "c2", label: "Iron(II) Sulphate (FeSO₄)" },
      { id: "c3", label: "Aluminium Sulphate (Al₂(SO₄)₃)" }
    ],
    tests: [
      {
        id: "appearance",
        name: "Visual Inspection",
        icon: "👁",
        description: "Observe the colour of the solution.",
        observation: "The solution has a blue-green colour.",
        interpretation: "Blue-green colour suggests Cu²⁺ ions in solution.",
        keywords: ["blue-green", "blue green", "copper", "cu²⁺"],
        hint: "Cu²⁺ solutions are typically blue."
      },
      {
        id: "displacement",
        name: "Zinc Displacement Test",
        icon: "🧪",
        description: "Add a zinc granule to the solution and observe for 5 minutes.",
        observation: "The zinc granule becomes coated with a brown/reddish deposit. The blue colour fades.",
        interpretation: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s) — zinc displaces copper from solution.",
        keywords: ["zinc", "displace", "copper", "depos"],
        hint: "Zinc is more reactive than copper and will displace it."
      },
      {
        id: "naoh",
        name: "NaOH Test",
        icon: "🧪",
        description: "Add dilute NaOH solution to the original solution.",
        observation: "A pale blue precipitate forms.",
        interpretation: "Cu²⁺ + 2OH⁻ → Cu(OH)₂ — pale blue precipitate confirms copper ions.",
        keywords: ["pale blue", "hydroxide", "precipitate"],
        hint: "Cu(OH)₂ is insoluble and pale blue."
      },
      {
        id: "flame",
        name: "Flame Test",
        icon: "🔥",
        description: "Perform a flame test on the solution.",
        observation: "Blue-green flame colour observed.",
        interpretation: "Blue-green flame is characteristic of copper ions.",
        keywords: ["blue-green", "blue green", "copper"],
        hint: "Copper gives a distinctive blue-green flame."
      }
    ],
    correctTests: ["displacement", "flame"],
    conclusion: "Blue solution + brown deposit with zinc (displacement) + blue-green flame → Copper(II) Sulphate (CuSO₄)."
  }
];

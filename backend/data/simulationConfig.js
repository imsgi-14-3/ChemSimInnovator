/* ================================================================
   ChemSim — simulationConfig.js
   Extracted simulation configuration from script.js
   ================================================================ */

var SIMULATION_CONFIG = {
  "A2": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    paper: {
      width: 80,
      height: 300,
      baselineY: 380,
      topY: 80
    },
    beaker: { cx: 290, cy: 340, w: 190, h: 280, solventLevel: 0.22, rimY: 80 },
    stick: { x: 175, y: 72, w: 230, h: 8 },
    clip: { cx: 290, cy: 72, w: 24, h: 30 },
    solventBeaker: { cx: 455, cy: 400, w: 80, h: 110, solventLevel: 0.5 },
    inkBottles: [
      { cx: 75, cy: 420, w: 40, h: 80, label: 'Black Ink', liquidColor: '#1a1a1a', capColor: '#222' },
      { cx: 135, cy: 420, w: 40, h: 80, label: 'Blue Ink', liquidColor: '#0044cc', capColor: '#222' },
      { cx: 195, cy: 420, w: 40, h: 80, label: 'Red Ink', liquidColor: '#cc0033', capColor: '#222' }
    ],
    capillary: { x1: 130, y1: 540, x2: 230, y2: 555 },
    pencil: { x: 290, y: 548, w: 130, h: 8 },
    ruler: { x: 380, y: 535, w: 140, h: 18 },
    dropper: { cx: 468, cy: 340, w: 6, h: 120 },
    solventFrontMaxDist: 250,
    animationDurationMs: 4500,
    components: [
      { name: "Yellow dye", color: "#e6c619", relativeRate: 0.85 },
      { name: "Blue dye", color: "#0066dd", relativeRate: 0.55 },
      { name: "Purple dye", color: "#9933cc", relativeRate: 0.35 }
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
    stand: { baseX: 30, baseY: 600, baseW: 155, rodX: 85, rodTop: 18, rodBot: 600 },
    mantle: { cx: 175, cy: 555, w: 130, h: 72, dialX: 175, dialY: 578 },
    flask: { cx: 175, cy: 475, bodyR: 70, neckW: 16, neckH: 120 },
    column: { x: 167, y: 120, width: 16 },
    condenser: { x1: 183, y1: 128, x2: 395, y2: 385, width: 22, innerW: 8 },
    receiver: { cx: 410, cy: 445, bodyR: 48, neckW: 14, neckH: 22, type: 'erlenmeyer' },
    clampFlask: { x: 75, y: 350, w: 100, h: 8 },
    clampColumn: { x: 75, y: 218, w: 92, h: 8 }
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

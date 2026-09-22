/* ================================================================
   ChemSim — simulationConfig.js
   Extracted simulation configuration from script.js
   ================================================================ */

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
    stand: { baseX: 50, baseY: 598, baseW: 110, rodX: 105, rodTop: 25, rodBot: 598 },
    mantle: { cx: 175, cy: 535, w: 120, h: 75, dialX: 175, dialY: 560 },
    flask: { cx: 175, cy: 455, bodyR: 62, neckW: 20, neckH: 48 },
    column: { x: 165, y: 115, width: 20 },
    condenser: { x1: 185, y1: 125, x2: 385, y2: 375, width: 22, innerW: 8 },
    receiver: { cx: 415, cy: 440, bodyR: 48, neckW: 14, neckH: 22, type: 'erlenmeyer' },
    clampFlask: { x: 90, y: 348, w: 75, h: 8 },
    clampColumn: { x: 90, y: 210, w: 75, h: 8 }
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

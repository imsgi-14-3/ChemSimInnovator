/* ================================================================
   ChemSim — simulationConfig.js
   Extracted simulation configuration from script.js
   ================================================================ */

var SIMULATION_CONFIG = {
  "A2": {
    label: "SIMULATED EDUCATIONAL VALUES — not real laboratory measurements",
    paper: {
      width: 80,
      height: 240,
      baselineY: 200,
      topY: 0
    },
    beaker: { cx: 290, cy: 240, w: 190, h: 310, solventLevel: 0.2, rimY: 75 },
    stick: { x: 175, y: 72, w: 230, h: 8 },
    clip: { cx: 290, cy: 72, w: 24, h: 30 },
    solventBeaker: { cx: 455, cy: 400, w: 80, h: 110, solventLevel: 0.5 },
    inkBottles: [
      { cx: 55, cy: 430, w: 38, h: 75, label: 'Black Ink', liquidColor: '#1a1a1a', capColor: '#1a1a1a', glassColor: 'rgba(30,30,30,0.7)' },
      { cx: 110, cy: 430, w: 38, h: 75, label: 'Blue Ink', liquidColor: '#003399', capColor: '#1a1a1a', glassColor: 'rgba(0,40,120,0.5)' },
      { cx: 165, cy: 430, w: 38, h: 75, label: 'Red Ink', liquidColor: '#aa0022', capColor: '#1a1a1a', glassColor: 'rgba(140,0,30,0.5)' }
    ],
    capillary: { x1: 80, y1: 548, x2: 180, y2: 560 },
    pencil: { x: 220, y: 552, w: 120, h: 7 },
    ruler: { x: 380, y: 542, w: 130, h: 14 },
    solventBeaker: { cx: 460, cy: 410, w: 75, h: 100, solventLevel: 0.55 },
    dropper: { cx: 468, cy: 370, w: 5, h: 100 },
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
      width: 80,
      height: 240,
      baselineY: 200,
      topY: 0
    },
    beaker: { cx: 280, cy: 240, w: 200, h: 320, solventLevel: 0.2, rimY: 70, type: 'glass' },
    stick: { x: 165, y: 62, w: 240, h: 9 },
    clip: { cx: 280, cy: 62, w: 26, h: 32 },
    solventBeaker: null,
    inkBottles: [
      { cx: 60, cy: 435, w: 45, h: 85, label: 'Pb²⁺\nSolution', liquidColor: 'rgba(190,195,200,0.5)', capColor: '#1a1a1a', glassColor: 'rgba(200,210,220,0.45)', bottleType: 'reagent' },
      { cx: 135, cy: 435, w: 45, h: 85, label: 'Cd²⁺\nSolution', liquidColor: 'rgba(150,190,225,0.45)', capColor: '#1a1a1a', glassColor: 'rgba(160,195,225,0.35)', bottleType: 'reagent' }
    ],
    capillary: { x1: 55, y1: 558, x2: 155, y2: 568 },
    pencil: null,
    ruler: null,
    solventFrontMaxDist: 250,
    animationDurationMs: 4500,
    components: [
      { name: "Cd²⁺", color: "#4488dd", relativeRate: 0.65 },
      { name: "Pb²⁺", color: "#9933aa", relativeRate: 0.35 }
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

import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "AgroInsight Team";
pptx.company = "AgroInsight Precision Agriculture";
pptx.title = "AgroInsight - Precision Agriculture Decision-Support Platform";

// Theme Colors
const C_BG_DARK = "0F172A";    // Deep Slate Navy
const C_BG_CARD = "1E293B";    // Card Slate
const C_EMERALD = "10B981";    // Agro Green
const C_TEAL    = "14B8A6";    // Teal
const C_AMBER   = "F59E0B";    // Warning/Accent Amber
const C_BLUE    = "38BDF8";    // Sky Blue
const C_WHITE   = "FFFFFF";    // Pure White
const C_MUTED   = "94A3B8";    // Slate Gray text
const C_LIGHT   = "F1F5F9";    // Off white

// Helper: Standard Slide Header
function addSlideHeader(slide, title, category = "AGROINSIGHT OVERVIEW") {
  // Category pill / tracker
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 0.45, w: 2.8, h: 0.28,
    fill: { color: "14532D" },
    line: { color: C_EMERALD, width: 1 },
    rectRadius: 0.1
  });
  slide.addText(category, {
    x: 0.8, y: 0.45, w: 2.8, h: 0.28,
    fontSize: 9, fontFace: "Arial", color: C_EMERALD, bold: true, align: "center", valign: "middle"
  });

  // Slide Title
  slide.addText(title, {
    x: 0.8, y: 0.8, w: 11.5, h: 0.55,
    fontSize: 22, fontFace: "Arial", color: C_WHITE, bold: true
  });

  // Divider Line
  slide.addShape(pptx.ShapeType.line, {
    x: 0.8, y: 1.4, w: 11.7, h: 0,
    line: { color: "334155", width: 1.5 }
  });
}

// -------------------------------------------------------------
// SLIDE 1: Title Slide
// -------------------------------------------------------------
{
  const s1 = pptx.addSlide();
  s1.background = { color: C_BG_DARK };

  // Decorative banner / container
  s1.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 1.2, w: 11.3, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.2
  });

  // Accent Tag
  s1.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 1.6, w: 3.2, h: 0.35,
    fill: { color: "064E3B" },
    line: { color: C_EMERALD, width: 1 },
    rectRadius: 0.1
  });
  s1.addText("ACADEMIC PROTOTYPE PROJECT", {
    x: 1.5, y: 1.6, w: 3.2, h: 0.35,
    fontSize: 10, fontFace: "Arial", color: C_EMERALD, bold: true, align: "center", valign: "middle"
  });

  // Main Title
  s1.addText("AgroInsight", {
    x: 1.5, y: 2.1, w: 10.0, h: 0.9,
    fontSize: 44, fontFace: "Arial", color: C_WHITE, bold: true
  });

  // Subtitle
  s1.addText("A Precision-Agriculture Decision-Support Platform for Small & Medium Farms", {
    x: 1.5, y: 3.0, w: 10.0, h: 0.5,
    fontSize: 18, fontFace: "Arial", color: C_BLUE
  });

  // Project Highlights / Scope
  const introPoints = [
    { text: "Combines interactive satellite field mapping (Leaflet) with spatial vegetation health (NDVI).", options: { bullet: true, color: C_LIGHT, fontSize: 13 } },
    { text: "Synthesizes laboratory soil test data (NPK, pH, moisture) for crop suitability scoring.", options: { bullet: true, color: C_LIGHT, fontSize: 13 } },
    { text: "Delivers transparent, explainable, non-diagnostic verification guidance and input financial tracking.", options: { bullet: true, color: C_LIGHT, fontSize: 13 } }
  ];
  s1.addText(introPoints, {
    x: 1.5, y: 3.7, w: 10.0, h: 1.4,
    fontFace: "Arial", lineSpacing: 22
  });

  // Footer metadata
  s1.addText("Precision Agriculture  •  Remote Sensing  •  Agronomic Decision Support", {
    x: 1.5, y: 5.4, w: 10.0, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: C_MUTED
  });
}

// -------------------------------------------------------------
// SLIDE 2: What Inspired This Project (Motivation)
// -------------------------------------------------------------
{
  const s2 = pptx.addSlide();
  s2.background = { color: C_BG_DARK };
  addSlideHeader(s2, "Inspiration & Motivation", "PROJECT BACKGROUND");

  // 3 Thematic Cards
  const cards = [
    {
      title: "1. The Smallholder Gap",
      icon: "🌾",
      text: "Most high-end ag-tech software is built for massive commercial agribusinesses with high subscription fees and complex hardware sensors. Small and medium growers are left behind."
    },
    {
      title: "2. The Limitation of Walk-Throughs",
      icon: "🚶",
      text: "Farmers traditionally rely on visual inspection by walking fields. However, early-stage nutrient deficiencies or water stress develop internally before physical leaf symptoms show to the naked eye."
    },
    {
      title: "3. Demystifying Satellite Tech",
      icon: "🛰️",
      text: "Many farmers either distrust remote sensing or hold unrealistic expectations that satellites 'magically see underground'. We wanted a realistic, transparent tool that bridges the gap clearly."
    }
  ];

  cards.forEach((c, idx) => {
    const xPos = 0.8 + idx * 3.95;
    s2.addShape(pptx.ShapeType.rect, {
      x: xPos, y: 1.7, w: 3.75, h: 4.8,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.5 },
      rectRadius: 0.15
    });

    s2.addText(c.title, {
      x: xPos + 0.3, y: 2.0, w: 3.15, h: 0.5,
      fontSize: 16, fontFace: "Arial", color: C_EMERALD, bold: true
    });

    s2.addText(c.text, {
      x: xPos + 0.3, y: 2.7, w: 3.15, h: 3.2,
      fontSize: 13, fontFace: "Arial", color: C_LIGHT, lineSpacing: 20
    });
  });
}

// -------------------------------------------------------------
// SLIDE 3: Problem Statement
// -------------------------------------------------------------
{
  const s3 = pptx.addSlide();
  s3.background = { color: C_BG_DARK };
  addSlideHeader(s3, "Problem Statement", "CHALLENGES IN MODERN AGRI-DECISIONS");

  // Left column: Current Challenges (Red accents)
  s3.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "7F1D1D", width: 1.5 },
    rectRadius: 0.15
  });
  s3.addText("Current Realities & Core Problems", {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: "F87171", bold: true
  });
  const problems = [
    { text: "Late Stress Detection: Crop canopy stress (moisture deficit, nitrogen hunger) is often noticed only when crop damage is irreversible.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Data Silos: Satellite imagery, soil lab test reports, and weather data are isolated across separate platforms or physical paper sheets.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Black-Box Claims: Over-promising platforms claim satellite imagery can 'diagnose exact diseases', causing costly diagnostic errors.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Financial Blindness: Lack of integrated tracking connecting input expenses (seed, fertilizer, fuel) directly with expected yield and market price.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } }
  ];
  s3.addText(problems, {
    x: 1.1, y: 2.4, w: 5.0, h: 3.8,
    fontFace: "Arial", lineSpacing: 18
  });

  // Right column: The AgroInsight Solution (Green accents)
  s3.addShape(pptx.ShapeType.rect, {
    x: 6.9, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "065F46", width: 1.5 },
    rectRadius: 0.15
  });
  s3.addText("The AgroInsight Approach", {
    x: 7.2, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: C_EMERALD, bold: true
  });
  const solutions = [
    { text: "Unified Multi-Source View: Integrates spatial boundaries, satellite NDVI, soil tests, and weather on a single interactive screen.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Non-Diagnostic Framing: Clearly frames recommendations as 'indicators and suggestions for ground verification' rather than guaranteed diagnoses.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Soil-Based Crop Suitability: Evaluates NPK, pH, and soil texture against a crop database to suggest optimal planting choices.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } },
    { text: "Integrated Financial Modeling: Live scenario sliders calculate unit cost of production, break-even price, and estimated profit margins.", options: { bullet: true, color: C_LIGHT, fontSize: 12 } }
  ];
  s3.addText(solutions, {
    x: 7.2, y: 2.4, w: 5.0, h: 3.8,
    fontFace: "Arial", lineSpacing: 18
  });
}

// -------------------------------------------------------------
// SLIDE 4: Literature Survey - Summary
// -------------------------------------------------------------
{
  const s4 = pptx.addSlide();
  s4.background = { color: C_BG_DARK };
  addSlideHeader(s4, "Literature Survey Summary", "PRIOR RESEARCH & GAP ANALYSIS");

  const litRows = [
    {
      title: "1. Multispectral Vegetation Indices (Rouse et al., Tucker)",
      finding: "Established NDVI as the golden benchmark for canopy biomass and chlorophyll absorption using Red (660nm) and NIR (840nm) wavelengths.",
      takeaway: "Proves that satellite data effectively tracks canopy vigour, but cannot directly measure subsurface soil chemistry."
    },
    {
      title: "2. Soil Nutrient Dynamics & Suitability (FAO & ICAR Standards)",
      finding: "Plant uptake relies heavily on soil pH for macronutrient availability (NPK). A crop's yield potential varies significantly with soil texture and moisture.",
      takeaway: "Emphasizes that crop recommendations require actual laboratory soil tests rather than remote assumptions."
    },
    {
      title: "3. Commercial Ag-Tech Tools (FieldView, EOS Crop Monitoring)",
      finding: "Provide high-precision satellite feeds and telemetry for massive farming operations, but are cost-prohibitive, complex, and proprietary.",
      takeaway: "Identified the need for an open, lightweight, explainable prototype built specifically for smallholder decision support."
    }
  ];

  litRows.forEach((row, idx) => {
    const yPos = 1.7 + idx * 1.6;
    s4.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: yPos, w: 11.7, h: 1.45,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.2 },
      rectRadius: 0.12
    });

    s4.addText(row.title, {
      x: 1.1, y: yPos + 0.12, w: 11.1, h: 0.35,
      fontSize: 14, fontFace: "Arial", color: C_BLUE, bold: true
    });

    s4.addText([
      { text: "Key Finding: ", options: { bold: true, color: C_EMERALD } },
      { text: row.finding, options: { color: C_LIGHT } },
      { text: "  |  Project Implication: ", options: { bold: true, color: C_AMBER } },
      { text: row.takeaway, options: { color: C_MUTED } }
    ], {
      x: 1.1, y: yPos + 0.5, w: 11.1, h: 0.85,
      fontSize: 11.5, fontFace: "Arial", lineSpacing: 16
    });
  });
}

// -------------------------------------------------------------
// SLIDE 5: The Data We Studied
// -------------------------------------------------------------
{
  const s5 = pptx.addSlide();
  s5.background = { color: C_BG_DARK };
  addSlideHeader(s5, "The Data Studied & Modeled", "INPUT DATASETS");

  const dataBlocks = [
    {
      title: "🛰️ Satellite Multispectral Data",
      color: C_BLUE,
      items: [
        "Mission: Sentinel-2 Multispectral Instrument (MSI)",
        "Bands: Band 4 (Red, 665nm) & Band 8 (NIR, 842nm)",
        "Spatial Resolution: 10m ground pixel grid",
        "Temporal Revisit: 5-day cycle for field history",
        "Role: Monitors vegetation vigour & canopy density"
      ]
    },
    {
      title: "🧪 Soil Chemical & Physical Data",
      color: C_EMERALD,
      items: [
        "Primary Nutrients: Nitrogen (N), Phosphorus (P), Potassium (K)",
        "Acidity/Alkalinity: Soil pH scale (3.0 to 10.0)",
        "Physical Factors: Soil Moisture (%) & Organic Matter (%)",
        "Texture Types: Loam, Sandy, Clay, Silt, Black, Red, Alluvial",
        "Role: Determines seed germination & nutrient readiness"
      ]
    },
    {
      title: "🌦️ Weather & Crop Agronomics",
      color: C_AMBER,
      items: [
        "Weather: Air temp (°C), 24h rainfall (mm), humidity (%)",
        "Forecast: 5-day precipitation probability and heat outlook",
        "Crop Matrix: Agronomic tolerance rules for 10 major crops (Wheat, Rice, Maize, Soybean, Cotton, etc.)",
        "Financials: Seed, fertilizer, pesticide, irrigation, labour costs",
        "Role: Provides climate context and profitability estimates"
      ]
    }
  ];

  dataBlocks.forEach((b, idx) => {
    const xPos = 0.8 + idx * 3.95;
    s5.addShape(pptx.ShapeType.rect, {
      x: xPos, y: 1.7, w: 3.75, h: 4.8,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.5 },
      rectRadius: 0.15
    });

    s5.addText(b.title, {
      x: xPos + 0.25, y: 1.9, w: 3.25, h: 0.5,
      fontSize: 14, fontFace: "Arial", color: b.color, bold: true
    });

    const listItems = b.items.map(it => ({
      text: it,
      options: { bullet: true, color: C_LIGHT, fontSize: 11.5 }
    }));

    s5.addText(listItems, {
      x: xPos + 0.25, y: 2.5, w: 3.25, h: 3.8,
      fontFace: "Arial", lineSpacing: 18
    });
  });
}

// -------------------------------------------------------------
// SLIDE 6: Tech Stack (Downplayed & Basic)
// -------------------------------------------------------------
{
  const s6 = pptx.addSlide();
  s6.background = { color: C_BG_DARK };
  addSlideHeader(s6, "Technology Stack (Lightweight & Modular)", "TOOLS & FRAMEWORKS");

  // Explanatory note emphasizing simplicity
  s6.addText("Built as a lightweight, clean, and self-contained web prototype using fundamental web technologies:", {
    x: 0.8, y: 1.6, w: 11.7, h: 0.4,
    fontSize: 13, fontFace: "Arial", color: C_MUTED
  });

  const techCards = [
    {
      tech: "React & Vite",
      sub: "Frontend Framework",
      desc: "Handles user interface components, responsive navigation, and instant page transitions with clean local state management."
    },
    {
      tech: "Leaflet",
      sub: "Interactive Mapping",
      desc: "Displays real satellite imagery base maps, renders field boundary polygons, and draws the 16-cell spatial NDVI grid overlay."
    },
    {
      tech: "Recharts",
      sub: "Visual Analytics",
      desc: "Generates clean, interactive charts for seasonal NDVI trends, 5-day weather forecasts, and financial expense breakdowns."
    },
    {
      tech: "Plain JavaScript",
      sub: "Core Decision Logic",
      desc: "Executes rule-based agronomic recommendations, polygon area math, and the weighted crop suitability scoring algorithm without backend bloat."
    }
  ];

  techCards.forEach((t, idx) => {
    const xPos = 0.8 + (idx % 2) * 5.95;
    const yPos = 2.15 + Math.floor(idx / 2) * 2.25;

    s6.addShape(pptx.ShapeType.rect, {
      x: xPos, y: yPos, w: 5.75, h: 2.05,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.2 },
      rectRadius: 0.12
    });

    s6.addText(t.tech, {
      x: xPos + 0.3, y: yPos + 0.2, w: 5.1, h: 0.35,
      fontSize: 18, fontFace: "Arial", color: C_EMERALD, bold: true
    });

    s6.addText(t.sub, {
      x: xPos + 0.3, y: yPos + 0.6, w: 5.1, h: 0.25,
      fontSize: 11, fontFace: "Arial", color: C_BLUE, bold: true
    });

    s6.addText(t.desc, {
      x: xPos + 0.3, y: yPos + 0.95, w: 5.1, h: 0.95,
      fontSize: 12, fontFace: "Arial", color: C_LIGHT, lineSpacing: 16
    });
  });
}

// -------------------------------------------------------------
// SLIDE 7: Project Architecture
// -------------------------------------------------------------
{
  const s7 = pptx.addSlide();
  s7.background = { color: C_BG_DARK };
  addSlideHeader(s7, "System Architecture", "HIGH-LEVEL WORKFLOW");

  // 4 Horizontal Pipeline Stages
  const stages = [
    {
      title: "1. Data Input Layer",
      color: C_BLUE,
      items: ["• Interactive Map (GeoJSON polygon coordinates)", "• Laboratory Soil Test Inputs (N-P-K, pH, moisture)", "• Micro-Climate Weather Feed (Temp, Rain, RH)", "• Farm Input Costs (Seeds, Fertilizer, Labour)"]
    },
    {
      title: "2. Processing Engines",
      color: C_EMERALD,
      items: ["• Satellite Data Service (10m grid simulation)", "• Transparent Rule Engine (If-Then stress checks)", "• Weighted Suitability Engine (6-factor score)", "• Profitability Calculator (Net margins & unit cost)"]
    },
    {
      title: "3. Output & Guidance",
      color: C_AMBER,
      items: ["• Spatial Field Heatmap (Healthy, Moderate, Stressed)", "• Explainable Action Cards (Observation & Next steps)", "• Top Recommended Crops (#1 to #10 ranking)", "• Financial Scenarios (Dynamic sliders)"]
    },
    {
      title: "4. Farmer Action",
      color: C_TEAL,
      items: ["• In-field ground scouting at flagged GPS coordinates", "• Target spot irrigation or drainage fix", "• Verify soil lab tests before fertilizer application", "• Confident crop selection & cost control"]
    }
  ];

  stages.forEach((st, idx) => {
    const xPos = 0.8 + idx * 2.95;
    s7.addShape(pptx.ShapeType.rect, {
      x: xPos, y: 1.8, w: 2.8, h: 4.6,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.5 },
      rectRadius: 0.12
    });

    // Top Header band
    s7.addShape(pptx.ShapeType.rect, {
      x: xPos, y: 1.8, w: 2.8, h: 0.65,
      fill: { color: "0F172A" },
      rectRadius: 0.12
    });

    s7.addText(st.title, {
      x: xPos + 0.1, y: 1.85, w: 2.6, h: 0.5,
      fontSize: 12, fontFace: "Arial", color: st.color, bold: true, align: "center", valign: "middle"
    });

    s7.addText(st.items.join("\n\n"), {
      x: xPos + 0.2, y: 2.65, w: 2.4, h: 3.6,
      fontSize: 10.5, fontFace: "Arial", color: C_LIGHT, lineSpacing: 14
    });
  });
}

// -------------------------------------------------------------
// SLIDE 8: Core Concepts Used (NDVI & Decision Logic)
// -------------------------------------------------------------
{
  const s8 = pptx.addSlide();
  s8.background = { color: C_BG_DARK };
  addSlideHeader(s8, "Key Concepts: NDVI & Explainable Rules", "SCIENTIFIC & LOGICAL FOUNDATION");

  // Left Box: What is NDVI?
  s8.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.15
  });

  s8.addText("Understanding NDVI (Vegetation Index)", {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: C_EMERALD, bold: true
  });

  // Formula Container
  s8.addShape(pptx.ShapeType.rect, {
    x: 1.1, y: 2.4, w: 5.0, h: 0.65,
    fill: { color: "064E3B" },
    line: { color: C_EMERALD, width: 1 },
    rectRadius: 0.1
  });
  s8.addText("NDVI = (NIR - Red) / (NIR + Red)", {
    x: 1.1, y: 2.4, w: 5.0, h: 0.65,
    fontSize: 15, fontFace: "Courier New", color: C_WHITE, bold: true, align: "center", valign: "middle"
  });

  const ndviExplanation = [
    { text: "Why it works: Healthy plant leaves contain chlorophyll which absorbs visible Red light for photosynthesis, while the spongy mesophyll structure reflects Near-Infrared (NIR) light strongly.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Stressed Plants: Unhealthy or water-stressed crops reflect less NIR and absorb less Red light, causing NDVI to drop significantly.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Spatial Variation: Instead of one single number for the whole farm, AgroInsight slices the field into a grid so farmers spot the exact stressed corner.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } }
  ];
  s8.addText(ndviExplanation, {
    x: 1.1, y: 3.2, w: 5.0, h: 3.1,
    fontFace: "Arial", lineSpacing: 16
  });

  // Right Box: Explainable Decision Rules
  s8.addShape(pptx.ShapeType.rect, {
    x: 6.9, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.15
  });

  s8.addText("Explainable, Non-Diagnostic Logic", {
    x: 7.2, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: C_AMBER, bold: true
  });

  const ruleExamples = [
    { text: "Multi-Source Fusion: The system refuses to jump to conclusions from satellite images alone; it cross-references soil and weather data.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Rule 1 (Moisture Stress): Low NDVI + Low Soil Moisture → 'Possible moisture stress detected. Check irrigation lines and sprinkler nozzles.'", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Rule 2 (Nutrient Indicator): Low NDVI + Low Soil Nitrogen → 'Low nitrogen may be a factor. Verify with leaf tissue testing before applying fertilizer.'", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Strict Non-Diagnostic Framing: Always presents outputs as indicators, contributing factors, and suggestions for physical ground inspection.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } }
  ];
  s8.addText(ruleExamples, {
    x: 7.2, y: 2.4, w: 5.0, h: 3.8,
    fontFace: "Arial", lineSpacing: 16
  });
}

// -------------------------------------------------------------
// SLIDE 9: Scales of Measurement (Easy to Understand)
// -------------------------------------------------------------
{
  const s9 = pptx.addSlide();
  s9.background = { color: C_BG_DARK };
  addSlideHeader(s9, "Scales of Measurement Explained Simply", "METRICS & INTERPRETATION");

  const scales = [
    {
      metric: "NDVI Index",
      range: "Scale: 0.0 to 1.0 (Real: -1 to +1)",
      green: "🟢 Healthy (≥ 0.60): Dense, green, thriving plant canopy.",
      yellow: "🟡 Moderate (0.35 - 0.59): Average canopy; monitor progress.",
      red: "🔴 Stressed (< 0.35): Thin canopy, water stress, or bare soil."
    },
    {
      metric: "Soil pH Level",
      range: "Scale: 0 to 14 (Acidity / Alkalinity)",
      green: "🟢 Optimal (6.0 - 7.2): Best nutrient absorption for most crops.",
      yellow: "🟡 Acidic (< 6.0): Restricts phosphorus; may need lime.",
      red: "🔴 Alkaline (> 7.5): Can lock out iron and micronutrients."
    },
    {
      metric: "Soil Moisture",
      range: "Scale: 0% to 100% Volumetric Water",
      green: "🟢 Optimal (25% - 40%): Ideal root-zone moisture availability.",
      yellow: "🟡 Low (< 20%): Crop wilting point; requires irrigation.",
      red: "🔴 Saturation (> 55%): Risk of waterlogging and root rot."
    },
    {
      metric: "Nutrients (NPK)",
      range: "Units: kg/ha or mg/kg (ppm)",
      green: "🟢 Nitrogen: Vegetative shoot & green leaf growth.",
      yellow: "🟡 Phosphorus: Root establishment & flowering vigour.",
      red: "🔴 Potassium: Water regulation, stem strength & disease defense."
    }
  ];

  scales.forEach((sc, idx) => {
    const xPos = 0.8 + (idx % 2) * 5.95;
    const yPos = 1.75 + Math.floor(idx / 2) * 2.45;

    s9.addShape(pptx.ShapeType.rect, {
      x: xPos, y: yPos, w: 5.75, h: 2.25,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.2 },
      rectRadius: 0.12
    });

    s9.addText(sc.metric, {
      x: xPos + 0.3, y: yPos + 0.15, w: 3.5, h: 0.35,
      fontSize: 16, fontFace: "Arial", color: C_BLUE, bold: true
    });

    s9.addText(sc.range, {
      x: xPos + 0.3, y: yPos + 0.5, w: 5.1, h: 0.25,
      fontSize: 10.5, fontFace: "Arial", color: C_MUTED, italic: true
    });

    s9.addText([
      { text: sc.green + "\n", options: { color: C_LIGHT } },
      { text: sc.yellow + "\n", options: { color: C_LIGHT } },
      { text: sc.red, options: { color: C_LIGHT } }
    ], {
      x: xPos + 0.3, y: yPos + 0.8, w: 5.1, h: 1.35,
      fontSize: 11, fontFace: "Arial", lineSpacing: 15
    });
  });
}

// -------------------------------------------------------------
// SLIDE 10: Crop Suitability & Profitability Modules
// -------------------------------------------------------------
{
  const s10 = pptx.addSlide();
  s10.background = { color: C_BG_DARK };
  addSlideHeader(s10, "Extended Modules: Crop Suitability & Financials", "DECISION SUPPORT IN PRACTICE");

  // Left Container: Crop Suitability Engine
  s10.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.15
  });

  s10.addText("🌱 Soil-Based Crop Suitability", {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: C_EMERALD, bold: true
  });

  const suitPoints = [
    { text: "Weighted Scoring Formula: Combines Nitrogen (20%), Phosphorus (15%), Potassium (20%), pH (25%), Moisture (10%), and Soil Texture (10%).", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "10-Crop Database: Evaluates Wheat, Rice, Maize, Soybean, Cotton, Sugarcane, Chickpea, Groundnut, Tomato, and Potato.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Ranked Output: Scores crops 0-100% into tiers (Highly Suitable, Suitable, Moderately Suitable, Less Suitable).", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Transparent Justification: Explicitly lists matched advantages (✓) alongside limiting factors (⚠).", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } }
  ];
  s10.addText(suitPoints, {
    x: 1.1, y: 2.4, w: 5.0, h: 3.8,
    fontFace: "Arial", lineSpacing: 17
  });

  // Right Container: Financial Tracking
  s10.addShape(pptx.ShapeType.rect, {
    x: 6.9, y: 1.7, w: 5.6, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.15
  });

  s10.addText("💰 Field Profitability Simulator", {
    x: 7.2, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: C_AMBER, bold: true
  });

  const finPoints = [
    { text: "Granular Cost Breakdown: Tracks operational expenses across seed, fertilizer, pesticide, irrigation, labour, and machinery.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Revenue Modeling: Dynamically computes Gross Revenue = Expected Yield × Market Selling Price.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Live Interactive Sliders: Farmers can simulate 'what-if' scenarios (e.g., if fertilizer costs spike 20% or market selling price fluctuates).", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } },
    { text: "Unit Cost Benchmarking: Calculates break-even cost per bushel/bale and cost per acre.", options: { bullet: true, color: C_LIGHT, fontSize: 11.5 } }
  ];
  s10.addText(finPoints, {
    x: 7.2, y: 2.4, w: 5.0, h: 3.8,
    fontFace: "Arial", lineSpacing: 17
  });
}

// -------------------------------------------------------------
// SLIDE 11: Key Takeaways & Project Impact
// -------------------------------------------------------------
{
  const s11 = pptx.addSlide();
  s11.background = { color: C_BG_DARK };
  addSlideHeader(s11, "Project Summary & Key Takeaways", "CONCLUSION & IMPACT");

  const takeaways = [
    {
      num: "1",
      title: "Data Honesty & Scientific Clarity",
      desc: "Distinct separation between what satellites observe (canopy reflectance) versus what physical soil testing provides (chemical nutrients)."
    },
    {
      num: "2",
      title: "Explainable Decision Support",
      desc: "Replaces misleading 'black box AI' with transparent agronomic rules that explain *why* an alert triggered and *what to verify* on the ground."
    },
    {
      num: "3",
      title: "Holistic Farm Management",
      desc: "Bridges geospatial boundaries, vegetation indices, soil chemistry, weather trends, and farm financial profitability in a single unified dashboard."
    },
    {
      num: "4",
      title: "Lightweight & Modular",
      desc: "Functional prototype that runs locally without expensive infrastructure, built with interchangeable services for future real API integration."
    }
  ];

  takeaways.forEach((t, idx) => {
    const yPos = 1.7 + idx * 1.25;
    s11.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: yPos, w: 11.7, h: 1.1,
      fill: { color: C_BG_CARD },
      line: { color: "334155", width: 1.2 },
      rectRadius: 0.1
    });

    // Number Badge
    s11.addShape(pptx.ShapeType.rect, {
      x: 1.05, y: yPos + 0.2, w: 0.7, h: 0.7,
      fill: { color: "064E3B" },
      line: { color: C_EMERALD, width: 1 },
      rectRadius: 0.08
    });
    s11.addText(t.num, {
      x: 1.05, y: yPos + 0.2, w: 0.7, h: 0.7,
      fontSize: 16, fontFace: "Arial", color: C_EMERALD, bold: true, align: "center", valign: "middle"
    });

    s11.addText(t.title, {
      x: 2.0, y: yPos + 0.15, w: 9.5, h: 0.35,
      fontSize: 14, fontFace: "Arial", color: C_WHITE, bold: true
    });

    s11.addText(t.desc, {
      x: 2.0, y: yPos + 0.52, w: 10.0, h: 0.45,
      fontSize: 11.5, fontFace: "Arial", color: C_MUTED
    });
  });
}

// -------------------------------------------------------------
// SLIDE 12: References Slide
// -------------------------------------------------------------
{
  const s12 = pptx.addSlide();
  s12.background = { color: C_BG_DARK };
  addSlideHeader(s12, "References & Technical Literature", "BIBLIOGRAPHY");

  const references = [
    { text: "Rouse, J. W., Haas, R. H., Schell, J. A., & Deering, D. W. (1974). Monitoring the vernal advancement and retrogradation (Green wave effect) of natural vegetation. NASA/GSFC Final Report, Greenbelt, MD, USA.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } },
    { text: "European Space Agency (ESA). (2021). Sentinel-2 User Handbook (Issue 2.0). ESA Standard Document for Multispectral Instrument (MSI) Level-1C and Level-2A surface reflectance products.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } },
    { text: "Food and Agriculture Organization of the United Nations (FAO). (2020). Plant nutrition for food security: A guide for integrated nutrient management. FAO Fertilizer and Plant Nutrition Bulletin 16, Rome.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } },
    { text: "Tucker, C. J. (1979). Red and photographic infrared linear combinations for monitoring vegetation. Remote Sensing of Environment, 8(2), 127-150.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } },
    { text: "United States Department of Agriculture - Natural Resources Conservation Service (USDA-NRCS). (2022). Soil Quality Test Kit Guide and Precision Nutrient Management Protocols.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } },
    { text: "Indian Council of Agricultural Research (ICAR). (2019). Soil Test Crop Response (STCR) correlation studies and fertilizer recommendation guidelines for major Indian crops.", options: { bullet: true, color: C_LIGHT, fontSize: 11 } }
  ];

  s12.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.7, w: 11.7, h: 4.8,
    fill: { color: C_BG_CARD },
    line: { color: "334155", width: 1.5 },
    rectRadius: 0.15
  });

  s12.addText(references, {
    x: 1.2, y: 2.0, w: 10.9, h: 4.2,
    fontFace: "Arial", lineSpacing: 20
  });
}

// Generate the PPTX file
const outputPath = "AgroInsight_Project_Presentation.pptx";
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`Presentation generated successfully: ${fileName}`);
  })
  .catch(err => {
    console.error("Error generating presentation:", err);
    process.exit(1);
  });

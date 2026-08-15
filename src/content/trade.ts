/**
 * The Business Hub trade book — one page per traded category.
 *
 * The division moves goods in two directions, and until now the site said so in
 * two lists of nouns. Each of those nouns is a different trade with different
 * buyers, different documentation and, in the case of the commodities, a
 * published specification a buyer contracts against. They are separate pages
 * because they are separate businesses in everything but the invoice.
 *
 * Sourcing. Everything on the Essential Commodities page — the grades, the
 * analyses, the packaging modes, the certifications and the accepted banking
 * instruments — is transcribed from the division's own trade portfolio
 * ("Triple S Business Hub — Your Trusted Partner in Global Commodity Trade").
 * The other nine categories have no such document behind them. They are written
 * from what the division already publishes about itself: the four service lines
 * in `divisions.ts`, the tender categories, the three offices, and the named
 * focus markets. Where those pages describe how a category is handled, they
 * describe the requirement the category imposes — DGDA registration, a
 * phytosanitary certificate, a UN packing group — which is a fact about the
 * trade rather than a claim about the company.
 *
 * What is deliberately absent from the nine: no invented specifications, no
 * certification numbers, no named suppliers, no volumes, no lead times and no
 * origins the company has not stated. Same rule as `site.ts`.
 */

export type TradeDirection = "import" | "export";

export type TradeRangeItem = { name: string; body: string };

/**
 * A published product analysis. `rows` is transcribed verbatim from the trade
 * portfolio, including the units and the mixed decimal conventions in the
 * original — these are contractual figures and normalising them would be
 * editing a specification.
 */
export type TradeSpecTable = {
  name: string;
  note?: string;
  rows: { label: string; value: string }[];
};

export type TradeCategory = {
  slug: string;
  direction: TradeDirection;
  /** Position within its own direction, not across the whole book. */
  index: string;
  name: string;
  shortName: string;
  discipline: string;
  statement: string;
  summary: string;
  body: string[];
  range: { label: string; note: string; items: TradeRangeItem[] };
  specs?: TradeSpecTable[];
  packaging?: TradeRangeItem[];
  /** What the category legally or practically demands before it can move. */
  compliance?: { label: string; note: string; items: string[] };
  certifications?: {
    note: string;
    registration?: { label: string; value: string };
    items: string[];
  };
  buyers: string[];
  /** The other group business this category leans on, and for what. */
  handoff?: { slug: string; note: string };
};

/* ------------------------------------------------------------------ *
 * Shared across every trade page
 * ------------------------------------------------------------------ */

/** The five service lines, from the trade portfolio. */
export const tradeServices: TradeRangeItem[] = [
  {
    name: "Sourcing & procurement",
    body: "Direct from producers, mills, refineries and manufacturers, rather than through a chain of intermediaries each taking a turn.",
  },
  {
    name: "Quality assurance",
    body: "Contracted against a written specification and checked against that specification before shipment — not described, measured.",
  },
  {
    name: "Logistics & freight forwarding",
    body: "End-to-end movement, handled by Triple S Logistics inside the group rather than tendered out to a third party.",
  },
  {
    name: "Customs & documentation",
    body: "The paperwork that clears the goods at both ends, prepared before they move rather than chased after they arrive.",
  },
  {
    name: "Market intelligence",
    body: "Price trends, supply-side risk and what is actually available this season, which is often a different question from what is listed.",
  },
];

/** "Why choose Triple S Business Hub", from the trade portfolio. */
export const tradeAdvantages: TradeRangeItem[] = [
  {
    name: "Global network",
    body: "Partnerships with established suppliers and buyers across the markets the division trades in.",
  },
  {
    name: "Competitive pricing",
    body: "Bulk purchasing and direct sourcing, rather than a margin applied on top of someone else's margin.",
  },
  {
    name: "Timely delivery",
    body: "Group freight capability, so the shipping is not a second negotiation with a stranger.",
  },
  {
    name: "Customer-centric approach",
    body: "Long-term relationships built on trust and transparency.",
  },
  {
    name: "Compliance & integrity",
    body: "Strict adherence to contractual and ethical standards.",
  },
];

export const tradeMarkets: TradeRangeItem[] = [
  {
    name: "Domestic",
    body: "Wholesalers, supermarkets, institutional buyers and food processors in Bangladesh.",
  },
  {
    name: "International",
    body: "Importers and distributors in Asia, Africa and the Middle East.",
  },
];

/**
 * Accepted banking instruments, from the trade portfolio.
 *
 * Published as-is because it is the first question a commodity counterparty
 * asks and the answer decides whether there is a deal to discuss. The MT codes
 * are SWIFT message types: MT-700 issues a documentary credit, MT-760 a standby.
 */
export const tradeInstruments = {
  accepted: [
    "DLC / MT-700",
    "SBLC / MT-760",
    "ARDLC / MT-700",
    "SBLC FULL / MT-760",
    "LC CASH BANK",
  ],
  guarantee:
    "Banking instrument confirmed, irrevocable, transferable and divisible, issued by a top-25 bank. Auto-rotating, duration 12 months and above. All payment methods and MT103.",
  terms: [
    {
      name: "DLC / LC",
      renewal: "Renewable month after month",
      body: "Payment according to the price list at the point of departure.",
    },
    {
      name: "SBLC",
      renewal: "Renewable month after month",
      body: "Four-month warranty, renewable payment upon arrival.",
    },
    {
      name: "LC Cash Bank",
      renewal: "Renewable month after month",
      body: "Four-month warranty, revolving payment in the country of origin.",
    },
    {
      name: "SBLC Full 25%",
      renewal: "Renewable month after month",
      body: "Guarantee 25% of the total cost.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * The trade book
 * ------------------------------------------------------------------ */

export const tradeCategories: TradeCategory[] = [
  /* ---------------------------------------------------------------- *
   * Into Bangladesh — import
   * ---------------------------------------------------------------- */
  {
    slug: "essential-commodities",
    direction: "import",
    index: "01",
    name: "Essential Commodities",
    shortName: "Essential Commodities",
    discipline: "Food staples & bulk agricultural trade",
    statement: "Sugar, rice, wheat and edible oil, bought at origin and landed in bulk.",
    summary:
      "Bulk food staples — sugar, rice, wheat, edible oils, corn and urea — sourced from origin mills and refineries for wholesalers, processors and government procurement.",
    body: [
      "Essential commodities are the largest line the trade desk runs, and the one where the result is decided before the goods ever move: at origin, in the choice of mill or refinery and the grade contracted for. The division sources sugar, rice, wheat and edible oils both within Bangladesh and across international markets, supplying wholesalers, retailers, food manufacturers and government procurement bodies.",
      "Volume is what makes the pricing work and origin relationships are what make the volume reliable. Partnerships are held with producers and exporters in more than one origin for each commodity, so a lane that closes — a crop that fails, an export duty that changes overnight — does not take the contract with it.",
      "Every grade below is contracted against a written specification rather than a description. Sugar is bought to ICUMSA, oils to free fatty acid, moisture and peroxide limits, wheat to milling or feed grade. That specification is what pre-shipment inspection is checked against, and what the documents on arrival have to match.",
    ],
    range: {
      label: "Core commodities",
      note: "Each grade is contracted against a written specification. The published analyses for sugar and the four edible oils are set out below.",
      items: [
        {
          name: "Sugar",
          body: "ICUMSA 45 and other grades, for industrial and consumer use.",
        },
        {
          name: "Rice",
          body: "Parboiled, white and basmati, sourced from established mills and exporters.",
        },
        {
          name: "Wheat",
          body: "Milling grade and feed grade — soft wheat from Russian and European origins.",
        },
        {
          name: "Soybean oil",
          body: "Crude, refined and crude degummed, for edible and industrial applications.",
        },
        {
          name: "Sunflower oil",
          body: "Crude and refined, Russian and European origin.",
        },
        {
          name: "Cooking oil blend",
          body: "Palm oil 70% with sunflower oil 30%, for the retail and food-service trade.",
        },
        {
          name: "Corn",
          body: "GMO and non-GMO Amarillo corn, offered in large wholesale lots or packed.",
        },
        {
          name: "Urea 45",
          body: "Kazakhstan origin.",
        },
      ],
    },
    specs: [
      {
        name: "Sugar — ICUMSA 45",
        note: "Technical characteristics of ICUMSA 45. Suitability for human consumption, Class “A”.",
        rows: [
          { label: "Polarization", value: "99.80° minimum" },
          { label: "Ash content", value: "0.04% maximum by weight" },
          { label: "Moisture", value: "0.04% maximum by weight" },
          { label: "Magnetic", value: "mg/kg 4" },
          { label: "Particles", value: "100% dry & free flowing" },
          { label: "Solubility granulation", value: "Fine standard" },
          { label: "ICUMSA", value: "45 RBU ICUMSA, attenuation index units method #10-1978" },
          { label: "Max As, max Os", value: "1 p.p.m." },
          { label: "Max Cu", value: "2 p.p.m. : 3 p.p.m." },
          { label: "Colour", value: "Sparkling white" },
          { label: "Sediments", value: "None" },
          { label: "SO", value: "mg/kg 20" },
          { label: "Reducing sugar", value: "0.010% maximum in dry mass" },
          {
            label: "Radiation",
            value: "Normal, without presence of caesium or iodine. SO₂: certified",
          },
          { label: "Substance", value: "Solid, crystal" },
          { label: "Smell", value: "Free of any smell" },
          { label: "HPN staph aureus", value: "Per 1 gram — nil" },
          {
            label: "Microbiological limits",
            value:
              "Pathogenic bacteria including salmonella per 1 gram — nil. Bacillus per 1 gram — nil",
          },
          {
            label: "Pesticide traces",
            value:
              "Maximum mg/kg basis — DDT 0.005, photoxin 0.01, hexachloran-gamma isomer 0.005",
          },
          { label: "Crop", value: "2024 or more recent crop" },
        ],
      },
      {
        name: "Sunflower oil — refined & crude",
        note: "Product analysis.",
        rows: [
          { label: "Specific density (at 20°C)", value: "0,918 – 0,920" },
          { label: "Refractive index (at 40°C)", value: "1.467 – 1.469" },
          { label: "Transparency of oil, max", value: "10 fem" },
          { label: "Acidity, mg KOH % gm oil max", value: "0,1 – 0,6" },
          { label: "Peroxide value, mMol/kg oil max", value: "0,1 – 0,7" },
          { label: "Colour value iodine, mg max", value: "4" },
          { label: "Iodine value (WIJS)", value: "110 – 144" },
          { label: "Moisture & volatile, % max", value: "0,06" },
          { label: "Saponification value, mg KOH/gm oil", value: "188 – 194" },
          { label: "Phosphorus containing matter (P₂O₅)", value: "Negative" },
          { label: "Non-fatty impurities, % max", value: "Negative" },
          { label: "Colouring materials", value: "According to the international standards" },
          { label: "Artificial flavours", value: "According to the international standards" },
          { label: "Anti-oxidants", value: "200 mg/kg, but galate not more than 100 mg/kg" },
          { label: "Preservative agent", value: "According to the international standards" },
          { label: "Anti-foaming", value: "10 mg/kg" },
          { label: "Anti-crystallization", value: "1250 mg/kg" },
          { label: "Soap content", value: "0,005 max" },
          { label: "Insoluble impurities, % mass", value: "0,5 max" },
        ],
      },
      {
        name: "Sunflower oil — at loading",
        note: "Test methods and limits applied at the point of loading.",
        rows: [
          { label: "FFA (%), NEN-EN-ISO 660", value: "max 3.0" },
          { label: "Moisture (%), NEN-EN-ISO 662", value: "max 0.5" },
          { label: "Impurities (%), NEN-EN-ISO", value: "663" },
          { label: "Colour Lovibond (5¼ inch), NEN", value: "6308" },
          { label: "Peroxide value at loading (meq/kg), NEN-EN-ISO", value: "3960" },
          { label: "Relative density at 20°C, NEN", value: "6311" },
          { label: "Iodine value (g 12/100g), NEN-EN-ISO", value: "3961" },
          { label: "Flash point", value: "Min 121°C" },
          {
            label: "Microbiological safety",
            value:
              "Oil does not contain water, so micro-organisms cannot grow. As long as the packaging stays closed, contamination is not an option.",
          },
        ],
      },
      {
        name: "Soybean oil — refined, crude & crude degummed",
        note: "Product analysis.",
        rows: [
          {
            label: "FFA (as oleic, molecular weight 282)",
            value: "Basis 1.00%, maximum 1.25%",
          },
          {
            label: "Lecithin (expressed as phosphorous)",
            value: "Basis 0.020%, maximum 0.025%",
          },
          { label: "Sediment (Gardner break test)", value: "Maximum 0.10%" },
          { label: "Impurities (insoluble in petrol ether)", value: "Maximum 0.10%" },
          { label: "Moisture and volatile matter", value: "Maximum 0.20%" },
          { label: "Unsaponifiable matter (per N.S.P.A.)", value: "Maximum 1.50%" },
          {
            label: "Colour (Lovibond cell 1 inch)",
            value: "Basis: not darker than 50 yellow plus 5 red",
          },
        ],
      },
      {
        name: "Soybean oil — at loading",
        note: "Test methods and limits applied at the point of loading.",
        rows: [
          { label: "FFA (%), NEN-EN-ISO 660", value: "max 0,1" },
          { label: "Moisture (%), NEN-EN-ISO 662", value: "max 0,05" },
          { label: "Impurities (%), NEN-EN-ISO 663", value: "Negative" },
          { label: "Colour Lovibond (5¼ inch), NEN 6308", value: "15Y, 1,5R" },
          { label: "Peroxide value at loading (meq/kg), NEN-EN-ISO 3960", value: "max 1.0" },
          { label: "Relative density at 20°C, NEN 6311", value: "0,91 – 0,93" },
          { label: "Iodine value (g 12/100g), own method", value: "125 – 140" },
        ],
      },
      {
        name: "Corn oil — refined & crude",
        note: "Product analysis.",
        rows: [
          { label: "Fatty acids (F.F.A.)", value: "0.1" },
          { label: "Specific gravity (25°C)", value: "0.915 – 0.922" },
          { label: "Moisture", value: "0" },
          { label: "Unsaponifiable", value: "2.0 max" },
          { label: "Impurities", value: "0" },
          { label: "Saponification value", value: "187 – 193" },
          { label: "Peroxide value", value: "At the time of loading, max 1" },
          { label: "Refractive index (25°C)", value: "1.47 – 1.474" },
          { label: "Iodine number", value: "103 – 128, odour deodorised" },
          { label: "Titre", value: "14 – 20, taste bland" },
        ],
      },
      {
        name: "Corn oil — specification",
        rows: [
          { label: "FFA (as oleic)", value: "3% max" },
          { label: "Moisture / impurities", value: "0.5% max" },
          { label: "Refraction index", value: "1.4719 – 1.4740 @ 25°C" },
          { label: "Iodine index", value: "120 – 144" },
          { label: "Saponification number", value: "187 / 192" },
          { label: "Non-saponification matter", value: "1.0% max" },
          { label: "Soluble in petrol ether", value: "0.1% max" },
          { label: "Sediment", value: "0.3% max" },
          { label: "Flash point", value: "121°C min" },
          { label: "Peroxide", value: "2.0 meq O₂/kg" },
        ],
      },
      {
        name: "Palm oil — refined & crude",
        note: "Product analysis.",
        rows: [
          { label: "Free fatty acid", value: "Max 0.1%" },
          { label: "Moisture", value: "Max 0.1%" },
          { label: "Iodine value", value: "Min 56 WIJ’s" },
          { label: "Slip melting point", value: "Max 24°C" },
          { label: "Colour (5.25″ LBD)", value: "Max 3R" },
          { label: "Cloud point", value: "Max 10°C" },
          {
            label: "Appearance",
            value: "White to pale yellow, solid to semi-solid lard-like fat",
          },
          { label: "Flavour and odour", value: "Bland, odourless" },
        ],
      },
      {
        name: "Palm oil — specification",
        rows: [
          { label: "FFA (%)", value: "Max 0.10" },
          { label: "Moisture & impurities", value: "Max 0.10" },
          { label: "IV", value: "48 – 56" },
          { label: "Melting point", value: "38" },
          { label: "Oxidative stability", value: "Min 12" },
          { label: "Density, 20°C", value: "912 kg/m³" },
          { label: "Density, 50°C", value: "892 kg/m³" },
          { label: "Flame point", value: "360°C" },
          { label: "Flash point", value: "320°C" },
          { label: "Viscosity, 50°C", value: "28 mm²/s" },
          { label: "Cetane number", value: "50" },
          { label: "Caloric value", value: "Min 37000 kJ/kg" },
          { label: "Sulphur", value: "3 mg/kg" },
          { label: "Phosphor", value: "1.6 mg/kg" },
          { label: "Carbon residue", value: "0.30 wt.%" },
        ],
      },
    ],
    packaging: [
      {
        name: "Bulk vessel",
        body: "Whole cargo holds for grain, sugar and fertiliser, discharged at the receiving port.",
      },
      {
        name: "Flexitank",
        body: "A lined bladder inside a standard container, for edible oil moving in container lots rather than parcel tanker.",
      },
      {
        name: "IBC tote",
        body: "Intermediate bulk containers, for oil going to a blender or processor in smaller quantities.",
      },
      {
        name: "Big bag / FIBC",
        body: "Bulk bags for sugar, corn and urea, handled by forklift at both ends.",
      },
      {
        name: "Road tanker",
        body: "Bulk discharge direct to a refinery, blending plant or bottling line.",
      },
      {
        name: "Retail packs",
        body: "Bottled and pouched cooking oil, under a buyer's own label.",
      },
    ],
    certifications: {
      note: "Standards the commodity supply is certified against, as published in the division's trade portfolio. Certification sits with the producing mills, refineries and packers — it is what the goods are certified to, not a claim about the trading desk.",
      registration: { label: "GACC registration", value: "72422000185" },
      items: [
        "Halal",
        "ISO 9001",
        "ISO 14001:2015",
        "OHSAS 18001",
        "FSSC 22000 — Food Safety System Certification",
        "BRC Food",
        "IFS Global Markets Food",
        "GLOBALG.A.P.",
        "Genesis Standards",
        "Certified Humane",
        "ALO Free",
        "SGS system certification",
      ],
    },
    buyers: [
      "Wholesalers",
      "Supermarket chains",
      "Food manufacturers",
      "Institutional buyers",
      "Government procurement",
      "Importers and distributors",
    ],
    handoff: {
      slug: "logistics",
      note: "Bulk and containerised movement, pre-shipment inspection and the shipping documents, handled inside the group.",
    },
  },

  {
    slug: "industrial-machinery",
    direction: "import",
    index: "02",
    name: "Industrial Machinery & Handling Equipment",
    shortName: "Industrial Machinery",
    discipline: "Plant machinery & materials handling",
    statement: "The machine, the spares that keep it running, and someone who reads the enquiry.",
    summary:
      "Plant machinery, materials handling equipment and the spare parts behind them — sourced against specification for factories, ports and process industry.",
    body: [
      "Industrial machinery is where the division's technical evaluation earns its place. Most enquiries in this category do not arrive as a part number. They arrive as a machine that has stopped, a photograph of a corroded nameplate, or a line in a tender schedule written by someone who was describing a function rather than a product. Working out what is actually needed is the first half of the job.",
      "Supply covers new equipment and the spare parts and consumables that keep existing plant running. The division is a Government A-Class contractor, and pumps, machinery, marine equipment, oil refinery spare parts and industrial generators are among the categories it supplies against public tenders.",
      "The Guangzhou office matters more here than anywhere else in the trade book. A large share of this equipment is manufactured in China, and having people standing in the manufacturing base — able to visit a works, inspect before shipment and hold a supplier to a written specification — is the difference between a catalogue price and a machine that arrives as specified.",
    ],
    range: {
      label: "What we supply",
      note: "New equipment and the spares behind it. Where a part cannot be identified from what you have, identifying it is part of the job rather than a reason to decline the enquiry.",
      items: [
        {
          name: "Materials handling",
          body: "Forklifts, reach and pallet trucks, hoists, winches, conveyors and the attachments that go with them.",
        },
        {
          name: "Pumps",
          body: "Centrifugal, positive displacement and submersible, for process, water and effluent duty.",
        },
        {
          name: "Compressors & air systems",
          body: "Screw and reciprocating compressors, dryers, receivers and distribution pipework.",
        },
        {
          name: "Power generation",
          body: "Industrial diesel generators, alternators, control panels and transfer gear.",
        },
        {
          name: "Process & production machinery",
          body: "Equipment specified against the process it has to run rather than against a catalogue page.",
        },
        {
          name: "Marine & refinery equipment",
          body: "Marine equipment and oil refinery spare parts, largely supplied against public tender.",
        },
        {
          name: "Workshop & maintenance",
          body: "Machine tools, welding plant, lifting tackle, bearings, seals and consumables.",
        },
        {
          name: "Spare parts",
          body: "Original and equivalent parts, cross-referenced where the original is obsolete or the lead time is unworkable.",
        },
      ],
    },
    compliance: {
      label: "What comes with the machine",
      note: "Agreed at quotation rather than discovered at commissioning.",
      items: [
        "Technical datasheet and dimensional drawing",
        "Country of origin and manufacturer's certificate",
        "Pre-shipment inspection at the works",
        "Warranty terms stated in writing",
        "Recommended spare parts holding for the first period of operation",
        "Operation and maintenance manuals in English",
      ],
    },
    buyers: [
      "Manufacturing plants",
      "Ports & terminals",
      "Power & utilities",
      "Oil, gas & refining",
      "Government tender bodies",
      "Contractors",
    ],
    handoff: {
      slug: "logistics",
      note: "Heavy-lift and out-of-gauge movement, port handling and customs clearance.",
    },
  },

  {
    slug: "construction-machinery",
    direction: "import",
    index: "03",
    name: "Construction Heavy Machinery",
    shortName: "Construction Machinery",
    discipline: "Earthmoving, lifting & site plant",
    statement: "Plant that has to be on site the week the programme says, not the week after.",
    summary:
      "Earthmoving, lifting, road-building and concrete plant, new or refurbished, landed against a construction programme rather than a catalogue lead time.",
    body: [
      "Construction plant is bought against a programme, not a wish list. What decides whether a purchase was a good one is whether the machine was on site in the week the works package needed it, and whether the parts to keep it there were already in the country. Both of those are procurement questions before they are equipment questions.",
      "The division supplies earthmoving, lifting, road-building and concrete plant into infrastructure and building work. It has delivered on port infrastructure at Payra — warehouse racking, jetty and street lighting, and building fit-out — where the same programme discipline governs everything.",
      "Refurbished plant is quoted alongside new wherever it is the better answer. A machine with a verified service history and a parts package on the same vessel is often worth more to a two-year programme than a new one with a six-month lead time, and saying so is part of the advice.",
    ],
    range: {
      label: "What we supply",
      note: "Machines, the attachments they work with, and the wear parts that decide how many days a month they are actually available.",
      items: [
        {
          name: "Earthmoving",
          body: "Excavators, wheel loaders, bulldozers, backhoe loaders and skid steers.",
        },
        {
          name: "Road building",
          body: "Rollers, pavers, graders, asphalt plant and cold milling machines.",
        },
        {
          name: "Lifting",
          body: "Mobile, crawler and tower cranes, plus telehandlers and site lifting gear.",
        },
        {
          name: "Concrete",
          body: "Batching plants, transit mixers, concrete pumps and placing booms.",
        },
        {
          name: "Piling & foundation",
          body: "Piling rigs, hammers and drilling equipment.",
        },
        {
          name: "Site support",
          body: "Generators, dewatering pumps, compressors, lighting towers and site accommodation.",
        },
        {
          name: "Attachments",
          body: "Breakers, buckets, grabs, compactors and quick couplers.",
        },
        {
          name: "Undercarriage & wear parts",
          body: "Tracks, rollers, idlers, teeth and cutting edges — the parts that decide machine availability.",
        },
      ],
    },
    compliance: {
      label: "Before it is committed",
      note: "A machine bought without these is a machine bought twice.",
      items: [
        "Model, serial number and year of manufacture confirmed",
        "Hours run and service history, where the plant is not new",
        "Inspection report before shipment",
        "Transport dimensions and weight, for the route as well as the port",
        "Parts availability and lead time for the wear items",
        "Operator and maintenance training where the machine is new to the fleet",
      ],
    },
    buyers: [
      "Contractors",
      "Infrastructure projects",
      "Port & marine works",
      "Government tender bodies",
      "Plant hire fleets",
      "Property developers",
    ],
    handoff: {
      slug: "logistics",
      note: "Breakbulk and out-of-gauge shipping, port handling and inland movement to site.",
    },
  },

  {
    slug: "industrial-chemicals",
    direction: "import",
    index: "04",
    name: "Industrial Chemicals",
    shortName: "Industrial Chemicals",
    discipline: "Process, treatment & textile chemicals",
    statement: "A documentation trade before it is a supply trade.",
    summary:
      "Process, water treatment, textile and cleaning chemicals — supplied with the classification, safety data and handling the category requires by law.",
    body: [
      "Chemicals are the category where getting the paperwork wrong costs more than getting the price wrong. Every line is classified, every line carries a safety data sheet, and a drum that arrives without the right documents does not clear — it sits, accruing storage, while a substitute is bought at spot price.",
      "Industrial chemicals are one of the division's named focus markets, alongside mechanical, electrical and instrumentation products and safety equipment. Textile processing is the largest single source of demand in Bangladesh, and it is the demand this sourcing is built around.",
      "Dangerous goods classification, packing group, UN number and the transport declaration are settled before the order is placed rather than at the port. Where a line is hazardous the freight is booked as hazardous from the start, which is considerably cheaper than establishing it at the terminal gate.",
    ],
    range: {
      label: "What we supply",
      note: "Quoted by grade and concentration, in the pack size the plant actually decants from.",
      items: [
        {
          name: "Textile processing",
          body: "Dyes, pigments, auxiliaries, sizing and finishing chemistry for the mills.",
        },
        {
          name: "Water treatment",
          body: "Coagulants, flocculants, pH correction and effluent treatment chemistry.",
        },
        {
          name: "Boiler & cooling water",
          body: "Scale and corrosion inhibitors, oxygen scavengers and biocides.",
        },
        {
          name: "Solvents & intermediates",
          body: "Bulk solvents and process intermediates in drums, IBCs or ISO tanks.",
        },
        {
          name: "Cleaning & sanitation",
          body: "Industrial detergents, degreasers and food-grade sanitation chemistry.",
        },
        {
          name: "Laboratory reagents",
          body: "Analytical reagents, standards and controls, in the pack sizes a QC lab uses.",
        },
        {
          name: "Construction chemicals",
          body: "Admixtures, curing compounds, grouts and waterproofing systems.",
        },
        {
          name: "Industrial gases",
          body: "Cylinder and bulk supply, with the regulators and handling equipment that go with it.",
        },
      ],
    },
    compliance: {
      label: "What travels with the goods",
      note: "Not negotiable on this category, and settled before the order rather than at the port.",
      items: [
        "Safety data sheet (SDS / MSDS) in current format",
        "UN number, hazard class and packing group",
        "IMDG or IATA declaration where the line is regulated",
        "Certificate of analysis, referenced to the batch",
        "Import permit and any controlled-substance clearance",
        "UN-approved packaging, correctly labelled and marked",
      ],
    },
    buyers: [
      "Textile & garment mills",
      "Water & effluent treatment plants",
      "Food processors",
      "Pharmaceutical manufacturers",
      "Power stations",
      "Laboratories",
    ],
    handoff: {
      slug: "logistics",
      note: "Hazardous-goods booking, declaration and customs clearance handled inside the group.",
    },
  },

  {
    slug: "cosmetics-toiletries",
    direction: "import",
    index: "05",
    name: "Cosmetics & Toiletries",
    shortName: "Cosmetics & Toiletries",
    discipline: "Personal care & household consumer goods",
    statement: "A brand needs a route into Bangladesh, and a shelf once it arrives.",
    summary:
      "Skin care, hair care, oral care, colour cosmetics and household consumer goods — imported for distributors and retail, with the registration each line requires.",
    body: [
      "Cosmetics and toiletries appear in the division's own account of what it sources globally, and they behave unlike anything else in the import book: short shelf lives, batch coding, artwork that has to satisfy a regulator, and a retail buyer who wants the whole range or none of it.",
      "The work is as much registration as sourcing. Consumer cosmetics entering Bangladesh need product registration and labelling that meets local requirement, and a shipment that lands ahead of its registration is a shipment sitting in a bonded warehouse losing shelf life.",
      "The group has its own retail end, which changes what can be offered. Green Mart sells beauty, personal care and health lines online across Bangladesh, so an imported range can reach a customer inside the group rather than only through third-party distribution.",
    ],
    range: {
      label: "What we supply",
      note: "Finished goods for distribution and retail, and the inputs for anyone manufacturing locally.",
      items: [
        { name: "Skin care", body: "Cleansers, moisturisers, serums and sun care." },
        { name: "Hair care", body: "Shampoo, conditioner, treatment and styling ranges." },
        { name: "Oral care", body: "Toothpaste, brushes and mouthwash." },
        { name: "Bath & body", body: "Soap, shower products, deodorant and body lotion." },
        { name: "Colour cosmetics", body: "Face, eye, lip and nail ranges." },
        { name: "Baby & child care", body: "Wash, lotion, oil, powder and wipes." },
        {
          name: "Household & paper",
          body: "Detergent, cleaning products, tissue and hygiene goods.",
        },
        {
          name: "Raw materials & packaging",
          body: "Bases, actives, fragrance and primary packaging for local manufacture.",
        },
      ],
    },
    compliance: {
      label: "Before it ships",
      note: "Shelf life starts at manufacture, not at arrival — which is why most of this is settled at order stage.",
      items: [
        "Product registration and import permit in place",
        "Ingredient listing and free-sale certificate from origin",
        "Batch code with manufacture and expiry dating",
        "Labelling that meets local requirement",
        "Certificate of analysis for the batch",
        "Minimum remaining shelf life written into the contract",
      ],
    },
    buyers: [
      "Distributors",
      "Retail chains",
      "Pharmacies",
      "Salon & professional trade",
      "Online retail",
      "Contract manufacturers",
    ],
    handoff: {
      slug: "green-mart",
      note: "The group's own online retail arm already sells beauty, personal care and health lines across Bangladesh.",
    },
  },

  {
    slug: "medical-diagnostic-equipment",
    direction: "import",
    index: "06",
    name: "Medical & Diagnostic Equipment",
    shortName: "Medical Equipment",
    discipline: "Hospital, laboratory & diagnostic equipment",
    statement: "Equipment that has to be installed, calibrated and still working in year five.",
    summary:
      "Diagnostic, laboratory and hospital equipment with the registration, installation and calibration the category requires — for hospitals, laboratories and public tender.",
    body: [
      "Medical equipment is not a delivered-and-done category. An analyser that arrives without installation, calibration, trained operators and a reagent supply behind it is a capital item that cannot be used, and most of the cost of getting it wrong lands after the invoice is settled.",
      "Supply covers diagnostic and laboratory equipment, patient monitoring, theatre equipment, and the consumables and reagents that run through them. Public health procurement is a significant part of it, supplied as a Government A-Class contractor through the e-GP system.",
      "Registration comes first. Medical devices entering Bangladesh require Directorate General of Drug Administration clearance, and the route differs by device class. It is confirmed at enquiry stage, because it sets the lead time more often than the manufacturer does.",
    ],
    range: {
      label: "What we supply",
      note: "Capital equipment quoted with what it takes to run it, rather than as a box on a pallet.",
      items: [
        {
          name: "Diagnostic imaging",
          body: "X-ray, ultrasound and imaging systems, with the siting and shielding they require.",
        },
        {
          name: "Laboratory analysers",
          body: "Haematology, biochemistry, immunoassay and microbiology platforms.",
        },
        {
          name: "Patient monitoring",
          body: "Bedside and central monitoring, ECG, pulse oximetry and defibrillators.",
        },
        {
          name: "Theatre & surgical",
          body: "Operating tables, lights, electrosurgery and sterilisation equipment.",
        },
        {
          name: "Hospital furniture",
          body: "Beds, trolleys, examination couches and ward equipment.",
        },
        {
          name: "Reagents & consumables",
          body: "Closed and open-system reagents, controls, calibrators and disposables.",
        },
        {
          name: "Point-of-care diagnostics",
          body: "Bench and field diagnostic kits and their readers.",
        },
        {
          name: "Service & calibration",
          body: "Installation, commissioning, operator training and scheduled calibration.",
        },
      ],
    },
    compliance: {
      label: "What the category demands",
      note: "Confirmed at enquiry, because it sets the delivery date more often than the factory does.",
      items: [
        "DGDA registration appropriate to the device class",
        "Free-sale certificate and origin-market approval evidence",
        "Installation, commissioning and operator training",
        "Calibration certificates traceable to standard",
        "Cold-chain handling for reagents and controls",
        "Committed spare parts and service support after handover",
      ],
    },
    buyers: [
      "Hospitals & clinics",
      "Diagnostic laboratories",
      "Public health procurement",
      "Research institutions",
      "Medical distributors",
      "Development programmes",
    ],
    handoff: {
      slug: "logistics",
      note: "Temperature-controlled and air freight movement for reagents, with customs handled inside the group.",
    },
  },

  /* ---------------------------------------------------------------- *
   * Out of Bangladesh — export
   * ---------------------------------------------------------------- */
  {
    slug: "jute-products",
    direction: "export",
    index: "01",
    name: "Jute & Jute Products",
    shortName: "Jute",
    discipline: "Raw jute, yarn & manufactured goods",
    statement: "The fibre the country is known for, graded before it is baled.",
    summary:
      "Raw jute, yarn, hessian, sacking and manufactured jute goods, shipped from Bangladeshi mills into international markets.",
    body: [
      "Jute products head the division's export list, and it is the line where Bangladeshi origin is itself part of the specification — buyers ask for Bangladeshi raw jute by grade because the fibre is what it is. Export covers raw fibre, yarn and manufactured goods.",
      "Grade is everything, and it is settled before baling. Raw jute is contracted to Tossa and White grades, yarn to count and ply, cloth to weight, width and mesh. What ships is what was graded, and pre-shipment inspection is what keeps those two the same thing.",
      "Demand has moved. The traditional sacking trade still runs, but the growth is in jute as a substitute for plastic — shopping bags, geotextiles and packaging into markets legislating single-use plastic out. That is a different buyer with different artwork and different compliance requirements, and it is quoted differently.",
    ],
    range: {
      label: "What we export",
      note: "From raw fibre through to finished goods made to a buyer's own design.",
      items: [
        {
          name: "Raw jute",
          body: "Tossa and White grades, graded and baled for shipment.",
        },
        {
          name: "Jute yarn & twine",
          body: "Single and multi-ply, by count, for weaving and cordage.",
        },
        {
          name: "Hessian & burlap",
          body: "Cloth by weight, width and mesh, in rolls or made up.",
        },
        {
          name: "Sacking & bags",
          body: "Food-grade sacks for grain, coffee, cocoa and sugar.",
        },
        {
          name: "Shopping & promotional bags",
          body: "Laminated and unlaminated, printed to the buyer's own artwork.",
        },
        {
          name: "Geotextiles",
          body: "Soil stabilisation and erosion control fabric for civil works.",
        },
        {
          name: "Home & lifestyle",
          body: "Rugs, floor coverings, storage and interior goods.",
        },
        {
          name: "Composites & felt",
          body: "Boards, felt and blended material for industrial use.",
        },
      ],
    },
    compliance: {
      label: "How a shipment is controlled",
      note: "Natural fibre in a container across the tropics is a moisture problem before it is anything else.",
      items: [
        "Grade confirmed and marked at baling",
        "Moisture content specified and measured before loading",
        "Fumigation and treatment certificate",
        "Certificate of origin and phytosanitary certificate where required",
        "Food-grade declaration where the sacking will hold food",
        "Pre-shipment inspection against the contracted grade",
      ],
    },
    buyers: [
      "Packaging converters",
      "Coffee & cocoa trade",
      "Retail & grocery chains",
      "Civil engineering contractors",
      "Home & interior brands",
      "Importers in Europe, the Middle East and Africa",
    ],
    handoff: {
      slug: "logistics",
      note: "Containerised export, consolidation and the shipping documents, handled inside the group.",
    },
  },

  {
    slug: "handicrafts",
    direction: "export",
    index: "02",
    name: "Handicrafts",
    shortName: "Handicrafts",
    discipline: "Artisan-made home & lifestyle goods",
    statement: "Made by hand — which is the point, and also the operational problem.",
    summary:
      "Artisan-made basketry, textiles, ceramics and metalwork from Bangladeshi producer groups, consolidated to order for retail and wholesale buyers.",
    body: [
      "Handicraft is the least industrial thing the division moves. Every unit is made by hand by a small producer, which is exactly what the buyer is paying for and exactly what makes the order difficult to run: capacity is people, not machines, and it cannot be doubled because a peak season is coming.",
      "The work is consolidation and quality control. One container is assembled from many workshops, each with its own tolerance for colour, size and finish, and the buyer's tolerance is usually narrower than any of theirs. A counter-sample, an agreed variance range and inspection before packing are what make the shipment acceptable on arrival.",
      "Natural fibre carries its own risk. Seagrass, water hyacinth and cane have to be dried to a moisture content that survives a sea voyage through the tropics; anything wetter arrives with mould through the consignment. Drying, treatment and moisture-controlled packing are part of the specification, not a precaution.",
    ],
    range: {
      label: "What we export",
      note: "Existing ranges, or made to a buyer's own design against an approved sample.",
      items: [
        {
          name: "Basketry",
          body: "Seagrass, water hyacinth, cane and palm leaf — baskets, storage and planters.",
        },
        {
          name: "Bamboo & cane",
          body: "Furniture, screens, lighting and homeware.",
        },
        {
          name: "Nakshi kantha & textile craft",
          body: "Hand-stitched quilts, throws and embroidered textiles.",
        },
        {
          name: "Terracotta & ceramics",
          body: "Hand-thrown and moulded pottery, tableware and decorative ware.",
        },
        {
          name: "Brass & metal craft",
          body: "Cast and beaten brass, copper and decorative metalwork.",
        },
        {
          name: "Leather goods",
          body: "Bags, accessories and small leather goods.",
        },
        {
          name: "Handloom textiles",
          body: "Cotton and silk handloom cloth, scarves and made-up goods.",
        },
        {
          name: "Seasonal & gift lines",
          body: "Festive and gift ranges, produced to a buyer's own brief.",
        },
      ],
    },
    compliance: {
      label: "How an order is controlled",
      note: "A handmade product needs a tolerance written down, or every shipment becomes an argument.",
      items: [
        "Counter-sample approved before production starts",
        "Agreed variance range for colour, size and finish",
        "Moisture content specified for natural fibre",
        "Fumigation and treatment certificate",
        "Inspection before packing rather than after",
        "Consolidation from multiple workshops into a single shipment",
      ],
    },
    buyers: [
      "Retail & department stores",
      "Home & interior brands",
      "Fair trade importers",
      "Gift & seasonal buyers",
      "Online sellers",
      "Wholesale distributors",
    ],
    handoff: {
      slug: "logistics",
      note: "LCL consolidation for mixed workshop orders, and full-container export when the volume is there.",
    },
  },

  {
    slug: "consumer-food-products",
    direction: "export",
    index: "03",
    name: "Consumer Food Products",
    shortName: "Food Products",
    discipline: "Packaged & processed food",
    statement: "Bangladeshi food brands, on the shelves where they are already asked for.",
    summary:
      "Packaged and processed food from Bangladeshi manufacturers — snacks, spices, staples and prepared foods — exported to retail and distribution across Asia, the Middle East, Europe and North America.",
    body: [
      "Food products are one of the four export lines the division names, and the buyer is usually specific: a distributor supplying South Asian grocery in a market with a large Bangladeshi population. The demand is for recognised brands, not for a generic equivalent, which makes the sourcing a question of who can be represented rather than who is cheapest.",
      "The destination writes the specification. Labelling, nutrition declaration, allergen statement, shelf-life coding and permitted additives all follow the importing country's rules, and a run produced for the domestic market almost never satisfies them. Export artwork is agreed before production rather than corrected after it.",
      "Halal certification, health certificates and batch-level analysis travel with the shipment. So does remaining shelf life — a distributor buys against a minimum residual life at the point of arrival, and that figure belongs in the contract rather than in an assumption.",
    ],
    range: {
      label: "What we export",
      note: "Branded manufacturer product, or packed under a buyer's own label.",
      items: [
        {
          name: "Snacks & confectionery",
          body: "Biscuits, chips, chanachur, sweets and bakery.",
        },
        {
          name: "Spices & seasoning",
          body: "Whole and ground spice, blends, curry pastes and masalas.",
        },
        {
          name: "Staples in retail packs",
          body: "Rice, pulses, flour and semolina, branded and packed for shelf.",
        },
        {
          name: "Edible oil, retail",
          body: "Bottled and pouched cooking oil, under a local brand or a buyer's own label.",
        },
        {
          name: "Ready & frozen foods",
          body: "Frozen paratha, samosa, roti and prepared meals.",
        },
        {
          name: "Pickles, chutney & preserves",
          body: "Achar, chutney and preserved vegetables in glass and pouch.",
        },
        {
          name: "Beverages",
          body: "Juice, drink concentrate, tea and instant mixes.",
        },
        {
          name: "Bakery & dairy ingredients",
          body: "Powdered dairy product, mixes and bakery inputs.",
        },
      ],
    },
    compliance: {
      label: "What the destination requires",
      note: "The importing market sets these, not the producer — so they are confirmed before the production run.",
      items: [
        "Halal certification where the market requires it",
        "Health certificate and certificate of analysis",
        "Labelling to the destination's food regulation",
        "Nutrition and allergen declaration",
        "Minimum residual shelf life agreed in the contract",
        "Batch coding traceable to the production run",
      ],
    },
    buyers: [
      "Grocery distributors",
      "Supermarket chains",
      "Cash & carry wholesalers",
      "Food service",
      "Online grocery",
      "Importers in the Middle East, Europe and North America",
    ],
    handoff: {
      slug: "logistics",
      note: "Containerised and reefer export, consolidation and the export documentation.",
    },
  },

  {
    slug: "fresh-produce",
    direction: "export",
    index: "04",
    name: "Fresh Fruits & Vegetables",
    shortName: "Fresh Produce",
    discipline: "Perishables & cold chain",
    statement: "A crop with a clock on it, from the field to an aircraft hold.",
    summary:
      "Seasonal Bangladeshi vegetables, fruit and herbs, exported under cold chain and phytosanitary certification — most of it by air.",
    body: [
      "Fresh produce is the hardest thing in the trade book to move and the only category where the product is degrading from the moment it is picked. Fruits and vegetables are two of the division's four named export lines, and most of it goes by air, because the shelf life will not survive a sea voyage.",
      "The cold chain is the product. Field heat is taken out before packing, temperature is held through packhouse, transit and aircraft hold, and every break in it comes off the shelf life at the far end. A consignment that has been warm for six hours cannot be recovered by anything that happens to it afterwards.",
      "Phytosanitary certification governs access, and it is not uniform. Each destination sets its own pest and residue requirements, and particular Bangladeshi produce lines have been restricted into particular markets before now. What can ship where is confirmed before the crop is committed rather than after it is picked.",
    ],
    range: {
      label: "What we export",
      note: "Seasonal by definition — availability follows the harvest calendar rather than an order book.",
      items: [
        {
          name: "Vegetables",
          body: "Potato, aubergine, okra, gourds, beans, chilli and green banana.",
        },
        {
          name: "Leafy & herbs",
          body: "Coriander, mint, spinach and local leafy varieties.",
        },
        {
          name: "Betel leaf",
          body: "Graded and packed for the markets that take it.",
        },
        {
          name: "Seasonal fruit",
          body: "Mango, jackfruit, guava, lychee, lemon and lime, in season.",
        },
        {
          name: "Roots & tubers",
          body: "Potato, sweet potato, ginger and turmeric.",
        },
        {
          name: "Frozen vegetables",
          body: "Individually quick frozen and block frozen, where sea freight becomes viable.",
        },
        {
          name: "Dried & dehydrated",
          body: "Dried chilli, turmeric and dehydrated vegetables.",
        },
        {
          name: "Retail packs",
          body: "Punnets, sleeved and labelled packs to a retailer's own format.",
        },
      ],
    },
    compliance: {
      label: "What the category demands",
      note: "Every item here is a condition of entry somewhere. None of it can be arranged retrospectively.",
      items: [
        "Phytosanitary certificate for the destination",
        "Pesticide residue analysis against the importing market's limits",
        "Pre-cooling and an unbroken cold chain to the aircraft",
        "Vapour heat or hot water treatment where the market requires it",
        "Packhouse hygiene and traceability back to the grower",
        "Airline space held against the harvest date, not the other way round",
      ],
    },
    buyers: [
      "Grocery distributors",
      "Wholesale markets",
      "Supermarket produce buyers",
      "Food service",
      "Processors",
      "Importers in the Middle East, Europe and Asia",
    ],
    handoff: {
      slug: "logistics",
      note: "Time-critical air freight, where transit time outweighs unit cost by a wide margin.",
    },
  },
];

export const tradeBySlug = Object.fromEntries(
  tradeCategories.map((category) => [category.slug, category])
) as Record<string, TradeCategory>;

export function getTradeCategory(slug: string): TradeCategory | undefined {
  return tradeBySlug[slug];
}

export const tradeImports = tradeCategories.filter((c) => c.direction === "import");
export const tradeExports = tradeCategories.filter((c) => c.direction === "export");

export const directionLabels: Record<TradeDirection, { label: string; note: string }> = {
  import: {
    label: "Import",
    note: "Sourced globally, qualified against a written specification, and delivered against a local requirement.",
  },
  export: {
    label: "Export",
    note: "Bangladeshi production placed into international markets, with the certification each destination asks for.",
  },
};

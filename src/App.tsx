import { FormEvent, ReactNode, useRef, useState } from "react"

type IconName = "arrow" | "book" | "brain" | "camera" | "chart" | "check" | "chevron" | "cloud" | "database" | "droplet" | "leaf" | "menu" | "mic" | "paperclip" | "phone" | "scan" | "send" | "shield" | "sparkles" | "sprout" | "sun" | "trending" | "upload" | "warning" | "x"

const iconPaths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 .5 5.5A3 3 0 0 0 7 17v.5a2.5 2.5 0 0 0 5 0V6a3 3 0 0 0-2.5-1.5Z" />
      <path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1-.5 5.5A3 3 0 0 1 17 17v.5a2.5 2.5 0 0 1-5 0V6a3 3 0 0 1 2.5-1.5Z" />
      <path d="M8 9h.01M16 9h.01M8 14h.01M16 14h.01" />
    </>
  ),
  camera: (
    <>
      <path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19H2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  cloud: (
    <>
      <path d="M17.5 19H7a5 5 0 1 1 1.4-9.8A6 6 0 0 1 20 11a4 4 0 0 1-2.5 8Z" />
      <path d="M12 2v2" />
      <path d="m4.9 4.9 1.4 1.4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  droplet: (
    <path d="M12 2S5.5 9.1 5.5 14a6.5 6.5 0 0 0 13 0C18.5 9.1 12 2 12 2Z" />
  ),
  leaf: (
    <>
      <path d="M20.8 3.2C13 3 6 4.3 4.1 9.1c-1.4 3.6.4 7.2 3.9 7.9 5.6 1.1 10.8-5 12.8-13.8Z" />
      <path d="M3 21c3.6-6.5 7.5-9.6 13-12" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M12 17v4" />
    </>
  ),
  paperclip: (
    <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 1 1-2.8-2.8l8.9-8.9" />
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M9 18h6" />
    </>
  ),
  scan: (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 12h8" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2Z" />
      <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7Z" />
      <path d="m5 14-.7 1.3L3 16l1.3.7L5 18l.7-1.3L7 16l-1.3-.7Z" />
    </>
  ),
  sprout: (
    <>
      <path d="M7 20h10" />
      <path d="M12 20V9" />
      <path d="M12 13C8 13 5 10.5 5 7c4 0 7 2.5 7 6Z" />
      <path d="M12 10c0-3.5 3-6 7-6 0 3.5-3 6-7 6Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </>
  ),
  trending: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 3.5 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  x: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
}

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-2.5 ${
        light ? "text-white" : "text-forest"
      }`}
      aria-label="Cultiva Health home"
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl ${
          light ? "bg-white/10" : "bg-forest text-white"
        }`}
      >
        <Icon name="leaf" size={21} />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Cultiva{" "}
        <span className={light ? "text-mint" : "text-emerald"}>Health</span>
      </span>
    </a>
  )
}

function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  className?: string
  type?: "button" | "submit"
  onClick?: () => void
}) {
  const variants = {
    primary: "bg-forest text-white shadow-button hover:bg-forest-light",
    secondary:
      "border border-line bg-white text-forest hover:border-emerald/40 hover:bg-mint-pale",
    ghost: "text-slate hover:bg-slate/5",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

const navLinks = [
  "Dashboard",
  "AI Crop Doctor",
  "Weather & Soil",
  "Community",
  "Enterprise",
]

function Metric({
  icon,
  label,
  value,
  detail,
  tone = "green",
}: {
  icon: IconName
  label: string
  value: string
  detail: string
  tone?: "green" | "amber" | "blue"
}) {
  const tones = {
    green: "bg-mint-pale text-emerald",
    amber: "bg-amber-pale text-amber",
    blue: "bg-sky-pale text-sky",
  }
  return (
    <article className="flex min-w-0 items-center gap-3 border-r border-line px-5 last:border-r-0">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[tone]}`}
      >
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-muted">{label}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <strong className="text-sm font-semibold text-slate">{value}</strong>
          <span className="hidden text-xs text-muted sm:inline">{detail}</span>
        </div>
      </div>
    </article>
  )
}

function DiagnosisCard({
  icon,
  label,
  children,
  accent = "green",
}: {
  icon: IconName
  label: string
  children: ReactNode
  accent?: "green" | "amber" | "blue"
}) {
  const colors = {
    green: "bg-mint-pale text-emerald",
    amber: "bg-amber-pale text-amber",
    blue: "bg-sky-pale text-sky",
  }
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center gap-2">
        <span
          className={`grid h-7 w-7 place-items-center rounded-lg ${colors[accent]}`}
        >
          <Icon name={icon} size={15} />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate">{children}</div>
    </div>
  )
}

const schemaTables = [
  {
    name: "users",
    icon: "phone" as IconName,
    description: "Farmer and enterprise identities",
    fields: [
      ["user_id", "UUID", "PK"],
      ["full_name", "VARCHAR", ""],
      ["phone_number", "VARCHAR", "UNIQUE"],
      ["location", "VARCHAR", ""],
      ["role", "USER_ROLE", ""],
      ["created_at", "TIMESTAMP", ""],
    ],
  },
  {
    name: "farms",
    icon: "sprout" as IconName,
    description: "Managed land plots and crop context",
    fields: [
      ["farm_id", "UUID", "PK"],
      ["user_id", "UUID", "FK"],
      ["farm_name", "VARCHAR", ""],
      ["total_area_acres", "DECIMAL", ""],
      ["soil_type", "VARCHAR", ""],
      ["primary_crop", "VARCHAR", ""],
    ],
  },
  {
    name: "ai_diagnoses",
    icon: "brain" as IconName,
    description: "Multimodal AI interactions and results",
    fields: [
      ["diagnosis_id", "UUID", "PK"],
      ["user_id", "UUID", "FK"],
      ["farm_id", "UUID", "NULL · FK"],
      ["image_url", "TEXT", "NULL"],
      ["farmer_query", "TEXT", ""],
      ["identified_disease", "VARCHAR", ""],
      ["confidence_score", "DECIMAL", ""],
      ["severity", "SEVERITY", ""],
    ],
  },
  {
    name: "agricultural_knowledge_base",
    icon: "book" as IconName,
    description: "Verified agronomic reference content",
    fields: [
      ["knowledge_id", "UUID", "PK"],
      ["crop_name", "VARCHAR", ""],
      ["pest_or_disease_name", "VARCHAR", ""],
      ["symptoms", "TEXT", ""],
      ["organic_remedies", "TEXT", ""],
      ["chemical_treatments", "TEXT", ""],
      ["preventative_tips", "TEXT", ""],
    ],
  },
]

const architectureSteps = [
  {
    number: "01",
    icon: "camera" as IconName,
    title: "Multimodal input",
    description:
      "A farmer captures a crop image and adds context through text or voice in their preferred language.",
    tags: ["Image", "Text", "Voice"],
  },
  {
    number: "02",
    icon: "brain" as IconName,
    title: "AI reasoning engine",
    description:
      "A multimodal model evaluates visual symptoms, field context, crop type, and regional conditions.",
    tags: ["Vision LLM", "Context"],
  },
  {
    number: "03",
    icon: "database" as IconName,
    title: "Trusted retrieval",
    description:
      "Vector search cross-references extension manuals, pesticide guidance, and verified crop records.",
    tags: ["RAG", "Vector DB"],
  },
  {
    number: "04",
    icon: "shield" as IconName,
    title: "Actionable guidance",
    description:
      "The platform returns a clear diagnosis, confidence level, treatment options, and prevention plan.",
    tags: ["Diagnosis", "Treatment"],
  },
]

type AgronomyAdvice = {
  diagnosis: string
  summary: string
  urgency: string
  checks: string[]
  organic: string
  chemical: string
  prevention: string[]
}

type ChatEntry = {
  query: string
  advice: AgronomyAdvice
}

function getAgronomyAdvice(query: string): AgronomyAdvice {
  const normalized = query.toLowerCase()

  if (
    normalized.includes("nitrogen") ||
    normalized.includes("nitrogen deficient")
  ) {
    return {
      diagnosis: "Likely nitrogen deficiency",
      summary:
        "Nitrogen moves from older tissue to new growth, so the oldest leaves usually turn evenly pale green or yellow first. Plants may also be thin, slow-growing, and produce smaller leaves or reduced tillering.",
      urgency: "Correct soon · confirm before a heavy application",
      checks: [
        "Compare older lower leaves with the newest growth; nitrogen deficiency starts low and moves upward.",
        "Check whether yellowing is uniform rather than spotted or limited between green veins.",
        "Confirm with a soil or leaf-tissue test, especially after heavy rain that may have leached nitrogen.",
      ],
      organic:
        "Side-dress with mature compost or well-composted manure. For a faster response, use a measured nitrogen source such as blood meal or fish emulsion, then water it into the root zone.",
      chemical:
        "Use a nitrogen fertilizer such as urea (46-0-0) or ammonium sulfate according to a soil-test recommendation and the crop label. Split the dose rather than applying it all at once, and keep granules off wet leaves.",
      prevention: [
        "Test soil before each main season and record crop nutrient removal.",
        "Plant legumes or a nitrogen-fixing cover crop in rotation.",
        "Use split applications around peak crop demand to reduce leaching and burn.",
      ],
    }
  }

  if (
    normalized.includes("tomato") &&
    (normalized.includes("curl") || normalized.includes("rolling"))
  ) {
    return {
      diagnosis: "Tomato leaf curl · three likely causes",
      summary:
        "Upward rolling on older leaves with otherwise normal green growth usually points to heat, irregular watering, or heavy pruning. Small, twisted new leaves with yellow margins and stunting can indicate tomato yellow leaf curl virus. Sticky leaves, cast skins, or insects underneath suggest aphids or whiteflies.",
      urgency: "Inspect today · isolate plants if new growth is distorted",
      checks: [
        "Look underneath curled leaves for aphids, whiteflies, sticky honeydew, or pale shed skins.",
        "Check which leaves curl: older leaves suggest stress; distorted yellow new growth raises concern for virus.",
        "Review the last week of heat, pruning, root disturbance, and uneven watering.",
      ],
      organic:
        "Restore even soil moisture with deep morning watering and mulch. For aphids or whiteflies, rinse leaf undersides and apply insecticidal soap or neem in the cool part of the day, repeating only as the label allows.",
      chemical:
        "There is no chemical cure for a viral infection; remove and bag strongly affected plants. If vectors are confirmed, use only a locally registered aphid or whitefly product and rotate active ingredients to slow resistance.",
      prevention: [
        "Use virus-resistant tomato varieties where yellow leaf curl is common.",
        "Control weeds and whiteflies before transplanting.",
        "Avoid severe pruning and keep root-zone moisture consistent.",
      ],
    }
  }

  if (
    normalized.includes("brown spot") ||
    normalized.includes("black spot") ||
    normalized.includes("yellow edge")
  ) {
    return {
      diagnosis: "Possible fungal leaf spot or early blight",
      summary:
        "Brown lesions with yellow halos after humid weather often indicate a fungal leaf spot. On tomato or potato, target-like rings beginning on lower leaves strongly suggest early blight. Angular, water-soaked spots may instead be bacterial.",
      urgency: "Act within 24–48 hours if spots are spreading",
      checks: [
        "Inspect lower and inner leaves for concentric target-like rings.",
        "Check whether spots cross leaf veins; angular lesions restricted by veins can indicate bacterial disease.",
        "Note recent overhead irrigation, rainfall, humidity, and whether foliage stays wet overnight.",
      ],
      organic:
        "Remove heavily affected lower leaves, disinfect tools, improve airflow, and water only at soil level. A labeled copper or biofungicide can protect uninfected growth but will not repair existing spots.",
      chemical:
        "For a confirmed fungal disease, use a locally registered protectant such as chlorothalonil or mancozeb exactly as labeled. Rotate fungicide groups and observe harvest intervals.",
      prevention: [
        "Space and stake plants to improve airflow.",
        "Rotate away from the same crop family for two to three seasons.",
        "Remove infected residue and avoid working plants while leaves are wet.",
      ],
    }
  }

  if (
    normalized.includes("yellow") ||
    normalized.includes("chlorosis") ||
    normalized.includes("pale")
  ) {
    return {
      diagnosis: "Leaf yellowing · nutrient or root-zone stress",
      summary:
        "The leaf age and pattern separate the main causes: uniform yellowing on older leaves suggests nitrogen shortage; yellow young leaves with green veins suggests iron lockout; yellowing plus soft soil or drooping often points to overwatering and weak roots.",
      urgency: "Diagnose the pattern before adding fertilizer",
      checks: [
        "Identify whether the oldest or newest leaves yellowed first.",
        "Check soil moisture several centimeters below the surface and inspect drainage.",
        "Look for green veins, root browning, pests, or a sharp boundary between healthy and affected areas.",
      ],
      organic:
        "Correct drainage and watering first. If older leaves are uniformly pale, apply compost or a measured organic nitrogen feed. For high-pH soil causing iron lockout, add compost and use chelated iron only after checking pH.",
      chemical:
        "Use a soil or tissue test to select the missing nutrient. Apply a balanced or single-nutrient fertilizer at the labeled crop rate; avoid adding nitrogen when only new leaves are affected.",
      prevention: [
        "Test soil pH and nutrients before planting.",
        "Maintain drainage and consistent—not constantly wet—soil moisture.",
        "Keep a field log showing which leaves developed symptoms first.",
      ],
    }
  }

  if (
    normalized.includes("hole") ||
    normalized.includes("aphid") ||
    normalized.includes("insect") ||
    normalized.includes("pest")
  ) {
    return {
      diagnosis: "Likely chewing or sap-feeding pest activity",
      summary:
        "Irregular holes and droppings suggest caterpillars; many tiny round holes suggest flea beetles; ragged damage with slime points to slugs. Curling, sticky leaves without holes are more consistent with aphids or whiteflies.",
      urgency: "Scout now · treat only if active pests are present",
      checks: [
        "Inspect leaf undersides and growing tips early morning with a hand lens.",
        "Look for caterpillar droppings, webbing, slime trails, sticky honeydew, and beneficial insects.",
        "Count affected plants across several field locations rather than checking one plant.",
      ],
      organic:
        "Hand-remove larger pests where practical. Use Bt for confirmed young caterpillars, iron-phosphate bait for slugs, or insecticidal soap for aphids, following the product label.",
      chemical:
        "Select a locally registered product for the pest you actually identify. Avoid broad-spectrum spraying during bloom, protect pollinators, and rotate insecticide groups.",
      prevention: [
        "Scout weekly and remove weed hosts around the crop.",
        "Use row covers before flowering where appropriate.",
        "Preserve lady beetles, lacewings, parasitoids, and other natural enemies.",
      ],
    }
  }

  if (
    normalized.includes("irrigat") ||
    normalized.includes("watering") ||
    normalized.includes("water schedule")
  ) {
    return {
      diagnosis: "Irrigation scheduling review",
      summary:
        "A safe schedule depends on crop stage, soil texture, root depth, heat, wind, and recent rain. Sandy soil needs smaller, more frequent applications; clay holds water longer and should be watered more slowly to prevent runoff.",
      urgency: "Check root-zone moisture before the next cycle",
      checks: [
        "Feel soil at half the active root depth or use a moisture probe—not just the dry surface.",
        "Check emitters for uneven flow and dig after irrigation to confirm the wetting depth.",
        "Look for midday-only wilt versus plants that remain wilted in the cool morning.",
      ],
      organic:
        "Add a layer of clean organic mulch and improve soil organic matter to reduce evaporation. Irrigate deeply in the early morning and allow air back into the root zone between cycles.",
      chemical:
        "No chemical treatment is needed. If using fertigation, apply nutrients only after confirming uniform water delivery and avoid feeding waterlogged roots.",
      prevention: [
        "Base each cycle on root-zone moisture and weather, not a fixed calendar alone.",
        "Group crops with similar water needs and repair blocked or leaking emitters.",
        "Record irrigation duration, rainfall, and crop response.",
      ],
    }
  }

  return {
    diagnosis: "More field evidence needed for a reliable diagnosis",
    summary: `Your concern—“${query}”—could have several causes, and choosing a treatment without the crop, symptom pattern, and field conditions could make it worse. Start by comparing affected and healthy plants and avoid applying a broad pesticide or fertilizer until the pattern is clear.`,
    urgency: "Investigate now · treatment depends on confirmation",
    checks: [
      "Tell me the crop and variety, plant age, and which plant part is affected.",
      "Describe whether symptoms began on old or new growth and whether they are spreading.",
      "Share recent weather, irrigation, fertilizer, and pesticide history, plus a clear photo of both sides of a leaf.",
    ],
    organic:
      "Isolate or mark affected plants, remove only badly damaged tissue, sanitize tools, and stabilize watering while evidence is collected.",
    chemical:
      "Do not apply a chemical treatment yet. Once the pest, disease, or deficiency is identified, use only a locally registered product at its labeled crop rate.",
    prevention: [
      "Scout the same field locations weekly and photograph changes.",
      "Keep records of inputs, rainfall, and first symptom dates.",
      "Confirm serious or fast-spreading symptoms with a local agronomist or extension lab.",
    ],
  }
}

function AgronomyResponse({ advice }: { advice: AgronomyAdvice }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate">{advice.diagnosis}</p>
        <span className="rounded-full bg-amber-pale px-2.5 py-1 text-tiny font-bold uppercase text-amber">
          {advice.urgency}
        </span>
      </div>
      <p className="rounded-xl bg-surface px-4 py-3 text-sm leading-6 text-slate">
        {advice.summary}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <DiagnosisCard icon="scan" label="How to confirm">
          <ol className="space-y-2 text-muted">
            {advice.checks.map((check, index) => (
              <li key={check} className="flex gap-2">
                <span className="font-semibold text-emerald">{index + 1}.</span>
                <span>{check}</span>
              </li>
            ))}
          </ol>
        </DiagnosisCard>
        <DiagnosisCard icon="sprout" label="Organic action">
          <p className="text-muted">{advice.organic}</p>
        </DiagnosisCard>
        <DiagnosisCard icon="shield" label="Chemical action" accent="blue">
          <p className="text-muted">{advice.chemical}</p>
        </DiagnosisCard>
        <DiagnosisCard icon="check" label="Prevention">
          <ul className="space-y-1.5 text-muted">
            {advice.prevention.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </DiagnosisCard>
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [fileName, setFileName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatEntry[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const submitMessage = (event: FormEvent) => {
    event.preventDefault()
    if (!message.trim()) return
    const query = message.trim()
    setMessages((current) => [
      ...current,
      { query, advice: getAgronomyAdvice(query) },
    ])
    setMessage("")
  }

  const usePrompt = (prompt: string) => {
    setMessage(prompt)
  }

  return (
    <div className="min-h-screen bg-canvas text-slate">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "AI Crop Doctor" ? "#crop-doctor" : "#platform"}
                className="text-sm font-medium text-muted transition-colors hover:text-forest"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost">Farmer Login</Button>
            <Button>
              Get Started <Icon name="arrow" size={16} />
            </Button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-forest lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-line bg-white px-5 py-5 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={
                    link === "AI Crop Doctor" ? "#crop-doctor" : "#platform"
                  }
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate hover:bg-mint-pale"
                >
                  {link}
                </a>
              ))}
              <Button className="mt-3 w-full">
                Get Started <Icon name="arrow" size={16} />
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="mx-auto grid max-w-site items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-28 lg:pt-24">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-mint-pale px-3.5 py-2 text-xs font-semibold text-forest">
                <Icon name="sparkles" size={15} className="text-emerald" />
                Agricultural intelligence, reimagined
              </div>
              <h1 className="mt-7 text-balance text-5xl font-semibold leading-tight tracking-tight text-forest sm:text-6xl lg:text-hero">
                Empowering farmers with{" "}
                <span className="text-emerald">next-gen AI</span> agronomy.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                Diagnose crop diseases in seconds, make better field decisions,
                and grow healthier yields with trusted intelligence built for
                modern agriculture.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="px-6 py-3.5"
                  onClick={() =>
                    document
                      .querySelector("#crop-doctor")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Icon name="sparkles" size={18} /> Consult AI Agronomist
                </Button>
                <Button
                  variant="secondary"
                  className="px-6 py-3.5"
                  onClick={() =>
                    document
                      .querySelector("#platform")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Platform <Icon name="arrow" size={17} />
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted">
                <span className="flex items-center gap-2">
                  <Icon name="check" size={16} className="text-emerald" /> 94%
                  diagnostic accuracy
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="check" size={16} className="text-emerald" />{" "}
                  Available in 18 languages
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
              <div className="relative overflow-hidden rounded-hero border border-white/60 bg-forest shadow-hero">
                <img
                  src="https://images.unsplash.com/photo-1761839257946-4616bcfafec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMHRhYmxldCUyMGdyZWVuaG91c2UlMjBjcm9wcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzkxMDI2OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farmer tending healthy crops inside a modern greenhouse"
                  className="h-hero-image w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-2 text-xs font-semibold text-forest shadow-sm backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald ring-4 ring-emerald/15" />{" "}
                  Field intelligence active
                </div>
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/30 bg-white/90 p-3 shadow-xl backdrop-blur-xl sm:left-auto sm:w-card">
                  <div className="border-r border-line px-2">
                    <p className="text-tiny font-medium text-muted">
                      CROP HEALTH
                    </p>
                    <strong className="mt-1 block text-base text-forest">
                      92%
                    </strong>
                  </div>
                  <div className="border-r border-line px-2">
                    <p className="text-tiny font-medium text-muted">
                      SOIL SCORE
                    </p>
                    <strong className="mt-1 block text-base text-forest">
                      Good
                    </strong>
                  </div>
                  <div className="px-2">
                    <p className="text-tiny font-medium text-muted">
                      NEXT TASK
                    </p>
                    <strong className="mt-1 block text-base text-forest">
                      2 days
                    </strong>
                  </div>
                </div>
              </div>
              <div className="absolute -right-3 top-1/3 hidden w-48 rounded-2xl border border-line bg-white p-4 shadow-card xl:block">
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint-pale text-emerald">
                    <Icon name="scan" size={16} />
                  </span>
                  <span className="rounded-full bg-mint-pale px-2 py-1 text-tiny font-bold text-emerald">
                    HEALTHY
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted">Latest crop scan</p>
                <p className="mt-1 text-sm font-semibold text-slate">
                  Tomato · North Field
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-line bg-white"
          aria-label="Live farm metrics"
        >
          <div className="mx-auto grid max-w-site grid-cols-2 gap-y-5 py-5 sm:grid-cols-4">
            <Metric
              icon="sun"
              label="Local weather"
              value="24°C"
              detail="Sunny"
              tone="amber"
            />
            <Metric
              icon="droplet"
              label="Soil moisture"
              value="68%"
              detail="Optimal"
              tone="blue"
            />
            <Metric
              icon="trending"
              label="Maize market"
              value="$243/t"
              detail="+2.4%"
            />
            <Metric
              icon="warning"
              label="Pest alerts"
              value="Low risk"
              detail="Updated 8m"
              tone="amber"
            />
          </div>
        </section>

        <section
          id="platform"
          className="mx-auto max-w-site px-5 py-24 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">
              <Icon name="sparkles" size={15} /> MEET CULTIVA AI
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
              From field question to confident action.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
              Upload a crop image or describe what you’re seeing. Cultiva AI
              combines visual diagnostics, local conditions, and agronomic best
              practices into one clear recommendation.
            </p>
          </div>

          <div
            id="crop-doctor"
            className="mt-14 overflow-hidden rounded-dashboard border border-line bg-white shadow-dashboard"
          >
            <div className="flex flex-col border-b border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white">
                  <Icon name="sparkles" size={19} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate">
                    Cultiva AI Crop Doctor
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald" />{" "}
                    Online · Agronomy model v4.2
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 sm:mt-0">
                <span className="rounded-lg bg-surface px-3 py-2 text-xs font-medium text-muted">
                  English (US)
                </span>
                <span className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-slate">
                  New diagnosis
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[20rem_1fr]">
              <aside className="border-b border-line bg-surface/70 p-5 lg:border-b-0 lg:border-r lg:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate">
                    Plant scan
                  </h3>
                  <span className="text-xs font-medium text-muted">
                    Step 1 of 2
                  </span>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setFileName(event.target.files?.[0]?.name ?? "")
                  }
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className={`mt-4 flex w-full flex-col items-center rounded-2xl border border-dashed p-7 text-center transition-colors ${
                    fileName
                      ? "border-emerald bg-mint-pale"
                      : "border-line-strong bg-white hover:border-emerald hover:bg-mint-pale/50"
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-mint-pale text-emerald">
                    <Icon name={fileName ? "check" : "upload"} size={22} />
                  </span>
                  <strong className="mt-4 text-sm font-semibold text-slate">
                    {fileName || "Upload a crop photo"}
                  </strong>
                  <span className="mt-1.5 text-xs leading-5 text-muted">
                    {fileName
                      ? "Image ready for diagnosis"
                      : "Drag and drop or browse your device"}
                  </span>
                  {!fileName && (
                    <span className="mt-4 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-forest shadow-sm">
                      Choose image
                    </span>
                  )}
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-xs font-semibold text-slate transition-colors hover:bg-mint-pale"
                >
                  <Icon name="camera" size={17} className="text-emerald" /> Use
                  device camera
                </button>

                <div className="my-6 h-px bg-line" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Scan tips
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Use natural, even lighting",
                    "Focus on the affected area",
                    "Include the full leaf or fruit",
                  ].map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2 text-xs leading-5 text-muted"
                    >
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mint-pale text-emerald">
                        <Icon name="check" size={10} />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-white p-3 text-xs text-muted">
                  <Icon
                    name="shield"
                    size={18}
                    className="shrink-0 text-emerald"
                  />{" "}
                  Images are private and securely processed.
                </div>
              </aside>

              <div className="flex min-h-chat flex-col">
                <div className="flex-1 space-y-6 p-5 sm:p-7 lg:p-8">
                  <div className="flex max-w-3xl gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest text-white">
                      <Icon name="sparkles" size={15} />
                    </span>
                    <div>
                      <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-sm leading-6 text-slate">
                        Good morning! I’m your Cultiva AI agronomist. Upload a
                        crop photo or tell me what’s happening in your field,
                        and I’ll help you diagnose it.
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Why are my tomato leaves curling?",
                          "Plan my irrigation schedule",
                          "Check for nutrient deficiency",
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => usePrompt(prompt)}
                            className="rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-emerald hover:text-forest"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto max-w-xl rounded-2xl rounded-tr-sm bg-forest px-4 py-3 text-sm leading-6 text-white">
                    My tomato plants have brown spots with yellow edges. It
                    started after several humid days. What could it be?
                  </div>

                  <div className="flex max-w-4xl gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest text-white">
                      <Icon name="sparkles" size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate">
                          Analysis complete
                        </p>
                        <span className="rounded-full bg-mint-pale px-2.5 py-1 text-tiny font-bold text-emerald">
                          91% CONFIDENCE
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <DiagnosisCard icon="scan" label="Problem identified">
                          <strong className="font-semibold">
                            Early blight
                          </strong>
                          <p className="mt-1 text-muted">
                            Likely caused by <em>Alternaria solani</em>, favored
                            by warm, humid conditions.
                          </p>
                        </DiagnosisCard>
                        <DiagnosisCard
                          icon="warning"
                          label="Severity level"
                          accent="amber"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-amber" />
                            <strong className="font-semibold">
                              Moderate · Act within 48h
                            </strong>
                          </div>
                          <p className="mt-1 text-muted">
                            Currently affecting lower foliage.
                          </p>
                        </DiagnosisCard>
                        <DiagnosisCard
                          icon="sprout"
                          label="Recommended treatment"
                        >
                          <p>
                            <strong className="font-semibold text-emerald">
                              Organic:
                            </strong>{" "}
                            Remove affected leaves and apply copper-based
                            fungicide.
                          </p>
                          <p className="mt-2">
                            <strong className="font-semibold text-sky">
                              Chemical:
                            </strong>{" "}
                            Apply chlorothalonil per local label guidance.
                          </p>
                        </DiagnosisCard>
                        <DiagnosisCard
                          icon="shield"
                          label="Preventative measures"
                          accent="blue"
                        >
                          <ul className="space-y-1 text-muted">
                            <li>• Water at the soil line early morning</li>
                            <li>• Improve airflow between plants</li>
                            <li>• Rotate nightshade crops next season</li>
                          </ul>
                        </DiagnosisCard>
                      </div>
                      <p className="mt-3 text-xs text-muted">
                        Recommendations are based on your region and reported
                        field conditions. Always follow local product labels.
                      </p>
                    </div>
                  </div>

                  {messages.map((entry, index) => (
                    <div key={`${entry.query}-${index}`} className="space-y-4">
                      <div className="ml-auto max-w-xl rounded-2xl rounded-tr-sm bg-forest px-4 py-3 text-sm leading-6 text-white">
                        {entry.query}
                      </div>
                      <div className="flex max-w-4xl gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forest text-white">
                          <Icon name="sparkles" size={15} />
                        </span>
                        <AgronomyResponse advice={entry.advice} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line bg-white p-4 sm:p-5">
                  <form
                    onSubmit={submitMessage}
                    className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 focus-within:border-emerald focus-within:ring-4 focus-within:ring-emerald/10"
                  >
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-white hover:text-forest"
                      aria-label="Attach image"
                    >
                      <Icon name="paperclip" size={19} />
                    </button>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault()
                          event.currentTarget.form?.requestSubmit()
                        }
                      }}
                      rows={1}
                      placeholder="Ask about your crops, soil, pests, or irrigation…"
                      className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm text-slate outline-none placeholder:text-muted"
                    />
                    <button
                      type="button"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-white hover:text-forest"
                      aria-label="Use voice input"
                    >
                      <Icon name="mic" size={19} />
                    </button>
                    <button
                      type="submit"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest text-white shadow-sm transition-colors hover:bg-forest-light"
                      aria-label="Send message"
                    >
                      <Icon name="send" size={17} />
                    </button>
                  </form>
                  <p className="mt-2 text-center text-tiny text-muted">
                    Cultiva AI can make mistakes. Verify critical advice with a
                    local agronomist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-site px-5 py-24 lg:px-8 lg:py-32">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="eyebrow">
                  <Icon name="database" size={15} /> DATA FOUNDATION
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
                  A relational model built for every field decision.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">
                Cultiva Health connects farmer identities, land context,
                diagnostic history, and verified agronomic knowledge—creating a
                secure foundation that becomes smarter with every season.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {schemaTables.map((table, tableIndex) => (
                <article
                  key={table.name}
                  className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-start justify-between border-b border-line p-5">
                    <div>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-pale text-emerald">
                        <Icon name={table.icon} size={19} />
                      </span>
                      <h3 className="mt-4 break-words text-sm font-semibold text-slate">
                        {table.name}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {table.description}
                      </p>
                    </div>
                    <span className="text-tiny font-bold tracking-widest text-line-strong">
                      0{tableIndex + 1}
                    </span>
                  </div>
                  <div className="divide-y divide-line/70 px-5 py-2">
                    {table.fields.map(([name, type, flag]) => (
                      <div
                        key={name}
                        className="flex min-h-9 items-center justify-between gap-2 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-mono text-xs font-medium text-slate">
                            {name}
                          </p>
                          <p className="mt-0.5 text-tiny text-muted">{type}</p>
                        </div>
                        {flag && (
                          <span
                            className={`shrink-0 rounded-md px-1.5 py-1 text-tiny font-bold ${
                              flag.includes("PK")
                                ? "bg-mint-pale text-emerald"
                                : "bg-surface text-muted"
                            }`}
                          >
                            {flag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line bg-white px-5 py-4 text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald" />
                users <Icon name="arrow" size={13} /> farms
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky" />
                users <Icon name="arrow" size={13} /> ai_diagnoses
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber" />
                farms <Icon name="arrow" size={13} /> ai_diagnoses
              </span>
              <span className="ml-auto hidden font-medium text-slate sm:block">
                UUID primary keys · Referential integrity · Indexed lookups
              </span>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white">
          <div className="mx-auto max-w-site px-5 py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">
                <Icon name="brain" size={15} /> SYSTEM INTELLIGENCE
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
                From a field signal to trusted action.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
                One connected intelligence loop combines accessible farmer
                inputs with multimodal reasoning and evidence-backed retrieval.
              </p>
            </div>

            <div className="relative mt-16 grid gap-4 lg:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden border-t border-dashed border-emerald/35 lg:block" />
              {architectureSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="relative rounded-2xl border border-line bg-canvas p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-forest text-white shadow-button">
                      <Icon name={step.icon} size={21} />
                    </span>
                    {index < architectureSteps.length - 1 && (
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white text-emerald lg:hidden">
                        <Icon name="chevron" size={15} />
                      </span>
                    )}
                    <span className="text-xs font-bold tracking-widest text-line-strong">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-slate">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white px-2.5 py-1 text-tiny font-semibold uppercase tracking-wide text-forest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-5 rounded-dashboard bg-forest p-6 text-white shadow-card sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-mint">
                <Icon name="shield" size={23} />
              </span>
              <div>
                <h3 className="text-base font-semibold">
                  Human-centered, evidence-backed intelligence
                </h3>
                <p className="mt-1.5 max-w-3xl text-sm leading-6 text-white/65">
                  Confidence scoring, regional product guidance, and agronomist
                  escalation keep recommendations transparent and responsible.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {["Private by design", "Region aware", "Traceable sources"].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-white/75"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-forest text-white">
          <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-mint">
                Built for every growing season
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight">
                Better decisions today. Healthier farms tomorrow.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/65">
                Join 12,000+ growers using Cultiva Health to protect yields,
                reduce inputs, and build more resilient operations.
              </p>
            </div>
            <Button
              variant="secondary"
              className="w-full px-7 py-3.5 lg:w-auto"
            >
              Start growing smarter <Icon name="arrow" size={17} />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-forest-dark text-white">
        <div className="mx-auto max-w-site px-5 py-14 lg:px-8">
          <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Logo light />
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                Practical intelligence for healthier crops, resilient farms, and
                a more sustainable food system.
              </p>
              <p className="mt-5 text-xs text-white/40">
                Trusted agricultural intelligence
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Platform</p>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  "AI Crop Doctor",
                  "Weather & Soil",
                  "Market Insights",
                  "Farm Records",
                ].map((link) => (
                  <a
                    key={link}
                    href="#platform"
                    className="text-sm text-white/55 hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Company</p>
              <div className="mt-4 flex flex-col gap-3">
                {["About", "Enterprise", "Community", "Careers"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-white/55 hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Support</p>
              <div className="mt-4 flex flex-col gap-3">
                {["Help Center", "Contact us", "Privacy", "Terms"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm text-white/55 hover:text-white"
                    >
                      {link}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Cultiva Health Technologies. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Icon name="shield" size={14} /> SOC 2 Ready
              </span>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

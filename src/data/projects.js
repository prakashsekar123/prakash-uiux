import p1 from "../assets/Secondcareers.png"
import p2 from "../assets/prepyailogo.png"
import p3 from "../assets/fasttrackformularylogo.png"
import p4 from "../assets/hermonylogo.png"
import p5 from "../assets/modelrocketlogo.png"
// import p6 from "../"

/* Each project carries:
   - solution: the "how we solved it" paragraph on the case study page
   - gallery: placeholder mockup frames (kind: "desktop" | "mobile" | "dashboard", label)
   - beforeAfter: optional { before, after } copy for the comparison slider
   `img` is intentionally null everywhere — no real screenshots exist yet, and
   MockupFrame renders a clean placeholder automatically. Set `img` to a real
   asset path once screenshots are available; nothing else needs to change. */
export const PROJECTS = [
  {
    id: "careers",
    img: p1,
    tag: "Job Platform · Accessibility",
    title: "2ndCareers",
    subtitle: "Job Platform for Retired Professionals",
    company: "Adra Product Studio",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "Accessibility · Job Discovery",
    overview:
      "A job discovery platform designed accessibility-first for professionals aged 45+. The challenge was creating a digital experience that feels approachable, trustworthy, and easy to navigate for users who may not be digital-native.",
    problem: {
      heading: "Retired professionals were <em>left behind</em> by modern job platforms",
      body: "Most job platforms are built for tech-savvy users under 40. Tiny text, complex filters, jargon-heavy UX, and aggressive sign-up flows create massive friction for older job seekers. <strong>2ndCareers</strong> was built to flip this — making job discovery genuinely accessible for the 45+ demographic.",
      quote: "One flow isn't enough to feel confident. How do we get new users to reach real value, fast?",
    },
    solution:
      "We rebuilt the experience around three principles: fewer steps, bigger targets, and plain language everywhere. Navigation dropped from five layers to two, every interactive element meets a 44px minimum tap size, and the entire flow was validated against WCAG AA before shipping — turning a platform users abandoned into one they return to.",
    process: [
      { title: "User Research & Interviews", desc: "Conducted interviews with users 45–65 to uncover pain points with existing platforms. Mapped key usability barriers: small tap targets, confusing filters, and lack of trust signals." },
      { title: "Information Architecture", desc: "Redesigned the navigation hierarchy from scratch. Reduced the number of steps to reach a job listing from 5 to 2. Created a flat, scannable structure." },
      { title: "Accessibility-First UI Design", desc: "Applied WCAG AA standards throughout: minimum 16px body text, 4.5:1 contrast ratios, large tap targets (44px+), and simplified form inputs." },
      { title: "Onboarding Flow Redesign", desc: "Rebuilt the onboarding to be progressive — users see real value before completing their profile. Removed unnecessary fields that caused drop-off." },
      { title: "Usability Testing", desc: "Ran 3 rounds of moderated usability testing with target users. Each round informed design iterations that measurably reduced task completion time." },
    ],
    gallery: [
      { kind: "desktop", label: "Job search dashboard" },
      { kind: "mobile", label: "Simplified onboarding" },
      { kind: "desktop", label: "Listing detail view" },
      { kind: "mobile", label: "Accessible filters" },
    ],
    beforeAfter: { before: "5-step onboarding, 11pt text, buried filters", after: "3-step onboarding, 16pt+ text, one-tap filters" },
    outcomes: [
      "Reduced onboarding drop-off by simplifying the flow to 3 key steps",
      "Improved task success rate from 62% to 89% in usability tests",
      "Job filtering redesign reduced time-to-apply by 40%",
      "Accessibility audit passed WCAG AA across all core screens",
    ],
    tags: ["User Research", "Accessibility", "Information Architecture", "Usability Testing", "Figma"],
    nextId: "prepy",
  },
  {
    id: "prepy",
    img: p2,
    tag: "EdTech · AI",
    title: "Prepy AI",
    subtitle: "AI-Powered Learning Platform",
    company: "Adra Product Studio",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "EdTech · AI · Dashboard",
    overview:
      "An AI-powered learning platform that personalises study experiences based on individual performance data. Designed to increase learner engagement and retention through adaptive content and intelligent progress tracking.",
    problem: {
      heading: "Students couldn't see <em>why they were failing</em> — or how to improve",
      body: "Existing e-learning tools showed completion percentages but gave no actionable insight. Learners felt lost, unmotivated, and unable to understand where they needed to focus. <strong>Prepy AI</strong> was built to surface the right insight at the right moment using AI-driven analysis.",
      quote: "Data without context is noise. We needed to turn performance data into a personal coach.",
    },
    solution:
      "The dashboard was redesigned around one idea: every number needs a next step attached to it. Strength/weakness heatmaps sit next to plain-language recommendations, and the adaptive quiz engine explains wrong answers instead of just marking them — turning passive tracking into active coaching.",
    process: [
      { title: "Discovery & Research", desc: "Interviewed students and educators to understand how learners consume study material and where they disengage. Identified 3 core mental models around progress tracking." },
      { title: "AI Flow Mapping", desc: "Mapped the AI assessment engine's logic into human-readable UX flows. Designed the system to explain recommendations in plain language, not just show scores." },
      { title: "Dashboard Design", desc: "Created a personalised learning dashboard showing strength/weakness heatmaps, recommended next steps, and predicted readiness scores per topic." },
      { title: "Assessment UX", desc: "Designed adaptive quiz flows that adjust difficulty in real time. Built feedback states that explain wrong answers constructively, not just mark them as incorrect." },
      { title: "Prototype & Iterate", desc: "Built high-fidelity prototypes in Figma and tested with 12 students. Iterated on the insight card design 4 times before landing on the final pattern." },
    ],
    gallery: [
      { kind: "dashboard", label: "Performance heatmap" },
      { kind: "mobile", label: "Daily insight cards" },
      { kind: "desktop", label: "Adaptive quiz flow" },
      { kind: "dashboard", label: "Readiness scoring" },
    ],
    beforeAfter: { before: "Raw completion % with no context", after: "AI insight cards with a clear next step" },
    outcomes: [
      "Average session length increased by 35% after dashboard redesign",
      "AI recommendation click-through rate of 72% — learners acted on suggestions",
      "Usability score improved from 64 to 88 (SUS) after 3 test rounds",
      "Onboarding completion rate reached 91% with the new progressive flow",
    ],
    tags: ["AI UX", "Dashboard Design", "EdTech", "Adaptive UI", "Figma", "Prototyping"],
    nextId: "formulary",
  },
  {
    id: "formulary",
    img: p3,
    tag: "Healthcare · USA · Web App",
    title: "Fast Track Formulary",
    subtitle: "US-Based Healthcare Drug Search Platform",
    company: "Client — USA (via Adra Product Studio)",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "Healthcare · Web App · Search UX · USA Market",
    overview:
      "A US-based web application built for American healthcare professionals to look up drug formulary data — insurance coverage tiers, prior authorization requirements, dosage, and alternatives — in seconds. Designed to meet the specific needs of the US healthcare system, including insurance plan compatibility and FDA-compliant terminology.",
    problem: {
      heading: "US physicians were losing <em>critical minutes</em> navigating complex formulary data",
      body: "In the US healthcare system, formulary checks are a daily task for physicians, pharmacists, and care coordinators. Legacy tools required navigating multiple screens, switching between insurance plan databases, and cross-referencing prior authorization rules. <strong>Fast Track Formulary</strong> was redesigned to surface the right drug information for the right insurance plan in under 8 seconds.",
      quote: "In American clinical practice, formulary delays don't just cost time — they delay patient care and increase administrative burden on already stretched teams.",
    },
    solution:
      "A single predictive search bar replaced the multi-screen lookup, with plan-switching reduced to one selector and every coverage tier color-coded so status is legible at a glance. Progressive disclosure keeps prior-authorization detail one click away instead of cluttering the primary result.",
    process: [
      { title: "US Healthcare Workflow Research", desc: "Interviewed 8 US-based physicians, pharmacists, and care coordinators to map how formulary lookups fit into their daily workflows. Identified 3 distinct lookup patterns: prescription writing, prior auth checks, and drug alternative sourcing." },
      { title: "Insurance Plan Architecture", desc: "Mapped the complexity of US insurance tiers (Tier 1–5), formulary restrictions, and prior authorization requirements into a structured UX hierarchy. Designed plan-switching to be instant with a single selector." },
      { title: "Search UX Design", desc: "Built a predictive search handling drug name, NDC code, brand/generic, and therapeutic class. Results surface coverage tier, PA requirements, quantity limits, and step therapy rules — all above the fold." },
      { title: "Cognitive Load Reduction", desc: "Color-coded US formulary tiers (Preferred Generic → Non-Preferred Brand → Specialty), used progressive disclosure for PA details, and simplified alternative drug suggestions to reduce decision fatigue." },
      { title: "Speed & Accuracy Testing", desc: "Conducted timed usability tests with 6 US clinicians. Measured lookup time, error rate, and confidence score. Iterated until median lookup time dropped below 8 seconds with zero critical errors." },
    ],
    gallery: [
      { kind: "desktop", label: "Predictive drug search" },
      { kind: "dashboard", label: "Coverage tier breakdown" },
      { kind: "desktop", label: "Prior authorization detail" },
      { kind: "mobile", label: "On-the-go lookup" },
    ],
    beforeAfter: { before: "4.2 min average lookup across multiple screens", after: "Under 8 seconds in a single search view" },
    outcomes: [
      "Median drug formulary lookup time reduced from 4.2 min to under 8 seconds",
      "Task success rate improved from 71% to 96% in clinician usability testing",
      "Cognitive load score (NASA-TLX) dropped 44% after the redesign",
      "Zero critical errors recorded in final usability round across 6 US clinicians",
    ],
    tags: ["US Healthcare UX", "Web App Design", "Search UX", "Insurance Tier UI", "Information Architecture", "Accessibility"],
    nextId: "rocket",
  },
  {
    id: "rocket",
    img: p5,
    tag: "AI SaaS · CRM",
    title: "Model Rocket",
    subtitle: "AI Sales & Marketing Automation Platform",
    company: "Adra Product Studio",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "AI · SaaS · CRM · Conversational UI",
    overview:
      "A full-stack AI sales automation platform combining chatbot interactions, voice agents, lead tracking, and campaign analytics in a single CRM-style interface. The design challenge was making complex multi-channel automation feel manageable and human.",
    problem: {
      heading: "AI automation felt like a <em>black box</em> — sales teams didn't trust it",
      body: "Sales teams adopting AI tools often feel like they've lost control. Leads are handled by algorithms they don't understand, and dashboards show data without context. <strong>Model Rocket</strong> was designed to give sales professionals visibility, control, and confidence in their AI-powered workflows.",
      quote: "AI should feel like a co-pilot, not an autopilot nobody can turn off.",
    },
    solution:
      "Every AI action became visible and reversible: clear handoff states show when the bot is talking versus a human, live transcripts expose voice-agent behaviour in real time, and one-click escalation puts a rep back in control instantly — trust followed once teams could see what the system was doing.",
    process: [
      { title: "Stakeholder Interviews", desc: "Interviewed sales managers and SDRs to understand how they currently manage leads and where AI assistance would be most valuable vs. most intrusive." },
      { title: "Conversational UI Design", desc: "Designed the AI chatbot interface with clear handoff states — showing when AI is handling a conversation, when a human takes over, and what the AI recommended." },
      { title: "CRM Dashboard Architecture", desc: "Built a modular dashboard system allowing teams to customise their view. Leads, campaigns, analytics, and AI activity feeds are independent panels arranged by role." },
      { title: "Voice Agent UX", desc: "Designed the voice automation monitoring interface — live transcripts, sentiment indicators, and one-click human escalation. Made the invisible visible." },
      { title: "Design System", desc: "Created a consistent component library covering 80+ UI states across the platform. Established data visualisation patterns for pipeline and campaign analytics." },
    ],
    gallery: [
      { kind: "dashboard", label: "Modular CRM dashboard" },
      { kind: "desktop", label: "Conversational handoff states" },
      { kind: "dashboard", label: "Voice agent monitoring" },
      { kind: "mobile", label: "Escalation on the go" },
    ],
    beforeAfter: { before: "Opaque AI activity, no escalation path", after: "Live transcripts with one-click human takeover" },
    outcomes: [
      "Lead response time reduced by 68% using AI-first qualification flows",
      "Dashboard adoption rate reached 84% within first month of launch",
      "Human escalation feature used in 23% of AI conversations — proving trust",
      "Design system reduced design-to-dev handoff time by 50%",
    ],
    tags: ["Conversational UI", "CRM Design", "AI Automation", "Dashboard", "Design Systems", "Figma"],
    nextId: "harmony",
  },
  {
    id: "harmony",
    img: p4,
    tag: "HealthTech · Mobile",
    title: "Harmony.life",
    subtitle: "Women's Wellness Mobile App",
    company: "Adra Product Studio",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "Mobile · Health Tracking · Empathy Design",
    overview:
      "A mobile wellness app specifically designed for women navigating menopause. The product needed to handle complex health data while feeling emotionally safe, personal, and reassuring — not clinical or alarming.",
    problem: {
      heading: "Health apps treated menopause as a <em>set of symptoms</em>, not a life stage",
      body: "Existing health trackers were generic. They logged data but offered no personal context, no reassurance, and no community. Women experiencing menopause needed an app that understood their experience, not just their metrics. <strong>Harmony.life</strong> was built around empathy as a design principle.",
      quote: "Data should empower, not alarm. Every insight needs to feel like a conversation, not a diagnosis.",
    },
    solution:
      "Clinical charts were replaced with gentle curves and warm colour, medical terminology was rewritten in plain, supportive language, and an AI insight-card system delivers observations conversationally rather than as raw metrics — the app now reads as a companion, not a chart.",
    process: [
      { title: "Empathy Research", desc: "Conducted in-depth interviews with 10 women aged 42–58 experiencing perimenopause and menopause. Built detailed empathy maps and journey maps capturing emotional highs and lows." },
      { title: "Tone & Voice Design", desc: "Established a warm, non-clinical tone of voice for all UI copy. Replaced medical terminology with plain language. Every error state and empty state was written to feel supportive." },
      { title: "Data Visualisation", desc: "Designed custom visualisations for symptom patterns, sleep cycles, and mood trends. Used gentle curves and warm colours instead of sharp graphs and clinical red/green indicators." },
      { title: "Personalised Insights", desc: "Designed the insight card system — AI-generated observations served in conversational language. Cards adapt to the user's tracked data and time of day." },
      { title: "Navigation & Accessibility", desc: "Simplified the app to 4 core navigation tabs. Large touch targets, adjustable text size, and high-contrast mode built in from day one." },
    ],
    gallery: [
      { kind: "mobile", label: "Symptom trend view" },
      { kind: "mobile", label: "Conversational insight card" },
      { kind: "mobile", label: "Sleep & mood tracking" },
      { kind: "mobile", label: "High-contrast mode" },
    ],
    beforeAfter: { before: "Clinical red/green symptom charts", after: "Warm, conversational insight cards" },
    outcomes: [
      "Daily active use rate of 61% — well above the 30% health app benchmark",
      "Average session length of 4.2 minutes, driven by insight card engagement",
      "88% of users rated the app experience as \"calming\" or \"empowering\" in surveys",
      "Accessibility features adopted by 34% of users within first week",
    ],
    tags: ["Mobile Design", "Empathy-Driven UX", "Health Tracking", "Data Viz", "Accessibility"],
    nextId: "digiform",
  },
  {
    id: "digiform",
    img: null,
    tag: "GovTech · Form UX",
    title: "Digiform",
    subtitle: "DigiLocker-Based Form Automation System",
    company: "Adra Product Studio",
    // year: "2024 – Present",
    role: "UI/UX Designer",
    type: "GovTech · Form Design · Compliance UX",
    overview:
      "A form automation platform integrated with DigiLocker — India's national digital document wallet. Citizens could complete complex government forms without manually re-entering data stored in their DigiLocker account. The design challenge was reducing a 20-minute form process to under 5 minutes.",
    problem: {
      heading: "Government forms were <em>abandoned mid-way</em> by 64% of users",
      body: "Complex multi-step government forms with mandatory document uploads, identity verification, and compliance fields had catastrophic drop-off rates. Users couldn't understand what was needed, lost progress, and gave up. <strong>Digiform</strong> integrated DigiLocker to auto-fill verified data and remove the most painful steps.",
      quote: "64% form abandonment isn't a user problem. It's a design problem.",
    },
    solution:
      "A one-time DigiLocker authentication now auto-fills verified identity and document data across every future form, manual uploads were replaced with a document picker that confirms instantly, and progress auto-saves so a session survives a closed tab or a switched device.",
    process: [
      { title: "Drop-off Analysis", desc: "Analysed existing form analytics to identify which steps caused the most abandonment. Step 3 (document upload) and Step 5 (identity verification) accounted for 71% of all exits." },
      { title: "DigiLocker Integration UX", desc: "Designed the DigiLocker connection flow — a one-time authentication that auto-fills name, address, Aadhaar, PAN, and document references across all future forms." },
      { title: "Multi-Step Form Redesign", desc: "Rebuilt form flows with a clear step indicator, progress save at every step, and plain-language field labels. Grouped related fields to reduce perceived length." },
      { title: "Document Upload Simplification", desc: "Replaced the manual upload with a DigiLocker document picker. Auto-verification gives instant confirmation, removing the anxiety of \"did it accept my file?\"." },
      { title: "Error & Recovery Design", desc: "Designed inline validation with constructive error messages. Built a session-save system so users can return to a form exactly where they left off — even on a different device." },
    ],
    gallery: [
      { kind: "mobile", label: "DigiLocker one-tap connect" },
      { kind: "desktop", label: "Multi-step form flow" },
      { kind: "mobile", label: "Instant document verification" },
      { kind: "desktop", label: "Session recovery" },
    ],
    beforeAfter: { before: "22-minute form, 64% abandonment", after: "4.5-minute form, 81% completion" },
    outcomes: [
      "Form completion rate improved from 36% to 81% after redesign",
      "Average completion time reduced from 22 minutes to 4.5 minutes",
      "Document upload errors dropped by 78% with DigiLocker auto-verification",
      "Support ticket volume for form issues reduced by 55% post-launch",
    ],
    tags: ["GovTech", "Form Design", "Compliance UX", "DigiLocker Integration", "Multi-step UX"],
    nextId: "careers",
  },
];

// ============================================================
// DYMCnG — Diligent Young Minds Counsel & Guidance
// App.jsx — v3: Logo embedded, black-only fonts, student images
// ============================================================
// SETUP: npm install lucide-react  (Tailwind CSS assumed configured)
// Formspree: sign up at formspree.io → create form → paste endpoint below
// ============================================================

import { useState, useRef } from "react";
import {
  Menu, X, Phone, Mail, Globe, ArrowRight, ChevronRight,
  Users, Compass, FileText, GraduationCap, Star,
  CheckCircle, BarChart2, Lightbulb, Shield, MessageCircle,
  Instagram, Facebook, Linkedin, Download, Calendar,
  ClipboardList, TrendingUp, Layers, Target, BookOpen,
  Send, AlertCircle
} from "lucide-react";

// ============================================================
// EDITABLE BUSINESS CONFIG
// ============================================================

const brand = {
  name: "DYMCnG",
  fullName: "Diligent Young Minds Counsel & Guidance",
  tagline: "Clarity today. Confidence tomorrow.",
  secondaryTagline: "Discover. Decide. Do.",
};

const contact = {
  whatsapp: "+91-9637052211",
  whatsappLink: "https://wa.me/919637052211",
  email: "yazdigodrej66@gmail.com",
  website: "www.dymcng.com",
  bookingLink: "#contact",
};

// Formspree: replace YOUR_FORM_ID with your real form id
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// ── Embedded images (base64) — no external file dependency ──
const LOGO_IMG    = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/4QKERXhpZgAATU0AKgAAAAgABAE7AAIAAAAGAAABSodpAAQAAAABAAABUJydAAEAAAAMAAACcOocAAcAAAEMAAAAPgAAAAAc6gAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQWRtaW4AAAHqHAAHAAABDAAAAWIAAAAAHOoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQQBkAG0AaQBuAAAA/+EC6mh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzpjcmVhdG9yPjxyZGY6U2VxIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpsaT5BZG1pbjwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAJoAtQMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEB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";
const FOUNDER_IMG = "data:image/jpeg;base64,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";

// ── Student photography — sourced from Unsplash (free, no attribution required)
// Replace any of these URLs with your own photos at any time.
const STUDENT_IMGS = {
  hero:      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&q=80",   // Indian students studying together
  guidance:  "https://images.unsplash.com/photo-1613896640137-bb5b31496315?w=800&q=80",   // student with teacher/mentor
  classroom: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",   // Indian school classroom
  parents:   "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",   // family discussion
  workshop:  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",   // workshop / presentation
};

const navLinks = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Process",   href: "#process" },
  { label: "Resources", href: "#resources" },
  { label: "Workshops", href: "#workshops" },
  { label: "Contact",   href: "#contact" },
];

const valuePillars = [
  { icon: Target,      title: "Personalized, Strengths-Based Guidance", desc: "Every student gets a pathway built around their unique interests, aptitudes, and family context — not a generic template." },
  { icon: Globe,       title: "Global Exposure, Local Context",          desc: "30+ years of cross-industry experience across India and international markets, applied to real Indian education decisions." },
  { icon: Shield,      title: "Ethical, Unbiased Recommendations",       desc: "No institutional tie-ups. Advice is guided by what is right for the student — not admissions commissions or quotas." },
  { icon: ClipboardList, title: "Actionable Plans with Milestones",       desc: "You leave with a clear roadmap — timelines, next steps, and checkpoints — not just a conversation." },
];

const services = [
  { icon: BarChart2,    title: "Psychometric and Aptitude Assessments",      desc: "Structured assessments for Grades 7–12 that surface strengths, interests, and aptitude patterns to inform every guidance decision." },
  { icon: Layers,       title: "Stream Selection and Subject Mapping",        desc: "Evidence-based stream selection for CBSE, ICSE, IB, and IGCSE — matched to career goals and learning strengths." },
  { icon: Compass,      title: "Career Pathway Planning",                     desc: "Build a realistic career roadmap for India and abroad — covering professions, industries, and emerging fields." },
  { icon: GraduationCap, title: "University / College Shortlisting",          desc: "Strategic shortlisting and application guidance for Indian and international universities tailored to the student's profile." },
  { icon: Star,          title: "Profile Building and Extracurricular Roadmaps", desc: "Plan activities, projects, and experiences that build a cohesive, compelling student profile over time." },
  { icon: FileText,      title: "Interview Prep and SOP / Essay Guidance",   desc: "Structured preparation for personal statements, SOPs, and admissions interviews — authentic, clear, and compelling." },
  { icon: Users,         title: "Parent Strategy Session and Progress Review", desc: "Dedicated sessions that align parent expectations with student strengths and map realistic milestones together." },
  { icon: Lightbulb,     title: "Early Exposure Sessions",                    desc: "Introduce students to new-age careers in AI, Tech, Design, Climate, and Sustainability — before stream selection locks in." },
  { icon: BookOpen,      title: "Workshops for Schools",                      desc: "Engaging school-based workshops on stream selection, future careers, study abroad planning, and confident decision-making." },
];

const processSteps = [
  { number: "01", title: "Discover", desc: "Understand student goals, strengths, interests, concerns, and family priorities through a structured first session." },
  { number: "02", title: "Assess",   desc: "Use psychometric and aptitude-informed tools to identify patterns, preferences, and possibilities." },
  { number: "03", title: "Map",      desc: "Map streams, subjects, career pathways, and India/abroad education options to the student's profile." },
  { number: "04", title: "Plan",     desc: "Create a personalized roadmap with milestones, timelines, and clear next actions." },
  { number: "05", title: "Review",   desc: "Hold a parent-student strategy session to align decisions, answer questions, and confirm next steps." },
];

const audienceSections = [
  { label: "For Parents",  img: STUDENT_IMGS.parents,
    points: ["Reduce uncertainty around streams, subjects, and colleges", "Understand your child's real strengths and options", "Make informed academic and career decisions together", "Build a realistic action plan with measurable milestones"] },
  { label: "For Students", img: STUDENT_IMGS.guidance,
    points: ["Discover your genuine strengths and interests", "Explore future careers with confidence and curiosity", "Choose subjects and streams with real clarity", "Build motivation, direction, and ownership of your future"] },
];

const careers = ["Data Science","UX Design","Sports Management","Climate Tech","Behavioural Economics","Space Tech","Biomedical Engineering","AI and Technology","Design and Sustainability"];

const workshopTopics = [
  { icon: Layers,       title: "Stream Selection 101" },
  { icon: Lightbulb,    title: "New-Age Careers" },
  { icon: Globe,        title: "India vs Abroad Planning" },
  { icon: TrendingUp,   title: "AI, Technology and Future Skills" },
  { icon: Users,        title: "Parent-Student Decision-Making" },
  { icon: Star,         title: "Profile Building and Career Readiness" },
];

const credentials = [
  "30+ Years Global Experience",
  "EMBA — Hult Ashridge Business School, UK",
  "Honorary Doctorate DBA — Dunster Business School, Switzerland",
  "NSDC-approved Career and Educational Counselling Certification",
  "Career and Academic Counselling Certification",
  "India and Abroad Pathway Guidance",
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
];

// ============================================================
// DESIGN TOKENS — ALL TEXT IS #111111 (near-black)
// Backgrounds use navy / teal / white / light-grey sections.
// Teal is used ONLY for interactive elements and icon fills.
// ============================================================
const C = {
  text:    "#111111",   // every text element
  navy:    "#0F1E2E",   // hero / footer / dark sections
  teal:    "#0D8F8F",   // buttons, icons, accents
  tealLt:  "#E6F7F7",   // teal tint backgrounds
  border:  "#D1D5DB",   // card borders
  bgGrey:  "#F5F6F8",   // alternating section bg
};

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

function SectionHeader({ eyebrow, title, subtitle, onDark = false }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: onDark ? "#5EE0E0" : C.teal }}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
        style={{ color: onDark ? "#ffffff" : C.text }}>
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: onDark ? "#E2E8F0" : C.text }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CTAButton({ href, children, variant = "primary", className = "", onClick, type = "button" }) {
  const styles = {
    primary: { background: C.teal,  color: "#fff",     border: "2px solid " + C.teal },
    outline: { background: "transparent", color: "#fff", border: "2px solid #fff" },
    ghost:   { background: "transparent", color: C.teal, border: "2px solid " + C.teal },
    white:   { background: "#fff",  color: C.navy,     border: "2px solid #fff" },
  };
  const s = styles[variant] || styles.primary;
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 cursor-pointer";
  const hoverClass = variant === "primary" ? "hover:opacity-90" : variant === "outline" ? "hover:bg-white hover:text-[#0F1E2E]" : "hover:bg-teal-50";

  if (type === "submit") {
    return (
      <button type="submit" style={s} onClick={onClick}
        className={`${base} ${hoverClass} ${className}`}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} style={s} onClick={onClick}
      className={`${base} ${hoverClass} ${className}`}>
      {children}
    </a>
  );
}

function ValuePillarCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col gap-4"
      style={{ borderColor: C.border }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.tealLt }}>
        <Icon size={22} style={{ color: C.teal }} aria-hidden="true" />
      </div>
      <h3 className="font-bold text-base leading-snug" style={{ color: C.text }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: C.text }}>{desc}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col gap-4 group"
      style={{ borderColor: C.border }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors" style={{ background: C.tealLt }}>
        <Icon size={22} style={{ color: C.teal }} aria-hidden="true" />
      </div>
      <h3 className="font-bold text-base leading-snug" style={{ color: C.text }}>{title}</h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: C.text }}>{desc}</p>
      <a href={contact.whatsappLink}
        className="text-sm font-bold inline-flex items-center gap-1 hover:gap-2 transition-all focus:outline-none focus:underline"
        style={{ color: C.teal }}>
        Ask about this <ChevronRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

function ProcessStepCard({ number, title, desc, isLast }) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full text-white flex items-center justify-center font-bold text-base z-10 shadow-md"
        style={{ background: C.teal }} aria-hidden="true">{number}</div>
      {!isLast && (
        <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-teal-200" aria-hidden="true" />
      )}
      <div className="mt-4">
        <h3 className="font-bold text-base mb-2" style={{ color: C.text }}>{title}</h3>
        <p className="text-sm leading-relaxed max-w-[180px] mx-auto" style={{ color: C.text }}>{desc}</p>
      </div>
    </div>
  );
}

function CareerTag({ label }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border-2 border-teal-200 text-sm font-semibold hover:bg-teal-50 hover:border-teal-400 transition-colors cursor-default"
      style={{ color: C.text }}>
      {label}
    </span>
  );
}

function WorkshopCard({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-4 shadow-sm border-2 hover:border-teal-300 hover:shadow-md transition-all duration-200"
      style={{ borderColor: C.border }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.tealLt }}>
        <Icon size={18} style={{ color: C.teal }} aria-hidden="true" />
      </div>
      <span className="font-semibold text-sm" style={{ color: C.text }}>{title}</span>
    </div>
  );
}

function FormField({ label, id, type = "text", required = false, value, onChange, placeholder, as = "input", options = [] }) {
  const base = "w-full rounded-xl border-2 bg-white text-base px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-4 focus:border-teal-500 transition-colors";
  const style = { color: C.text, borderColor: C.border };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold" style={{ color: C.text }}>
        {label}{required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} required={required} value={value} onChange={onChange}
          placeholder={placeholder} rows={4} style={style} className={base + " resize-none"} />
      ) : as === "select" ? (
        <select id={id} name={id} required={required} value={value} onChange={onChange} style={style} className={base}>
          <option value="">Select an option</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} name={id} type={type} required={required} value={value} onChange={onChange}
          placeholder={placeholder} style={style} className={base} />
      )}
    </div>
  );
}

// Pill badge for hero trust strip
function TrustPill({ children }) {
  return (
    <li className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
      <CheckCircle size={14} style={{ color: "#5EE0E0" }} aria-hidden="true" />
      <span className="text-sm font-semibold text-white">{children}</span>
    </li>
  );
}

// ============================================================
// SECTION COMPONENTS
// ============================================================

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 shadow-sm" style={{ borderColor: C.border }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">

        {/* Logo + brand name */}
        <a href="#home" className="flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-teal-400 rounded-lg p-1">
          <img
            src={LOGO_IMG}
            alt="DYMCnG logo — mountain arch mark on navy background"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <div className="font-bold text-base leading-tight" style={{ color: C.text }}>{brand.name}</div>
            <div className="text-[10px] font-semibold leading-tight hidden sm:block" style={{ color: C.text }}>Counsel &amp; Guidance</div>
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm font-semibold hover:underline underline-offset-4 decoration-teal-500 decoration-2 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-1"
              style={{ color: C.text }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a href={contact.bookingLink}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors shadow focus:outline-none focus:ring-4 focus:ring-teal-400"
            style={{ background: C.teal, color: "#fff" }}>
            <Calendar size={14} aria-hidden="true" /> Book a Free Call
          </a>
          <button aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
            className="lg:hidden p-2 focus:outline-none focus:ring-4 focus:ring-teal-400 rounded"
            style={{ color: C.text }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t-2 px-4 pb-4 pt-2 flex flex-col gap-1" style={{ borderColor: C.border }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold py-3 border-b hover:underline decoration-teal-500 decoration-2 transition-all"
              style={{ color: C.text, borderColor: C.border }}>
              {link.label}
            </a>
          ))}
          <a href={contact.bookingLink}
            className="mt-3 flex justify-center items-center gap-2 text-sm font-bold px-5 py-3 rounded-full"
            style={{ background: C.teal, color: "#fff" }}>
            <Calendar size={14} aria-hidden="true" /> Book a Free Discovery Call
          </a>
        </div>
      )}
    </header>
  );
}

// ── HERO ──────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: C.navy }}>
      {/* Full-bleed student photo with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={STUDENT_IMGS.hero}
          alt="Indian school students collaborating on their studies"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Two-layer overlay: dark navy + subtle teal gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,30,46,0.92) 0%, rgba(15,30,46,0.80) 50%, rgba(13,143,143,0.35) 100%)" }} aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border border-white/30 bg-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-300" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest uppercase text-white">Career &amp; Education Counselling · Grades 7–12</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Clear Career &amp; Education<br />
            <span style={{ color: "#5EE0E0" }}>Guidance for Grades 7–12</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl font-medium">
            Personalized assessments, stream selection, college guidance, and actionable plans for students and families who want clarity — not just options.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <CTAButton href={contact.bookingLink} variant="primary" className="text-base px-8 py-4">
              <Calendar size={17} aria-hidden="true" /> Book a Free 20-Min Call
            </CTAButton>
            <CTAButton href="#services" variant="outline" className="text-base px-8 py-4">
              Explore Services <ArrowRight size={17} aria-hidden="true" />
            </CTAButton>
          </div>

          {/* Trust pills */}
          <ul className="flex flex-wrap gap-3" aria-label="Key trust signals">
            <TrustPill>30+ years global experience</TrustPill>
            <TrustPill>Psychometric-informed guidance</TrustPill>
            <TrustPill>India and Abroad pathways</TrustPill>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── VALUE PILLARS ─────────────────────────────────────────────
function ValuePillarsSection() {
  return (
    <section style={{ background: C.bgGrey }} className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why families choose us" title="Guidance built on four core commitments"
          subtitle="Every decision at DYMCnG is shaped by these principles — for students and parents alike." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePillars.map((p) => <ValuePillarCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  );
}

// ── FOUNDER ───────────────────────────────────────────────────
function FounderSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Meet your counsellor" title="Meet Your Counsellor" />

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{ background: C.tealLt }} aria-hidden="true" />
              <div className="absolute -left-2 top-10 bottom-10 w-1.5 rounded-full" style={{ background: C.teal }} aria-hidden="true" />
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-2" style={{ borderColor: C.border }}>
                <img
                  src={FOUNDER_IMG}
                  alt="Dr (h.c.) Yazdi G. Mehta, Founder and Counsellor at DYMCnG, professional headshot"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: C.teal }}>Founder &amp; Counsellor</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: C.text }}>Dr (h.c.) Yazdi G. Mehta</h3>
            <p className="text-sm font-semibold mb-6" style={{ color: C.text }}>Counsellor &amp; Mentor | 30+ Years Global Cross-Industry Experience</p>

            <div className="space-y-4 text-base leading-relaxed mb-8" style={{ color: C.text }}>
              <p>Dr (h.c.) Yazdi G. Mehta is the Founder and Counsellor at DYMCnG, bringing 30+ years of experience across Aviation, Manufacturing, Education, and Technology in India and international markets. His work is rooted in helping students and families move from uncertainty to clarity through personalized guidance, psychometric-informed insights, and practical academic and career roadmaps.</p>
              <p>With an EMBA from Hult Ashridge Business School in the UK, an Honorary Doctorate DBA from Dunster Business School in Switzerland, and career counselling certifications through NSDC-approved and academic counselling programs, he combines global exposure with empathetic, family-aware mentoring.</p>
              <p>At DYMCnG, his approach is simple: understand the student, identify their strengths, map realistic pathways, and create an actionable plan that builds confidence for the future.</p>
            </div>

            <ul className="flex flex-wrap gap-2" aria-label="Credentials">
              {credentials.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-50 border-2 px-3 py-1.5 rounded-full"
                  style={{ color: C.text, borderColor: C.border }}>
                  <CheckCircle size={11} style={{ color: C.teal }} aria-hidden="true" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why DYMCnG callout */}
        <div className="mt-16 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto text-center" style={{ background: C.navy }}>
          <h3 className="text-xl font-bold text-white mb-3">Why DYMCnG?</h3>
          <p className="leading-relaxed max-w-2xl mx-auto text-base text-slate-200">
            DYMCnG combines psychometric-informed guidance, real-world career exposure, student mentoring, and parent-aware planning to help families make confident academic and career decisions.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" style={{ background: C.bgGrey }} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner image above the cards */}
        <div className="rounded-2xl overflow-hidden mb-12 h-52 sm:h-64 lg:h-72 relative shadow-md">
          <img
            src={STUDENT_IMGS.classroom}
            alt="Students attentively learning in an Indian school classroom"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8"
            style={{ background: "linear-gradient(to top, rgba(15,30,46,0.85) 0%, rgba(15,30,46,0.20) 60%, transparent 100%)" }}>
            <span className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#5EE0E0" }}>What we offer</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Counselling Services</h2>
          </div>
        </div>

        <p className="text-center text-base mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: C.text }}>
          Structured guidance programmes for every stage of a student's academic journey — from Grade 7 to university applications.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section id="process" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="How it works" title="Our Guidance Roadmap"
          subtitle="A structured five-step journey from first conversation to confident decision." />
        <div className="hidden md:grid md:grid-cols-5 gap-4 relative">
          {processSteps.map((step, i) => (
            <ProcessStepCard key={step.title} {...step} isLast={i === processSteps.length - 1} />
          ))}
        </div>
        <ol className="md:hidden flex flex-col gap-4">
          {processSteps.map((step) => (
            <li key={step.title} className="flex gap-4 rounded-xl p-5 border-2" style={{ background: C.bgGrey, borderColor: C.border }}>
              <div className="w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: C.teal }}>{step.number}</div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: C.text }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.text }}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── AUDIENCE ──────────────────────────────────────────────────
function AudienceSection() {
  return (
    <section style={{ background: C.navy }} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Who we guide" title="Guidance for every family member" onDark />
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {audienceSections.map((a) => (
            <div key={a.label} className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg">
              {/* Photo header */}
              <div className="relative h-44 sm:h-52">
                <img src={a.img} alt={a.label === "For Parents" ? "Indian parents discussing their child's education" : "Indian student receiving mentoring guidance"} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,30,46,0.80) 0%, rgba(15,30,46,0.10) 100%)" }} aria-hidden="true" />
                <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full inline-block" style={{ background: "#5EE0E0" }} aria-hidden="true" />
                  {a.label}
                </h3>
              </div>
              {/* Points */}
              <div className="p-6" style={{ background: "rgba(255,255,255,0.06)" }}>
                <ul className="space-y-3">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-slate-200 text-base leading-relaxed">
                      <CheckCircle size={16} style={{ color: "#5EE0E0" }} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RESOURCES ─────────────────────────────────────────────────
function ResourcesSection() {
  return (
    <section id="resources" style={{ background: C.bgGrey }} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Future-ready pathways" title="Explore Future-Ready Career Paths"
          subtitle="New-age careers that are shaping the world your student will work in — explored early, chosen confidently." />
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {careers.map((c) => <CareerTag key={c} label={c} />)}
        </div>
        <div className="bg-white rounded-2xl border-2 p-7 max-w-2xl mx-auto text-center shadow-sm" style={{ borderColor: "#99DFE0" }}>
          <Download size={24} style={{ color: C.teal }} className="mx-auto mb-3" aria-hidden="true" />
          <h4 className="font-bold text-lg mb-2" style={{ color: C.text }}>Stream Selection Checklist</h4>
          <p className="text-base mb-5 leading-relaxed" style={{ color: C.text }}>A practical checklist to help students and parents evaluate stream options with confidence.</p>
          {/* Connect to real PDF or lead-capture form */}
          <CTAButton href="#contact" variant="primary">
            <Download size={15} aria-hidden="true" /> Download Free Checklist
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIAL ───────────────────────────────────────────────
function TestimonialSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Student stories" title="A Roadmap That Changed Direction" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Before", bg: C.bgGrey,  bdr: C.border,     head: C.teal, icon: "😕", desc: "Grade 10 student, unsure of stream, overwhelmed by options, no clear direction." },
            { label: "During", bg: C.tealLt,  bdr: "#99DFE0",    head: C.teal, icon: "🧭", desc: "Psychometric assessment plus mentoring sessions uncovered real strengths in numbers and analysis." },
            { label: "After",  bg: C.navy,    bdr: C.navy,       head: "#5EE0E0", icon: "✅", desc: "Chose Commerce with Math. Built a 6-month roadmap toward Finance and Analytics. Clear, motivated, confident." },
          ].map((stage) => (
            <div key={stage.label} className="rounded-2xl border-2 p-6"
              style={{ background: stage.bg, borderColor: stage.bdr }}>
              <div className="text-2xl mb-3" aria-hidden="true">{stage.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: stage.head }}>{stage.label}</div>
              <p className="text-base leading-relaxed" style={{ color: stage.label === "After" ? "#E2E8F0" : C.text }}>{stage.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-6 font-medium" style={{ color: C.text }}>
          Student stories are anonymized and shared only with consent.
        </p>
      </div>
    </section>
  );
}

// ── WORKSHOPS ─────────────────────────────────────────────────
function WorkshopsSection() {
  return (
    <section id="workshops" style={{ background: C.bgGrey }} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: text + CTA */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: C.teal }}>For Schools</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: C.text }}>Workshops for Schools</h2>
            <p className="leading-relaxed mb-6 text-base" style={{ color: C.text }}>
              DYMCnG offers school workshops designed to help students and parents understand stream selection, future careers, AI and technology pathways, study abroad planning, and confident decision-making.
            </p>
            {/* Workshop photo */}
            <div className="rounded-2xl overflow-hidden mb-7 h-48 shadow-md">
              <img
                src={STUDENT_IMGS.workshop}
                alt="School workshop — students engaged in a career guidance presentation"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CTAButton href={contact.whatsappLink} variant="primary">
              <MessageCircle size={15} aria-hidden="true" /> Invite DYMCnG for a Workshop
            </CTAButton>
          </div>
          {/* Right: topic cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            {workshopTopics.map((w) => <WorkshopCard key={w.title} {...w} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", message: "", service: "" });
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "New enquiry from DYMCnG website" }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", phone: "", grade: "", message: "", service: "" });
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ background: C.navy }} className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #0D8F8F 0%, transparent 60%)" }} aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: "#5EE0E0" }}>Get started</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to Move from Confusion to Clarity?</h2>
          <p className="text-slate-200 leading-relaxed text-base max-w-2xl mx-auto">Book a free 20-minute parent-student discovery call and start building a personalized education and career roadmap.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: quick actions + contact info */}
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <CTAButton href={contact.bookingLink} variant="primary" className="text-base px-7 py-3.5 justify-center">
                <Calendar size={17} aria-hidden="true" /> Book a Free Discovery Call
              </CTAButton>
              <CTAButton href={contact.whatsappLink} variant="outline" className="text-base px-7 py-3.5 justify-center">
                <MessageCircle size={17} aria-hidden="true" /> WhatsApp Us
              </CTAButton>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { icon: Phone, label: contact.whatsapp, href: contact.whatsappLink },
                { icon: Mail,  label: contact.email,    href: `mailto:${contact.email}` },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href}
                  className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors text-base font-medium focus:outline-none focus:underline">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
                    <Icon size={16} style={{ color: "#5EE0E0" }} aria-hidden="true" />
                  </div>
                  {label}
                </a>
              ))}
              <span className="flex items-center gap-3 text-slate-200 text-base font-medium">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10">
                  <Globe size={16} style={{ color: "#5EE0E0" }} aria-hidden="true" />
                </div>
                {contact.website}
              </span>
            </div>

            <div className="rounded-xl p-5 border border-white/20 bg-white/8">
              <p className="text-slate-200 text-sm leading-relaxed font-medium">
                <strong className="text-white">Not sure where to start?</strong> Fill in the enquiry form and we will reach out within 24 hours to schedule your free discovery call.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-7 shadow-xl">
            <h3 className="font-bold text-xl mb-6" style={{ color: C.text }}>Send Us an Enquiry</h3>

            {status === "success" ? (
              <div className="text-center py-10" role="alert" aria-live="polite">
                <CheckCircle size={48} style={{ color: C.teal }} className="mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2" style={{ color: C.text }}>Message Received!</h4>
                <p className="text-base leading-relaxed" style={{ color: C.text }}>Thank you for reaching out. We will get back to you within 24 hours to schedule your free discovery call.</p>
                <button onClick={() => setStatus("idle")} className="mt-5 font-bold text-sm underline focus:outline-none focus:ring-2 rounded" style={{ color: C.teal }}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} ref={formRef} noValidate aria-label="Enquiry form">
                <input type="hidden" name="_replyto" value={form.email} />
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <FormField label="Full Name"       id="name"  required value={form.name}  onChange={handleChange} placeholder="Your full name" />
                  <FormField label="Email Address"   id="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <FormField label="Phone / WhatsApp" id="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  <FormField label="Student Grade"    id="grade" as="select" value={form.grade} onChange={handleChange}
                    options={["Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12","Post Grade 12"]} />
                </div>
                <div className="mb-4">
                  <FormField label="Service of Interest" id="service" as="select" value={form.service} onChange={handleChange}
                    options={["Psychometric Assessment","Stream Selection","Career Pathway Planning","University Shortlisting","Profile Building","SOP / Essay Guidance","Parent Strategy Session","School Workshop","General Enquiry"]} />
                </div>
                <div className="mb-6">
                  <FormField label="Your Message" id="message" required as="textarea" value={form.message} onChange={handleChange}
                    placeholder="Tell us a little about your situation and what kind of guidance you are looking for." />
                </div>
                {status === "error" && (
                  <div className="flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4" role="alert" aria-live="assertive">
                    <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm font-semibold">Something went wrong. Please try again or WhatsApp us directly.</p>
                  </div>
                )}
                <CTAButton type="submit" variant="primary" className="w-full justify-center text-base py-3.5">
                  {status === "sending"
                    ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" /> Sending...</>
                    : <><Send size={16} aria-hidden="true" /> Send Enquiry</>}
                </CTAButton>
                <p className="text-xs mt-3 text-center font-medium" style={{ color: C.text }}>
                  We respond within 24 hours. Your details are never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={LOGO_IMG} alt="DYMCnG logo" className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <div className="font-bold text-white text-base leading-tight">{brand.name}</div>
                <div className="text-xs text-slate-400 font-medium">Counsel &amp; Guidance</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5 font-medium">"{brand.tagline}"</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-teal-700 hover:text-white transition-colors focus:outline-none focus:ring-4 focus:ring-teal-400">
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-300 hover:text-white font-medium transition-colors focus:outline-none focus:underline">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Psychometric Assessments","Stream Selection","Career Planning","University Guidance","Profile Building","SOP and Essays"].map(s => (
                <li key={s}>
                  <a href="#services" className="text-slate-300 hover:text-white font-medium transition-colors focus:outline-none focus:underline">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={contact.whatsappLink} className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors focus:outline-none focus:underline"><Phone size={13} aria-hidden="true" /> {contact.whatsapp}</a></li>
              <li><a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white font-medium break-all transition-colors focus:outline-none focus:underline"><Mail size={13} aria-hidden="true" /> {contact.email}</a></li>
              <li className="flex items-center gap-2 text-slate-300 font-medium"><Globe size={13} aria-hidden="true" /> {contact.website}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} {brand.name} — {brand.fullName}. All rights reserved.</p>
          <p className="max-w-sm sm:text-right">Assessment data is handled with care and used only for counselling and planning purposes.</p>
        </div>
      </div>
    </footer>
  );
}

// ── WHATSAPP FLOATING BUTTON ──────────────────────────────────
function WhatsAppFAB() {
  return (
    <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer"
      aria-label="Chat with DYMCnG on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 font-bold text-sm pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 hover:scale-105"
      style={{ background: "#25D366", color: "#fff" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

// ============================================================
// APP ROOT
// ============================================================

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", fontSize: "16px", lineHeight: "1.6", color: C.text }}>
      {/* Skip-to-content for keyboard users */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-white"
        style={{ background: C.teal }}>
        Skip to main content
      </a>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main-content">
        <HeroSection />
        <ValuePillarsSection />
        <FounderSection />
        <ServicesSection />
        <ProcessSection />
        <AudienceSection />
        <ResourcesSection />
        <TestimonialSection />
        <WorkshopsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

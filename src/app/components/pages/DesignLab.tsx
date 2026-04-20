import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Compass, BookMarked, FileText,
  Headphones, BookOpen, Download, ChevronRight, X, Search,
} from "lucide-react";

// ─── shared tour data ────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "nav",
    title: "Navigate with ease",
    body: "The bottom bar takes you anywhere — Home, Explore, Shelf, and Annotations in one tap.",
    icon: <Compass className="w-5 h-5" />,
    emoji: "🧭",
  },
  {
    id: "borrow",
    title: "Borrow & save books",
    body: "Tap any title to borrow or save it to your wishlist. Your library card handles everything.",
    icon: <BookMarked className="w-5 h-5" />,
    emoji: "📚",
  },
  {
    id: "annotate",
    title: "Highlight & annotate",
    body: "Select any passage while reading to add a highlight or note. Review them all in Annotations.",
    icon: <FileText className="w-5 h-5" />,
    emoji: "✏️",
  },
  {
    id: "ebook",
    title: "Read in-app",
    body: "A clean, distraction-free e-book reader built right in. Adjust font, theme, and brightness.",
    icon: <BookOpen className="w-5 h-5" />,
    emoji: "📖",
  },
  {
    id: "audio",
    title: "Listen on the go",
    body: "Switch to audiobook mode anytime. Full playback controls, speed, and sleep timer included.",
    icon: <Headphones className="w-5 h-5" />,
    emoji: "🎧",
  },
  {
    id: "export",
    title: "Export your notes",
    body: "Share highlights as a PDF or copy them straight to your clipboard — great for studying.",
    icon: <Download className="w-5 h-5" />,
    emoji: "📤",
  },
];

// ─── Desktop mock app ─────────────────────────────────────────────────────────

function MockApp({ highlightZone }: { highlightZone?: string }) {
  const navItems = [
    { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
    { id: "explore", icon: <Compass className="w-5 h-5" />, label: "Explore" },
    { id: "shelf", icon: <BookMarked className="w-5 h-5" />, label: "Shelf" },
    { id: "annotations", icon: <FileText className="w-5 h-5" />, label: "Annotations" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white overflow-hidden">
      {/* top bar */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 bg-gray-800 rounded-lg px-3 py-1.5 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-400">Search books, authors…</span>
        </div>
        <div className="text-sm text-gray-400">LibbyU</div>
      </div>

      {/* main content */}
      <div className="flex-1 overflow-hidden px-6 py-4 flex gap-6">
        {/* left column */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold mb-0.5">Home</h1>
          <p className="text-gray-400 text-sm mb-5">Good afternoon!</p>

          {/* borrow zone */}
          <div
            className={`rounded-xl p-4 mb-5 transition-all duration-300 ${
              highlightZone === "borrow"
                ? "ring-2 ring-pink-500 bg-pink-500/5"
                : "bg-[#222]"
            }`}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Recents</p>
            <div className="flex gap-4 items-start">
              <div className="w-16 h-22 bg-gray-700 rounded-lg shrink-0" style={{ height: "88px" }} />
              <div>
                <p className="font-medium">Cherry Baby</p>
                <p className="text-sm text-gray-400 mb-2">Rainbow Rowell</p>
                <p className="text-xs text-gray-500 mb-3">Due in 17 days</p>
                <button className="bg-pink-500 text-white text-sm rounded-lg px-4 py-1.5 hover:bg-pink-600 transition-colors">
                  Borrow
                </button>
              </div>
            </div>
          </div>

          {/* annotations zone */}
          <div
            className={`rounded-xl p-4 transition-all duration-300 ${
              highlightZone === "annotate" || highlightZone === "export"
                ? "ring-2 ring-pink-500 bg-pink-500/5"
                : "bg-[#222]"
            }`}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Latest annotations</p>
            <div className="flex items-start gap-3">
              <div className="w-10 h-14 bg-gray-700 rounded shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1">Cherry Baby</p>
                <div className="bg-yellow-400/25 border border-yellow-400/40 rounded px-2 py-1 inline-block">
                  <p className="text-sm text-yellow-200">"sixteen shades of chestnut brown"</p>
                </div>
                {highlightZone === "export" && (
                  <div className="mt-2 flex gap-2">
                    <button className="text-xs bg-gray-700 rounded px-2 py-1 text-gray-300">Copy</button>
                    <button className="text-xs bg-gray-700 rounded px-2 py-1 text-gray-300">Export PDF</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* right column — reader preview */}
        {(highlightZone === "ebook" || highlightZone === "audio") && (
          <div className="w-56 shrink-0">
            <div className="bg-[#222] rounded-xl p-4 ring-2 ring-pink-500">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                {highlightZone === "ebook" ? "Reading now" : "Listening now"}
              </p>
              <div className="flex gap-3 items-start mb-3">
                <div className="w-12 h-16 bg-gray-700 rounded shrink-0" />
                <div>
                  <p className="text-sm font-medium">Cherry Baby</p>
                  <p className="text-xs text-pink-400 mt-0.5">
                    {highlightZone === "ebook" ? "Chapter 3 — 42%" : "5h 23m remaining"}
                  </p>
                </div>
              </div>
              {highlightZone === "audio" && (
                <div className="flex items-center justify-center gap-3 mt-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs">«</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">▶</div>
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs">»</div>
                </div>
              )}
              {highlightZone === "ebook" && (
                <div className="text-xs text-gray-400 leading-relaxed mt-1 line-clamp-3">
                  "She had sixteen shades of chestnut brown hair and a smile that could…"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* nav bar */}
      <div
        className={`border-t border-gray-800 flex justify-around py-2 transition-all duration-300 ${
          highlightZone === "nav" ? "ring-2 ring-pink-500 bg-pink-500/5" : ""
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-1 py-1 px-5 ${
              item.id === "home" ? "text-pink-500" : "text-gray-400"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop browser frame ────────────────────────────────────────────────────

function DesktopFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full rounded-xl border border-gray-700 bg-[#1a1a1a] overflow-hidden shadow-2xl ${className}`} style={{ height: "400px" }}>
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 max-w-xs mx-auto bg-gray-800 rounded px-3 py-0.5 text-xs text-gray-400 text-center">
          libbyu.app
        </div>
      </div>
      {/* content area */}
      <div className="relative" style={{ height: "calc(400px - 33px)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Dots + Controls ──────────────────────────────────────────────────────────

function TourControls({
  step,
  total,
  onNext,
  onSkip,
}: {
  step: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const isLast = step === total - 1;
  return (
    <div className="flex items-center justify-between gap-4 w-full mt-4">
      <button
        onClick={onSkip}
        className="text-gray-400 text-sm hover:text-white transition-colors"
      >
        Skip tour
      </button>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === step ? "w-5 h-2.5 bg-pink-500" : "w-2.5 h-2.5 bg-gray-600"
            }`}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="bg-pink-500 text-white text-sm rounded-full px-4 py-1.5 hover:bg-pink-600 transition-colors flex items-center gap-1.5"
      >
        {isLast ? "Done" : "Next"}
        {!isLast && <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ─── Done screen ──────────────────────────────────────────────────────────────

function DoneScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85"
    >
      <motion.p
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="text-5xl mb-3"
      >
        🎉
      </motion.p>
      <p className="text-lg font-semibold text-white mb-1">You're all set!</p>
      <p className="text-sm text-gray-400 mb-4">Happy reading 📚</p>
      <button onClick={onReplay} className="text-sm text-pink-400 underline">
        Replay tour
      </button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT A — Dark overlay + tooltip card with pointer arrow
// ═══════════════════════════════════════════════════════════════════════════════

function VariantA() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = STEPS[step];
  const isNavStep = current.id === "nav";

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded">A</span>
        <span className="font-semibold text-white">Spotlight Overlay + Tooltip Arrow</span>
        <span className="text-gray-500 text-sm">— Dark overlay with a floating card pointing to the highlighted zone</span>
      </div>
      <DesktopFrame>
        <MockApp highlightZone={done ? undefined : current.id} />
        {!done && (
          <>
            <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className={`absolute z-20 w-80 bg-[#242424] border border-gray-600 rounded-2xl p-5 shadow-2xl ${
                  isNavStep
                    ? "bottom-20 left-1/2 -translate-x-1/2"
                    : "top-24 left-1/2 -translate-x-1/2"
                }`}
              >
                {/* pointer arrow */}
                {isNavStep ? (
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#242424]" />
                ) : (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#242424]" />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{current.emoji}</span>
                  <h3 className="font-semibold text-white text-base">{current.title}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{current.body}</p>
                <TourControls
                  step={step}
                  total={STEPS.length}
                  onNext={() => step < STEPS.length - 1 ? setStep(step + 1) : setDone(true)}
                  onSkip={() => setDone(true)}
                />
              </motion.div>
            </AnimatePresence>
          </>
        )}
        {done && <DoneScreen onReplay={() => { setStep(0); setDone(false); }} />}
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT B — Bottom sheet slides up + zone glow highlight
// ═══════════════════════════════════════════════════════════════════════════════

function VariantB() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = STEPS[step];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded">B</span>
        <span className="font-semibold text-white">Bottom Sheet + Glow Ring</span>
        <span className="text-gray-500 text-sm">— App stays visible, drawer slides up with step content</span>
      </div>
      <DesktopFrame>
        <MockApp highlightZone={done ? undefined : current.id} />
        {!done && (
          <AnimatePresence>
            <motion.div
              key={step}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 z-20 bg-[#1e1e1e] border-t border-gray-700 rounded-t-2xl px-6 py-5 shadow-2xl"
            >
              <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 text-2xl">
                  {current.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-base mb-1">{current.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{current.body}</p>
                </div>
              </div>
              <TourControls
                step={step}
                total={STEPS.length}
                onNext={() => step < STEPS.length - 1 ? setStep(step + 1) : setDone(true)}
                onSkip={() => setDone(true)}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {done && <DoneScreen onReplay={() => { setStep(0); setDone(false); }} />}
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT C — Floating popover card anchored to highlighted element
// ═══════════════════════════════════════════════════════════════════════════════

function VariantC() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = STEPS[step];

  const isNavStep = current.id === "nav";
  const cardClass = isNavStep
    ? "bottom-20 right-8"
    : "top-28 right-8";

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded">C</span>
        <span className="font-semibold text-white">Floating Popover (no overlay)</span>
        <span className="text-gray-500 text-sm">— No background dim, card floats near the highlighted element</span>
      </div>
      <DesktopFrame>
        <MockApp highlightZone={done ? undefined : current.id} />
        {!done && (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.18 }}
              className={`absolute ${cardClass} z-20 w-72 bg-[#2a2a2a] border border-pink-500/25 rounded-2xl p-4 shadow-2xl`}
            >
              {/* arrow pointing left toward the content */}
              <div className="absolute top-5 -left-2.5 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[10px] border-t-transparent border-b-transparent border-r-[#2a2a2a]" />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{current.emoji}</span>
                  <h3 className="font-semibold text-white text-sm">{current.title}</h3>
                </div>
                <button onClick={() => setDone(true)} className="text-gray-500 hover:text-gray-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{current.body}</p>
              <TourControls
                step={step}
                total={STEPS.length}
                onNext={() => step < STEPS.length - 1 ? setStep(step + 1) : setDone(true)}
                onSkip={() => setDone(true)}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {done && <DoneScreen onReplay={() => { setStep(0); setDone(false); }} />}
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT D — Right side panel tour guide
// ═══════════════════════════════════════════════════════════════════════════════

function VariantD() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = STEPS[step];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded">D</span>
        <span className="font-semibold text-white">Side Panel Guide</span>
        <span className="text-gray-500 text-sm">— Fixed panel on the right, app visible on the left with highlights</span>
      </div>
      <DesktopFrame>
        <div className="flex h-full">
          {/* app takes most of the space */}
          <div className="flex-1 overflow-hidden">
            <MockApp highlightZone={done ? undefined : current.id} />
          </div>
          {/* side panel */}
          {!done && (
            <div className="w-64 shrink-0 bg-[#1e1e1e] border-l border-gray-700 flex flex-col">
              {/* header */}
              <div className="px-4 pt-4 pb-3 border-b border-gray-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Quick Tour</span>
                <button onClick={() => setDone(true)} className="text-gray-500 hover:text-gray-300 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* step list */}
              <div className="flex-1 overflow-y-auto py-3">
                {STEPS.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      i === step ? "bg-pink-500/10 border-l-2 border-pink-500" : "border-l-2 border-transparent"
                    }`}
                  >
                    <span className={`text-lg shrink-0 ${i > step ? "opacity-40" : ""}`}>{s.emoji}</span>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium leading-tight ${i === step ? "text-white" : i < step ? "text-gray-400 line-through" : "text-gray-500"}`}>
                        {s.title}
                      </p>
                    </div>
                    {i < step && <span className="ml-auto text-green-500 text-xs shrink-0">✓</span>}
                  </div>
                ))}
              </div>
              {/* current step detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-4 border-t border-gray-800 bg-[#1a1a1a]"
                >
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">{current.body}</p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setDone(true)} className="text-gray-500 text-xs hover:text-white transition-colors">Skip</button>
                    <button
                      onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : setDone(true)}
                      className="bg-pink-500 text-white text-sm rounded-full px-4 py-1.5 hover:bg-pink-600 transition-colors flex items-center gap-1"
                    >
                      {step === STEPS.length - 1 ? "Done" : "Next"}
                      {step < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          {done && (
            <div className="w-64 shrink-0 bg-[#1e1e1e] border-l border-gray-700 flex flex-col items-center justify-center gap-3">
              <p className="text-4xl">🎉</p>
              <p className="font-semibold text-white">You're all set!</p>
              <button onClick={() => { setStep(0); setDone(false); }} className="text-sm text-pink-400 underline">Replay</button>
            </div>
          )}
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT E — Centered modal card with gradient header
// ═══════════════════════════════════════════════════════════════════════════════

function VariantE() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const current = STEPS[step];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded">E</span>
        <span className="font-semibold text-white">Centered Modal + Gradient Header</span>
        <span className="text-gray-500 text-sm">— Blur overlay with bold step cards and a confetti finish</span>
      </div>
      <DesktopFrame>
        <MockApp highlightZone={done ? undefined : current.id} />
        {!done && (
          <>
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px] z-10" />
            <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  className="w-full max-w-md bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-5 flex items-center gap-4">
                    <span className="text-4xl">{current.emoji}</span>
                    <div>
                      <p className="text-xs text-pink-100/70 font-medium uppercase tracking-wider mb-0.5">
                        Step {step + 1} of {STEPS.length}
                      </p>
                      <h3 className="text-white font-semibold text-lg leading-tight">{current.title}</h3>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-300 leading-relaxed">{current.body}</p>
                    <TourControls
                      step={step}
                      total={STEPS.length}
                      onNext={() => step < STEPS.length - 1 ? setStep(step + 1) : setDone(true)}
                      onSkip={() => setDone(true)}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
        {done && <DoneScreen onReplay={() => { setStep(0); setDone(false); }} />}
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN LAB PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export function DesignLab() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs text-pink-400 font-semibold uppercase tracking-wider mb-1">Design Lab</p>
          <h1 className="text-3xl font-semibold mb-2">OnboardingFlow — 5 Variations</h1>
          <p className="text-gray-400">
            Click <strong className="text-white">Next</strong> inside any prototype to step through the 6-step tour.
            Each variation uses a different overlay approach.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <VariantA />
          <VariantB />
          <VariantC />
          <VariantD />
          <VariantE />
        </div>
      </div>
    </div>
  );
}

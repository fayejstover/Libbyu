import { useState } from "react";
import {
  BookOpen, Headphones, Compass, BookMarked, FileText, Search,
  ChevronRight, Bell, Settings, Star, Clock, Download, X, Zap,
  LayoutGrid, Library, Bookmark, PenLine, ArrowRight, Home,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const ACTIVE_BOOK = {
  title: "Cherry Baby",
  author: "Rainbow Rowell",
  cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
  progress: 42,
  chapter: "Chapter 5",
  dueDate: "17 days",
};

const FEATURES = [
  { id: "ebooks",      icon: <BookOpen className="w-4 h-4" />,   label: "E-books",      desc: "Read borrowed titles",           color: "#ec4899", path: "/book/1" },
  { id: "audiobooks",  icon: <Headphones className="w-4 h-4" />, label: "Audiobooks",   desc: "Listen while you move",          color: "#8b5cf6", path: "/audiobook/1" },
  { id: "explore",     icon: <Compass className="w-4 h-4" />,    label: "Explore",      desc: "Browse 6,000+ titles",           color: "#06b6d4", path: "/explore" },
  { id: "shelf",       icon: <BookMarked className="w-4 h-4" />, label: "Shelf",        desc: "Borrowed & saved books",         color: "#10b981", path: "/shelf" },
  { id: "annotations", icon: <FileText className="w-4 h-4" />,   label: "Annotations",  desc: "Your highlights & notes",        color: "#f59e0b", path: "/annotations" },
];

const RECENT_ANNOTATIONS = [
  { book: "Cherry Baby", highlight: "sixteen shades of chestnut brown", color: "#f59e0b", location: "Ch. 2" },
  { book: "Project Hail Mary", highlight: "I could feel the ship humming beneath me.", color: "#60a5fa", location: "Ch. 1" },
];

// ─── Shared chrome ────────────────────────────────────────────────────────────

function DesktopFrame({ children, height = 460 }: { children: React.ReactNode; height?: number }) {
  return (
    <div
      className="w-full rounded-xl border border-gray-700 overflow-hidden shadow-2xl"
      style={{ height, background: "#1a1a1a" }}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 max-w-xs mx-auto bg-gray-800 rounded px-3 py-0.5 text-xs text-gray-400 text-center">
          libbyu.app
        </div>
        <div className="flex gap-2">
          <Bell className="w-3.5 h-3.5 text-gray-600" />
          <Settings className="w-3.5 h-3.5 text-gray-600" />
        </div>
      </div>
      <div className="overflow-auto text-white" style={{ height: height - 33 }}>
        {children}
      </div>
    </div>
  );
}

function VariantLabel({ letter, name, desc }: { letter: string; name: string; desc: string }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">{letter}</span>
      <div>
        <span className="font-semibold text-white">{name}</span>
        <span className="text-gray-500 text-sm ml-2">— {desc}</span>
      </div>
    </div>
  );
}

function ProgressBar({ value, color = "#ec4899" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

// Pulsing badge used to mark post-onboarding "this is where it lives"
function AnchorBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium"
      style={{ background: "#ec4899", color: "#fff", fontSize: 10, animation: "pulse 2s infinite" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
      {label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT A — Persistent Left Sidebar
// Nav fully restructured around the 5 features, always visible on desktop.
// Onboarding "first-use" badges live on sidebar items post-tour.
// ═══════════════════════════════════════════════════════════════════════════════

function VariantA() {
  const [active, setActive] = useState("home");
  const [dismissed, setDismissed] = useState<string[]>([]);

  const sidebarSections = [
    {
      heading: "Read",
      items: [
        { id: "ebooks", icon: <BookOpen className="w-4 h-4" />, label: "E-books", sub: "2 active loans", isNew: true },
        { id: "audiobooks", icon: <Headphones className="w-4 h-4" />, label: "Audiobooks", sub: "Listen & download", isNew: true },
      ],
    },
    {
      heading: "Library",
      items: [
        { id: "explore", icon: <Compass className="w-4 h-4" />, label: "Explore", sub: "6,000+ titles", isNew: false },
        { id: "shelf", icon: <BookMarked className="w-4 h-4" />, label: "Shelf", sub: "Borrowed & saved", isNew: true },
      ],
    },
    {
      heading: "My Activity",
      items: [
        { id: "annotations", icon: <FileText className="w-4 h-4" />, label: "Annotations", sub: "12 highlights", isNew: true },
      ],
    },
  ];

  return (
    <div>
      <VariantLabel
        letter="A"
        name="Persistent Left Sidebar"
        desc="5 features always visible in sidebar. Post-onboarding 'NEW' anchors on each item fade as you visit them."
      />
      <DesktopFrame height={480}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-52 shrink-0 flex flex-col border-r border-gray-800" style={{ background: "#141414" }}>
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <span className="font-bold text-sm text-white tracking-tight">LibbyU</span>
              <span className="text-xs text-gray-500">UMich</span>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {/* Home */}
              <button
                onClick={() => setActive("home")}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg mx-2 text-left transition-colors"
                style={{
                  width: "calc(100% - 16px)",
                  background: active === "home" ? "#ec4899/15" : "transparent",
                  color: active === "home" ? "#ec4899" : "#9ca3af",
                }}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Home</span>
              </button>

              {sidebarSections.map((section) => (
                <div key={section.heading} className="mt-4 px-2">
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider px-1 mb-1">{section.heading}</p>
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActive(item.id); setDismissed([...dismissed, item.id]); }}
                      className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors mb-0.5"
                      style={{ background: active === item.id ? "rgba(236,72,153,0.12)" : "transparent" }}
                    >
                      <span style={{ color: active === item.id ? "#ec4899" : "#6b7280" }}>{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight" style={{ color: active === item.id ? "#f9fafb" : "#d1d5db" }}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight">{item.sub}</p>
                      </div>
                      {item.isNew && !dismissed.includes(item.id) && (
                        <AnchorBadge label="NEW" />
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="px-3 py-3 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <span className="text-xs text-pink-400 font-bold">F</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-200">Faye S.</p>
                  <p className="text-xs text-gray-500">UMich Library</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto p-5" style={{ background: "#1a1a1a" }}>
            {active === "home" && (
              <>
                <div className="mb-5">
                  <h1 className="text-xl font-semibold mb-0.5">Good afternoon, Faye</h1>
                  <p className="text-sm text-gray-400">University of Michigan Library · April 21</p>
                </div>

                {/* Continue reading */}
                <div className="rounded-xl p-4 mb-4 flex gap-4" style={{ background: "#232323" }}>
                  <img src={ACTIVE_BOOK.cover} alt="" className="w-16 rounded-lg shrink-0" style={{ height: 96, objectFit: "cover" }} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Continue reading</p>
                    <p className="font-semibold text-base mb-0.5">{ACTIVE_BOOK.title}</p>
                    <p className="text-sm text-gray-400 mb-2">{ACTIVE_BOOK.author} · {ACTIVE_BOOK.chapter}</p>
                    <ProgressBar value={ACTIVE_BOOK.progress} />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{ACTIVE_BOOK.progress}% · Due in {ACTIVE_BOOK.dueDate}</span>
                      <button className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full">Open</button>
                    </div>
                  </div>
                </div>

                {/* Post-onboarding feature guide strip */}
                <div className="rounded-xl p-4 mb-4" style={{ background: "#1e1e1e", border: "1px solid rgba(236,72,153,0.2)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-pink-400" />
                      <p className="text-sm font-medium text-white">You just finished the tour — find everything in the sidebar</p>
                    </div>
                    <button className="text-gray-600 hover:text-gray-400"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => { setActive(f.id); setDismissed([...dismissed, f.id]); }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
                        style={{ borderColor: `${f.color}40`, color: f.color, background: `${f.color}10` }}
                      >
                        {f.icon} {f.label} <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent annotations */}
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Recent highlights</p>
                {RECENT_ANNOTATIONS.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-800">
                    <div className="w-0.5 self-stretch rounded-full mt-1 shrink-0" style={{ background: a.color }} />
                    <div>
                      <p className="text-sm italic text-gray-300">"{a.highlight}"</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.book} · {a.location}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            {active !== "home" && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <span style={{ color: FEATURES.find(f => f.id === active)?.color }}>
                  {FEATURES.find(f => f.id === active)?.icon && (
                    <span style={{ transform: "scale(3)", display: "inline-block" }}>
                      {FEATURES.find(f => f.id === active)?.icon}
                    </span>
                  )}
                </span>
                <p className="text-lg font-semibold text-white mt-4">{FEATURES.find(f => f.id === active)?.label}</p>
                <p className="text-sm text-gray-400">{FEATURES.find(f => f.id === active)?.desc}</p>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT B — Top Nav + Feature Hub Home
// Desktop-native top navigation with all 5 features labeled.
// Home becomes a permanent feature dashboard — onboarding or not, nothing hidden.
// ═══════════════════════════════════════════════════════════════════════════════

function VariantB() {
  const [active, setActive] = useState("home");
  const topNav = [
    { id: "home",        icon: <Home className="w-3.5 h-3.5" />,       label: "Home" },
    { id: "ebooks",      icon: <BookOpen className="w-3.5 h-3.5" />,   label: "E-books",    badge: "2" },
    { id: "audiobooks",  icon: <Headphones className="w-3.5 h-3.5" />, label: "Audiobooks" },
    { id: "explore",     icon: <Compass className="w-3.5 h-3.5" />,    label: "Explore" },
    { id: "shelf",       icon: <BookMarked className="w-3.5 h-3.5" />, label: "Shelf",      badge: "3" },
    { id: "annotations", icon: <FileText className="w-3.5 h-3.5" />,   label: "Annotations", badge: "12" },
  ];

  return (
    <div>
      <VariantLabel
        letter="B"
        name="Top Nav + Feature Hub Home"
        desc="All 5 features as labeled top-nav tabs. Home is a permanent dashboard — no onboarding required to find anything."
      />
      <DesktopFrame height={480}>
        <div className="flex flex-col h-full">
          {/* Top nav */}
          <div className="flex items-center border-b border-gray-800 px-4" style={{ background: "#141414" }}>
            <span className="font-bold text-sm text-white mr-6 py-3 shrink-0">LibbyU</span>
            <div className="flex-1 flex">
              {topNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="flex items-center gap-1.5 px-3 py-3 text-sm relative transition-colors border-b-2"
                  style={{
                    color: active === item.id ? "#ec4899" : "#9ca3af",
                    borderBottomColor: active === item.id ? "#ec4899" : "transparent",
                  }}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#ec4899", color: "#fff", fontSize: 10, lineHeight: 1 }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center gap-1.5 bg-gray-800 rounded-full px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <input className="bg-transparent text-xs text-gray-400 outline-none w-28" placeholder="Search titles…" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-5">
            {active === "home" && (
              <div className="max-w-4xl">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <h1 className="text-xl font-semibold">Good afternoon, Faye</h1>
                    <p className="text-sm text-gray-400">University of Michigan Library</p>
                  </div>
                </div>

                {/* Feature grid — always visible, no onboarding needed */}
                <div className="grid grid-cols-5 gap-3 mb-5">
                  {FEATURES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActive(f.id)}
                      className="rounded-xl p-3 text-left flex flex-col gap-2 transition-all hover:scale-105"
                      style={{ background: `${f.color}10`, border: `1px solid ${f.color}25` }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${f.color}20` }}>
                        <span style={{ color: f.color }}>{f.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{f.label}</p>
                        <p className="text-xs text-gray-500 leading-tight">{f.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Continue reading */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 rounded-xl p-4 flex gap-4" style={{ background: "#232323" }}>
                    <img src={ACTIVE_BOOK.cover} alt="" className="w-14 rounded-lg shrink-0" style={{ height: 84, objectFit: "cover" }} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Continue reading</p>
                      <p className="font-semibold">{ACTIVE_BOOK.title}</p>
                      <p className="text-sm text-gray-400 mb-2">{ACTIVE_BOOK.author}</p>
                      <ProgressBar value={ACTIVE_BOOK.progress} />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-gray-500">{ACTIVE_BOOK.progress}% · Due in {ACTIVE_BOOK.dueDate}</span>
                        <button className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full">Open</button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl p-4" style={{ background: "#232323" }}>
                    <p className="text-xs text-gray-500 mb-3">Recent highlights</p>
                    {RECENT_ANNOTATIONS.map((a, i) => (
                      <div key={i} className="py-2 border-b border-gray-700 last:border-0">
                        <p className="text-xs italic text-gray-300 leading-relaxed">"{a.highlight.slice(0, 45)}…"</p>
                        <p className="text-xs text-gray-600 mt-0.5">{a.book}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {active !== "home" && (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <span style={{ color: FEATURES.find(f => f.id === active)?.color, fontSize: 40 }}>
                  {FEATURES.find(f => f.id === active)?.icon}
                </span>
                <p className="text-lg font-semibold">{FEATURES.find(f => f.id === active)?.label}</p>
                <p className="text-sm text-gray-400">{FEATURES.find(f => f.id === active)?.desc}</p>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT C — Two-Pane: Always-Visible Feature Nav + Content
// Left pane is a permanent feature navigator. Right pane shows content.
// No buried layers — every feature is always one click away.
// Post-onboarding: left pane has contextual tooltips for each item.
// ═══════════════════════════════════════════════════════════════════════════════

function VariantC() {
  const [active, setActive] = useState<string | null>(null);
  const [visitedTip, setVisitedTip] = useState<string[]>([]);

  const featureNav = [
    {
      ...FEATURES[0],
      tip: "This is where all your borrowed e-books open. Tap to start reading right in the browser.",
      statusLine: "42% through Cherry Baby",
    },
    {
      ...FEATURES[1],
      tip: "Audiobooks you've borrowed live here. Stream or download for offline listening.",
      statusLine: "No active audiobooks",
    },
    {
      ...FEATURES[2],
      tip: "Browse your library's full collection — search by subject, format, or popularity.",
      statusLine: "6,200 titles available",
    },
    {
      ...FEATURES[3],
      tip: "Everything you've borrowed or saved. Check due dates and return or renew here.",
      statusLine: "3 borrowed · 5 saved",
    },
    {
      ...FEATURES[4],
      tip: "Every highlight and note you make while reading lands here. Export to PDF anytime.",
      statusLine: "12 highlights saved",
    },
  ];

  return (
    <div>
      <VariantLabel
        letter="C"
        name="Two-Pane Feature Navigator"
        desc="Left pane is a permanent feature menu with status lines. Right shows content. Zero buried layers. Post-onboarding tooltips explain each item in context."
      />
      <DesktopFrame height={480}>
        <div className="flex h-full">
          {/* Left pane — feature navigator */}
          <div className="w-64 shrink-0 flex flex-col border-r border-gray-800" style={{ background: "#141414" }}>
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="font-bold text-sm text-white">LibbyU</p>
              <p className="text-xs text-gray-500">University of Michigan</p>
            </div>

            {/* Continue reading compact */}
            <div className="px-3 py-2.5 border-b border-gray-800" style={{ background: "#1a1a1a" }}>
              <div className="flex items-center gap-2.5">
                <img src={ACTIVE_BOOK.cover} alt="" className="w-8 h-11 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-gray-200">{ACTIVE_BOOK.title}</p>
                  <ProgressBar value={ACTIVE_BOOK.progress} />
                  <p className="text-xs text-gray-500 mt-0.5">{ACTIVE_BOOK.progress}%</p>
                </div>
                <button className="shrink-0 text-xs bg-pink-500 text-white px-2 py-1 rounded">Read</button>
              </div>
            </div>

            {/* Feature list */}
            <div className="flex-1 overflow-y-auto">
              <p className="text-xs text-gray-600 uppercase tracking-wider px-4 pt-3 pb-1 font-semibold">Features</p>
              {featureNav.map((f) => (
                <div key={f.id} className="relative">
                  <button
                    onClick={() => { setActive(f.id); setVisitedTip([...visitedTip, f.id]); }}
                    className="w-full px-3 py-2.5 text-left flex items-start gap-3 transition-colors"
                    style={{ background: active === f.id ? `${f.color}12` : "transparent" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: active === f.id ? `${f.color}25` : "#2a2a2a" }}
                    >
                      <span style={{ color: active === f.id ? f.color : "#6b7280" }}>{f.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight" style={{ color: active === f.id ? "#f9fafb" : "#d1d5db" }}>
                        {f.label}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight mt-0.5">{f.statusLine}</p>
                    </div>
                  </button>

                  {/* Post-onboarding inline tip — shows until visited */}
                  {!visitedTip.includes(f.id) && (
                    <div className="mx-3 mb-2 rounded-lg px-2.5 py-2 text-xs" style={{ background: `${f.color}10`, border: `1px solid ${f.color}25` }}>
                      <p className="text-gray-300 leading-relaxed">{f.tip}</p>
                      <button
                        onClick={() => setVisitedTip([...visitedTip, f.id])}
                        className="text-gray-500 text-xs mt-1 hover:text-gray-300"
                      >
                        Got it ✓
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right pane — content */}
          <div className="flex-1 overflow-auto p-5" style={{ background: "#1a1a1a" }}>
            {!active && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <LayoutGrid className="w-8 h-8 text-gray-700" />
                <p className="text-gray-500 text-sm">Select a feature from the left panel</p>
                <p className="text-gray-600 text-xs">Each item shows a tip explaining what's inside</p>
              </div>
            )}
            {active && (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${FEATURES.find(f => f.id === active)?.color}20` }}>
                  <span style={{ color: FEATURES.find(f => f.id === active)?.color }}>
                    {FEATURES.find(f => f.id === active)?.icon}
                  </span>
                </div>
                <p className="text-lg font-semibold">{FEATURES.find(f => f.id === active)?.label}</p>
                <p className="text-sm text-gray-400">{FEATURES.find(f => f.id === active)?.desc}</p>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT D — Contextual Onboarding Anchors (Stamps)
// The onboarding tour "stamps" visual markers on the real nav after each step.
// Users see exactly where each feature lives as they learn about it.
// Post-tour: Home shows a "feature map" card connecting tour memories to locations.
// ═══════════════════════════════════════════════════════════════════════════════

function VariantD() {
  const [tourStep, setTourStep] = useState(0);
  const [tourDone, setTourDone] = useState(false);

  const tourSteps = [
    { featureId: "ebooks",      navLabel: "E-books",     msg: "Tap E-books in the nav to open any borrowed title right in the browser." },
    { featureId: "audiobooks",  navLabel: "Audiobooks",  msg: "Audiobooks live right next to E-books — stream or download to listen offline." },
    { featureId: "explore",     navLabel: "Explore",     msg: "Browse and borrow from 6,000+ titles in your library. Save anything you want." },
    { featureId: "shelf",       navLabel: "Shelf",       msg: "Everything you've borrowed or saved lives on your Shelf. Check due dates here." },
    { featureId: "annotations", navLabel: "Annotations", msg: "Every highlight you make while reading is saved here automatically." },
  ];

  const stampedFeatures = tourSteps.slice(0, tourStep).map(s => s.featureId);
  const currentFeature = !tourDone ? tourSteps[tourStep]?.featureId : null;

  const topNav = [
    { id: "home",        icon: <Home className="w-3.5 h-3.5" />,       label: "Home" },
    { id: "ebooks",      icon: <BookOpen className="w-3.5 h-3.5" />,   label: "E-books" },
    { id: "audiobooks",  icon: <Headphones className="w-3.5 h-3.5" />, label: "Audiobooks" },
    { id: "explore",     icon: <Compass className="w-3.5 h-3.5" />,    label: "Explore" },
    { id: "shelf",       icon: <BookMarked className="w-3.5 h-3.5" />, label: "Shelf" },
    { id: "annotations", icon: <FileText className="w-3.5 h-3.5" />,   label: "Annotations" },
  ];

  return (
    <div>
      <VariantLabel
        letter="D"
        name="Onboarding Stamps → Real Nav"
        desc="Tour 'stamps' a ring on the real nav item as you learn each feature. After tour, Home shows a feature map. Click Next to step through."
      />
      <DesktopFrame height={480}>
        <div className="flex flex-col h-full">
          {/* Top nav with stamps */}
          <div className="flex items-center gap-1 px-4 border-b border-gray-800" style={{ background: "#141414" }}>
            <span className="font-bold text-sm text-white mr-4 py-3 shrink-0">LibbyU</span>
            {topNav.map((item) => {
              const isStamped = stampedFeatures.includes(item.id);
              const isCurrent = item.id === currentFeature;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-1.5 px-3 py-3 text-sm relative"
                  style={{
                    color: isStamped ? "#10b981" : isCurrent ? "#ec4899" : "#9ca3af",
                    borderBottom: isCurrent ? "2px solid #ec4899" : "2px solid transparent",
                  }}
                >
                  {item.icon}
                  {item.label}
                  {isCurrent && !tourDone && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-500"
                      style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
                    />
                  )}
                  {isStamped && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main area */}
            <div className="flex-1 p-5 overflow-auto" style={{ background: "#1a1a1a" }}>
              {!tourDone ? (
                <>
                  <h1 className="text-xl font-semibold mb-1">Welcome to LibbyU, Faye</h1>
                  <p className="text-sm text-gray-400 mb-4">Let's show you where everything lives — step through the features below.</p>

                  <div className="rounded-xl p-4 flex gap-4" style={{ background: "#232323" }}>
                    <img src={ACTIVE_BOOK.cover} alt="" className="w-14 rounded-lg shrink-0" style={{ height: 84, objectFit: "cover" }} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Your active loan</p>
                      <p className="font-semibold">{ACTIVE_BOOK.title}</p>
                      <p className="text-sm text-gray-400 mb-2">{ACTIVE_BOOK.author} · Due in {ACTIVE_BOOK.dueDate}</p>
                      <ProgressBar value={ACTIVE_BOOK.progress} />
                    </div>
                  </div>

                  {/* Feature map — stamps accumulate */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Features discovered</p>
                    <div className="grid grid-cols-5 gap-2">
                      {FEATURES.map((f) => {
                        const done = stampedFeatures.includes(f.id);
                        const current = f.id === currentFeature;
                        return (
                          <div
                            key={f.id}
                            className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center transition-all"
                            style={{
                              background: done ? `${f.color}15` : current ? "#2a2a2a" : "#1e1e1e",
                              border: current ? `1px solid ${f.color}` : done ? `1px solid ${f.color}40` : "1px solid #2a2a2a",
                            }}
                          >
                            <span style={{ color: done || current ? f.color : "#4b5563" }}>{f.icon}</span>
                            <p className="text-xs font-medium" style={{ color: done || current ? "#f9fafb" : "#6b7280" }}>{f.label}</p>
                            {done && <span className="text-green-400 text-xs">✓</span>}
                            {current && <span className="text-xs" style={{ color: f.color }}>← here</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-semibold mb-1">You're all set, Faye 🎉</h1>
                  <p className="text-sm text-gray-400 mb-4">All 5 features are stamped in the nav above. Find them anytime.</p>

                  <div className="grid grid-cols-5 gap-2 mb-5">
                    {FEATURES.map((f) => (
                      <div key={f.id} className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center" style={{ background: `${f.color}12`, border: `1px solid ${f.color}30` }}>
                        <span style={{ color: f.color }}>{f.icon}</span>
                        <p className="text-xs font-medium text-white">{f.label}</p>
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 flex gap-4" style={{ background: "#232323" }}>
                    <img src={ACTIVE_BOOK.cover} alt="" className="w-14 rounded-lg shrink-0" style={{ height: 84, objectFit: "cover" }} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Continue reading</p>
                      <p className="font-semibold">{ACTIVE_BOOK.title}</p>
                      <p className="text-sm text-gray-400 mb-2">{ACTIVE_BOOK.author}</p>
                      <ProgressBar value={ACTIVE_BOOK.progress} />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-gray-500">{ACTIVE_BOOK.progress}%</span>
                        <button className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full">Open</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tour card — right rail */}
            {!tourDone && (
              <div className="w-56 shrink-0 p-4 border-l border-gray-800" style={{ background: "#161616" }}>
                <p className="text-xs text-pink-400 uppercase tracking-wider font-semibold mb-2">
                  Step {tourStep + 1} of {tourSteps.length}
                </p>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${FEATURES.find(f => f.id === currentFeature)?.color}20` }}
                >
                  <span style={{ color: FEATURES.find(f => f.id === currentFeature)?.color }}>
                    {FEATURES.find(f => f.id === currentFeature)?.icon}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">{tourSteps[tourStep]?.navLabel}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{tourSteps[tourStep]?.msg}</p>
                <p className="text-xs text-gray-600 mb-3">↑ Watch the nav — it's being marked</p>
                <button
                  onClick={() => tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : setTourDone(true)}
                  className="w-full py-1.5 rounded-full text-sm font-medium text-center"
                  style={{ background: "#ec4899", color: "#fff" }}
                >
                  {tourStep < tourSteps.length - 1 ? "Next →" : "Done ✓"}
                </button>
                <button onClick={() => setTourDone(true)} className="w-full mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  Skip tour
                </button>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT E — Action-First Nav ("What do you want to do?")
// Nav labeled by action, not category. Every tab = one key user task.
// Home is a "what now?" launcher. Feature findability is zero-effort.
// ═══════════════════════════════════════════════════════════════════════════════

function VariantE() {
  const [active, setActive] = useState("home");

  const actionNav = [
    { id: "home",       icon: <Home className="w-4 h-4" />,         label: "Home",          sub: "Dashboard" },
    { id: "reading",    icon: <BookOpen className="w-4 h-4" />,     label: "Start Reading",  sub: "E-books",    color: "#ec4899" },
    { id: "listening",  icon: <Headphones className="w-4 h-4" />,   label: "Start Listening", sub: "Audiobooks", color: "#8b5cf6" },
    { id: "borrow",     icon: <Download className="w-4 h-4" />,     label: "Borrow & Save",  sub: "Explore",    color: "#06b6d4" },
    { id: "library",    icon: <Library className="w-4 h-4" />,      label: "My Library",     sub: "Shelf",      color: "#10b981" },
    { id: "notes",      icon: <PenLine className="w-4 h-4" />,      label: "My Notes",       sub: "Annotations", color: "#f59e0b" },
  ];

  return (
    <div>
      <VariantLabel
        letter="E"
        name='Action-First Nav ("What do you want to do?")'
        desc="Tabs are labeled by user action, not app category. Every feature is one click from any page. Home is a launcher, not a homepage."
      />
      <DesktopFrame height={480}>
        <div className="flex h-full">
          {/* Action sidebar */}
          <div className="w-48 shrink-0 flex flex-col border-r border-gray-800" style={{ background: "#111" }}>
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="font-bold text-sm text-white">LibbyU</p>
              <p className="text-xs text-gray-500">UMich Library</p>
            </div>
            <div className="flex-1 py-2">
              {actionNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                  style={{ background: active === item.id ? (item.color ? `${item.color}15` : "rgba(255,255,255,0.05)") : "transparent" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: active === item.id ? (item.color ? `${item.color}25` : "#2a2a2a") : "#1e1e1e" }}
                  >
                    <span style={{ color: active === item.id ? (item.color ?? "#f9fafb") : "#4b5563" }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ color: active === item.id ? "#f9fafb" : "#9ca3af" }}>
                      {item.label}
                    </p>
                    {item.sub && <p className="text-xs text-gray-600">{item.sub}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-5" style={{ background: "#1a1a1a" }}>
            {active === "home" && (
              <>
                <h1 className="text-xl font-semibold mb-1">What would you like to do, Faye?</h1>
                <p className="text-sm text-gray-400 mb-5">University of Michigan Library</p>

                {/* Action grid — big and obvious */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {actionNav.slice(1).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className="rounded-xl p-4 text-left flex flex-col gap-3 transition-all"
                      style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}20` }}>
                        <span style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: item.color }}>
                        Go <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Current read */}
                <div className="rounded-xl p-4 flex gap-4" style={{ background: "#232323" }}>
                  <img src={ACTIVE_BOOK.cover} alt="" className="w-14 rounded-lg shrink-0" style={{ height: 84, objectFit: "cover" }} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">You were reading</p>
                    <p className="font-semibold">{ACTIVE_BOOK.title}</p>
                    <p className="text-sm text-gray-400 mb-2">{ACTIVE_BOOK.author}</p>
                    <ProgressBar value={ACTIVE_BOOK.progress} />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-gray-500">{ACTIVE_BOOK.progress}% · Due in {ACTIVE_BOOK.dueDate}</span>
                      <button onClick={() => setActive("reading")} className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {active !== "home" && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${actionNav.find(n => n.id === active)?.color}20` }}
                >
                  <span style={{ color: actionNav.find(n => n.id === active)?.color, transform: "scale(1.5)", display: "inline-block" }}>
                    {actionNav.find(n => n.id === active)?.icon}
                  </span>
                </div>
                <p className="text-lg font-semibold">{actionNav.find(n => n.id === active)?.label}</p>
                <p className="text-sm text-gray-400">{actionNav.find(n => n.id === active)?.sub} content loads here</p>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN LAB PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export function DesignLabDiscoverability() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs text-pink-400 font-semibold uppercase tracking-wider mb-1">Design Lab</p>
          <h1 className="text-3xl font-semibold mb-2">Feature Discoverability — 5 Approaches</h1>
          <p className="text-gray-400 max-w-2xl">
            Problem: Onboarding reveals features but doesn't show where they live afterward — leaving users lost.
            Each variant below solves this differently across nav architecture, home page, and onboarding-to-app bridge.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Navigation", "Audiobooks", "E-books", "Annotations", "Borrow & Save"].map(f => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">{f}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-14">
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

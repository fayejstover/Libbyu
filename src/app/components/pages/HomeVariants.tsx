import { ChevronRight, Clock, BookOpen, Headphones, Quote, Search, Menu, MoreVertical, SlidersHorizontal, Star } from "lucide-react";
import { Link, useLocation } from "react-router";

// ─── Shared mock data ─────────────────────────────────────────────────────────

const BOOKS = [
  {
    id: "1",
    title: "Cherry Baby",
    author: "Rainbow Rowell",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    dueDate: "Due in 17 days",
    progress: 42,
    type: "ebook" as const,
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    dueDate: "Due in 8 days",
    progress: 71,
    type: "ebook" as const,
  },
  {
    id: "3",
    title: "American Fantasy",
    author: "Emma Donoghue",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop",
    dueDate: "Saved",
    progress: 0,
    type: "audiobook" as const,
  },
];

const ANNOTATIONS = [
  {
    id: "1",
    book: "Cherry Baby",
    author: "Rainbow Rowell",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    highlight: "sixteen shades of chestnut brown",
    color: "#f59e0b",
    location: "Chapter 2",
    time: "Today, 3:16 PM",
    note: "",
  },
  {
    id: "2",
    book: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    highlight: "I could feel the ship humming beneath me, a vast sleeping thing.",
    color: "#60a5fa",
    location: "Chapter 1",
    time: "Yesterday",
    note: "Great opening line",
  },
  {
    id: "3",
    book: "Cherry Baby",
    author: "Rainbow Rowell",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    highlight: "She laughed like she meant it, like nothing in the world could make her stop.",
    color: "#f59e0b",
    location: "Chapter 4",
    time: "3 days ago",
    note: "",
  },
];

function ProgressBar({ value, color = "#ec4899" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

// ─── Variant switcher floating pill ──────────────────────────────────────────

const VARIANTS = [
  { path: "/home-a", label: "A" },
  { path: "/home-b", label: "B" },
  { path: "/home-c", label: "C" },
  { path: "/home-d", label: "D" },
  { path: "/home-e", label: "E" },
  { path: "/home-refined", label: "R" },
];

function VariantSwitcher() {
  const { pathname } = useLocation();
  return (
    <div
      className="fixed top-3 right-3 z-50 flex items-center gap-1 rounded-full px-2 py-1.5 shadow-xl"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <span className="text-xs text-gray-500 mr-1 font-mono">variant</span>
      {VARIANTS.map((v) => (
        <Link
          key={v.path}
          to={v.path}
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
          style={{
            background: pathname === v.path ? "#ec4899" : "transparent",
            color: pathname === v.path ? "#fff" : "#9ca3af",
          }}
        >
          {v.label}
        </Link>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT A — Warm Dashboard Grid
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantA() {
  const book = BOOKS[0];
  return (
    <div className="min-h-full pb-4 text-white" style={{ background: "#1c1410", fontFamily: "Georgia, serif" }}>
      <VariantSwitcher />

      {/* Search bar */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ background: "#1c1410", borderColor: "#3a2a1a" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9a7a5a" }} />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded pl-10 pr-4 py-2 text-sm outline-none"
              style={{ background: "#261c12", border: "1px solid #3a2a1a", color: "#f0e6d3" }}
            />
          </div>
          <select className="rounded px-3 py-2 text-sm" style={{ background: "#261c12", border: "1px solid #3a2a1a", color: "#f0e6d3" }}>
            <option>All</option>
          </select>
          <button><Menu className="w-6 h-6" style={{ color: "#9a7a5a" }} /></button>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "#3a2a1a" }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>
              Good afternoon, Faye
            </p>
            <h1 className="text-2xl font-medium" style={{ color: "#f0e6d3" }}>Home</h1>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>University of Michigan</p>
            <p className="text-sm font-medium" style={{ color: "#c9913a" }}>2 borrowed · 0 holds</p>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Left: Currently Reading */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>
            Currently Reading
          </p>
          <div className="rounded-lg p-4 mb-3" style={{ background: "#261c12", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-3">
              <img src={book.cover} alt={book.title} className="w-14 rounded" style={{ height: 84, objectFit: "cover" }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>{book.title}</p>
                <p className="text-xs mb-1" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{book.author}</p>
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3" style={{ color: "#c9913a" }} />
                  <span className="text-xs" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>Chapter 5 · {book.progress}%</span>
                </div>
                <ProgressBar value={book.progress} color="#c9913a" />
                <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#8a6a4a", fontFamily: "system-ui, sans-serif" }}>
                  <Clock className="w-3 h-3" />{book.dueDate}
                </p>
              </div>
            </div>
            <button className="w-full mt-3 py-2 rounded text-sm font-medium" style={{ background: "#c9913a", color: "#1c1410", fontFamily: "system-ui, sans-serif" }}>
              Continue reading
            </button>
          </div>
          <div className="rounded-lg p-3" style={{ background: "#231913", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-2.5 items-center">
              <img src={BOOKS[1].cover} alt={BOOKS[1].title} className="w-10 rounded" style={{ height: 60, objectFit: "cover" }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>{BOOKS[1].title}</p>
                <p className="text-xs mb-1.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{BOOKS[1].author}</p>
                <ProgressBar value={BOOKS[1].progress} color="#c9913a" />
              </div>
              <span className="text-xs ml-1 shrink-0" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>{BOOKS[1].progress}%</span>
            </div>
          </div>
        </div>

        {/* Right: Annotations */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>Latest Annotations</p>
            <button className="text-xs flex items-center gap-0.5" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div>
            {ANNOTATIONS.map((a, i) => (
              <div key={a.id} className="py-4" style={{ borderBottom: i < ANNOTATIONS.length - 1 ? "1px solid #2e2218" : undefined }}>
                <p className="text-sm italic leading-relaxed mb-2 pl-3" style={{ color: "#e0d4bc", borderLeft: `2px solid ${a.color}` }}>
                  "{a.highlight}"
                </p>
                <div className="flex items-center gap-2 pl-3">
                  <img src={a.cover} alt={a.book} className="w-5 h-7 rounded object-cover shrink-0" />
                  <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{a.book}</p>
                  <span style={{ color: "#5a4a38" }}>·</span>
                  <p className="text-xs" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>{a.location}</p>
                  <p className="text-xs ml-auto" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>{a.time}</p>
                </div>
                {a.note && (
                  <p className="text-xs mt-1 pl-3 italic" style={{ color: "#8a7a62", fontFamily: "system-ui, sans-serif" }}>✎ {a.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT B — Hero Focus
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantB() {
  const book = BOOKS[0];
  return (
    <div className="min-h-full pb-4 bg-[#1a1a1a] text-white">
      <VariantSwitcher />

      <div className="sticky top-0 z-10 bg-[#1a1a1a] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search" className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm" />
          </div>
          <select className="bg-gray-800 rounded px-3 py-2 text-sm"><option>All</option></select>
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      <div className="px-5 pt-5 pb-2 flex items-baseline justify-between">
        <div>
          <h1 className="text-xl font-semibold">Good afternoon!</h1>
          <p className="text-xs text-gray-500 mt-0.5">University of Michigan Library</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><p className="text-lg font-bold text-amber-400">2</p><p className="text-xs text-gray-500">Borrowed</p></div>
          <div><p className="text-lg font-bold text-pink-400">3</p><p className="text-xs text-gray-500">Saved</p></div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-5 py-3">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Pick up where you left off</p>
        <div className="rounded-2xl overflow-hidden relative" style={{ background: "#232323" }}>
          <img src={book.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" style={{ filter: "blur(20px)", transform: "scale(1.2)" }} />
          <div className="relative flex gap-4 p-4">
            <div className="relative shrink-0">
              <img src={book.cover} alt={book.title} className="w-24 rounded-lg shadow-xl" style={{ height: 144, objectFit: "cover" }} />
              <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#c9913a", color: "#1a1410" }}>
                {book.progress}%
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-xl font-semibold leading-tight mb-1">{book.title}</p>
              <p className="text-sm text-gray-400 mb-2">{book.author}</p>
              <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                <BookOpen className="w-3 h-3" />Chapter 5 of 22 · {book.dueDate}
              </p>
              <div className="mb-4"><ProgressBar value={book.progress} color="#c9913a" /></div>
              <button className="px-5 py-2 rounded-full text-sm font-medium" style={{ background: "#c9913a", color: "#111" }}>
                Continue reading
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent highlights */}
      <div className="px-5 pt-1 pb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-widest text-gray-500">Recent Highlights</p>
          <button className="text-xs text-pink-400 flex items-center gap-0.5">See all <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {ANNOTATIONS.map((a) => (
            <div key={a.id} className="rounded-xl p-3 shrink-0" style={{ background: "#232323", border: "1px solid #2e2e2e", width: 220 }}>
              <div className="flex items-center gap-2 mb-2">
                <img src={a.cover} alt={a.book} className="w-7 h-9 rounded object-cover shrink-0" />
                <div>
                  <p className="text-xs font-medium leading-tight text-gray-200">{a.book}</p>
                  <p className="text-xs text-gray-500">{a.location}</p>
                </div>
              </div>
              <div className="text-xs italic leading-relaxed rounded px-2 py-1" style={{ background: `${a.color}15`, borderLeft: `2px solid ${a.color}`, color: "#ddd" }}>
                "{a.highlight.length > 70 ? a.highlight.slice(0, 70) + "…" : a.highlight}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Also on shelf */}
      <div className="px-5">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Also on your shelf</p>
        {BOOKS.slice(1).map((b) => (
          <div key={b.id} className="flex items-center gap-3 py-3 border-b border-gray-800">
            <img src={b.cover} alt={b.title} className="w-10 rounded object-cover" style={{ height: 60 }} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-100">{b.title}</p>
              <p className="text-xs text-gray-500">{b.author}</p>
              {b.progress > 0 && <div className="mt-1.5"><ProgressBar value={b.progress} /></div>}
            </div>
            {b.type === "audiobook" ? <Headphones className="w-4 h-4 text-gray-500" /> : <BookOpen className="w-4 h-4 text-gray-500" />}
            <p className="text-xs text-gray-500">{b.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT C — Library Card Catalog
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantC() {
  return (
    <div className="min-h-full pb-4 text-white" style={{ background: "#1a150e", fontFamily: "Georgia, serif" }}>
      <VariantSwitcher />

      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ background: "#1a150e", borderColor: "#3a2e20" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8a7255" }} />
            <input type="text" placeholder="Search" className="w-full rounded pl-10 pr-4 py-2 text-sm outline-none" style={{ background: "#241c10", border: "1px solid #3a2e20", color: "#f5ead8" }} />
          </div>
          <select className="rounded px-3 py-2 text-sm" style={{ background: "#241c10", border: "1px solid #3a2e20", color: "#f5ead8" }}><option>All</option></select>
          <button><Menu className="w-6 h-6" style={{ color: "#8a7255" }} /></button>
        </div>
      </div>

      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "#3a2e20" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>
              University of Michigan · LibbyU
            </p>
            <h1 className="text-2xl" style={{ color: "#f5ead8" }}>Home</h1>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: "#c9a84c" }}>Good afternoon!</p>
            <p className="text-xs mt-0.5" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>April 21, 2026</p>
          </div>
        </div>
      </div>

      {/* Card catalog books */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-widest" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>Currently Borrowed</p>
          <button className="text-xs flex items-center gap-0.5" style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}>
            See shelf <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {BOOKS.slice(0, 2).map((book) => (
            <div key={book.id} className="shrink-0 rounded-lg overflow-hidden" style={{ background: "#241c10", border: "1px solid #3a2e20", width: 260 }}>
              <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: "#2e2212", borderBottom: "1px solid #3a2e20" }}>
                <div className="flex items-center gap-1.5">
                  {book.type === "audiobook" ? <Headphones className="w-3 h-3" style={{ color: "#c9a84c" }} /> : <BookOpen className="w-3 h-3" style={{ color: "#c9a84c" }} />}
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>{book.type === "audiobook" ? "Audiobook" : "E-book"}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: book.dueDate.includes("8") ? "#7c1c1c" : "#3a2e20", color: book.dueDate.includes("8") ? "#f87171" : "#c9a84c", fontFamily: "system-ui, sans-serif" }}>
                  {book.dueDate}
                </span>
              </div>
              <div className="flex gap-3 p-3">
                <img src={book.cover} alt={book.title} className="w-16 rounded" style={{ height: 96, objectFit: "cover" }} />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-tight mb-0.5" style={{ color: "#f5ead8" }}>{book.title}</p>
                  <p className="text-xs mb-2" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>{book.author}</p>
                  {book.progress > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>Progress</span>
                        <span className="text-xs" style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}>{book.progress}%</span>
                      </div>
                      <ProgressBar value={book.progress} color="#c9a84c" />
                    </>
                  )}
                </div>
              </div>
              <button className="w-full py-2 text-sm text-center" style={{ background: "#2e2212", color: "#c9a84c", borderTop: "1px solid #3a2e20", fontFamily: "system-ui, sans-serif" }}>
                Open →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Annotations structured list */}
      <div className="px-6 pb-6">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>Latest Annotations</p>
        <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #3a2e20" }}>
          {ANNOTATIONS.map((a, i) => (
            <div key={a.id} className="flex items-start gap-3 px-4 py-3" style={{ background: i % 2 === 0 ? "#241c10" : "#201808", borderBottom: i < ANNOTATIONS.length - 1 ? "1px solid #3a2e20" : undefined }}>
              <img src={a.cover} alt={a.book} className="w-9 rounded shrink-0" style={{ height: 52, objectFit: "cover" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color: "#f5ead8" }}>{a.book}</span>
                  <span className="text-xs" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>· {a.location}</span>
                </div>
                <p className="text-sm italic leading-relaxed" style={{ color: "#d4c4a0", borderLeft: `2px solid ${a.color}`, paddingLeft: 8 }}>
                  "{a.highlight}"
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-xs" style={{ color: "#6a5a40", fontFamily: "system-ui, sans-serif" }}>{a.time}</span>
                <button className="block mt-1 ml-auto"><MoreVertical className="w-3.5 h-3.5 text-gray-600" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT D — Reading Journal
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantD() {
  return (
    <div className="min-h-full pb-4 text-white" style={{ background: "#171612", fontFamily: "Georgia, serif" }}>
      <VariantSwitcher />

      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ background: "#171612", borderColor: "#2e2c24" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8a8070" }} />
            <input type="text" placeholder="Search" className="w-full rounded pl-10 pr-4 py-2 text-sm outline-none" style={{ background: "#211f18", border: "1px solid #2e2c24", color: "#f0ead8" }} />
          </div>
          <select className="rounded px-3 py-2 text-sm" style={{ background: "#211f18", border: "1px solid #2e2c24", color: "#f0ead8" }}><option>All</option></select>
          <button><Menu className="w-6 h-6" style={{ color: "#8a8070" }} /></button>
        </div>
      </div>

      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "#2e2c24" }}>
        <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>Monday, April 21</p>
        <h1 className="text-2xl" style={{ color: "#f0ead8" }}>Reading Journal</h1>
      </div>

      {/* Featured quote */}
      <div className="px-6 py-5">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>Latest highlight</p>
        <div className="rounded-xl p-5 relative" style={{ background: "#211f18", border: "1px solid #2e2c24" }}>
          <Quote className="absolute top-4 left-4 w-5 h-5 opacity-20" style={{ color: "#c9a84c" }} />
          <p className="text-base italic leading-relaxed pl-4 mb-3" style={{ color: "#e8dfc8" }}>
            "{ANNOTATIONS[0].highlight}"
          </p>
          <div className="flex items-center gap-2.5">
            <img src={ANNOTATIONS[0].cover} alt={ANNOTATIONS[0].book} className="w-8 rounded" style={{ height: 48, objectFit: "cover" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "#f0ead8" }}>{ANNOTATIONS[0].book}</p>
              <p className="text-xs" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>{ANNOTATIONS[0].location} · {ANNOTATIONS[0].time}</p>
            </div>
            <div className="ml-auto w-3 h-3 rounded-full" style={{ background: ANNOTATIONS[0].color }} />
          </div>
        </div>
      </div>

      {/* Active reads */}
      <div className="px-6 pb-4">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>Now reading</p>
        {BOOKS.slice(0, 2).map((b) => (
          <div key={b.id} className="flex items-center gap-4 py-3" style={{ borderTop: "1px solid #2e2c24" }}>
            <img src={b.cover} alt={b.title} className="w-12 rounded" style={{ height: 72, objectFit: "cover" }} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-0.5">
                <p className="text-sm font-semibold" style={{ color: "#f0ead8" }}>{b.title}</p>
                <p className="text-xs" style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}>{b.progress}%</p>
              </div>
              <p className="text-xs mb-2" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>{b.author}</p>
              <ProgressBar value={b.progress} color="#c9a84c" />
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs mb-1.5" style={{ color: b.dueDate.includes("8") ? "#f87171" : "#8a8070", fontFamily: "system-ui, sans-serif" }}>{b.dueDate}</p>
              <button className="px-3 py-1 rounded text-xs" style={{ background: "#2e2c24", color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}>Open</button>
            </div>
          </div>
        ))}
      </div>

      {/* More annotations */}
      <div className="px-6 pb-6">
        {ANNOTATIONS.slice(1).map((a) => (
          <div key={a.id} className="rounded-lg p-3 flex items-start gap-3 mb-3" style={{ background: "#211f18", border: "1px solid #2e2c24" }}>
            <img src={a.cover} alt={a.book} className="w-8 rounded shrink-0" style={{ height: 48, objectFit: "cover" }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium mb-0.5" style={{ color: "#f0ead8" }}>{a.book}</p>
              <p className="text-xs italic" style={{ color: "#c4bca0", borderLeft: `2px solid ${a.color}`, paddingLeft: 6 }}>
                "{a.highlight.length > 80 ? a.highlight.slice(0, 80) + "…" : a.highlight}"
              </p>
              {a.note && <p className="text-xs mt-1 italic" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>✎ {a.note}</p>}
            </div>
            <p className="text-xs shrink-0" style={{ color: "#6a6050", fontFamily: "system-ui, sans-serif" }}>{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT E — Academic Clean
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantE() {
  return (
    <div className="min-h-full pb-4 text-white" style={{ background: "#191919" }}>
      <VariantSwitcher />

      <div className="sticky top-0 z-10 bg-[#191919] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search" className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm" />
          </div>
          <select className="bg-gray-800 rounded px-3 py-2 text-sm"><option>All</option></select>
          <button><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Header with stats */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-800">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">University of Michigan</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif", color: "#f5f0e8" }}>Home</h1>
          </div>
          <p className="text-sm" style={{ color: "#c9a84c" }}>Good afternoon, Faye</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Borrowed", value: "2", icon: <BookOpen className="w-3.5 h-3.5" /> },
            { label: "Read this month", value: "47%", icon: <Star className="w-3.5 h-3.5" /> },
            { label: "Highlights", value: "12", icon: <Quote className="w-3.5 h-3.5" /> },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: "#222", border: "1px solid #2e2e2e" }}>
              <span style={{ color: "#c9a84c" }}>{stat.icon}</span>
              <div>
                <p className="text-base font-bold leading-none" style={{ color: "#f5f0e8", fontFamily: "Georgia, serif" }}>{stat.value}</p>
                <p className="text-xs leading-tight mt-0.5 text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 01 */}
      <div className="px-5 py-5">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs font-mono" style={{ color: "#c9a84c" }}>01</span>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-200">Currently Reading</p>
        </div>
        {BOOKS.slice(0, 2).map((book) => (
          <div key={book.id} className="flex gap-3 items-start mb-4 pb-4 border-b border-gray-800">
            <img src={book.cover} alt={book.title} className="w-16 rounded-md shrink-0" style={{ height: 96, objectFit: "cover" }} />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-sm font-semibold leading-snug" style={{ fontFamily: "Georgia, serif", color: "#f5f0e8" }}>{book.title}</p>
                <span className="text-xs px-2 py-0.5 rounded shrink-0" style={{ background: book.dueDate.includes("8") ? "#4a1010" : "#252015", color: book.dueDate.includes("8") ? "#f87171" : "#c9a84c" }}>
                  {book.dueDate}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{book.author}</p>
              <div className="flex items-center gap-2">
                <ProgressBar value={book.progress} color="#c9a84c" />
                <span className="text-xs font-mono shrink-0" style={{ color: "#c9a84c", minWidth: 30 }}>{book.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 02 */}
      <div className="px-5 pb-6">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs font-mono" style={{ color: "#c9a84c" }}>02</span>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-200">Latest Annotations</p>
          <button className="ml-auto text-xs flex items-center gap-0.5 text-pink-400">All <ChevronRight className="w-3 h-3" /></button>
        </div>
        {ANNOTATIONS.map((a) => (
          <div key={a.id} className="py-3 flex gap-3 items-start border-t border-gray-800">
            <div className="w-0.5 self-stretch rounded-full mt-1 shrink-0" style={{ background: a.color, minWidth: 2 }} />
            <div className="flex-1">
              <p className="text-sm italic leading-relaxed mb-1" style={{ fontFamily: "Georgia, serif", color: "#d8d0bc" }}>
                "{a.highlight}"
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">{a.book} · {a.location}</p>
                <p className="text-xs text-gray-600">{a.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED — Variant A base + elegant inline quotes
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeVariantRefined() {
  const book = BOOKS[0];
  return (
    <div className="min-h-full pb-4 text-white" style={{ background: "#1c1410", fontFamily: "Georgia, serif" }}>
      <VariantSwitcher />

      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ background: "#1c1410", borderColor: "#3a2a1a" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9a7a5a" }} />
            <input type="text" placeholder="Search" className="w-full rounded pl-10 pr-4 py-2 text-sm outline-none" style={{ background: "#261c12", border: "1px solid #3a2a1a", color: "#f0e6d3" }} />
          </div>
          <select className="rounded px-3 py-2 text-sm" style={{ background: "#261c12", border: "1px solid #3a2a1a", color: "#f0e6d3" }}><option>All</option></select>
          <button><Menu className="w-6 h-6" style={{ color: "#9a7a5a" }} /></button>
        </div>
      </div>

      <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "#3a2a1a" }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>Good afternoon, Faye</p>
            <h1 className="text-2xl font-medium" style={{ color: "#f0e6d3" }}>Home</h1>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>University of Michigan</p>
            <p className="text-sm font-medium" style={{ color: "#c9913a" }}>2 borrowed · 0 holds</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>Currently Reading</p>
          <div className="rounded-lg p-4 mb-3" style={{ background: "#261c12", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-3">
              <img src={book.cover} alt={book.title} className="w-14 rounded" style={{ height: 84, objectFit: "cover" }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>{book.title}</p>
                <p className="text-xs mb-1" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{book.author}</p>
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3" style={{ color: "#c9913a" }} />
                  <span className="text-xs" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>Chapter 5 · {book.progress}%</span>
                </div>
                <ProgressBar value={book.progress} color="#c9913a" />
                <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#8a6a4a", fontFamily: "system-ui, sans-serif" }}>
                  <Clock className="w-3 h-3" />{book.dueDate}
                </p>
              </div>
            </div>
            <button className="w-full mt-3 py-2 rounded text-sm font-medium" style={{ background: "#c9913a", color: "#1c1410", fontFamily: "system-ui, sans-serif" }}>
              Continue reading
            </button>
          </div>
          <div className="rounded-lg p-3" style={{ background: "#231913", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-2.5 items-center">
              <img src={BOOKS[1].cover} alt={BOOKS[1].title} className="w-10 rounded" style={{ height: 60, objectFit: "cover" }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>{BOOKS[1].title}</p>
                <p className="text-xs mb-1.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{BOOKS[1].author}</p>
                <ProgressBar value={BOOKS[1].progress} color="#c9913a" />
              </div>
              <span className="text-xs ml-1 shrink-0" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>{BOOKS[1].progress}%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>Latest Annotations</p>
            <button className="text-xs flex items-center gap-0.5" style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}>
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          {ANNOTATIONS.map((a, i) => (
            <div key={a.id} className="py-4" style={{ borderBottom: i < ANNOTATIONS.length - 1 ? "1px solid #2e2218" : undefined }}>
              <p className="text-sm italic leading-relaxed mb-2 pl-3" style={{ color: "#e0d4bc", borderLeft: `2px solid ${a.color}` }}>
                "{a.highlight}"
              </p>
              <div className="flex items-center gap-2 pl-3">
                <img src={a.cover} alt={a.book} className="w-5 h-7 rounded object-cover shrink-0" />
                <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{a.book}</p>
                <span style={{ color: "#5a4a38" }}>·</span>
                <p className="text-xs" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>{a.location}</p>
                <p className="text-xs ml-auto" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>{a.time}</p>
              </div>
              {a.note && (
                <p className="text-xs mt-1 pl-3 italic" style={{ color: "#8a7a62", fontFamily: "system-ui, sans-serif" }}>✎ {a.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

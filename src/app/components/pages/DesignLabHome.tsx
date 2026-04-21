import { ChevronRight, Clock, MoreVertical, BookOpen, Headphones, Star, Quote } from "lucide-react";

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
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function VariantLabel({ letter, name, desc }: { letter: string; name: string; desc: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded">{letter}</span>
      <span className="font-semibold text-white">{name}</span>
      <span className="text-gray-500 text-sm">— {desc}</span>
    </div>
  );
}

function MockFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full rounded-xl border border-gray-700 overflow-hidden shadow-2xl ${className}`}
      style={{ height: 420 }}
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
      </div>
      <div className="overflow-auto" style={{ height: 420 - 33 }}>
        {children}
      </div>
    </div>
  );
}

function ProgressBar({ value, color = "#d97706" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT A — "Warm Dashboard Grid"
// Hierarchy: Currently reading left + stats, Annotations right as quote cards
// ═══════════════════════════════════════════════════════════════════════════════

function VariantA() {
  const book = BOOKS[0];
  const ann = ANNOTATIONS[0];

  return (
    <div>
      <VariantLabel
        letter="A"
        name="Warm Dashboard Grid"
        desc="Two-column layout: current reads left with progress, quote cards right"
      />
      <MockFrame>
        <div
          className="min-h-full text-white"
          style={{ background: "#1c1410", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-3 border-b" style={{ borderColor: "#3a2a1a" }}>
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
          <div className="grid grid-cols-2 gap-4 p-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* Left: Currently Reading */}
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
              >
                Currently Reading
              </p>

              {/* Hero book */}
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
                    <p className="text-xs mt-2" style={{ color: "#8a6a4a", fontFamily: "system-ui, sans-serif" }}>
                      <Clock className="w-3 h-3 inline mr-1" />{book.dueDate}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full mt-3 py-1.5 rounded text-sm font-medium text-center"
                  style={{ background: "#c9913a", color: "#1c1410", fontFamily: "system-ui, sans-serif" }}
                >
                  Continue reading
                </button>
              </div>

              {/* Second book compact */}
              <div className="rounded-lg p-3" style={{ background: "#231913", border: "1px solid #3a2a1a" }}>
                <div className="flex gap-2.5 items-center">
                  <img src={BOOKS[1].cover} alt={BOOKS[1].title} className="w-10 rounded" style={{ height: 60, objectFit: "cover" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>{BOOKS[1].title}</p>
                    <p className="text-xs mb-1.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{BOOKS[1].author}</p>
                    <ProgressBar value={BOOKS[1].progress} color="#c9913a" />
                  </div>
                  <span
                    className="text-xs ml-1"
                    style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap" }}
                  >
                    {BOOKS[1].progress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Annotations */}
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
              >
                Latest Annotations
              </p>

              {ANNOTATIONS.map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg p-3 mb-3"
                  style={{ background: "#261c12", border: "1px solid #3a2a1a" }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <img src={a.cover} alt={a.book} className="w-8 rounded shrink-0" style={{ height: 48, objectFit: "cover" }} />
                    <div>
                      <p className="text-xs font-medium" style={{ color: "#f0e6d3" }}>{a.book}</p>
                      <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>{a.location}</p>
                    </div>
                  </div>
                  <div
                    className="rounded px-2.5 py-1.5 text-xs italic leading-relaxed"
                    style={{
                      background: `${a.color}18`,
                      borderLeft: `2px solid ${a.color}`,
                      color: "#f0e6d3",
                    }}
                  >
                    "{a.highlight}"
                  </div>
                  {a.note && (
                    <p className="text-xs mt-1.5" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>
                      Note: {a.note}
                    </p>
                  )}
                  <p className="text-xs mt-1" style={{ color: "#6a5a4a", fontFamily: "system-ui, sans-serif" }}>{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT B — "Hero Focus"
// Hierarchy: One big featured book with progress ring, compact list below
// ═══════════════════════════════════════════════════════════════════════════════

function VariantB() {
  const book = BOOKS[0];

  return (
    <div>
      <VariantLabel
        letter="B"
        name="Hero Focus"
        desc="Large hero card for active read with progress, compact secondary list below"
      />
      <MockFrame>
        <div className="min-h-full text-white" style={{ background: "#1a1a1a" }}>
          {/* Greeting bar */}
          <div className="px-5 pt-5 pb-2 flex items-baseline justify-between">
            <div>
              <h1 className="text-xl font-semibold">Good afternoon!</h1>
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                University of Michigan Library
              </p>
            </div>
            <div className="flex gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-amber-400">2</p>
                <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>Borrowed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-pink-400">3</p>
                <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>Saved</p>
              </div>
            </div>
          </div>

          {/* Hero currently reading */}
          <div className="px-5 py-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
              Pick up where you left off
            </p>
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ background: "#232323", minHeight: 120 }}
            >
              {/* book cover blurred background */}
              <img
                src={book.cover}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-10"
                style={{ filter: "blur(20px)", transform: "scale(1.2)" }}
              />
              <div className="relative flex gap-4 p-4">
                <div className="relative shrink-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-20 rounded-lg shadow-xl"
                    style={{ height: 120, objectFit: "cover" }}
                  />
                  {/* Progress ring overlay */}
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#c9913a", color: "#1a1410", fontFamily: "system-ui, sans-serif" }}
                  >
                    {book.progress}%
                  </div>
                </div>
                <div className="flex-1">
                  <p
                    className="text-lg font-semibold leading-tight mb-0.5"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {book.title}
                  </p>
                  <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {book.author}
                  </p>
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <BookOpen className="w-3 h-3" />
                    Chapter 5 of 22 · {book.dueDate}
                  </p>
                  <div className="mb-3">
                    <ProgressBar value={book.progress} color="#c9913a" />
                  </div>
                  <button
                    className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: "#c9913a", color: "#111", fontFamily: "system-ui, sans-serif" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent annotations strip */}
          <div className="px-5 pt-1 pb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-widest text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                Recent Highlights
              </p>
              <button className="text-xs text-pink-400 flex items-center gap-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                See all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {ANNOTATIONS.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl p-3 shrink-0"
                  style={{ background: "#232323", border: "1px solid #2e2e2e", width: 200 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={a.cover} alt={a.book} className="w-7 h-9 rounded object-cover shrink-0" />
                    <div>
                      <p className="text-xs font-medium leading-tight" style={{ fontFamily: "system-ui, sans-serif", color: "#eee" }}>
                        {a.book}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>{a.location}</p>
                    </div>
                  </div>
                  <div
                    className="text-xs italic leading-relaxed rounded px-2 py-1"
                    style={{
                      background: `${a.color}15`,
                      borderLeft: `2px solid ${a.color}`,
                      color: "#ddd",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    "{a.highlight.length > 60 ? a.highlight.slice(0, 60) + "…" : a.highlight}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Also on shelf */}
          <div className="px-5">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
              Also on your shelf
            </p>
            {BOOKS.slice(1).map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 py-2.5 border-b"
                style={{ borderColor: "#2a2a2a" }}
              >
                <img src={b.cover} alt={b.title} className="w-9 rounded object-cover" style={{ height: 54 }} />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ fontFamily: "Georgia, serif", color: "#eee" }}>{b.title}</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>{b.author}</p>
                </div>
                {b.type === "audiobook" ? (
                  <Headphones className="w-4 h-4 text-gray-500" />
                ) : (
                  <BookOpen className="w-4 h-4 text-gray-500" />
                )}
                <p className="text-xs text-gray-500 ml-1" style={{ fontFamily: "system-ui, sans-serif" }}>{b.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT C — "Library Card Catalog"
// Hierarchy: Books as catalog cards horizontally, structured annotation table
// ═══════════════════════════════════════════════════════════════════════════════

function VariantC() {
  return (
    <div>
      <VariantLabel
        letter="C"
        name="Library Card Catalog"
        desc="Card-catalog style book cards with rich due-date stamps, structured annotation list"
      />
      <MockFrame>
        <div
          className="min-h-full text-white"
          style={{ background: "#1a150e", fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid #3a2e20" }}>
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

          {/* Recently borrowed — card catalog style */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}
              >
                Currently Borrowed
              </p>
              <button
                className="text-xs flex items-center gap-0.5"
                style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}
              >
                See shelf <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {BOOKS.slice(0, 2).map((book) => (
                <div
                  key={book.id}
                  className="shrink-0 rounded-lg overflow-hidden"
                  style={{
                    background: "#241c10",
                    border: "1px solid #3a2e20",
                    width: 240,
                  }}
                >
                  {/* Catalog card header strip */}
                  <div
                    className="px-3 py-1.5 flex items-center justify-between"
                    style={{ background: "#2e2212", borderBottom: "1px solid #3a2e20" }}
                  >
                    <div className="flex items-center gap-1.5">
                      {book.type === "audiobook" ? (
                        <Headphones className="w-3 h-3" style={{ color: "#c9a84c" }} />
                      ) : (
                        <BookOpen className="w-3 h-3" style={{ color: "#c9a84c" }} />
                      )}
                      <span
                        className="text-xs uppercase tracking-wide"
                        style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}
                      >
                        {book.type === "audiobook" ? "Audiobook" : "E-book"}
                      </span>
                    </div>
                    {/* Due date stamp */}
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: book.dueDate.includes("8") ? "#7c1c1c" : "#3a2e20",
                        color: book.dueDate.includes("8") ? "#f87171" : "#c9a84c",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {book.dueDate}
                    </span>
                  </div>

                  <div className="flex gap-3 p-3">
                    <img src={book.cover} alt={book.title} className="w-14 rounded" style={{ height: 84, objectFit: "cover" }} />
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

                  <button
                    className="w-full py-2 text-sm text-center"
                    style={{
                      background: "#2e2212",
                      color: "#c9a84c",
                      borderTop: "1px solid #3a2e20",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Annotations — structured list */}
          <div className="px-6 pb-4">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}
            >
              Latest Annotations
            </p>
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "1px solid #3a2e20" }}
            >
              {ANNOTATIONS.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 px-4 py-3"
                  style={{
                    background: i % 2 === 0 ? "#241c10" : "#201808",
                    borderBottom: i < ANNOTATIONS.length - 1 ? "1px solid #3a2e20" : undefined,
                  }}
                >
                  <img src={a.cover} alt={a.book} className="w-9 rounded shrink-0" style={{ height: 52, objectFit: "cover" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: "#f5ead8" }}>{a.book}</span>
                      <span className="text-xs" style={{ color: "#8a7255", fontFamily: "system-ui, sans-serif" }}>· {a.location}</span>
                    </div>
                    <p
                      className="text-sm italic leading-relaxed"
                      style={{
                        color: "#d4c4a0",
                        borderLeft: `2px solid ${a.color}`,
                        paddingLeft: 8,
                      }}
                    >
                      "{a.highlight}"
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs" style={{ color: "#6a5a40", fontFamily: "system-ui, sans-serif" }}>{a.time}</span>
                    <button className="block mt-1 ml-auto">
                      <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT D — "Reading Journal"
// Hierarchy: Personal journal feel, annotations as quotes lead the page
// ═══════════════════════════════════════════════════════════════════════════════

function VariantD() {
  const book = BOOKS[0];

  return (
    <div>
      <VariantLabel
        letter="D"
        name="Reading Journal"
        desc="Journal-style page with featured quote at top, reading log below — annotations first"
      />
      <MockFrame>
        <div
          className="min-h-full text-white"
          style={{ background: "#171612", fontFamily: "Georgia, serif" }}
        >
          {/* Journal header */}
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid #2e2c24" }}>
            <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>
              Monday, April 21
            </p>
            <h1 className="text-2xl" style={{ color: "#f0ead8" }}>Reading Journal</h1>
          </div>

          {/* Featured quote — top of hierarchy */}
          <div className="px-6 py-5">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>
              Latest highlight
            </p>
            <div
              className="rounded-xl p-5 relative"
              style={{ background: "#211f18", border: "1px solid #2e2c24" }}
            >
              <Quote
                className="absolute top-4 left-4 w-5 h-5 opacity-20"
                style={{ color: "#c9a84c" }}
              />
              <p
                className="text-base italic leading-relaxed pl-4 mb-3"
                style={{ color: "#e8dfc8" }}
              >
                "{ANNOTATIONS[0].highlight}"
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src={ANNOTATIONS[0].cover}
                  alt={ANNOTATIONS[0].book}
                  className="w-8 rounded"
                  style={{ height: 48, objectFit: "cover" }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: "#f0ead8" }}>{ANNOTATIONS[0].book}</p>
                  <p className="text-xs" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>
                    {ANNOTATIONS[0].location} · {ANNOTATIONS[0].time}
                  </p>
                </div>
                <div
                  className="ml-auto w-3 h-3 rounded-full"
                  style={{ background: ANNOTATIONS[0].color }}
                />
              </div>
            </div>
          </div>

          {/* Active reads section */}
          <div className="px-6 pb-4">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>
              Now reading
            </p>
            {BOOKS.slice(0, 2).map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-4 py-3"
                style={{ borderTop: "1px solid #2e2c24" }}
              >
                <img src={b.cover} alt={b.title} className="w-12 rounded" style={{ height: 72, objectFit: "cover" }} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <p className="text-sm font-semibold" style={{ color: "#f0ead8" }}>{b.title}</p>
                    <p className="text-xs" style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}>
                      {b.progress}%
                    </p>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>{b.author}</p>
                  <ProgressBar value={b.progress} color="#c9a84c" />
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-xs mb-1.5"
                    style={{
                      color: b.dueDate.includes("8") ? "#f87171" : "#8a8070",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {b.dueDate}
                  </p>
                  <button
                    className="px-3 py-1 rounded text-xs"
                    style={{ background: "#2e2c24", color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Second annotation compact */}
          {ANNOTATIONS[1] && (
            <div className="px-6 pb-5">
              <div
                className="rounded-lg p-3 flex items-start gap-3"
                style={{ background: "#211f18", border: "1px solid #2e2c24" }}
              >
                <img
                  src={ANNOTATIONS[1].cover}
                  alt={ANNOTATIONS[1].book}
                  className="w-8 rounded shrink-0"
                  style={{ height: 48, objectFit: "cover" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-0.5" style={{ color: "#f0ead8" }}>{ANNOTATIONS[1].book}</p>
                  <p
                    className="text-xs italic"
                    style={{
                      color: "#c4bca0",
                      borderLeft: `2px solid ${ANNOTATIONS[1].color}`,
                      paddingLeft: 6,
                    }}
                  >
                    "{ANNOTATIONS[1].highlight.slice(0, 55)}…"
                  </p>
                  {ANNOTATIONS[1].note && (
                    <p className="text-xs mt-1" style={{ color: "#8a8070", fontFamily: "system-ui, sans-serif" }}>
                      ✎ {ANNOTATIONS[1].note}
                    </p>
                  )}
                </div>
                <p className="text-xs shrink-0" style={{ color: "#6a6050", fontFamily: "system-ui, sans-serif" }}>
                  {ANNOTATIONS[1].time}
                </p>
              </div>
            </div>
          )}
        </div>
      </MockFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT E — "Academic Clean"
// Hierarchy: Strong typographic sections, due urgency + reading stats prominent
// ═══════════════════════════════════════════════════════════════════════════════

function VariantE() {
  return (
    <div>
      <VariantLabel
        letter="E"
        name="Academic Clean"
        desc="Bold typographic hierarchy with numbered sections, due-date urgency and reading stats up front"
      />
      <MockFrame>
        <div className="min-h-full" style={{ background: "#191919", color: "#f0f0f0" }}>
          {/* Header with stats row */}
          <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid #282828" }}>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                  University of Michigan
                </p>
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Georgia, serif", color: "#f5f0e8" }}
                >
                  Home
                </h1>
              </div>
              <p
                className="text-sm"
                style={{ color: "#c9a84c", fontFamily: "system-ui, sans-serif" }}
              >
                Good afternoon, Faye
              </p>
            </div>
            {/* Reading stats strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Borrowed", value: "2", icon: <BookOpen className="w-3.5 h-3.5" /> },
                { label: "Read this month", value: "47%", icon: <Star className="w-3.5 h-3.5" /> },
                { label: "Highlights", value: "12", icon: <Quote className="w-3.5 h-3.5" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg px-3 py-2 flex items-center gap-2"
                  style={{ background: "#222", border: "1px solid #2e2e2e" }}
                >
                  <span style={{ color: "#c9a84c" }}>{stat.icon}</span>
                  <div>
                    <p
                      className="text-base font-bold leading-none"
                      style={{ color: "#f5f0e8", fontFamily: "Georgia, serif" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs leading-tight mt-0.5"
                      style={{ color: "#6a6a6a", fontFamily: "system-ui, sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 01 — Active reads */}
          <div className="px-5 py-4">
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="text-xs font-mono"
                style={{ color: "#c9a84c" }}
              >
                01
              </span>
              <p
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#f5f0e8", fontFamily: "system-ui, sans-serif" }}
              >
                Currently Reading
              </p>
            </div>

            {BOOKS.slice(0, 2).map((book) => (
              <div
                key={book.id}
                className="flex gap-3 items-start mb-3 pb-3"
                style={{ borderBottom: "1px solid #242424" }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-14 rounded-md shrink-0"
                  style={{ height: 84, objectFit: "cover" }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{ fontFamily: "Georgia, serif", color: "#f5f0e8" }}
                    >
                      {book.title}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded shrink-0"
                      style={{
                        background: book.dueDate.includes("8") ? "#4a1010" : "#252015",
                        color: book.dueDate.includes("8") ? "#f87171" : "#c9a84c",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {book.dueDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {book.author}
                  </p>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={book.progress} color="#c9a84c" />
                    <span
                      className="text-xs font-mono shrink-0"
                      style={{ color: "#c9a84c", minWidth: 30 }}
                    >
                      {book.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 02 — Annotations */}
          <div className="px-5 pb-5">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-xs font-mono" style={{ color: "#c9a84c" }}>02</span>
              <p
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#f5f0e8", fontFamily: "system-ui, sans-serif" }}
              >
                Latest Annotations
              </p>
              <button
                className="ml-auto text-xs flex items-center gap-0.5 text-pink-400"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {ANNOTATIONS.map((a) => (
              <div
                key={a.id}
                className="py-2.5 flex gap-3 items-start"
                style={{ borderTop: "1px solid #242424" }}
              >
                <div
                  className="w-0.5 self-stretch rounded-full mt-1"
                  style={{ background: a.color, minWidth: 2 }}
                />
                <div className="flex-1">
                  <p
                    className="text-sm italic leading-relaxed mb-1"
                    style={{ fontFamily: "Georgia, serif", color: "#d8d0bc" }}
                  >
                    "{a.highlight}"
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {a.book} · {a.location}
                    </p>
                    <p className="text-xs text-gray-600" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {a.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED — Variant A base + elegant inline quotes for annotations
// ═══════════════════════════════════════════════════════════════════════════════

export function HomeRefined() {
  const book = BOOKS[0];

  return (
    <div
      className="min-h-full text-white"
      style={{ background: "#1c1410", fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-3 border-b" style={{ borderColor: "#3a2a1a" }}>
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-0.5"
              style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
            >
              Good afternoon, Faye
            </p>
            <h1 className="text-2xl font-medium" style={{ color: "#f0e6d3" }}>
              Home
            </h1>
          </div>
          <div className="text-right">
            <p
              className="text-xs"
              style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
            >
              University of Michigan
            </p>
            <p className="text-sm font-medium" style={{ color: "#c9913a" }}>
              2 borrowed · 0 holds
            </p>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid gap-5 p-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Left: Currently Reading */}
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
          >
            Currently Reading
          </p>

          {/* Hero book */}
          <div className="rounded-lg p-4 mb-3" style={{ background: "#261c12", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-3">
              <img
                src={book.cover}
                alt={book.title}
                className="w-14 rounded"
                style={{ height: 84, objectFit: "cover" }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>
                  {book.title}
                </p>
                <p className="text-xs mb-1" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>
                  {book.author}
                </p>
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-3 h-3" style={{ color: "#c9913a" }} />
                  <span
                    className="text-xs"
                    style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}
                  >
                    Chapter 5 · {book.progress}%
                  </span>
                </div>
                <ProgressBar value={book.progress} color="#c9913a" />
                <p
                  className="text-xs mt-2"
                  style={{ color: "#8a6a4a", fontFamily: "system-ui, sans-serif" }}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {book.dueDate}
                </p>
              </div>
            </div>
            <button
              className="w-full mt-3 py-1.5 rounded text-sm font-medium text-center"
              style={{ background: "#c9913a", color: "#1c1410", fontFamily: "system-ui, sans-serif" }}
            >
              Continue reading
            </button>
          </div>

          {/* Second book compact */}
          <div className="rounded-lg p-3" style={{ background: "#231913", border: "1px solid #3a2a1a" }}>
            <div className="flex gap-2.5 items-center">
              <img
                src={BOOKS[1].cover}
                alt={BOOKS[1].title}
                className="w-10 rounded"
                style={{ height: 60, objectFit: "cover" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight mb-0.5" style={{ color: "#f0e6d3" }}>
                  {BOOKS[1].title}
                </p>
                <p
                  className="text-xs mb-1.5"
                  style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
                >
                  {BOOKS[1].author}
                </p>
                <ProgressBar value={BOOKS[1].progress} color="#c9913a" />
              </div>
              <span
                className="text-xs ml-1 shrink-0"
                style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}
              >
                {BOOKS[1].progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Annotations — elegant inline quotes */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
            >
              Latest Annotations
            </p>
            <button
              className="text-xs flex items-center gap-0.5"
              style={{ color: "#c9913a", fontFamily: "system-ui, sans-serif" }}
            >
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-0">
            {ANNOTATIONS.map((a, i) => (
              <div
                key={a.id}
                className="py-4"
                style={{
                  borderBottom: i < ANNOTATIONS.length - 1 ? "1px solid #2e2218" : undefined,
                }}
              >
                {/* Inline quote — elegant with left border */}
                <p
                  className="text-sm italic leading-relaxed mb-2 pl-3"
                  style={{
                    color: "#e0d4bc",
                    borderLeft: `2px solid ${a.color}`,
                  }}
                >
                  "{a.highlight}"
                </p>

                {/* Metadata line — compact */}
                <div className="flex items-center gap-2 pl-3">
                  <img
                    src={a.cover}
                    alt={a.book}
                    className="w-5 h-7 rounded object-cover shrink-0"
                  />
                  <p
                    className="text-xs"
                    style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}
                  >
                    {a.book}
                  </p>
                  <span style={{ color: "#5a4a38" }}>·</span>
                  <p
                    className="text-xs"
                    style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}
                  >
                    {a.location}
                  </p>
                  <p
                    className="text-xs ml-auto"
                    style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}
                  >
                    {a.time}
                  </p>
                </div>

                {a.note && (
                  <p
                    className="text-xs mt-1 pl-3"
                    style={{ color: "#8a7a62", fontFamily: "system-ui, sans-serif", fontStyle: "italic" }}
                  >
                    ✎ {a.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Extra annotation placeholder to show the pattern */}
          <div className="py-4">
            <p
              className="text-sm italic leading-relaxed mb-2 pl-3"
              style={{
                color: "#e0d4bc",
                borderLeft: "2px solid #60a5fa",
              }}
            >
              "I could feel the ship humming beneath me, a vast sleeping thing."
            </p>
            <div className="flex items-center gap-2 pl-3">
              <img
                src={BOOKS[1].cover}
                alt={BOOKS[1].title}
                className="w-5 h-7 rounded object-cover shrink-0"
              />
              <p className="text-xs" style={{ color: "#9a7a5a", fontFamily: "system-ui, sans-serif" }}>
                {BOOKS[1].title}
              </p>
              <span style={{ color: "#5a4a38" }}>·</span>
              <p className="text-xs" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>
                Chapter 1
              </p>
              <p className="text-xs ml-auto" style={{ color: "#6a5a48", fontFamily: "system-ui, sans-serif" }}>
                Yesterday
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN LAB PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export function DesignLabHome() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">Design Lab</p>
          <h1 className="text-3xl font-semibold mb-2">Home Page — 5 Variations</h1>
          <p className="text-gray-400">
            Direction: <strong className="text-white">Warm & academic dark</strong> · Priority:{" "}
            <strong className="text-white">current reads + progress</strong> · Goal:{" "}
            <strong className="text-white">better information hierarchy</strong>
          </p>
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

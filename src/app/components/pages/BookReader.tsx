import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Search, Menu as MenuIcon, Bookmark, List } from "lucide-react";
import { useNavigate } from "react-router";

export function BookReader() {
  const navigate = useNavigate();
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [annotations, setAnnotations] = useState([
    { id: 1, text: "This was interesting", highlight: "example text", time: "10 seconds ago", color: "gray" }
  ]);

  const chapters = [
    { id: 1, title: "Find a mentor or two", page: 1 },
    { id: 2, title: "Chapter 1", page: 12 },
    { id: 3, title: "Chapter 2", page: 24 },
    { id: 4, title: "Chapter 3", page: 36 },
    { id: 5, title: "Chapter 4", page: 48 },
    { id: 6, title: "Chapter 5", page: 60 },
    { id: 7, title: "Chapter 6", page: 72 },
    { id: 8, title: "Chapter 7", page: 84 },
  ];

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const text = selection?.toString() || "";
    if (text) {
      setSelectedText(text);
    }
  };

  const addAnnotation = (color: string) => {
    if (selectedText) {
      setAnnotations([
        {
          id: Date.now(),
          text: "",
          highlight: selectedText,
          time: "just now",
          color
        },
        ...annotations
      ]);
      setSelectedText("");
      window.getSelection()?.removeAllRanges();
    }
  };

  return (
    <div className="h-screen bg-black text-white flex">
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-800 p-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <button><ChevronLeft className="w-6 h-6" /></button>
            <span className="text-sm">2%</span>
            <button><ChevronRight className="w-6 h-6" /></button>
            <button><Search className="w-6 h-6" /></button>
            <button onClick={() => { setShowTOC(!showTOC); setShowAnnotations(false); }}>
              <List className="w-6 h-6" />
            </button>
            <button onClick={() => { setShowAnnotations(!showAnnotations); setShowTOC(false); }}>
              <Bookmark className="w-6 h-6" />
            </button>
            <button><MenuIcon className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 max-w-3xl mx-auto" onMouseUp={handleTextSelect}>
          <p className="mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mb-4 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <span className="bg-yellow-400 text-black">Excepteur sint occaecat cupidatat non proident</span>, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mb-4 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="mb-4 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>

          {selectedText && (
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 rounded-lg shadow-lg p-2 flex gap-2 z-50">
              <button onClick={() => addAnnotation('yellow')} className="w-8 h-8 bg-yellow-400 rounded hover:scale-110 transition"></button>
              <button onClick={() => addAnnotation('red')} className="w-8 h-8 bg-red-500 rounded hover:scale-110 transition"></button>
              <button onClick={() => addAnnotation('blue')} className="w-8 h-8 bg-blue-500 rounded hover:scale-110 transition"></button>
              <button onClick={() => addAnnotation('green')} className="w-8 h-8 bg-green-500 rounded hover:scale-110 transition"></button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 p-4 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=80&fit=crop" alt="Book" className="w-12 h-16 object-cover rounded mr-3" />
          <div className="flex-1">
            <div className="text-sm">Cherry Baby</div>
            <div className="text-xs text-gray-400">Rainbow Rowell</div>
          </div>
        </div>
      </div>

      {showAnnotations && (
        <div className="w-96 border-l border-gray-800 bg-[#1a1a1a] flex flex-col">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">My annotations</h2>
              <button onClick={() => setShowAnnotations(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <select className="w-full bg-gray-800 rounded px-3 py-2 text-sm">
              <option>All Annotations ({annotations.length})</option>
            </select>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find..."
                className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm"
              />
            </div>

            <div className="space-y-4">
              {annotations.map((ann) => (
                <div key={ann.id} className="border-b border-gray-800 pb-4">
                  <div className="text-sm mb-2">
                    <span className={`bg-${ann.color}-500 px-2 py-1 rounded`}>
                      {ann.highlight}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className={`w-3 h-3 bg-${ann.color}-500 rounded-full`}></div>
                    <span className="capitalize">{ann.color} (10s clips)</span>
                    <span>{ann.time}</span>
                  </div>
                  {ann.text && (
                    <div className="mt-2 text-sm text-gray-300">{ann.text}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTOC && (
        <div className="w-96 border-l border-gray-800 bg-[#1a1a1a] flex flex-col">
          <div className="border-b border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Table of Contents</h2>
              <button onClick={() => setShowTOC(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Find a chapter or section..."
                className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className={`p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${index === 0 ? 'bg-pink-500/10 border-l-4 border-l-pink-500' : ''}`}
              >
                <div className="text-sm">{chapter.title}</div>
                <div className="text-xs text-gray-400">p{chapter.page}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

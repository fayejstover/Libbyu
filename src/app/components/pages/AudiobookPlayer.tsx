import { useState } from "react";
import { X, Play, Pause, SkipBack, SkipForward, RotateCcw, Menu as MenuIcon, Bookmark, List } from "lucide-react";
import { useNavigate } from "react-router";

export function AudiobookPlayer() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClipDialog, setShowClipDialog] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [clips, setClips] = useState([
    { id: 1, text: "Upward Bound: A Novel", time: "00:00 - 00:10", timestamp: "just now", color: "gray" },
    { id: 2, text: "Jump to 00:00", time: "00:01 - 00:11", timestamp: "just now", color: "gray" },
  ]);

  const createClip = () => {
    setShowClipDialog(true);
    setTimeout(() => {
      setClips([
        { id: Date.now(), text: "New clip", time: "00:00 - 00:04", timestamp: "just now", color: "gray" },
        ...clips
      ]);
      setShowClipDialog(false);
    }, 2000);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <button><Bookmark className="w-6 h-6" /></button>
          <button onClick={createClip}><List className="w-6 h-6" /></button>
          <button onClick={() => setShowAnnotations(!showAnnotations)}><Bookmark className="w-6 h-6" /></button>
          <button><MenuIcon className="w-6 h-6" /></button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-xs text-gray-400 mb-4">00:07</div>

          <div className="w-80 h-80 mb-8">
            <img
              src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=400&fit=crop"
              alt="Upward Bound"
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button className="p-2">
              <RotateCcw className="w-5 h-5" />
              <span className="text-xs">1x</span>
            </button>
            <button className="p-2">
              <SkipBack className="w-8 h-8" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
            <button className="p-2">
              <SkipForward className="w-8 h-8" />
            </button>
            <button className="p-2">
              <RotateCcw className="w-5 h-5 rotate-180" />
            </button>
          </div>

          <div className="text-xs text-gray-400 mb-2">2%</div>
          <div className="text-xs text-gray-400">-04:53</div>

          <div className="mt-8 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=60&h=80&fit=crop"
              alt="Book"
              className="w-12 h-16 object-cover rounded"
            />
            <div>
              <div className="text-sm">Upward Bound</div>
              <div className="text-xs text-gray-400">Woody Brown</div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-2xl">
            <div className="h-20 flex items-center gap-px">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-700 rounded-sm"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                />
              ))}
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
              <select className="w-full bg-gray-800 rounded px-3 py-2 text-sm mb-4">
                <option>All Annotations ({clips.length})</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find..."
                  className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm">Clear filter</button>
                <button className="px-3 py-2 bg-gray-800 rounded text-sm">SORT BY: BOOK ORDER</button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {clips.map((clip) => (
                <div key={clip.id} className="border-b border-gray-800 pb-4">
                  <div className="text-sm mb-2">{clip.text}</div>
                  <div className="text-xs text-blue-400 mb-2">{clip.time}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span>Gray (10s clips)</span>
                    <span>{clip.timestamp}</span>
                    <button className="ml-auto text-red-500">🗑️</button>
                    <button>EDIT</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showClipDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Creating clip...</h3>
              <button onClick={() => setShowClipDialog(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <button className="w-full bg-yellow-400 text-black py-3 rounded flex items-center justify-center gap-2">
              ✓ End clip 00:04
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

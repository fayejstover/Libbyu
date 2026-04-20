import { Search, Menu, ChevronDown, MoreVertical, Maximize2 } from "lucide-react";
import { useState } from "react";

export function Annotations() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const annotations = [
    {
      id: 1,
      book: "Cherry Baby",
      author: "Rainbow Rowell",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
      highlight: "sixteen shades of chestnut brown",
      color: "yellow",
      note: "No note",
      location: "Chapter 2",
      time: "At 3:16 PM"
    },
    {
      id: 2,
      book: "Curious George and the Firefighters",
      author: "H. A. Rey, Anna Grossnickle Hines",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
      highlight: "George was a curious!",
      color: "red",
      note: "No note",
      location: "Copyright",
      time: "Feb 27"
    },
    {
      id: 3,
      book: "Curious George and the Firefighters",
      author: "H. A. Rey, Anna Grossnickle Hines",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
      highlight: "monkey to help children when",
      color: "red",
      note: "hellooooo",
      location: "Copyright",
      time: "Feb 27"
    },
    {
      id: 4,
      book: "Curious George and the Firefighters",
      author: "H. A. Rey, Anna Grossnickle Hines",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
      highlight: "George! It was the man with the yellow hat",
      color: "red",
      note: "No note",
      location: "Copyright",
      time: "Feb 27"
    }
  ];

  const filteredAnnotations = selectedColor
    ? annotations.filter(a => a.color === selectedColor)
    : annotations;

  return (
    <div className="min-h-full pb-4">
      <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Find annotations..."
              className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm"
            />
          </div>
          <button>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Your annotations</h1>
          <button className="text-sm text-gray-400 flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            Expand all
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">{filteredAnnotations.length} results</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-3 py-1 bg-pink-500 text-white rounded text-sm whitespace-nowrap">
            Select
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-1 whitespace-nowrap">
            Titles <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-1 whitespace-nowrap">
            Format <ChevronDown className="w-4 h-4" />
          </button>
          <button
            className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-1 whitespace-nowrap"
            onClick={() => {
              const colors = ['yellow', 'red', null];
              const current = colors.indexOf(selectedColor);
              setSelectedColor(colors[(current + 1) % colors.length]);
            }}
          >
            Color <ChevronDown className="w-4 h-4" />
            {selectedColor && <div className={`w-3 h-3 rounded-full ${selectedColor === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`} />}
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-1 whitespace-nowrap">
            Date modified <ChevronDown className="w-4 h-4" />
          </button>
          <button className="text-pink-500 text-sm whitespace-nowrap">
            Clear filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-800">
              <tr className="text-left text-gray-400">
                <th className="pb-2 pr-4">TITLE</th>
                <th className="pb-2 pr-4">HIGHLIGHT/CLIP</th>
                <th className="pb-2 pr-4">NOTE</th>
                <th className="pb-2 pr-4">LOCATION</th>
                <th className="pb-2 pr-4">MODIFIED</th>
                <th className="pb-2">MORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnotations.map((ann) => (
                <tr key={ann.id} className="border-b border-gray-800">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={ann.cover} alt={ann.book} className="w-10 h-14 object-cover rounded" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">📕 Book</span>
                        </div>
                        <div>{ann.book}</div>
                        <div className="text-xs text-gray-400">{ann.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className={`${ann.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'} ${ann.color === 'yellow' ? 'text-black' : 'text-white'} px-2 py-1 rounded inline-block`}>
                      {ann.highlight}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs">
                      <div className={`w-3 h-3 ${ann.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'} rounded-full`}></div>
                      <span className="capitalize">{ann.color}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-400">{ann.note}</td>
                  <td className="py-3 pr-4 text-blue-400">{ann.location}</td>
                  <td className="py-3 pr-4 text-gray-400">{ann.time}</td>
                  <td className="py-3">
                    <button>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

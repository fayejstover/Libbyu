import { Search, Menu, ChevronRight, MoreVertical } from "lucide-react";
import { BookCard } from "../BookCard";

export function Home() {
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
    }
  ];

  return (
    <div className="min-h-full pb-4">
      <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm"
            />
          </div>
          <select className="bg-gray-800 rounded px-3 py-2 text-sm">
            <option>All</option>
          </select>
          <button>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl mb-1">Home</h1>
        <p className="text-gray-400 text-sm mb-6">Good afternoon!</p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg flex items-center gap-2">
              Recents <ChevronRight className="w-5 h-5" />
            </h2>
            <button className="text-pink-500 text-sm flex items-center gap-1">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="max-w-[200px]">
            <BookCard
              id="cherry-baby"
              title="Cherry Baby"
              author="Rainbow Rowell"
              cover="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop"
              dueDate="Due in 17 days"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg flex items-center gap-2 mb-4">
            Latest annotations <ChevronRight className="w-5 h-5" />
          </h2>

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
                {annotations.map((ann) => (
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
                      <div className="bg-yellow-400 text-black px-2 py-1 rounded inline-block">
                        {ann.highlight}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>Yellow</span>
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
    </div>
  );
}

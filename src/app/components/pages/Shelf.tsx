import { Search, Menu, RefreshCw } from "lucide-react";
import { BookCard } from "../BookCard";
import { useState } from "react";

export function Shelf() {
  const [activeTab, setActiveTab] = useState("loans");

  const books = [
    { id: "cherry-baby", title: "Cherry Baby", author: "Rainbow Rowell", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", dueDate: "Due in 17 days" },
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
            <RefreshCw className="w-6 h-6" />
          </button>
          <button>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl mb-4">Shelf</h1>

        <div className="flex gap-6 border-b border-gray-800 mb-6">
          {[
            { id: "loans", label: "Loans" },
            { id: "holds", label: "Holds" },
            { id: "saved", label: "Saved" },
            { id: "history", label: "History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 relative ${
                activeTab === tab.id
                  ? "text-pink-500"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="px-3 py-1 bg-gray-800 rounded text-sm">
            (All)
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-2">
            Sort by: Date opened
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
              dueDate={book.dueDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

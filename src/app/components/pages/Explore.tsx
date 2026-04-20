import { Search, Menu, ChevronRight, SlidersHorizontal } from "lucide-react";
import { BookCard } from "../BookCard";

export function Explore() {
  const justAdded = [
    { id: "1", title: "With Love from Harlem", author: "Various", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop" },
    { id: "2", title: "Cherry Baby", author: "Rainbow Rowell", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", badge: "BESTSELLER", dueDate: "Due in 17 days" },
    { id: "3", title: "The Lack of Light", author: "Elizabeth Hand", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop" },
    { id: "4", title: "American Fantasy", author: "Emma Donoghue", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=450&fit=crop", isAudiobook: true },
    { id: "5", title: "Upward Bound", author: "Woody Brown", cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=450&fit=crop", isAudiobook: true },
  ];

  const mostPopular = [
    { id: "6", title: "The Correspondent", author: "Virginia Woolf", cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=450&fit=crop" },
    { id: "7", title: "Project Hail Mary", author: "Andy Weir", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop" },
    { id: "8", title: "The Correspondent", author: "Virginia Woolf", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=450&fit=crop" },
    { id: "9", title: "Tales of Golden", author: "Robert McKee", cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&h=450&fit=crop" },
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl">Explore</h1>
            <p className="text-sm text-gray-400">University of Michigan</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm">📚 LIBRARY</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button className="px-3 py-1 bg-gray-800 rounded text-sm flex items-center gap-1 whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm whitespace-nowrap">
            All titles
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm whitespace-nowrap">
            All subjects
          </button>
          <button className="px-3 py-1 bg-gray-800 rounded text-sm whitespace-nowrap">
            All collections
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg flex items-center gap-2">
                Just added <ChevronRight className="w-5 h-5" />
              </h2>
              <p className="text-xs text-gray-400">See 6,000 titles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {justAdded.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                badge={book.badge}
                dueDate={book.dueDate}
                isAudiobook={book.isAudiobook}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg flex items-center gap-2">
                Most Popular <ChevronRight className="w-5 h-5" />
              </h2>
              <p className="text-xs text-gray-400">See 60 titles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mostPopular.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg flex items-center gap-2">
                Love is in the Air <ChevronRight className="w-5 h-5" />
              </h2>
              <p className="text-xs text-gray-400">A Bookseller collection</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mostPopular.slice(0, 3).map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

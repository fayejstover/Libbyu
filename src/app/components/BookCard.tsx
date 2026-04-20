import { Link } from "react-router";
import { MoreVertical, Bookmark, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  dueDate?: string;
  badge?: string;
  isAudiobook?: boolean;
  showActions?: boolean;
}

export function BookCard({ id, title, author, cover, dueDate, badge, isAudiobook, showActions = true }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative group">
      {badge && (
        <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded z-10">
          {badge}
        </div>
      )}

      <Link to={isAudiobook ? `/audiobook/${id}` : `/book/${id}`}>
        <div className="relative aspect-[2/3] bg-gray-800 rounded overflow-hidden">
          <ImageWithFallback
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {showActions && (
        <div className="mt-2 relative">
          <div className="flex items-center justify-between gap-2">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm">
              Open
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded" onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-gray-800 rounded shadow-lg py-1 z-20">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-700 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                Info
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-700 text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Actions
              </button>
            </div>
          )}
        </div>
      )}

      {dueDate && (
        <div className="mt-2 text-xs text-gray-400">
          {dueDate}
        </div>
      )}
    </div>
  );
}

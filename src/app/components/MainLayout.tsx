import { Outlet, NavLink } from "react-router";
import { Home, Compass, BookMarked, FileText } from "lucide-react";

export function MainLayout() {
  return (
    <div className="h-screen bg-[#1a1a1a] text-white flex flex-col">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      <nav className="border-t border-gray-800 bg-[#1a1a1a] px-4 py-2 flex justify-around items-center">
        <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink to="/explore" className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
          <Compass className="w-6 h-6" />
          <span className="text-xs">Explore</span>
        </NavLink>

        <NavLink to="/shelf" className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
          <BookMarked className="w-6 h-6" />
          <span className="text-xs">Shelf</span>
        </NavLink>

        <NavLink to="/annotations" className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`}>
          <FileText className="w-6 h-6" />
          <span className="text-xs">Annotations</span>
        </NavLink>
      </nav>
    </div>
  );
}

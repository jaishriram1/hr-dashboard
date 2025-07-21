import { Sun, Moon } from "lucide-react"; // Optional: Install lucide-react for icons

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md">
      <h1 className="text-2xl font-bold">HR Dashboard</h1>
      <nav className="flex gap-6">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/bookmarks" className="hover:text-gray-300">Bookmarks</a>
        <a href="/analytics" className="hover:text-gray-300">Analytics</a>
      </nav>
      <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
        <Sun className="w-5 h-5" /> {/* Replace with theme logic */}
      </button>
    </header>
  );
}

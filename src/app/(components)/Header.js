import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 shadow-md dark:bg-gray-800">
      <div className="text-2xl font-bold shadow-lg dark:text-gray-100 text-white">
        <Link href="/">HR DASHBOARD</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="text-gray-500 hover:text-blue-500 dark:text-gray-300">
          Home
        </Link>
        <Link href="/bookmarks" className="text-gray-500 hover:text-blue-500 dark:text-gray-300">
          Bookmarks
        </Link>
        <Link href="/analytics" className="text-gray-500 hover:text-blue-500 dark:text-gray-300">
          Chart
        </Link>
        <ThemeSwitcher /> {}
      </nav>
    </header>
  );
};

export default Header;
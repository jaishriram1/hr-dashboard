import './globals.css';
import Header from './(components)/Header'; 
import { ThemeProvider } from './ThemeProvider';

export const metadata = {
  title: 'HR Dashboard',
  description: 'A mini HR performance dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <Header />
          <main className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">{children}</main>
        </ThemeProvider>
      </body>
    </html>

  );
}
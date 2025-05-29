
import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-3 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className="relative flex items-center justify-between mb-6 border-b pb-4 dark:border-gray-700">
        {/* Left: Calendar Icon */}
        <div className="pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-gray-800 dark:text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H5a3 3 0 00-3 3v9a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3h-.01V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v7a1 1 0 01-1 1H5a1 1 0 01-1-1V8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Center: Title */}
        <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
          My Calendar
        </h1>

        {/* Right: Dark Mode Toggle */}
        <div className="pr-2">
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              // Sun icon (for light mode)
              <svg
                className="h-6 w-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m8.66-10h-1M4.34 12h-1m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            ) : (
              // Moon icon (for dark mode)
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Calendar in Center */}
      <div className="flex justify-center">
        <Calendar darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;


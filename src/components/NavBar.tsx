import { useTheme } from '../context/ThemeContext';
import { usePlaylist } from '../context/PlaylistContext';
import { useState } from 'react';

interface NavBarProps {
  onHomeClick: () => void;
  onPlaylistClick: () => void;
  onEditListClick: () => void;
  onInfoClick: () => void;
  isShuffleEnabled: boolean;
  onShuffleToggle: () => void;
}

export function NavBar({
                         onHomeClick,
                         onPlaylistClick,
                         onEditListClick,
                         onInfoClick,
                         isShuffleEnabled,
                         onShuffleToggle,
                       }: NavBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { playlist } = usePlaylist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavItems = () => (
    <>
      <button
        onClick={onHomeClick}
        className={`flex items-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-500'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="font-semibold">Home</span>
      </button>
      <button
        onClick={onPlaylistClick}
        className={`flex items-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'text-green-400 hover:text-green-300'
            : 'text-green-600 hover:text-green-500'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span className="font-semibold">Play List</span>
        <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
          ({playlist.length})
        </span>
      </button>
      <button
        onClick={onEditListClick}
        className={`flex items-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'text-yellow-400 hover:text-yellow-300'
            : 'text-yellow-600 hover:text-yellow-500'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span className="font-semibold">Edit List</span>
      </button>
      <button
        onClick={onInfoClick}
        className={`flex items-center gap-2 transition-colors ${
          theme === 'dark'
            ? 'text-indigo-400 hover:text-indigo-300'
            : 'text-indigo-600 hover:text-indigo-500'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
          />
        </svg>
        <span className="font-semibold">Info</span>
      </button>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 shadow-lg z-50 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavItems />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {playlist.length > 0 && (
              <button
                onClick={onShuffleToggle}
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isShuffleEnabled
                    ? theme === 'dark'
                      ? 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{isShuffleEnabled ? 'Shuffle On' : 'Shuffle Off'}</span>
              </button>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'text-yellow-400 hover:text-yellow-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {theme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex flex-col space-y-4">
                <NavItems />
                {playlist.length > 0 && (
                  <button
                    onClick={onShuffleToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isShuffleEnabled
                        ? theme === 'dark'
                          ? 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>{isShuffleEnabled ? 'Shuffle On' : 'Shuffle Off'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { Card } from '../Card';
import { useTheme } from '../context/ThemeContext';

const Info = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Card>
        <div className="p-6">
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue' : 'text-gray-900'}`}>
            About This Application
          </h2>
          <p className={`mt-4 text-base ${theme === 'dark' ? 'text-blue' : 'text-gray-700'}`}>
            This application allows you to search for YouTube songs, play videos, and manage a playlist.
            Use the navigation bar to switch between searching, playing videos, and editing your playlist.
          </p>
          <p className={`mt-2 text-base ${theme === 'dark' ? 'text-blue' : 'text-gray-700'}`}>
            Enjoy a seamless experience with dynamic theming and responsive design.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Info;

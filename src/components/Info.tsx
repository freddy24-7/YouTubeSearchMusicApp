import { Card } from '../Card';
import { useTheme } from '../context/ThemeContext';

const Info = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-blue' : 'text-gray-700';
  const headingColor = theme === 'dark' ? 'text-blue' : 'text-gray-900';

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Card>
        <div className="p-6">
          <h2 className={`text-2xl font-bold ${headingColor}`}>
            About This Application
          </h2>

          <p className={`mt-4 text-base ${textColor}`}>
            This application allows you to search for YouTube songs, play videos, and manage a playlist.
            Use the navigation bar to switch between searching, playing videos, and editing your playlist.
          </p>

          <p className={`mt-2 text-base ${textColor}`}>
            Enjoy a seamless experience with dynamic theming and responsive design.
          </p>

          {/* New info for mobile users */}
          <p className={`mt-4 text-sm sm:text-base font-medium ${textColor}`}>
            <strong>Note for mobile users:</strong> You may need to manually unmute songs in the video player to hear them. For the best experience, hold your device horizontally (landscape mode).
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Info;

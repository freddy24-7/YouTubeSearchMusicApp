import { Card } from '../Card';
import { useTheme } from '../context/ThemeContext';

const Info = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-blue' : 'text-gray-700';
  const headingColor = theme === 'dark' ? 'text-blue' : 'text-gray-900';

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Card>
        <div className="p-6 space-y-6">
          <div>
            <h2 className={`text-2xl font-bold ${headingColor} mb-4`}>
              About This Application
            </h2>
            <p className={`text-base ${textColor}`}>
              This application allows you to search for YouTube songs, play videos, and manage a playlist. We use the YouTube IFrame API to provide high-quality video playback directly from YouTube's servers.
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold ${headingColor} mb-3`}>
              YouTube Compliance & Privacy
            </h3>
            <p className={`text-base ${textColor} mb-4`}>
              To ensure a fair experience for creators and stay in line with YouTube Developer Policies, this app implements the following features:
            </p>
            <ul className={`list-disc list-inside space-y-2 ${textColor} ml-4`}>
              <li>
                <strong>Active Viewing Only:</strong> In accordance with YouTube's terms, playback will automatically pause if you switch tabs, minimize the window, or if the video player is no longer visible on your screen.
              </li>
              <li>
                <strong>Unmodified Experience:</strong> We do not block ads, hide player controls, or separate audio from the video.
              </li>
              <li>
                <strong>Official Terms:</strong> By using this app, you are also agreeing to be bound by the{' '}
                <a
                  href="https://www.youtube.com/static?template=terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:opacity-80 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  YouTube Terms of Service
                </a>
                {' '}and{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:opacity-80 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  Google Privacy Policy
                </a>
                .
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-bold ${headingColor} mb-2`}>
              Note for Mobile Users
            </h3>
            <p className={`text-base ${textColor}`}>
              You may need to manually unmute songs in the video player to hear them. For the best experience, hold your device horizontally (landscape mode) to ensure the player meets the minimum size requirements for a clear view.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Info;

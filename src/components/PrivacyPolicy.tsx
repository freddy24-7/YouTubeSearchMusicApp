import { Card } from '../Card';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'text-blue' : 'text-gray-700';
  const headingColor = theme === 'dark' ? 'text-blue' : 'text-gray-900';

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Card>
        <div className="p-6 space-y-6">
          <div>
            <h1 className={`text-3xl font-bold ${headingColor} mb-2`}>Privacy Policy</h1>
            <p className={`text-sm ${textColor}`}>Last Updated: January 2026</p>
          </div>

          <section>
            <h2 className={`text-xl font-bold ${headingColor} mb-3`}>1. Introduction</h2>
            <p className={`text-base ${textColor}`}>
              This application provides a search and playback interface for YouTube content. 
              We value your privacy and are committed to being transparent about how our application functions.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold ${headingColor} mb-3`}>2. YouTube API Services</h2>
            <p className={`text-base ${textColor}`}>
              Our application uses YouTube API Services to search for and play video content. 
              By using this app, you acknowledge and agree to be bound by the{' '}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                YouTube Terms of Service
              </a>
              {' '}and the{' '}
              <a
                href="https://www.google.com/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold ${headingColor} mb-3`}>3. Data Collection and Storage</h2>
            <p className={`text-base ${textColor} mb-2`}>
              <strong>No Personal Data:</strong> We do not require a sign-up or user account. We do not collect, store, or share any personal information, email addresses, or browsing history.
            </p>
            <p className={`text-base ${textColor}`}>
              <strong>Local Storage:</strong> Your playlists and preferences are stored exclusively in your browser's <strong>Local Storage</strong>. This data stays on your device and is never uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold ${headingColor} mb-3`}>4. Third-Party Cookies</h2>
            <p className={`text-base ${textColor}`}>
              Because we use the YouTube IFrame player, YouTube may set cookies on your device to track video performance and provide personalized advertising according to their own policies. We do not have access to these cookies.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-bold ${headingColor} mb-3`}>5. Revoking Access</h2>
            <p className={`text-base ${textColor}`}>
              You can clear your stored playlists at any time by clearing your browser cache or using the "Clear Playlist" button within the app. You can also manage your Google security settings at{' '}
              <a
                href="https://security.google.com/settings/security/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Google Security Settings
              </a>
              .
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;


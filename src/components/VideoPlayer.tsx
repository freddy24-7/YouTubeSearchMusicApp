import { YouTubeVideo } from '../services/youtubeApi';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
  video: YouTubeVideo;
  onEnded?: () => void;
}

export function VideoPlayer({ video, onEnded }: VideoPlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [mute, setMute] = useState(0);

  // Determine the mute value based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMute(1); // Mute for small and medium screens (<= 768px)
      } else {
        setMute(0); // Unmute for large screens
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize); // Add event listener for screen resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const onEnd: YouTubeProps['onEnd'] = () => {
    if (onEnded) {
      onEnded();
    }
  };

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      enablejsapi: 1,
      modestbranding: 1,
      mute: mute,
      origin: window.location.origin,
      playsinline: 1,
    },
  };

  return (
    <div className="w-full pointer-events-none">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
          <div className="pointer-events-auto">
            <YouTube
              videoId={video.id.videoId}
              opts={opts}
              onReady={onReady}
              onEnd={onEnd}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

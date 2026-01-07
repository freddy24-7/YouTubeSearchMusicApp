import { VideoPlayer } from './VideoPlayer';
import { YouTubeVideo } from '../services/youtubeApi';
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface VideoPlayerContainerProps {
  video: YouTubeVideo;
  playlist: YouTubeVideo[];
  currentPlaylistIndex: number;
  setCurrentPlaylistIndex: (index: number) => void;
  setSelectedVideo: (video: YouTubeVideo | null) => void;
  setIsPlaying: (playing: boolean) => void;
  isShuffleEnabled: boolean;
  currentView: 'search' | 'playlist' | 'editList' | 'info';
}

export default function VideoPlayerContainer({
                                               video,
                                               playlist,
                                               currentPlaylistIndex,
                                               setCurrentPlaylistIndex,
                                               setSelectedVideo,
                                               setIsPlaying,
                                               isShuffleEnabled,
                                               currentView,
                                             }: VideoPlayerContainerProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: '90vw',
    height: 'calc(90vw * 9 / 16)',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [initialTouch, setInitialTouch] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const minWidth = 300;
      const minHeight = 200;
      // Padding values: 0.5cm for mobile, 1cm for larger screens
      const paddingMobile = 18.9; // 0.5cm in pixels (at 96 DPI)
      const paddingLarge = 37.8; // 1cm in pixels (at 96 DPI)
      const isLargeScreen = window.innerWidth >= 640;
      const padding = isLargeScreen ? paddingLarge : paddingMobile;
      const paddingTotal = padding * 2; // left + right or top + bottom

      if (window.innerWidth >= 1024) {
        // Large screens: bigger fixed player size (16:9) but constrained by padding
        const maxWidth = window.innerWidth - paddingTotal;
        const maxHeight = window.innerHeight - 96 - paddingTotal; // 96px for header (6rem)
        const playerWidth = Math.min(1400, maxWidth);
        const playerHeight = Math.min(788, maxHeight, playerWidth * 9 / 16);
        setSize({ width: `${playerWidth}px`, height: `${playerHeight}px` });
      } else if (window.innerWidth >= 640) {
        // Medium screens: slightly smaller fixed size but constrained by padding
        const maxWidth = window.innerWidth - paddingTotal;
        const maxHeight = window.innerHeight - 96 - paddingTotal;
        const playerWidth = Math.min(1000, maxWidth);
        const playerHeight = Math.min(563, maxHeight, playerWidth * 9 / 16);
        setSize({ width: `${playerWidth}px`, height: `${playerHeight}px` });
      } else {
        // Small screens: responsive to viewport width with minimum size enforcement and padding
        const availableWidth = window.innerWidth - paddingTotal;
        const calculatedWidth = Math.max(minWidth, availableWidth * 0.9);
        const calculatedHeight = Math.max(minHeight, calculatedWidth * 9 / 16);
        setSize({
          width: `${calculatedWidth}px`,
          height: `${calculatedHeight}px`,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    if (e.touches.length === 2) {
      setIsResizing(true);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setInitialTouch({ x: initialDistance, y: 0 });
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setInitialSize({ width: rect.width, height: rect.height });
      }
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setInitialTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    if (isResizing && e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const scale = currentDistance / initialTouch.x;

      setSize({
        width: `${initialSize.width * scale}px`,
        height: `${initialSize.height * scale}px`
      });
    } else if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - initialTouch.x;
      const deltaY = touch.clientY - initialTouch.y;

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      setInitialTouch({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleVideoEnd = () => {
    if (currentView === 'playlist' && playlist.length > 0) {
      let nextIndex: number;
      if (isShuffleEnabled) {
        do {
          nextIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && nextIndex === currentPlaylistIndex);
      } else {
        nextIndex = (currentPlaylistIndex + 1) % playlist.length;
      }
      setCurrentPlaylistIndex(nextIndex);
      setSelectedVideo(playlist[nextIndex]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setSelectedVideo(null);
    }
  };

  return (
    <div
      className="relative h-[calc(100vh-6rem)] p-[0.5cm] sm:p-[1cm]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={containerRef}
        className="relative"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: size.width,
          height: size.height,
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
          touchAction: 'none',
          display: 'block',
          visibility: 'visible',
        }}
      >
        <VideoPlayer
          video={video}
          onEnded={handleVideoEnd}
        />
        {/* Video metadata display for YouTube API compliance - positioned at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 text-center pointer-events-none z-10 pt-2"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' 
              : 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
          }}
        >
          <h2
            className={`text-lg font-bold mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {video.snippet.title}
          </h2>
          <p
            className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {video.snippet.channelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

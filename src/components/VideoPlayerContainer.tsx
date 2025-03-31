import React from 'react';
import { Card } from '../Card';
import { VideoPlayer } from './VideoPlayer';
import { YouTubeVideo } from '../services/youtubeApi';
import { useState, useRef } from 'react';

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

const VideoPlayerContainer = ({
                                video,
                                playlist,
                                currentPlaylistIndex,
                                setCurrentPlaylistIndex,
                                setSelectedVideo,
                                setIsPlaying,
                                isShuffleEnabled,
                                currentView,
                              }: VideoPlayerContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: '100%', height: 'auto' });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [initialTouch, setInitialTouch] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two finger touch - handle resizing
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
      // Single finger touch - handle dragging
      setIsDragging(true);
      setInitialTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
      <div
        ref={containerRef}
        className="max-w-4xl w-full relative"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          touchAction: 'none'
        }}
      >
        <Card
          className="touch-none"
          style={{ width: size.width, height: size.height }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <VideoPlayer video={video} onEnded={handleVideoEnd} />
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayerContainer;

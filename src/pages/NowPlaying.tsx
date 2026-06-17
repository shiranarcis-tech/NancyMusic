import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../components/ui/Icon';
import { getSongs } from '../services/firestoreService';
import type { Song } from '../types';

export const NowPlaying: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Use the first song as default
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const [songs, setSongs] = useState<Song[]>([]);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    getSongs()
      .then((songsData) => {
        setSongs(songsData);
        const savedSongId = localStorage.getItem('currentSongId');
        if (savedSongId && songsData.length > 0) {
          const index = songsData.findIndex((s) => s.id === savedSongId);
          if (index !== -1) {
            setCurrentSongIndex(index);
          }
        }
      })
      .catch((error) => {
        console.error('Failed to load songs from Firestore:', error);
      });
  }, []);

  useEffect(() => {
    if (currentSong?.id) {
      localStorage.setItem('currentSongId', currentSong.id);
    }
  }, [currentSong]);

  useEffect(() => {
    if (songs.length > 0 && currentSongIndex >= songs.length) {
      setCurrentSongIndex(0);
    }
  }, [songs.length, currentSongIndex]);

  // Memoize handleSkipNext to use in effects
  const handleSkipNext = useCallback(() => {
    setCurrentSongIndex((prev) =>
      songs.length === 0 ? 0 : prev === songs.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(true);
  }, [songs.length]);

  // Update current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log('Audio loaded, duration:', audio.duration);
    };

    const handleEnded = () => {
      handleSkipNext();
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [handleSkipNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioUrl) return;

    // Only update the source and load if it's different
    const isSameSource = audio.src === currentSong.audioUrl;
    if (!isSameSource) {
      setCurrentTime(0);
      setDuration(0);
      audio.src = currentSong.audioUrl;
      audio.load();
    }

    if (isPlaying) {
      // Use a small delay to ensure audio is ready
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!currentSong) return;
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.src && currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      audio.load();
    }

    setIsPlaying((prev) => !prev);
  };

  const handleSkipPrevious = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(true);
  }, [songs.length]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
  };

  const handleAddToPlaylist = () => {
    if (!currentSong) return;
    console.log('Adding to playlist:', currentSong.title);
  };

  const handleFavorite = () => {
    if (!currentSong) return;
    setIsFavorited(!isFavorited);
    console.log('Favorited:', currentSong.title);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display text-gray-900 dark:text-white">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-10 text-center shadow-xl dark:border-gray-700 dark:bg-gray-900/80">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Loading your music...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch your playlist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display text-gray-900 dark:text-white">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" />

      <div className="w-full max-w-md space-y-6">
        {/* Album Cover and Song Info */}
        <div className="flex flex-col items-center space-y-6">
          <img
            alt={currentSong.title}
            className="h-80 w-80 rounded-xl object-cover shadow-2xl"
            src={currentSong.coverUrl}
          />
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {currentSong.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {currentSong.artist}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Progress Bar and Controls */}
        <div className="space-y-4">
          {/* Progress Slider */}
          <div className="space-y-1">
            <div className="relative h-2 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
              />
              <div
                className="absolute h-2 rounded-full bg-primary pointer-events-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={handleSkipPrevious}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Skip to previous song"
            >
              <Icon name="skip_previous" className="text-4xl" />
            </button>

            <button
              onClick={handlePlayPause}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <Icon name={isPlaying ? 'pause' : 'play_arrow'} className="text-5xl" />
            </button>

            <button
              onClick={handleSkipNext}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Skip to next song"
            >
              <Icon name="skip_next" className="text-4xl" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-8 pt-4">
          <button
            onClick={handleAddToPlaylist}
            className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            aria-label="Add to playlist"
          >
            <Icon name="playlist_add" className="text-2xl" />
          </button>
          <button
            onClick={handleFavorite}
            className={`transition-colors ${
              isFavorited
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
            }`}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon name={isFavorited ? 'favorite' : 'favorite_border'} className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

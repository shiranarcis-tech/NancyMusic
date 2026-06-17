import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddSongModal } from '../components/AddSongModal';
import { getPlaylistById, getSongsByIds, addSong, addSongToPlaylist } from '../services/firestoreService';
import type { Playlist, Song } from '../types';

interface PlaylistSong extends Song {
  number: number;
}

export function Playlist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<PlaylistSong[]>([]);

  useEffect(() => {
    if (!id) return;
    getPlaylistById(id)
      .then((playlistData) => {
        if (!playlistData) return;
        setPlaylist(playlistData);
        return getSongsByIds(playlistData.songIds || []);
      })
      .then((playlistSongs) => {
        if (!playlistSongs) return;
        setSongs(
          playlistSongs.map((song, index) => ({
            ...song,
            number: index + 1,
          }))
        );
      })
      .catch((error) => {
        console.error('Failed to load playlist songs from Firestore:', error);
      });
  }, [id]);

  const playlistName = playlist?.title || 'Playlist name';
  const playlistDescription = playlist?.description || 'A short description of the playlist goes here. It can be a few sentences long to give users an idea of what to expect.';
  const playlistImage = playlist?.coverUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrkC4P3V2t9F5U5YKkZcnZUu5x14Kl-LInY1P0DRbgfPNsEyV28VC9ZvjBR0nofkwAArsMd8cm90Sttq77ENN06XzwlwAzqaCf31zEFLI-Xn0OmLxd_yvU4AljWKb_voU5Uz5f5cfNLmLbwJT3Gavr-BXJqBNohOfxF1_My3EgM9CXQGiftxF4lOyvKP5taEUcmEZl3btOTb-pc-HY1Hv6eKdC9LAEOS1Oi5XzpvC2MqnKijH8P4nZQJSYFrJoWAOOyUCnBHfzfsY';

  const totalSongs = songs.length;
  const totalDuration = '45 min 30 sec';

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
      if (!audio || !currentSong?.audioUrl) return;

      audio.src = currentSong.audioUrl;
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Playback error:', error);
        setIsPlaying(false);
      });
    }
    }, [currentSongIndex, currentSong?.audioUrl, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
      setIsPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Playback error:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (!songs.length) return;
      if (!currentSong?.audioUrl) {
      console.warn('No audio URL available for the current song');
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleAddSong = () => {
    setIsAddSongModalOpen(true);
  };

  const handleAddSongSubmit = async (songData: { name: string; artist: string; length: string; file: File; fileUrl: string }) => {
    try {
      const createdSong = await addSong({
        title: songData.name,
        artist: songData.artist,
        coverUrl: playlistImage,
        audioUrl: songData.fileUrl,
        length: songData.length,
      });

      if (playlist?.id) {
        await addSongToPlaylist(playlist.id, createdSong.id);
      }

      const newSong: PlaylistSong = {
        ...createdSong,
        number: songs.length + 1,
      };
      setSongs([...songs, newSong]);
    } catch (error) {
      console.error('Failed to save song to Firestore:', error);
    }
  };

  const handleMore = () => {
    console.log('More options');
  };

  const handleDeleteSong = (songId: string) => {
    setSongs(songs.filter((song) => song.id !== songId));
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background-light p-4 pt-16 dark:bg-background-dark">
      <audio ref={audioRef} />
      <div className="w-full max-w-4xl space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Home</span>
        </button>

        {/* Playlist Header */}
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <img
            alt="Playlist cover"
            className="h-48 w-48 rounded-xl object-cover shadow-lg"
            src={playlistImage}
          />
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
              {playlistName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{playlistDescription}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalSongs} songs, {totalDuration}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handlePlay}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                <span>Play</span>
              </button>
              <button
                onClick={handleAddSong}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-base font-bold text-gray-700 transition-colors hover:bg-gray-100 dark:border-[#443267] dark:bg-[#221933] dark:text-white dark:hover:bg-[#2a203f]"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add song</span>
              </button>
              <button
                onClick={handleMore}
                className="rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-700 hover:bg-gray-100 dark:border-[#443267] dark:bg-[#221933] dark:text-white dark:hover:bg-[#2a203f]"
              >
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
          </div>
        </div>

        {/* Songs Table */}
        <div className="space-y-2 rounded-xl bg-white p-4 shadow-lg dark:bg-[#221933]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="p-4">#</th>
                  <th className="p-4">Song Name</th>
                  <th className="hidden p-4 md:table-cell">Artist</th>
                  <th className="hidden p-4 md:table-cell">Length</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#443267]">
                {songs.map((song) => (
                  <tr
                    key={song.id}
                    className="group hover:bg-gray-50 dark:hover:bg-[#2a203f]"
                  >
                    <td className="p-4 text-gray-500 dark:text-gray-400">{song.number}</td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {song.title}
                    </td>
                    <td className="hidden p-4 text-gray-600 dark:text-gray-300 md:table-cell">
                      {song.artist}
                    </td>
                    <td className="hidden p-4 text-gray-600 dark:text-gray-300 md:table-cell">
                      {song.length}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteSong(song.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Song Modal */}
      <AddSongModal 
        isOpen={isAddSongModalOpen}
        onClose={() => setIsAddSongModalOpen(false)}
        onAddSong={handleAddSongSubmit}
      />
    </div>
  );
}

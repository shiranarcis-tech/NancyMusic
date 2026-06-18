import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { useAuth } from '../contexts/AuthContext';
import { getPlaylists, getUser } from '../services/firestoreService';
import type { Playlist, User } from '../types';

export const MyPlaylist: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([getUser(currentUser.uid), getPlaylists()])
      .then(([userData, playlistsData]) => {
        setUser(userData);
        setPlaylists(playlistsData);
      })
      .catch((error) => {
        console.error('Failed to load user playlists from Firestore:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
        <div className="rounded-3xl border border-gray-200 bg-white/80 p-10 text-center shadow-xl dark:border-gray-700 dark:bg-gray-900/80">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Loading your profile...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch your data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center p-4 bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        aria-label="Go back"
      >
        <Icon name="arrow_back" className="text-3xl" />
      </button>

      <div className="w-full max-w-lg space-y-8 pt-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar src={user?.avatarUrl ?? ''} alt={user?.name ?? 'Guest'} size="lg" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name ?? 'Guest'}</h1>
            <p className="text-md text-gray-600 dark:text-gray-300">Music enthusiast. Creator of vibes.</p>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <Button onClick={handleLogout} variant="danger" className="px-4 py-2">
            <Icon name="logout" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>

        {/* Liked Songs */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">שירים אהובים</h2>
          <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-pink-500/20 to-red-500/20 p-4 border border-red-200 dark:border-red-800">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-red-500 flex-shrink-0">
              <Icon name="favorite" className="text-white text-3xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">שירים אהובים</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.savedSongIds?.length ?? 0} שירים
              </p>
            </div>
          </div>
        </div>

        {/* My Playlists */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">הפלייליסטים שלי</h2>
          {playlists.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">אין פלייליסטים עדיין</p>
          ) : (
            <div className="space-y-3">
              {playlists.map((pl) => (
                <div key={pl.id} className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                  <div className="flex items-center space-x-4">
                    <img alt="Playlist cover" className="h-12 w-12 rounded-md object-cover" src={pl.coverUrl} />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{pl.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pl.songCount} שירים</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/playlist/${pl.id}`)}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    aria-label={`Open ${pl.title}`}
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { MOCK_USER, MOCK_PLAYLISTS, MOCK_LIBRARY } from '../data/mock-data';

export const MyPlaylist: React.FC = () => {
  const navigate = useNavigate();

  const user = MOCK_USER;
  const playlists = MOCK_PLAYLISTS.filter((p) => p.userId === user.id);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center p-4 bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-md text-gray-600 dark:text-gray-300">Music enthusiast. Creator of vibes.</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{playlists.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Playlists</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_LIBRARY.savedSongIds.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Liked Songs</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 pt-2">
          <Button onClick={() => console.log('Edit profile')} className="px-4 py-2">
            <Icon name="edit" />
            <span className="ml-2">Edit Profile</span>
          </Button>
          <Button onClick={() => console.log('Settings')} className="px-4 py-2">
            <Icon name="settings" />
            <span className="ml-2">Settings</span>
          </Button>
          <Button onClick={() => console.log('Logout')} variant="danger" className="px-4 py-2">
            <Icon name="logout" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>

        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Playlists</h2>
          <div className="space-y-3">
            {playlists.map((pl) => (
              <div key={pl.id} className="flex items-center justify-between rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                  <img alt="Playlist cover" className="h-12 w-12 rounded-md object-cover" src={pl.coverUrl} />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{pl.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{pl.songCount} songs</p>
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
        </div>
      </div>
    </div>
  );
};

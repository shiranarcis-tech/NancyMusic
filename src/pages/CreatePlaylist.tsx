import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { addPlaylist } from '../services/firestoreService';
import { Icon } from '../components/ui/Icon';

export const CreatePlaylist: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [playlistImage, setPlaylistImage] = useState<string | null>(null);
  const [playlistImageFile, setPlaylistImageFile] = useState<File | null>(null);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPlaylistImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPlaylistImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!playlistName.trim()) {
        throw new Error('Playlist name is required');
      }

      let coverUrl = '';

      // Upload cover image if provided
      if (playlistImageFile) {
        const storageRef = ref(storage, `playlist-covers/${Date.now()}-${playlistImageFile.name}`);
        const snapshot = await uploadBytes(storageRef, playlistImageFile);
        coverUrl = await getDownloadURL(snapshot.ref);
      }

      // Create playlist in Firestore
      const newPlaylist = await addPlaylist({
        title: playlistName,
        coverUrl: coverUrl,
        songCount: 0,
        userId: 'usr_001', // TODO: Get from auth context
        isPublic: false,
        songIds: [],
      });

      console.log('Playlist created:', newPlaylist);
      navigate('/myplaylist');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create playlist';
      setError(errorMessage);
      console.error('Error creating playlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center bg-logo p-4 pt-16 bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z' fill='%235b13ec' fill-opacity='0.1'/%3E%3C/svg%3E%0A\")",
        backgroundSize: '50px 50px',
      }}
    >
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Create new playlist
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white dark:bg-[#221933] p-8 shadow-lg">
          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-100">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <label
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-background-light p-6 text-center hover:bg-gray-200 dark:border-[#443267] dark:bg-background-dark dark:hover:bg-[#2a203f]"
                htmlFor="playlist-image"
              >
                <div className="space-y-2">
                  <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-[#a492c9]">
                    image
                  </span>
                  <p className="text-sm font-medium text-gray-600 dark:text-[#a492c9]">Playlist Image</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Click to upload</p>
                </div>
                {playlistImage && (
                  <img
                    src={playlistImage}
                    alt="Playlist preview"
                    className="mt-4 h-32 w-32 rounded-lg object-cover"
                  />
                )}
                <input
                  id="playlist-image"
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="space-y-6 md:col-span-2">
              <label className="flex flex-col">
                <span className="pb-2 text-sm font-medium text-gray-600 dark:text-[#a492c9]">
                  Playlist Name
                </span>
                <input
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  placeholder="e.g., My Awesome Mix"
                  type="text"
                  className="form-input w-full rounded-lg border-gray-300 bg-background-light p-4 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:placeholder:text-[#a492c9] dark:focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </label>

              <label className="flex flex-col">
                <span className="pb-2 text-sm font-medium text-gray-600 dark:text-[#a492c9]">
                  Description
                </span>
                <textarea
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  placeholder="A short description of your playlist"
                  rows={4}
                  className="form-textarea w-full rounded-lg border-gray-300 bg-background-light p-4 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-[#443267] dark:bg-background-dark dark:text-white dark:placeholder:text-[#a492c9] dark:focus:ring-primary"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-4 text-lg font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name={isLoading ? 'hourglass_empty' : 'add'} className="text-lg" />
              <span className="ml-2">{isLoading ? 'Creating...' : 'Create playlist'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

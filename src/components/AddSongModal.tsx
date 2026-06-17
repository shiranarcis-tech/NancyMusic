import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSong: (song: { name: string; artist: string; length: string; file: File; fileUrl: string }) => void;
}

export const AddSongModal: React.FC<AddSongModalProps> = ({ isOpen, onClose, onAddSong }) => {
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    length: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.includes('audio')) {
        setErrors(prev => ({
          ...prev,
          file: 'Please select a valid audio file',
        }));
        setFile(null);
      } else {
        setFile(selectedFile);
        if (errors.file) {
          setErrors(prev => ({
            ...prev,
            file: '',
          }));
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Song name is required';
    }
    if (!formData.artist.trim()) {
      newErrors.artist = 'Artist name is required';
    }
    if (!formData.length.trim()) {
      newErrors.length = 'Song length is required';
    }
    if (!file) {
      newErrors.file = 'Please upload an MP3 file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !file) return;

    setIsUploading(true);
    try {
      // Create a unique file path
      const timestamp = Date.now();
      const fileName = `songs/${timestamp}-${file.name}`;
      const storageRef = ref(storage, fileName);

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Call the parent handler with all data including the download URL
      onAddSong({
        name: formData.name,
        artist: formData.artist,
        length: formData.length,
        file: file,
        fileUrl: downloadURL,
      });

      // Reset form
      setFormData({ name: '', artist: '', length: '' });
      setFile(null);
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrors(prev => ({
        ...prev,
        file: 'Failed to upload file. Please try again.',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Add Song to Playlist" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Song Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Song Name
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Enter song name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isUploading}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Artist Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Artist Name
          </label>
          <Input
            type="text"
            name="artist"
            placeholder="Enter artist name"
            value={formData.artist}
            onChange={handleInputChange}
            disabled={isUploading}
            className={errors.artist ? 'border-red-500' : ''}
          />
          {errors.artist && (
            <p className="text-sm text-red-500 mt-1">{errors.artist}</p>
          )}
        </div>

        {/* Song Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Song Length (format: mm:ss)
          </label>
          <Input
            type="text"
            name="length"
            placeholder="e.g., 3:45"
            value={formData.length}
            onChange={handleInputChange}
            disabled={isUploading}
            className={errors.length ? 'border-red-500' : ''}
          />
          {errors.length && (
            <p className="text-sm text-red-500 mt-1">{errors.length}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload MP3 File
          </label>
          <div className="relative">
            <input
              type="file"
              accept="audio/mpeg,.mp3"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              disabled={isUploading}
            />
            <label
              htmlFor="file-input"
              className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-colors ${
                isUploading 
                  ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                {isUploading ? 'cloud_upload' : 'upload_file'}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isUploading ? 'Uploading...' : file ? file.name : 'Click to upload MP3'}
              </span>
            </label>
          </div>
          {errors.file && (
            <p className="text-sm text-red-500 mt-1">{errors.file}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isUploading
                ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                : 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isUploading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'text-white bg-primary hover:bg-primary/90'
            }`}
          >
            <span className="material-symbols-outlined">
              {isUploading ? 'hourglass_bottom' : 'add_circle'}
            </span>
            {isUploading ? 'Uploading...' : 'Add Song'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

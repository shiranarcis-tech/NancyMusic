import { collection, doc, documentId, getDoc, getDocs, query, where, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import type { Album, Playlist, Song, User } from '../types';

const songsCollection = collection(db, 'songs');
const albumsCollection = collection(db, 'albums');
const playlistsCollection = collection(db, 'playlists');
const usersCollection = collection(db, 'users');

const snapshotToData = <T extends { id: string }>(docData: any): T => ({ id: docData.id, ...docData } as T);

export async function getSongs(): Promise<Song[]> {
  const snapshot = await getDocs(songsCollection);
  return snapshot.docs.map((doc) => snapshotToData<Song>({ id: doc.id, ...doc.data() }));
}

export async function getSongById(id: string): Promise<Song | null> {
  const docRef = doc(songsCollection, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshotToData<Song>({ id: snapshot.id, ...snapshot.data() }) : null;
}

export async function getSongsByIds(ids: string[]): Promise<Song[]> {
  if (ids.length === 0) return [];

  const chunks: string[][] = [];
  const chunkSize = 10;
  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  const results: Song[] = [];
  for (const chunk of chunks) {
    const q = query(songsCollection, where(documentId(), 'in', chunk));
    const snapshot = await getDocs(q);
    results.push(
      ...snapshot.docs.map((doc) => snapshotToData<Song>({ id: doc.id, ...doc.data() }))
    );
  }

  return ids.map((id) => results.find((item) => item.id === id)).filter(Boolean) as Song[];
}

export async function addSong(song: Omit<Song, 'id'>): Promise<Song> {
  const songRef = doc(songsCollection);
  const newSong = { ...song, id: songRef.id };
  await setDoc(songRef, newSong);
  return newSong;
}

export async function getAlbums(): Promise<Album[]> {
  const snapshot = await getDocs(albumsCollection);
  return snapshot.docs.map((doc) => snapshotToData<Album>({ id: doc.id, ...doc.data() }));
}

export async function getPlaylists(): Promise<Playlist[]> {
  const snapshot = await getDocs(playlistsCollection);
  return snapshot.docs.map((doc) => snapshotToData<Playlist>({ id: doc.id, ...doc.data() }));
}

export async function getPlaylistById(id: string): Promise<Playlist | null> {
  const playlistRef = doc(playlistsCollection, id);
  const snapshot = await getDoc(playlistRef);
  return snapshot.exists() ? snapshotToData<Playlist>({ id: snapshot.id, ...snapshot.data() }) : null;
}

export async function addSongToPlaylist(playlistId: string, songId: string): Promise<void> {
  const playlistRef = doc(playlistsCollection, playlistId);
  await updateDoc(playlistRef, {
    songIds: arrayUnion(songId),
  });
}

export async function removeSongFromPlaylist(playlistId: string, songId: string): Promise<void> {
  const playlistRef = doc(playlistsCollection, playlistId);
  await updateDoc(playlistRef, {
    songIds: arrayRemove(songId),
  });
}

export async function addPlaylist(playlist: Omit<Playlist, 'id'>): Promise<Playlist> {
  const playlistRef = doc(playlistsCollection);
  const newPlaylist = { ...playlist, id: playlistRef.id };
  await setDoc(playlistRef, newPlaylist);
  return newPlaylist;
}

export async function getUser(userId: string): Promise<User | null> {
  const userRef = doc(usersCollection, userId);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshotToData<User>({ id: snapshot.id, ...snapshot.data() }) : null;
}

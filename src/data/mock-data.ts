import type { User, Song, Album, Playlist, Library } from '../types';

// Image constants extracted directly from the HTML UI designs
const MOCK_IMAGES = {
  user_alex: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv-1z_o4cJuvadexPYqor1l5X-NH0llXEpjKf-MscT7X1_V67-r7PINOrLND_dATOVIYjh5eT64HDlY8Cdv4HrGog8JkWhzG91gmHNPDO4pHD7o_f8Q8t8_YcVL0Goqsl1uo2I5j6MP3K07219Kwg2qYaEWRpdp2o8dQnoPqsBCOufH0cXa8UI6Zj_Zd91TaqV2wBKvfIG5iao-QniqQrohzhfNGR4kNf8rm6OzdcRrvwaDahDnglzI3e0wDOOKAy4uGQLPw_-f0E",
  album_hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCS4mocECblgKu1M7K6sTP31V6AGMWmXt7yl0WnrPbMIGohnf4R9YuRvDxWQO6mz_Ct_6IeX3UqHM6Bm9VWys070zAcATkgVlUoFVxD58uuDCNRSZPNuVc4I04Xvm90pHvDLydJwj_eIfi2RTmxXqFlXhJFPuO6l_m-6-4evT0IJfw8sg_rbiZjhgw0nxVo8G0IR8Q1dUUGRE95UZ0juC1GBSrmgXgvyU1kK-5gqzIBX50Ui3dwAmEd66VUpbjVLV8iGVwVbMaFOdk",
  song_starlight: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0N6RbJYidR6zLpZeNYvLuuoeUKr5TEhYSbFO1HWhjP8n8gDavBCPIuKBvLD-8PWktTlgHKYSj5ooPNqp9qLskNybkgmEdOmcUsN2i9RIwzyTfCqQPVBGh_D3wRPUYSCtgSAxnjxwYvnZKik3EFClUw4iyQa2--ID3FelkD51-RmAH7TXDYunf0pbn4UqSIruRXJ63M5uA7FkPaMat9g78MoiNO8HePsLdYzPuYos4P8k8E1GgrG0sgj1iBoZaq2NA0hJjrVSqEG8",
  song_hysteria: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuCyjHHwAIwGHkq32MTkRnZPtgtAhL4VdBjIT8DChQk0zgpMOVusmQzIWsJBHKmFlqZed-MCJhl2TvBzgn8r6SbAeyg2nAupjV1VqWQJbUwAKrgKZsydcTivrg7GxBVY4uSSK4yQVoWRwv6IlbPj8ArWFQQwrcblq27lXWisphkPNt8YO7_hkdVwGOY4e-5TVNrGukrnZ8NAAA08UFtW_ThBr0mpo4HZIdALhEbyNevJMyPpG7vzXjThMb7YoWTimg_y8T6mdXo1g"
};

export const MOCK_USER: User = {
  id: "usr_001",
  name: "Alex Doe",
  avatarUrl: MOCK_IMAGES.user_alex,
  subscriptionTier: "premium",
  email: "alex.doe@example.com"
};

export const MOCK_SONGS: Song[] = [

  {
    id: "sng_002",
    title: "Hysteria",
    artist: "Muse",
    coverUrl: MOCK_IMAGES.song_hysteria,
    plays: 940020,
    duration: 227,
    audioUrl: "https://drive.google.com/uc?export=download&id=14vW-YmWm1sLUJ5QRie4F_w-WiBsSXc5u"
  },
  {
    id: "sng_003",
    title: "Uprising",
    artist: "Muse",
    coverUrl: MOCK_IMAGES.album_hero,
    plays: 2100000,
    duration: 304,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "sng_004",
    title: "Supermassive",
    artist: "Muse",
    coverUrl: MOCK_IMAGES.user_alex,
    plays: 1800000,
    duration: 209,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: "sng_005",
    title: "Time is Running Out",
    artist: "Muse",
    coverUrl: MOCK_IMAGES.song_hysteria,
    plays: 1500000,
    duration: 236,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: "alb_001",
    title: "New Album Release",
    description: "Check out the latest album from your favorite artist.",
    artist: "Muse",
    coverUrl: MOCK_IMAGES.album_hero,
    songIds: ["sng_001", "sng_002", "sng_003", "sng_004", "sng_005"]
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: "pl_001",
    title: "Chill Vibes",
    coverUrl: MOCK_IMAGES.song_starlight,
    songCount: 23,
    userId: "usr_001",
    songIds: ["sng_001"]
  },
  {
    id: "pl_002",
    title: "Workout Beats",
    coverUrl: MOCK_IMAGES.album_hero,
    songCount: 45,
    userId: "usr_001",
    songIds: ["sng_002", "sng_003"]
  },
  {
    id: "pl_003",
    title: "Late Night Focus",
    coverUrl: MOCK_IMAGES.song_hysteria,
    songCount: 18,
    userId: "usr_001",
    songIds: ["sng_005"]
  }
];

export const MOCK_LIBRARY: Library = {
  totalSongs: 12345,
  totalPlaylists: 2500,
  totalArtists: 5000,
  savedSongIds: ["sng_001", "sng_002", "sng_003", "sng_004", "sng_005"],
  savedAlbumIds: ["alb_001"],
  userPlaylistIds: ["pl_001", "pl_002", "pl_003"]
};

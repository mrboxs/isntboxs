interface CurrentlyPlayingResponse {
  currently_playing_type: string
  progress_ms: number
  timestamp: number
  is_playing: boolean
  item: TrackResponseItems
  actions: {
    disallows: {
      pausing?: boolean
    }
  }
}

interface TrackResponseItems {
  duration_ms: number
  album: AlbumResponse
  artists: ArtistResponse[]
  id: string
  name: string
}

interface AlbumResponse {
  name: string
  images: AlbumResponseImage[]
}

interface AlbumResponseImage {
  url: string
  height: number
  width: number
}

interface ArtistResponse {
  id: string
  name: string
}

interface BaseTrack {
  songId: string
  title: string
  album: string
  albumImage: AlbumResponseImage
  artist: SpotifyArtist[]
  songUrl: string
  timestamp: number
  progress_ms: number
  duration_ms: number
  currently_playing_type: string
}

interface SpotifyArtist {
  id: string
  name: string
}

interface CurrentlyPlayingItems extends BaseTrack {
  isPlaying: boolean
}

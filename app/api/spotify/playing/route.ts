import { NextResponse } from "next/server"

import { getNowPlaying } from "@/lib/spotify"

export const revalidate = 30
export async function GET(request: Request) {
  try {
    const response = await getNowPlaying()
    if (response.status === 204) return NextResponse.json({ isPlaying: false })

    const json: CurrentlyPlayingResponse = await response.json()
    const track: CurrentlyPlayingItems = {
      isPlaying: json.is_playing,
      title: json.item.name,
      album: json.item.album.name,
      albumImage: json.item.album.images[0],
      artist: json.item.artists.map((artist) => ({
        name: artist.name,
        id: artist.id,
        url: `https://open.spotify.com/artist/${artist.id}`,
      })),
      songId: json.item.id,
      songUrl: `https://open.spotify.com/track/${json.item.id}`,
      timestamp: json.timestamp,
      progress_ms: json.progress_ms,
      duration_ms: json.item.duration_ms,
      currently_playing_type: json.currently_playing_type,
    }

    return NextResponse.json(track)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

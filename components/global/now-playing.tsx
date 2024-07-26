"use client"

import Image from "next/image"
import Link from "next/link"
import { FaSpotify } from "react-icons/fa"
import useSWR from "swr"

import fetcher from "@/lib/fetcher"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const NowPlayingCard = () => {
  const { data, error } = useSWR<CurrentlyPlayingItems>(
    "/api/spotify/playing",
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30 * 1000,
    }
  )

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <Card className="bg-foreground/5 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>
    )

  return (
    <div>
      {data?.isPlaying ? (
        <Card className="bg-foreground/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Now playing to Spotify
              </CardTitle>
              <CardDescription>
                <FaSpotify className="h-6 w-6 text-[#1DB954]" />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg">
              <Image
                priority
                src={data.albumImage.url}
                alt={data.title}
                width={data.albumImage.width}
                height={data.albumImage.height}
                className="h-full w-full"
              />
            </div>
            <div className="space-y-1">
              <Link
                href={data.songUrl}
                className="line-clamp-1 text-lg font-bold hover:text-[#1DB954] hover:underline hover:decoration-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.title}
              </Link>
              <p className="line-clamp-1 text-sm">
                by{" "}
                {data.artist
                  ?.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`https://open.spotify.com/artist/${artist.id}`}
                      className="font-medium hover:text-[#1DB954] hover:underline hover:decoration-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artist.name}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr] as any)}
              </p>
              <p className="line-clamp-1 text-sm">
                on album{" "}
                <Link
                  href={data.songUrl}
                  className="font-medium hover:text-[#1DB954] hover:underline hover:decoration-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.album}
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                played on{" "}
                <span className="font-medium">
                  {data.currently_playing_type}
                </span>{" "}
                {new Date(data.timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-foreground/5 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Currently not playing music
              </CardTitle>
              <CardDescription>
                <FaSpotify className="h-6 w-6 text-muted-foreground" />
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

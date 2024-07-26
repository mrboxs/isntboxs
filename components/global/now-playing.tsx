"use client"

import Image from "next/image"
import Link from "next/link"
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

export const NowPlayingCard = () => {
  const { data, error } = useSWR<CurrentlyPlayingItems>(
    "/api/spotify/playing",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      {data?.isPlaying ? (
        <Card>
          <CardContent className="flex items-center space-x-4">
            <Image
              priority
              src={data.albumImage.url}
              alt={data.title}
              width={data.albumImage.width}
              height={data.albumImage.height}
              className="h-24 w-24"
            />
            <div className="space-y-1">
              <Link
                href={data.songUrl}
                className="line-clamp-1 text-2xl font-bold hover:text-secondary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.title}
              </Link>
              <p className="line-clamp-1 text-base">
                by{" "}
                {data.artist
                  ?.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`https://open.spotify.com/artist/${artist.id}`}
                      className="font-medium hover:text-secondary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artist.name}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr] as any)}
              </p>
              <p className="line-clamp-1 text-base">
                on Album{" "}
                <Link
                  href={data.songUrl}
                  className="font-medium hover:text-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.album}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(data.timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

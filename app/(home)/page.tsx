import { NowPlayingCard } from "@/components/global/now-playing"

export default function Home() {
  return (
    <main className="container max-w-2xl py-8 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
      <NowPlayingCard />
    </main>
  )
}

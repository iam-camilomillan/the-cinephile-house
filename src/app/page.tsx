/* Next imports */
import NextImage from "next/image";
import NextLink from "next/link";

/* Components imports */
import PlayTrailerButtonClient from "~/app/_components/play-trailer-button-client";
import ContentModule from "~/app/_components/content-module";

/* NextUI imports */
import { Image, Link, ScrollShadow } from "@nextui-org/react";

/* Utils imports */
import { getRandomNumber } from "~/utils/getRandomNumber";

import { getServerAuthSession } from "~/server/auth";

/* API imports */
import { api } from "~/trpc/server";

export default async function Home() {
  /* const session = await getServerAuthSession(); */

  const popularMovies = await api.tmdb.get.query({
    type: "movie",
    header: "popular",
    page: 1,
  });

  const popularTVShows = await api.tmdb.get.query({
    type: "tv",
    header: "popular",
    page: 1,
  });

  const onAirToday = await api.tmdb.get.query({
    type: "tv",
    header: "airing_today",
    page: 1,
  });

  const onAirThisWeek = await api.tmdb.get.query({
    type: "tv",
    header: "on_the_air",
    page: 1,
  });

  const topRatedMovies = await api.tmdb.get.query({
    type: "movie",
    header: "top_rated",
    page: 1,
  });

  const topRatedTVShows = await api.tmdb.get.query({
    type: "tv",
    header: "top_rated",
    page: 1,
  });

  const onTheatres = await api.tmdb.get.query({
    type: "movie",
    header: "now_playing",
    page: 1,
  });

  const comingSoon = await api.tmdb.get.query({
    type: "movie",
    header: "upcoming",
    page: 1,
  });

  const movie = popularMovies[getRandomNumber(0, 20)];

  if (!movie) {
    return null;
  }

  return (
    <main className="pb-8">
      {/* Hero section */}
      <section className="relative">
        {/* Hero background image */}
        <Image
          as={NextImage}
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="Movie hero image"
          width={1920}
          height={1080}
          removeWrapper
          radius="none"
          priority
          className="h-[90vh] w-full object-cover object-center"
        />

        {/* Hero content */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50 px-6">
          <div className="flex h-full max-w-sm flex-col justify-center">
            {/* Movie title */}
            <Link href={`/movies/${movie.id}`} as={NextLink} color="foreground">
              <h2 className="text-4xl font-bold">
                {"title" in movie ? movie.title : null}
              </h2>
            </Link>

            {/* Separator */}
            <div className="h-4" />

            {/* Separator */}
            <div className="h-4" />

            {/* Movie description */}
            <ScrollShadow className="max-h-24 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600">
              <p>{movie.overview}</p>
            </ScrollShadow>

            {/* Separator */}
            <div className="h-8" />

            {/* Content buttons */}
            <div className="flex items-center gap-x-4">
              {/* Play trailer button */}
              <PlayTrailerButtonClient link="" />

              {/* Providers link button */}
              <Link
                href={`/movies/${movie.id}`}
                as={NextLink}
                color="foreground"
              >
                <span>Where to watch?</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="p-8">
        {/* Content module */}
        <ContentModule
          title="Trending"
          options={[
            { key: "one", title: "Movies" },
            { key: "two", title: "TV Shows" },
          ]}
          dataOne={popularMovies}
          dataTwo={popularTVShows}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="On air"
          options={[
            { key: "one", title: "Today" },
            { key: "two", title: "This week" },
          ]}
          dataOne={onAirToday}
          dataTwo={onAirThisWeek}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="Top rated"
          options={[
            { key: "one", title: "Movies" },
            { key: "two", title: "TV Shows" },
          ]}
          dataOne={topRatedMovies}
          dataTwo={topRatedTVShows}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="On theatres"
          options={[{ key: "one", title: "Movies" }]}
          dataOne={onTheatres}
          dataTwo={null}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="Coming soon"
          options={[{ key: "one", title: "Movies" }]}
          dataOne={comingSoon}
          dataTwo={null}
        />
      </section>
    </main>
  );
}

/* async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
} */

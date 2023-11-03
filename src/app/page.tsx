/* Next imports */
import NextImage from "next/image";
import NextLink from "next/link";

/* Components imports */
import PlayTrailerButtonClient from "@/components/play-trailer-button-client";
import ContentModule from "@/components/content-module";

/* NextUI imports */
import { Image, Link, ScrollShadow } from "@nextui-org/react";

/* Types imports */
import { type TMDBMovieRequest, type TMDBTVShowRequest } from "types";

/* Env variables imports */
import { env } from "process";

/* Utils imports */
import { getRandomNumber } from "@/utils/getRandomNumber";

export default async function Home() {
  const popularMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBMovieRequest;

    return data.results;
  });

  const popularTVShows = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
  });

  const onAirToday = await fetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
  });

  const onAirThisWeek = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
  });

  const topRatedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBMovieRequest;

    return data.results;
  });

  const topRatedTVShows = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
  });

  const onTheatres = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
  });

  const comingSoon = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as TMDBTVShowRequest;

    return data.results;
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
          className="h-[90vh] w-full object-cover object-center"
        />

        {/* Hero content */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50 px-6">
          <div className="flex h-full max-w-sm flex-col justify-center">
            {/* Movie title */}
            <Link href={`/movies/${movie.id}`} as={NextLink} color="foreground">
              <h2 className="text-4xl font-bold">{movie.title}</h2>
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

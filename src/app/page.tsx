/* Next imports */
import NextImage from "next/image";
import NextLink from "next/link";

/* NextUI imports */
import { Image, Link, ScrollShadow } from "@nextui-org/react";

/* Components imports */
import PlayTrailerButtonServer from "~/app/_components/play-trailer-button-server";
import ContentModule from "~/app/_components/content-module";

/* Utils imports */
import { randomNumber } from "~/utils/randomNumber";

/* API imports */
import { api } from "~/trpc/server";
import { currentDate } from "~/utils/currentDate";
export default async function Home() {
  const popularMovies = await api.tmdb.discoverMovies.query({});

  const popularTVShows = await api.tmdb.discoverTVShows.query({});

  const onAirToday = await api.tmdb.discoverTVShows.query({
    airDateFrom: currentDate(),
    airDateTo: currentDate(),
  });

  const onAirThisWeek = await api.tmdb.discoverTVShows.query({
    airDateFrom: currentDate(),
    airDateTo: currentDate(0, 0, 7),
  });

  const topRatedMovies = await api.tmdb.discoverMovies.query({
    orderBy: "vote_average.desc",
    voteCountFrom: 200,
  });

  const topRatedTVShows = await api.tmdb.discoverTVShows.query({
    orderBy: "vote_average.desc",
    voteCountFrom: 200,
  });

  const onTheatres = await api.tmdb.discoverMovies.query({
    releaseTypes: ["2", "3"],
    releaseDateFrom: "2023",
  });

  const comingSoon = await api.tmdb.discoverMovies.query({
    releaseTypes: ["1", "2"],
    releaseDateFrom: currentDate(),
  });

  const movie = popularMovies.results[randomNumber(0, 20)];

  if (!movie) {
    return null;
  }

  return (
    <main>
      {/* Hero section */}
      <section className="relative">
        {/* Hero background image */}
        <Image
          as={NextImage}
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="Movie hero image"
          width={1920}
          height={1080}
          priority
          removeWrapper
          radius="none"
          className="h-[90vh] w-full object-cover object-center"
        />

        {/* Hero content */}
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-neutral-950/75 px-6">
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
              <PlayTrailerButtonServer itemId={movie.id} />

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
          options={["Movies", "TV Shows"]}
          dataOne={popularMovies.results}
          dataTwo={popularTVShows.results}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="On air"
          options={["Today", "This week"]}
          dataOne={onAirToday.results}
          dataTwo={onAirThisWeek.results}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="Top rated"
          options={["Movies", "TV Shows"]}
          dataOne={topRatedMovies.results}
          dataTwo={topRatedTVShows.results}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="On theatres"
          options={["Movies"]}
          dataOne={onTheatres.results}
          dataTwo={null}
        />

        {/* Separator */}
        <div className="h-12" />

        {/* Content module */}
        <ContentModule
          title="Coming soon"
          options={["Movies"]}
          dataOne={comingSoon.results}
          dataTwo={null}
        />
      </section>
    </main>
  );
}

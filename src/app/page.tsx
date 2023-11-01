/* Next imports */
import NextImage from "next/image";
import NextLink from "next/link";

/* Components imports */
import PlayTrailerButtonClient from "@/components/play-trailer-button-client";

/* NextUI imports */
import { Image, Link, ScrollShadow } from "@nextui-org/react";

/* Types imports */
import { type Movie } from "types";

/* Env variables imports */
import { env } from "process";

export default async function Home() {
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/575264?api_key=${env.TMDB_API_KEY}&language=en-US`,
  ).then(async (response) => {
    const data = (await response.json()) as Movie;

    return data;
  });

  return (
    <main>
      {/* Hero section */}
      <section className="relative">
        {/* Hero background image */}
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="Movie hero image"
          width={1280}
          height={720}
          as={NextImage}
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
            <ScrollShadow className="max-h-24 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-300">
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
    </main>
  );
}

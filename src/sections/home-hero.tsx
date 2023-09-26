import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Components imports */
import RateButton from "~/components/RateButton";
import AddToButtons from "~/components/add-to-buttons";

/* React spinners imports */
import { ClipLoader } from "react-spinners";

/* Icons imports */
import { FaPlayCircle } from "react-icons/fa";

/* Utils imports */
import { api } from "~/utils/api";

/* Types imports */
import type { Movie } from "types";

const HomeHero = ({ movie }: { movie: Movie }) => {
  const [trailer, setTrailer] = useState<any>(null);

  /* Utils */
  const [isLoading, setIsLoading] = useState(true);

  /* Data fetching */
  const videosRequest = api.tmbd.videos.useQuery({
    categorie: "movie",
    id: movie.id,
  });

  useEffect(() => {
    if (videosRequest.data?.results) {
      for (const video of videosRequest.data?.results) {
        if (video.type == "Trailer") {
          setTrailer(video);
          break;
        }
      }
    }
  }, [videosRequest.data]);

  return movie ? (
    <section className="relative h-screen">
      {/* Background image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie.title}
        fill
        objectFit="cover"
        objectPosition="center"
        onLoadingComplete={() => setIsLoading(false)}
        priority
      />

      {isLoading ? (
        <div className="absolute flex h-full w-full items-center justify-center bg-black/75 px-8">
          <ClipLoader
            color="rgba(220, 38 ,38, 1)"
            loading={true}
            size={256}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}

      <div className="absolute h-full w-full bg-gradient-to-br from-black/75 to-black/25 px-8 text-white">
        {/* Content container */}
        <div className="mx-auto h-full max-w-7xl">
          {/* Left container */}
          <div className="flex h-full max-w-sm flex-col justify-center">
            {/* Movie title */}
            <h1 className="text-5xl font-bold">{movie.title}</h1>

            {/* Separator */}
            <div className="h-4" />

            {/* Rating and options */}
            <div className="flex items-center gap-x-4">
              {/* Rating */}
              <div className="flex items-center gap-1 rounded-md bg-black/75 px-2 py-1">
                <RateButton movie={movie} />
              </div>

              {/* Add to buttons */}
              <div className="flex h-full items-center gap-2 rounded-md bg-black/75 px-2 py-1 text-xl">
                <AddToButtons id={movie.id} />
              </div>
            </div>

            {/* Separator */}
            <div className="h-2" />

            {/* Movie description */}
            <p className="max-h-24 overflow-y-scroll rounded-md bg-black/75 px-2 py-1 text-white/80 scrollbar-thin scrollbar-thumb-white/10">
              {movie.overview}
            </p>

            {/* Separator */}
            <div className="h-8" />

            {/* Play trailer and where to watch */}
            <div className="flex items-center gap-2">
              {/* Play trailer */}
              <a
                href={`https://www.youtube.com/watch?v=${trailer?.key}`}
                target="_blank"
                className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-lg transition-colors duration-200 ease-in-out hover:bg-red-500"
              >
                <FaPlayCircle className="text-xl" />
                Play trailer
              </a>

              {/* Where to watch container */}
              <Link
                href={`/movies/${movie.id}`}
                className="px-2 py-1 text-white/80 transition-colors duration-200 ease-in-out hover:text-white"
              >
                Where to watch?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default HomeHero;

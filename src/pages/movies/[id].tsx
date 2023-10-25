import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { Movie } from "types";
import { ClipLoader } from "react-spinners";
import RateButton from "~/components/rate-button";
import AddToButtons from "~/components/add-to-buttons";
import { FaPlayCircle } from "react-icons/fa";
import Link from "next/link";
import PlayTrailerButton from "~/components/play-trailer-button";

const Movie = () => {
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoadingBackgroundImage, setIsLoadingBackgroundImage] =
    useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const request = api.tmbd.fetchTMDB.useQuery({
    categorie: "movie",
    header: `${router.query.id}`,
  });

  useEffect(() => {
    if (request.data) {
      setMovie(request.data);
    }
  }, [request]);

  return movie ? (
    <section className="px-8 pb-8 pt-24">
      {/* Background image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie.title}
        fill
        objectFit="cover"
        objectPosition="center"
        onLoadingComplete={() => setIsLoadingBackgroundImage(false)}
        priority
      />

      {isLoadingBackgroundImage ? (
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

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row">
          {/* Image */}
          <div className="relative w-full max-w-xs overflow-hidden rounded-md">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              width={700}
              height={400}
              onLoadingComplete={() => setIsLoadingImage(false)}
            />

            {isLoadingImage ? (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/75">
                <ClipLoader
                  color="rgba(220, 38 ,38, 1)"
                  loading={true}
                  size={128}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : null}
          </div>

          {/* Information */}
          <div>
            <h3 className="text-2xl font-bold">
              {movie.title}{" "}
              <span className="text-base opacity-80">
                &#40;{movie.runtime} min&#41;
              </span>
            </h3>

            <p className="font-medium opacity-80">
              Release date:{" "}
              <span className="font-normal">{`${movie.release_date}`}</span>
            </p>
            <p className="font-medium opacity-80">
              Genres:{" "}
              {movie.genres.map((genre, index) => (
                <span key={index} className="font-normal">
                  {index !== 0 ? ", " : ""}
                  {genre.name}
                </span>
              ))}
              .
            </p>

            <div className="h-4" />

            {/* Rating and options */}
            <div className="flex items-center gap-x-4 text-white">
              {/* Rating */}
              <div className="flex items-center gap-1 rounded-md bg-clr-one px-2 py-1">
                <RateButton movie={movie} />
              </div>

              {/* Add to buttons */}
              <div className="flex h-full items-center gap-2 rounded-md bg-clr-one px-2 py-1 text-xl">
                <AddToButtons id={movie.id} />
              </div>
            </div>

            <div className="h-4" />

            <p className="italic opacity-80">"{movie.tagline}"</p>

            <div className="h-4" />

            <p>{movie.overview}</p>

            <div className="h-4" />

            {/* Play trailer and where to watch */}
            <div className="flex items-center gap-2 text-white">
              {/* Play trailer */}
              <PlayTrailerButton id={movie.id} />

              {/* Where to watch container */}
              <Link
                href={`/movies/${movie.id}`}
                className="px-2 py-1 text-black transition-colors duration-200 ease-in-out"
              >
                Where to watch?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading</div>
  );
};

export default Movie;

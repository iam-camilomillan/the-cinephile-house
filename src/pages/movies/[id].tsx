import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import { Movie } from "types";
import { ClipLoader } from "react-spinners";

const Movie = () => {
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>();
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

  console.log(movie);

  return movie ? (
    <section className="px-8 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-x-8 gap-y-4 lg:flex-row">
          {/* Image */}
          <div className="relative max-w-xs overflow-hidden rounded-md">
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
            <h3 className="text-2xl font-medium">{movie.title}</h3>

            <p className="italic opacity-80">"{movie.tagline}"</p>

            <p>
              Genres:{" "}
              {movie.genres.map((genre, index) => (
                <span key={index}>
                  {index !== 0 ? ", " : ""}
                  {genre.name}
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading</div>
  );
};

export default Movie;

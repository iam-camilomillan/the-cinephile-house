"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Pagination } from "@nextui-org/react";

/* Components imports */
import MoviesFilterClient from "../_components/movies-filter-client";
import CardClient from "../_components/card-client";

/* API imports */
import { api } from "~/trpc/react";

/* Types imports */
import type { Genre } from "types";

export default function PageClient({ genresList }: { genresList: Genre[] }) {
  const [page, setPage] = useState(1);

  const [filterOptions, setFilterOptions] = useState({
    genres: [""],
    ratingFrom: 5,
    ratingTo: 10,
    voteCountFrom: 0,
    voteCountTo: 50000,
    releaseDateFrom: 2000,
    releaseDateTo: 2024,
  });

  const movies = api.tmdb.getFilter.useQuery({
    type: "movie",
    page,
    ...filterOptions,
  });

  return (
    <main className="py-8">
      <section className="mx-auto max-w-7xl px-6">
        <MoviesFilterClient
          setFilterOptions={setFilterOptions}
          genresList={genresList}
        />
      </section>

      {/* Separator */}
      <div className="h-8" />

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.data?.results
            ? movies.data.results.map((movie) => (
                <CardClient key={movie.id} data={movie} />
              ))
            : "Loading..."}
        </div>

        {/* Separator */}
        <div className="h-8" />

        <Pagination
          isCompact
          showControls
          total={movies.data?.total_pages ?? 1}
          initialPage={1}
          onChange={setPage}
          classNames={{
            base: "w-full flex justify-center mx-0",
            item: "bg-neutral-900",
            prev: "bg-neutral-900",
            next: "bg-neutral-900",
          }}
        />
      </section>
    </main>
  );
}

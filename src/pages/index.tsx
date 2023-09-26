import { useEffect, useState } from "react";
import Head from "next/head";

/* Sections imports */
import Hero from "~/sections/Home/home-hero";
import Content from "~/sections/Home/home-content";

/* Components imports */
import LoadingScreen from "~/components/loading-screen";

/* Utils */
import getRandonNumber from "~/utils/getRandomNumber";
import { api } from "~/utils/api";

/* Types imports */
import type { Movie } from "types";

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  /* Data fetching */
  const moviesRequest = api.tmbd.fetchTMDB.useQuery({
    categorie: "movie",
    header: "popular",
  });

  useEffect(() => {
    /* Sets a random movie to show in hero when the popular movier are fetched */
    if (moviesRequest.data?.results) {
      const randomIndex = getRandonNumber(0, 20);
      setRandomMovie(moviesRequest.data.results[randomIndex]);
    }
  }, [moviesRequest.data]);

  return (
    <>
      <Head>
        <title>The Cinephile House</title>
        <meta
          name="description"
          content="Discover movies and shows, rate and add them to lists."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {randomMovie ? (
        <>
          {/* Hero */}
          <Hero movie={randomMovie} />

          {/* Separator */}
          <div className="h-8" />

          {/* Content */}
          <Content />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

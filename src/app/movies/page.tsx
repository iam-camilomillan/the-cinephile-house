/* Components imports */
import PageClient from "./page-client";

/* API imports */
import { api } from "~/trpc/server";

export default async function Page() {
  /* Gets item genres */
  const genres = await api.tmdb.genres.query({ type: "movie" });

  return <PageClient genresList={genres} />;
}

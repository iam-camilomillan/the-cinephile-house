import PageClient from "./page-client";

/* API imports */
import { api } from "~/trpc/server";

export default async function Page() {
  const genres = await api.tmdb.getGenres.query({ type: "tv" });

  return <PageClient genresList={genres} />;
}

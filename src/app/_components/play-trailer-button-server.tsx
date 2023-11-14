/* Components imports */
import PlayTrailerButtonClient from "./play-trailer-button-client";

/* API imports */
import { api } from "~/trpc/server";

export default async function PlayTrailerButtonServer({
  itemId,
}: {
  itemId: number;
}) {
  const trailer = await api.tmdb.getTrailer.query({ type: "movie", itemId });

  const trailerLink = `https://www.youtube.com/embed/${trailer?.key}`;

  return <PlayTrailerButtonClient trailerLink={trailerLink} />;
}

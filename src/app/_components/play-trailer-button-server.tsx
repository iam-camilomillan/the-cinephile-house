/* Components imports */
import { filterVideos } from "~/utils/filterVideos";
import PlayTrailerButtonClient from "~/app/_components/play-trailer-button-client";

/* API imports */
import { api } from "~/trpc/server";

export default async function PlayTrailerButtonServer({
  itemId,
}: {
  itemId: number;
}) {
  /* Gets related videos of the item */
  const videos = await api.tmdb.videos.query({ type: "movie", itemId });

  /* Filter videos and get only trailers in youtube */
  const trailerVideos = filterVideos(videos.results, "YouTube", "Trailer");

  const trailer = trailerVideos[0];

  const trailerLink = `https://www.youtube.com/embed/${trailer?.key}`;

  return <PlayTrailerButtonClient trailerLink={trailerLink} />;
}

/* Types imports */
import { type VideoResult } from "types";

export function filterVideos(
  videos: VideoResult[],
  site: "YouTube",
  type: "Trailer",
) {
  const filteredVideos = videos.filter(
    (video) => video.site === site && video.type === type,
  );

  return filteredVideos;
}

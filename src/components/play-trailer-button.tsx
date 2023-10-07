import { useEffect, useState } from "react";

/* Icons imports */
import { FaPlayCircle } from "react-icons/fa";
import { Trailer } from "types";

/* Utils imports */
import { api } from "~/utils/api";

const PlayTrailerButton = ({ id }: { id: number }) => {
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  /* Data fetching */
  const request = api.tmbd.videos.useQuery({
    categorie: "movie",
    id,
  });

  useEffect(() => {
    if (request.data?.results) {
      for (const video of request.data?.results) {
        if (video.type == "Trailer") {
          setTrailer(video);
          break;
        }
      }
    }
  }, [request]);

  return (
    <a
      href={`https://www.youtube.com/watch?v=${trailer?.key}`}
      target="_blank"
      className="flex items-center gap-1 rounded-md bg-clr-one px-2 py-1 text-lg transition-colors duration-200 ease-in-out hover:bg-clr-one/90"
    >
      <FaPlayCircle className="text-xl" />
      Play trailer
    </a>
  );
};

export default PlayTrailerButton;

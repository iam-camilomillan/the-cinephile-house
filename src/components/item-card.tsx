import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Component imports */
import AddToButtons from "~/components/add-to-buttons";

/* Util imports */
import { ClipLoader } from "react-spinners";

const ItemCard = ({ data }: any) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [data]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative flex w-40 flex-shrink-0 flex-col rounded-md transition-transform duration-200 ease-in-out hover:scale-105"
    >
      {/* Buttons options */}
      <div
        className={`absolute right-2 top-2 z-10 flex gap-2 rounded-md bg-red-600 px-2 py-1 text-lg text-white ${
          isHovering ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 ease-in-out`}
      >
        <AddToButtons id={data.id} />
      </div>

      {/* Image and image loader */}
      <Link
        href={`/movies/${data.id}`}
        className="relative h-60 overflow-hidden rounded-md border border-black/25"
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title ?? data.name}
          width={700}
          height={400}
          onLoadingComplete={() => setIsLoading(false)}
        />
        {isLoading ? (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white">
            <ClipLoader
              color="rgba(220, 38 ,38, 1)"
              loading={true}
              size={128}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : null}
        |
      </Link>

      <div className="h-2" />

      {/* Title */}
      <Link
        href={`/movies/${data.id}`}
        className="whitespace-break-spaces font-medium hover:text-red-600"
      >
        {data.title ?? data.name}
      </Link>

      {/* Release date */}
      <p className="text-sm text-black/80">
        {data.release_date ?? data.first_air_date}
      </p>
    </div>
  );
};

export default ItemCard;

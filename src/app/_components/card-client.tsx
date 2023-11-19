/* React imports */
import { useState } from "react";

/* Next imports */
import NextImage from "next/image";
import { useRouter } from "next/navigation";

/* NextUI imports */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

/* Components imports */
import AddToButtonsClient from "~/app/_components/add-to-buttons-client";

/* Icons imports */
import { IconStarFilled } from "@tabler/icons-react";

/* Types imports */
import { type DiscoverMovieResult, type DiscoverTVShowResult } from "types";

export default function CardClient({
  data,
}: {
  data: DiscoverMovieResult | DiscoverTVShowResult;
}) {
  /* Hovering on card state */
  const [isHovering, setIsHovering] = useState(false);

  /* Router definition */
  const router = useRouter();

  return (
    <Card
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onPress={() =>
        router.push(`/${"title" in data ? "movies" : "tv-shows"}/${data.id}`)
      }
      className="max-w-[128px] flex-shrink-0 bg-neutral-800 hover:scale-105 sm:max-w-[160px]"
    >
      {/* Card options */}
      <CardHeader
        className={`absolute top-0 z-20 flex justify-between ${
          isHovering ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 ease-in-out`}
      >
        {/* Rating*/}
        <Button
          aria-label="Rating"
          color="primary"
          size="sm"
          startContent={<IconStarFilled size={20} />}
          className="hover:bg-primary-200 hover:opacity-100"
        >
          <span className="text-base font-bold">
            {data.vote_average.toPrecision(2)}
          </span>
        </Button>

        {/* Add to list dropdown */}
        <AddToButtonsClient
          itemId={data.id}
          type={"title" in data ? "movie" : "tv"}
        />
      </CardHeader>

      {/* Card image */}
      <CardBody className="overflow-visible p-0">
        <Image
          as={NextImage}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={"title" in data ? data.title : data.name}
          width={160}
          height={240}
          quality={50}
          radius="lg"
          className="h-48 w-full object-cover object-center xs:h-60"
        />
      </CardBody>

      {/* Card content */}
      <CardFooter className="flex-grow items-start">
        {/* Card title */}
        <b className="text-xs xs:text-sm">
          {"title" in data ? data.title : data.name}
        </b>
      </CardFooter>
    </Card>
  );
}

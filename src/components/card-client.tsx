"use client";

/* Next imports */
import NextImage from "next/image";
import { useRouter } from "next/navigation";

/* NextUI imports */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";

/* Types imports */
import { type Movie, type TVShow } from "types";
import { IconBookmark, IconClock, IconHeart } from "@tabler/icons-react";
import { useState } from "react";

export default function CardClient({ data }: { data: Movie | TVShow }) {
  /* Hovering on card state */
  const [isHovering, setIsHovering] = useState(false);

  /* Router definition */
  const router = useRouter();

  /* Handle add to */
  const handleAddTo = (listId: string) => {
    console.log(listId);
  };

  return (
    <Card
      isPressable
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onPress={() =>
        router.push(`/${"title" in data ? "movies" : "tv-shows"}/${data.id}`)
      }
      className="w-32 flex-shrink-0 bg-neutral-900 hover:scale-105 xs:w-40"
    >
      {/* Card options */}
      <CardHeader
        className={`absolute top-0 z-20 flex justify-end ${
          isHovering ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200 ease-in-out`}
      >
        <ButtonGroup color="primary" size="sm">
          {/* Favorites button */}
          <Button
            onPress={() => handleAddTo("001")}
            isIconOnly
            aria-label="Add to favorites"
            className="hover:bg-secondary"
          >
            <IconHeart />
          </Button>

          {/* Watch later button */}
          <Button
            onPress={() => handleAddTo("002")}
            isIconOnly
            aria-label="Add to watch later"
            className="hover:bg-secondary"
          >
            <IconClock />
          </Button>

          {/* Bookmark button */}
          <Button
            onPress={() => handleAddTo("003")}
            isIconOnly
            aria-label="Add to bookmarks"
            className="hover:bg-secondary"
          >
            <IconBookmark />
          </Button>
        </ButtonGroup>
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

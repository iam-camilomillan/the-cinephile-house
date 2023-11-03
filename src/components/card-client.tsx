"use client";

/* Next imports */
import NextImage from "next/image";
import { useRouter } from "next/navigation";

/* NextUI imports */
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

/* Types imports */
import { type Movie, type TVShow } from "types";

export default function CardClient({ data }: { data: Movie | TVShow }) {
  /* Router definition */
  const router = useRouter();

  return (
    <Card
      isPressable
      onPress={() =>
        router.push(`/${"title" in data ? "movies" : "tv-shows"}/${data.id}`)
      }
      className="w-32 flex-shrink-0 bg-neutral-900 hover:scale-105 xs:w-40"
    >
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

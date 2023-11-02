"use client";

/* NextUI imports */
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

/* Types imports */
import { type Movie } from "types";

/* Router imports */
import { useRouter } from "next/navigation";

export default function CardClient({ data }: { data: Movie }) {
  /* Router definition */
  const router = useRouter();

  return (
    <Card
      isPressable
      onPress={() => router.push(`/movies/${data.id}`)}
      className="w-32 flex-shrink-0 hover:scale-105 xs:w-40"
    >
      {/* Card image */}
      <CardBody className="overflow-visible p-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title}
          width="100%"
          radius="lg"
          className="h-48 w-full object-cover object-center xs:h-56"
        />
      </CardBody>

      {/* Card content */}
      <CardFooter className="flex-grow items-start">
        {/* Card title */}
        <b className="text-xs xs:text-sm">{data.title}</b>
      </CardFooter>
    </Card>
  );
}

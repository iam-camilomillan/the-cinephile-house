"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Autocomplete, AutocompleteItem, Chip, Image } from "@nextui-org/react";

/* API imports */
import { api } from "~/trpc/react";
import { IconStarFilled } from "@tabler/icons-react";

export default function SearchBarClient() {
  /* Search state */
  const [searchInputValue, setSearchInputValue] = useState("");

  /* Search request */
  const searchResults = api.tmdb.search.useQuery({ query: searchInputValue });

  return (
    <Autocomplete
      items={searchResults.data ?? []}
      isLoading={searchResults.isLoading}
      placeholder="Type to search..."
      onInputChange={setSearchInputValue}
    >
      {(item) => (
        <AutocompleteItem
          key={item.id}
          href={`/${item.media_type === "movie" ? "movies" : "tv-shows"}/${
            item.id
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt="Movie hero image"
                width={48}
                height={96}
                removeWrapper
                radius="sm"
                className="object-cover object-center"
              />

              <div className="flex flex-col">
                <h4 className="flex items-center gap-1 text-small">
                  <span>{"title" in item ? item.title : item.name}</span>

                  <Chip
                    size="sm"
                    color="primary"
                    classNames={{ content: "text-neutral-50" }}
                    startContent={<IconStarFilled size={16} />}
                  >
                    {item.vote_average}
                  </Chip>
                </h4>

                <span className="text-slate-50 text-opacity-50">
                  {"release_date" in item
                    ? item.release_date
                    : item.first_air_date}
                </span>
              </div>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

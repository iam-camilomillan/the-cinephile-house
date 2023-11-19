/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Autocomplete, AutocompleteItem, Chip, Image } from "@nextui-org/react";

/* API imports */
import { api } from "~/trpc/react";

/* Icons imports */
import { IconSearch, IconStarFilled } from "@tabler/icons-react";

export default function SearchBarClient() {
  /* Search state */
  const [searchInputValue, setSearchInputValue] = useState("");

  /* Search request */
  const searchResults = api.tmdb.search.useQuery({
    query: searchInputValue,
  });

  return (
    <Autocomplete
      placeholder="Search..."
      onInputChange={setSearchInputValue}
      items={searchResults.data ?? []}
      isLoading={searchResults.isLoading}
      startContent={<IconSearch />}
      inputProps={{
        classNames: {
          mainWrapper: "flex items-center",
          inputWrapper: "h-10",
        },
      }}
      aria-label="Search..."
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
                    color="primary"
                    size="sm"
                    startContent={<IconStarFilled size={16} />}
                  >
                    {item.vote_average}
                  </Chip>
                </h4>

                <span className="opacity-50">
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

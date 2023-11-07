"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import {
  Accordion,
  AccordionItem,
  Button,
  CheckboxGroup,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";

/* Components imports */
import CustomCheckboxClient from "~/app/_components/custom-checkbox-client";

/* Icons imports */
import {
  IconFilter,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

/* Type imports */
import type { Dispatch, SetStateAction } from "react";
import type { Genre } from "types";

/* Filter options type */
interface FilterOptions {
  genres: string[];
  ratingFrom: number;
  ratingTo: number;
  voteCountFrom: number;
  voteCountTo: number;
  releaseDateFrom: number;
  releaseDateTo: number;
  orderBy: string;
}

export default function DiscoverFilterClient({
  setFilterOptions,
  genresList,
}: {
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
  genresList: Genre[];
}) {
  /* Filter states */
  const [genres, setGenres] = useState([""]);
  const [rating, setRating] = useState([5, 10]);
  const [votes, setVotes] = useState([0, 50000]);
  const [year, setYear] = useState([2000, 2024]);
  const [orderBy, setOrderBy] = useState("popularity.desc");

  /* Handle the clear filter button */
  const handleClearFilters = () => {
    /* Set the local filter states */
    setGenres([""]);
    setRating([5, 10]);
    setVotes([0, 50000]);
    setYear([2000, 2024]);
    setOrderBy("popularity.desc");

    /* Set the filter state that is being fetched */
    setFilterOptions({
      genres,
      ratingFrom: 5,
      ratingTo: 10,
      voteCountFrom: 0,
      voteCountTo: 50000,
      releaseDateFrom: 2000,
      releaseDateTo: 2024,
      orderBy: "popularity.desc",
    });
  };

  /* Handles the apply filter button */
  const handleApplyFilters = () => {
    /* Set the filter state that is being fetched */
    setFilterOptions({
      genres,
      ratingFrom: rating[0] ?? 5,
      ratingTo: rating[1] ?? 10,
      voteCountFrom: votes[0] ?? 0,
      voteCountTo: votes[1] ?? 50000,
      releaseDateFrom: year[0] ?? 2000,
      releaseDateTo: year[1] ?? 2024,
      orderBy,
    });
  };

  return (
    <Accordion isCompact fullWidth className="px-0">
      <AccordionItem
        aria-label="Filters"
        title="Filters"
        startContent={<IconFilter />}
        classNames={{
          title: "font-bold ",
          content: "overflow-hidden p-2",
        }}
        className="rounded-lg bg-neutral-900 p-2"
      >
        {/* Select for genres */}
        <CheckboxGroup
          className="gap-1"
          label="Select genre:"
          orientation="horizontal"
          value={genres}
          onChange={setGenres}
          classNames={{ label: "text-sm font-bold text-neutral-300" }}
        >
          {genresList.map((genre) => (
            <CustomCheckboxClient key={genre.id} value={`${genre.id}`}>
              {genre.name}
            </CustomCheckboxClient>
          ))}
        </CheckboxGroup>

        {/* Separator */}
        <div className="h-4" />

        <Slider
          label="Rating:"
          minValue={0}
          maxValue={10}
          step={0.1}
          showTooltip
          value={rating}
          onChange={setRating}
          classNames={{ label: "text-sm font-bold text-neutral-300" }}
        />

        {/* Separator */}
        <div className="h-4" />

        {/* Slider for vote count */}
        <Slider
          label="Number of votes:"
          minValue={0}
          maxValue={50000}
          step={100}
          showTooltip
          value={votes}
          onChange={setVotes}
          classNames={{ label: "text-sm font-bold text-neutral-300" }}
        />

        {/* Separator */}
        <div className="h-4" />

        {/* Slider for release year */}
        <Slider
          label="Release year:"
          minValue={1894}
          maxValue={2024}
          showTooltip
          value={year}
          onChange={setYear}
          classNames={{ label: "text-sm font-bold text-neutral-300" }}
        />

        {/* Separator */}
        <div className="h-4" />

        {/* Order by */}
        <Select
          labelPlacement="outside"
          label="Order by:"
          placeholder="Select an order:"
          selectedKeys={[orderBy]}
          onChange={(event) => setOrderBy(event.target.value)}
          className="max-w-xs"
        >
          {/* Popularity */}
          <SelectItem
            key="popularity.desc"
            value="popularity.desc"
            startContent={<IconSortDescending />}
          >
            Popularity descending
          </SelectItem>

          <SelectItem
            key="popularity.asc"
            value="popularity.asc"
            startContent={<IconSortAscending />}
          >
            Popularity ascending
          </SelectItem>

          {/* Rating */}
          <SelectItem
            key="vote_average.desc"
            value="vote_average.desc"
            startContent={<IconSortDescending />}
          >
            Rating descending
          </SelectItem>

          <SelectItem
            key="vote_average.asc"
            value="vote_average.asc"
            startContent={<IconSortAscending />}
          >
            Rating ascending
          </SelectItem>

          {/* Votes count */}
          <SelectItem
            key="vote_count.desc"
            value="vote_count.desc"
            startContent={<IconSortDescending />}
          >
            Votes count descending
          </SelectItem>

          <SelectItem
            key="vote_count.asc"
            value="vote_count.asc"
            startContent={<IconSortAscending />}
          >
            Votes count ascending
          </SelectItem>

          {/* Release date */}
          <SelectItem
            key="primary_release_date.desc"
            value="primary_release_date.desc"
            startContent={<IconSortDescending />}
          >
            Release date descending
          </SelectItem>

          <SelectItem
            key="primary_release_date.asc"
            value="primary_release_date.asc"
            startContent={<IconSortAscending />}
          >
            Release date ascending
          </SelectItem>
        </Select>

        {/* Separator */}
        <div className="h-4" />

        {/* Filters buttons */}
        <div className="flex justify-end gap-x-2">
          <Button onPress={handleClearFilters}>Clear filters</Button>

          <Button onPress={handleApplyFilters} color="primary">
            Apply filters
          </Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
}

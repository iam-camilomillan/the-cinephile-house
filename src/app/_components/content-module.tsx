"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Tab, Tabs } from "@nextui-org/react";

/* Components imports */
import SliderClient from "~/app/_components/slider-client";

/* Types imports */
import { type Key } from "react";
import { type DiscoverMovieResult, type DiscoverTVShowResult } from "types";

interface Props {
  title: string;
  options: Key[];
  dataOne: DiscoverMovieResult[] | DiscoverTVShowResult[];
  dataTwo: DiscoverMovieResult[] | DiscoverTVShowResult[] | null;
}

export default function ContentModule({
  title,
  options,
  dataOne,
  dataTwo,
}: Props) {
  const [selected, setSelected] = useState<Key | null>(options[0] ?? null);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Module header */}
      <div className="flex items-center gap-4">
        {/* Module title */}
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Options */}
        <Tabs
          selectedKey={selected?.toString()}
          onSelectionChange={setSelected}
          aria-label="Options"
          color="primary"
          radius="full"
        >
          {options.map((option) => (
            <Tab key={option} title={option.toString()} />
          ))}
        </Tabs>
      </div>

      {/* Separator */}
      <div className="h-2" />

      {/* Slider */}
      {selected === options[0] ? (
        <SliderClient data={dataOne} />
      ) : dataTwo ? (
        <SliderClient data={dataTwo} />
      ) : null}
    </div>
  );
}

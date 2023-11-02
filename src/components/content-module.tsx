"use client";

/* React imports */
import { useState } from "react";

/* NextUI imports */
import { Tab, Tabs } from "@nextui-org/react";

/* Types imports */
import { type Movie, type TVShow } from "types";
import SliderClient from "./slider-client";
import { type Key } from "react";

interface Option {
  key: string;
  title: string;
}

interface Props {
  title: string;
  options: Option[];
  dataOne: Movie[] | TVShow[];
  dataTwo: Movie[] | TVShow[] | null;
}

export default function ContentModule({
  title,
  options,
  dataOne,
  dataTwo,
}: Props) {
  const [currentOption, setCurrentOption] = useState<Key | null>(
    options[0]?.key ?? null,
  );

  return (
    <div className="mx-auto max-w-7xl">
      {/* Module header */}
      <div className="flex items-center gap-4">
        {/* Module title */}
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Options */}
        <Tabs
          selectedKey={currentOption}
          onSelectionChange={setCurrentOption}
          aria-label="Options"
          color="primary"
          radius="full"
          classNames={{ tabList: "bg-neutral-900" }}
        >
          {options.map((option) => (
            <Tab key={option.key} title={option.title} />
          ))}
        </Tabs>
      </div>

      {/* Separator */}
      <div className="h-2" />

      {/* Slider */}
      {currentOption === "one" ? (
        <SliderClient data={dataOne} />
      ) : dataTwo ? (
        <SliderClient data={dataTwo} />
      ) : null}
    </div>
  );
}

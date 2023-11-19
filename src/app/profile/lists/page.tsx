"use client";

/* React imports */
import { useEffect, useState } from "react";

/* NextUI imports */
import { Spinner, Tab, Tabs } from "@nextui-org/react";

/* Components imports */
import CardClient from "~/app/_components/card-client";

/* API imports */
import { api } from "~/trpc/react";

/* Types imports */
import type { Key } from "react";

/* UNCHECKED */

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<Key>("inFavorites");
  const [list, setList] = useState<
    "inFavorites" | "inWatchLater" | "inBookmarks"
  >("inFavorites");

  /* const items = api.data.getItem.useQuery({ list }); */
  const items = [];

  useEffect(() => {
    if (selectedTab === "inFavorites") {
      setList("inFavorites");
    }
    if (selectedTab === "inWatchLater") {
      setList("inWatchLater");
    }
    if (selectedTab === "inBookmarks") {
      setList("inBookmarks");
    }
  }, [selectedTab]);

  return (
    <main className="py-8">
      <section className="mx-auto max-w-7xl px-8">
        <header className="flex justify-center">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            color="primary"
            aria-label="Lists tabs"
            radius="full"
          >
            <Tab key="inFavorites" title="Favorites" />
            <Tab key="inWatchLater" title="Watch Later" />
            <Tab key="inBookmarks" title="Bookmarks" />
          </Tabs>
        </header>

        <div className="h-8" />

        <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.data ? (
            items.data.map((item) => <CardClient key={item.id} data={item} />)
          ) : (
            <div className="col-span-full flex h-64 items-center justify-center rounded-lg bg-neutral-900">
              <Spinner color="primary" size="lg" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

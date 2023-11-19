/* React imports */
import { useEffect, useState } from "react";

/* API imports */
import { api } from "~/trpc/react";

/* NextUI imports */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";

/* Icons imports */
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClock,
  IconClockFilled,
  IconHeart,
  IconHeartFilled,
  IconTextPlus,
} from "@tabler/icons-react";

export default function AddToButtonsClient({
  itemId,
  type,
}: {
  itemId: number;
  type: "movie" | "tv";
}) {
  /* States for inList */
  const [onLists, setOnLists] = useState<string[]>([]);

  /* Get item data from database */
  const item = api.data.getItem.useQuery({ tmdbId: itemId });

  /* Add to mutation */
  const addToList = api.data.addToList.useMutation({
    onSuccess: (data) => {
      setOnLists((prev) => [...prev, data.id]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  /* Add to handler */
  const handleAddTo = (listId: string) => {
    const listTitle =
      listId === "001"
        ? "Favorites"
        : listId === "002"
          ? "Watch later"
          : listId === "003"
            ? "Bookmarks"
            : "New list";

    addToList.mutate({
      listId,
      listTitle,
      listEditable: false,
      itemId: item.data?.id ?? "",
      tmdbId: itemId,
      type,
    });
  };

  useEffect(() => {
    if (item.data?.lists) {
      item.data.lists.map((list) => {
        setOnLists((prev) => [...prev, list.id]);
      });
    }
  }, [item.data]);

  return (
    <Dropdown
      closeOnSelect={false}
      classNames={{ content: "bg-primary text-neutral-50" }}
    >
      <DropdownTrigger>
        <Button size="sm" color="primary" isIconOnly>
          <IconTextPlus />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        onAction={(key) => handleAddTo(key.toString())}
        aria-label="Add to list"
      >
        <DropdownItem
          key="001"
          startContent={
            onLists.includes("001") ? <IconHeartFilled /> : <IconHeart />
          }
          classNames={{ base: "hover:bg-red-900" }}
        >
          Add to Favorites
        </DropdownItem>

        <DropdownItem
          key="002"
          startContent={
            onLists.includes("002") ? <IconClockFilled /> : <IconClock />
          }
        >
          Add to Watch Later
        </DropdownItem>

        <DropdownItem
          key="003"
          startContent={
            onLists.includes("003") ? <IconBookmarkFilled /> : <IconBookmark />
          }
        >
          Add to Bookmarks
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

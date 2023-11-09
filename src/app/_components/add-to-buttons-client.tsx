"use client";

/* React imports */
import { useEffect, useState } from "react";

/* NextUI imports */
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";

/* API imports */
import { api } from "~/trpc/react";

/* Icons imports */
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClock,
  IconClockFilled,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";
import { IconTextPlus } from "@tabler/icons-react";

export default function AddToButtonsClient({ itemId }: { itemId: number }) {
  /* States for inList */
  const [inFavorites, setInFavorites] = useState(false);
  const [inWatchLater, setInWatchLater] = useState(false);
  const [inBookmarks, setInBookmarks] = useState(false);

  /* Get item data from database */
  const item = api.item.getItem.useQuery({ tmdbId: itemId });

  /* Handle add to */
  const addToFavorites = api.item.addToFavorites.useMutation({
    onSuccess: (data) => {
      setInFavorites(data.inFavorites ?? false);
    },
  });

  const addToWatchLater = api.item.addToWatchLater.useMutation({
    onSuccess: (data) => {
      setInWatchLater(data.inWatchLater ?? false);
    },
  });

  const addToBookmarks = api.item.addToBookmarks.useMutation({
    onSuccess: (data) => {
      setInBookmarks(data.inBookmarks ?? false);
    },
  });

  const handleAddTo = (list: string) => {
    if (list === "001") {
      addToFavorites.mutate({ tmdbId: itemId, inFavorites: !inFavorites });
    }

    if (list === "002") {
      addToWatchLater.mutate({ tmdbId: itemId, inWatchLater: !inWatchLater });
    }

    if (list === "003") {
      addToBookmarks.mutate({ tmdbId: itemId, inBookmarks: !inBookmarks });
    }
  };

  /* Change the inList state when item retrieved from database */
  useEffect(() => {
    if (item.data) {
      if (item.data.inFavorites) {
        setInFavorites(true);
      }
      if (item.data.inWatchLater) {
        setInWatchLater(true);
      }
      if (item.data.inBookmarks) {
        setInBookmarks(true);
      }
    }
  }, [item.data]);

  return (
    <Dropdown classNames={{ content: "bg-primary text-neutral-50" }}>
      <DropdownTrigger>
        <Button
          size="sm"
          color="primary"
          isIconOnly
          className="hover:bg-secondary hover:opacity-100"
        >
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
            addToFavorites.isLoading ? (
              <Spinner size="sm" color="white" />
            ) : inFavorites ? (
              <IconHeartFilled />
            ) : (
              <IconHeart />
            )
          }
        >
          Add to Favorites
        </DropdownItem>

        <DropdownItem
          key="002"
          startContent={
            addToWatchLater.isLoading ? (
              <Spinner size="sm" color="white" />
            ) : inWatchLater ? (
              <IconClockFilled />
            ) : (
              <IconClock />
            )
          }
        >
          Add to Watch Later
        </DropdownItem>

        <DropdownItem
          key="003"
          startContent={
            addToBookmarks.isLoading ? (
              <Spinner size="sm" color="white" />
            ) : inBookmarks ? (
              <IconBookmarkFilled />
            ) : (
              <IconBookmark />
            )
          }
        >
          Add to Bookmarks
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

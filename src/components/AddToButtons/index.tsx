/* Icons imports */
import { useEffect, useState } from "react";
import {
  FaBookmark,
  FaClock,
  FaHeart,
  FaRegBookmark,
  FaRegClock,
  FaRegHeart,
} from "react-icons/fa";

/* Context imports */
import { useAuth } from "~/context/AuthContext";
import { useData } from "~/context/DataContext";

const AddToButtons = ({ id }: { id: number }) => {
  /* Context */
  const { user } = useAuth();
  const { getUserData, addItemTo } = useData();

  /* Buttons states */
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [hoveringWatchLater, setHoveringWatchLater] = useState(false);
  const [addedToWatchLater, setAddedToWatchLater] = useState(false);

  const [addedToBookmarks, setAddedToBookmarks] = useState(false);

  /* Handle to add movie or show to a list */
  const handleAddTo = async (listId: string) => {
    await addItemTo(user?.email, listId, id);
    if (listId == "001") {
      setAddedToFavorites(true);
    }
    if (listId == "002") {
      setAddedToWatchLater(true);
    }
    if (listId == "003") {
      setAddedToBookmarks(true);
    }
  };

  /* Change the default rating if the movie is already rated */
  useEffect(() => {
    if (user) {
      getUserData(user.email).then((data: any) => {
        if (data.movies[id]?.lists) {
          for (const list of data.movies[id].lists) {
            if (list == "001") {
              setAddedToFavorites(true);
            }
            if (list == "002") {
              setAddedToWatchLater(true);
            }
            if (list == "003") {
              setAddedToBookmarks(true);
            }
          }
        }
      });
    }
  }, [user]);

  return (
    <>
      {/* Add to favorites */}
      <button
        onClick={() => handleAddTo("001")}
        className="relative flex items-center justify-center"
      >
        <FaRegHeart />
        <FaHeart
          className={`absolute transition duration-200 ease-in-out ${
            addedToFavorites ? "opacity-100" : "opacity-0"
          } hover:opacity-100`}
        />
      </button>

      {/* Add to watch later */}
      <button
        onMouseEnter={() => setHoveringWatchLater(true)}
        onMouseLeave={() => setHoveringWatchLater(false)}
        onClick={() => handleAddTo("002")}
        className="relative flex items-center justify-center"
      >
        <FaRegClock
          className={`transition-opacity duration-200 ease-in-out ${
            addedToWatchLater
              ? "opacity-0"
              : hoveringWatchLater
              ? "opacity-0"
              : "opacity-100"
          }`}
        />
        <FaClock
          className={`absolute transition-opacity duration-200 ease-in-out ${
            addedToWatchLater ? "opacity-100" : ""
          } ${hoveringWatchLater ? "opacity-100" : "opacity-0"}`}
        />
      </button>

      {/* Add to list */}
      <button
        onClick={() => handleAddTo("003")}
        className="relative flex items-center justify-center"
      >
        <FaRegBookmark />
        <FaBookmark
          className={`absolute transition duration-200 ease-in-out ${
            addedToBookmarks ? "text-white opacity-100" : "opacity-0"
          } hover:opacity-100`}
        />
      </button>
    </>
  );
};

export default AddToButtons;

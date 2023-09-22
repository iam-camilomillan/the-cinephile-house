"use client";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* Firebase imports */
import { doc, getDoc, setDoc } from "firebase/firestore";

/* Firebase config imports */
import { firebaseFirestore } from "~/utils/firebase";
import { FirebaseError } from "firebase/app";

/* Types definitions */
interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<any>({});

export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [dataMessage, setDataMessage] = useState("");

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const getUserData = async (userId: string) => {
    try {
      const documentReference = doc(firebaseFirestore, `users/${userId}`);

      const documentData = await getDoc(documentReference);
      const userData = documentData.data();

      return userData;
    } catch (error) {
      if (error instanceof Error) {
        setDataMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setDataMessage(error.message);
      }
    }
  };

  const addRating = async (userId: string, movieId: string, rating: number) => {
    try {
      if (!userId) {
        throw new Error("You need to log in first.");
      }

      const documentReference = doc(firebaseFirestore, `users/${userId}`);

      await setDoc(
        documentReference,
        {
          movies: {
            [movieId]: {
              rating,
            },
          },
        },
        { merge: true }
      );

      setDataMessage("Item rated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setDataMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setDataMessage(error.message);
      }
    }
  };

  const addItemTo = async (userId: string, listId: string, movieId: string) => {
    try {
      if (!userId) {
        throw new Error("You need to log in first.");
      }

      const documentReference = doc(firebaseFirestore, `users/${userId}`);

      const documentData = await getDoc(documentReference);
      const userData = documentData.data();

      if (userData) {
        if (userData.lists[listId].movies.includes(movieId)) {
          throw new Error("Item already added.");
        }

        const updatedList = {
          ...userData.lists,
          [listId]: {
            ...userData.lists[listId],
            movies: [...userData.lists[listId].movies, movieId],
          },
        };

        const updatedMoviesList = userData.movies[movieId]?.lists
          ? [...userData.movies[movieId].lists, listId]
          : [listId];

        await setDoc(
          documentReference,
          {
            movies: {
              [movieId]: {
                lists: updatedMoviesList,
              },
            },
            lists: updatedList,
          },
          { merge: true }
        );
      }

      setDataMessage("Item added successfully.");
    } catch (error) {
      if (error instanceof Error) {
        setDataMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setDataMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (dataMessage) {
      setTimeout(() => {
        setDataMessage("");
      }, 3000);
    }
  }, [dataMessage]);

  return (
    <DataContext.Provider
      value={{
        getUserData,
        addRating,
        addItemTo,
        dataMessage,
        setDataMessage,
        isLoadingInitial,
        setIsLoadingInitial,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

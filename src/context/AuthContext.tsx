"use client";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* Firebase imports */
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

/* Firebase config imports */
import { firebaseAuth, firebaseFirestore } from "~/utils/firebase";
import { FirebaseError } from "firebase/app";

/* Types definitions */
type UserType = User | null;
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContext {
  user: any;
  signUpWithEmail: any;
  logInWithEmail: any;
  logInWithGoogle: any;
  logOut: any;
  authMessage: any;
  setAuthMessage: any;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  signUpWithEmail: () => {},
  logInWithEmail: () => {},
  logInWithGoogle: () => {},
  logOut: () => {},
  authMessage: "",
  setAuthMessage: () => {},
});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType>(null);

  const [authMessage, setAuthMessage] = useState("");

  const signUpWithEmail = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      setAuthMessage("Loading...");

      if (email.length < 6) {
        throw new Error("Email should be at least 6 characters long.");
      }

      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters long.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await setDoc(doc(firebaseFirestore, "users", email), {
        username: email,
        movies: {},
        lists: {
          "001": {
            id: "001",
            title: "Favorites",
            editable: false,
            movies: [],
          },
          "002": {
            id: "002",
            title: "Watch later",
            editable: false,
            movies: [],
          },
          "003": {
            id: "003",
            title: "Bookmarks",
            editable: false,
            movies: [],
          },
        },
      });

      setAuthMessage("Signed in.");
    } catch (error) {
      if (error instanceof Error) {
        setAuthMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        if (error.code == "auth/email-already-in-use") {
          setAuthMessage("Email already in use.");
        } else {
          setAuthMessage("Something went wrong.");
        }
      }
    }
  };

  const logInWithEmail = async (email: string, password: string) => {
    try {
      setAuthMessage("Loading...");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      setAuthMessage("Logged in.");
    } catch (error) {
      if (error instanceof Error) {
        setAuthMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setAuthMessage(error.message);
      }
    }
  };

  const logInWithGoogle = async () => {
    try {
      setAuthMessage("Loading...");
      const authProvider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, authProvider);
      setAuthMessage("Logged in.");
    } catch (error) {
      if (error instanceof Error) {
        setAuthMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setAuthMessage(error.message);
      }
    }
  };

  const logOut = async () => {
    try {
      setAuthMessage("Loading...");
      await signOut(firebaseAuth);
      setAuthMessage("Logged out.");
    } catch (error) {
      if (error instanceof Error) {
        setAuthMessage(error.message);
      }

      if (error instanceof FirebaseError) {
        setAuthMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (authMessage) {
      setTimeout(() => {
        setAuthMessage("");
      }, 3000);
    }
  }, [authMessage]);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (user: UserType) => {
        setUser(user);

        if (user) {
          const documentReference = doc(
            firebaseFirestore,
            `users/${user.email}`,
          );
          const documentSnapshot = await getDoc(documentReference);

          if (!documentSnapshot.exists()) {
            if (user.email) {
              await setDoc(doc(firebaseFirestore, "users", user.email), {
                username: user.email,
                movies: {},
                lists: {
                  "001": {
                    id: "001",
                    title: "Favorites",
                    editable: false,
                    movies: [],
                  },
                  "002": {
                    id: "002",
                    title: "Watch later",
                    editable: false,
                    movies: [],
                  },
                  "003": {
                    id: "003",
                    title: "Bookmarks",
                    editable: false,
                    movies: [],
                  },
                },
              });
            }
          }
        }
      },
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmail,
        logInWithEmail,
        logInWithGoogle,
        logOut,
        authMessage,
        setAuthMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

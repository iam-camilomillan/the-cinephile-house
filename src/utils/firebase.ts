/* Firebase imports */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* Env variables imports */
import { env } from "~/env.mjs";

/* Firebase project config */
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "the-cinephile-house-cm.firebaseapp.com",
  projectId: "the-cinephile-house-cm",
  storageBucket: "the-cinephile-house-cm.appspot.com",
  messagingSenderId: "1088974824285",
  appId: "1:1088974824285:web:c9876225b07785887bbeb4",
};

/* Firebase app initialization */
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

/* Firebase exports */
export { firebaseAuth, firebaseFirestore };

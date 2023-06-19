// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTOVipuVwksFx-WcgnlL_Kdn-K5PFagjc",
  authDomain: "movie-directory-app.firebaseapp.com",
  projectId: "movie-directory-app",
  storageBucket: "movie-directory-app.appspot.com",
  messagingSenderId: "342995845897",
  appId: "1:342995845897:web:f9b2cf34b8722e058849d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//export default app;
export const db=getFirestore(app) ;
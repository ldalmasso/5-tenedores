import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt5EqP5nv90YWwvkLx93jNp2PaGjwdhbs",
  authDomain: "tenedores-44875.firebaseapp.com",
  projectId: "tenedores-44875",
  storageBucket: "tenedores-44875.appspot.com",
  messagingSenderId: "535635043322",
  appId: "1:535635043322:web:5cd7171a1f1c54fb093a43",
};

export const initFireBase = initializeApp(firebaseConfig);

export const db = getFirestore(initFireBase);

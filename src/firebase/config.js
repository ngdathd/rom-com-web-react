import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArUNSPk5eTobvaXGp6YE1X6sODNvPwI4k",
  authDomain: "romcom-iz-da-bezt.firebaseapp.com",
  projectId: "romcom-iz-da-bezt",
  storageBucket: "romcom-iz-da-bezt.appspot.com",
  messagingSenderId: "49334406766",
  appId: "1:49334406766:web:de51534722491d8df2607f",
  measurementId: "G-FY5L3K400S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db };

export default firebase;

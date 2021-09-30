import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBg6Zxel6sJw6BnsC09Nsil42KGJ1SXaNM",
  authDomain: "linkedin-e5cd2.firebaseapp.com",
  projectId: "linkedin-e5cd2",
  storageBucket: "linkedin-e5cd2.appspot.com",
  messagingSenderId: "592699367115",
  appId: "1:592699367115:web:0b99de87df0a2619d4854e",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;

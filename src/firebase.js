import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCacgGty4gU-nOo4F_yw30bOC1yaRbw3Ok",
  authDomain: "browser-editor.firebaseapp.com",
  databaseURL: "https://browser-editor.firebaseio.com",
  projectId: "browser-editor",
  storageBucket: "",
  messagingSenderId: "163667378398",
  appId: "1:163667378398:web:47bd5c100c10645b0e424f"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebase;
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDShfaoZuTilWY7zJU31MCZTx_NHKcC83k",
    authDomain: "reunite-2019.firebaseapp.com",
    databaseURL: "https://reunite-2019.firebaseio.com",
    projectId: "reunite-2019",
    storageBucket: "reunite-2019.appspot.com",
    messagingSenderId: "17954938203",
    appId: "1:17954938203:web:3707781b693da006544e7e",
    measurementId: "G-65148YHSV3"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();



import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB6tb648OERu_esTrC8zqzEIP7ngCbnZns",
    authDomain: "soccer-club-8664d.firebaseapp.com",
    databaseURL: "https://soccer-club-8664d.firebaseio.com",
    projectId: "soccer-club-8664d",
    storageBucket: "soccer-club-8664d.appspot.com",
    messagingSenderId: "1066256114260"
};
 
firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
}
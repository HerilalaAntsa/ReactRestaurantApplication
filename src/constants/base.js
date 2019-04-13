import Rebase from 're-base';
import firebase from 'firebase';

const config = {
// copier les 3 premières lignes de VOTRE config de votre base !!!
 // NE PRENEZ PAS LES VALEURS QUI SONT ICI !!!
    apiKey: "AIzaSyA4BVn7dJPxO3u-KXfgh2W1kr7ZGc0kSZc",
    authDomain: "exo-restaurant.firebaseapp.com",
    databaseURL: "https://exo-restaurant.firebaseio.com" // pas de , à la fin
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(config)
export { app, base };
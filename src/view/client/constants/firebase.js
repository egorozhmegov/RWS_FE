import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDZ3yxHy1NpZfRLFdb-xA2M5f7hbyyvAMI",
    authDomain: "rws-client.firebaseapp.com",
    databaseURL: "https://rws-client.firebaseio.com",
    projectId: "rws-client",
    storageBucket: "",
    messagingSenderId: "556046555188"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBa4G6AyodyypnkyIVDo31sfVVNLzFcL40",
	authDomain: "patata-api.firebaseapp.com",
	databaseURL: "https://patata-api.firebaseio.com",
	projectId: "patata-api",
	storageBucket: "patata-api.appspot.com",
	messagingSenderId: "238088475374"
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
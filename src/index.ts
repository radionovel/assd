// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUsCS9BkC6Er6BqTuAJqOQyGDP9MEBGi8",
    authDomain: "gilmon-test-6c6ac.firebaseapp.com",
    projectId: "gilmon-test-6c6ac",
    storageBucket: "gilmon-test-6c6ac.appspot.com",
    messagingSenderId: "104942036970",
    appId: "1:104942036970:web:4057afdb9310988467f493",
    measurementId: "G-59209BLT46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});

function token() {

    getToken(messaging, {vapidKey: "BO_-C9FQb7m8HX_r8ixdRsYFBtOx75eeJt6M1WVdYQPYMKsb5sMpoOkZILnpa6-FS50HUVYnSJUaV8WxI9pRHuk"}).then((currentToken) => {
        if (currentToken) {
            console.log('currentToken', currentToken)
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
}



function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            token()
        }
    });
}

requestPermission()

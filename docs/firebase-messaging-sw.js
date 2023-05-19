// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBUsCS9BkC6Er6BqTuAJqOQyGDP9MEBGi8",
    authDomain: "gilmon-test-6c6ac.firebaseapp.com",
    projectId: "gilmon-test-6c6ac",
    storageBucket: "gilmon-test-6c6ac.appspot.com",
    messagingSenderId: "104942036970",
    appId: "1:104942036970:web:4057afdb9310988467f493",
    measurementId: "G-59209BLT46",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

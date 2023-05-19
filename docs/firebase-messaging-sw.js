importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBUsCS9BkC6Er6BqTuAJqOQyGDP9MEBGi8",
    authDomain: "gilmon-test-6c6ac.firebaseapp.com",
    projectId: "gilmon-test-6c6ac",
    storageBucket: "gilmon-test-6c6ac.appspot.com",
    messagingSenderId: "104942036970",
    appId: "1:104942036970:web:4057afdb9310988467f493",
    measurementId: "G-59209BLT46",
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Handling background message', payload);

    // Copy data object to get parameters in the click handler
    payload.data.data = JSON.parse(JSON.stringify(payload.data));

    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }

        return clients.openWindow(target);
    }));
});

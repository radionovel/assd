// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";

initializeApp({
    messagingSenderId: '448358493027'
});

if (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'localStorage' in window &&
    'fetch' in window &&
    'postMessage' in window
) {
    var messaging = getMessaging();

    // already granted
    if (Notification.permission === 'granted') {
        getTokenFoo();
    }

    // form.on('submit', function(event) {
    //     event.preventDefault();
    //
    //     var notification = {};
    //     form.find('input').each(function () {
    //         var input = $(this);
    //         notification[input.attr('name')] = input.val();
    //     });
    //
    //     sendNotification(notification);
    // });

    // handle catch the notification on current page
    onMessage(messaging, function (payload) {
        console.log('Message received', payload);
        // register fake ServiceWorker for show notification on mobile devices
        navigator.serviceWorker.register('/serviceworker/firebase-messaging-sw.js');
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(function (registration) {
                    console.log(payload)
                    // payload.data.data = JSON.parse(JSON.stringify(payload.data));
                    // registration.showNotification(payload.data.title, payload.data);
                }).catch(function (error) {
                    console.log('ServiceWorker registration failed', error);
                });
            }
        });
    });

    // Callback fired if Instance ID token is updated.
    // messaging.onTokenRefresh(function() {
    //     messaging.getToken()
    //         .then(function(refreshedToken) {
    //             console.log('Token refreshed');
    //             // Send Instance ID token to app server.
    //             sendTokenToServer(refreshedToken);
    //             updateUIForPushEnabled(refreshedToken);
    //         })
    //         .catch(function(error) {
    //             showError('Unable to retrieve refreshed token', error);
    //         });
    // });

} else {
    console.warn('This browser does not support desktop notification.');
    console.log('Is HTTPS', window.location.protocol === 'https:');
    console.log('Support Notification', 'Notification' in window);
    console.log('Support ServiceWorker', 'serviceWorker' in navigator);
    console.log('Support LocalStorage', 'localStorage' in window);
    console.log('Support fetch', 'fetch' in window);
    console.log('Support postMessage', 'postMessage' in window);
}


function getTokenFoo() {
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const vapidKey = "BO_-C9FQb7m8HX_r8ixdRsYFBtOx75eeJt6M1WVdYQPYMKsb5sMpoOkZILnpa6-FS50HUVYnSJUaV8WxI9pRHuk";
    getToken(messaging, {vapidKey: vapidKey})
        .then((currentToken) => {
            if (currentToken) {
                sendTokenToServer(currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one');
            }
        })
        .catch(function (error) {
            console.log('An error occurred while retrieving token', error);
        });
}


// function sendNotification(notification: any) {
//     var key = 'AAAAaGQ_q2M:APA91bGCEOduj8HM6gP24w2LEnesqM2zkL_qx2PJUSBjjeGSdJhCrDoJf_WbT7wpQZrynHlESAoZ1VHX9Nro6W_tqpJ3Aw-A292SVe_4Ho7tJQCQxSezDCoJsnqXjoaouMYIwr34vZTs';
//
//     console.log('Send notification', notification);
//
//     getTokenFoo()
//         .then(function(currentToken: string) {
//             fetch('https://fcm.googleapis.com/fcm/send', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'key=' + key,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     data: notification,
//                     to: currentToken
//                 })
//             }).then(function(response) {
//                 return response.json();
//             }).then(function(json) {
//                 console.log('Response', json);
//             }).catch(function(error) {
//                 console.log(error);
//             });
//         })
//         .catch(function(error) {
//             console.log('Error retrieving Instance ID token', error);
//         });
// }

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken: string | null | undefined) {
    if (currentToken) {
        console.log('Sending token to server...', currentToken);
    } else {
        console.log('Token already sent to server so won\'t send it again unless it changes');
    }
}

// // Check for service worker
if ("serviceWorker" in navigator) {
    checkRegistrations().then(registrations => {
        if(registrations.length == 0 ){
            registerServiceWorker().then(()=> {
                askPermission().then(()=> 
                  subscribeUserToPush().then((subscription)=> 
                        sendSubscriptionToBackEnd(subscription) )
                  )
            }).catch(err => console.error(err));
        }
    })
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function checkRegistrations(){
    return navigator.serviceWorker.getRegistrations().then(registrations => {
        return registrations
    })
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('/custom-service-worker.js',{
        scope:'/'
    })
    .then(function(registration) {
      console.log('Service worker successfully registered.',registration);
      return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
  }

  function askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  }

  function subscribeUserToPush() {
    return navigator.serviceWorker.register('/custom-service-worker.js')
    .then(function(registration) {
        console.log("SubUsPush",registration)
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BNxoyKbT9Czi5Ck0r8P5YkbD9skcPwMl8Q2r8330aj8P6PK154p87_0iUlRHtYQPrVQ1uuMBL6zjMksabwZm1s4'
        )
      };
  
      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
    });
  }

  function sendSubscriptionToBackEnd(subscription) {
    return fetch('http://localhost:8080/subscribe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }
  
      return response.json();
    })
    .then(function(responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
  }
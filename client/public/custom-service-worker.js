console.log("Service Worker Loaded...");
self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("DATA",data)
  console.log("Push Recieved...");
  self.registration.showNotification(data.title,{
    body: "You have been assigned a ticket",
    // icon: "https://freeicons.io/laravel/public/uploads/icons/png/6882831431553666420-512.png"
    icon: "https://cdn.freebiesupply.com/logos/thumbs/2x/asana-logo-logo.png"
  })
  // self.registration.showNotification(data.title, );
});

self.addEventListener("activate",e => {console.log("SW Activated")})

// self.addEventListener("push", e => {console.log("PUSH EVENT")})
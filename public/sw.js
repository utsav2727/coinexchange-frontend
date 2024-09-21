self.addEventListener('push', function (event) {
    const data = event.data.json();
    console.log('Push received:', data);
  
    const options = {
      body: data.body,
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
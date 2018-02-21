console.log('HEY SERVICE WORKER');
console.log('self in sw.js: ', self);

var isAnonSession = true;

self.addEventListener('push', function(event) {
	const data = JSON.parse(event.data.text());
	const title = data.title;
	const options = data.options;

    fetch(options.data.track.delivered, {
		mode: 'no-cors'
	});

	// TODO replace link for badge icon badge must be in alpha form as
	// notification badge does not support rgb or any color format.
	options.badge = 'https://i.imgur.com/9QFB20F.png';

	showPush = self.registration.showNotification(title, options);
	console.log('Notification Shown', data);
    event.waitUntil(showPush);
});

self.addEventListener('notificationclick', event => {
		fetch(event.notification.data.track.delivery, {
			mode: 'no-cors'
		});

		const urlToOpen = new URL(event.notification.data.track.clicked);
		const promiseChain = clients.matchAll({
		    type: 'window',
			includeUncontrolled: true
		})
		.then((windowClients) => {
			let matchingClient = null;

			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];

				const urlOfClient = new URL(windowClient.url);

				if (`${urlOfClient.origin}${urlOfClient.pathname}` === urlToOpen.searchParams.get('page')
				&& urlOfClient.searchParams.get('utm_campaign') === urlToOpen.searchParams.get('utm_campaign')) {
					matchingClient = windowClient;
					break;
				}
			}

			if (matchingClient) {
				matchingClient.focus();
				if ('navigate' in matchingClient){
					matchingClient.navigate(urlToOpen);
				} else {
					clients.openWindow(urlToOpen);
				}
				return;
			} else {
				return clients.openWindow(urlToOpen);
			}
		})
		.then(success => {
			event.notification.close();
		})
		event.waitUntil(promiseChain);
});

self.addEventListener('message', function handler (event) {
	var data = event.data;

	if (data.isAnonSession !== undefined) {
		isAnonSession = data.isAnonSession;
	}
	console.log('service worker message: ');
});

self.skipWaiting();

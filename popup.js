chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == 'getSource') {
    message.innerHTML = request.source;
	}
});

function onWindowLoad() {

	var message = document.querySelector('#message');
	chrome.storage.sync.get({
		filter: '',
		resource_title: ''
	}, function(items) {
		chrome.tabs.executeScript(null, {
			code: 'var config = ' + JSON.stringify({
        filter: items.filter,
        resource_title: items.resource_title
		})
		}, function() {
			chrome.tabs.executeScript(null, {
				file: 'getPagesSource.js'
			}, function() {
				if (chrome.runtime.lastError) {
					message.innerText = 'Error injecting script : \n' + chrome.runtime.lastError.message;
				}
			})
		});
	});
}

window.onload = onWindowLoad;
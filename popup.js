chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "getSource") {
		message.innerText = request.source;
	}
});

function onWindowLoad() {

	var message = document.querySelector('#message');
	chrome.storage.sync.get({
		filter: 'spec',
		name: ''
	}, function(items) {
		document.getElementById('filter').value = items.filter;
		document.getElementById('reporter').value = items.name;
		var config = {
			filter: items.filter,
			resource: items.name
		};

		chrome.tabs.executeScript(null, {
			code: 'var config = ' + JSON.stringify(config)
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
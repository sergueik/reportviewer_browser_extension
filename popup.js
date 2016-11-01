chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == 'getSource') {
    try {
      message.innerHTML = request.source;
      if (request.show_header) {
        header.innerHTML = request.header;
      }
    } catch (e) {
      alert('exception : ' + e.toString());
    }
	}
});

function onWindowLoad() {
	var message = document.querySelector('#message');
	var header = document.querySelector('#header');
	chrome.storage.sync.get({
		filter: '',
		resource_title: '',
		show_header: false
	}, function(items) {
		chrome.tabs.executeScript(null, {
			code: 'var config = ' + JSON.stringify({
        filter: items.filter,
        resource_title: items.resource_title,
        show_header: items.show_header
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
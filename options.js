// Saves  and restores options with chrome.storage
function save_options() {
	var icons = {
		'errors': 'e.png',
		'spec': 's.png',
		'resource': 'r.png'
	};
	var filter = document.getElementById('filter').value;
	var resource_title = document.getElementById('resource_title').value;
	try {
		chrome.browserAction.setIcon({
			path: icons[filter],
			// tabId: sender.tab.id
		});
	} catch (ex) {
		alert(ex);
	}
	chrome.storage.sync.set({
		filter: filter,
		resource_title: resource_title
	}, function() {
		// Update status to inform user options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		filter: 'spec',
		resource_title: 'Splunk'
	}, function(items) {
		document.getElementById('filter').value = items.filter;
		document.getElementById('resource_title').value = items.resource_title;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
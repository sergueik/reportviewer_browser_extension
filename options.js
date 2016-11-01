// Saves  and restores options with chrome.storage
function save_options() {
	var icons = {
		'errors': 'e.png',
		'spec': 's.png',
		'resource': 'r.png'
	};
	var filter = document.getElementById('filter').value;
	var resource_title = document.getElementById('resource_title').value;
  var show_header = false;
  try {
    show_header = document.getElementsByClassName('show_header')[0].checked ;  
  } catch(e) {
    alert('exception : ' + e.toString());      
  }
	try {
		chrome.browserAction.setIcon({
			path: icons[filter],
			// tabId: sender.tab.id
		});
	} catch (e) {
		alert(e);
	}
	chrome.storage.sync.set({
		filter: filter,
		resource_title: resource_title,
    show_header: show_header
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
		resource_title: 'Splunk',
    show_header: false
	}, function(items) {
		document.getElementById('filter').value = items.filter;
		document.getElementById('resource_title').value = items.resource_title;
    document.getElementsByClassName('show_header')[0].checked = items.show_header;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
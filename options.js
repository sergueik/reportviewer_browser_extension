// Saves options to chrome.storage
function save_options() {
	var filter = document.getElementById('filter').value;
	var name = document.getElementById('name').value;
	chrome.storage.sync.set({
		filter: filter,
		name: name
	}, function() {
		// Update status to inform user options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and text input state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		filter: 'spec',
		name: ''
	}, function(items) {
		document.getElementById('filter').value = items.filter;
		document.getElementById('name').value = items.name;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
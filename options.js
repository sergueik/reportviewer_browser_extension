// Saves options to chrome.storage
function save_options() {
  alert('test');
	var color = document.getElementById('filter').value;
	var likesFilter = document.getElementById('resource').checked;
	chrome.storage.sync.set({
		favoriteFilter: color,
		likesFilter: likesFilter
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
	// Use default value color = 'red' and likesFilter = true.
	chrome.storage.sync.get({
		favoriteFilter: 'errors',
		resourceFilter: ''
	}, function(items) {
		document.getElementById('filter').value = items.favoriteFilter;
		document.getElementById('resource').checked = items.resourceFilter;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);
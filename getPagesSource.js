function DOMtoString(document_root) {
	var html = '';
	var node = document_root.firstChild;
	while (node) {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				var process = false;
				if (process) {
					var data = node.innerHTML;
					var log_lines = data.split(/\n/);
					var matching_lines = '';
					var count = log_lines.length;
					for (i = 0; i < count; i++) {
						log_line = log_lines[i];
						var resource_pattern = new RegExp('/Stage.*Exec\\[reporter\\]');
						if (resource_pattern.test(log_line)) {
							var matching_line = log_line.replace(resource_pattern, '');
							for (var remove_part in [
									'[\\d-]+\\s+[\\d:]+\\s+', // timestamp
									'\\[pid:\\d+\\]\\s+', // pid
									'(?:cloud-provisioner.subprocess|) INFO:', // wrapper 
									'(Notice:|returns:)', // message category
									'\\[\\d?m' // text attribute character 
								]) {
								matching_line = matching_line.replace(new RegExp(remove_part, 'g'), '');
							}
							matching_lines += matching_line + '\n';
							// matching_lines += log_line.replace(patt, '').replace(date_header, '').replace(pid_header, '').replace(provisioner_header, '').replace(misc_header1, '').replace(misc_header2, '') + '\n';
						}
					}
					html += matching_lines;
					// Summary 
					html += matching_lines.length + ' lines';
				} else {
					html += node.outerHTML;
				}
				break;
			case Node.TEXT_NODE:
				html += node.nodeValue;
				break;
			case Node.CDATA_SECTION_NODE:
				html += '<![CDATA[' + node.nodeValue + ']]>';
				break;
			case Node.COMMENT_NODE:
				html += '<!--' + node.nodeValue + '-->';
				break;
			case Node.DOCUMENT_TYPE_NODE:
				// (X)HTML documents are identified by public identifiers
				html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
				break;
		}
		node = node.nextSibling;
	}
	return html;
}

chrome.runtime.sendMessage({
	action: "getSource",
	source: DOMtoString(document)
});
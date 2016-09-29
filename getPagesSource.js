function DOMtoString(document_root) {
	var html = '';
	var cnt = 0;
	var node = document_root.firstChild;
	while (node && cnt == 0) {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				var process = true;
				if (process) {
					// alert('filter: ' + config.filter+ '\n' + 'reporter: ' + config.reporter + '\n' + 'cnt: ' + cnt );
					var data = node.innerHTML;
					var log_lines = data.split(/\n/);
					var matching_lines = '';
					var count = log_lines.length;
					for (i = 0; i < count; i++) {
						log_line = log_lines[i];
						if (config.filter == 'spec') {
							var resource_pattern = new RegExp('/Stage.*Exec\\[reporter\\]/');
							if (resource_pattern.test(log_line)) {
								var matching_line = log_line.replace(resource_pattern, '');

								var remove_patterns = ['\\d{2,2}\\-\\d{2,2}\\-\\d{2,2}\\s+[\\d:]+\\s+',
									'\\[pid:\\d+\\]\\s+',
									'(?:cloud-provisioner.subprocess|cloud-provisioner)',
									'\\s+INFO:\\s+',
									'(?:Notice|returns):',
									'\\[\\d?m'
								];
								for (var cnt = 0; cnt < remove_patterns.length; cnt++) {
									var p = new RegExp(remove_patterns[cnt], 'g')
									matching_line = matching_line.replace(p, '');
								}
								matching_lines += matching_line + '\n';
							}
						}
					}
					html += matching_lines;
					// Summary 
					html += matching_lines.length + ' lines';
					cnt++;

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
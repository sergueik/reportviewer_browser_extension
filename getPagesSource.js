function DOMtoString(document_root) {
	var html = '';
	var node = document_root.firstChild;
	while (node) {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				var data = node.innerHTML;
				var log_lines = data.split(/\n/);
				var matching_lines = [];
				var count = log_lines.length;
				// alert('config.filter :' + config.filter ) ;
				for (line_cnt = 0; line_cnt < log_lines.length; line_cnt++) {
					log_line = log_lines[line_cnt];
					if (config.filter == 'errors') {
						var resource_pattern = new RegExp('(?:failed|failures)');
						if (resource_pattern.test(log_line)) {
							var main_header = new RegExp('/Stage\\[.*/([^/.]+)/([^/.]+):\\s+');
							log_line = log_line.replace(main_header, '$1/$2: ');
							var dependency_header = new RegExp('/Stage\\[.*/([^/.]+):\\s+Dependency');
							log_line = log_line.replace(dependency_header, '$1: Dependency');
							var header = new RegExp('/Stage\\[.*/([^/.]+):\\s+Dependency');
							log_line = log_line.replace(header, '$1: Dependency');
							var remove_patterns = ['\\d{2,2}\\-\\d{2,2}\\-\\d{2,2}\\s+[\\d:]+\\s+',
								// '/Stage\\[.*\\]:\\s+Dependency',
								'\\[pid:\\d+\\]\\s+',
								'(?:cloud-provisioner.subprocess|cloud-provisioner)',
								'\\s+INFO:\\s+',
								'(?:Notice|returns):',
								'\\[\\d?m',
								'.\\[1;31m',
							];
							for (var cnt = 0; cnt < remove_patterns.length; cnt++) {
								log_line = log_line.replace(new RegExp(remove_patterns[cnt], 'g'), '');
							}
							matching_lines.push(log_line);
						}
					}
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
								matching_line = matching_line.replace(new RegExp(remove_patterns[cnt], 'g'), '');
							}
							matching_lines.push(matching_line);
						}
					}
				}
				html += matching_lines.join('\n');
				// Summary 
				html += '\n' + matching_lines.length + ' lines';
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
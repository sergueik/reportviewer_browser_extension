function DOMtoString(document_root) {
	var html = '';
	var even_line = false;
  var line_class = '';
	var node = document_root.firstChild;
	while (node) {
		switch (node.nodeType) {
			case Node.ELEMENT_NODE:
				var data = node.innerHTML;
				var log_lines = data.split(/\n/);
				var matching_lines = [];
				var count = log_lines.length;
				for (line_cnt = 0; line_cnt < log_lines.length; line_cnt++) {
					log_line = log_lines[line_cnt];
					if (config.filter == 'resource') {
						var resource_title = config.resource_title;
						var resource_pattern = new RegExp('/Stage.*(?:\\[' + resource_title + '.*' + '\\]'+'|' + '/' + resource_title + '.*' + ')(?:|/)', 'i');
						if (resource_pattern.test(log_line)) {
							var main_header = new RegExp('/Stage\\[.*/([^/.]+)/([^/.]+):\\s+');
							log_line = log_line.replace(main_header, '$1/$2: ');
							var remove_patterns = [
								'\\d{2,2}\\-\\d{2,2}\\-\\d{2,2}\\s+[\\d:]+\\s+',
								'\\[pid:\\d+\\]\\s+',
								'(?:cloud-provisioner.subprocess|cloud-provisioner)',
								'\\s+INFO:\\s+',
								'(?:Notice|returns):',
								'\\[\\d?m',
								'.\\[1;31m',
								String.fromCharCode( 27) // escape
								];
							for (var cnt = 0; cnt < remove_patterns.length; cnt++) {
								log_line = log_line.replace(new RegExp(remove_patterns[cnt], 'g'), '');
							}
							even_line = !even_line;
							line_class = 'class=' +((even_line) ? '"even"' : '"odd"');
							matching_lines.push('<span ' + line_class + '>' + log_line.trim() + '</span>');
						}
					}
					if (config.filter == 'errors') {
						var error_pattern = new RegExp('(?:failed|failure|error)', 'i');
						if (error_pattern.test(log_line)) {
							var ignore_error_fragment = [
								'error_(?:pwd|uuid|user|fqdn)',
								'ignoring certificate',
								'not using cache on failed catalog',
								'initial tags run failed',
								'skipping run'
							];
							var ignore_error_pattern = new RegExp('(?:' + ignore_error_fragment.join('|') + ')', 'i');
							if (!ignore_error_pattern.test(log_line)) {
								var main_header = new RegExp('/Stage\\[.*/([^/.]+)/([^/.]+):\\s+');
								log_line = log_line.replace(main_header, '$1/$2: ');
								var dependency_header = new RegExp('/Stage\\[.*/([^/.]+):\\s+Dependency');
								log_line = log_line.replace(dependency_header, '$1: Dependency');
								var header = new RegExp('/Stage\\[.*/([^/.]+):\\s+Dependency');
								log_line = log_line.replace(header, '$1: Dependency');
								var remove_patterns = [
									'\\d{2,2}\\-\\d{2,2}\\-\\d{2,2}\\s+[\\d:]+\\s+',
									'\\[pid:\\d+\\]\\s+',
									'(?:cloud-provisioner.subprocess|cloud-provisioner)',
									'\\s+INFO:\\s+',
									'(?:Notice|returns):',
									'\\[\\d?m',
									'.\\[1;31m',
									String.fromCharCode( 27) // escape
								];
								for (var cnt = 0; cnt < remove_patterns.length; cnt++) {
									log_line = log_line.replace(new RegExp(remove_patterns[cnt], 'g'), '');
								}
								even_line = !even_line;
								line_class = 'class=' +((even_line) ? '"even"' : '"odd"');
								matching_lines.push('<span ' + line_class + '>' + log_line.trim() + '</span>');
							}
						}
					}
					if (config.filter == 'spec') {
						var resource_pattern = new RegExp('/Stage.*Exec\\[reporter\\]/');
						if (resource_pattern.test(log_line)) {
							log_line = log_line.replace(resource_pattern, '');
							var remove_patterns = ['\\d{2,2}\\-\\d{2,2}\\-\\d{2,2}\\s+[\\d:]+\\s+',
								'\\[pid:\\d+\\]\\s+',
								'(?:cloud-provisioner.subprocess|cloud-provisioner)',
								'\\s+INFO:\\s+',
								'(?:Notice|returns):',
								'\\[\\d?m',
								String.fromCharCode( 27) // escape
							];
							for (var cnt = 0; cnt < remove_patterns.length; cnt++) {
								log_line = log_line.replace(new RegExp(remove_patterns[cnt], 'g'), '');
							}
							even_line = !even_line;
							line_class = 'class=' +((even_line) ? '"even"' : '"odd"');
							matching_lines.push('<span ' + line_class + '>' + log_line.trim() + '</span>');
						}
					}
				}
				html += matching_lines.join('\r\n');
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
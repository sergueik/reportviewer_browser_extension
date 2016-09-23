function DOMtoString(document_root) {
    // cloud-init.log
    var html = '',


        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:

                // 	html += node.outerHTML;
                var data = node.innerHTML;
                var log_lines = data.split(/\n/);
                var matching_lines = '';

                var count = log_lines.length;
                // count = 3000;
                for (i = 0; i < count; i++) {
                    log_line = log_lines[i];
                    var date_header = new RegExp('[\\d-]+\\s+[\\d:]+\\s+');
                    var pid_header = new RegExp('\\[pid:\\d+\\]\\s+');
                    var provisioner_header = new RegExp('(?:cloud-provisioner.subprocess|) INFO:');
                    var misc_header1 = new RegExp('(Notice:|returns:)','g');
                    var misc_header2 = new RegExp('\\[\\d?m','g');
                    var patt = new RegExp('/Stage.*Exec\\[reporter\\]');
                    if (patt.test(log_line)) {
                        xx = log_line.replace(date_header, '').replace(pid_header, '').replace(provisioner_header, '').replace(misc_header1, '').replace(misc_header2, '');
                        matching_lines += xx.replace(patt, '') + '\n';
                        // matching_lines += log_line.replace(patt, '') + '\n';
                        //  matching_lines += log_lines[i] + '\n';
                    }
                }
                var length = matching_lines.length;

                html += matching_lines;
                // html += length + ' lines';
                // html += node.innerHTML;
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

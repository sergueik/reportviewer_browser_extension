### Info
Chrome browser extension to extract summary from `cloud-init.log` plaintext report:
Scans report rows for
  * errors
  * resource
  * rspec
Removes the console-oriented tty formatting
### Reports
#### Errors
This filter scans throughout `cloud-init.log` for lines containing the text `failed`,`failure`, or `error`
![errors](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture1.png)
#### Resource
This filter selects `cloud-init.log` for lines containing the specific string in the header.
![resource](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture2.png)
When the string is set to `splunk` the
lines containing the following :
```
.../Splunk...
```
and
```
.../Package[Splunk]////
```
will be extracted.
#### RSpec
This filter extracts the rspec run log embedded in the `cloud-init.log` 
![rspec](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture3.png)
Specifically lines produced by following resource
```
/Stage[main]/Testing_framework/Testing_framework::Run_serverspec[_apps_puppet-testing_framework]/Exec[reporter]
```
### References:

 * Getting the source HTML of the current page
   * [stackoverflow](http://stackoverflow.com/questions/21314897/access-dom-elements-through-chrome-extension)
   * [stackoverflow](http://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension)
 * [pass parameters](http://stackoverflow.com/questions/17567624/pass-parameter-using-executescript-chrome)
 * [change icon](http://stackoverflow.com/questions/6939974/how-i-can-change-default-icon-in-chrome-extension)
 * [change width](http://stackoverflow.com/questions/8983165/how-can-i-expand-the-popup-window-of-my-chrome-extension)
 * [options](https://developer.chrome.com/extensions/options)
 * [scrollbars](http://trac.webkit.org/export/41842/trunk/LayoutTests/scrollbars/overflow-scrollbar-combinations.html)

### Author
[Serguei Kouzmine](kouzmine_serguei@yahoo.com)

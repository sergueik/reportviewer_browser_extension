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
![errors](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture1.PNG)

#### Resource

This filter selects `cloud-init.log` for lines containing the specific string in the header.
![resource](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture2.PNG)
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
![rspec](https://github.com/sergueik/reportviewer_browser_extension/raw/master/screenshots/capture3.PNG)
Specifically lines produced by following resource
```
/Stage[main]/Testing_framework/Testing_framework::Run_serverspec[_apps_puppet-testing_framework]/Exec[reporter]
```
### See Also:

  * [alternative link extractors](https://saasdiscovery.com/link-klipper-extract-all-links/)
  * [link klipper](https://chrome.google.com/webstore/detail/link-klipper-extract-all/fahollcgofmpnehocdgofnhkkchiekoo) - Extract all links from the page
  * [copy all urls](https://chrome.google.com/webstore/detail/copy-all-urls/djdmadneanknadilpjiknlnanaolmbfk)
  * [link chump](https://chrome.google.com/webstore/detail/linkclump/lfpjkncokllnfokkgpkobnkbkmelfefj)
  * [code beautifier](https://github.com/leocompson/code-beautifier)(shows packaging for multiple major browsers) 
  * [chrome extension source downloader](https://chrome.google.com/webstore/detail/extension-source-download/dlbdalfhhfecaekoakmanjflmdhmgpea)
  * Getting the source HTML of the current page
    + [access DOM elements through chrome extension](http://stackoverflow.com/questions/21314897/access-dom-elements-through-chrome-extension)
    + [accessing the source HTML of the current page from chrome extension](http://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension)
  * [pass parameters](http://stackoverflow.com/questions/17567624/pass-parameter-using-executescript-chrome)
  * [change icon](http://stackoverflow.com/questions/6939974/how-i-can-change-default-icon-in-chrome-extension)
  * [change width](http://stackoverflow.com/questions/8983165/how-can-i-expand-the-popup-window-of-my-chrome-extension)
  * [options](https://developer.chrome.com/extensions/options)
  * [scrollbars](http://trac.webkit.org/export/41842/trunk/LayoutTests/scrollbars/overflow-scrollbar-combinations.html)
  * [develop Your First Google Chrome Extension Using HTML and JQuery](https://www.codeproject.com/Articles/1185723/Develop-Your-First-Google-Chrome-Extension-Using-H) codepoject article
  * [forum quesion with incorrect launcher](https://qna.habr.com/q/1326058) (in Russian)

### Author
[Serguei Kouzmine](kouzmine_serguei@yahoo.com)

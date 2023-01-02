# Code.org Plus

Let's be honest, code.org sucks.

But never fear! Code.org plus is a [userscript](https://en.wikipedia.org/wiki/Userscript) that adds many new features to code.org, specifically it's game lab.

## Features
- Custom Syntax Styling with preset themes<br>
        - Tired of having the normal old GameLab syntax Styles? Spice it up a little with your own custom colors, or pick from a small selection of predefined ones!<br>
<img src="https://user-images.githubusercontent.com/91158513/210185034-c02a42d2-6ff1-477b-a77c-ca0aeab5b39d.png" height="300px"> <img src="https://user-images.githubusercontent.com/91158513/210188584-16dbfdb6-92dd-461b-b186-107a278c86ed.gif" height="300px">
- Dark Mode<br>
        - Coding at night and being blinded by the default light theme on Code.org? Dark Mode allows you to turn off the lights, and makes everything dark on most pages.
- Beautify Button<br>
        - If you are an ugly coder, than this is for you! The Prettify/Beautify Button cleans up, auto-indents, and separates your code into new lines to keep it looking good!
- Fullscreen Stage<br>
        - Having trouble seeing the tiny Code.org GameLab stage? Click the fullscreen button next to the animation and Code tabs, or just open the CodePlus menu using <kbd>Shift</kbd>, then press the right <kbd>Alt</kbd>! This will blow up the stage to be front and center, allowing you to see it a lot easier. (Note: if the stage is to big, then you can adjust the scale size underneath the switch using the slider.)
- Custom Header Color<br>
- Fixed Header Position<br>
        - For some reason Code.org's Header is not stuck at the top of the screen, and if you scroll down it goes away. This option makes it always stay at the top of the screen.
- Recent Project List<br>
        - This option allows you to view a list of your 100 most recent projects viewed. (Note: this setting is still in beta, and bugs are expected. As always if you find a bug report it as a Github Issue.)
- Project Bookmarks<br>
        - Have a few favorite projects you need to go back and forth on? use this helpful option to pin up to 4 projects on the home screen for easy access.
- Auto Login for School Accounts<br>
## Installation
 1. Install the free Tampermonkey extension [[Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)][[Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)]
 2. Navigate to any page, preferably [studio.code.org](https://studio.code.org)
 3. Click on the tampermonkey icon, you may have to open the extensions menu on google chrome
 4. Click "Create a new script"
 5. Copy the code from [userScript.js](https://raw.githubusercontent.com/pikapower9080/cdo-plus/main/userScript.js) and replace everything in the current editor that popped up with what you copied.
 6. Save your script by press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd> or by pressing file > save in the menu
 7. Visit [studio.code.org](https://studio.code.org) and see if it worked! You'll know if a window on the side pops up when you press the right shift key.
 8. See the usage guide for more information on how to use the script.

 ## Usage

 On most studio.code.org pages, you'll be able to load the console by pressing the shift key on the right side of your keyboard (right shift). The settings are pretty self explanatory and save in between visits.

 ## Updating

 The script should automatically update, but if there were to be a loader update, you'd need to repeat steps 5-7 in the installation guide to update your loader script. The loader script is extremely simple and won't be updated often unless there is a critical bug fix.
 ## FAQs
 
 - Q: I found a page that looks incorrect when using dark mode, how do I fix this? 
 - A: This is a problom with the CSS used to style dark mode, either make a pull requset and fix it yourself or you can create a Github Issue and put the link to the page that doesn't work.
 - Q: My Project History isn't updating when I go to a project.
 - A: The Project History Setting is in Beta, meaning that it is still in active development, and there are many bugs. If you find a bug, use Github Issues to notify the developers.
 - Q: Does the Auto-Login Option steal my username and Password?
 - A: No, all of the infromation you put into CodePlus stays there, and we cannot acess any of it. If you do not feel safe using it, you can just turn the option off.
 - Q: Why do some options not change when I turn them on/off, or change their values?
 - A: Some options need you to reload the page for them to take affect.
 
 ## Contributing

 If you would like to add anything to Code.org Plus, feel free to fork it then make a pull request. Any html, css, or js files will be automatically minified and copied into the dist branch when we merge your changes.

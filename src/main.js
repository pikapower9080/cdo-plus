// ==UserScript==
// @name         Code.org+
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Adds a lot of usefull features to the code.org gamelab
// @author       DrSmashsenstien & Pikapower9080
// @match        https://studio.code.org/s/*/lessons/*/levels/*
// @match        https://studio.code.org/projects/gamelab/*
// @match        https://studio.code.org/sections/*
// @match        https://studio.code.org/users/sign_in
// @match        https://studio.code.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=code.org
// @grant        none
// ==/UserScript==
var fullscreenStage = false;
var fSS = document.createElement('div');
window.cpHistory = [];
if (!localStorage.getItem("cphistory")) {
    localStorage.setItem("cphistory", "[]");
}
fSS.setAttribute('style', 'top:0px; left:0px; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.75); position:fixed; backdrop-filter:blur(3px);');
fSS.id = "fSS";
fSS.style.display = "none";
fSS.style.zIndex = 9998
fSS.innerHTML = `<button id="insideFullscreen" style="z-index:9999; position:fixed; top:10px; right:10px;">Exit Fullscreen</button>`
document.body.appendChild(fSS);
document.getElementById('insideFullscreen').addEventListener("click", () => { fullscreen(); })
var codePlusMenu = document.createElement('div');
codePlusMenu.setAttribute('style', 'padding:5px; position:fixed; top:0px; right:0px; height:100%; width:500px; background-color:rgba(255, 255, 255, 0.75); border:solid 1px #000000; overflow-y:scroll; backdrop-filter:blur(5px);');
codePlusMenu.style.zIndex = 999999;
codePlusMenu.id = "codePlusMenu";
codePlusMenu.active = false;
codePlusMenu.style.display = "none"
codePlusMenu.innerHTML = `
    <h2>Colors</h2>
    <hr>
    <h3>Custom Syntax Highlighting</h3>
    <p>
    Numbers
    <input id="customSyntaxNumeric" name="numbers" type="color" value="#0000cd">
    </p>
    <p>
    Classes / Constants
    <input id="customSyntaxIdentifier" name="Identifiers" type="color">
    </p>
    <p>
    Keywords
    <input id="customSyntaxStorage" name="Definitions" type="color" value="#930F80">
    </p>
    <p>
    Functions / methods
    <input id="customSyntaxFunction" name="Functions" type="color" value="#0000A2">
    </p>
    <p>
    Main
    <input id="customSyntaxGeneral" name="General" type="color">
    </p>
    <p>
    Parenthasees
    <input id="customSyntaxParen" name="Paren" type="color">
    </p>
    <p>
    Support Functions
    <input id="customSyntaxSupport" name="Support" type="color">
    </p>
    <p>
    Strings
    <input id="customSyntaxString" name="Strings" type="color" value="#1a1aa6">
    </p>
    <p>
    Comments
    <input id="customSyntaxComment" name="Comments" type="color" value="#236e24">
    </p>
        Default profiles: <br>
        <button class="themePrefix" prefix="default">Code.org Default</button>
        <button class="themePrefix" prefix="vscodeDark">VS-Code dark</button>
        <button class="themePrefix" prefix="vscodeLight">VS-Code light</button>
        <button class="themePrefix" prefix="atomDark">Atom Dark</button>
        <button class="themePrefix" prefix="dracula">Dracula Theme</button>
        <button class="themePrefix" prefix="firefox">Firefox Devtools Theme</button>
    <h3>Header Color</h3>
    <input id="customHeaderColor" name="header" type="color" value="#00acbc">
    <h3>Debug / Info Color</h3>
    <input id="customDebugColor" name="header" type="color" value="#cfc9de">
    <h3>Code Header Color</h3>
    <input id="customCodeColor" name="header" type="color" value="#7665a0">
    <h3>Dark Mode</h3>
    <label class="switch">
      <input id="customDarkMode" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h2>Prettify Button</h2>
    <hr>
    <label class="switch">
      <input id="customPrettyButton" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h3>Indent Length</h3>
    <input type="number" id="customPrettyButtonIndentLength" min="1" value="4">
    <h3>Indent with tabs</h3>
    <label class="switch">
      <input id="customPrettyButtonTabs" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h2>Stage Fullscreen Button</h2>
        <hr>
     <label class="switch">
      <input id="customFullscreenButton" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h3>Fullscreen Scale Factor</h3>
    <input type="range" id="customFullscreenScaleFactor" min="1" value="2" max="4" step="0.1">
    <h2>Fixed Position Header</h2>
    <label class="switch">
      <input id="customFixedHeaderPos" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h2>Auto-Login</h2>
    <hr>
    <label class="switch">
      <input id="customAutoLogin" type="checkbox">
      <span class="slider round"></span>
    </label>
    <h3>Section Code</h3>
    <input type="text" id="customAutoLoginSectionNumber">
    <h3>User Number</h3>
    <input type="number" id="customAutoLoginUserNumber" min="1" max="100">
    <p>User Number is the number of the button of your name on the login screen</p>
    <h3>Password</h3>
    <input type="password" id="customAutoLoginPassword">
    <p>Note: password is stored in localStorage, so don't share that with anyone</p>
    <h2>Auto-hide Toolbox</h2>
    <hr>
    <label class="switch">
        <input id="customAutoToolbox" type="checkbox">
        <span class="slider round"></span>
    </label>
    <h2>Replace Homescreen with Bookmarks & Recent Projects</h2>
    <hr>
    <label class="switch">
        <input id="customFeaturedProjects" type="checkbox">
        <span class="slider round"></span>
    </label>
    <h3>Project 1</h3>
        URL
        <input type="text" id="customFeaturedProjects1Url"><br>
        Name
        <input type="text" id="customFeaturedProjects1Name"><br>
    <h3>Project 2</h3>
        URL
        <input type="text" id="customFeaturedProjects2Url"><br>
        Name
        <input type="text" id="customFeaturedProjects2Name"><br>
    <h3>Project 3</h3>
        URL
        <input type="text" id="customFeaturedProjects3Url"><br>
        Name
        <input type="text" id="customFeaturedProjects3Name">
    <h3>Project 4</h3>
        URL
        <input type="text" id="customFeaturedProjects4Url"><br>
        Name
        <input type="text" id="customFeaturedProjects4Name">
    <br>
    <input type="text" id="customRecentProject" style="display:none;">
    <input type="text" id="customRecentProjectUrl" style="display:none;">
    <br>
    <br>
`;
var beautifyScript = document.createElement("script");
beautifyScript.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js"
document.head.appendChild(beautifyScript)
var syntaxStyles = document.createElement('style');
syntaxStyles.id = "customSyntaxStyles";
document.body.appendChild(codePlusMenu)
document.body.appendChild(syntaxStyles)
//functions
function syntaxStyling() {
    const element = document.getElementById('customSyntaxStyles');
    element.innerHTML = `
    span.ace_identifier {
        color:${document.getElementById('customSyntaxIdentifier').value} !important;
    }
    span.ace_storage.ace_type {
        color:${document.getElementById('customSyntaxStorage').value} !important;
    }
    span.ace_string {
        color:${document.getElementById('customSyntaxString').value} !important;
    }
    span.ace_keyword {
        color:${document.getElementById('customSyntaxParen').value} !important;
    }
    span.ace_comment {
        color:${document.getElementById('customSyntaxComment').value} !important;
    }
    .ace_function {
        color:${document.getElementById('customSyntaxFunction').value} !important;
    }
    span.ace_operator {
        color:${document.getElementById('customSyntaxGeneral').value} !important;
    }
    span.ace_paren {
        color:${document.getElementById('customSyntaxParen').value} !important;
    }
    span.ace_variable {
        color:${document.getElementById('customSyntaxIdentifier').value} !important;
    }
    span.ace_constant {
        color:${document.getElementById('customSyntaxSupport').value} !important;
    }
    span.ace_numeric{
        color:${document.getElementById('customSyntaxNumeric').value} !important;
    }
    .header-wrapper>div,
    #hamburger-contents{
        background-color:${document.getElementById('customHeaderColor').value} !important;
    }
    #hamburger-contents>div.divider {
        background-color:${document.getElementById('customHeaderColor').value} !important;
        filter:brightness(90%);
    }
    .header_button {
        background-color:${document.getElementById('customHeaderColor').value} !important;
    }
    .ace_scroller {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#1e1e1e" : "#ffffff"} !important;
        caret-color:${document.getElementById('customDarkMode').checked == true ? "white" : "#000000"} !important;
    }
    .ace_gutter-layer {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#1e1e1e" : "#ebebeb"} !important;
        caret-color:${document.getElementById('customDarkMode').checked == true ? "white" : "#000000"} !important;
    }
    .ace_gutter-cell {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#1e1e1e" : ""} !important;
        color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    #visualizationColumn {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#000000" : ""} !important;
    }
    .wrapper,
    #debug-console,
    #debug-console>div>input,
    #debug-watch,
    #debug-watch>div>input {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#000000" : ""} !important;
        caret-color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
        color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    .small-footer-base {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#000000" : ""} !important;
    }
    .ace_cursor {
        color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    div.ace_autocomplete>div {
        color:${document.getElementById('customDarkMode').checked == true ? "rgb(230, 230, 230)" : ""} !important;
    }
    span.ace_completion-highlight {
        color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    .ui-personal-projects-row,
    .ui-personal-projects-table>*>tr>*,
    #uitest-gallery-switcher,
    .instructions-markdown,
    #scroll-container,
    .instructions-markdown>div>*,
    ul.students>li,
    .uitest-progress-lesson,
    .progress-legend>*>*,
    .uitest-bubble-choice
    {
        background-color:${document.getElementById('customDarkMode').checked == true ? "#000000" : ""} !important;
        color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    .xAZuQT7dhqVzvMzgkSSW, .uitest-helpTab, .uitest-instructionsTab {
       background-color:${document.getElementById('customDebugColor').value} !important;
       color:${document.getElementById('customDarkMode').checked == true ? "white" : ""} !important;
    }
    .f31XfAP_xkeHPJNAhV_J, .VVG6EAovSM6SB3sZxyQg {
       background-color:${document.getElementById('customCodeColor').value};
    }
    .E65uU5qEZjZEq7MK8tJT {
       background-color:${document.getElementById('customCodeColor').value};
    }

    /*Code Plus styles*/
    input[type="color"] {
        width: 50px;
        height:30px;
        border:none;
    }
    .switch{position:relative;display:inline-block;width:60px;height:34px;}.switch input {opacity: 0;width: 0;height: 0;}.slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}.slider:before {position: absolute;content: "";height: 26px;width: 26px;left: 4px;bottom: 4px;background-color: white;-webkit-transition: .4s;transition: .4s;}input:checked + .slider {background-color: green;}input:focus + .slider {box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before {-webkit-transform: translateX(26px);-ms-transform: translateX(26px);transform: translateX(26px);}.slider.round {border-radius: 34px;}.slider.round:before {border-radius: 50%;}
    `
};
const themes = {
    "vscodeDark": {
        "customSyntaxComment": "#6a9955",
        "customSyntaxString": "#ce9178",
        "customSyntaxStorage": "#569cd6",
        "customSyntaxIdentifier": "#9cdcfe",
        "customSyntaxNumeric": "#b5cea8",
        "customSyntaxFunction": "#dcdcaa",
        "customSyntaxGeneral": "#d4d4d4",
        "customSyntaxParen": "#da70d6",
        "customSyntaxSupport": "#9cdcfe"
    },
    "vscodeLight": {
        "customSyntaxComment": "#008000",
        "customSyntaxString": "#a31515",
        "customSyntaxStorage": "#0000ff",
        "customSyntaxIdentifier": "#001080",
        "customSyntaxNumeric": "#098658",
        "customSyntaxFunction": "#795e26",
        "customSyntaxGeneral": "#000000",
        "customSyntaxParen": "#0431fa",
        "customSyntaxSupport": "#001080"
    },
    "atomDark": {
        "customSyntaxComment": "#5c6370",
        "customSyntaxString": "#98c379",
        "customSyntaxStorage": "#c678dd",
        "customSyntaxIdentifier": "#abb2bf",
        "customSyntaxNumeric": "#d19a66",
        "customSyntaxFunction": "#61afef",
        "customSyntaxGeneral": "#abb2bf",
        "customSyntaxParen": "#ffd700",
        "customSyntaxSupport": "#e06c75"
    },
    "default": {
        "customSyntaxComment": "#236e24",
        "customSyntaxString": "#1a1aa6",
        "customSyntaxStorage": "#930F80",
        "customSyntaxIdentifier": "#000000",
        "customSyntaxNumeric": "#0000cd",
        "customSyntaxFunction": "#0000A2",
        "customSyntaxGeneral": "#000000",
        "customSyntaxParen": "#000000",
        "customSyntaxSupport": "#069604"
    },
    "dracula": {
        "customSyntaxComment": "#6272a4",
        "customSyntaxString": "#f1fa8c",
        "customSyntaxStorage": "#ff79c6",
        "customSyntaxIdentifier": "#f8f8f2",
        "customSyntaxNumeric": "#bd93f9",
        "customSyntaxFunction": "#50fa7b",
        "customSyntaxGeneral": "#ff79c6",
        "customSyntaxParen": "#ff79c6",
        "customSyntaxSupport": "#f8f8f2"
    },
    "firefox": {
        "customSyntaxComment": "#6272a4",
        "customSyntaxString": "#6b89ff",
        "customSyntaxStorage": "#ff7de9",
        "customSyntaxIdentifier": "#75bfff",
        "customSyntaxNumeric": "#6b89ff",
        "customSyntaxFunction": "#86de74",
        "customSyntaxGeneral": "#b1b1b3",
        "customSyntaxParen": "#ffd700",
        "customSyntaxSupport": "#b98eff"
    },
    "sublimeMaterial": {
        "customSyntaxComment": "#6272a4",
        "customSyntaxString": "#6b89ff",
        "customSyntaxStorage": "#ff7de9",
        "customSyntaxIdentifier": "#75bfff",
        "customSyntaxNumeric": "#6b89ff",
        "customSyntaxFunction": "#86de74",
        "customSyntaxGeneral": "#b1b1b3",
        "customSyntaxParen": "#ffd700",
        "customSyntaxSupport": "#b98eff"
    }

}
function loadPrefix(type) {
    let theme = themes[type]
    for (let k in theme) {
        document.getElementById(k).value = theme[k]
    }
    saveOptions();
}
function mainLoop() {
    syntaxStyling();
    if (document.querySelectorAll('.lesson-group>div')[1]) {
        if (document.getElementById('customDarkMode').checked) {
            document.querySelectorAll('.lesson-group>div')[1].style.backgroundColor = "rgb(25, 25, 25)";
        } else {
            document.querySelectorAll('.lesson-group>div')[1].style.backgroundColor = ""
        }
    }
};
document.addEventListener("keydown", (e) => {
    if (e.key == "Shift" && e.location == 2) {
        codePlusMenu.active = !codePlusMenu.active;
        if (codePlusMenu.active) {
            document.getElementById("codePlusMenu").style.display = "block";
        } else {
            document.getElementById("codePlusMenu").style.display = "none";
        }
    };
    if (e.key == "Alt" && e.location == 2) {
        if (codePlusMenu.active == false) {
            if (fullscreenStage) {
                fullscreen();
                codePlusMenu.active = false;
                document.getElementById("codePlusMenu").style.display = "none";

            } else {
                document.getElementById('resetButton').click();
                setTimeout(() => { document.getElementById('runButton').click(); }, 100);
            }
        } else {
            fullscreen();
            codePlusMenu.active = false;
            document.getElementById("codePlusMenu").style.display = "none";

        }
    };
    if (e.key == "Control" && e.location == 2 && codePlusMenu.active) {
        formatCode();
        codePlusMenu.active = false;
        document.getElementById("codePlusMenu").style.display = "none";

    }
});
document.body.onload = () => {
    if (document.getElementById('customAutoLogin').checked) {
        if (window.location.href.startsWith('https://studio.code.org/users/sign_in')) {
            document.getElementById('section_code').value = document.getElementById('customAutoLoginSectionNumber').value;
            document.querySelector('.section-sign-in>button').click();
        }
        if (window.location.href.startsWith('https://studio.code.org/sections/')) {
            document.querySelectorAll('ul.students>li')[parseInt(document.getElementById('customAutoLoginUserNumber').value) - 1].click()
            document.getElementById('secret_words').value = document.getElementById('customAutoLoginPassword').value;
            document.getElementById('login_button').disabled = "";
            document.getElementById('login_button').click();
        };
    };
    if (document.getElementById('customFixedHeaderPos').checked) {
        document.getElementsByClassName('header')[0].style.position = "fixed";
        document.getElementsByClassName('header')[0].style.zIndex = 998;
    };
    if (document.getElementById('customAutoToolbox').checked && window.location.href.startsWith('https://studio.code.org/projects/gamelab/') || window.location.href.startsWith('https://studio.code.org/s/')) {
        setTimeout(() => {
            document.getElementById("hide-toolbox-icon").click();
        }, 1000);
    }
    if (window.location.href.startsWith('https://studio.code.org/s/') || window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
        if (document.getElementById('customFeaturedProjects').checked) {
            if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) { setTimeout(() => { document.querySelector('.project_share').click() }, 1000) }
            setTimeout(() => {
                if (window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                    setTimeout(() => { document.getElementById('customRecentProject').value = location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0] }, 0);
                } else {
                    setTimeout(() => { document.getElementById('customRecentProject').value = document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0] }, 0);
                }
                if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                    document.getElementById("customRecentProjectUrl").value = location.href;
                }
                if (!cpHistory.length == 0) {
                    if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                        if (cpHistory[cpHistory.length - 1].id != document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0]) {
                            cpHistory.push({ id: document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0], url: location.href, title: document.title })
                        }
                    } else {
                        if (cpHistory[cpHistory.length - 1].id != location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0]) {
                            cpHistory.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                        }
                    }
                    if (cpHistory[cpHistory.length - 1].id != document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0]) {
                        if (window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                            cpHistory.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                        } else {
                        }
                    }
                } else {
                    if (window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                        cpHistory.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                    } else {
                        cpHistory.push({ id: document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0], url: location.href, title: document.title })
                    }
                }
                if (cpHistory.length > 100) {
                    cpHistory.splice("1", 0)
                }
                if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) { setTimeout(() => { document.querySelector(".modal-backdrop").click(); saveOptions(); }, 100) }
            }, 1200)
            setTimeout(saveOptions, 1200)
        }
    }
    if (document.getElementById('customFeaturedProjects').checked && window.location.href.startsWith('https://studio.code.org/home')) {
        document.querySelector('.container.main>div[style]').innerHTML = `
        <div data-radium="true" style="font-size: 24px; line-height: 26px; color: rgb(91, 103, 112); float: left; padding-right: 20px;">Featured Projects</div>
        <br>
        <br>
        <div style="background-color:${document.getElementById('customHeaderColor').value}; filter:brightness(80%); border-radius:2px; padding:5px;">
        <table>
        <tbody>
          <tr>
          <td style="padding:10px;">
          <a href="${document.querySelector('#customRecentProjectUrl').value}">
          <h3 style="display:${document.querySelector('#customRecentProject').value.length > 0 ? 'block' : 'none'};">Recent Project</h3>
          <img src="https://studio.code.org/v3/files/${document.querySelector('#customRecentProject').value.replace("https://studio.code.org/projects/gamelab/", "")}/.metadata/thumbnail.png" width="150px"style="display:${document.querySelector('#customRecentProject').value.length > 0 ? 'block' : 'none'};">
          </a>
          </td>
            <td style="padding:10px;">
            <a href="${document.querySelector('#customFeaturedProjects1Url').value}">
            <h3 style="display:${document.querySelector('#customFeaturedProjects1Url').value.length > 0 ? 'block' : 'none'};">${document.querySelector('#customFeaturedProjects1Name').value}</h3>
            <img src="https://studio.code.org/v3/files/${document.querySelector('#customFeaturedProjects1Url').value.replace("https://studio.code.org/projects/gamelab/", "")}/.metadata/thumbnail.png" width="150px" style="display:${document.querySelector('#customFeaturedProjects1Url').value.length > 0 ? 'block' : 'none'};">
            </a>
            </td>
            <td style="padding:10px;">
                <a href="${document.querySelector('#customFeaturedProjects2Url').value}">
            <h3 style="display:${document.querySelector('#customFeaturedProjects2Url').value.length > 0 ? 'block' : 'none'};">${document.querySelector('#customFeaturedProjects2Name').value}</h3>
            <img src="https://studio.code.org/v3/files/${document.querySelector('#customFeaturedProjects2Url').value.replace("https://studio.code.org/projects/gamelab/", "")}/.metadata/thumbnail.png" width="150px" style="display:${document.querySelector('#customFeaturedProjects2Url').value.length > 0 ? 'block' : 'none'};">
            </a>
            </td>
            <td style="padding:10px;">
                <a href="${document.querySelector('#customFeaturedProjects3Url').value}">
            <h3 style="display:${document.querySelector('#customFeaturedProjects3Url').value.length > 0 ? 'block' : 'none'};">${document.querySelector('#customFeaturedProjects3Name').value}</h3>
            <img src="https://studio.code.org/v3/files/${document.querySelector('#customFeaturedProjects3Url').value.replace("https://studio.code.org/projects/gamelab/", "")}/.metadata/thumbnail.png" width="150px"style="display:${document.querySelector('#customFeaturedProjects3Url').value.length > 0 ? 'block' : 'none'};">
            </a>
            </td>
            <td style="padding:10px;">
            <a href="${document.querySelector('#customFeaturedProjects4Url').value}">
        <h3 style="display:${document.querySelector('#customFeaturedProjects4Url').value.length > 0 ? 'block' : 'none'};">${document.querySelector('#customFeaturedProjects4Name').value}</h3>
        <img src="https://studio.code.org/v3/files/${document.querySelector('#customFeaturedProjects4Url').value.replace("https://studio.code.org/projects/gamelab/", "")}/.metadata/thumbnail.png" width="150px" style="display:${document.querySelector('#customFeaturedProjects4Url').value.length > 0 ? 'block' : 'none'};">
        </a>
        </td>
          </tr>
        </tbody>
        </table>
        </div>
        <button id="recentProjects">View Recent Project History</button>
        `
    }
    if (true && window.location.href.startsWith("https://studio.code.org/home")) {
        setTimeout(() => {
            document.getElementById("recentProjects").addEventListener("click", () => {
                let newEle = document.createElement("div");
                newEle.id = "recentPopup";
                newEle.setAttribute("style", "position:fixed; left:50%; top:50%; transform:translate(-50%, -50%); width:70%; height:70%; z-index:9999; background-color:rgba(0, 0, 0, 0.76); padding:8px; border-radius:7px; overflow-y:scroll;");
                newEle.innerHTML = "<button style='position:fixed; top:0px; right:0px;' onclick='this.parentElement.remove()'>x</button><input class='recentSearchBar' placeholder='Search Tab Names' style='position:fixed; top:0px; left:0px;'>";
                cpHistory.reverse()
                for (let i = 0; i < cpHistory.length; i++) {
                    const h = cpHistory[i];
                    newEle.innerHTML += `<a href="${h.url}"> <img title="${h.title}" src="https://studio.code.org/v3/files/${h.id}/.metadata/thumbnail.png" width="150px" style="border:solid white 1px; border-radius:5px;"></a>`
                }
                document.body.appendChild(newEle);
                document.getElementsByClassName("recentSearchBar")[0].oninput = () => {
                    let searchQ = document.getElementsByClassName("recentSearchBar")[0].value
                    for (let i = 0; i < document.querySelectorAll('#recentPopup>a').length; i++) {
                        const p = document.querySelectorAll("#recentPopup>a")[i];
                        if (p.children[0].title.toLowerCase().includes(searchQ.toLowerCase()) || searchQ.trim().length == 0) {
                            p.style.display = "";
                        } else {
                            p.style.display = "none";
                        }
                    }
                }

                cpHistory.reverse()

            })
        }, 1000);
    }
}
// Handle prefix buttons
document.querySelectorAll("button.themePrefix").forEach((element) => {
    element.addEventListener("click", () => { loadPrefix(element.getAttribute("prefix")); });
})
// Handle saving
let settingChildren = codePlusMenu.querySelectorAll("input")
let saveSettings = [];
function getSetting(settingId) {
    return document.querySelector(`#${settingId}`);
}
function getSettingValue(setting) {
    return setting.value == "on" ? setting.checked : setting.value
}
function saveOptions() {
    localStorage.setItem("cphistory", JSON.stringify(cpHistory));
    let save = {}
    saveSettings.forEach((setting) => {
        setting = getSetting(setting)
        if (setting) {
            save[setting.getAttribute("id")] = getSettingValue(setting)
        }
    })
    localStorage.setItem("cp", JSON.stringify(save))
}
function loadOptions() {
    cpHistory = JSON.parse(localStorage.getItem("cphistory"))
    if (localStorage.getItem("cdo-plus")) {
        localStorage.setItem("cp", localStorage.getItem("cdo-plus"));
        localStorage.removeItem("cdo-plus");
    }
    const savedSave = localStorage.getItem("cp")
    if (savedSave) {
        const saveData = JSON.parse(savedSave)
        if (saveData) {
            for (let k in saveData) {
                const settingElement = getSetting(k)
                if (settingElement) {
                    if (settingElement.type == "checkbox") {
                        settingElement.checked = saveData[k]
                    } else {
                        settingElement.value = saveData[k]
                    }
                }
            }
            syntaxStyling();
        } else {
            alert("Failed to parse save data")
        }
    }
}
loadOptions();
for (let i in settingChildren) {
    const setting = settingChildren[i]
    if (setting && typeof (setting) == "object" && 'getAttribute' in setting && setting.getAttribute("id")) {
        saveSettings.push(setting.getAttribute("id"))
        setting.addEventListener("input", () => {
            saveOptions()
            syntaxStyling()
        })
    }
}
setInterval(mainLoop, 50);
// Format Button
function formatCode() {
    __mostRecentGameLabInstance.studioApp_.editor.aceEditor.setValue(js_beautify(__mostRecentGameLabInstance.studioApp_.editor.aceEditor.getValue(), { "indent_size": parseInt(document.getElementById('customPrettyButtonIndentLength').value), "indent_with_tabs": document.getElementById('customPrettyButtonTabs').checked }))
}
function fullscreen() {
    fullscreenStage = !fullscreenStage;
    if (fullscreenStage) {
        document.getElementById('divGameLab').setAttribute('style', 'height:400px; width:400px; position:fixed; transform:scale(' + document.getElementById('customFullscreenScaleFactor').value + ') translate(-50%, -50%); left:50%; top:50%; z-index:9999;');
        fSS.style.display = "block";
    } else {
        document.getElementById('divGameLab').setAttribute('style', 'height:400px; width:400px;');
        fSS.style.display = "none";
    };
};
var checkIfHeaderMiddleLoaded = setInterval(function () {
    if (document.querySelector("div.project_info>div")) {
        setTimeout(function () {
            let newBtn = document.createElement("button");
            newBtn.innerText = "Prettify";
            newBtn.className = "prettify_button header_button no-mc header_button_light";
            newBtn.setAttribute('style', "margin: 0px 0px 0px 10px; box-shadow: none; z-index:999;");
            newBtn.type = "button";
            if (document.getElementById('customPrettyButton').checked) {
                document.querySelector("div.project_info>div").appendChild(newBtn);
            };
            newBtn.addEventListener("click", formatCode);
            let oldWidth = document.querySelector("div#project_info_container").style.width;
            document.querySelector("div#project_info_container").style.width = `calc(${oldWidth} + 100px)`;
            let oldPadWidth = document.getElementById('left_padding').style.width;
            document.getElementById('left_padding').style.width = `calc(${oldPadWidth} - 100px)`;
        }, 1000);
        clearInterval(checkIfHeaderMiddleLoaded);
    };
}, 100);
var topbar = setInterval(function () {
    if (document.getElementById("playSpaceHeader")) {
        setTimeout(function () {
            let newBtn = document.createElement("button");
            newBtn.innerHTML = 'Fullscreen';
            newBtn.className = "fullscreen_button";
            newBtn.setAttribute('style', "display: inline-block; vertical-align: top; border-style: solid; border-color: rgb(148, 156, 162); border-top-width: 1px; border-bottom-width: 1px; border-left-width: 1px; margin: 0px 0px 8px; padding: 2px 6px; font-size: 14px; border-radius: 0px 4px 4px 0px; background-color: rgb(255, 255, 255); color:rgb(148, 156, 162);");
            newBtn.type = "button";
            if (document.getElementById('customFullscreenButton').checked) {
                document.querySelector("#playSpaceHeader>span").appendChild(newBtn);
                document.getElementById('animationMode').style.borderRadius = "0px";
            };
            newBtn.addEventListener("click", fullscreen);
        }, 1000);
        clearInterval(topbar);
    };
}, 100);
//https://forum.code.org/t/dark-mode-view-of-code-studio/35813/4
/*
settings example 1
{
  "customSyntaxNumeric": "#b5cea8",
  "customSyntaxIdentifier": "#9cdcfe",
  "customSyntaxStorage": "#569cd6",
  "customSyntaxFunction": "#dcdcaa",
  "customSyntaxGeneral": "#d4d4d4",
  "customSyntaxParen": "#da70d6",
  "customSyntaxSupport": "#9cdcfe",
  "customSyntaxString": "#ce9178",
  "customSyntaxComment": "#6a9955",
  "customHeaderColor": "#b80000",
  "customDebugColor": "#d60000",
  "customCodeColor": "#000000",
  "customDarkMode": true,
  "customPrettyButton": true,
  "customPrettyButtonIndentLength": "2",
  "customPrettyButtonTabs": true,
  "customFullscreenButton": true,
  "customFullscreenScaleFactor": "1.5",
  "customFixedHeaderPos": true,
  "customAutoLogin": true,
  "customAutoLoginSectionNumber": "ZHMHYP",
  "customAutoLoginUserNumber": "3",
  "customAutoLoginPassword": "made trade",
  "customAutoToolbox": true,
  "customFeaturedProjects": true,
  "customFeaturedProjects1Url": "https://studio.code.org/projects/gamelab/lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg",
  "customFeaturedProjects1Name": "Covid 19 Shooter",
  "customFeaturedProjects2Url": "https://studio.code.org/projects/gamelab/lGgvfqnucydwidrkX_NHO7hwzzzRd2Zl3A10V7XfTiw",
  "customFeaturedProjects2Name": "Aquarium Scene",
  "customFeaturedProjects3Url": "https://studio.code.org/projects/gamelab/H1lpxKtCRgLh3V7UeP12jgw3_V5rgzvrj9vmlNo8sT0",
  "customFeaturedProjects3Name": "Pidgeotto Mail",
  "customFeaturedProjects4Url": "https://studio.code.org/projects/gamelab/O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o",
  "customFeaturedProjects4Name": "Plants vs Zombies",
  "customRecentProject": "O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o",
  "customRecentProjectUrl": "https://studio.code.org/projects/gamelab/O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o/view"
}
*/
/*
history example 1
[
  {
    "id": "lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg",
    "url": "https://studio.code.org/projects/gamelab/lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg/edit",
    "title": "Game Lab - Code.org"
  },
  {
    "id": "O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o",
    "url": "https://studio.code.org/projects/gamelab/O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o/view",
    "title": "Plants vs Zombies - Game Lab - Code.org"
  },
  {
    "id": "H1lpxKtCRgLh3V7UeP12jgw3_V5rgzvrj9vmlNo8sT0",
    "url": "https://studio.code.org/projects/gamelab/H1lpxKtCRgLh3V7UeP12jgw3_V5rgzvrj9vmlNo8sT0/edit",
    "title": "My Project - Game Lab - Code.org"
  },
  {
    "id": "lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg",
    "url": "https://studio.code.org/projects/gamelab/lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg/edit",
    "title": "Code.org"
  },
  {
    "id": "O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o",
    "url": "https://studio.code.org/projects/gamelab/O1_CBy2qjM2_v6EHiXoSjMm7o0ctKCy5eHSQDqZnW_o/view",
    "title": "Plants vs Zombies - Game Lab - Code.org"
  },
  {
    "id": "CVHNjwZfcibFWOwSWg59JkHIvFTkOmYpj_xWE8829mQ",
    "url": "https://studio.code.org/projects/gamelab/CVHNjwZfcibFWOwSWg59JkHIvFTkOmYpj_xWE8829mQ/view",
    "title": "Basic Tower Defense - Game Lab - Code.org"
  },
  {
    "id": "4fCMc4exEvpjxFXFqrdSC5YJUeTeZnF57IMz3uceJ48",
    "url": "https://studio.code.org/projects/gamelab/4fCMc4exEvpjxFXFqrdSC5YJUeTeZnF57IMz3uceJ48/view",
    "title": "impossible game - Game Lab - Code.org"
  },
  {
    "id": "JkSTE2kcYcExWyGHR80hrWb9RGS9qgGe3JVCwBoKI6g",
    "url": "https://studio.code.org/projects/gamelab/JkSTE2kcYcExWyGHR80hrWb9RGS9qgGe3JVCwBoKI6g/view",
    "title": "Remix: The Lock - Game Lab - Code.org"
  },
  {
    "id": "xf_HIP_CjfCwM2c2bPdDCZwQ9nQLlhnubkCikG3K9M4",
    "url": "https://studio.code.org/projects/gamelab/xf_HIP_CjfCwM2c2bPdDCZwQ9nQLlhnubkCikG3K9M4/view",
    "title": "balloon buster 1 - Game Lab - Code.org"
  },
  {
    "id": "8TXYr7dkjjCWgiJoBY3shPhDhj7BY2j3n79veXrEoko",
    "url": "https://studio.code.org/projects/gamelab/8TXYr7dkjjCWgiJoBY3shPhDhj7BY2j3n79veXrEoko/view",
    "title": "MARIO - Game Lab - Code.org"
  },
  {
    "id": "HbAzqGjRQ0Yi3sz9WwOWLDUk6Bl0HjHV8ABSoABhqj0",
    "url": "https://studio.code.org/projects/gamelab/HbAzqGjRQ0Yi3sz9WwOWLDUk6Bl0HjHV8ABSoABhqj0/view",
    "title": "Super Mario Game - Game Lab - Code.org"
  },
  {
    "id": "QtLZg-g1C2BTAtd4kDuCwNJNw7akuqM6usX8t8_lndc",
    "url": "https://studio.code.org/projects/gamelab/QtLZg-g1C2BTAtd4kDuCwNJNw7akuqM6usX8t8_lndc/view",
    "title": "Sonic Green Hill Zone! - Game Lab - Code.org"
  },
  {
    "id": "RQuZftQBEsR7M6qDV2VlTKcyS405F9Wx55BAjqADN8k",
    "url": "https://studio.code.org/projects/gamelab/RQuZftQBEsR7M6qDV2VlTKcyS405F9Wx55BAjqADN8k/view",
    "title": "hardest game of minecraft - Game Lab - Code.org"
  },
  {
    "id": "4RHd62pt_ejt6B03FBex6N5-dPfEggoLL7wwjW36lF0",
    "url": "https://studio.code.org/projects/gamelab/4RHd62pt_ejt6B03FBex6N5-dPfEggoLL7wwjW36lF0/view",
    "title": "project 1 - Game Lab - Code.org"
  },
  {
    "id": "UDxxrq-iHVkH1yH04OXGCrs_swbwar6NuDi_P0FBYYo",
    "url": "https://studio.code.org/projects/gamelab/UDxxrq-iHVkH1yH04OXGCrs_swbwar6NuDi_P0FBYYo/view",
    "title": "Remix: Remix: THE LEGEND OF ZELDA - Game Lab - Code.org"
  },
  {
    "id": "lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg",
    "url": "https://studio.code.org/projects/gamelab/lOtzeyOI3FNFFWRWgN-o3Ti7KmXGKlYKHmVdKl5x7Sg/edit",
    "title": "Game Lab - Code.org"
  }
]
*/
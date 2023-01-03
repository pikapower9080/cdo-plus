// ==UserScript==
// @name         Code.org+
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Adds a lot of useful features to the code.org gamelab
// @author       DrSmashsenstien & Pikapower9080
// @match        https://studio.code.org/s/*/lessons/*/levels/*
// @match        https://studio.code.org/projects/gamelab/*
// @match        https://studio.code.org/sections/*
// @match        https://studio.code.org/users/sign_in
// @match        https://studio.code.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=code.org
// @grant        none
// ==/UserScript==

window.cdop = {}

cdop.fullscreenStage = false;
cdop.fSS = document.createElement('div'); // full screen stage
cdop.localStorageKey = "cdo-plus"
cdop.history = [];
if (!localStorage.getItem("cdopHistory")) {
    localStorage.setItem("cdopHistory", "[]");
}
cdop.fSS.id = "fSS";
cdop.fSS.style.display = "none";
cdop.fSS.style.zIndex = 9998
cdop.fSS.innerHTML = `<button id="insideFullscreen">Exit Fullscreen</button>`
document.body.appendChild(cdop.fSS);
document.getElementById('insideFullscreen').addEventListener("click", () => { cdop.fullscreen(); })
cdop.menu = document.createElement('div');
cdop.menu.style.zIndex = 999999;
cdop.menu.id = "cdopMenu";
cdop.menu.active = false;
cdop.menu.style.display = "none"
cdop.menu.innerHTML = `
    <h1>Code.org Plus</h1>
    <hr>
    <button onclick="cdop.exportSettings()">Export Settings</button>
    <button onclick="cdop.importSettings()">Import Settings</button>
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
    Parentheses
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
    <h2>Nickname</h2>
    <hr>
    <label class="switch">
        <input id="customNicknameOn" type="checkbox">
        <span class="slider round"></span>
    </label><br>
    <input type="text" id="customNickname">
    <input type="text" id="customRecentProject" style="display:none;">
    <input type="text" id="customRecentProjectUrl" style="display:none;">
    <br>
    <br>
`;
cdop.beautifyScript = document.createElement("script");
cdop.beautifyScript.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautify.min.js"
document.head.appendChild(cdop.beautifyScript)
cdop.syntaxStyles = document.createElement('style');
cdop.syntaxStyles.id = "customcdop.syntaxStyles";
document.body.appendChild(cdop.menu);
document.body.appendChild(cdop.syntaxStyles);
//functions
cdop.syntaxStyling = function() {
    const element = document.getElementById('customcdop.syntaxStyles');
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
    #fSS{
        top:0px;
        left:0px;
        width:100%;
        height:100%;
        background-color:rgba(0, 0, 0, 0.75);
        position:fixed;
        backdrop-filter:blur(3px);
    }
    .fullscreen_button {
        display: inline-block;
        vertical-align: top;
        border-style: solid;
        border-color: rgb(148, 156, 162);
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        margin: 0px 0px 8px;
        padding: 2px 6px;
        font-size: 14px;
        border-radius: 0px 4px 4px 0px;
        background-color: rgb(255, 255, 255);
        color:rgb(148, 156, 162);
    }
    #cdopMenu{
        padding:5px;
        position:fixed;
        top:0px;
        right:0px;
        height:100%;
        width:500px;
        background-color:rgba(255, 255, 255, 0.75);
        border:solid 1px #000000;
        overflow-y:scroll;
        backdrop-filter:blur(5px);
    }
    #insideFullscreen{
        z-index:9999;
        position:fixed;
        top:10px;
        right:10px;
    }
    .switch{position:relative;display:inline-block;width:60px;height:34px;}.switch input {opacity: 0;width: 0;height: 0;}.slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}.slider:before {position: absolute;content: "";height: 26px;width: 26px;left: 4px;bottom: 4px;background-color: white;-webkit-transition: .4s;transition: .4s;}input:checked + .slider {background-color: green;}input:focus + .slider {box-shadow: 0 0 1px #2196F3;}input:checked + .slider:before {-webkit-transform: translateX(26px);-ms-transform: translateX(26px);transform: translateX(26px);}.slider.round {border-radius: 34px;}.slider.round:before {border-radius: 50%;}
    `
};
cdop.themes = {
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
cdop.loadPrefix = function(type) {
    let theme = cdop.themes[type]
    for (let k in theme) {
        document.getElementById(k).value = theme[k]
    }
    saveOptions();
}
cdop.mainLoop = function() {
    cdop.syntaxStyling();
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
        cdop.menu.active = !cdop.menu.active;
        if (cdop.menu.active) {
            cdop.menu.style.display = "block";
        } else {
            cdop.menu.style.display = "none";
        }
    };
    if (e.key == "Alt" && e.location == 2) {
        if (cdop.menu.active == false) {
            if (cdop.fullscreenStage) {
                cdop.fullscreen();
                cdop.menu.active = false;
                document.getElementById("cdop.menu").style.display = "none";

            } else {
                document.getElementById('resetButton').click();
                setTimeout(() => { document.getElementById('runButton').click(); }, 100);
            }
        } else {
            cdop.fullscreen();
            cdop.menu.active = false;
            document.getElementById("cdop.menu").style.display = "none";

        }
    };
    if (e.key == "Control" && e.location == 2 && cdop.menu.active) {
        cdop.formatCode();
        cdop.menu.active = false;
        document.getElementById("cdop.menu").style.display = "none";

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
    setTimeout(()=>{
    if (document.getElementById('customFixedHeaderPos').checked) {
        document.getElementsByClassName('header')[0].style.position = "fixed";
        document.getElementsByClassName('header')[0].style.zIndex = 998;
    };
    if (document.getElementById('customAutoToolbox').checked && window.location.href.startsWith('https://studio.code.org/projects/gamelab/') || window.location.href.startsWith('https://studio.code.org/s/')) {
            document.getElementById("hide-toolbox-icon").click();
    }
    }, 1000)
    if (window.location.href.startsWith('https://studio.code.org/s/') || window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
        if (document.getElementById('customFeaturedProjects').checked) {
            setTimeout(()=>{document.getElementById('runButton').click();}, 500)

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
                if (!cdop.history.length == 0) {
                    if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                        if (cdop.history[cdop.history.length - 1].id != document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0]) {
                            cdop.history.push({ id: document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0], url: location.href, title: document.title })
                        }
                    } else {
                        if (cdop.history[cdop.history.length - 1].id != location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0]) {
                            cdop.history.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                        }
                    }
                    if (cdop.history[cdop.history.length - 1].id != document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0]) {
                        if (window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                            cdop.history.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                        } else {
                        }
                    }
                } else {
                    if (window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) {
                        cdop.history.push({ id: location.href.replace('https://studio.code.org/projects/gamelab/', '').split("/")[0], url: location.href, title: document.title })
                    } else {
                        cdop.history.push({ id: document.querySelector('#project-share>div>div>img').src.replace('/v3/files/', '').split("/")[0], url: location.href, title: document.title })
                    }
                }
                if (cdop.history.length > 100) {
                    cdop.history.splice(1, 0)
                }
                if (!window.location.href.startsWith('https://studio.code.org/projects/gamelab/')) { setTimeout(() => { document.querySelector(".modal-backdrop").click(); saveOptions(); }, 100) }
            }, 1600)
            setTimeout(saveOptions, 1700)
        }
    }
        if(document.getElementById('customNicknameOn').checked){
            setTimeout(()=>{document.getElementById('header_display_name').innerText = document.getElementById('customNickname').value;}, 400)
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
                cdop.history.reverse()
                for (let i = 0; i < cdop.history.length; i++) {
                    const h = cdop.history[i];
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

                cdop.history.reverse()

            })
        }, 1000);
    }
}
// Handle prefix buttons
document.querySelectorAll("button.themePrefix").forEach((element) => {
    element.addEventListener("click", () => { cdop.loadPrefix(element.getAttribute("prefix")); });
})
// Handle saving
cdop.settingChildren = cdop.menu.querySelectorAll("input")
cdop.saveSettings = [];
function getSetting(settingId) {
    return document.querySelector(`#${settingId}`);
}
function getSettingValue(setting) {
    return setting.value == "on" ? setting.checked : setting.value
}
function saveOptions() {
    localStorage.setItem("cdopHistory", JSON.stringify(cdop.history));
    let save = {}
    cdop.saveSettings.forEach((setting) => {
        setting = getSetting(setting)
        if (setting) {
            save[setting.getAttribute("id")] = getSettingValue(setting)
        }
    })
    localStorage.setItem(cdop.localStorageKey, JSON.stringify(save))
}
function loadOptions() {
    cdop.history = JSON.parse(localStorage.getItem("cdopHistory"))
    if (localStorage.getItem("cp")) {
        localStorage.setItem(cdop.localStorageKey, localStorage.getItem("cdo-plus"));
        localStorage.removeItem("cp");
    }
    const savedSave = localStorage.getItem(cdop.localStorageKey)
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
            cdop.syntaxStyling();
        } else {
            alert("Failed to parse save data")
        }
    }
}
cdop.exportSettings = function() {
    const exportUrl = `data:application/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(cdop.localStorageKey))}`
    const link = document.createElement("a")
    link.download = "cdo-plus-backup.json"
    link.href = exportUrl
    link.click()
    link.remove()
}
cdop.importSettings = function() {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "application/json"
    fileInput.click()
    fileInput.addEventListener("change", () => {
        if (fileInput.files[0]) {
            let file = fileInput.files[0]
            if (file.type == "application/json") {
                file.text().then((content) => {
                    let parsed = JSON.parse(content)
                    if (parsed) {
                        localStorage.setItem(cdop.localStorageKey, content)
                        alert("Success!")
                        loadOptions()
                    } else {
                        alert("Invalid JSON document")
                    }
                })
            } else {
                alert("File must be in the JSON format")
            }
        }
    })
}
loadOptions();
for (let i in cdop.settingChildren) {
    const setting = cdop.settingChildren[i]
    if (setting && typeof (setting) == "object" && 'getAttribute' in setting && setting.getAttribute("id")) {
        cdop.saveSettings.push(setting.getAttribute("id"))
        setting.addEventListener("input", () => {
            saveOptions()
            cdop.syntaxStyling()
        })
    }
}
setInterval(cdop.mainLoop, 50);
// Format Button
cdop.formatCode = function() {
    __mostRecentGameLabInstance.studioApp_.editor.aceEditor.setValue(js_beautify(__mostRecentGameLabInstance.studioApp_.editor.aceEditor.getValue(), { "indent_size": parseInt(document.getElementById('customPrettyButtonIndentLength').value), "indent_with_tabs": document.getElementById('customPrettyButtonTabs').checked }))
}
cdop.fullscreen = function() {
    cdop.fullscreenStage = !cdop.fullscreenStage;
    if (cdop.fullscreenStage) {
        document.getElementById('divGameLab').setAttribute('style', 'height:400px; width:400px; position:fixed; transform:scale(' + document.getElementById('customFullscreenScaleFactor').value + ') translate(-50%, -50%); left:50%; top:50%; z-index:9999;');
        fSS.style.display = "block";
    } else {
        document.getElementById('divGameLab').setAttribute('style', 'height:400px; width:400px;');
        fSS.style.display = "none";
    };
};
cdop.checkIfHeaderMiddleLoaded = setInterval(function () {
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
            newBtn.addEventListener("click", cdop.formatCode);
            let oldWidth = document.querySelector("div#project_info_container").style.width;
            document.querySelector("div#project_info_container").style.width = `calc(${oldWidth} + 100px)`;
            let oldPadWidth = document.getElementById('left_padding').style.width;
            document.getElementById('left_padding').style.width = `calc(${oldPadWidth} - 100px)`;
        }, 1000);
        clearInterval(cdop.checkIfHeaderMiddleLoaded);
    };
}, 100);
cdop.topbar = setInterval(function () {
    if (document.getElementById("playSpaceHeader")) {
        setTimeout(function () {
            let newBtn = document.createElement("button");
            newBtn.innerHTML = 'Fullscreen';
            newBtn.className = "fullscreen_button";
            newBtn.type = "button";
            if (document.getElementById('customFullscreenButton').checked) {
                document.querySelector("#playSpaceHeader>span").appendChild(newBtn);
                document.getElementById('animationMode').style.borderRadius = "0px";
            };
            newBtn.addEventListener("click", cdop.fullscreen);
        }, 1000);
        clearInterval(cdop.topbar);
    };
}, 100);
console.log('%cCode.org Plus Loaded!', 'color:white; font-size:xx-large; -webkit-text-stroke: 1.25px black; ')

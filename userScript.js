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

const fetchUrl = "https://raw.githubusercontent.com/pikapower9080/cdo-plus/dist/src/main.js"
let cache = sessionStorage.getItem("cdo-plus-cache")

if (!cache) {
    console.log("No cache found, loading code.org plus from url: " + fetchUrl)
    fetch(fetchUrl).then((res) => {
        res.text().then((code) => {
            sessionStorage.setItem("cdo-plus-cache", code)
            console.log("Code.org plus is now cached in session storage")
            new Function(code)()
        })
    })
} else {
    console.log("Loading code.org plus from session cache")
    new Function(cache)()
}
// Imports
const fetch = require('node-fetch');

// Variables
const api = "https://api.mojang.com/",
        sessionServer = "https://sessionserver.mojang.com/";

/**
 * Translates a UUID to the corresponding username
 * @param {String} uuid 
 */
function uuidToUsername(uuid) {
    return fetch(`${sessionServer}session/minecraft/profile/${uuid}`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then(json => {
        return json.name;
    });
}

/**
 * Translates a username to the corresponding UUID
 * @param {String} username 
 */
function usernameToUUID(username) {
    return fetch(`${api}users/profiles/minecraft/${username}`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then(json => {
        return json.id;
    });
}

/**
 * 
 * @param {Number} token 
 */
function oAuthToUUID(token) {
    return fetch(`https://mc-oauth.net/api/api?token`, {
        method: "GET",
        headers: {
            "token": token
        }
    }).then((response) => {
        return response.json();
    }).then(json => {
        return json.status === "success" ? json.uuid : "fail";
    });
}

module.exports = {
    uuidToUsername,
    usernameToUUID,
    oAuthToUUID
};

const mcapi = require("./index.js");
const username = "Deftware";

mcapi.usernameToUUID(username).then((uuid) => {
    return mcapi.uuidToUsername(uuid);
}).then((name) => {
    if (username === name) {
        console.log("API is working");
    } else {
        console.log("API seems to not work (Throttled?)");
    }
}).catch(console.error);

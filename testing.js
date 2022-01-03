const filter = require("./index");

console.log(filter("realmy", {
    requiredTypes: ["string"],

    matchRegex: /^[a-zA-Z0-9_]*$/
}));
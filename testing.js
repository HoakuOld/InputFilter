const Filter = require("./index");
const filter = new Filter({
    filters: {
        username: {
            prefix: "USERNAME",
            allowedTypes: ["string"],
            minLength: 4,
            maxLength: 30,
            matchRegex: /^[a-zA-Z0-9_]*$/
        }
    }
});

const username = "realmy!";

const filterResult = filter("username", username);
console.log(filterResult);
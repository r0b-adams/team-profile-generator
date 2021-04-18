const fetch = require("node-fetch");

let userName = "comatosino";

let check = fetch(`https://api.github.com/users/${userName}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                if (data.message) {
                    console.log("Please enter a valid GitHub user")
                    return "Please enter a valid GitHub user";
                } else {
                    console.log("real user")
                    return true;
                }
            })
            .then(function(result) {
                console.log(JSON.stringify(result));
                return result;
            });

// this works, need to figure out how to wait until this is resolved

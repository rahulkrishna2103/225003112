const axios = require('axios');

const authUrl = "http://20.244.56.144/test/auth";
const authData = {
    companyName: "goMart",
    clientID: "37bb493c-73d3-47ea-8675-21f66ef9b735",
    clientSecret: "XOyoloRpaskWOdAN",
    ownerName: "Rahul Krishna",
    ownerEmail: "225003112@sastra.ac.in",
    rollNo: "225003112"
};

axios.post(authUrl, authData)
    .then(response => {
        if (response.status === 200) {
            const authToken = response.data.access_token;
            console.log("Authorization successful!");
            console.log("Access Token:", authToken);

            // Use the token for further requests
            makeAuthorizedRequest(authToken);
        } else {
            console.log("Authorization failed!");
            console.log(response.data);
        }
    })
    .catch(error => {
        console.log("Authorization failed!");
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    });

function makeAuthorizedRequest(authToken) {
    const exampleApiUrl = "http://20.244.56.144/test/some_endpoint";
    const headers = {
        "Authorization": `Bearer ${authToken}`,  // Correct usage of template literal
        "Content-Type": "application/json"
    };
    const exampleData = {
        exampleParam: "exampleValue"
    };

    axios.post(exampleApiUrl, exampleData, { headers })
        .then(response => {
            if (response.status === 200) {
                console.log("Request successful!");
                console.log(response.data);
            } else {
                console.log("Request failed!");
                console.log(response.data);
            }
        })
        .catch(error => {
            console.log("Request failed!");
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        });
}

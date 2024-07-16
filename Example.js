const axios = require('axios');
const exampleApiUrl = "http://20.244.56.144/test/some_endpoint";
const authToken = ""; 
const headers = {
    "Authorization": Bearer ${authToken},
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

const omdbapi = require("./serv/omdbapi.js")

class ServicesAuth {
    constructor() {
        this.omdbapi = omdbapi;
    }
}

module.exports = ServicesAuth
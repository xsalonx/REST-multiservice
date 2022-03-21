
const fs = require('fs')


class ServicesAuth {
    constructor() {
        try {
            this.omdbapi = fs.readFileSync("keys/serv/omdbapi.urlAuthPart");
        } catch (e) {
            console.error("you need auth prt of url")
            process.exit(1)
        }
    }
}

module.exports = ServicesAuth
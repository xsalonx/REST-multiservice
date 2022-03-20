


const HttpServer = require("./lib/server.js")
const config = require("./config.js")
const httpServer = new HttpServer(config.http)
const DataProvider = require("./lib/DataProvider.js");
const dataProvider = new DataProvider();

httpServer.addStaticPath("./public", "/")

httpServer.get("/getAuthor", (req, res) => {
    const query = req.query;


})

dataProvider.getAuthor("Grisham")

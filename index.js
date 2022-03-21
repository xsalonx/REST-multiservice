


const HttpServer = require("./lib/server.js")
const config = require("./config.js")
const httpServer = new HttpServer(config.http)
const DataProvider = require("./lib/DataProvider.js");
const dataProvider = new DataProvider();

httpServer.addStaticPath("./public", "/")

httpServer.get("/get-data", async (req, res) => {
    const query = req.query;
    const authors = await dataProvider.getData(
        "https://reststop.randomhouse.com/resources/authors?",
        {
            lastName: query.lastName,
            firstName: query.firstName},
        [
            "authorid",
            "authorfirst",
            "authorlast"],
        "author"
    );
    console.log("authors")
    console.log(authors)

    const books = await dataProvider.getData(
        "https://reststop.randomhouse.com/resources/titles?",
        {search: query.keywords},
        ["titleweb"],
        "title"
    )
    console.log("books")
    console.log(books)

    res.json([authors, books].filter(v => v))


})


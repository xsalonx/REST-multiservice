


const HttpServer = require("./lib/server.js")
const config = require("./config.js")
const httpServer = new HttpServer(config.http)
const DataProvider = require("./lib/DataProvider.js");
const dataProvider = new DataProvider();

const ServicesAuth = require("./keys/ServicesAuth.js")
const servicesAuth = new ServicesAuth();


httpServer.addStaticPath("./public", "/")

httpServer.get("/get-data", async (req, res) => {
    const query = req.query;

    let authors = await dataProvider.getData(
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


    let books = []
    if (authors?.length > 0) {
        for (const a of authors) {
            const books = await dataProvider.getData(
                "https://reststop.randomhouse.com/resources/titles?",
                {
                    search: query.keywords,
                    authorid: a.authorid
                },
                [
                    "titleweb",
                    "pages",
                    "authors",
                    "isbn"
                ],
                "title"
            )
        }
    } else {
        books = await dataProvider.getData(
            "https://reststop.randomhouse.com/resources/titles?",
            {
                search: query.keywords,
            },
            [
                "titleweb",
                "pages",
                "authors",
                "isbn"
                ],
            "title"
        )
    }
    books = books.filter(v => v)
    books.forEach(b => {
        if (b.authors.authorId.map)
            b.authorid = b.authors.authorId.map(b => b['$']).join(",")
        else
            b.authorid = b.authors.authorId['$']

        b.authors = undefined
    })

    if (! authors?.length > 0) {
        authors = []
        for (let b of books ) {
            for (let i of b.authorid.split(",") ){
                authors = authors.concat(await dataProvider.getData(
                    "https://reststop.randomhouse.com/resources/authors/" + i,
                    {},
                    [
                        "authorid",
                        "authorfirst",
                        "authorlast"
                    ],
                    null
                ))
            }
        }
    }

    let movies = await dataProvider.getData(
        "http://www.omdbapi.com/?" + servicesAuth.omdbapi,
        {s: query.keywords},
        null,
        "Search")


    console.log("authors")
    console.log(authors)
    console.log("books")
    console.log(books)
    console.log("movies")
    console.log(movies)

    authors = {
        title: "authors",
        data: authors
    }
    books = {
        title: "books",
        data: books
    }
    movies = {
        title: "movies",
        data: movies
    }




    res.json([authors, books, movies].filter(v => v))

})


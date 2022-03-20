
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const url = require('url');


class HttpServer {

    constructor(httpConfig) {

        this.app = express();
        this.specifyRoutes();

        this.server = http.createServer(this.app);
        this.port = httpConfig.port;

        this.listen();

    }


    listen() {
        return new Promise((resolve, reject) => {
            this.server.listen(this.port, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }



    close() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }


    specifyRoutes() {

        this.routerStatics = express.Router();
        this.app.use(this.routerStatics);

        this.routerPublic = express.Router();
        this.routerPublic.use(express.json()); // parse json body for API calls
        this.app.use('/api', this.routerPublic);

        this.app.use('/api', (req, res, next) => {
            res.status(404).json({
                error: '404 - Page not found',
                message: 'The requested URL was not found on this server.'
            });
        });

        this.app.use((req, res, next) => {
            res.status(404);
        });

        this.app.use('/api', (err, req, res, next) => {
            res.status(500).json({
                error: '500 - Server error',
                message: 'Something went wrong, please try again or contact an administrator.'
            });

        });

        this.app.use((err, req, res, next) => {
            res.status(500);
        });
    }



    addStaticPath(localPath, uriPath) {
        if (!fs.existsSync(localPath)) {
            throw new Error(`static path ${localPath} does not exist`);
        }
        if (uriPath) {
            this.routerStatics.use(url.resolve('/', uriPath), express.static(localPath));
        } else {
            this.routerStatics.use(express.static(localPath));
        }

        this.router = express.Router();
        this.router.use(express.json()); // parse json body for API calls
        this.app.use('/api', this.router);
    }


    get(path, ...callbacks) {
        this.method('get', path, ...callbacks);
    }

    post(path, ...callbacks) {
        this.method('post', path, ...callbacks);
    }



    method(method, path, ...callbacks) {
        this.router[method](path, ...callbacks);
    }


}
module.exports = HttpServer;

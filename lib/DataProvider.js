
const http = require('http');
const https = require('https');

const config = require('../config.js');
const axios = require('axios').default;

class BookkeepingService {
    constructor() {
        this.endpoints = config.endpoints
    }


    async getAuthor(lastName) {
        axios({
            method: 'GET',
            url: `https://reststop.randomhouse.com/resources/authors?lastName=${lastName}`,
            responseType: 'json',
        }
        )
            .then(function (response) {
                const data = response.data
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }

}

module.exports = BookkeepingService;
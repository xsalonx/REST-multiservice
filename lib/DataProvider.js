

const axios = require('axios').default;
const Utils = require("./utils.js");


class DataProvider {
    constructor() {}


    async getData(path, queryParams, desiredFields, field) {
        const params = Object.entries(queryParams)
            .map(([k, v]) => v ? `${k}=${v}` : '')
            .filter(v => v?.length > 0)
            .join("&")

        if (!params)
            return

        const endpoint = path + params;
        console.log(endpoint)
        return await this.get(endpoint, desiredFields, field);
    }


    async get(endpoint, desiredFields, field) {
        let data = undefined
        await axios.get(endpoint)
            .then(function (response) {
                data = response.data[field]?.map(obj => Utils.filterObject(obj, desiredFields, desiredFields))
                    .filter(v => v)
            })
            .catch(function (error) {
                console.log(error);
            });
        return data;
    }

}

module.exports = DataProvider;


export default class Model {
    constructor() {


    }

    async fetchAuthorData(lastName) {
        fetch('/api/getAuthor')
            .then(response => response.json())
            .then(data => console.log(data));
    }
}

export default class Model {
    constructor() {

        const pparser = (v) => v.split(" ").filter(v => v.length > 0).join("%20")
        this.inputsConfig = {
            "firstName": pparser,
            "lastName": pparser,
            "keywords": pparser
        }

        this.inputsNames = Object.entries(this.inputsConfig).map(([k, v]) => k)

        const inputList = document.getElementById("input-forms-list")
        inputList.innerHTML = this.genFormHTML()
    }

    genFormHTML() {
        return this.inputsNames
            .map(name => `
                        <label> ${name}
                        <input type="text" placeholder="" id="input-${name}">
                        </label>`)
            .join("")
    }

    async fetchAuthorData() {
        console.log("fetchAuthorData")
        const params = this.inputsNames
            .map(name => [
                name,
                this.inputsConfig[name](document.getElementById(`input-${name}`)?.value)
            ])
            .filter(([k,v]) => v)
            .map(([k,v]) => `${k}=${v}`)
            .join("&")

        if (! params.length > 0) {
            alert("some input needed")
            return
        }

        const endpoint = "/api/get-data/?" + params
        this.setLoading()
        fetch(endpoint)
            .then(response => response.json())
            .then(dataList => {
                console.log(dataList)
                this.unsetLoading()
                this.createTables(dataList)

            })
            .catch(e => console.error(e))
    }

    createTables(dataList) {
        document.getElementById("tables-div").innerHTML =
            dataList.map(d => this.createTable(d)).join("")
    }

    createTable(dataObjs) {

        const title = dataObjs.title
        const data = dataObjs.data
        try {
            if (! data?.length > 0)
                return ''
            const columns = Object.entries(data[0]).map(([k, v]) => k)
            const intoTr = (s) => `<tr>${s}</tr>`
            const tableHeader = intoTr(columns.map(n => `<th>${n}</th>`))
            const specialHTMLAdder = (s) => {
                if (s.includes("jpg"))
                    return `<img src="${s}" alt=${s}>`
                else
                    return s
            }
            const rows = data.map(obj => intoTr(columns.map(n => `<td>${specialHTMLAdder(obj[n])}</td>`)))

            return `<table><caption>${title}</caption>${tableHeader}${rows.join("")}</table>`
        } catch (e) {
            console.log(e)
            alert(e)
            return ''
        }

    }

    setLoading() {
        document.getElementById("tables-div").innerHTML = "<p>Loading data...</p>"
        //TODO
    }
    unsetLoading() {
        //TODO
    }
}
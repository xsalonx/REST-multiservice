


class Utils {
    static filterObject(obj, fields, strict=false)  {
        if (!fields && !strict)
            return obj
        const res = {}
        for (let f of fields) {
            if (obj[f] || !strict) {
                res[f] = obj[f]
            } else {
                return null
            }
        }
        return res
    }
}

module.exports = Utils;
const APIError = require("./APIError")

class NotFound extends APIError {
    constructor(message) {
        super(message, 404)
    }
}

class NotAuthorized extends APIError {
    constructor(message) {
        super(message, 403)
    }
}

class NotLogged extends APIError {
    constructor(message) {
        super(message, 401)
    }
}

module.exports = {
    NotFound, NotAuthorized, NotLogged
}
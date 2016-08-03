class HttpError extends Error {

    constructor (status, message) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = 'HttpError';
        this.status = status;
        this.message = message;
    }
}


module.exports = HttpError;

/* eslint-disable consistent-return */


function generateToken() {
    return Math.random().toString(36).slice(2);
}

export default function async({ dispatch, getState }) {
    const currRequests = {};

    return next => action => {
        if (!action) {
            return;
        }

        const { promise, type, ...rest } = action; // eslint-disable-line
        const SUCCESS = type;
        const REQUEST = `${type}_REQUEST`;
        const FAILURE = `${type}_FAILURE`;

        if (!promise) {
            return next(action);
        }

        next({ type: REQUEST, ...rest });

        const token = generateToken();
        currRequests[type] = token;

        return promise
            .then(response => {
                if (token !== currRequests[type]) {
                    return undefined;
                }

                delete currRequests[type];

                if (!response.data.ok) {
                    return next({
                        type: FAILURE,
                        ...rest,
                        error: {
                            status: 200,
                            data: response.data.error,
                        }
                    });
                }

                return next({
                    type: SUCCESS,
                    ...rest,
                    response: response.data.result,
                    error: null,
                });
            })
            .catch(error => {
                delete currRequests[type];
                return next({
                    type: FAILURE,
                    ...rest,
                    error: {
                        status: error.status,
                        data: error.data,
                    }
                });
            });
    };
}

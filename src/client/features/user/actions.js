import axios        from 'axios';

import constants    from './constants';


export function fetchSession() {
    return {
        type: constants.FETCH_SESSION,
        promise: axios.get('/api/user'),
    };
}


export function reset() {
    return {
        type: constants.RESET,
    };
}

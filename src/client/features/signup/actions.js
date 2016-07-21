import axios        from 'axios';

import constants    from './constants';


/**
 * Описание action
 */
export function signup(email, password) {
    return {
        type: constants.SIGNUP,
        promise: axios.post('/api/signup', { email, password }),
    };
}

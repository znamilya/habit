import axios        from 'axios';

import constants    from './constants';


/**
 * Описание action
 */
export function fetch(year, month) {
    return {
        type: constants.FETCH,
        promise: axios.get('/api/habits', {
            params: {
                year,
                month,
            }
        }),
    };
}

/**
 * Описание action
 */
export function add(title) {
    const params = new URLSearchParams();

    params.append('title', title);

    return {
        type: constants.ADD,
        promise: axios.post('/api/habits', params),
    };
}


/**
 * Описание action
 */
export function remove(habitId) {
    return {
        type: constants.REMOVE,
        promise: axios.delete(`/api/habits/${habitId}`),
    };
}


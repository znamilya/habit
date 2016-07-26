import axios        from 'axios';

import constants    from './constants';


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


export function add(title) {
    const urlPaths = window.location.pathname.split('/').slice(1);
    const params = new URLSearchParams();

    params.append('title', title);
    params.append('year', Number(urlPaths[0]));
    params.append('month', Number(urlPaths[1]));

    return {
        type: constants.ADD,
        promise: axios.post('/api/habits', params),
    };
}


export function remove(id) {
    return {
        type: constants.REMOVE,
        promise: axios.delete(`/api/habits/${id}`),
    };
}


export function toggleActivity(id, dayOfActivity) {
    const params = new URLSearchParams();

    params.append('dayNumber', dayOfActivity);

    return {
        type: constants.UPDATE,
        promise: axios.put(`/api/habits/${id}`, params),
    };
}


export function updateTitle(id, newTitle) {
}


export function reset() {
    return {
        type: constants.RESET,
    };
}


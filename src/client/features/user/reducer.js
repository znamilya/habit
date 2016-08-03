import constants        from './constants';


const defaultState = {};


export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case constants.FETCH_SESSION: {
            return action.response;
        }

        case constants.RESET: {
            return defaultState;
        }

        default: {
            return state;
        }
    }
}

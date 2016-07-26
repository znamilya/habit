import constants        from './constants';
import signupConstans   from 'features/signup/constants';


const defaultState = {};


export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case constants.FETCH_SESSION: {
            return action.response;
        }

        case signupConstans.SIGNUP: {
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

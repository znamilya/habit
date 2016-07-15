import constants        from './constants';
import signupConstans   from 'modules/Signup/constants';


export default function reducer(state = {}, action) {
    switch (action.type) {

        case constants.FETCH_SESSION: {
            return action.response;
        }

        case signupConstans.SIGNUP: {
            return action.response;
        }

        default: {
            return state;
        }
    }
}

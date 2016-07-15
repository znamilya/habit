import constants    from './constants';


const defaultState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    error: null
};


/**
 * Описание  reducer
 */
export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case constants.FETCH: {
            return {
                ...state,
                data: action.response,
                isLoading: false,
                isLoaded: true,
            }
        }

        case constants.FETCH_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case constants.FETCH_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: action.error,
            };
        }

        case constants.ADD: {
            return {
                ...state,
                data: [...state.data, action.response]
            };
        }

        case constants.REMOVE: {
            const nextData = state.data.filter(habit => habit._id !== action.response._id);

            return {
                ...state,
                data: nextData
            };
        }

        default: {
            return state;
        }
    }
}

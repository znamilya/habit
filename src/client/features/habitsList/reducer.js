import { leadZero, supplant }   from 'utils/string';
import appConfig                from 'appConfig';
import constants                from './constants';


const defaultState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    error: null
};


const hrefTemplate = '/{{year}}/{{month}}';


export function resolvePrevHrefMaybe(year, month) {
    const prevDate = new Date(year, month - 2);
    const prevYear = prevDate.getFullYear();

    if (prevYear < appConfig.minAvailableYear) {
        return;
    }

    return supplant(hrefTemplate, {
        year: prevYear,
        month: leadZero(prevDate.getMonth() + 1, 2),
    });
}


export function resolveNextHrefMaybe(year, month) {
    const nextDate = new Date(year, month);

    if (nextDate > Date.now()) {
        return;
    }

    return supplant(hrefTemplate, {
        year: nextDate.getFullYear(),
        month: leadZero(nextDate.getMonth() + 1, 2),
    });
}


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

        case constants.UPDATE: {
            const nextState = {...state};

            const updateHabit = nextState.data.filter(habit => (
                habit._id === action.response._id
            ))[0];

            updateHabit.activities = action.response.activities;

            return nextState;
        }

        case constants.RESET: {
            return defaultState;
        }

        default: {
            return state;
        }
    }
}

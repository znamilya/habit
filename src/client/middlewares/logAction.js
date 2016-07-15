/* eslint-disable no-console */
export default function logAction({ dispatch, getState }) {
    return (next) => (action) => {
        if (!console.groupCollapsed) {
            return next(action);
        }

        console.group(action.type);
        console.log('%c prev state', 'color: gray', getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', getState());
        console.groupEnd(action.type);

        return returnValue;
    };
}

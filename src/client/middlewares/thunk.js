export default function thunkMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        const valueToReturn = typeof action === 'function'
            ? action(dispatch, getState)
            : next(action);

        return valueToReturn;
    };
}

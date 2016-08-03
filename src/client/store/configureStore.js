import { createStore,
        applyMiddleware }   from 'redux';

import async                from 'middlewares/async';
import logAction            from 'middlewares/logAction';
import thunk                from 'middlewares/thunk';
import rootReducer          from 'reducers';


const middlewares = [async, thunk];

if (DEV) {
    middlewares.push(logAction);
}


export default function (initialData) {
    return applyMiddleware(...middlewares)(createStore)(rootReducer, initialData);
}

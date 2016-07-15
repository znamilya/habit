import { createStore,
        applyMiddleware }   from 'redux';

import async                from 'middlewares/async';
import logAction            from 'middlewares/logAction';
// import thunk                from 'js/middlewares/thunk';
import rootReducer          from 'reducers';


export default function (initialData) {
    // return applyMiddleware(async, thunk, logAction)(createStore)(rootReducer, initialData);
    return applyMiddleware(async, logAction)(createStore)(rootReducer, initialData);
}
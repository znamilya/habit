import React            from 'react';
import ReactDOM         from 'react-dom';
import { Provider }     from 'react-redux';

import configureStore   from 'store/configureStore';
import getRouter        from 'router';


const store = configureStore();
const router  = getRouter(store);

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);

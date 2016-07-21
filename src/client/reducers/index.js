import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

import habitsList           from 'features/habitsList/reducer';
import user                 from 'features/user/reducer';


export default combineReducers({
    routing: routerReducer,
    habitsList,
    user,
});

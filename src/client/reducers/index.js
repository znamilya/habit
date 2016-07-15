import { combineReducers }  from 'redux';

import habitsList           from 'modules/HabitsList/reducer';
import user                 from 'modules/user/reducer';


export default combineReducers({
    habitsList,
    user,
});

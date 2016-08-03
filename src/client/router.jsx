import React                                from 'react';
import { Router, Route, IndexRedirect,
         IndexRoute, browserHistory }       from 'react-router';
import { syncHistoryWithStore }             from 'react-router-redux';

import datePath                             from '../common/helpers/datePath';
import { leadZero }                         from 'utils/string';
import App                                  from 'pages/App/App';
import Index                                from 'pages/Index/Index';
import Login                                from 'pages/Login/Login';
import * as userActions                     from 'features/user/actions';
import appConfig                            from 'appConfig';


const MAX_MONTH = 12;
const nowDatePath = datePath.getNow();


export default function getRouter(store) {
    const reduxHistory = syncHistoryWithStore(browserHistory, store);

    function validateDateUrl(nextState, replace, next) {
        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1;

        let year = Number(nextState.params.year);
        let month = Number(nextState.params.month);

        if (Number.isNaN(year) || year > nowYear || year < appConfig.minAvailableYear) {
            replace(nowDatePath);
        } else {
            if (year === nowYear)  {
                if (Number.isNaN(month) || month > nowMonth || month < 1) {
                    replace(nowDatePath);
                }
            } else {
                if (Number.isNaN(month) || month > MAX_MONTH) {
                    replace(nowDatePath.getCurrent(year, MAX_MONTH));
                }
            }

            if (month && nextState.params.month.length < 2) {
                replace(nowDatePath.getCurrent(year, month));
            }
        }

        next();
    }

    function requireLogin(nextState, replace, next) {
        const { user } = store.getState();

        function checkUser() {
            const { user } = store.getState();

            if (!user._id) {
                replace('/login');
            }

            next();
        }

        if (user._id) {
            checkUser();
        } else {
            store
                .dispatch(userActions.fetchSession())
                .then(checkUser);
        }
    }

    return (
        <Router history={reduxHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to={nowDatePath} />

                <Route path="/login" component={Login} />

                <Route onEnter={requireLogin}>
                    <Route path="/(:year(/:month))" onEnter={validateDateUrl} component={Index} />
                </Route>
            </Route>
        </Router>
    );
}

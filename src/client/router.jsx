import React                                from 'react';
import { Router, Route, IndexRedirect,
         IndexRoute, browserHistory }       from 'react-router';
import { syncHistoryWithStore }             from 'react-router-redux';
import { leadZero }                         from 'utils/string';
import App                                  from 'pages/App/App';
import Index                                from 'pages/Index/Index';
import Login                                from 'pages/Login/Login';
import * as userActions                     from 'features/user/actions';
import appConfig                            from 'appConfig';


const MAX_MONTH = 12;

function validateDateUrl(nextState, replace, next) {
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;

    let year = Number(nextState.params.year);
    let month = Number(nextState.params.month);

    if (Number.isNaN(year) || year > nowYear || year < appConfig.minAvailableYear) {
        replace(`/${nowYear}/${leadZero(nowMonth, 2)}`);
    } else {
        if (year === nowYear)  {
            if (Number.isNaN(month) || month > nowMonth || month < 1) {
                replace(`/${year}/${leadZero(nowMonth, 2)}`);
            }
        } else {
            if (Number.isNaN(month) || month > MAX_MONTH) {
                replace(`/${year}/MAX_MONTH`);
            }
        }

        if (month && nextState.params.month.length < 2) {
            replace(`/${year}/${leadZero(month, 2)}`);
        }
    }

    next();
}



export default function getRouter(store) {
    const reduxHistory = syncHistoryWithStore(browserHistory, store);

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
                <Route path="/login" component={Login} />

                <Route onEnter={requireLogin}>
                    <Route path="/(:year(/:month))" onEnter={validateDateUrl} component={Index} />
                </Route>
            </Route>
        </Router>
    );
}

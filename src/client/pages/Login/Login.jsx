import React, { PropTypes }     from 'react';
import bemchik                  from 'bemchik';

import Page                     from 'pages/Page';
import Login                    from 'features/login/Login';
import Signup                   from 'features/signup/Signup';

import './Login.styl';


/**
 * Описание компонента
 */
class LoginPage extends React.Component {

    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemchik('login-page');

        return (
            <Page title="Login">
                <div className={b()}>
                    <Login />
                    <hr className={b('separator')} />
                    <Signup />
                </div>
            </Page>
        );
    }
}


export default LoginPage;

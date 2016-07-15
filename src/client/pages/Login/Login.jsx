import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import Login                    from 'modules/Login/Login';
import Signup                   from 'modules/Signup/Signup';

import './Login.styl';


/**
 * Описание компонента
 */
class LoginPage extends React.Component {

    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('login-page');

        return (
            <div className={b()}>
                <Login />
                <Signup />
            </div>
        );
    }
}


export default LoginPage;

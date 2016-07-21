import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import Input                    from 'components/Input/Input';
import Button                   from 'components/Button/Button';
import Title                    from 'components/Title/Title';

import './Login.styl';


/**
 * Описание компонента
 */
class Login extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: window.loginErrorMessage || '',
        }
    }

    /* ------------------------------------------------------------------------------------------ */
    /* REACT                                                                                      */
    /* ------------------------------------------------------------------------------------------ */

    /* ------------------------------------------------------------------------------------------ */
    /* METHODS                                                                                    */
    /* ------------------------------------------------------------------------------------------ */

    /* ------------------------------------------------------------------------------------------ */
    /* HANDLERS                                                                                   */
    /* ------------------------------------------------------------------------------------------ */

    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('login');

        return (
            <section className={b()}>
                <Title level="2">Login</Title>
                <form method="POST" action="/login">
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input type="text" name="email" id="email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Input type="password" name="password" id="password" />
                    </div>

                    <div>
                        <Button type="submit">Login</Button>
                    </div>

                    <div>
                        {this.state.errorMessage}
                    </div>
                </form>
            </section>
        );
    }
}


export default Login;

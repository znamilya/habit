import React, { PropTypes }     from 'react';
import bemchik                  from 'bemchik';

import Form                     from 'components/Form/Form';
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
    renderErrorMessageIfNeeded(b) {
        if (!this.state.errorMessage) {
            return null;
        }

        return (
            <Form.Row>
                {this.state.errorMessage}
            </Form.Row>
        )
    }

    render() {
        const b = bemchik('login');

        return (
            <section className={b()}>
                <Title level="2">Войти</Title>
                <Form method="POST" action="/login">
                    <Form.Row>
                        <Form.Label htmlFor="email">Адрес электронной почты</Form.Label>
                        <Input type="text" name="email" id="email" />
                    </Form.Row>

                    <Form.Row>
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Input type="password" name="password" id="password" />
                    </Form.Row>

                    <Form.Row>
                        <Button type="submit">Войти</Button>
                    </Form.Row>

                    {this.renderErrorMessageIfNeeded(b)}
                </Form>
            </section>
        );
    }
}


export default Login;

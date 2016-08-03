import React, { PropTypes }     from 'react';
import bemcl                    from 'bem-cl';

import Form                     from 'components/Form/Form';
import Input                    from 'components/Input/Input';
import Button                   from 'components/Button/Button';
import Title                    from 'components/Title/Title';

import './Login.styl';


const b = bemcl('login');


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: window.loginErrorMessage || '',
        }
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderErrorMessageIfNeeded(b) {
        if (!this.state.errorMessage) {
            return null;
        }

        return (
            <Form.Row>
                <span className={b('error')}>{this.state.errorMessage}</span>
            </Form.Row>
        )
    }

    render() {
        return (
            <section className={b()}>
                <Title level="2">Войти</Title>
                <Form method="POST" action="/api/login">
                    <Form.Row>
                        <Form.Label htmlFor="email">Email</Form.Label>
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

import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import bemchik                  from 'bemchik';

import Form                     from 'components/Form/Form';
import Input                    from 'components/Input/Input';
import Button                   from 'components/Button/Button';
import Title                    from 'components/Title/Title';
import * as actions             from './actions';

import './Signup.styl';


/**
 * Описание компонента
 */
class Signup extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: window.signupErrorMessage || '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(e) {
        e.preventDefault();

        const formElements = e.target.elements;

        this.props.signup(formElements.email.value, formElements.password.value);
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
                {this.state.errorMessage}
            </Form.Row>
        )
    }

    render() {
        const b = bemchik('signup');

        return (
            <section className={b()}>
                <Title level="2">Зарегистрироваться</Title>
                <Form method="POST" action="/signup">
                    <Form.Row>
                        <Form.Label htmlFor="email">Адрес электронной почты</Form.Label>
                        <Input type="text" name="email" id="email" />
                    </Form.Row>

                    <Form.Row>
                        <Form.Label htmlFor="password">Пароль</Form.Label>
                        <Input type="password" name="password" id="password" />
                    </Form.Row>

                    <Form.Row>
                        <Button type="submit">Зарегистрироваться</Button>
                    </Form.Row>

                    {this.renderErrorMessageIfNeeded(b)}
                </Form>
            </section>
        );
    }
}

export default connect(
    state => ({
    }),
    {
        signup: actions.signup,
    }
)(Signup);

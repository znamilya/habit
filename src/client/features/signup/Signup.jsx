import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import bemCN                    from 'bem-cn';

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
    render() {
        const b = bemCN('signup');

        return (
            <section className={b()}>
                <Title level="2">Signup</Title>
                <form method="POST" action="/signup">
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

export default connect(
    state => ({
    }),
    {
        signup: actions.signup,
    }
)(Signup);

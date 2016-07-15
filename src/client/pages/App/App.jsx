import React, { PropTypes }     from 'react';
import { withRouter }           from 'react-router'
import { connect }              from 'react-redux';
import bemCN                    from 'bem-cn';
import Logo                     from 'components/Logo/Logo';

import { leadZero }             from 'utils/string';
import Button                   from 'components/Button/Button';

import './App.styl';


/**
 * Описание компонента
 */
class App extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.user._id && !this.props.user._id) {
            this.props.router.push('/2016/07');
        }
    }

    createUrlForRedirect() {
        const now = new Date();

        return `/${now.getFullYear()}/${leadZero(now.getMonth) + 1}`;
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderUserPanelIfNeeded(b) {
        if (!this.props.user._id) {
            return null;
        }

        return (
            <div className={b('user-panel')}>
                <Button tagName="a" href="/logout">Logout</Button>
            </div>
        );
    }

    render() {
        const b = bemCN('app');

        return (
            <div className={b()}>
                <header className={b('header')}>
                    <div className={b('container')}>
                        <div className={b('header-in')}>
                            <Logo />
                            {this.renderUserPanelIfNeeded(b)}
                        </div>
                    </div>
                </header>
                <main className={b('body')}>
                    <div className={b('container')}>
                        {this.props.children}
                    </div>
                </main>
            </div>
        );
    }
}


export default connect(
    state => ({
        user: state.user,
    })
)(withRouter(App));

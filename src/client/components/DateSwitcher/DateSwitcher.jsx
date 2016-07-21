import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';
import { Link }                 from 'react-router';

import { resolveNameByIndex }   from 'helpers/date';

import './DateSwitcher.styl';


/**
 * Описание компонента
 */
class DateSwitcher extends React.Component {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        prevHref: PropTypes.string,
        nextHref: PropTypes.string,
    };

    static defaultProps = {
        prevHref: '',
        nextHref: '',
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderNavIfNeeded(b, dir) {
        const href = dir === 'next' ? this.props.nextHref : this.props.prevHref;

        if (!href) {
            return null;
        }

        const iconText = dir === 'next' ? 'navigate_next' : 'navigate_before';

        return (
            <Link className={b('nav').mix('material-icons')} to={href}>
                {iconText}
            </Link>
        )
    }

    render() {
        const b = bemCN('date-switcher');

        return (
            <div className={b()}>
                {this.renderNavIfNeeded(b, 'prev')}

                <span className={b('value')}>
                    {resolveNameByIndex(this.props.month)} {this.props.year}
                </span>

                {this.renderNavIfNeeded(b, 'next')}
            </div>
        );
    }
}


export default DateSwitcher;

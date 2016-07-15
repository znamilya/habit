import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import Cell                     from 'components/Cell/Cell';

import './Habit.styl';


/**
 * Описание компонента
 */
class Habit extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        daysCount: PropTypes.number.isRequired,
        onDelete: PropTypes.func,
    };

    static defaultProps = {
        onDelete: () => {},
    };

    constructor(props) {
        super(props);
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
    renderItems() {
        return (new Array(this.props.daysCount))
            .fill(0)
            .map((cell, key) => (
                <Cell key={key} />
            ));
    }

    render() {
        const b = bemCN('habit');

        return (
            <li className={b()}>
                <span onClick={this.props.onDelete}>x</span>
                <div className={b('title')}>{this.props.title}</div>
                <div className={b('cells')}>
                    {this.renderItems()}
                </div>
            </li>
        );
    }
}


export default Habit;

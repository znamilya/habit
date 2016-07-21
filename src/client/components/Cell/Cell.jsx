import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import './Cell.styl';


/**
 * Описание компонента
 */
class Cell extends React.Component {

    static propTypes = {
        // Номер днф месяца которому соответсвует ячейка
        dayNumber: PropTypes.number,

        // Активна ячейка или нет
        active: PropTypes.bool,
    };

    static defaultProps = {
        active: false
    };

    constructor(props) {
        super(props);


        this.handleClick = this.handleClick.bind(this);
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
    handleClick() {
        this.props.onToggle(this.props.dayNumber);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('cell');

        return (
            <div className={b({ active: this.props.active })}
                onClick={this.handleClick}
            ></div>
        );
    }
}


export default Cell;

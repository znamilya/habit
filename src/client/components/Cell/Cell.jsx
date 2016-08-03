import React, { PropTypes }     from 'react';
import bemcl                    from 'bem-cl';

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

        onToggle: PropTypes.func,
    };

    static defaultProps = {
        active: false,
        onToggle: () => {},
    };

    constructor(props) {
        super(props);


        this.handleClick = this.handleClick.bind(this);
    }


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
        const b = bemcl('cell');

        return (
            <div className={b({ active: this.props.active })}
                onClick={this.handleClick}
            ></div>
        );
    }
}


export default Cell;

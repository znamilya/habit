import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import Cell                     from 'components/Cell/Cell';

import './Habit.styl';


/**
 * Описание компонента
 */
class Habit extends React.Component {

    static propTypes = {
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        daysCount: PropTypes.number.isRequired,
        activities: PropTypes.array,

        // Обработчик клик на ячейку
        onActivityToggle: PropTypes.func,

        // Обработчик удаления увлечения
        onDelete: PropTypes.func,
    };

    static defaultProps = {
        activities: [],
        onActivityToggle: () => {},
        onDelete: () => {},
    };

    constructor(props) {
        super(props);

        this.handleCellToggle = this.handleCellToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
    handleCellToggle(dayNumber) {
        this.props.onActivityToggle(this.props._id, dayNumber);
    }

    handleDelete() {
        this.props.onDelete(this.props._id, this.props.title);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderItems() {
        return (new Array(this.props.daysCount))
            .fill(0)
            .map((cell, index) => {
                const isActive = this.props.activities.includes(index + 1);

                return (
                    <Cell
                        dayNumber={index + 1}
                        active={isActive}
                        onToggle={this.handleCellToggle}
                        key={index}
                    />
                );
            });
    }

    render() {
        const b = bemCN('habit');

        return (
            <li className={b()}>
                <div className={b('title')}>
                    <i className={b('delete').mix('material-icons')}
                        onClick={this.handleDelete}>
                        close
                    </i>
                    {this.props.title}
                </div>
                <div className={b('cells')}>
                    {this.renderItems()}
                </div>
            </li>
        );
    }
}


export default Habit;

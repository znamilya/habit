import React, { PropTypes }     from 'react';
import ReactDOM                 from 'react-dom';
import bemcl                    from 'bem-cl';
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

        // Обработчик изменения заголовка
        onTitleUpdate: PropTypes.func,
    };

    static defaultProps = {
        activities: [],
        onActivityToggle: () => {},
        onDelete: () => {},
        onTitleUpdate: () => {},
    };

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
        };

        this.titleInputNode = null;

        this.enableEditMode = this.enableEditMode.bind(this);
        this.handleCellToggle = this.handleCellToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTitleInputBlur = this.handleTitleInputBlur.bind(this);
    }

    /* ------------------------------------------------------------------------------------------ */
    /* REACT                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEdit && this.state.isEdit) {
            this.titleInputNode = ReactDOM.findDOMNode(this.refs.titleInput);

            this.titleInputNode.focus();
        }
    }

    componentWillUnmount() {
        this.titleInputNode = null;
    }


    /* ------------------------------------------------------------------------------------------ */
    /* METHODS                                                                                    */
    /* ------------------------------------------------------------------------------------------ */
    enableEditMode() {
        this.setState({
            isEdit: true,
        });
    }


    /* ------------------------------------------------------------------------------------------ */
    /* HANDLERS                                                                                   */
    /* ------------------------------------------------------------------------------------------ */
    handleCellToggle(dayNumber) {
        this.props.onActivityToggle(this.props._id, dayNumber);
    }

    handleDelete() {
        this.props.onDelete(this.props._id, this.props.title);
    }

    handleTitleInputBlur() {
        const newTitle = this.titleInputNode.value;

        this.props.onTitleUpdate(this.props._id, newTitle)
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

    renderTitleContent(b) {
        if (this.state.isEdit) {
            return (
                <input className={b('title-input')}
                    type="text"
                    defaultValue={this.props.title}
                    ref="titleInput"
                    onBlur={this.handleTitleInputBlur}
                />
            );
        }

        return (
            <span className={b("title-text")}
                onClick={this.enableEditMode}
            >
                {this.props.title}
            </span>
        );
    }

    render() {
        const b = bemcl('habit');

        return (
            <li className="habit">
                <div className={b("title")}>
                    <i className={b("delete").mix("material-icons")}
                        onClick={this.handleDelete}>
                        close
                    </i>
                    {this.renderTitleContent(b)}
                </div>
                <div className={b("cells")}>
                    {this.renderItems()}
                </div>
            </li>
        );
    }
}


export default Habit;

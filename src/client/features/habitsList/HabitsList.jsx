import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import bemCN                    from 'bem-cn';

import { getDaysInMonth }       from 'utils/date';
import Input                    from 'components/Input/Input';
import Button                   from 'components/Button/Button';
import Habit                    from 'components/Habit/Habit';
import DateSwitcher             from 'components/DateSwitcher/DateSwitcher';
import {
    resolvePrevHrefMaybe,
    resolveNextHrefMaybe
}                               from './reducer';
import * as actions             from './actions';

import './HabitsList.styl';


class HabitsList extends React.Component {

    static propTypes = {
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.handleAddFormSubit = this.handleAddFormSubit.bind(this);
        this.handleHabitDelete = this.handleHabitDelete.bind(this);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* REACT                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    componentDidMount() {
        this.props.fetch(this.props.year, this.props.month);
    }

    componentWillUpdate(nextProps) {
        // При смене дня или месяця, загружаем список актуальных увлечений
        if (nextProps.year !== this.props.year || nextProps.month !== this.props.month) {
            this.props.reset();
            this.props.fetch(nextProps.year, nextProps.month);
        }
    }


    /* ------------------------------------------------------------------------------------------ */
    /* METHODS                                                                                    */
    /* ------------------------------------------------------------------------------------------ */


    /* ------------------------------------------------------------------------------------------ */
    /* HANDLERS                                                                                   */
    /* ------------------------------------------------------------------------------------------ */
    handleAddFormSubit(e) {
        e.preventDefault();

        const formNode = e.target;
        const inputNode = formNode.elements.title;
        const title = inputNode.value;

        this.props.add(title)
            .then(() => formNode.reset());
    }

    handleHabitDelete(id, title) {
        const confirm = window.confirm(`Вы действительно хотите удалить увлечение ${title}?`);

        if (confirm) {
            this.props.remove(id);
        }
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderDaysIndexes(b, daysCount) {
        return (new Array(daysCount))
            .fill(0)
            .map((day, key) => (
                <span className={b('day')} key={key}>
                    {key + 1}
                </span>
            ));
    }

    renderHabits(b, daysCount) {
        const { data, isLoading } = this.props.habitsList;

        if (isLoading) {
            return 'Грузю...';
        }

        if (!data.length) {
            return 'Вы не завели ни одной привычки...';
        }


        return data.map((habit, key) => {
            return (
                <Habit
                    {...habit}
                    daysCount={daysCount}
                    key={key}
                    onActivityToggle={this.props.toggleActivity}
                    onDelete={this.handleHabitDelete}
                />
            );
        });
    }

    render() {
        const b = bemCN('habits-list');
        const daysCount = getDaysInMonth(this.props.year, this.props.month);
        const { year, month } = this.props;

        return (
            <div className={b()}>
                <div className={b('header')}>
                    <div className={b('date')}>
                        <DateSwitcher
                            year={year}
                            month={month}
                            prevHref={resolvePrevHrefMaybe(year, month)}
                            nextHref={resolveNextHrefMaybe(year, month)}
                        />
                    </div>

                    <div className={b('days')}>
                        {this.renderDaysIndexes(b, daysCount)}
                    </div>
                </div>
                <ul className={b('body')}>
                    {this.renderHabits(b, daysCount)}
                </ul>
                <div className="add">
                    <form className={b('add-form')}
                        action="/api/habits"
                        method="POST"
                        onSubmit={this.handleAddFormSubit}
                    >
                        <Input type="text" name="title" mix={b('add-input')} />
                        <Button type="submit">Add new</Button>
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        habitsList: state.habitsList,
    }),
    {
        fetch: actions.fetch,
        add: actions.add,
        remove: actions.remove,
        reset: actions.reset,
        toggleActivity: actions.toggleActivity,
    }
)(HabitsList);

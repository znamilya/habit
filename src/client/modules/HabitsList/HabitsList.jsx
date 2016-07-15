import React                    from 'react';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import bemCN                    from 'bem-cn';
import { Link }                 from 'react-router';

import { leadZero }             from 'utils/string';
import { getDaysInMonth }       from 'utils/date';
import Input                    from 'components/Input/Input';
import Button                   from 'components/Button/Button';
import Habit                    from 'components/Habit/Habit';
import * as actions             from './actions';
import appConfig                from 'appConfig';

import './HabitsList.styl';


class HabitsList extends React.Component {

    constructor(props) {
        super(props);

        this.handleAddFormSubit = this.handleAddFormSubit.bind(this);
        // this.handleItemDelete = this.handleItemDelete.bind(this);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* REACT                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    componentDidMount() {
        this.props.fetch(this.props.year, this.props.month);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* METHODS                                                                                    */
    /* ------------------------------------------------------------------------------------------ */
    extractActualActivity(activities) {
        var activity = activities.filter(item => {
            return item.year === this.props.year && item.month === this.props.month;
        })[0];

        return activity ? activity.days : [];
    }

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

    handleItemDelete(habitId) {
        this.props.remove(habitId);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    renderPrevButton() {
        const prevDate = new Date(this.props.year, this.props.month - 2);
        const prevYear = prevDate.getFullYear();

        if (prevYear < appConfig.minAvailableYear) {
            return null;
        }

        return (
            <Link to={`/${prevYear}/${leadZero(prevDate.getMonth() + 1, 2)}`}>prev</Link>
        )
    }

    renderNextButton() {
        const nextDate = new Date(this.props.year, this.props.month);
        const nextYear = nextDate.getFullYear();

        if (nextDate > Date.now()) {
            return null;
        }

        return (
            <Link to={`/${nextYear}/${leadZero(nextDate.getMonth() + 1, 2)}`}>next</Link>
        )
    }

    renderDate(b) {
        return (
            <div className={b('date')}>
                {this.renderPrevButton()}
                {' '}
                Июль {this.props.year}
                {' '}
                {this.renderNextButton()}
            </div>
        )
    }

    renderDaysIndexes(b, daysCount) {
        return (new Array(daysCount))
            .fill(0)
            .map((day, key) => (
                <span className={b('day')} key={key}>
                    {key + 1}
                </span>
            ));
    }

    renderItems(b, daysCount) {
        const { data } = this.props.habitsList;

        if (!data.length) {
            return 'Вы не завели ни одной привычки...';
        }


        return data
            .map((habit, key) => {
                const actualActivity = this.extractActualActivity(habit.activities);

                return (
                    <Habit
                        title={habit.title}
                        activities={actualActivity.days}
                        daysCount={daysCount}
                        key={key}
                        onDelete={this.handleItemDelete.bind(this, habit._id)}
                    />
                );
            });
    }

    render() {
        const b = bemCN('habits-list');
        const daysCount = getDaysInMonth(this.props.year, this.props.month);

        return (
            <div className={b()}>
                <div className={b('header')}>
                    {this.renderDate(b)}

                    <div className={b('days')}>
                        {this.renderDaysIndexes(b, daysCount)}
                    </div>
                </div>
                <ul className={b('body')}>
                    {this.renderItems(b, daysCount)}
                </ul>
                <div className="add">
                    <form className={b('add-form')}
                        action="/api/habits"
                        method="POST"
                        onSubmit={this.handleAddFormSubit}
                    >
                        <Input type="text" name="title" mix={b('add-input')} />
                        <Button type="submit" theme="green">add new</Button>
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
    }
)(HabitsList);

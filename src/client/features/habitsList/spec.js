import React                from 'react';
import configureMockStore   from 'redux-mock-store';
import { shallow, render }  from 'enzyme';
import sinon                from 'sinon';
import { expect }           from 'chai';
import Component            from './HabitsList';
import DateSwitcher         from 'components/DateSwitcher/DateSwitcher';


const mockStore = configureMockStore();
const defaultState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    error: null
};
const mockInitialState = {
    habitsList: defaultState,
};
const requiredProps = {
    year: 2016,
    month: 2,
};


function setup(specialProps) {
    const props = { ...requiredProps, ...specialProps };

    return <Component {...props} />;
}


describe('<HabitsList />', () => {
    describe('Component', () => {
        /* ------------------------------------------------------------------------------------------ */
        /* PROPS                                                                                      */
        /* ------------------------------------------------------------------------------------------ */
        describe('props:', () => {
            describe('year', () => {
                it('should pass that year to DateSwitcher', () => {
                    const year = 2015;
                    const wrapper = shallow(setup({
                        store: mockStore(mockInitialState),
                        year
                    })).shallow();

                    expect(wrapper.find(DateSwitcher).at(0).prop('year')).to.equal(year);
                });
            });

            describe('month', () => {
                it('should pass that month to DateSwitcher', () => {
                    const month = 1;
                    const wrapper = shallow(setup({
                        store: mockStore(mockInitialState),
                        month
                    })).shallow();

                    expect(wrapper.find(DateSwitcher).at(0).prop('month')).to.equal(month);
                });

                describe('= 31', () => {
                    it('should render 31 days in January', () => {
                        const wrapper = shallow(setup({
                            store: mockStore(mockInitialState),
                            month: 1,
                        })).shallow();

                        expect(wrapper.find('.habits-list__day').length).to.equal(31);
                    });
                });
                describe('= 30', () => {
                    it('should render 30 in April', () => {
                        const wrapper = shallow(setup({
                            store: mockStore(mockInitialState),
                            month: 4,
                        })).shallow();

                        expect(wrapper.find('.habits-list__day').length).to.equal(30);
                    });
                });
            });

            describe('habitsList', () => {
                describe('loading', () => {
                    describe('= true', () => {
                        const loadingText = 'Грузю...';

                        it(`should show text "${loadingText}"`, () => {
                            const wrapper = shallow(setup({
                                store: mockStore({
                                    habitsList: {
                                        ...defaultState,
                                        isLoading: true,
                                    }
                                }),
                            })).shallow()

                            expect(wrapper.find('.habits-list__body').at(0).text()).to.equal(loadingText);
                        })
                    });
                });
                describe('data', () => {
                    describe('= []', () => {
                        const emptyText = 'Вы не завели ни одной привычки...';

                        it(`should show text "${emptyText}"`, () => {
                            const wrapper = shallow(setup({
                                store: mockStore({
                                    habitsList: {
                                        ...defaultState,
                                        data: [],
                                    },
                                }),
                            })).shallow()

                            expect(wrapper.find('.habits-list__body').at(0).text()).to.equal(emptyText);
                        });
                    });
                    describe('= [...]', () => {
                        const emptyText = 'Вы не завели ни одной привычки...';

                        it(`should render all passed habits`, () => {
                            const data = [
                                { _id: '1', title: 'Morning Exercises', daysCount: 30 },
                                { _id: '2', title: 'Read a book', daysCount: 30 },
                                { _id: '3', title: 'Learn English', daysCount: 30 },
                            ];
                            const wrapper = shallow(setup({
                                store: mockStore({
                                    habitsList: {
                                        ...defaultState,
                                        data,
                                    },
                                }),
                            })).shallow()

                            expect(wrapper.find('.habits-list__body').children().length).to.equal(data.length);
                        });
                    });
                });
            });
        });


        /* ------------------------------------------------------------------------------------------ */
        /* CALLBACKS                                                                                  */
        /* ------------------------------------------------------------------------------------------ */
        describe('callbacks', () => {
        });
    });
});

import React                    from 'react';
import { shallow, render, mount }      from 'enzyme';
import sinon                    from 'sinon';
import { expect }               from 'chai';
import Component                from './Habit';
import Cell                     from '../Cell/Cell';


const defaultProps = {
    _id: '1232qwe321312',
    title: 'title',
    daysCount: 31,
};


function setup(specialProps) {
    const props = { ...defaultProps, ...specialProps };

    return <Component {...props} />;
}


describe('<Habit />', () => {

    /* ------------------------------------------------------------------------------------------ */
    /* PROPS                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    describe('props', () => {
        describe('title', () => {
            it('should render passed title', () => {
                const title = 'Some title';
                const wrapper = shallow(setup({ title }));

                expect(wrapper.find('.habit__title-text').text()).to.equal(title);
            });
        });

        describe('daysCount', () => {
            let daysCount = 30;

            describe(daysCount, () => {
                it(`should render ${daysCount} Cells`, () => {
                    const wrapper = shallow(setup({ daysCount }));

                    expect(wrapper.find('.habit__cells').children().length).to.equal(daysCount);
                });
            });

            daysCount = 31;

            describe(daysCount, () => {
                it(`should render ${daysCount} Cells`, () => {
                    const wrapper = shallow(setup({ daysCount }));

                    expect(wrapper.find('.habit__cells').children().length).to.equal(daysCount);
                });
            });
        });
    });

    describe('activities', () => {
        const activities = [1, 2, 15];

        it('should mark respective Cells as active', () => {
            const wrapper = shallow(setup({ activities }));

            // Проверяем, что соотвествующиее ячейки стали активными.
            activities.forEach(item => {
                expect(wrapper.find(Cell).get(item - 1).props.active).to.be.true;
            });
        });
    });


    /* ------------------------------------------------------------------------------------------ */
    /* CALLBACKS                                                                                  */
    /* ------------------------------------------------------------------------------------------ */
    describe('callbacks', () => {
        describe('onActivityToggle', () => {
            it('should call callback "onActivityToggle" when click on .habit__cell and pass habit id and number of day', () => {
                const id = '123';
                const onActivityToggle = sinon.spy();
                const dayNumberToClick = 1; // первый день месяца
                const wrapper = mount(setup({
                    _id: id,
                    onActivityToggle,
                }));

                wrapper.find('.habit__cells').childAt(dayNumberToClick - 1).simulate('click');

                expect(onActivityToggle.calledOnce).to.be.true;
                expect(onActivityToggle.calledWith(id, dayNumberToClick)).to.be.true;
            })
        });

        describe('onDelete', () => {
            it('should call callback "onDelete" when click on delete icon and pass habit id and title', () => {
                const id = '123';
                const title = 'Read a book';
                const onDelete = sinon.spy();
                const wrapper = shallow(setup({
                    _id: id,
                    title,
                    onDelete,
                }));

                wrapper.find('.habit__delete').simulate('click');

                expect(onDelete.calledOnce).to.be.true;
                expect(onDelete.calledWith(id, title)).to.be.true;
            })
        });
    });
});

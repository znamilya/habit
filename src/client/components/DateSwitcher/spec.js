import React                    from 'react';
import { shallow, render }      from 'enzyme';
import { expect }               from 'chai';
import { resolveNameByIndex }   from 'helpers/date';
import Component                from './DateSwitcher';


const defaultProps = {
    year: 2016,
    month: 7,
};


function setup(specialProps) {
    const props = { ...defaultProps, ...specialProps };

    return <Component {...props} />;
}


describe('<DateSwitcher />', () => {

    /* ------------------------------------------------------------------------------------------ */
    /* PROPS                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    describe('props', () => {

        // year, month
        // describe('year, month', () => {
        //     describe('2016, 7', () => {
        //         const wrapper = render(setup({
        //             year: 2016,
        //             month: 7,
        //         }));
        //         const monthName = resolveNameByIndex(7);

        //         expect(wrapper.find('.date-switcher__value').html()).toEqual(`${monthName} 2016`);
        //     });
        // });

        // prevHref
        describe('prevHref', () => {
            const prevHref = '/2016/05';

            describe('undefined', () => {
                it('should not render prev arrow', () => {
                    const wrapper = shallow(setup({
                        prevHref: '',
                    }));

                    expect(wrapper.find('.date-switcher__nav_prev').length).to.equal(0);
                });
            });

            describe(prevHref, () => {
                it('should render prev arrow', () => {
                    const wrapper = shallow(setup({ prevHref }));

                    expect(wrapper.find('.date-switcher__nav_prev').length).to.equal(1);
                });

                it('should render prev arrow with icon "navigate_before"', () => {
                    const wrapper = shallow(setup({ prevHref }));

                    expect(wrapper.find('.date-switcher__nav_prev').render().text()).to.equal('navigate_before');
                });

                it(`should render Link with "to" equal ${prevHref}`, () => {
                    const wrapper = shallow(setup({ prevHref }));

                    expect(wrapper.find('.date-switcher__nav_prev').prop('to')).to.equal(prevHref);
                });
            });
        });

        // nextHref
        describe('nextHref', () => {
            const nextHref = '/2016/05';

            describe('undefined', () => {
                it('should not render next arrow', () => {
                    const wrapper = shallow(setup({
                        nextHref: '',
                    }));

                    expect(wrapper.find('.date-switcher__nav_next').length).to.equal(0);
                });
            });

            describe(nextHref, () => {
                it('should render next arrow', () => {
                    const wrapper = shallow(setup({ nextHref }));

                    expect(wrapper.find('.date-switcher__nav_next').length).to.equal(1);
                });

                it('should render next arrow with icon "navigate_before"', () => {
                    const wrapper = shallow(setup({ nextHref }));

                    expect(wrapper.find('.date-switcher__nav_next').render().text()).to.equal('navigate_next');
                });

                it(`should render Link with "to" equal ${nextHref}`, () => {
                    const wrapper = shallow(setup({ nextHref }));

                    expect(wrapper.find('.date-switcher__nav_next').prop('to')).to.equal(nextHref);
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

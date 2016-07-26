import React                from 'react';
import { shallow, render }  from 'enzyme';
import sinon                from 'sinon';
import { expect }           from 'chai';
import Component            from './Cell';


const defaultProps = {
    dayNumber: 1,
    active: false,
};


function setup(specialProps) {
    const props = { ...defaultProps, ...specialProps };

    return <Component {...props} />;
}


describe('<Cell />', () => {

    /* ------------------------------------------------------------------------------------------ */
    /* PROPS                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    describe('props', () => {

        // active
        describe('active', () => {
            describe('false', () => {
                it('shoult not have class-modifier "cell_active"', () => {
                    const wrapper = shallow(setup({
                        active: false,
                    }));

                    expect(wrapper.find('.cell').hasClass('cell_active')).to.be.false;
                });
            });
            describe('true', () => {
                it('shoult have class-modifier "cell_active"', () => {
                    const wrapper = shallow(setup({
                        active: true,
                    }));

                    expect(wrapper.find('.cell').hasClass('cell_active')).to.be.true;
                });
            });
        });
    });


    /* ------------------------------------------------------------------------------------------ */
    /* CALLBACKS                                                                                  */
    /* ------------------------------------------------------------------------------------------ */
    describe('callbacks', () => {
        it('should call "onToggle" callback on click and pass dayNumber', () => {
            const onToggle = sinon.spy();
            const wrapper = shallow(setup({ onToggle }));

            wrapper.simulate('click');

            expect(onToggle.calledOnce).to.be.true;
            expect(onToggle.calledWith(defaultProps.dayNumber)).to.be.true;
        });
    });
});

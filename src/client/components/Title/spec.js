import React                from 'react';
import { shallow, render }  from 'enzyme';
import { expect }           from 'chai';
import Component            from './Title';


const innerText = 'inner text';
const defaultProps = {
    level: "1",
};


function setup(specialProps) {
    const props = { ...defaultProps, ...specialProps };

    return <Component {...props}>{innerText}</Component>;
}


describe('<Title />', () => {

    /* ------------------------------------------------------------------------------------------ */
    /* PROPS                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    describe('props', () => {

        // level
        describe('level', () => {
            ['1', '2', '3', '4', '5', '6'].forEach(level => {
                describe(level, () => {
                    it(`should render h${level}`, () => {
                        const wrapper = shallow(setup({ level }));

                        expect(wrapper.type()).to.equal(`h${level}`);
                    });

                    it(`should has class-modifier "title_level_${level}"`, () => {
                        const wrapper = shallow(setup({ level }));

                        expect(wrapper.hasClass(`title_level_${level}`)).to.be.true;
                    });
                });
            });
        });
    });
});

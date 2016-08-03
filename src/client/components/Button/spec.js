import React                from 'react';
import { shallow, render }  from 'enzyme';
import sinon                from 'sinon';
import { expect }           from 'chai';
import Component            from './Button';


const defaultProps = {
    children: 'text',
};


function setup(specialProps) {
    const props = { ...defaultProps, ...specialProps };

    return <Component {...props}>{props.children}</Component>;
}


describe('<Button />', () => {
    describe('render children', () => {
        it('should render text children', () => {
            const text = 'some text...';
            const wrapper = shallow(setup({
                children: text,
            }));

            expect(wrapper.text()).to.equal(text);
        });

        it('should render element children', () => {
            const element = <span>'some text...'</span>;
            const wrapper = shallow(setup({
                children: element,
            }));

            expect(wrapper.contains(element)).to.be.true;
        });
    });


    /* ------------------------------------------------------------------------------------------ */
    /* PROPS                                                                                      */
    /* ------------------------------------------------------------------------------------------ */
    describe('props', () => {
        describe('tagName', () => {
            ['button', 'a', 'span'].forEach(item => {
                describe(item, () => {
                    it(`should render ${item}`, () => {
                        const wrapper = shallow(setup({
                            tagName: item,
                        }));

                        expect(wrapper.type()).to.equal(item);
                    });
                });
            });
        });

        describe('mix', () => {
            const mix = 'some-class';

            describe(mix, () => {
                it(`should has class .${mix}`, () => {
                    const wrapper = shallow(setup({ mix }));

                    expect(wrapper.find('.button').hasClass(`${mix}`)).to.be.true;
                });
            });
        });

        describe('theme', () => {
            const theme = 'green';

            describe(theme, () => {
                it(`should has class .button_theme_${theme}`, () => {
                    const wrapper = shallow(setup({ theme }));

                    expect(wrapper.find('.button').hasClass(`button_theme_${theme}`)).to.be.true;
                });
            });
        });

        describe('size', () => {
            const size = 'xl';

            describe(size, () => {
                it(`should has class .button_size_${size}`, () => {
                    const wrapper = shallow(setup({ size }));

                    expect(wrapper.find('.button').hasClass(`button_size_${size}`)).to.be.true;
                });
            });
        });
    });


    /* ------------------------------------------------------------------------------------------ */
    /* CALLBACKS                                                                                  */
    /* ------------------------------------------------------------------------------------------ */
    describe('callbacks', () => {
        describe('onClick', () => {
            it('should call callback "onClick" when click on button', () => {
                const onClick = sinon.spy();
                const wrapper = shallow(setup({ onClick }));

                wrapper.find('.button').simulate('click');

                expect(onClick.calledOnce).to.be.true;
            })
        });
    });
});

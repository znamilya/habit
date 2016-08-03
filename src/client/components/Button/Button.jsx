import React, { PropTypes }     from 'react';
import bemcl                    from 'bem-cl';

import './Button.styl';


class Button extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        tagName: PropTypes.string,
        mix: PropTypes.object,
        theme: PropTypes.string,
        size: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        tagName: 'button',
        onClick: () => {},
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemcl('button');
        const { tagName, theme, mix, size, ...rest } = this.props;

        return (
            <this.props.tagName
                className={b({ theme, size }).mix(mix)}
                type="button"
                {...rest}
            >
                {this.props.children}
            </this.props.tagName>
        );
    }
}

export default Button;

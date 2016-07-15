import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import './Button.styl';


class Button extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        tagName: PropTypes.string,
        mix: PropTypes.func,
        theme: PropTypes.string,
        size: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        tagName: 'button',
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('button');
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

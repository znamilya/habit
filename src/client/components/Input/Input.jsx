import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import './Input.styl';


/**
 * input-контрол
 */
class Input extends React.Component {

    static propTypes = {
        mix: PropTypes.func,
        onChange: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* HANDLERS                                                                                   */
    /* ------------------------------------------------------------------------------------------ */
    handleChange(e) {
        this.props.onChange(e.target.value);
    }


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('input');
        const { mix, ...rest } = this.props;

        if (this.props.onChange) {
            return (
                <input className={b({}).mix(mix)}
                    {...rest}
                    onChange={this.handleChange}
                />

            )
        }

        return (
            <input className={b({}).mix(mix)}
                {...rest}
            />
        );
    }
}


export default Input;

import React, { PropTypes }     from 'react';

import FormRow                  from './FormRow';
import FormLabel                from './FormLabel';

import './Form.styl';


/**
 * Описание компонента
 */
class Form extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        return (
            <form className="form" {...this.props}>
                {this.props.children}
            </form>
        );
    }
}

Form.Row = FormRow;
Form.Label = FormLabel;


export default Form;

import React, { PropTypes }     from 'react';


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
            <div className="form__row">
                {this.props.children}
            </div>
        );
    }
}


export default Form;

import React, { PropTypes }     from 'react';


/**
 * Описание компонента
 */
class Form extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        htmlFor: PropTypes.string,
    };

    static defaultProps = {
        htmlFor: '',
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        return (
            <label className="form__label" {...this.props}>
                {this.props.children}
            </label>
        );
    }
}


export default Form;

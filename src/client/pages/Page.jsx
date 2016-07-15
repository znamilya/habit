import React, { PropTypes }     from 'react';


class Page extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '',
    };


    componentWillMount() {
        this.setDocumentTitle(this.props.title);
    }


    setDocumentTitle(title) {
        document.title = `${title} - Habits`;
    }

    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        return this.props.children;
    }
}


export default Page;

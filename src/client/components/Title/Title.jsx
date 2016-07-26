import React, { PropTypes }     from 'react';
import bemchik                  from 'bemchik';

import './Title.styl';


/**
 * Описание компонента
 */
class Title extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6'])
    };

    static defaultProps = {
        level: 1,
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemchik('title');
        const { level } = this.props;
        const tag = {
            name: `h${level}`
        };

        return (
            <tag.name className={b({ level })}>
                {this.props.children}
            </tag.name>
        );
    }
}


export default Title;

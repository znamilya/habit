import React, { PropTypes }     from 'react';
import bemCN                    from 'bem-cn';

import Page                     from 'pages/Page';
import HabitsList               from 'modules/HabitsList/HabitsList'

import './Index.styl';


/**
 * Описание компонента
 */
class IndexPage extends React.Component {

    static propTypes = {
    };


    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemCN('index-page');
        const { params } = this.props;

        return (
            <Page title="Index">
                <HabitsList
                    year={Number(params.year)}
                    month={Number(params.month)}
                />
            </Page>
        );
    }
}


export default IndexPage;

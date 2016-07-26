import React, { PropTypes }     from 'react';
import bemchik                  from 'bemchik';

import Page                     from 'pages/Page';
import HabitsList               from 'features/habitsList/HabitsList'

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
        const b = bemchik('index-page');
        const { params } = this.props;

        return (
            <Page title="Index">
                <div className={b()}>
                    <HabitsList
                        year={Number(params.year)}
                        month={Number(params.month)}
                    />
                </div>
            </Page>
        );
    }
}


export default IndexPage;

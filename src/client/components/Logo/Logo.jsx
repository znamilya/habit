import React    from 'react';
import bemchik  from 'bemchik';

import './Logo.styl';

import logoSrc from './img/logo.png';


/**
 * Описание компонента
 */
class Logo extends React.Component {

    /* ------------------------------------------------------------------------------------------ */
    /* RENDER                                                                                     */
    /* ------------------------------------------------------------------------------------------ */
    render() {
        const b = bemchik('logo');

        return (
            <div className={b()}>
                <img src={logoSrc} alt=""/>
            </div>
        );
    }
}


export default Logo;

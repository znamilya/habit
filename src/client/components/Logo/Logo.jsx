import React    from 'react';
import bemcl    from 'bem-cl';

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
        const b = bemcl('logo');

        return (
            <div className={b()}>
                <img src={logoSrc} alt=""/>
            </div>
        );
    }
}


export default Logo;

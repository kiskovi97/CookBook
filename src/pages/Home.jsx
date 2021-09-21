import ScrollAnimation from 'react-animate-on-scroll'
import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import {Cookie, Chicken} from './Icons'
import Receipt from './Components/Receipt'
import desserts from './desserts.js';
import dishes from './dishes.js';

var Home = () => 
<div className={styles.page}>
    <Me/>
    <div className={gStyles.grid}>
        <div>
            {desserts.map(station => (<Receipt proj={station}/>))}
        </div>
        <div>
            <ScrollAnimation animateIn="fadeInUp" animateOut="fadeOutDown" animateOnce>
            <div className={styles.logo}>
                <Cookie />
            </div>
            </ScrollAnimation>
        </div>
    </div>
    <div className={gStyles.grid}>
        <div>
            <ScrollAnimation animateIn="fadeInUp" animateOut="fadeOutDown" animateOnce>
            <div className={styles.logo}>
                <Chicken />
            </div>
            </ScrollAnimation>
        </div>
        <div>
            {dishes.map(station => (<Receipt proj={station}/>))}
        </div>
    </div>
</div>
export default Home
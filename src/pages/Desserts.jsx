import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import {Cookie} from './Icons'
import ScrollAnimation from 'react-animate-on-scroll'
import projects from './desserts.js';

var Desserts = () =>
    <div className={styles.page}>
        <div className={gStyles.grid}>
            <div>
                {projects.map(station => (<Receipt proj={station}/>))}
            </div>
            <div>
                <ScrollAnimation animateIn="fadeInUp" animateOut="fadeOutDown" animateOnce>
                <div className={styles.logo}>
                    <Cookie />
                </div>
                </ScrollAnimation>
            </div>
        </div>
    </div>
    
export default Desserts
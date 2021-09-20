import ScrollAnimation from 'react-animate-on-scroll'
import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import {Pasta} from './Icons'

var Home = () => 
<div className={styles.page}>
    <div>
        <Me/>
    </div>
    <div className={gStyles.grid}>
        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
            <h2>Receipts</h2>
            <h3>Pastas</h3>
            <div>One, Two, Other Dish</div>
            <h3>Desserts</h3>
            <div>One, Dessert, Other</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
            <div className={styles.logo}>
                <Pasta />
            </div>
        </ScrollAnimation>
    </div>
</div>
export default Home
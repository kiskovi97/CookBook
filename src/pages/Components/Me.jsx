import React from 'react'
import styles from './Me.module.css'
import image from '../../images/foodTemplate.webp'
import gStyles from '../Grid.module.css'
import pStyles from '../Page.module.css'

import insta from '../../logos/instagram.svg'
import github from '../../logos/github.svg'
import ScrollAnimation from 'react-animate-on-scroll'

var Me = () =>
    <div className={gStyles.grid + " " + styles.Me}>
        <div className={styles.titleBlock}>
            <div className={styles.frontTitle}>
                <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce offset={20}>
                    <div className={styles.title} >
                        Cooking Book
                    </div>
                </ScrollAnimation>
                <ScrollAnimation className={styles.logos} animateIn="fadeInLeft" animateOut="fadeOutLeft" offset={180} animateOnce>
                    <a href="https://www.instagram.com/kiskovi9706/" className={pStyles.minilogo}><img src={insta} alt="" /></a>
                    <a href="https://github.com/kiskovi97" className={pStyles.minilogo}><img src={github} alt="" /></a>
                </ScrollAnimation>
            </div>
            <ScrollAnimation animateIn="fadeInUp" animateOut="fadeOutDown" className={styles.person} animateOnce>
                <img src={image} alt="" />
            </ScrollAnimation>
        </div>
        <div className={styles.description}>
            <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce>
                <h1>We are a nice couple, who loves to cook</h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" offset={180} animateOnce>
                We are Mark and Gergő. A simple couple from Hungary.
                We love to cook (mostly on sundays) and post results on social media.
                But we wanted to make a website too, where we can share the recepiets that we tried.
                We post the original receipt and the one we modified.
                Please enjoy and feel free to contact us how your experients went.
            </ScrollAnimation>
        </div>
    </div>

export default Me;
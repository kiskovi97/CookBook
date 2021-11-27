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
                    <div className={styles.title} hidden={!navigator.language.startsWith("en")}>
                        Legény fogó
                    </div>
                    <div className={styles.title} hidden={!navigator.language.startsWith("hu")}>
                        Husband Material
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
                <h1 hidden={!navigator.language.startsWith("hu")}>"Most már férjhez mehetsz"</h1>
                <h1 hidden={!navigator.language.startsWith("en")}>"You can get married now"</h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" offset={180} animateOnce>
                <div hidden={!navigator.language.startsWith("hu")}>
                    Van egy olyan mondás miszerint, ha egy étel igazán jól sikerül, akkor azt szokás mondani "most már férjhez mehetsz".
                    Mivel mi is megkaptuk ezt már egy párszor, úgy gondoltuk megosztjuk veletek azokat a recepteket,
                    amelyekkel ti is hasonló sikert érhettek el.
                </div>
                <div hidden={!navigator.language.startsWith("en")}>
                    When you cook a really good meal in Hungary, than you often get the compliment: "You can get married now".
                    We got this a couple of times, so we thaught we should share the recipes that earned this compliment.
                    Please enjoy and feel free to contact us how your experiences went.
                </div>
                <div className={styles.names}>
                    Gergő & Mark
                </div>
            </ScrollAnimation>
        </div>
    </div>

export default Me;
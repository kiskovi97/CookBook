'use client'

import styles from './Me.module.css'
import gStyles from './Grid.module.css'
import pStyles from './Page.module.css'

import insta from '../logos/instagram.svg'
import github from '../logos/github.svg'
import { motion } from "framer-motion";
import Image from 'next/image'

var Me = () =>
    <div className={gStyles.grid + " " + styles.Me}>
        <div className={styles.titleBlock}>
            <div className={styles.frontTitle}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    >
                    <div className={styles.title} hidden={!navigator.language.startsWith("en")}>
                        Husband Material
                    </div>
                    <div className={styles.title} hidden={!navigator.language.startsWith("hu")}>
                        Legényfogó
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    >
                    <a href="https://www.instagram.com/evilexcuse/" className={pStyles.minilogo}>
                        <Image src={insta.src} alt=""  width={24} height={24}/>
                    </a>
                    <a href="https://github.com/kiskovi97" className={pStyles.minilogo}>
                        <Image src={github.src} alt="" width={24} height={24} />
                    </a>
                </motion.div>
            </div>
        </div>
        <div className={styles.description}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                >
                <h1 hidden={!navigator.language.startsWith("hu")}>"Most már férjhez mehetsz"</h1>
                <h1 hidden={!navigator.language.startsWith("en")}>"You can get married now"</h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
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
            </motion.div>
        </div>
    </div>

export default Me;
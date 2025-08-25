import styles from './SmallReceipt.module.css'

import { motion } from "framer-motion";

import Link from "next/link";

const SmallReceipt = ({proj, hidden}) => {

    var imageLink = proj?.image?.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images");
    var id = proj.id;
    return (
        <div hidden={hidden}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                >
                <Link className={styles.receipt} href={"/dbdish/" + id} >
                    <div className={styles.image} >
                        <img src={imageLink} hidden={!proj.image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{proj.title}</div>
                        <div className={styles.details}>{proj.details}</div>
                    </div>
                </Link>
            </motion.div>
        </div>
        )
};

export default SmallReceipt
import styles from './BigReceipt.module.css'
import { motion } from "framer-motion";
import { Recipe } from "../types/recipe";
import Link from "next/link";

interface BigReceiptProps {
  proj: Recipe;
}
const BigReceipt: React.FC<BigReceiptProps> = ({ proj }) => {

    var imageLink = proj?.image?.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images");
        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{proj.title}</h1>
                        <div className={styles.tags}>
                            {proj.tags?.map(tag => (
                                <div className={styles.tag} key={tag}>
                                    <Link href={"/all?filter=" + tag} >
                                        {tag}
                                    </Link>
                                </div>))}
                        </div>
                        <div>{proj.details}</div>
                        {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>) : null}
                        {proj.sources?.map(source => (
                            <div key={source.link}>
                                <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                            </div>))}

                    </div>
                    <div className={styles.image}>
                        <img src={imageLink} hidden={!proj.image} alt="" className={styles.background} />
                    </div>
                </div>
                <div className={styles.description}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        >
                        {proj.ingredients?.map(station => (
                            <div key={station.title}>
                                <h3>{station.title}</h3>
                                <div>
                                    {station.list?.map((element, index) => (<li key={index}>{element}</li>))}
                                </div>
                            </div>))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            {proj.instructions?.map((station, index) => (<li  key={index}>{station}</li>))}
                        </div>
                    </motion.div>
                </div>
            </div>)

}

export default BigReceipt
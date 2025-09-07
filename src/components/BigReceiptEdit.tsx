import styles from './BigReceipt.module.css'
import inputStyles from './Input.module.css'
import { motion } from "framer-motion";
import { Recipe } from "../types/recipe";
import Image from 'next/image';
import Link from "next/link";
import InputList, { EventType } from './InputList';
import { useEffect, useState } from 'react';
import { uploadData } from '../lib/dynamoService';
import { useRouter } from "next/navigation";

interface BigReceiptEditProps {
  proj: Recipe;
}
const BigReceiptEdit: React.FC<BigReceiptEditProps> = ({ proj }) => {
    const router = useRouter(); // Add this line
    const [allValues, setAllValues] = useState(proj);
    const handleChange = (e: EventType) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }; 
    
    const upload = async () => {
        await uploadData(allValues);
        alert("Uploaded");
        router.push("/dbdish/" + proj.id); // Navigate after upload
    };

    useEffect(() => {
        if(proj) {
            setAllValues({ ...proj })
        }
    }, [proj])

    var imageLink = proj?.image?.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images");
        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{proj.title}</h1>
                        <div className={styles.tags}>
                            <h3>Tags</h3>
                            <InputList name="tags" onChanged={handleChange} defaultState={proj.tags || []}/>
                        </div>
                        <div>{proj.details}</div>
                        {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>) : null}
                        {proj.sources?.map(source => (
                            <div key={source.link}>
                                <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                            </div>))}

                    </div>
                    <div className={styles.image}>
                        <Image src={imageLink ?? ""} alt={proj.title} className={styles.background} width={526} height={526} />
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
                            <InputList name="instructions" onChanged={handleChange} defaultState={proj.instructions || []}/>
                        </div>
                    </motion.div>
                </div>
                <div  className={styles.description}>
                    <div>
                        <button className={inputStyles.button} onClick={upload}>Upload</button>
                    </div>
                </div>
            </div>)

}

export default BigReceiptEdit
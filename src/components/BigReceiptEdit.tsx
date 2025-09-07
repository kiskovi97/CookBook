import styles from './BigReceipt.module.css'
import inputStyles from './Input.module.css'
import { motion } from "framer-motion";
import { IngredientGroup, Recipe } from "../types/recipe";
import Image from 'next/image';
import InputList, { EventType } from './InputList';
import EditableIngredients from './EditableIngredients';
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }; 
    
    const handleIngredientsChange = (e: IngredientGroup[]) => {
        setAllValues({ ...allValues, ingredients: e });
    }

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
                <div className={styles.description}>
                    <div>
                        <input className={inputStyles.text}
                                type="text"
                                name='title'
                                placeholder="Paste recipe URL here"
                                defaultValue={allValues.title}
                                onChange={handleInputChange}
                        />
                        <textarea className={inputStyles.textarea}
                                name='details'
                                placeholder="Paste recipe URL here"
                                defaultValue={allValues.details}
                                onChange={handleInputChange}
                        />
                        <div className={styles.tags}>
                            <h3>Tags</h3>
                            <InputList name="tags" onChanged={handleChange} defaultState={proj.tags || []}/>
                        </div>
                    </div>
                    <div>
                        <Image src={imageLink ?? ""} alt={proj.title}
                            width={256} height={256} style={{ objectFit: "cover" }}/>
                        <textarea className={inputStyles.textarea}
                                name='image'
                                placeholder="Paste image URL here"
                                defaultValue={allValues.image}
                                onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={styles.description}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        >
                        <EditableIngredients onChanged={handleIngredientsChange} defaultState={proj.ingredients || []}/>
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
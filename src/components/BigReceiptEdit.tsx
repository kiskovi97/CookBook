'use client'

import styles from './BigReceipt.module.css'
import inputStyles from './Input.module.css'
import { motion } from "framer-motion";
import { IngredientGroup, Recipe } from "@/types/recipe";
import Image from 'next/image';
import InputList, { EventType } from './InputList';
import EditableIngredients from './EditableIngredients';
import { useEffect, useState } from 'react';
import { uploadData } from '@/lib/dynamoService';
import { useRouter } from "next/navigation";
import { useAuth } from './AuthContext';
import RecipeInspection from './RecipeInspection';
import AddDishButton from './ExtractRecipeButton';
import UpdateImageButton from './ExtractImageButton';

interface BigReceiptEditProps {
  proj: Recipe;
}
const BigReceiptEdit: React.FC<BigReceiptEditProps> = ({ proj }) => {
    const router = useRouter(); // Add this line
    const [allValues, setAllValues] = useState(proj);
    const [imageLink, setImageLink] = useState("");
    const user = useAuth();
    if (!user) return <div>Please log in to upload a recipe.</div>;

    const handleChange = (e: EventType) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }; 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }; 
    
    const handleIngredientsChange = (e: IngredientGroup[]) => {
        setAllValues({ ...allValues, ingredients: e });
    }
    const handleExtract = (e: Recipe) => {
        allValues.title = e.title;
        allValues.image = e.image;
        allValues.ingredients = e.ingredients;
        allValues.instructions = e.instructions;
        setAllValues({ ...allValues });
    }; 
    const handleUpdateImage = (e: string) => {
        console.log("image was updated to: ", e);
        allValues.image = e;
        setAllValues({ ...allValues });
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
    }, [proj]);
    useEffect(() => {
        if(allValues.image) {
            setImageLink(allValues.image.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images") || "");
        }
    }, [allValues]);
        return (
            <div className={styles.receipt}>
                <RecipeInspection recipe={proj} />
                <AddDishButton onClickedAndChanged={(recipe) => handleExtract(recipe)} />
                <UpdateImageButton onClickedAndChanged={(image) => handleUpdateImage(image)} />
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
                        {imageLink ? <Image src={imageLink} alt={proj.title}
                            width={256} height={256} style={{ objectFit: "cover" }}/> : null}
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
import React, { useEffect, useState} from 'react'
import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useHistory } from 'react-router-dom';
import fetchRecipe from './fetchRecipe';

const Receipt = ({proj, hidden}) => {
    const history = useHistory();
    const handleClick = (index) => history.push(index);

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function extractRecipe(url) {
            try {
                var data = await fetchRecipe(url);
                setRecipe(data);
            } catch {

            }
        }

        if (proj.sources && proj.sources.length > 0) {
            extractRecipe(proj.sources[0].link);
        }

    }, [proj, setRecipe])

    var index = proj.index;
    if (recipe) {
        return (
            <div hidden={hidden}>
                <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                    <div className={styles.receipt} onClick={() => handleClick("dish/" + index)} >
                        <div className={styles.image} >
                            <img src={recipe.imageUrl} hidden={!recipe.imageUrl} alt="" className={styles.background} />
                        </div>
                        <div className={styles.description} >
                            <div className={styles.title}>{recipe.title}</div>
                            <div className={styles.details}>{recipe.details}</div>
                        </div>
                    </div>

                </ScrollAnimation>
            </div>
        )
    }

    if (proj) {
        return (
            <div hidden={hidden}>
                <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                    <div className={styles.receipt} onClick={() => handleClick("dish/" + index)} >
                        <div className={styles.image} >
                            <img src={proj.image} hidden={!proj.image} alt="" className={styles.background} />
                        </div>
                        <div className={styles.description} >
                            <div className={styles.title}>{proj.title}</div>
                            <div className={styles.details}>{proj.details}</div>
                        </div>
                    </div>

                </ScrollAnimation>
            </div>
        )
    }
    return (<div>NoContentAdded</div>)
};

export default Receipt
import React, { useEffect, useState} from 'react'
import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useNavigate  } from 'react-router';
import fetchRecipe from './fetchRecipe';

const Receipt = ({proj, hidden}) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function extractRecipe(url) {
            try {
                var data = await fetchRecipe(url);
                setRecipe(data);
            } catch {

            }
        }

        if (proj.link) {
            extractRecipe(proj.link);
        }

    }, [proj, setRecipe])

    var index = proj.index;
    if (recipe) {
        return (
            <div hidden={hidden}>
                <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                    <div className={styles.receipt} onClick={() => handleClick("dish/" + index)} >
                        <div className={styles.image} >
                            <img src={recipe.image} hidden={!recipe.image} alt="" className={styles.background} />
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
    
        if (proj.link)
            return (<div hidden={hidden}>
                <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                    <div className={styles.receipt}>
                        <div className={styles.image} >
                        </div>
                        <div className={styles.description} >
                        </div>
                    </div>
                </ScrollAnimation>
            </div>);

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
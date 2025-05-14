import styles from './Receipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import React, { useEffect, useState } from 'react';
import fetchRecipe from './fetchRecipe';


function BigReceipt({ proj }) {

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

    if (recipe) {
        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{recipe.title}</h1>
                        <div>{recipe.details}</div>
                        <div>Forrás:</div>
                        <div>
                            <a href={proj.link} target="_blank" rel="noreferrer">Link to the original website</a>
                        </div>
                        {recipe.tags?.map(source => (
                            <span className={styles.tag}>
                                {source}
                            </span>))}

                    </div>
                    <div className={styles.image}>
                        <img src={recipe.imageUrl} hidden={!recipe.imageUrl} alt="" className={styles.background} />
                    </div>
                </div>
                <div className={styles.description}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        <div>
                            <h3>Ingredients</h3>
                            <div>
                                {recipe.ingredients?.map(element => (<li>{element}</li>))}
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        <div>
                            {proj.comment ? (<li>COMMENT: {proj.comment}</li>) : null}
                            {recipe.instructions?.map(station => (<li>{station}</li>))}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>)
    }

    if (proj) {
    
        if (proj.link)
            return (<div className={styles.receipt}>
                <div  className={styles.main}>

                </div>
                <div  className={styles.description}>

                </div>
            </div>);

        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{proj.title}</h1>
                        <div>{proj.details}</div>
                        {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>) : null}
                        {proj.sources?.map(source => (
                            <div>
                                <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                            </div>))}

                    </div>
                    <div className={styles.image}>
                        <img src={proj.image} hidden={!proj.image} alt="" className={styles.background} />
                    </div>
                </div>
                <div className={styles.description}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        {proj.ingredients?.map(station => (
                            <div>
                                <h3>{station.title}</h3>
                                <div>
                                    {station.list?.map(element => (<li>{element}</li>))}
                                </div>
                            </div>))}
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        <div>
                            {proj.comment ? (<li>{proj.comment}</li>) : null}
                            {proj.instructions?.map(station => (<li>{station}</li>))}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>)
    }

    return (<div>NoContentAdded</div>)

}

export default BigReceipt
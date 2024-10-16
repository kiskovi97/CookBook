import styles from './Receipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import React, { useEffect, useState } from 'react';

async function extractRecipe(url) {
    try {
        console.log(url);
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extracting recipe title, ingredients, and steps using class names
        const title = doc.querySelector('.entry-title').textContent.trim();
        const ingredients = Array.from(doc.querySelectorAll('.ingredients-content dd'))
                                 .map(ing => ing.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const steps = Array.from(doc.querySelectorAll('.the-content-div p'))
                           .map(step => step.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
                           const imageMeta = doc.querySelector('meta[property="og:image"]');
                           const imageUrl = imageMeta ? imageMeta.getAttribute('content') : null;
           
        // Creating JSON formatted recipe
        const recipe = {
            title,
            ingredients,
            steps,
            imageUrl
        };
    
        console.log(JSON.stringify(recipe, null, 2));
    
        return recipe;
    } catch
    {

    }
}


function BigReceipt({proj}) {

    const [recipe, setRecipe] = useState(null);
        
        useEffect(async () => {
            if (proj.sources && proj.sources.length > 0)
            {
                try {
                    var data = await extractRecipe(proj.sources[0].link);
                    setRecipe(data);
                } catch
                {

                }
            }

        }, [proj])

    if (recipe) {
        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{recipe.title}</h1>
                        <div>{proj.details}</div>
                        {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>):null}
                        {proj.sources?.map(source => (
                            <div>
                                <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                            </div>))}
                        
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
                            {recipe.steps?.map(station => (<li>{station}</li>))}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>)
    }
        if (proj) {
            return (
                <div className={styles.receipt}>
                    <div className={styles.main}>
                        <div className={styles.details}>
                            <h1 className={styles.title}>{proj.title}</h1>
                            <div>{proj.details}</div>
                            {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>):null}
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
                                {proj.howToMakeIt?.map(station => (<li>{station}</li>))}
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>)
        }

        return (<div>NoContentAdded</div>)
    
}

export default BigReceipt
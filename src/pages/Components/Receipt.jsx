import React from 'react'
import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useHistory } from 'react-router-dom';

const Receipt = (prop) => {
    const history = useHistory();
    const handleClick = (index) => history.push(index);
    
    if (prop.proj) {
        var index = prop.proj.index;
        return (
        <div hidden={prop.hidden}>
            <ScrollAnimation animateIn="fadeInUp" animateOut="fadeOutUp" animateOnce >
                <div className={styles.receipt} onClick={() => handleClick("dish/"+index)} >
                    <div className={styles.image} >
                <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background}/>
                </div>
                <div className={styles.description} >
                    <div className={styles.title}>{prop.proj.title}</div>
                    <div className={styles.details}>{prop.proj.details}</div>
                </div>
                    </div>
                
            </ScrollAnimation>
        </div>
        )
    }
    return (<div>NoContentAdded</div>)
  };

export default Receipt
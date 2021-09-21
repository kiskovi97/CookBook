import React from 'react'
import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useHistory } from 'react-router-dom';

const Receipt = (prop) => {
    const history = useHistory();
    const handleClick = (index) => history.push(index);
    
    if (prop.proj) {
        var index = prop.index;
        return (
        <div className={styles.receipt}>
            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce  className={styles.image}>
                <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => handleClick(index)}/>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                <div className={styles.title}>{prop.proj.title}</div>
                <div className={styles.details}>{prop.proj.details}</div>
            </ScrollAnimation>
        </div>)
    }
    return (<div>NoContentAdded</div>)
  };

export default Receipt
import React from 'react'
import styles from './Receipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'

class BigReceipt extends React.Component {
    state = {
        clicked: false
    }

    onImageClicked = (value) => {
        this.setState({clicked: value});
    }

    render () {
        var prop = this.props;
        if (prop.proj) {
            return(
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <div className={styles.title}>{prop.proj.title}</div>
                        <div>{prop.proj.details}</div>
                    </div>
                    <div className={styles.image}>
                        <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)}/>
                    </div>
                </div>
                <div className={styles.description}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                                {prop.proj.ingredients?.map(station => (
                                <div>
                                    <h3>{station.title}</h3>
                                    <div>
                                        {station.list?.map(element => (<li>{element}</li>))}
                                    </div>
                                </div>))}
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        <ol>
                            {prop.proj.howToMakeIt?.map(station => (<li>{station}</li>))}
                        </ol>
                    </ScrollAnimation>
                </div>
            </div>)
        }
        
        return (<div>NoContentAdded</div>)
    }
}

export default BigReceipt
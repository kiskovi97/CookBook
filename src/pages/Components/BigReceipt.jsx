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
                <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                    <div className={styles.title}>
                        <div>{prop.proj.title}</div>
                    </div>
                    <div className={styles.details}>
                        <div>{prop.proj.details}</div>
                    </div>
                    <div>
                            {prop.proj.ingredients?.map(station => (
                            <div>
                                <h3>{station.title}</h3>
                                <div>
                                    {station.list?.map(element => (<li>{element}</li>))}
                                </div>
                            </div>))}
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                    <div  className={styles.food}>
                        <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)}/>
                    </div>
                    <div>
                        {prop.proj.howToMakeIt?.map(station => (<li>{station}</li>))}
                    </div>
                </ScrollAnimation>
            </div>)
        }
        
        return (<div>NoContentAdded</div>)
    }
}

export default BigReceipt
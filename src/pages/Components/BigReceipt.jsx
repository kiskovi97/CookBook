import React from 'react'
import styles from './Receipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'

class BigReceipt extends React.Component {
    state = {
        clicked: false
    }

    onImageClicked = (value) => {
        this.setState({ clicked: value });
    }

    render() {
        var prop = this.props;
        if (prop.proj) {
            return (
                <div className={styles.receipt}>
                    <div className={styles.main}>
                        <div className={styles.details}>
                            <h1 className={styles.title}>{prop.proj.title}</h1>
                            <div>{prop.proj.details}</div>
                            {prop.proj.sources && prop.proj.sources.length > 0 ? (<div>Források:</div>):null}
                            {prop.proj.sources?.map(source => (
                                <div>
                                    <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                                </div>))}
                            
                        </div>
                        <div className={styles.image}>
                            <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)} />
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
                            <div>
                                {prop.proj.howToMakeIt?.map(station => (<li>{station}</li>))}
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>)
        }

        return (<div>NoContentAdded</div>)
    }
}

export default BigReceipt
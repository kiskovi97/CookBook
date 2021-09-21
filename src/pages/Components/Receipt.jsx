import React from 'react'
import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'

class Receipt extends React.Component {
    state = {
        clicked: false
    }

    onImageClicked = (value) => {
        this.setState({clicked: value});
    }

    //componentDidMount() {
    //    window.open('unitydl://thebookclub?Dashboard', '_blank');
    //   }
    //componentWillMount() {
    //    window.open('unitydl://thebookclub?Dashboard', '_blank');
    //   }

    render () {
        var prop = this.props;

        if (prop.proj) {
            return (
            <div className={styles.receipt}>
                <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce  className={styles.image}>
                    <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)}/>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                    <div className={styles.title}>{prop.proj.title}</div>
                    <div className={styles.details}>{prop.proj.details}</div>
                </ScrollAnimation>
            </div>)
        }
        return (<div>NoContentAdded</div>)
    }
}

export default Receipt
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

    //componentDidMount() {
    //    window.open('unitydl://thebookclub?Dashboard', '_blank');
    //   }
    //componentWillMount() {
    //    window.open('unitydl://thebookclub?Dashboard', '_blank');
    //   }

    render () {
        var prop = this.props;
        if (this.state.clicked) {
            return (
            <div className={styles.project}>
                <div className={styles.fullImage}  onClick={() => this.onImageClicked(false)}>
                    <img src={prop.proj.image} hidden={!prop.proj.image} alt=""/>
                    <div className={styles.details}><h3>{prop.proj.title}</h3>{prop.proj.details}</div>
                </div>
            </div>)
        }

        if (prop.proj) {
            var links = [];
    
            if (prop.proj.original)
                links.push((<div key="original"><a href={prop.proj.original} hidden={!prop.proj.original}>Original receipt</a></div>))
    
            return (<div>
                <div className={styles.project}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)}/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        <h3>{prop.proj.title}</h3>
                        <div className={styles.details}>{prop.proj.details}</div>
                        <div className={styles.links}>{links}</div>
                    </ScrollAnimation>
                </div>
                <div className={styles.project2}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        {prop.proj.ingredients?.map(station => (
                        <div>
                            <h1>{station.title}</h1>
                            <div>
                                {station.list?.map(element => (<li>{element}</li>))}
                            </div>
                        </div>))}
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        {prop.proj.howToMakeIt?.map(station => (<li>{station}</li>))}
                    </ScrollAnimation>
                </div>
            </div>)
        }
    
    
        return (<div>NoContentAdded</div>)
    }
}

export default BigReceipt
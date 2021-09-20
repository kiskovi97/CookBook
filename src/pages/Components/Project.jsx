import React from 'react'
import styles from './Project.module.css'
import ScrollAnimation from 'react-animate-on-scroll'

class Project extends React.Component {
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
            if (prop.proj.github)
                links.push((<div key="github"><a href={prop.proj.github} hidden={!prop.proj.github}>Github</a></div>))
    
            if (prop.proj.android)
                links.push((<div key="android"><a href={prop.proj.android} hidden={!prop.proj.github}>Play store</a></div>))
    
            if (prop.proj.youtube)
                links.push((<div key="youtube"><a href={prop.proj.youtube} hidden={!prop.proj.github}>Youtube</a></div>))
    
            if (prop.proj.pdf)
                links.push((<div key="pdf"><a href={prop.proj.pdf} hidden={!prop.proj.github}>Thesis informantion</a></div>))
    
            return (<div className={styles.project}>
                <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                    <img src={prop.proj.image} hidden={!prop.proj.image} alt="" className={styles.background} onClick={() => this.onImageClicked(true)}/>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                    <h3>{prop.proj.title}</h3>
                    <div className={styles.details}>{prop.proj.details}</div>
                    <div className={styles.links}>{links}</div>
                </ScrollAnimation>
            </div>)
        }
    
    
        return (<div>NoContentAdded</div>)
    }
}

export default Project
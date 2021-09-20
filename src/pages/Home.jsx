import ScrollAnimation from 'react-animate-on-scroll'
import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import {Skill} from './Icons'

var Home = () => 
<div className={styles.page}>
    <div>
        <Me/>
    </div>
    <div className={gStyles.grid}>
        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
            <h2>Skills</h2>
            <h3>Programming Languages</h3>
            <div>C, C++, C#, Java, Html, Css, Javascript, SQL</div>
            <h3>Software Skills</h3>
            <div>Blender3D, 3DSMax, AndroidStudio,
            AdobeIllustrator, AdobePhotoshop,
            Unity, Oracle, React, Angular,WebGL
            MicrosoftSQLServer, .NET</div>
            <h3>OtherSkills</h3>
            <div>Public Relations, ProjectManagment, GraphicDesign</div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
            <div className={styles.logo}>
                <Skill />
            </div>
        </ScrollAnimation>
    </div>
</div>
export default Home
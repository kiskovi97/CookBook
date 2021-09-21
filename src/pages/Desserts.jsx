import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import projects from './desserts.js';

var Desserts = () =>
    <div className={styles.page}>
        <div className={gStyles.grid_big}>
            {projects.map(station => (<Receipt proj={station}/>))}
        </div>
    </div>
    
export default Desserts
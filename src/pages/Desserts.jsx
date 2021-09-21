import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import projects from './desserts.js';

var Desserts = () =>
    <div className={styles.page}>
        <div className={gStyles.grid_big}>
            {projects.map((station, index)  => (<Receipt proj={station} index={'/dessert/'+ index}/>))}
        </div>
    </div>
    
export default Desserts
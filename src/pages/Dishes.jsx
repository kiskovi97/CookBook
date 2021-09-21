import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import projects from './dishes.js';

var Dishes = () =>
<div className={styles.page}>
    <div className={gStyles.grid_big}>
            {projects.map((station, index) => (<Receipt proj={station} index={'/dish/'+ index}/>))}
    </div>
</div>
    
export default Dishes
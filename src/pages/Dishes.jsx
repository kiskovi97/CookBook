import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import { dishesSorted } from './filters';

var Dishes = () =>
<div className={styles.page}>
    <div className={gStyles.grid_big}>
            {dishesSorted.map((station) => (<Receipt proj={station}/>))}
    </div>
</div>
    
export default Dishes
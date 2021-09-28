import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import { dessertsSorted } from './filters';

var Desserts = () =>
    <div className={styles.page}>
        <div className={gStyles.grid_big}>
            {dessertsSorted.map((station, index)  => (<Receipt proj={station} index={'/dish/'+ index}/>))}
        </div>
    </div>
    
export default Desserts
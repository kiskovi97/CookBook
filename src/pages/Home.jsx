import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import Receipt from './Components/Receipt'
import desserts from './desserts.js';
import dishes from './dishes.js';

var Home = () => 
<div className={styles.page}>
    <Me/>
    <div className={gStyles.grid_big}>
        {desserts.map((station, index) => (<Receipt proj={station} index={'/dessert/'+ index}/>))}
    </div>
    <div className={gStyles.grid_big}>
        {dishes.map((station, index) => (<Receipt proj={station} index={'/dish/'+ index}/>))}
    </div>
</div>
export default Home
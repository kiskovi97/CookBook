import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import Receipt from './Components/Receipt'
import { mainFive } from './filters';

var Home = () => 
<div className={styles.page}>
    <Me/>
    <div className={gStyles.grid_big}>
        {mainFive.map((station, index) => (<Receipt proj={station} index={'/dessert/'+ index}/>))}
    </div>
</div>
export default Home
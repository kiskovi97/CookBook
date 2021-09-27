import React from 'react'
import styles from './Page.module.css'
import BigReceipt from './Components/BigReceipt'
import projects from './dishes.js';

var Dish = () =>
    <div className={styles.page}>
        <BigReceipt proj={projects[window.location.href.split('/').at(-1)]}/>
    </div>
    
export default Dish
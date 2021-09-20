import React from 'react'
import styles from './Page.module.css'
import BigReceipt from './Components/BigReceipt'
import projects from './dishes.js';

var Dishes = () =>
    <div className={styles.page}>
        <div>
            <div>
                {projects.map(station => (<BigReceipt proj={station}/>))}
            </div>
        </div>
    </div>
    
export default Dishes
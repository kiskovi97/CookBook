import React from 'react'
import styles from './Page.module.css'
import BigReceipt from './Components/BigReceipt'
import dishes from './dishes';

var Dish = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    return (<div className={styles.page}>
        <BigReceipt proj={dishes.find(item => item.index === id)}/>
    </div>);
}
    
    
export default Dish
import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom'

var Navbar = () =>
(
    <div className={styles.Header}>
        <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/desserts" >Desserts</Link></li>
            <li> <Link to="/dishes" >Main dishes</Link></li>
        </ul>
    </div>)

export default Navbar;

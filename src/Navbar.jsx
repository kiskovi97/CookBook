import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom'

var Navbar = () =>
(
    <div className={styles.Header}>
        <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/about" >About Me</Link></li>
            <li> <Link to="/references">References</Link></li>
        </ul>
    </div>)

export default Navbar;

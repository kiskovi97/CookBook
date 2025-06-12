import styles from './Header.module.css';
import { Link } from 'react-router'

var Navbar = () =>
(
    <div className={styles.main}>
        <div className={styles.title}>
            Husband Material
        </div>
        <div className={styles.tabs}>
            <div> <Link to="/">Home</Link></div>
            <div> <Link to="/desserts" >Desserts</Link></div>
            <div> <Link to="/dishes" >Main dishes</Link></div>
        </div>
        <div className={styles.search}>
            <input type='text' placeholder='Search...'/>
        </div>
    </div>)

export default Navbar;

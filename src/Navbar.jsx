import styles from './Header.module.css';
import { Link } from 'react-router';
import {  useNavigate } from 'react-router';

var Navbar = ({search}) =>
{
    const navigate = useNavigate();
    return (
    <div className={styles.main}>
        <div className={styles.title}>
            <div> <Link to="/">Husband Material</Link></div>
        </div>
        <div className={styles.tabs}>
            <div> <Link to="/desserts" >Desserts</Link></div>
            <div> <Link to="/dishes" >Main dishes</Link></div>
            <div> <Link to="/all" >All</Link></div>
        </div>
        {
            search && <div className={styles.search}>
                <input 
                    type="text"
                    placeholder="Search..."
                    onBlur={(e) => navigate("/all?filter=" + e.target.value)} 
                />
            </div>
        }
    </div>);
}

export default Navbar;

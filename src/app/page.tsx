import Navbar from '../components/Navbar';
import Me from '../components/Me';
import DishList from '../components/DishList';
import styles from '../components/Page.module.css'

export default function Page() {
  return <>
    <Navbar search/>
    <div className={styles.page}>
        <Me />
        <DishList tag="" filter="" maxCount={7} orderBy="date-desc" />
    </div>
  </>;
}
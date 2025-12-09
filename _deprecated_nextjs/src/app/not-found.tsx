import Navbar from '@/components/Navbar';
import styles from '@/components/Page.module.css'

export default function Page() {
  return <>
    <Navbar search/>
    <div className={styles.page}> 404 Not found </div>
  </>;
}
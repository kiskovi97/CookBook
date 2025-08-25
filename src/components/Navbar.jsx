'use client'

import styles from './Header.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";

var Navbar = ({search}) =>
{
    const router = useRouter();

    return (
    <div className={styles.main}>
        <div className={styles.title}>
            <div> <Link href="/">Husband Material</Link></div>
        </div>
        <div className={styles.tabs}>
            <div> <Link href="/desserts" >Desserts</Link></div>
            <div> <Link href="/dishes" >Main dishes</Link></div>
            <div> <Link href="/all" >All</Link></div>
        </div>
        {
            search && <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search..."
                    onBlur={(e) => router.push("/all?filter=" + e.target.value)}
                />
            </div>
        }
    </div>);
}

export default Navbar;

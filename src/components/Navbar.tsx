'use client'

import styles from './Header.module.css';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";

import burger from '../logos/menu-burger.svg'
import profile from '../logos/profile-user.png'
import { useState } from 'react';
import { signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useAuth } from "./AuthContext";

interface NavbarProps {
  search?: boolean;
}

var Navbar: React.FC<NavbarProps> = ({search}) =>
{
    const { user } = useAuth();
    const [isHamburgerHidden, setHamburgerHidden] = useState(true);
    const router = useRouter();

    const handleGoogleSignOut = async () => {
        try {
        await signOut(auth);
        console.log("User signed out");
        } catch (error) {
        console.error("Google Sign-Out Error:", error);
        alert("YGoogle Sign-In Error");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        if (user.email !== "kiskovi97@gmail.com") {
            alert("You are not authorized to access this page.");
            await signOut(auth);
        }
        } catch (error) {
        console.error("Google Sign-In Error:", error);
        alert("Google Sign-In Error");
        }
    };

    return (
    <div className={styles.main}>
        <div className={styles.hamburger}>
            <Image src={burger.src} alt=""  width={24} height={24} onClick={() => {setHamburgerHidden(!isHamburgerHidden)}}/>
            {
                (isHamburgerHidden) ? 
                <div/> :
                <div className={styles.tabs_hamburger} hidden={isHamburgerHidden}>
                    <div> <Link href="/desserts" >Desserts</Link></div>
                    <div> <Link href="/dishes" >Main dishes</Link></div>
                    <div> <Link href="/all" >All</Link></div>
                    {
                        user && (
                            <>
                                <div> <Link href="/upload" >Upload</Link></div>
                            </>
                        )
                    }
                </div>
            }
        </div>
        <div className={styles.title}>
            <div> <Link href="/">Husband Material</Link></div>
        </div>
        <div className={styles.tabs}>
            <div> <Link href="/desserts" >Desserts</Link></div>
            <div> <Link href="/dishes" >Main dishes</Link></div>
            <div> <Link href="/all" >All</Link></div>
            {
                user && (
                    <>
                        <div> <Link href="/upload" >Upload</Link></div>
                    </>
                )
            }
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
        <div className={styles.profile}>
            <Image className={styles.profileImage} src={user?.photoURL || profile.src} alt="" 
                width={24} height={24} onClick={() => {user ? handleGoogleSignOut() : handleGoogleSignIn()}}/>
        </div>
    </div>);
}

export default Navbar;

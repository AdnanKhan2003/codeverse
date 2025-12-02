"use client";

import styles from "./Logout.module.css";
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClickLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch(
            logout()
        );

        router.push("/login")
    };

    return (
        <p className={`${styles.main__nav__links} ${styles.main__nav__links__far__right}`} onClick={handleClickLogout}>Logout</p>
    )
}

export default Logout
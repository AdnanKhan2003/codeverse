import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/logos/codeverse_logo.png";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={`${styles.main__header}`}>
      <div className={`${styles.main__header__wrapper}`}>
        <Link href="/" className={`${styles.main__logo__container}`}>
          <Image src={mainLogo} alt="CodeVerse Logo" width={20} height={20} />
          <p className={`${styles.mainlogo__name}`}>CodeVerse</p>
        </Link>

        <nav className="main__navbar">
          <Link className={`${styles.main__nav__links}`} href="/">Home</Link>
          <Link className={`${styles.main__nav__links} ${styles.main__nav__links__far__right}`} href="/logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import styles from './styles.module.scss';

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';
import Image from 'next/image';

export function Header() {
   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <img src="/images/logo.svg" alt="Logo ig.news" />
            <nav>
               <ActiveLink activeClassName={styles.active} href="/">
                  <a>Home</a>
               </ActiveLink>
               <ActiveLink activeClassName={styles.active} href="/posts">
                  <a>Posts</a>
               </ActiveLink>
            </nav>
            <SignInButton />
         </div>
      </header>
   );
}

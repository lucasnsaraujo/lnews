import styles from './styles.module.scss'

import { SignInButton } from '../SignInButton'
import Link from 'next/link'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logo ig.news" />
                <nav>
                    <Link className={styles.active} href="/">Home</Link>
                    <Link href="/posts" prefetch>Posts</Link>
                </nav>
            <SignInButton/>
            </div>
        </header>
    )
}
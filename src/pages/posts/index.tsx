import Head from 'next/head';
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time>27 de setembro de 2022</time>
                        <strong>Boas práticas para devs em início de carreira</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer. Enim sed faucibus turpis in eu mi. Diam sit amet nisl suscipit adipiscing bibendum. Purus in massa tempor nec feugiat.</p>
                    </a>
                    <a>
                        <time>27 de setembro de 2022</time>
                        <strong>Boas práticas para devs em início de carreira</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer. Enim sed faucibus turpis in eu mi. Diam sit amet nisl suscipit adipiscing bibendum. Purus in massa tempor nec feugiat.</p>
                    </a>
                    <a>
                        <time>27 de setembro de 2022</time>
                        <strong>Boas práticas para devs em início de carreira</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer. Enim sed faucibus turpis in eu mi. Diam sit amet nisl suscipit adipiscing bibendum. Purus in massa tempor nec feugiat.</p>
                    </a>
                    <a>
                        <time>27 de setembro de 2022</time>
                        <strong>Boas práticas para devs em início de carreira</strong>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer. Enim sed faucibus turpis in eu mi. Diam sit amet nisl suscipit adipiscing bibendum. Purus in massa tempor nec feugiat.</p>
                    </a>
                </div>
            </main>
        </>
    )
}
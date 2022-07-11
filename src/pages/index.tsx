import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'

import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}


export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, seja bem vindo!</span>
          <h1>Novidades sobre <br /> o mundo <span>React</span></h1>
          <p>Tenha acesso a todas as publicações <br />
          <span>por {product.amount}/mês</span>
          </p>
          <SubscribeButton/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LFrVsFRRf3RyQ5YWvMUrED4', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100),
  }

  return {
    props : {
      product
    },
    revalidate: 60 * 60 * 24 // in seconds == 24 hours
  }
}

// Client-side => Chamada normal, pelo componente (api.get ou fetch etc)
// Server-side => Caso precise da informação NO MOMENTO DA RENDERIZAÇÂO, caso não, usar client
// Static => Caso a chamada seja custosa e não possa ser feita diversas chamadas na API
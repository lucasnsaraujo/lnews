import { client } from "../../../services/prismic"
import { RichText } from "prismic-dom"
import Head from "next/head";
import styles from '../post.module.scss'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

interface PostPreviewProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function PostPreview({ post }: PostPreviewProps) {
   const { data: session } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (session?.activeSubscription) {
         router.push(`/posts/${post.slug}`)
      }
   }, [session?.activeSubscription]);
   return (
      <>
         <Head>
            <title>{post.title}</title>
         </Head>
         <main className={styles.container}>
            <article className={styles.post}>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content }}></div>
               <div className={styles.continueReading}>Para continuar lendo,<a>clique aqui</a> 🖱</div>
            </article>
         </main>
      </>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
      ],
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug } = params;

   const response = await client.getByUID('post', String(slug))

   const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0, 8)),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
         "pt-BR",
         {
            day: "2-digit",
            month: "long",
            year: "numeric",
         }
      ),
   }

   return {
      props: {
         post
      },
      revalidate: 60 * 30 // 30 minutes
   }



}

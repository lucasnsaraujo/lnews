import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";
import { client } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Link from "next/link";

type Post = {
   slug: string;
   title: string;
   excerpt: string;
   updatedAt: string;
};

interface PostsProps {
   posts: Post[];
}
export default function Posts({ posts }: PostsProps) {
   return (
      <>
         <Head>
            <title>Posts | Ignews</title>
         </Head>
         <main className={styles.container}>
            <div className={styles.posts}>
               {posts.map((post) => (
                  <Link href={`/posts/${post.slug}`} key={post.slug}>
                     <a >
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                     </a>
                  </Link>
               ))}
            </div>
         </main>
      </>
   );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
   const response = await client.getAllByType("post");

   const posts = response.map((post) => {
      return {
         slug: post.uid,
         title: RichText.asText(post.data.title),
         excerpt:
            post.data.content.find((content) => content.type === "paragraph")
               ?.text ?? "",
         updatedAt: new Date(post.last_publication_date).toLocaleDateString(
            "pt-BR",
            {
               day: "2-digit",
               month: "long",
               year: "numeric",
            }
         ),
      };
   });

   return {
      props: {
         posts,
      },
   };
};

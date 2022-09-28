import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { PrismicProvider } from "@prismicio/react";
import { client } from "../services/prismic";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <PrismicProvider client={client}>
            <NextAuthProvider session={pageProps.session}>
               <Header />
               <Component {...pageProps} />
            </NextAuthProvider>
         </PrismicProvider>
      </>
   );
}

export default MyApp;

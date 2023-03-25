import "../styles/global.css";
import Layout from "../components/layout.js";
import Head from "next/head";

export default function AppWrapper({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{pageProps.title ? pageProps.title : "Valaakam Blog"}</title>
      </Head>
      <Layout classname="content">
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

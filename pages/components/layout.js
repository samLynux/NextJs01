import Head from "next/head"
import styles from "@/styles/Layout.module.css"
import Header from "./header"
import Showcase from "./showcase"
import Footer from "./footer"
import { useRouter } from "next/router"

export default function Layout({title, keywords, description, children}) {
    const router = useRouter();
    return (<div> 
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </Head>
        <Header/>

        {router.pathname === '/' && <Showcase/>}

        <div className={styles.container}>
          {children}
        </div>
        <Footer/>
      </div>)
  }
  

  Layout.defaultProps ={
      title: 'dj-events',
      description: "descipe 1",
      keywords: 'musik, event, dj'
  }
import {FaExclamationTriangle} from "react-icons/fa"
import Layout from "./components/layout"
import styles from "../styles/404.module.css"
import Link from "next/link"

export default function NotFoundPage() {
    return (
        <Layout title="page not found" className={styles.footer}> 
            <div className={styles.error}>
                <h1><FaExclamationTriangle/> 404</h1>
                <h4> sorry </h4>
                <Link href='/'>Go home</Link>
            </div>
            

        
            
        </Layout>
    )
  }
  


import styles from "../../styles/Footer.module.css"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className={styles.footer}> 
            <p>Copyright &copy; event 2022</p>
            <p>
                <Link href='/about'>
                    <a>About this project</a>
                </Link>
            </p>

        
            
        </footer>
    )
  }
  

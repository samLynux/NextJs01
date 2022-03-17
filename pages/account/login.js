
import styles from "@/styles/AuthForm.module.css"
import Link from "next/link" 
import {FaUser} from 'react-icons/fa'
import { useState, useEffect, useContext } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/layout";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error }= useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault() 
        login({email, password});
    }
    return (
        <Layout title='User Login'> 
        <div className={styles.auth}>
            <h1>
                <FaUser/>Login
            </h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">EMail address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <input type='submit' value='login' className="btn"/>
            </form>
            <p>
                Dont have account? 
                <Link href='/account/register'>Register</Link>
            </p>
        </div>
            
            
        </Layout>
    )
  }
  

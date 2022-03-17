
import styles from "@/styles/Footer.module.css"
import Link from "next/link"
import { createContext, useState, useEffect } from "react"
import { NEXT_URL } from "../config/index"
import {useRouter} from 'next/router'

const AuthContext = createContext()
export const AuthProvider = ( {children}) =>  {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null) 

    const register = async (user) => {
        console.log(user);
    }

    const login = async ({email:identifier, password}) => {
        const res = await fetch(`${NEXT_URL}/api/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await res.json()

        console.log(data);
        if(res.ok){
            setUser(data.user)
        }else{
            setError(data.message)
            setError(null)
        }
    }

    const logout = async () => {
        console.log('logout');
    }

    const checkUserLoggedin = async (user) => {
        console.log('check');
    }


    return (
        <AuthContext.Provider value={{user,error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContext

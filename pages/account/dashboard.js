
import Layout from "@/components/layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from "@/styles/Footer.module.css"
import Link from "next/link"

export default function Dashboard({events}) {
    console.log(events);
    return (
        <Layout title="Users Dashboard"> 
            <h1>Dashboard</h1>
            
        </Layout>
    )
  }
  

  export async function getServerSideProps({req}) {
      const {token} = parseCookies(req)

      const res = await fetch(`${API_URL}/events/me`,{
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          }
      })

      const events = await res.json()
      return {
          props:{
              events
          }
      }
  }

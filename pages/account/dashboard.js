
import Layout from "@/components/layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from "@/styles/Dashboard.module.css"
//import styles from "@/styles/DashboardEvent.module.css"
import DashboardEvent from "@/components/dashboardEvent"
import Link from "next/link"

export default function Dashboard({events}) {
    const deleteEvent = (id) =>{
        console.log(id);
    }
    console.log(events);
    return (
        <Layout title="Users Dashboard"> 
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.len === 0 && <h3>no events</h3>}

                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
                    // <EventItem key={evt.id} evt={evt}/>
                ))}

                {/* <Pagination page={page} total={total}/> */}
            </div>
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

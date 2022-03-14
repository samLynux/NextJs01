import Layout from "@/components/layout"
import {API_URL} from "@/config/index"
import Link from "next/link"
import EventItem from "./components/eventitem"

export default function Home({events}) {
  
  return (
    <Layout>
      <h1>Upcoming</h1>
      {events.data.len === 0 && <h3>no events</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
      

      {events.data.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:ASC&pagination[pageSize]=3`)
  const events = await res.json() 

  return {
    props: {events},
    revalidate: 1
  }
}

import Layout from "@/components/layout"
import {API_URL} from "@/config/index"
import EventItem from "@/components/eventitem"

export default function EventsPage({events}) {
  
  return (
    <Layout>
      <h1>Events</h1>
      {events.len === 0 && <h3>no events</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json() 

  return {
    props: {events},
    revalidate: 1
  }
}

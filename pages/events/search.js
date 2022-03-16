import Layout from "@/components/layout"
import {API_URL} from "@/config/index"
import EventItem from "@/components/eventitem"
import {useRouter} from "next/router"
import Link from "next/link"
import qs from "qs"

export default function SearchPage({events}) {
  const router = useRouter()
  return (
    <Layout title="Search Results">
        <Link href='/events'>Go Back</Link>
      <h1>Seacrh Results for {router.query.term}</h1>
      {events.len === 0 && <h3>no events</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
    
      
  const query =   qs.stringify({
    _where: {
      _or:[
        {name_contains: term},
        {performers_contains: term},
        {venue_contains: term},
        {description_contains: term},
      ]
    }
  });
  
  const res = await fetch(`${API_URL}/events?&_sort=date:ASC&${query}`)
  const events = await res.json() 

  return {
    props: {events},
  }
}

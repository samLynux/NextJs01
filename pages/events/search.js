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
      {events.data.len === 0 && <h3>no events</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
    const condition = qs.stringify({
        filters: {
          $or: [
            {
              name: {
                $containsi: term,
              },
            },
            {
                venue: {
                    $containsi: term,
                },
            },
            {
                performers: {
                    $containsi: term,
                },
            },
            {
                description: {
                    $containsi: term,
                },
            },
          ],
        },
      }, {
        encodeValuesOnly: true,
      });
      
  const query = `${API_URL}/api/events?populate=*&sort=date:ASC&` + condition;
  
  const res = await fetch(query)
  const events = await res.json() 

  return {
    props: {events},
  }
}

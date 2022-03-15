import Layout from "@/components/layout"
import styles from "@/styles/Form.module.css"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import { API_URL } from "@/config/index"

export default function AddEventPage() {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    })
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }
    

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setValues({...values, [name]: value})
    }

    return (
        <Layout title="Add New Event"> 
        <Link href='/events'>Go Back</Link>
          <h1>Add</h1>
 
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
                <div>
                    <label htmlFor="name">Event Name</label>
                    <input type="text" id="name" name="name"
                        value={values.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="performers">Performers</label>
                    <input type="text" id="performers" name="performers"
                        value={values.performers} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="venue">Venue</label>
                    <input type="text" id="venue" name="venue"
                        value={values.venue} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address"
                        value={values.address} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date"
                        value={values.date} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input type="text" id="time" name="time"
                        value={values.time} onChange={handleInputChange}/>
                </div>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" name="description"
                    value={values.description} onChange={handleInputChange}></textarea>
            </div>
            
            <input type="submit" value="Add Event"
             className="btn"/>
        </form>
      </Layout>)
  }
  
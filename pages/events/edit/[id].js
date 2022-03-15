import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/layout"
import styles from "@/styles/Form.module.css"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { API_URL } from "@/config/index"
import slugify from "slugify";
import moment from "moment";
import {FaImage} from 'react-icons/fa'
import Modal from "@/components/modal";

export default function EditEventPage({evt, id}) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    })
    const [imagePreview,setImagePreview] = useState(evt.image.data
            ? evt.image.data.attributes.formats.thumbnail: null)
    
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const hasEmptyFields = Object.values(values).some(
            (element) => element === ''
        )

        if(hasEmptyFields){
            toast.error("Please fill all fields");
        }
        const bigData = {data: {
            name: values.name,
            slug: slugify(values.name, {lower:true}),
            performers: values.performers,
            venue: values.venue,
            address: values.address,
            date: values.date,
            time: values.time,
            description:values.description,
        }}
        const res = await fetch(`${API_URL}/api/events/${id}`,{
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bigData)
        })
        if(!res.ok){
            toast.error("Something went wrong")
        }else{
            const next = await res.json()
            router.push(`/events/${next.data.attributes.slug}`)
        }
    }
    

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setValues({...values, [name]: value})
    }

    return (
        <Layout title="Add New Event"> 
        <Link href='/events'>Go Back</Link>
          <h1>Edit</h1>
        <ToastContainer/>
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
                        value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
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
            
            <input type="submit" value="Update Event"
             className="btn"/>
        </form>
        <h2>Event Image</h2>
        {imagePreview ? (
            <Image src={(API_URL + evt.image.data.attributes.formats.thumbnail.url)}
                height={100} width={170}/>
            ) : <div>
                    <p>No image uploaded</p>
                </div>
            
        }
        <div>
            <button onClick={() => setShowModal(true)} className="btn-secondary">
                <FaImage/> Set Image
            </button>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
            IMAGE UPLOAD
        </Modal>
      </Layout>)
  }
  
  export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    
    const evt = await res.json() 
    
    return { 
      props: {evt: evt.data.attributes, id}, 
    }
  }
import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/DashboardEvent.module.css"
import { API_URL } from "@/config/index"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function DashboardEvent({evt, handleDelete}){
    return (
        <div className={styles.event}>
            <h4>
                <Link href={`/events/${evt.slug}`}>
                    <a >{evt.name}</a>
                </Link>
            </h4>
            {/* <div className={styles.img}>
                <Image src={evt.image 
                    ? evt.image.formats.thumbnail.url
                    : '/images/event-default.png'} 
                    width={170} height={100}/>
            </div>
            <div className={styles.info}>
                <span>{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}</span>
                <h3>{evt.name}</h3>
            </div> */}

            <div className={styles.link}>
                <Link href={`/events/edit/${evt.id}`}> 
                    <a className={styles.edit}>
                        <FaPencilAlt/> <span>Edit Event</span>
                    </a>
                </Link>
                <a className={styles.delete} href="#" onClick={() => handleDelete(evt.id)}>
                    <FaTimes/> <span>Delete Event</span> 
                </a>
            </div>
        </div>
    )
}
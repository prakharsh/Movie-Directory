import React from 'react'
import styles from './Banner.module.css'
function Banner(props) {
  return (
    <div className={`card ${styles.card}` }>
            <img src={`https://image.tmdb.org/t/p/original${props.img_path}`} className={`card-img-top ${styles.card_img}`}alt="..."/>
            <div className="card-body" style={{marginLeft:"10px"}}>
                <h5 className="card-title" style={{fontSize:"20px", maxWidth:"100%"}}>{props.title}</h5>
                <p className="card-text">{props.overview}</p>
            </div>
    </div>
  )
}

export default Banner
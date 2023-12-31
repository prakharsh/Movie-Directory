/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import styles from './About.module.css'
function About() {
    const [searchparam]=useSearchParams()
    const [url,setURL]=useState('') ;
    const [Loading,setLoading]=useState(true) ;
    const obj=JSON.parse(searchparam.get('object')) ;
    const genres = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    
    useEffect(()=>{
      // to get the key for trailer on youtube
      (async function geturl(){
            const cur_url=await axios.get(`https://api.themoviedb.org/3/movie/${obj.movie_id}/videos?api_key=c95c3f93fd57be482438e2e63ab64048`) 
            const trailer_arr=cur_url.data.results ;
            for(let i=0 ;i<trailer_arr.length ;++i){
              if(trailer_arr[i].name.includes('Trailer')){
                setURL(trailer_arr[i].key) ;
              }
            }
      }())
      setLoading(false) ;
    },[])
    if(Loading)return <h1>Loading Movies...</h1>
  return (
    <>
        <Navbar/>
        <img src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} className={styles.img}></img>
        <div className={styles.info_wrapper}>
        <div className={styles.title}>{obj.title}</div>
        <div className={styles.overview}>{obj.overview}</div>
        <iframe className={styles.trailer} src={`https://www.youtube-nocookie.com/embed/${url}`}
                allow='autoplay; encrypted-media ; fullscreen'
                title='video'
        />
        <table className="table table-hover">
            <tbody>
                <tr>
                <td>Genre</td>
                <td>{genres[obj.genre_id]}</td>
                </tr>
                <tr>
                <td>Popularity</td>
                <td>{obj.popularity}</td>
                </tr>
                <tr>
                <td>Vote Average</td>
                <td>{obj.vote_average}</td>
                </tr>
                <tr>
                <td>Vote Count</td>
                <td>{obj.vote_count}</td>
                </tr>
            </tbody>
        </table>
        </div>
        <footer className={styles.footer}>
          <span><h4>Copyright &copy;  - Prakhar Sharma</h4></span>
        </footer>
    </>
  )
}

export default About
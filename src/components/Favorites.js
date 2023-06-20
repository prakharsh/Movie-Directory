/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import {db} from '../Firebase'
import { doc,getDoc,updateDoc,arrayRemove } from 'firebase/firestore'
import styles from './Favorites.module.css'
import { AuthContext } from '../contexts/AuthContext'
import { Dropdown } from 'react-bootstrap';
function Favorites() {
    const [movies,Setmovies]=useState([]) 
    const[filteredmovie,Setfilter]=useState([]) ;
    const {user}=useContext(AuthContext)
    const [genre_selected,setSelectGenre]=useState(0) ;
    let genres = {0:'All Genre',28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    // to fetch data on component did mount
    useEffect(()=>{
      const temparr=[]  ;
        (async function getdata(){
                const docRef = doc(db, "users", user.uid);
                let data=await getDoc(docRef) ;
                let arr=data.data().movies ;
                for(let i=0 ;i<arr.length ;++i){
                    temparr.push(JSON.parse(arr[i])) ;
                }
                Setmovies([...temparr])
            }())
    },[])
    // remove movies from favorites
    async function removeMovies(obj){
      let temparr=[] ;
      for(let i=0 ;i<movies.length ;++i){
          if(movies[i]!==obj) temparr.push(movies[i]) ;
      }
      Setmovies([...temparr]) ;
      try{
        const docRef = doc(db, "users", user.uid );
        await updateDoc(docRef, {
            movies: arrayRemove(JSON.stringify(obj)) 
        });
    }
    catch(err){
        console.log(err)
    }
   } 
  // incresing sort on popularity
   function popInc(){
      let temp=movies ;
      temp.sort((objA, objB)=>{
          return objA.popularity-objB.popularity ;
      })
      Setmovies([...temp]) ;
   }
  //decreasing sort on popularity
   function popDec(){
      let temp=movies ;
      temp.sort((objA, objB)=>{
          return objB.popularity-objA.popularity ;
      })
      Setmovies([...temp]) ;
   }
   //increasing sort on rating
   function ratingInc(){
      let temp=movies ;
      temp.sort((objA, objB)=>{
          return objA.vote_average-objB.vote_average ;
      })
      Setmovies([...temp]) ;
   }
   // decreasing sort on rating
   function ratingDec(){
      let temp=movies ;
      temp.sort((objA, objB)=>{
          return objB.vote_average-objA.vote_average ;
      })
      Setmovies([...temp]) ;
   }

   useEffect(()=>{
      Setfilter([...movies]) ;
   },[movies])
    //movie search by name
   function search(movieText){
      if(movieText===''){ 
        Setfilter([...movies]) ;
        return ;
      }
      let filterarr=movies.filter((obj)=>{
        let movieTitle=obj.title.toLowerCase() ;
        return  movieTitle.includes(movieText.toLowerCase());
      })
      Setfilter([...filterarr]) ;
   }
   // filtering on the basis of genre selected
   function selected(val){
        setSelectGenre(val) ; 
        let filterarr=movies.filter((obj)=>{
          return obj.genre_ids[0]===+val || +val===0;
        })
        console.log(filterarr.length)
        Setfilter([...filterarr])
   }
  return (
    <>
    <Navbar/>
    <div className={styles.main}>
        <Dropdown onSelect={selected} className={styles.dropdown}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.dropdown_banner}>
            {genres[genre_selected]}
          </Dropdown.Toggle>
          <Dropdown.Menu  className={styles.dropdown_menu}>
            <Dropdown.Item eventKey="0" >All Genre</Dropdown.Item>
            <Dropdown.Item eventKey="28">Action</Dropdown.Item>
            <Dropdown.Item eventKey="12">Adventure</Dropdown.Item>
            <Dropdown.Item eventKey="16">Animation</Dropdown.Item>
            <Dropdown.Item eventKey="35">Comedy</Dropdown.Item>
            <Dropdown.Item eventKey="80">Crime</Dropdown.Item>
            <Dropdown.Item eventKey="99">Documentary</Dropdown.Item>
            <Dropdown.Item eventKey="18">Drama</Dropdown.Item>
            <Dropdown.Item eventKey="10751">Family</Dropdown.Item>
            <Dropdown.Item eventKey="14">Fantasy</Dropdown.Item>
            <Dropdown.Item eventKey="36">History</Dropdown.Item>
            <Dropdown.Item eventKey="27">Horror</Dropdown.Item>
            <Dropdown.Item eventKey="10402">Music</Dropdown.Item>
            <Dropdown.Item eventKey="9648">Mystery</Dropdown.Item>
            <Dropdown.Item eventKey="10749">Romance</Dropdown.Item>
            <Dropdown.Item eventKey="878">Sci-Fi</Dropdown.Item>
            <Dropdown.Item eventKey="10770">TV</Dropdown.Item>
            <Dropdown.Item eventKey="53">Thriller</Dropdown.Item>
            <Dropdown.Item eventKey="10752">War</Dropdown.Item>
            <Dropdown.Item eventKey="37">Western</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input type='search' placeholder="Search" className={styles.search} onChange={(e)=>{search(e.target.value)}}></input>
        <div className={`container text-center ${styles.header}`} >
        <div className={`row ${styles.row}`} >
          <div className="col-4">
            Title
          </div>
          <div className="col">
            Genre
          </div>
          <div className="col" style={{display:"flex"}}>
          <i className="fa-solid fa-sort-down"onClick={ratingDec} style={{"cursor":"pointer"}}></i>
            Rating
          <i className="fa-solid fa-sort-up" onClick={ratingInc} style={{"cursor":"pointer"}}></i>
          </div>
          <div className="col" style={{display:"flex"}}>
          <i className="fa-solid fa-sort-down" onClick={popDec} style={{"cursor":"pointer"}}></i>
            Popularity
          <i className="fa-solid fa-sort-up" onClick={popInc} style={{"cursor":"pointer"}}></i>
          </div>
          <div className="col"></div>
        </div>
        {
          filteredmovie.map((obj,idx)=>(
          <div className={`row ${styles.row}`} key={idx}>
            <div className="col-4" style={{"border":"1px solid #9999"}}>
              <div className={styles.title}>
              <img src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} className={styles.card_img}alt="..."/>
              {obj.title}
              </div>
            </div>
            <div className="col" style={{"border":"1px solid #9999", display:"flex",alignItems:'center'}}>
              {genres[obj.genre_ids[0]]}
            </div>
            <div className="col" style={{"border":"1px solid #9999", display:"flex",alignItems:'center'}}>
              {obj.vote_average}
            </div>
            <div className="col" style={{"border":"1px solid #9999", display:"flex",alignItems:'center'}}>
                {obj.popularity}
            </div>
            <div className="col" style={{ "border":"1px solid #9999", display:"flex",alignItems:'center'}}>
              <button type="button" className={`btn btn-danger ${styles.rmv_btn}`}  onClick={()=>{removeMovies(obj)}}>Remove</button>
            </div>
          </div>
          )
        )}
        </div>
        </div>
        <footer className={styles.footer}>
          <span><h4>Copyright &copy;  - Prakhar Sharma</h4></span>
        </footer>
    </>
  )
}

export default Favorites
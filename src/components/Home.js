/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Home.module.css'
import Banner from './Banner'
import {createSearchParams, useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import { Dropdown } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext'
import {db} from '../Firebase'
import {doc,updateDoc,arrayUnion,getDoc,arrayRemove } from 'firebase/firestore'
function Home() {
    const [menu,Changemenu]=useState('') ;
    const navigate=useNavigate() ;
    const {user}=useContext(AuthContext) ;
    const [movies,Setmovie]=useState([]) ;
    const [fvt,setfvt]=useState([]) ;
    const [pgLoading,setpgLoading]=useState(true) ;
    const [curLoading,setcurLoading]=useState(true) ;
    const [curPage,NextPage]=useState(()=>{
        let no=+localStorage.getItem('pageno') ;
        if(no>=1) return no ;
        else return 1 ;
    }) ;
    const[filteredmovies,Setfilter]=useState([]) ;
    const [genre_selected,setSelectGenre]=useState(0) ;
    let genres = {0:'All Genre',28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    // handle about button click
    function handleabout(obj){
        navigate({
            pathname:'/about',
            search:createSearchParams({
                object:JSON.stringify({
                        backdrop_path:obj.backdrop_path,
                        title:obj.title,
                        overview:obj.overview,
                        genre_id:obj.genre_ids[0],
                        popularity:obj.popularity,
                        vote_average:obj.vote_average,
                        vote_count:obj.vote_count
                })
            }).toString()
        })
    }
    // handles add movie
    async function addmovie(obj){
      let temparr=[...fvt] ;
      temparr.push(obj)
      setfvt([...temparr])
        try{
            const docRef = doc(db, "users", user.uid );
            await updateDoc(docRef, {
                movies: arrayUnion(JSON.stringify(obj)) 
            });
        }
        catch(err){
            console.log(err)
        }
    } 
    // handle next page pagination
    function handlenext(){
      localStorage.setItem('pageno',+curPage+1) ;
        NextPage(prev=>prev+1) ;
    }
    //handle prev page pagination
    function handleprev(){
        if(curPage<=1){ 
          localStorage.setItem('pageno',1) ;
          return 
        }
        localStorage.setItem('pageno',+curPage-1) ;
        NextPage(prev=>prev-1) ;
    }

    // to get data on component did mount
    useEffect(()=>{
      setcurLoading(true) ;
        (async function getdata(){
            let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c95c3f93fd57be482438e2e63ab64048&language=en-US&page=${curPage}`)
            let data=res.data 
            Setmovie([...data.results])
            setcurLoading(false) ;
          }())
    },[curPage])

    //getting user data from firebase
    useEffect(()=>{
      setpgLoading(true) ;
      async function fetchdata(){
        try {
          const docRef = doc(db, "users", user.uid);
          const data = await getDoc(docRef);
          const arr = data.data().movies;
          const temparr = arr.map((item) => JSON.parse(item));
          setfvt([...temparr]);
          setpgLoading(false) ;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
          fetchdata()
    },[])

    //handle remove movie from favorites
    async function removeMovies(obj){
      let temparr=[] ;
      for(let i=0 ;i<movies.length ;++i){
          if(movies[i]!==obj) temparr.push(movies[i]) ;
      }
      setfvt([...temparr]) ;
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
   // handle the genre slected on next page
   useEffect(()=>{
      let filterarr=movies.filter((obj)=>{
        return obj.genre_ids[0]===+genre_selected || +genre_selected===0;
      })
      Setfilter([...filterarr]) ;
    },[movies])

    //handle filtering on basis of genre
   function selected(val){
      setSelectGenre(val) ; 
      let filterarr=movies.filter((obj)=>{
        return obj.genre_ids[0]===+val || +val===0;
      })
      Setfilter([...filterarr])
   }
   if(pgLoading || curLoading)return <h1>Loading Movies...</h1>
  return (
    <div>
      <Navbar/>
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
      { filteredmovies[0]!==undefined &&
        <Banner title={ filteredmovies[0].title || filteredmovies[0].name}
                  img_path={filteredmovies[0].backdrop_path}
                  overview={filteredmovies[0].overview}/>
      }
      <div className={styles.movies_container}>
          {
            filteredmovies.map((obj,idx)=>(
              obj.backdrop_path!=null &&
              <div className={`card ${styles.card_container}`} onMouseEnter={()=>{Changemenu(obj.id)}} onMouseLeave={()=>{Changemenu('')}} key={idx}>
                <img src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} className={`card-img-top ${styles.card_img}`}alt="..."/>
                    <h5 className={`card_title ${styles.movie_title}`}>{obj.title || obj.name}</h5>
                    {
                      obj.id===menu &&
                        <div className={styles.btn_wrapper}>
                          { fvt.some(item => item.id === obj.id) ?
                            <button type="button" className="btn btn-danger" style={{margin:"20px", fontSize:"15px"}} onClick={()=>{removeMovies(obj)}}>Delete</button>
                            :
                            <button type="button" className="btn btn-success" style={{margin:"20px", fontSize:"15px"}}onClick={()=>{addmovie(obj)}}>Add to Favorites</button>
                          }
                          <button type="button" className="btn btn-info" style={{margin:"20px",fontSize:"15px"}}onClick={()=>{handleabout(obj)}}>About</button>
                        </div>
                    }           
              </div>      
            ))
          }
      </div>
        <nav aria-label="..." className={styles.pagination} style={{display:'flex', justifyContent:'center'}}>
            <ul className="pagination" >
            <li className="page-item "><a className="page-link" href='#' style={{fontSize:"15px", marginRight:"20px", backgroundColor:'aqua'}} onClick={()=>{NextPage(1)}}>1</a></li>
              <li className="page-item " onClick={handleprev}>
                <a className="page-link" href='#' style={{fontSize:"15px"}}>Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href='#' style={{fontSize:"15px"}}>{curPage}</a></li>
              <li className="page-item" onClick={handlenext}>
                <a className="page-link" href='#' style={{fontSize:"15px"}}>Next</a>
              </li>
            </ul>
        </nav>
        <footer className={styles.footer}>
          <span><h4>Copyright &copy;  - Prakhar Sharma</h4></span>
        </footer>
   </div>
  )
}

export default Home
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState,useEffect, useContext} from 'react'
import styles from './Navbar.module.css'
import {db} from '../Firebase'
import { doc,getDoc } from 'firebase/firestore'
import {Link,useNavigate} from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";
function Navbar() {
  const { logOut,user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username,Setname]=useState("") ;
  const handlelogout = async () => {
    localStorage.setItem('pageno',1) ;
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      window.alert("Error Logging Out")
    }
  }

  useEffect(()=>{
    (async function abc(){
            const docRef = doc(db, "users", user.uid);
            let data=await getDoc(docRef) ;
            let name=data.data().username.toUpperCase() ;
            Setname(name) ;
        }())
},[])
  return (
    <nav className={styles.navbar}>
      <Link to='/'>
      <img className={styles.logo} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
      </Link>
      <Link to='/' className={styles.link}>
      <div className={styles.heading}>Movie Directory</div>
      </Link>
      <Link to='/Favorites' className={styles.link}>
      <div className={styles.fvt}>Favorites</div>
      </Link>
      <div className={styles.username}>{username}</div>
      <div className={styles.logout} onClick={handlelogout} style={{"cursor":"pointer"}}><i className="fa-solid fa-power-off"></i></div>
      <div>{ user.displayName}</div>
     </nav>
  )
}

export default Navbar
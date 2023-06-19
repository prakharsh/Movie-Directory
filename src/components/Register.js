/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Register.module.css"
import {db} from '../Firebase'
import { setDoc,doc } from 'firebase/firestore'
function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signUp} = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSubmit = async () => {
    if(name===""){
      window.alert("Name Field Empty")
      return ;
    }
    try {
      let res=await signUp(email, password) 
      let uid = res.user.uid;
      console.log(uid);
      const docRef = doc(db, "users", uid );
      setDoc(docRef,{username:name, email:email, movies:[]})
      navigate("/login");
    } catch (err) {
        window.alert("Invalid email or Password")
    }
  };
  return (
    <div className={styles.page}>
    <div className={styles.login_block}>
    <div className={styles.logo_par}>
    <img className={styles.logo} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
    <h3>The MOVIE DIRECTORY</h3>
    </div>
    <div className={styles.name_par}>
    <label>UserName</label>
    <input type="name" className={styles.input_box} onChange={(e)=>{setName(e.target.value)}}></input>
    </div>
    <div className={styles.email_par}>
    <label>Email</label>
    <input type="email" className={styles.input_box} onChange={(e)=>{setEmail(e.target.value)}}></input>
    </div>
    <div className={styles.password_par}>
    <label>Password</label>
    <input type="password" className={styles.input_box} onChange={(e)=>{setPassword(e.target.value)}}></input>
    </div>
    <button type="button" className={`btn btn-primary ${styles.register_btn}`} onClick={handleSubmit}>Register</button>
    <div className={styles.login}>Already have an account? <Link to="/"> Log IN</Link> </div>
    </div>
    </div>
  )
}

export default Auth
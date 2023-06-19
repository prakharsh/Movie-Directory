/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css"
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err) {
        window.alert("Incorrect Email or Password or else Account doesn't Exist")
      }
    };
    async function dummyLogin(){
      try {
        await logIn("dummy@gmail.com", "dummy123");
        navigate("/");
      } catch (err) {
        console.log("dummy login not working") ;
      }
    }
  return (
    <div className={styles.page}>
      <div className={styles.login_block}>
        <div className={styles.logo_par}>
          <img className={styles.logo} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
          <h3>THE MOVIE DIRECTORY</h3>
        </div>
        <div className={styles.email_par}>
          <label>Email</label>
          <input type="email" className={styles.input_box} onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>
        <div className={styles.password_par}>
          <label>Password</label>
          <input type="password" className={styles.input_box} onChange={(e)=>{setPassword(e.target.value)}}></input>
        </div>
        <button type="button" className={`btn btn-primary ${styles.login_btn}`} onClick={handleSubmit}>LOGIN</button>
        <button type="button" className={`btn btn-success ${styles.dummyLogin_btn}`} onClick={dummyLogin}>Dummy Login</button>
        <div className={styles.register}>Don't have an account?
            <Link to="/register">Register</Link> 
        </div>
      </div>
      <footer className={styles.footer}>
            <span><h4>Copyright &copy;  - Prakhar Sharma</h4></span>
      </footer>
    </div>
  )
}

export default Login
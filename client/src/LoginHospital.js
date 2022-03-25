import Axios from "axios";
import React, { useState } from "react";
import "./LoginHospital.css";
import LOGINBG from "./Untitled-2.png";

// async function loginUser(credentials) {
//   return fetch('http://localhost:3301/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }
function LoginHospital() {
  const [Hospital_ID, setHospital_ID] = useState("");
  const [Password, setPassword] = useState("");
  const [loginStatus, setloginstatus] = useState("");

  const handleSubmit = (e) => {
    Axios.post("http://localhost:3301/login", {
      Hospital_ID: Hospital_ID,
      Password: Password,
    }).then((Response) => {

      if (Response.data.message) {
        setloginstatus(Response.data.message);
      } else {
        console.log('Suscess:',Response.data[0].Hospital_ID);
        window.location = '/dashboard'
        
      }
    });
  };

  

  // const handle = (event) => {
  //   event.preventDefault();
    

  //   const jsonData = {
  //     Hospital_ID: Hospital_ID,
  //     Password: Password
  //   }
  //   fetch('http://localhost:3301/login',{
  //     method: 'POST',
  //     Headers:{
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(jsonData), 
  //   })
  //   .then(response => response.json())
  //   .then(Response => {
  //     console.log('Suscess:',Response.data[0].Hospital_ID);
  //   })
  //   .catch((error) => {
  //     console.error('Error',error);
  //   })
  // };

  
  return (
    <div className="LOGINVER2" style={{ backgroundImage: `url(${LOGINBG})` }}>
      <div className="LOGIN_BG">
      <br></br>
      <h2 className="text" style={{fontFamily: 'Prompt, sans-serif'}}>ลงชื่อเข้าใช้งาน</h2>
      <br></br>
        <label>
        <br></br>
          <b className="textID" style={{fontFamily: 'Prompt, sans-serif'}}>รหัสหน่วยงาน :</b> <br></br>
          <input className="textbox_ID" style={{fontFamily: 'Prompt, sans-serif',}}
            type="text"
            onChange={(e) => {
              setHospital_ID(e.target.value);
            }}
          ></input>
        </label>
     
        <br></br>
        <label>
        <b className="textPW" style={{fontFamily: 'Prompt, sans-serif',}}>รหัสผ่าน :</b> <br></br>
          <input
            className="textbox_password" style={{fontFamily: 'Prompt, sans-serif',}}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <br></br>
        <b className =  "alert" style={{fontFamily: 'Prompt, sans-serif',}}>{loginStatus}</b>
        <br></br>
        <button className= "btnLogin" style={{fontFamily: 'Prompt, sans-serif',}} onClick={handleSubmit}><b>เข้าสู่ระบบ</b></button>
      </div>
    </div>
  );
}

export default LoginHospital;

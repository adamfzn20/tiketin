import React from 'react'
import "./LoginPage.css";
import loginimg from "../../images/loginimage.png";
import icprofile from "../../icon/ic_profile.png";
import icpassword from "../../icon/ic_password.png";
import logocolor from "../../images/logocolor.png";
import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [admin_id, setAdmin_id] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPassTrue, setIsPassTrue] = useState(false)
    const cookies = new Cookies()
    const navigate = useNavigate();

    const login = (e) => {
        const data = { username, password }
        e.preventDefault()

        axios.post("http://localhost:5006/secret/adminapi/admins/login", data)
            .then(res => {
                setIsPassTrue(false)
                const decode = jwt_decode(res.data.token)
                setAdmin_id(decode.admin_id)
                cookies.set("token", res.data.token, { expires: new Date(Date.now + 1) })
                cookies.set("dataSuperadmin", decode.superadmin, { expires: new Date(Date.now + 1) })
                cookies.set("dataId", decode.admin_id, { expires: new Date(Date.now + 1) })
                cookies.set("username", decode.username, { expires: new Date(Date.now + 1) })
                if (admin_id) {
                    console.log("woy");
                    navigate("/dashboard")
                }
            }).catch((error) => {
                setUsername("")
                setPassword("")
                setIsPassTrue(true)
            })
    }
    return (
        <div className="containerlogin">
            <div className="loginwrapper d-flex">
                <img className="leftcol" src={loginimg} height={657} alt="" />
                <div className="rightcol">
                    <div className="logo">
                        <img src={logocolor} alt="" width={100} />
                    </div>
                    <h4>Login</h4>
                    <p>Welcome back! Please enter your details.</p>
                    <div className="logindetail">
                        <div className="inputwrapper">
                            <img className="icon" src={icprofile} alt="" />
                            <input placeholder="Username" className="logininput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="inputwrapper">
                            <img className="icon" src={icpassword} alt="" />
                            <input placeholder="Password" className="logininput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {isPassTrue && (
                        <div className="wrong">
                            <h5>Wrong Userame/Password</h5>
                        </div>
                    )}
                    <button className="buttonlogin" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
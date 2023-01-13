import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { useParams } from 'react-router-dom';
import './UserEdit.css'

function FormUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const cookies = new Cookies();

    useEffect(() => {
        const url = `http://localhost:5006/secret/adminapi/users/${id}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                setName(res.data.name);
                setAge(res.data.age);
                setUsername(res.data.username);
                setPhoneNumber(res.data.phoneNumber);
                setEmail(res.data.email);
            });
    }, []);

    const handleSubmitUsers = (e) => {
        e.preventDefault();
        const url = `http://localhost:5006/secret/adminapi/users/${id}`;
        axios
            .put(url,
                {
                    username: username,
                    phoneNumber: phoneNumber,
                    name: name,
                    email: email,
                    age: age,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("token")}`,
                    },
                })
            .then((res) => {
                console.log("resss", res)
                swal("Success!", "User Edited!", "success")
            });
    }


    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="test" placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" placeholder={age} value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder={phoneNumber} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <center>
                <button onClick={handleSubmitUsers} className="buttonsave">
                    Save
                </button>
            </center>
        </Form>
    );
}

export default FormUser;
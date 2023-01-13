import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import '../AdminEdit/AdminEdit.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'

const FormCreateConcertAdmin = () => {
    const [username, setUsername] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [superadmin, setSuperadmin] = useState("");
    const [concert_id, setConcert_id] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmitConcertAdmin = (e) => {
        const url = `http://localhost:5006/secret/adminapi/admins/register`;
        const data = { username, passwordHash, superadmin, concert_id }
        e.preventDefault()

        axios
            .post(url, data,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("token")}`,
                    },
                })
            .then((res) => {
                console.log("resss", res)
                swal("Success!", "Create Concert", "success")
                navigate("/Concertspage")
            });
    }


    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>username</Form.Label>
                <Form.Control type="text" placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control type="text" placeholder="Enter a password" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>superadmin</Form.Label>
                <Form.Control type="text" placeholder="true/false" value={superadmin} onChange={(e) => setSuperadmin(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>concert_id</Form.Label>
                <Form.Control type="text" placeholder="Input concert id if not superadmin" value={concert_id} onChange={(e) => setConcert_id(e.target.value)} />
            </Form.Group>

            <center>
                <button onClick={handleSubmitConcertAdmin} className="buttonsave">
                    Submit
                </button>
            </center>
        </Form>
    );
}

export default FormCreateConcertAdmin;

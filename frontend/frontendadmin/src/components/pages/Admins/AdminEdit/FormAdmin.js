import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { useParams } from 'react-router-dom';
import './AdminEdit.css'

function FormAdmin() {
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [concert_id, setConcert_id] = useState("");
    const cookies = new Cookies();

    useEffect(() => {
        const url = `http://localhost:5006/secret/adminapi/admins/${id}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                setUsername(res.data.username);
                setConcert_id(res.data.concert_id);
            });
    }, []);

    const handleSubmitAdmins = () => {
        const url = `http://localhost:5006/secret/adminapi/admins/${id}`;
        axios
            .put(url,
                {
                    username: username,
                    concert_id: concert_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.get("token")}`,
                    },
                })
            .then((res) => {
                console.log("resss", res)
                swal("Success!", "admin concert Edited!", "success")
            }).catch((err) => {
        console.log(err)
      });
    }


    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Concert Id</Form.Label>
                <Form.Control type="text" placeholder={concert_id} value={concert_id} onChange={(e) => setConcert_id(e.target.value)} />
            </Form.Group>
            <center>
                <button onClick={handleSubmitAdmins} className="buttonsave">
                    Save
                </button>
            </center>
        </Form>
    );
}

export default FormAdmin;

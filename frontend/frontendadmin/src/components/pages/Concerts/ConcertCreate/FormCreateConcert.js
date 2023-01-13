import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import '../ConcertEdit/ConcertEdit.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'

const FormCreateConcert = () => {
    const [concertName, setConcertName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [a1Cap, setA1Cap] = useState("");
    const [a2Cap, setA2Cap] = useState("");
    const [a3Cap, setA3Cap] = useState("");
    const [a1, setA1] = useState("");
    const [a2, setA2] = useState("");
    const [a3, setA3] = useState("");
    const [concertImage, setConcertImage] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSubmitConcert = (e) => {
        e.preventDefault();
        const url = `http://localhost:5006/secret/adminapi/concerts`;
        const data = { concertName, description, date, time, a1Cap, a2Cap, a3Cap, a1, a2, a3, concertImage }
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
                <Form.Label>Concert Name</Form.Label>
                <Form.Control type="test" placeholder="Enter a Concert Name" value={concertName} onChange={(e) => setConcertName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter a Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" placeholder="Input Time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Label>Class Capacity</Form.Label>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>A1</Form.Label>
                    <Form.Control type="text" placeholder="input capacity" value={a1Cap} onChange={(e) => setA1Cap(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>A2</Form.Label>
                    <Form.Control type="text" placeholder="input capacity" value={a2Cap} onChange={(e) => setA2Cap(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>A3</Form.Label>
                    <Form.Control type="text" placeholder="Input Capacity" value={a3Cap} onChange={(e) => setA3Cap(e.target.value)} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Label>Class Prices</Form.Label>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>A1</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" value={a1} onChange={(e) => setA1(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>A2</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" value={a2} onChange={(e) => setA2(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>A3</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" value={a3} onChange={(e) => setA3(e.target.value)} />
                </Form.Group>
            </Row>
            <Form.Label>Choose Concert Image</Form.Label>
            <Form.Group>
                <Form.Control
                    type="file"
                    onChange={(e) => {
                        setConcertImage(URL.createObjectURL(e.target.files[0]));
                    }}
                />
                <img src={concertImage} alt=""></img>
            </Form.Group>

            <center>
                <button onClick={handleSubmitConcert} className="buttonsave">
                    Submit
                </button>
            </center>
        </Form>
    );
}

export default FormCreateConcert;
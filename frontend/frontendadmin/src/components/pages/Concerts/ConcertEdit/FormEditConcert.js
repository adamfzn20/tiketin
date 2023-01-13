import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import "./ConcertEdit.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function FormConcert() {
  const { id } = useParams();
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

  useEffect(() => {
    const url = `http://localhost:5006/secret/adminapi/concerts/${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setConcertName(res.data.concertName);
        setDescription(res.data.description);
        setDate(res.data.date);
        setTime(res.data.time);
        setA1Cap(res.data.classCapacity.A1Cap);
        setA2Cap(res.data.classCapacity.A2Cap);
        setA3Cap(res.data.classCapacity.A3Cap);
        setA1(res.data.classPrices.A1);
        setA2(res.data.classPrices.A2);
        setA3(res.data.classPrices.A3);
        setConcertImage(res.data.concertImage);
      });
  }, []);

  const handleSubmitConcert = (e) => {
    e.preventDefault();
    const url = `http://localhost:5006/secret/adminapi/concerts/${id}`;
    axios
      .put(
        url,
        {
          concertName: concertName,
          description: description,
          date: date,
          time: time,
          A1Cap: a1Cap,
          A2Cap: a2Cap,
          A3Cap: a3Cap,
          A1: a1,
          A2: a2,
          A3: a3,
          concertImage: concertImage,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        swal("Success!", "Concert Edited!", "success");
        console.log(res.data);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Concert Name</Form.Label>
        <Form.Control type="test" placeholder={concertName} value={concertName} onChange={(e) => setConcertName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder={description} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control type="text" placeholder={time} value={time} onChange={(e) => setTime(e.target.value)} />
      </Form.Group>
      <Row className="mb-3">
        <Form.Label>Class Capacity</Form.Label>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>A1</Form.Label>
          <Form.Control type="text" placeholder={a1Cap} value={a1Cap} onChange={(e) => setA1Cap(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>A2</Form.Label>
          <Form.Control type="text" placeholder={a2Cap} value={a2Cap} onChange={(e) => setA2Cap(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>A3</Form.Label>
          <Form.Control type="text" placeholder={a3Cap} value={a3Cap} onChange={(e) => setA3Cap(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Label>Class Prices</Form.Label>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>A1</Form.Label>
          <Form.Control type="text" placeholder={a1} value={a1} onChange={(e) => setA1(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>A2</Form.Label>
          <Form.Control type="text" placeholder={a2} value={a2} onChange={(e) => setA2(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>A3</Form.Label>
          <Form.Control type="text" placeholder={a3} value={a3} onChange={(e) => setA3(e.target.value)} />
        </Form.Group>
      </Row>
      <Form.Label htmlFor="imgs">Concert Image</Form.Label>
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
        <button type="submit" onClick={handleSubmitConcert} className="buttonsave">
          Save
        </button>
      </center>
    </Form>
  );
}

export default FormConcert;

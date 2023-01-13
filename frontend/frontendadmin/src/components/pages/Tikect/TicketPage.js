import Sidebar from "../../Sidebar/Sidebar";
import TicketList from "./TicketList";
import "../Users/User.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import { useParams } from 'react-router-dom'
import { NavLink, useParams } from "react-router-dom";
import icback from "../../icon/ic_back.png";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const TicketPage = () => {
  // gatau ini kenapa ga berhasil
  const { id } = useParams();
  const [totalPembeli, setTotalPembeli] = useState("");
  const [totalPembeliA1, setTtotalPembeliA1] = useState("");
  const [totalPembeliA2, setTtotalPembeliA2] = useState("");
  const [totalPembeliA3, setTtotalPembeliA3] = useState("");
  const [ticketPageRetrieved, setTicketPageRetrieved] = useState(false);

  const cookies = new Cookies();
  useEffect((e) => {
    const urltotal = `http://localhost:5006/secret/adminapi/tickets/getTotalTicketPurchased/${id}`;

    axios
      .get(urltotal, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss222", (res.data[0]["total Pembeli"]));
        setTotalPembeli(res.data[0]["total pembeli"]);
      });

    const urla1 = `http://localhost:5006/secret/adminapi/tickets/getTotalTicketPurchased/${id}/A1`;

    axios
      .get(urla1, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss", res);
        setTtotalPembeliA1(res.data.totalConsumerA1);
      });

    const urla2 = `http://localhost:5006/secret/adminapi/tickets/getTotalTicketPurchased/${id}/A2`;

    axios
      .get(urla2, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss", res);
        setTtotalPembeliA2(res.data.totalConsumerA2);
      });
    const urla3 = `http://localhost:5006/secret/adminapi/tickets/getTotalTicketPurchased/${id}/A3`;

    axios
      .get(urla3, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss", res);
        setTtotalPembeliA3(res.data.totalConsumerA3);
        // setTicketPageRetrieved(true);
      });
  }, []);
  const viewHeight = window.outerHeight;
  return (
    <div className="dashboard">
    {console.log("totalll",totalPembeli)}
      {/* {ticketPageRetrieved && ( */}
        <div className="dswrapper d-flex" style={{ height: viewHeight }}>
          <Sidebar className="leftcoldas" />
          <div className="rightcoldas">
            <div className="right">
              <p>
                <NavLink to="/Concertspage" style={{ textDecoration: "none", color: "gray" }}>
                  Concerts
                </NavLink>{" "}
                / Ticket
              </p>
              <Row>
                <Col sm={1}>
                  <NavLink to="/Concertspage" style={{ textDecoration: "none", color: "gray" }}>
                    <img className="icback" src={icback} alt=""></img>
                  </NavLink>
                </Col>
                <Col sm={8}>
                  <h4>Ticket</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card border="light" style={{ width: "10rem", height: "8rem", boxShadow: "1px 2px 9px gray" }}>
                    <Card.Header>Sold tickets</Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">{totalPembeliA1 + totalPembeliA2 + totalPembeliA3} Tickets</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="light" style={{ width: "10rem", height: "8rem", boxShadow: "1px 2px 9px gray" }}>
                    <Card.Header>A1 Tickets Sold</Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">{totalPembeliA1} Tickets</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="light" style={{ width: "10rem", height: "8rem", boxShadow: "1px 2px 9px gray" }}>
                    <Card.Header>A2 Tickets Sold</Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">{totalPembeliA2} Tickets</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card border="light" style={{ width: "10rem", height: "8rem", boxShadow: "1px 2px 9px gray" }}>
                    <Card.Header>A3 Tickets Sold</Card.Header>
                    <Card.Body>
                      <Card.Title className="text-center">{totalPembeliA3} Tickets</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="userlistbackground">
                <div className="userlist">
                  <TicketList />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      {/* } */}
    </div>
  );
};

export default TicketPage;

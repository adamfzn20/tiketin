import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import "./Dashboard.css";
import backgroundImage from "../../images/bannerdashboard.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ConcertList from "../Concerts/ConcertList";
import axios from "axios";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const viewHeight = window.outerHeight;
  const cookies = new Cookies();

  const [totalUsers, setTotalUsers] = useState();
  const [totalConcert, setTotalConcert] = useState();
  const [totalConcertAdmin, SetTotalConcertAdmin] = useState();

  useEffect(() => {
    const urltotaluser = `http://localhost:5006/secret/adminapi/users/totalUsers`;

    axios
      .get(urltotaluser, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("res1", res);
        setTotalUsers(res.data[0]["total users"]);
      });

    const urltotalconcert = `http://localhost:5006/secret/adminapi/concerts/totalConcert`;

    axios
      .get(urltotalconcert, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss", res);
        setTotalConcert(res.data[0]["total concert"]);
      });

    const urltotalconcertadmin = `http://localhost:5006/secret/adminapi/admins/totalConcertAdmin`;

    axios
      .get(urltotalconcertadmin, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("ressss3", res);
        SetTotalConcertAdmin(res.data[0]["total concert admin"]);
      });

    return () => {};
  }, []);

  return (
    <div className="dashboard">
      <div className="dswrapper d-flex" style={{ height: viewHeight }}>
        <Sidebar className="leftcoldas" />
        <div className="rightcoldas">
          <img className="bgimg" src={backgroundImage} alt="" />
          <Row>
            <Col>
              <Card border="light" style={{ width: "15rem", height: "8rem", boxShadow: "1px 2px 9px gray", marginLeft: "20px" }}>
                <Card.Header>Total User</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">{totalUsers} Users</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card border="light" style={{ width: "15rem", height: "8rem", boxShadow: "1px 2px 9px gray", marginLeft: "20px" }}>
                <Card.Header>Total Concert</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">{totalConcert} Concerts</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card border="light" style={{ width: "15rem", height: "8rem", boxShadow: "1px 2px 9px gray", marginLeft: "20px" }}>
                <Card.Header>Total Admin Viewer</Card.Header>
                <Card.Body>
                  <Card.Title className="text-center">{totalConcertAdmin} Admin</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="upcoming cocert"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

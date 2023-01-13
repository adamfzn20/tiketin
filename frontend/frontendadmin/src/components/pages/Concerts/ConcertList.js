import Table from 'react-bootstrap/Table';
import './Concert.css'
import icfilter from '../../icon/ic_filter.png'
import icpencil from '../../icon/ic_pencil.png'
import ictrash from '../../icon/ic_trash.png'
import icticket from '../../icon/ic_ticket.png'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import swal from "sweetalert";
import moment from 'moment';

const EventList = (e) => {
    const [concersData, setConcertsData] = useState([]);
    const cookies = new Cookies()

    useEffect(() => {
        const url = "http://localhost:5006/secret/adminapi/concerts/all";

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                setConcertsData(res.data);
            });
    }, []);

    const handleDeleteConcert = (e) => {
        const url = "http://localhost:5006/secret/adminapi/concerts/" + e;

        axios
            .delete(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                console.log(e)
                swal("Delete Concert Success");
                setConcertsData(res.data);
                window.location.reload()
            });
    }

    return (
        <div>
            <Table responsive="sm">
                <thead className='headlist'>
                    <tr>
                        <th>Concert Id</th>
                        <th>Concert Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Class Capacity</th>
                        <th>Class Prices</th>
                        <th>Concert Image</th>
                        <th><img src={icfilter} alt='' className='ic' /></th>
                    </tr>
                </thead>
                {concersData.map((e) => (
                    <tbody>
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.concertName}</td>
                            <td>{e.description}</td>
                            <td>{moment(e.date).format("DD MMMM YYYY")}</td>
                            <td>{e.time}</td>
                            <td>
                                <tr>A1={e.classCapacity.A1Cap}</tr>
                                <tr>A2={e.classCapacity.A2Cap}</tr>
                                <tr>A3={e.classCapacity.A3Cap}</tr>
                            </td>
                            <td>
                                <tr>A1={e.classPrices.A1}</tr>
                                <tr>A2={e.classPrices.A2}</tr>
                                <tr>A3={e.classPrices.A3}</tr>
                            </td>
                            <td><img src={e.concertImage} alt=''></img></td>
                            <td>
                                <NavLink to={`/ticketpage/${e.id}`} activeClassName="activeClicked">
                                    <button><img src={icticket} alt='' className='ictd' /></button>
                                </NavLink>
                                <NavLink to={`/concerteditpage/${e.id}`} activeClassName="activeClicked">
                                    <button><img src={icpencil} alt='' className='ictd' /></button>
                                </NavLink>
                                <button onClick={() => handleDeleteConcert(e.id)}>
                                    < img src={ictrash} alt='' className='ictd' />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    );
}

export default EventList;
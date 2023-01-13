import Table from 'react-bootstrap/Table';
import './Ticket.css'
import icfilter from '../../icon/ic_filter.png'
import ictrash from '../../icon/ic_trash.png'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from "sweetalert";
import { useParams } from 'react-router-dom';

const TicketList = () => {
    const { id } = useParams();
    const [ticketsData, setTicketsData] = useState([]);
    const cookies = new Cookies()

    useEffect(() => {
        const url = `http://localhost:5006/secret/adminapi/tickets/byConcert/${id}`;

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                setTicketsData(res.data);
            });
    }, []);

    const handleDeleteTicket = (e) => {
        const url = "http://localhost:5006/secret/adminapi/tickets/" + e;

        axios
            .delete(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                console.log(e)
                swal("Delete Ticket Success");
                setTicketsData(res.data);
                window.location.reload()
            });
    }

    return (
        <div>
            <Table responsive="sm">
                <thead className='headlist'>
                    <tr>
                        <th>Ticket Id</th>
                        <th>user Id</th>
                        <th>Concert Date</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Date Created</th>
                        <th><img src={icfilter} alt='' className='ic' /></th>
                    </tr>
                </thead>
                {ticketsData.map((e) => (
                    <tbody>
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.user_id}</td>
                            <td>{e.concertDate}</td>
                            <td>
                                <tr>A1={e.amount.A1_am}</tr>
                                <tr>A2={e.amount.A2_am}</tr>
                                <tr>A3={e.amount.A3_am}</tr>
                            </td>
                            <td>{e.price}</td>
                            <td>{e.dateCreated}</td>
                            <td>
                                <button>
                                    < img src={ictrash} alt='' className='ictd' onClick={() => handleDeleteTicket(e.id)} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </div>
    );
}

export default TicketList;
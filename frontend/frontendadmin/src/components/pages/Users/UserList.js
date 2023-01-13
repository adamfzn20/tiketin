import Table from 'react-bootstrap/Table';
import './User.css'
import icfilter from '../../icon/ic_filter.png'
import icpencil from '../../icon/ic_pencil.png'
import ictrash from '../../icon/ic_trash.png'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import swal from "sweetalert";

const UserList = (e) => {
    const [usersData, setUsersData] = useState([]);
    const cookies = new Cookies()

    useEffect(() => {
        const url = "http://localhost:5006/secret/adminapi/users";

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                setUsersData(res.data);
            });
    }, []);

    const handleDeleteUser = (e) => {
        const url = "http://localhost:5006/secret/adminapi/users/" + e;

        axios
            .delete(url, {
                headers: {
                    Authorization: `Bearer ${cookies.get("token")}`,
                },
            })
            .then((res) => {
                console.log(e)
                swal("Delete User Success");
                setUsersData(res.data);
                window.location.reload()
            });
    }

    return (
        <div>
            <Table responsive="sm">
                <thead className='headlist'>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th><img src={icfilter} alt='' className='ic' /></th>
                    </tr>
                </thead>
                {usersData.map((e) => (
                    <tbody>
                        <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.username}</td>
                            <td>{e.age}</td>
                            <td>{e.phoneNumber}</td>
                            <td>
                                <NavLink to={`/usereditpage/${e.id}`} activeClassName="activeClicked">
                                    <button><img src={icpencil} alt='' className='ictd' /></button>
                                </NavLink>
                                <button onClick={() => handleDeleteUser(e.id)}>
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

export default UserList;
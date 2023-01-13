import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../../Sidebar/Sidebar';
import FormUser from './FormUser';
import { NavLink } from 'react-router-dom'
import icback from '../../../icon/ic_back.png'

const UserEditPage = () => {
    const viewHeight = window.outerHeight;
    return (
        <div className='dashboard'>
            <div className="dswrapper d-flex" style={{ height: viewHeight }}>
                <Sidebar className="leftcoldas" />
                <div className="rightcoldas">
                    <div className='right'>
                        <p><NavLink to="/userpage" style={{ textDecoration: 'none', color: 'gray' }}>Users</NavLink> / EditUser</p>
                        <Row>
                            <Col sm={1}><NavLink to="/userpage" style={{ textDecoration: 'none', color: 'gray' }}>
                                <img className='icback' src={icback} alt=""></img>
                            </NavLink></Col>
                            <Col sm={8}><h4>Edit User</h4></Col>
                        </Row>
                        <div className='userlistbackground'>
                            <div className='userlist'>
                                <FormUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
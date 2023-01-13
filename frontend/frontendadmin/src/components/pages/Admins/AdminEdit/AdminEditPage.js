import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from '../../../Sidebar/Sidebar';
import FormUser from './FormAdmin';
import { NavLink } from 'react-router-dom'
import icback from '../../../icon/ic_back.png'

const AdminEditPage = () => {
    const viewHeight = window.outerHeight;
    return (
        <div className='dashboard'>
            <div className="dswrapper d-flex" style={{ height: viewHeight }}>
                <Sidebar className="leftcoldas" />
                <div className="rightcoldas">
                    <div className='right'>
                        <p><NavLink to="/adminpage" style={{ textDecoration: 'none', color: 'gray' }}>Admins</NavLink> / EditAdmin</p>
                        <Row>
                            <Col sm={1}><NavLink to="/adminpage" style={{ textDecoration: 'none', color: 'gray' }}>
                                <img className='icback' src={icback} alt=""></img>
                            </NavLink></Col>
                            <Col sm={8}><h4>Edit Admin</h4></Col>
                        </Row>
                        <div className='adminlistbackground'>
                            <div className='adminlist'>
                                <FormUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEditPage;

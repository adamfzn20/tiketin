import React from 'react';
import logo from '../images/logocolor.png'
import './Sidebar.css'
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarFooter,

} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const viewHeight = window.outerHeight;
    return (
        <CDBSidebar className="sidebar" textColor="#333" backgroundColor="#FFF6FA">
            <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt=""
                        style={{ width: '100px' }}
                    />
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <NavLink to="/dashboard" activeClassName="activeClicked">
                        <CDBSidebarMenuItem className="item" icon="th-large">Dashboard</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/userpage" activeClassName="activeClicked">
                        <CDBSidebarMenuItem className="item" icon="users">Users</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/Concertspage" activeClassName="activeClicked">
                        <CDBSidebarMenuItem className="item" icon="music">Concerts</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink to="/adminpage" activeClassName="activeClicked">
                        <CDBSidebarMenuItem className="item" icon="user-plus">Admins</CDBSidebarMenuItem>
                    </NavLink>

                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{ padding: '20px 5px' }}
                >
                    Tiketin
                </div>
            </CDBSidebarFooter>
        </CDBSidebar>
    )
};

export default Sidebar;
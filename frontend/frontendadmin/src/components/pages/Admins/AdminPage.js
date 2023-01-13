import Sidebar from '../../Sidebar/Sidebar';
import AdminList from './AdminList';
import './Admin.css'
import ButtonFilter from '../../ButtonFilter/ButtonFilter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { NavLink } from 'react-router-dom';

const AdminPage = () => {
    const viewHeight = window.outerHeight;
    return (
        <div className='dashboard'>
            <div className="dswrapper d-flex" style={{ height: viewHeight }}>
                <Sidebar className="leftcoldas" />
                <div className="rightcoldas">
                    <div className='right'>
                        <p>Users</p>
                        <Row>
                            <Col sm={10}><h4>AdminList</h4></Col>
                            <Col sm={1}><ButtonFilter /></Col>
                            <Col sm={1}>
                                <NavLink to={`/concertadmincreatepage`} activeClassName="activeClicked">
                                    <button className='buttoncreateadmin'>Create</button>
                                </NavLink>
                            </Col>
                        </Row>
                        <div className='adminlistbackground'>
                            <div className='adminlist'>
                                <AdminList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage

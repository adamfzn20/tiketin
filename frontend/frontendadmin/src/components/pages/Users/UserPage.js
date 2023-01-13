import Sidebar from '../../Sidebar/Sidebar';
import UserList from './UserList';
import './User.css'
import ButtonFilter from '../../ButtonFilter/ButtonFilter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const UserPage = () => {
    const viewHeight = window.outerHeight;
    return (
        <div className='dashboard'>
            <div className="dswrapper d-flex" style={{ height: viewHeight }}>
                <Sidebar className="leftcoldas" />
                <div className="rightcoldas">
                    <div className='right'>
                        <p>Users</p>
                        <Row>
                            <Col sm={10}><h4>UserList</h4></Col>
                            <Col sm={1}><ButtonFilter /></Col>
                        </Row>
                        <div className='userlistbackground'>
                            <div className='userlist'>
                                <UserList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
import Sidebar from '../../Sidebar/Sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ConcertList from './ConcertList';
import { NavLink } from 'react-router-dom';

const ConcertsPage = () => {
    const viewHeight = window.outerHeight;
    return (
        <div className='dashboard'>
            <div className="dswrapper d-flex" style={{ height: viewHeight }}>
                <Sidebar className="leftcoldas" />
                <div className="rightcoldas">
                    <div className='right'>
                        <p>Concerts</p>
                        <Row>
                            <Col sm={10}><h4>Concerts List</h4></Col>
                            <Col sm={1}>
                                <NavLink to={`/concertcreatepage`} activeClassName="activeClicked">
                                    <button className='buttoncreate'>Create</button>
                                </NavLink>
                            </Col>
                        </Row>
                        <div className='concertlistbackground'>
                            <div className='concertlist'>
                                <ConcertList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConcertsPage
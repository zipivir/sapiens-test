import { useState, useEffect, useRef } from "react";
import { CardGroup, Card, Modal, Button, Form, InputGroup, FormControl, Col, Row } from 'react-bootstrap/';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import "./property.css";
import { getAllProperties } from "../../services/coreApiService";
import LoginComponent from "../Login/login";

const titleize = (str: string) => {
  console.log('str', str)
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const PropertyComponent = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      console.log('searchTerm: ', searchTerm);
      const res = await getAllProperties(searchTerm);
      console.log('res', res, res.code);

      if (res?.code !== 200) {
        console.log('Error fetching data', res.message);
        setError(res.message);
        navigate('/login');
      }
      setProperties(res.data);
    } catch (error: any) {
      console.log('Error fetching data:', error);
      setError(error.message);
      navigate('/login');
    }
  };

  useEffect(() => {
    // if (localStorage.getItem('token'))
      fetchData(); 

    // Clean-up function
    return () => {
    };
  }, []); 

  const getCurrencyIcon = (code: String) => {
    switch (code) {
      case 'USD':
        return <i className="fas fa-dollar-sign"></i>; // Dollar icon
      case 'ILS':
        return <i className="fas fa-shekel-sign"></i>; // Shekel icon (example, replace with correct icon class)
      default:
        return null;
    }
  };
  
  // const handleSearch = () => {
  //   fetchData()
  // }

  return (
      <section className="h-100 gradient-form" style={{ backgroundColor: '#fff' }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-12">
              {/* <div className="card rounded-3 text-black"> */}
                <div className="row g-0">
                  <div className="col-lg-12">
                    <Card.Header>
                      <InputGroup className="searchGroup mb-3">
                          <FormControl
                            placeholder="Category, Address, City or Neighborhood..."
                            aria-label="Search..."
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <InputGroup.Text className="searchBtn" onClick={() => fetchData()} id="basic-addon2">
                            <FontAwesomeIcon icon={faSearch} />
                          </InputGroup.Text>
                        </InputGroup>
                        <label className="user-label">{'user name'}</label>
                    </Card.Header>
                    <div className="card-body p-md-5 mx-md-4">
                          {/* <MDBInputGroup className="searchGroup" textAfter={
                            <MDBBtn className="searchBtn" outline onClick={() => fetchData()} rippleColor='dark'>
                              <MDBIcon icon='search' />
                            </MDBBtn>}>
                            <MDBInput id='searchTerm' label='Search' onChange={(e) => setSearchTerm(e.target.value)} 
                              placeholder="Category, Address, City or Neighborhood..."/>
                          </MDBInputGroup> */}
                      <Row>
                        {properties.map((property: any, index: number) => (
                          <Col className="col-propertry" key={index} xs={12} sm={6} md={3}>
                            <Card onClick={handleCardClick} className="card-property mb-2"
                              bg={'info'} key={property._id} text={'dark'} style={{ backgroundImage: `url(${property.image_url})` }}
                            >
                              <Card.Header>
                                <label className="header-label category">{titleize(property.buyer ? 'bought' : property.category)}</label>
                                <label className="header-label price">{getCurrencyIcon(property.currency)}{property.price}</label>
                              </Card.Header>
                              <Card.Body>
                                {/* <Image src={property.image_url} fluid /> */}
                                <Card.Text></Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Property Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Details goes here...
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
  );
};
export default PropertyComponent;

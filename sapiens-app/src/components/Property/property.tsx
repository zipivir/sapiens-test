import { useState, useEffect } from "react";
import { CardGroup, Card, Image } from 'react-bootstrap/';
import "./property.css";
import { getAllProperties } from "../../services/coreApiService";
import { Link, useNavigate } from "react-router-dom";

const PropertyComponent = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const res = await getAllProperties();
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

    if (localStorage.getItem('token'))
      fetchData(); 

    // Clean-up function
    return () => {
    };
  }, [navigate]); 

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
  
  return (
    localStorage.getItem('token') ? 
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-12">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-12">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }}
                          alt="logo"
                        />
                      </div>
                      <>
                        <CardGroup>
                          {properties.map((property: any) => (
                            <Card 
                              bg={'info'}
                              key={property._id}
                              text={'dark'}
                              style={{ backgroundImage: `url(${property.image_url})` }}
                              className="mb-2"
                            >
                              <Card.Header>
                                <label className="header-label">{property.category}</label>
                                <label className="header-label round">{getCurrencyIcon(property.currency)}{property.price}</label>
                              </Card.Header>
                              <Card.Body>
                                {/* <Image src={property.image_url} fluid /> */}
                                <Card.Text></Card.Text>
                              </Card.Body>
                            </Card>
                          ))}
                        </CardGroup>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    : 
    <Link to="/login">About</Link>
  );
};
export default PropertyComponent;

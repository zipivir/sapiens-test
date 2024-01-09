import { useState, useEffect } from "react";
// import * as Styled from "./login.styles";
import { getAllProperties } from "../../services/coreApiService";
import { Link, useNavigate } from "react-router-dom";

const PropertyComponent = () => {
  const [properties, setProperties] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const res = await getAllProperties();
      
        if (res?.error) {
          console.log('errr', res.error);
          setError(res.error);
          navigate('/login');
        }
        setProperties(res.data);
      } catch (error) {
        console.log('errr', error);
        console.log('Error fetching data:', error);
      }
    };

    if (localStorage.getItem('token'))
      fetchData(); 

    // Clean-up function
    return () => {
    };
  }, [navigate]); 

  
  return (
    localStorage.getItem('token') ? 
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: '185px' }}
                          alt="logo"
                        />
                      </div>
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

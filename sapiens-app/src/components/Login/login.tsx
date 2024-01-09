import { useRef, useState } from "react";
import './login.css';
import { login, signUp } from "../../services/coreApiService";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (username && password) {
      const res = await login(username, password);
      
      if (res?.error) {
        setError(res.error);
      }
      else
        navigate('/');

    } else {
      setError('Invalid username or password');
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      return handleLogin();
    }
  };

  return (
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

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input type="username" id="username" className="form-control" placeholder="Enter your user name" autoFocus
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" placeholder="Enter your Password"
                          onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={handleLogin}>
                          Log in
                        </button>
                        {/* <a className="text-muted" href="#!">
                          Forgot password?
                        </a> */}
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p> <Link to="/signup">Create new</Link>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2 error">{error}</p> 
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginComponent;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(user || isSuccess){
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Halaman Login</h1>
                    </div>
                    <form onSubmit={Auth} className="user">
                      <div className="text-center">
                        {isError && <small className="text-danger text-center">*{message}</small>}
                      </div>
                      <div className="form-group">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-user" placeholder="Enter Email Address..."  autoFocus />
                      </div>
                      <div className="form-group">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-user"  placeholder="Password"/>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                        <label className="custom-control-label" htmlFor="customCheck">Remember
                            Me</label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        {isLoading ? 'Loading...' : 'Login'}
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="#">Panduan Penggunaan</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
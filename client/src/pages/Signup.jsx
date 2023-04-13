import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup, reset } from '../utils/auth/authSlice';
import spinner from '../assets/gif/Ghost.gif';

function Signup() {
  const [sitePassword, setSitePassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess || user) {
      navigate('/');
    };

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  
  const sitePasswordOnSubmit = (e) => {
    e.preventDefault();

    if (process.env.REACT_APP_SITE_PASSWORD === sitePassword) {
      setIsVerified((current) => !current);
    } else {
      setSitePassword("");
      toast.error('Password is incorrect');
    };
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
        password
      };
      dispatch(signup(userData));
    };
  };

  if (isLoading) {
    return <img src={spinner} alt='Loading' className="spinner" />
  }

  return (
    <div className="signup-page">
      <div className='signin-container'>
        {!isVerified ? (
          <>
            <section className="heading">
              <h1>Sign Up</h1>
              <p>Please enter the site password</p>
            </section>

            <section >
              <form onSubmit={sitePasswordOnSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    id="site-password"
                    name="site-password"
                    placeholder="Site Password"
                    value={sitePassword}
                    onChange={(e) => setSitePassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type='submit' className='btn btn-square'>Submit</button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <>
            <section className="heading">
              <h1>Sign Up</h1>
              <p>Please create an account</p>
            </section>

            <section className="form">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name='username'
                    value={username}
                    placeholder='Name'
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name='email'
                    value={email}
                    placeholder='Email'
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={onChange}
                    minLength='8'
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password2"
                    name='password2'
                    value={password2}
                    placeholder='Confirm password'
                    onChange={onChange}
                    minLength='8'
                    required
                  />
                </div>
                <div>
                  <p>Already have an account? <Link to='/signin'>Sign in here.</Link></p>
                </div>
                <div className="form-group">
                  <button type='submit' className='btn btn-square'>Submit</button>
                </div>
              </form>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
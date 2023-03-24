import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup, reset } from '../utils/auth/authSlice';
import spinner from '../assets/gif/Ghost.gif';

function Signup() {
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
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        username,
        email,
        password
      };
      dispatch(signup(userData))
    }
  }

  if (isLoading) {
    return <img src={spinner} alt='Loading' className="spinner" />
  }

  return (
    <div className="signup-page">
      <div className='signin-container'>
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
              <p>Already have an account? <a href="/signin">Sign in here.</a></p>
            </div>
            <div className="form-group">
              <button type='submit' className='btn-square'>Submit</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Signup;
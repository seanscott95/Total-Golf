import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signin, reset } from '../utils/auth/authSlice';
import spinner from '../assets/gif/Ghost.gif';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

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

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };
    dispatch(signin(userData))
  }

  if (isLoading) {
    return <img src={spinner} alt='Loading' />
  }

  return (
    <div className="signin-page">
      <div className='signin-container'>
        <section className="heading">
          <h1>Sign in</h1>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
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
              <button type='submit' className='btn-square'>Sign in</button>
            </div>
          </form>
        </section>
        <section>
          <p>New to Total Golf? <a href="/signup">Sign up here.</a></p>
        </section>
      </div>
    </div>
  );
};

export default Signin;
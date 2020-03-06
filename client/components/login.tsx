import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { USER_LOGIN, CHECK_FOR_LOGGED_IN_USER } from '../store/actions/user.actions';
import { AppState } from '../store/reducers';


export const Login = () => {
  const [email, setEmail] = useState('kyleconkright@gmail.com');
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  (function isSignedIn() {
    useEffect(() => {
      dispatch({type: CHECK_FOR_LOGGED_IN_USER})
    }, []);
    return null;
  })();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function handleLogout(event) {
    axios.post('http://localhost:5001/logout');
    // TODO: dispatch actionf for this
    // setUser(null);
    // setEmail('');
  }
  
  async function handleEmailSubmit(e) {
    e.preventDefault();
    dispatch({type: USER_LOGIN, user: {email}});
  }

  return (
    user ? (
      <nav>
        <Link href="/account">
          <a>{user.email}</a>
        </Link>
        <a onClick={handleLogout}>Logout</a>
      </nav>
    ) : (
      <div>
        <input onChange={handleEmailChange} type="text" placeholder="email" />
        <button onClick={handleEmailSubmit}>Sign In</button>
      </div>
    )
  )
}



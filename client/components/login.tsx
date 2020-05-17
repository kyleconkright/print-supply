import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { USER_LOGIN, CHECK_FOR_LOGGED_IN_USER, USER_LOGOUT } from '../store/actions/user.actions';
import { AppState } from '../store/reducers';


export const Login = () => {
  const [email, setEmail] = useState();
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
    dispatch({type: USER_LOGOUT });
  }
  
  async function handleEmailSubmit(e) {
    e.preventDefault();
    dispatch({type: USER_LOGIN, user: {email}});
  }

  return (
    user.email ? (
      <nav>
        <Link href="/account">
          <a>account</a>
        </Link>
      </nav>
    ) : (
      user.isLoading ? (
        <span>Loading...</span>
      ) : (
        !user.emailVerified && user.emailSent ? (
          <span>Check Your Email</span>
        ) : (
        <div>
          <input onChange={handleEmailChange} type="text" placeholder="email" />
          <button onClick={handleEmailSubmit}>Sign In</button>
        </div>
          )
      )
    )
  )
}



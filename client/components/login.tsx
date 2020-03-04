import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { USER_LOGIN } from '../store/actions/user.actions';


export const Login = () => {
  const [email, setEmail] = useState('kyleconkright@gmail.com');
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();

  (function isSignedIn() {
    useEffect(() => {
      if (window.location.href.indexOf('signIn') !== -1 && window.localStorage.getItem('print-supply-email')) {
        const email = window.localStorage.getItem('print-supply-email');
        try {
          axios.post('http://localhost:5001/complete', { url: window.location.href, email })
        } catch(err) {console.error(err)}
      } else {
        try {
          axios.get('http://localhost:5001/').then((res: any) => {
            setUser(res.data.response);
          });
        } catch(err) {console.error(err)}
      }
    }, []);
    return null;
  })();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function handleLogout(event) {
    axios.post('http://localhost:5001/logout');
    setUser(null);
    setEmail('');
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


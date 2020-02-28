import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<any>({});

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
    console.log('logout');
    axios.post('http://localhost:5001/logout');
  }
  
  async function handleEmailSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/login', {email});
      window.localStorage.setItem('print-supply-email', email);
    } catch(err) {
      console.error(err);
    }
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


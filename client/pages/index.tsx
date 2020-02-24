import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';

const Page = () => {
  const [email, setEmail] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function handleEmailSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:5001/login', {email})
  }

  return (
    <form>
      <input onChange={handleEmailChange} type="text" placeholder="email" />
      <button onClick={handleEmailSubmit}>Sign In</button>
    </form>
  )
};



export default Layout(Page);
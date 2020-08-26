import Layout from './../../components/layouts/layout';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/reducers';
import { OtherInput } from '../../components/form/input';
import styled from 'styled-components';
import axios from 'axios';
import { USER_UPDATE } from '../../store/actions/user.actions';
import { useState } from 'react';

const Section = styled.section`
  padding: 16px;
`

const Account = () => {
  const user = useSelector((state: AppState) => state.user);
  const [userUpdate, setUserUpdate] = useState(user); 
  const dispatch = useDispatch();

  const updateUserDisplayName = (event) => {
    setUserUpdate({displayName: event.target.value} as any)
  }

  const handleAccountUpdate = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/user/update', {user: userUpdate });
      const user = JSON.parse(res.config.data).user;
      dispatch({type: USER_UPDATE, user });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Section>
      { user.displayName ? user.displayName : user.email }
      <div>
        <OtherInput placeholder="name" onChange={updateUserDisplayName}></OtherInput>
      </div>
      <button onClick={handleAccountUpdate}>Update</button>
    </Section>
  )
}

export default Layout(Account)
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { AppState } from '../../store/reducers';
import styled from 'styled-components';
import axios from 'axios';

import Layout from './../../components/layouts/layout';
import { USER_UPDATE } from '../../store/actions/user.actions';
import { OtherInput } from '../../components/form/input';
import { OtherButton } from '../../components/form/button';

const Section = styled.section`
  padding: 16px;
`

const Account = () => {
  const user = useSelector((state: AppState) => state.user);
  const [userUpdate, setUserUpdate] = useState(user); 
  const dispatch = useDispatch();

  useEffect(() => {
    if(!!user.email) {
      console.log(user);
      console.log({userUpdate});
    }
  }, [user]);

  const updateUser = (event) => {
    const {name, value} = event.target;
    setUserUpdate({
      ...userUpdate,
      [name]: value,
    } as any);
  }
  
  const updateUserAddress = (event) => {
    const {name, value} = event.target;
    setUserUpdate({
      ...userUpdate,
      address: {
        ...user.address,
        ...userUpdate.address,
        [name]: value,
      }
    } as any);
  }

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/user/update', {user: {...user, ...userUpdate} });
      const resUser = JSON.parse(res.config.data).user;
      dispatch({type: USER_UPDATE, resUser });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Section>
      <div>
        <OtherInput label="Name" name="displayName" value={ user.displayName ? user.displayName : "Name"} onChange={updateUser}></OtherInput>
      </div>
      <div>
        <OtherInput label="Street 1" name="street1" placeholder={ user.address?.street1 ? user.address.street1 : "Street" } onChange={updateUserAddress}></OtherInput>
        <OtherInput label="Street 2" name="street2" placeholder={ user.address?.street2 ? user.address.street2 : "Unit" } onChange={updateUserAddress}></OtherInput>
      </div>  
      <div>
        <OtherInput label="City" name="city" placeholder={ user.address?.city ? user.address.city : "City" } onChange={updateUserAddress}></OtherInput>
      </div>  
      <div>
        <OtherInput label="State" name="state" placeholder={ user.address?.state ? user.address.state : "State" } maxlength="2" onChange={updateUserAddress}></OtherInput>
      </div>
      <div>
        <OtherInput label="Zip" name="zip" placeholder={ user.address?.zip ? user.address.zip : "zip" } onChange={updateUserAddress}></OtherInput>
      </div>
      <OtherButton onClick={handleAccountUpdate} text="update"></OtherButton>
    </Section>
  )
}

export default Layout(Account)
import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { UserState } from '../../models/user';

export const UserContext = createContext({
  isAuth: false, 
  login: (auth) => {},
});

const UserContextProvider = props => {
  const user: UserState = useSelector((state: AppState) => state.user);
  const [isAuth, setIsAuth] = useState(user.emailVerified);

  const login = (auth) => {
    setIsAuth(auth);
  }

  return (
    <UserContext.Provider value={{isAuth, login}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;
import Link from 'next/link';
import styled from 'styled-components';
import { Login } from './login';
// import { theme } from './../styles/theme';
// import Menu from './menu';

const StyledHeader = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
`

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>Shirt Upload</Logo>
    </Link>
    <Login />
  </StyledHeader>
);

export default Header;
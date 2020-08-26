import Link from 'next/link';
import styled from 'styled-components';
import { Login } from './login';

const StyledHeader = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.a`
  font-family: verlag;
  font-size: 1.35rem;
  font-weight: 600;
  color: black;
  cursor: pointer;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>Other Supply</Logo>
    </Link>
    <Nav>
      <Login />
      <Link href="../order/create">
        <a>Order</a>
      </Link>
    </Nav>
  </StyledHeader>
);

export default Header;
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

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>Other Supply</Logo>
    </Link>
    <Login />
  </StyledHeader>
);

export default Header;
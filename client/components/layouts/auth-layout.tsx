import Router from 'next/router'
import Header from '../header';
import styled from 'styled-components';
import './../../css/stylesheet.scss';
import { useContext } from "react";
import { UserContext } from '../contexts/auth-context';

const Section = styled.section`
  margin-top: 55px;
`

const withAuthLayout = Page => {
  const userContext = useContext(UserContext);

  let content = userContext.isAuth ? <Page /> : 'redirect';

  return () => (
      <main>
        <Header />
        <Section>
          { content }
        </Section>
      </main>
  );
};

export default withAuthLayout;
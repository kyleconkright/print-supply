import Header from './header';
import styled from 'styled-components';
import './../css/stylesheet.scss';

const Section = styled.section`
  margin-top: 55px;
`

const withLayout = Page => {
  return () => (
      <main>
        <Header />
        <Section>
          <Page />
        </Section>
      </main>
  );
};

export default withLayout;
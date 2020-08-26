import Layout from '../components/layouts/layout';
import styled from 'styled-components';

const Background = 'https://oo-prod.s3.amazonaws.com/public/artworks/2018/07/09/217ac8f72aafd3e5/artworkRaster/original.png'

const HeroDiv = styled.div`
  width: 50%;
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 57px);
  background-image: url('${Background}');
`

const Page = () => {

  return (
    <section>
      <HeroDiv></HeroDiv>
      <div></div>
    </section>
  )
};

export default Layout(Page);
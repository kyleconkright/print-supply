import styled from 'styled-components';

const Button = styled.button`
  border: none;
  padding: .5rem .65rem;
  border-radius: 2px;
  cursor: pointer;
  background: #e0e3e4;
`

interface OtherButton {
  text: string;
  onClick: any;
}


export const OtherButton = (props: OtherButton) => {
  const { onClick } = props;
  return (
    <Button onClick={onClick}>{props.text}</Button>
  )
}
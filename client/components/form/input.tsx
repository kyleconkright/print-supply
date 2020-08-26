import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid;
  padding: 4px 0;
`

interface OtherInput  {
  placeholder: string,
  value?: string,
  onChange: any
}

export const OtherInput = (props: OtherInput) => {

  const { onChange } = props;

  return (
    <Input type="text" placeholder={props.placeholder} value={props.value} onChange={onChange}></Input>
  )
}
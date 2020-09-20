import styled from 'styled-components';

const Input = styled.input`
  border: none;
  padding: 4px 0;
  background: none;
`

const LabelText = styled.p`
  margin: 0;
  font-size: .65rem;
  opacity: .5;
`

interface OtherInput  {
  placeholder?: string,
  value?: string,
  name?: string,
  label?: string,
  maxlength?: string,
  onChange: any
}

export const OtherInput = (props: OtherInput) => {

  const { onChange } = props;

  return (
    <label>
      <LabelText>{props.label}</LabelText>
      <Input name={props.name} type="text" placeholder={props.placeholder} value={props.value} maxLength={props.maxlength} onChange={onChange}></Input>
    </label>
  )
}
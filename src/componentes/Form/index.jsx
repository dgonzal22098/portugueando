import styled from "styled-components";
import {device} from "../../Breakpoints/breakpoints.js"

const Form = styled.form`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 1rem 75px;
    justify-content: flex-start;
    margin-bottom: 3rem;
  
    @media ${device.mobile} {
      padding: 1rem;
    }
  
`

const Formulario = ({children, onSubmit}) => {
  return <>
    <Form onSubmit={onSubmit}>
        {children}
    </Form>
  </>
}

export default Formulario
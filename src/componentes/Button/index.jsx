import styled from "styled-components"

const ButtonComp = styled.button`
    width: 100%;
    border-radius: 8px;
    background-color: #3BAC52;
    color: white;
    font-weight: 500;
    border: none;
    height: 45px;
    font-size: 1rem;
    transition: .1s ease-in-out;
    padding: 1rem 0;
    &:hover{
      cursor: pointer;
      background-color: #44bd5c;
    }

`


const Button = ({texto, type, onClick}) => {
  return <ButtonComp type={type} onClick={onClick}>
        {texto}
  </ButtonComp>
}

export default Button
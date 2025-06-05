import styled from "styled-components"
import { IoAddOutline as AddIC} from "react-icons/io5";
import {device} from "../../../Breakpoints/breakpoints.js"

// Boton que muestra el formulario, no se necesita logica aca.

const BotonAgregar = ({setMostrarFormulario}) => {

  return (
    <Boton onClick={setMostrarFormulario}>
      <AddIC className="Icon"/>
      <span>Agregar profesor</span>
    </Boton>
  );
}

export default BotonAgregar

const Boton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3BAC52;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  height: fit-content;
  cursor: pointer;
  
  .Icon {
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: #345e3c;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media ${device.mobile} {
    width: auto;
    padding: 0.5rem 1rem;
    margin: 0;
    justify-content: center;
  }
`;

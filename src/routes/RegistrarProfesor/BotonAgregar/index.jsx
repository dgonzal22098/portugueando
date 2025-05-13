import styled from "styled-components"
import { IoAddOutline as AddIC} from "react-icons/io5";

// Boton que muestra el formulario, no se necesita logica aca.

const BotonAgregar = ({setMostrarFormulario}) => {

  return (
  <>
    <Boton onClick={setMostrarFormulario}>
      <span>Agregar profesor</span>
      <AddIC className="Icon"/>
    </Boton>
  </>
)
}

export default BotonAgregar

const Boton = styled.button`
  width: 46%;
  border-radius: 15px;
  background-color: #3BAC52;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem;
  border: none;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  margin: 2.5rem;
  text-decoration: none;
  
  span {
    width: 100%;
    text-align: center; 
  }
  .Icon{
    font-size: 2rem;
  }
  &:hover{
    cursor: pointer;
    background-color: #345e3c;
  }
`
import styled from "styled-components"
import { useState } from "react"
import ModalNewProfesor from "./ModalNewProfesor";
import {device} from "../../../Breakpoints/breakpoints.js"

// Formulario de nuevo profesor a registrar
// Rol: Administrador
// Logica: los datos recolectados en este formulario se envian al modal y este lo envia a la base de datos para que se registre un nuevo profesor.
// Revisar: Agregar el icono de cerrar en la esquina superior derecha.

const NewPersonForm = ({setMostrarFormulario}) => {

  const [showProfesorModal, setShowProfesorModal] = useState(false);
  const [profesorInfo, setProfesorInfo] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesorInfo(prev => ({ ...prev, [name]:value }));
  }

  return (
    <Container>
        <Titulo>Registro de nuevo docente</Titulo>
        <Form onSubmit={handleSubmit}>
          {fields.map(({name, label, type, placeholder}) => (
            <ContainerInput key={name}>
              <Label>{label}</Label>
              <Input 
              type={type} 
              placeholder={placeholder}
              name={name}
              value={profesorInfo[name] || ""}
              onChange={handleChange}
              />
            </ContainerInput>
          ))}
          <ContainerInput>
            <Label>Estado</Label>
            <Select>
              <option>Selecciona una opción: </option>
              <option>Activo</option>
              <option>Inactivo</option>
            </Select>
          </ContainerInput>

          <ButtonGroup>
            <Boton onClick={() => setShowProfesorModal(true)}>Agregar</Boton>
            <Boton className="Cancel" onClick={() => setMostrarFormulario(false)}>Cancelar</Boton>
          </ButtonGroup>
        </Form>
        {showProfesorModal && <ModalNewProfesor 
        profesorInfo={profesorInfo}
        setMostrarFormulario={setMostrarFormulario}
        setShowProfesorModal={setShowProfesorModal}/>}
    </Container>
  )
}

export default NewPersonForm

const fields = [
  {name:"name",label:"Nombres y apellidos", type:"text",placeholder:"Ingrese nombre completo..."},
  {name:"email",label:"Correo institucional", type:"text",placeholder:"Ingrese el correo institucional..."},
  {name:"id",label:"Cédula", type:"text",placeholder:"Ingrese número de identificación (sin espacios ni puntos)..."},
  {name:"dob",label:"Fecha de nacimiento", type:"date",placeholder:"Ingrese la fecha de nacimiento..."},
]
const Container = styled.div`
  width: 85%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px grey solid;
  background-color: white;
  
  @media ${device.mobile}{
    width: 100%;
  }
`
const Titulo = styled.h2`
  margin: 2rem ;
`
const Form = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`
const ContainerInput = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Input = styled.input`
  width: 70%;
  padding: 19px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 0.5px grey solid;
`
const Label = styled.label`
  margin: 0 0 1rem 1rem;
`
const Select = styled.select`
  width: 70%;
  padding: 19px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 0.5px grey solid;
  appearance: none;
`
const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const Boton = styled.button`
  width: 45%;
  border-radius: 15px;
  background-color: #3BAC52;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem;
  border: none;
  transition: background-color 0.3s ease;
  margin: 1rem 0;
  cursor: pointer;
  &:hover{
    background-color: #47b45d;
  }
  &.Cancel{
    background-color: white;
    color: black;
    border: 0.5px grey solid;
    &:hover{
      background-color: #e3e3e3;
    }
  }
`



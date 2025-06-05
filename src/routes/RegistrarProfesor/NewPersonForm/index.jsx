import styled from 'styled-components';
import React, { useState } from 'react';
import ModalNewProfesor from "./ModalNewProfesor";
import {device} from "../../../Breakpoints/breakpoints.js"

// Formulario de nuevo profesor a registrar
// Rol: Administrador
// Logica: los datos recolectados en este formulario se envian al modal y este lo envia a la base de datos para que se registre un nuevo profesor.
// Revisar: Agregar el icono de cerrar en la esquina superior derecha.

const NewPersonForm = ({setMostrarFormulario}) => {

  const [showProfesorModal, setShowProfesorModal] = useState(false);
  const [profesorInfo, setProfesorInfo] = useState({});
  const [formErrors, setFormErrors] = useState({});


  const fields = [
    { name: "name", label: "Nombres y apellidos", type: "text", placeholder: "Ingrese nombre completo..." },
    { name: "email", label: "Correo institucional", type: "email", placeholder: "Ingrese el correo institucional..." },
  ];

  const validateFields = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@universidadean\.edu\.co$/i;
    fields.forEach(({ name }) => {
      const value = profesorInfo[name] || "";

      if (!value.trim()) {
        errors[name] = "Este campo es obligatorio";
      } else if (name === "name" && value.trim().length < 3) {
        errors[name] = "Debe tener al menos 3 caracteres";
      } else if (name === "email") {
        if (!emailRegex.test(value)) {
          errors[name] = "Debe ser un correo @universidadean.edu.co válido";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setShowProfesorModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfesorInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Container>
      <Titulo>Registro de nuevo docente</Titulo>
      <Form onSubmit={handleSubmit}>
        {fields.map(({ name, label, type, placeholder }) => (
          <ContainerInput key={name}>
            <Label>{label}</Label>
            <Input
              type={type}
              placeholder={placeholder}
              name={name}
              value={profesorInfo[name] || ""}
              onChange={handleChange}
            />
            {formErrors[name] && <ErrorMsg>{formErrors[name]}</ErrorMsg>}
          </ContainerInput>
        ))}

          <ButtonGroup>
            <Boton type="submit">Agregar</Boton>
            <Boton
              className="Cancel"
              type="button"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Boton>
          </ButtonGroup>
        </Form>
        {showProfesorModal && <ModalNewProfesor 
        profesorInfo={profesorInfo}
        setMostrarFormulario={setMostrarFormulario}
        setShowProfesorModal={setShowProfesorModal}/>}
    </Container>
  )
}

const Input = styled.input`
  width: 70%;
  padding: 19px;
  margin-bottom: 5px;  // Reducido para espacio de errores
  border-radius: 10px;
  border: 0.5px ${props => props.hasError ? 'red' : 'grey'} solid;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  display: block;
`;

export default NewPersonForm



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



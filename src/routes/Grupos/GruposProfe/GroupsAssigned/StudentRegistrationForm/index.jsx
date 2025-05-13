import styled from "styled-components"
import { useState } from "react";
import ModalStudentComp from "../ModalAddStudent";

// Formulario para registrar un estudiante de forma manual
// Rol: Profesor
// Funcion: Formulario de nuevo estudiante, cuando el docente desea añadir a un estudiante de forma manual. Este modulo muestra un modal cuando se va a agregar un nuevo estudiante y muestra la informacion a punto de enviarse a la base de datos.
// Logica: La logica de este modulo se basa en enviar la informacion del nuevo estudiante desde el formulario a la base de datos.
// Pendiente: Falta mostrar el toast notification que es un pop up cuando se agrega un nuevo estudiante o una lista de forma adecuada. Falta mostrar el boton de la lista de estudiantes que acaban de ser registrados despues de haberse agregado ya sea por lista excel o manualmente.

const StudentRegistrationForm = ({onCancel, setShowStudentForm}) => {

    const [studentModal, setShowStudentModal] = useState(false);
    const [studentInfo, setInfoStudent] = useState({});

    const handleSubmit = (e) => {
      e.preventDefault();
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setInfoStudent(prev => ({ ...prev, [name]:value }));
    }

    return (
        <Container>
            <Titulo>Nuevo estudiante</Titulo>
            <Form onSubmit={handleSubmit}>
            {fields.map(({name, label, type, placeholder}) => (
                <ContainerInput key={name}>
                  <Label>{label}</Label>
                  <Input 
                  type={type} 
                  placeholder={placeholder}
                  name={name}
                  value={studentInfo[name] || ""}
                  onChange={handleChange}
                  />
                </ContainerInput>
            ))}

            <ButtonGroup>
                <Boton onClick={() => setShowStudentModal(true)}>Confirmar</Boton>
                <Boton className="Cancel" onClick={onCancel}>Cancelar</Boton>
            </ButtonGroup>

            </Form>
            {studentModal && <ModalStudentComp 
            setShowStudentModal={setShowStudentModal}
            studentInfo={studentInfo}
            setShowStudentForm={setShowStudentForm} />}

        </Container>
    )
}

export default StudentRegistrationForm

const fields = [
  {name: "fullName", label:"Nombres y apellidos", type:"text",placeholder:"Sin caracteres especiales..."},
  {name: "email",label:"Correo institucional", type:"text",placeholder:"name@universidadean.edu.co..."},
  {name: "id",label:"Cédula", type:"text",placeholder:"Ingrese número de identificación (sin espacios ni puntos)..."},
  {name: "dob" ,label:"Fecha de nacimiento", type:"date",placeholder:"Ingrese la fecha de nacimiento..."},
]
const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px #d9d9d9 solid;
  background-color: white;
`
const Titulo = styled.h2`
  margin: 2rem 2rem 0 2rem;
`
const Form = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`
const ContainerInput = styled.div`
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




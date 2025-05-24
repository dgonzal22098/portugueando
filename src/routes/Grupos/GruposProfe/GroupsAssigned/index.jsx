import styled from "styled-components"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdFileUpload } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import UploadFile from "./ModalUpload";
import ShowRegistrationForm from './StudentRegistrationForm'
import ListaEjemplo from "./ListaEjemplo";
import {device} from "../../../../Breakpoints/breakpoints";

// Modulo dentro del grupo seleccionado
// Rol: Profesor
// Funcion: Este modulo muestra la informacion de los grupos asignados a cierto curso, permite subir el archivo excel de nuevos estudiantes y crear estudiantes manualmente uno por uno.
// Logica: Solamente funciona para mostrar objetos, no tiene ninguna logica en este modulo.
// Pendiente: revisar para que cuando se suba el archivo de nuevos estudiantes y se active el boton, pueda mostrar los estudiantes actualizados, tambien considerar la funcionalidad de que el docente pueda modificar cierto estudiante en especifico en el modulo de la lista directamente.

const GruposDocentesNivel = () => {
  const location = useLocation();
  const { nivel } = location.state || {};
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentForm, setShowStudentForm] = useState(false);
  const [studentUploaded, setStudentUploaded] = useState(false);
  const [listaEstudiantesEjemplo, setListaEstudiantesEjemplo] = useState(false);

  const regresarButton = () => {
    navigate("/main/cursos");
  }


  useEffect(() => {
    if(nivel) {
      console.log("Nivel recibido: ", nivel);
    }
  }, [nivel]);

  

    return (
    <Container>
      <Titulo>Mis grupos: {nivel}</Titulo>

      <CardContainer>

        <GrupoContainer>

          <HeadContainer>
            <h2>Grupo 1</h2>
            <StatusCont>Activo</StatusCont>
          </HeadContainer>

          <p>Fecha de creación: 27-01-2024</p>

          {studentUploaded && <Button 
          style={{width:"49%"}} 
          className="buttonIcon"
          onClick={() => setListaEstudiantesEjemplo(true)}
          >
            Ver estudiantes
          </Button>}

          <ButtonCont>

            <Button className="buttonIcon" onClick={() => setShowUploadModal(true)}>
              Subir lista de estudiantes
              <MdFileUpload  className="icon"/>
            </Button>

            <Button onClick={() => setShowStudentForm(true)}>Agregar manual</Button>

          </ButtonCont>
          <p className="advise">Archivo .csv</p>

        </GrupoContainer>

        {studentForm && <ShowRegistrationForm 
          onCancel={() => setShowStudentForm(false)}
          setShowStudentForm={setShowStudentForm}/>}

        <Button onClick={regresarButton} className="buttonIcon">
          Regresar
          <IoIosReturnLeft className="icon"/>
        </Button>

      </CardContainer>

      {showUploadModal && <UploadFile 
      setShowUploadModal={setShowUploadModal} 
      setStudentUploaded={setStudentUploaded}/>}

      {listaEstudiantesEjemplo && <ListaEjemplo setListaEstudiantesEjemplo={setListaEstudiantesEjemplo}/>}

    </Container>)
}

export default GruposDocentesNivel


const Container = styled.div`
    padding: 2.5rem;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100vh;
    overflow: auto;
  @media ${device.mobile} {
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: flex-start;
  }
    &::-webkit-scrollbar {
        display: none;
    }
`
const Titulo = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  
  @media ${device.mobile} {
    font-size: 1.7rem;
    text-align: center;
  }
`
const CardContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  
  @media ${device.mobile} {
    width: 100%;
    
  }
`
const GrupoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
  border-radius: 15px;
  background-color: white;
  border: 1px #d9d9d9 solid;
  padding: 2rem;
  .advise{
    font-size: .8rem;
    font-style: italic;
    margin: 0 3rem;
    text-decoration: underline;
    color: #908f8f;
  }
`
const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StatusCont = styled.div`
  width: 150px;
  padding: 0.5rem 1rem;
  border: 1px #d9d9d9 solid;
  border-radius: 15px;
  text-align: center;
  
  @media ${device.mobile} {
    width: 100px;
  }
`
const ButtonCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 10px;
  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Button = styled.button`
  width: 50%;
  border-radius: 15px;
  background-color: #3BAC52;
  color: white;
  font-weight: bold;
  padding: 1rem;
  border: none;
  transition: .2s ease-in-out;
  
  @media ${device.mobile} {
    width: 80%;
  }
  &:hover{
    background-color: #53c76a;
    cursor: pointer;
  }
  &.buttonIcon{
    color: black;
    background-color: white;
    border: 1px #d9d9d9 solid;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    &:hover{
      background-color: #cdcccc;
    }
  }
  .icon{
    font-size: 1rem;
  }
`




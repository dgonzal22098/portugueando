import styled from "styled-components"
import { useState } from "react";
import { IoIosArrowDroprightCircle as Arrow} from "react-icons/io";
import { FaToggleOn as ToggleOn, FaToggleOff as ToggleOff } from "react-icons/fa";
import AlertActivation from "../Alert";
import ModalCursosInscritos from "./ModalCursosInscritos";
import {device} from "../../../Breakpoints/breakpoints.js"

// Componente de informacion de un docente
// Rol: Administrador
// Logica: Este componente muestra la informacion de los docentes registrado
// Revisar: Logica para que el estado del profesor si es cambiado se obtenga del modal Alert

const InformativeCard = ({usuario}) => {

    const [isActivated, setIsActivated] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showCursosInscritos, setShowCursosInscritos] = useState(false);
    
    
    return (
    <Container>

        <Primero>
          <DataHeader>
            <p>Nombre: {usuario.nombre}</p>
            <p>Correo: {usuario.email}</p>
            <p>Cédula: {usuario.cedula}</p>
            <p>Fecha de inscripción: {usuario.fecha_nac}</p>
          </DataHeader>
        </Primero>

        <BotonContainer>
          <Boton className="EstadoDiv ">
            <p>Estado: {usuario.estado ? "Activo" : "Inactivo"} </p>

            <div style={{display:"flex",alignItems:"center"}}>
              {isActivated ? <ToggleOn 
                className="iconito" 
                isActivated={isActivated} 
                onClick={() => {setIsActivated(!isActivated); setShowAlert(true)}}
                /> : <ToggleOff 
                      className="iconito off" 
                      isActivated={isActivated} 
                      onClick={() => setIsActivated(!isActivated) }/>}
            </div>

          </Boton>

          <Boton 
            className="EstadoDiv cursos" 
            onClick={() => setShowCursosInscritos(true)}>
              <p>Cursos inscritos</p>
              <div style={{display:"flex",alignItems:"center"}}>
                <Arrow className="iconito"/>
              </div>
          </Boton>

        </BotonContainer>

        {showAlert && <AlertActivation 
          setShowAlert={setShowAlert} 
          isActivated={isActivated} 
          setIsActivated={setIsActivated}/>}

        {showCursosInscritos && <ModalCursosInscritos
            setShowCursosInscritos={setShowCursosInscritos}
            nombre={usuario.name} />}

    </Container>)
}

export default InformativeCard

const Container = styled.div`
    padding: 2.5rem;
    width: 85%;
    height: fit-content;
    display: flex;
    border-radius: 10px;
    border: 0.5px grey solid;
    gap: 15px;
    background-color: white;
    
    @media ${device.mobile} {
        flex-direction: column;
        width: 100%;
    }
`
const BotonContainer = styled.div`
  width: 43%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
    
  @media ${device.mobile} {
      width: 100%;
  }  
`
const Primero = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`
const Boton = styled.div`
  width: 30%;
  padding: 1rem;
  border: 0.5px #a6a6a6 solid;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  &.EstadoDiv{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .iconito{
    font-size: 1.7rem;
    &:hover{
      cursor: pointer;
    }
  }
  &.cursos{
    &:hover{
      background-color: #e4e4e4;
      cursor: pointer;
    }
  }
`
const DataHeader = styled.div`
    padding: 1rem;
    border: 0.5px #a6a6a6 solid;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        white-space: normal;
        line-clamp: 3;
        -webkit-line-clamp: 3; /* muestra hasta 3 líneas */
        text-overflow: ellipsis;
    }
    
`

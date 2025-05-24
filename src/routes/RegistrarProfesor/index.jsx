import styled from "styled-components"
import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import InformativeCard from "./InformativeCard";
import BotonAgregar from "./BotonAgregar";
import NewPersonForm from "./NewPersonForm";
import {device} from "../../Breakpoints/breakpoints.js"

// Main de Registro de nuevo profesor
// Rol: Administrador
// Logica: Este modulo redirige a cursos, tambien permite inactivar un profesor (revisar para que la logica se haga desde aca y se envie el nuevo estado del profesor a la base de datos).
// Revisar: Cambiar la logica del boton Cursos inscritos para que muestre un modal con los cursos en los que este docente esta registrado y dependiendo de eso que redirija al usuario a la ventana de cursos directamente.


const RegistrarProfesor = () => {
  const {usuario} = useOutletContext();
  const [showProfesorFormulario, setMostrarFormulario] = useState(false);

    
  return(
  <Container>

      <h1>Registro de nuevo profesor</h1>

      <h2 style={{marginBottom:"2rem"}}>Docentes actualmente registrados</h2>

      <InformativeCard style={{marginBottom:"2rem"}} usuario={usuario} />

      <BotonAgregar setMostrarFormulario={() => setMostrarFormulario(true)}/>
      
      {showProfesorFormulario && <NewPersonForm setMostrarFormulario={setMostrarFormulario}/>}
      
    </Container>

)}


export default RegistrarProfesor

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
    }
    
    h2{
        @media ${device.mobile} {
            font-size: 1.5rem;
            text-align: center;
        }
    }
    
    h1{
        font-size: 3rem;
        margin-bottom: 2rem;
        
        @media ${device.mobile} {
            font-size: 2rem;
            text-align: center;
        }
    }
    
    &::-webkit-scrollbar {
        display: none;
    }
`


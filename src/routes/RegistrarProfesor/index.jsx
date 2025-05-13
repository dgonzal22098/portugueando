import styled from "styled-components"
import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import InformativeCard from "./InformativeCard";
import BotonAgregar from "./BotonAgregar";
import NewPersonForm from "./NewPersonForm";

// Main de Registro de nuevo profesor
// Rol: Administrador
// Logica: Este modulo redirige a cursos, tambien permite inactivar un profesor (revisar para que la logica se haga desde aca y se envie el nuevo estado del profesor a la base de datos).
// Revisar: Cambiar la logica del boton Cursos inscritos para que muestre un modal con los cursos en los que este docente esta registrado y dependiendo de eso que redirija al usuario a la ventana de cursos directamente.


const RegistrarProfesor = () => {
  const {usuario} = useOutletContext();
  const [showProfesorFormulario, setMostrarFormulario] = useState(false);
  
    
  return(
  <Container>

      <h1 style={{fontSize: "3rem", marginBottom:"2rem"}}>
        Registro de nuevo profesor
      </h1>

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
    &::-webkit-scrollbar {
        display: none;
    }
`


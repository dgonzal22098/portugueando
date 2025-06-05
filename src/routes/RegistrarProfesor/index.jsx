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
      <HeaderSection>
        <h1>Registro de nuevo profesor</h1>
        <BotonAgregar setMostrarFormulario={() => setMostrarFormulario(true)}/>
      </HeaderSection>

      <h2 style={{marginBottom:"2rem"}}>Docentes actualmente registrados</h2>

      {showProfesorFormulario && (
        <ModalOverlay>
          <ModalContent>
            <NewPersonForm setMostrarFormulario={setMostrarFormulario}/>
          </ModalContent>
        </ModalOverlay>
      )}

      <InformativeCard style={{marginBottom:"2rem"}} usuario={usuario} />
    </Container>
  );
}

export default RegistrarProfesor

const Container = styled.div`
    position: relative;
    padding: 2.5rem;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
        margin-right: 1rem;
        
        @media ${device.mobile} {
            font-size: 2rem;
            text-align: center;
        }
    }
    
    &::-webkit-scrollbar {
        display: none;
    }
`

const HeaderSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2rem;
    
    @media ${device.mobile} {
        flex-direction: column;
        gap: 1rem;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
    padding: 1rem;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 2.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    position: relative;
    margin: auto;
    animation: modalAppear 0.3s ease-out;

    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media ${device.mobile} {
        padding: 1.5rem;
        width: 95%;
        max-height: 85vh;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #666;
    }
`;

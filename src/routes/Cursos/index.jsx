import styled from "styled-components"
import CursoCard from "./CursoCard"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useState} from "react";
import CrearGrupoModal from "./CrearGrupoModal";
import {device} from "../../Breakpoints/breakpoints.js"

// Main de Cursos
// Rol: Administrador
// Explicacion: este modulo muestra los niveles creados, el resumen del conteo de sus grupos dentro y abre el modal de crear un nuevo grupo o de ingresar al nivel a revisar cada grupo.
// Logica: desde aca solamente se abre el modal de crear un nuevo grupo y desde alla se envia la informacion del nuevo grupo a la base de datos.

const Cursos = () => {
  const navigate = useNavigate();
  const [showCrearGrupoModal, setShowCrearGrupoModal] = useState(false);
  const {usuario} = useOutletContext();

  const iraGrupos = () => {

    if (usuario.rol === "Profesor") {
      navigate("/main/groups_assigned_docente");
    } else if (usuario.rol === "Administrador"){
      navigate("/main/grupos");
    }
  }

  return (
  <Container>

    <Titulo>Cursos y grupos</Titulo>

    <CardContainer >
      {titulos.map(
        (titulo, index) => (
          <CursoCard

          key={index} 
          value={titulo} 
          toGroups={iraGrupos} 
          setShowCrearGrupoModal={() => setShowCrearGrupoModal(true)} />
        ))}
    </CardContainer>

    {showCrearGrupoModal && <CrearGrupoModal 
    setShowCrearGrupoModal={setShowCrearGrupoModal}/>}
    
  </Container>)
}

export default Cursos

const titulos = [
  "Portugués 1","Portugués 2","Portugués 3","Portugués 4","Portugués 5","Portugués 6"
];

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
    }
    &::-webkit-scrollbar {
        display: none;
    }
`

const Titulo = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  @media ${device.mobile} {
    font-size: 2rem;
    text-align: center;
  }
`
const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  
  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`


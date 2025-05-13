import styled from "styled-components"
import GrupoCard from "../CardNivel";
import { useNavigate,Outlet } from "react-router-dom"

// Main de Grupos docente
// Rol: Profesor
// Funcion: Este modulo que es el main de la opcion "grupos" permite ver los niveles en los que el docente esta participando y un conteo de los grupos que ese nivel contiene, por ejemplo los grupos activos o inactivos.
// Logica: se debe obtener el nombre del nivel o el curso donde estaría haciendo el conteo de los grupos asignados.

const GruposCard = () => {
  const navigate = useNavigate();

  const toGroupsAssigned = (nivel) => {
    navigate("/pruebas/groups_assigned_docente", {state: {nivel}}); 
  }
  
  return (
  <Container>
    <Titulo>Grupos por nivel</Titulo>
    <CardContainer> 
      {titulos.map(
        (titulo, index) => (
          <GrupoCard key={index} value={titulo} onNavigate={toGroupsAssigned}/>
          
        ))}
    </CardContainer>
  </Container>)
}

export default GruposCard

const titulos = [
  "Portugués 1","Portugués 2","Portugués 3"
];
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
const Titulo = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`
const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`


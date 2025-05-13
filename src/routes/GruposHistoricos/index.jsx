import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import ListadoHistoricEstudiantes from "./HistoricStudents";

// Modulo de grupos históricos
// Rol: Administrador
// Logica: Muestra los grupos antiguos que no sean de el semestre actual y la información de los estudiantes y profesores que estuvieron asignados a ese grupo.

const GruposHistoricos = () => {
    const navigate = useNavigate();

    const [showHistoricStudents, setShowHistoricStudents] = useState(false);

    const regresarOption = () => {
        navigate("/pruebas/grupos");
    }

    return (
        <Container>

            <Titulo>
                Grupos históricos
                <Button className="regresar" onClick={regresarOption}>Regresar</Button>
            </Titulo>

            <GroupContainer>
                <h3>Title</h3>
                <p>Docente: Juan Manuel Santos</p>
                <p>Cantidad de estudiantes: 25</p>
                <p>Fecha de creación: pandemia jijiji</p>
                <p>Horario: 6 - 8 pm</p>

                <Button onClick={() => setShowHistoricStudents(true)}>Ver estudiantes</Button>

            </GroupContainer>
            {showHistoricStudents && <ListadoHistoricEstudiantes setShowHistoricStudents={setShowHistoricStudents}/>}

        </Container>
    )
}

export default GruposHistoricos

const Container = styled.div`
    padding: 2.5rem;
    width: 75%;
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
  display: flex;
  justify-content: space-between;
  width: 85%;
  align-items: center;
`
const GroupContainer = styled.div`
  width: 85%;
  background-color: white;
  border-radius: 15px;
  border: 1px #CECDCD solid ;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 2rem;
`
const Button = styled.button`
  border-radius: 15px;
  background-color: #3BAC52;
  width: fit-content;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  border: none;
  margin-top: 1rem;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: #53b667;
    cursor: pointer;
  }
  &.regresar{
    background-color: white;
    color: black;
    border: 1px #CECDCD solid ;
    height: fit-content;
    &:hover{
      background-color: #eae8e8;
    }
  }
`
import { useState, useEffect } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import ListadoHistoricEstudiantes from "./HistoricStudents";
import {device} from "../../Breakpoints/breakpoints.js";

// Modulo de grupos históricos
// Rol: Administrador
// Logica: Muestra los grupos antiguos que no sean de el semestre actual y la información de los estudiantes y profesores que estuvieron asignados a ese grupo.

const GruposHistoricos = () => {
    const navigate = useNavigate();
    const [showHistoricStudents, setShowHistoricStudents] = useState(false);
    const [gruposHistoricos, setGruposHistoricos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);

    useEffect(() => {
        const fetchGruposHistoricos = async () => {
            try {
                const response = await fetch('http://localhost:8000/main/grupos_historicos/', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Error al obtener grupos históricos');
                }

                const data = await response.json();
                setGruposHistoricos(data);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGruposHistoricos();
    }, []);

    const regresarOption = () => {
        navigate("/main/grupos");
    };

    const handleVerEstudiantes = (grupo) => {
        setSelectedGrupo(grupo);
        setShowHistoricStudents(true);
    };

    if (loading) return <p>Cargando grupos históricos...</p>;
    if (error) return <p>Error al cargar los grupos históricos: {error}</p>;

    return (
        <Container>

            <Titulo>
                Grupos históricos
                <Button className="regresar" onClick={regresarOption}>Regresar</Button>
            </Titulo>

            {gruposHistoricos.length === 0 ? (
                <p>No hay grupos históricos disponibles.</p>
            ) : (
                gruposHistoricos.map((grupo, index) => (
                    <GroupContainer key={index}>
                        <h3>Grupo {grupo.nGrupo}</h3>
                        <p>Docente: {grupo.email}</p>
                        <p>Nivel: {grupo.nivel}</p>
                        <p>Horario: {grupo.hora}</p>
                        <p>Fecha: {new Date(grupo.fecha).toLocaleDateString()}</p>
                        <p>Estado: {grupo.estado ? 'Activo' : 'Inactivo'}</p>
                        <Button onClick={() => handleVerEstudiantes(grupo)}>Ver estudiantes</Button>
                    </GroupContainer>
                ))
            )}

            {showHistoricStudents && (
                <ListadoHistoricEstudiantes
                    setShowHistoricStudents={setShowHistoricStudents}
                    grupo={selectedGrupo}
                />
            )}
        </Container>
    )
}

export default GruposHistoricos

const Container = styled.div`
    padding: 2.5rem;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    overflow: auto;
    @media ${device.mobile} {
        width: 100%;
        padding: 1rem;
        align-items: center;
    }
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
    
    @media ${device.mobile} {
        font-size: 2rem;
        flex-direction: column-reverse;
        align-items: center;
        gap: 1rem;
    }
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
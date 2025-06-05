import styled from "styled-components"
import {useOutletContext} from "react-router-dom";
import { useState, useEffect } from "react";

const CursoCard = ({value, toGroups, setShowCrearGrupoModal}) => {
    const {usuario} = useOutletContext();
    const [gruposInfo, setGruposInfo] = useState({
        total_grupos: 0,
        grupos_activos: 0,
        grupos_inactivos: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const nivelNumero = parseInt(value.replace("Portugués ", ""));

    useEffect(() => {
        const fetchGruposInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/main/grupos/${nivelNumero}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Error al obtener información de grupos');
                }

                const data = await response.json();
                setGruposInfo(data.resumen); // Usando el resumen de la respuesta
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGruposInfo();
    }, [nivelNumero]);

    const getRole = () => {
        const userRole = usuario?.rol || usuario?.user?.rol;
        if(userRole === "Administrador") {
            return "Administrador";
        } else if(userRole === "Profesor") {
            return "Profesor";
        } else if(userRole === "Estudiante") {
            return "Estudiante";
        }
        return null;
    }

    const role = getRole();

    const handleVerGrupos = () => {
        toGroups(nivelNumero);
    };

    if (loading) return <LoadingContainer>Cargando información...</LoadingContainer>;
    if (error) return <ErrorContainer>Error: {error}</ErrorContainer>;

    return (
    <Container>
        <h3 style={{marginBottom:"1rem"}}>{value}</h3>
        
        <InfoCont>
            <p>Grupos creados: {gruposInfo.total_grupos}</p>
            <p>Grupos activos: {gruposInfo.grupos_activos}</p>
            <p>Grupos inactivos: {gruposInfo.grupos_inactivos}</p>
        </InfoCont>

        {role === "Profesor" ? (
            <ButtonGroup>
                <ButtonCurso onClick={handleVerGrupos}>Ver grupos</ButtonCurso>
                <ButtonCurso onClick={setShowCrearGrupoModal}>Crear grupo</ButtonCurso>
            </ButtonGroup>) : (
            <ButtonGroup>
                <ButtonCurso onClick={handleVerGrupos}>Ver grupos</ButtonCurso>
            </ButtonGroup>
        )}

    </Container>)
}

export default CursoCard

const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px #d0d0d0 solid;
    background-color: white;
`
const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    width: 100%;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 1rem;
`
const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 1rem;
`
const ButtonCurso = styled.button`
    width: 45%;
    font-size: large;
    border-radius: 10px;
    border: 1px #d0d0d0 solid;
    padding: 0.5rem;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: #d0d0d0;
        cursor: pointer;
    }
`

const LoadingContainer = styled.div`
    width: 100%;
    padding: 2rem;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 15px;
    border: 1px #d0d0d0 solid;
`

const ErrorContainer = styled.div`
    width: 100%;
    padding: 2rem;
    text-align: center;
    background-color: #ffe6e6;
    border-radius: 15px;
    border: 1px #ffcccc solid;
    color: #cc0000;
`

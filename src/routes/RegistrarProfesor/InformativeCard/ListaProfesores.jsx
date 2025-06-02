// src/routes/RegistrarProfesor/InformativeCard/ListaProfesores.jsx
import { useEffect, useState, useCallback } from "react";
import InformativeCard from "./index.jsx";
import styled from "styled-components";

function ListaProfesores() {
    const [profesores, setProfesores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfesores = useCallback(async () => {
        try {
            console.log("Iniciando fetch de profesores...");
            const response = await fetch('http://localhost:8000/main/registro_profesor/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);

            if (Array.isArray(data)) {
                setProfesores(data);
            }
        } catch (error) {
            console.error("Error fetching profesores:", error);
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        fetchProfesores();
    }, [fetchProfesores]);

    if (cargando) return <p>Cargando profesores...</p>;
    if (error) return <p>Error: {error}</p>;
    if (profesores.length === 0) return <p>No hay profesores registrados.</p>;

    return (
        <GridContainer>
            {profesores.map((profesor, index) => (
                <InformativeCard key={profesor.emailpro || index} usuario={profesor} />
            ))}
        </GridContainer>
    );
};

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
`;

export default ListaProfesores;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 2rem;
    background-color: #f5f5f5;
`;

const ListaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Mensaje = styled.p`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #666;
`;
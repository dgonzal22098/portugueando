// src/routes/RegistrarProfesor/InformativeCard/ListaProfesores.jsx
import { useEffect, useState } from "react";
import InformativeCard from "./index.jsx";
import styled from "styled-components";

function ListaProfesores() {
    const [profesores, setProfesores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const obtenerProfesores = async () => {
        try {
            const response = await fetch('http://localhost:8000/main/registro_profesor/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);
            setProfesores(data);
        } catch (error) {
            console.error("Error en la petición:", error);
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerProfesores();
    }, []);

    return (
        <Container>
            <ListaContainer>
                {cargando ? (
                    <Mensaje>Cargando profesores...</Mensaje>
                ) : error ? (
                    <Mensaje>Error: {error}</Mensaje>
                ) : profesores.length === 0 ? (
                    <Mensaje>No hay profesores registrados</Mensaje>
                ) : (
                    profesores.map((profesor, index) => (
                        <InformativeCard
                            key={index}
                            usuario={profesor}
                        />
                    ))
                )}
            </ListaContainer>
        </Container>
    );
}

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
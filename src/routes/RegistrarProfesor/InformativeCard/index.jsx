import styled from "styled-components"
import { useState, useEffect } from "react";
import { IoIosArrowDroprightCircle as Arrow} from "react-icons/io";
import { FaToggleOn as ToggleOn, FaToggleOff as ToggleOff } from "react-icons/fa";
import AlertActivation from "../Alert";
import ModalCursosInscritos from "./ModalCursosInscritos";
import {device} from "../../../Breakpoints/breakpoints.js"

// Componente de informacion de un docente
// Rol: Administrador
// Logica: Este componente muestra la informacion de los docentes registrado
// Revisar: Logica para que el estado del profesor si es cambiado se obtenga del modal Alert

export const ListaProfesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProfesores = async () => {
            console.log("Iniciando obtención de profesores...");
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/main/registro_profesor/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include'
                });

                console.log("Status de la respuesta:", response.status);
                const responseText = await response.text();
                console.log("Respuesta del servidor:", responseText);

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status} - ${responseText}`);
                }

                let data;
                try {
                    data = JSON.parse(responseText);
                } catch (e) {
                    console.error("Error al parsear la respuesta JSON:", e);
                    throw new Error('La respuesta del servidor no es un JSON válido');
                }

                console.log("Datos parseados:", data);

                if (!Array.isArray(data)) {
                    console.error("Los datos recibidos no son un array:", data);
                    throw new Error('Los datos recibidos no tienen el formato esperado');
                }

                // Filtrar solo los usuarios que son profesores
                const soloProfesores = data.filter(user => user.rol === "Profesor");
                console.log("Profesores filtrados:", soloProfesores);

                setProfesores(soloProfesores);
            } catch (error) {
                console.error("Error al obtener profesores:", error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProfesores();
    }, []);

    // Separar profesores por estado
    const profesoresActivos = profesores.filter(profesor => profesor.estado === 1);
    const profesoresInactivos = profesores.filter(profesor => profesor.estado === 0);

    return (
        <ContainerList>
            <Header>
                <h1>Lista de Profesores</h1>
                <Counter>Total: {profesores.length}</Counter>
            </Header>

            {cargando ? (
                <LoadingMessage>Cargando profesores...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>Error: {error}</ErrorMessage>
            ) : profesores.length === 0 ? (
                <EmptyMessage>No hay profesores registrados</EmptyMessage>
            ) : (
                <>
                    <Section>
                        <SectionHeader>
                            <h2>Profesores Activos</h2>
                            <Counter small>{profesoresActivos.length}</Counter>
                        </SectionHeader>
                        <CardsList>
                            {profesoresActivos.map((profesor) => (
                                <CardWrapper key={profesor.email}>
                                    <InformativeCard usuario={profesor} />
                                </CardWrapper>
                            ))}
                            {profesoresActivos.length === 0 && (
                                <EmptyMessage>No hay profesores activos</EmptyMessage>
                            )}
                        </CardsList>
                    </Section>

                    <Section>
                        <SectionHeader>
                            <h2>Profesores Inactivos</h2>
                            <Counter small>{profesoresInactivos.length}</Counter>
                        </SectionHeader>
                        <CardsList>
                            {profesoresInactivos.map((profesor) => (
                                <CardWrapper key={profesor.email}>
                                    <InformativeCard usuario={profesor} />
                                </CardWrapper>
                            ))}
                            {profesoresInactivos.length === 0 && (
                                <EmptyMessage>No hay profesores inactivos</EmptyMessage>
                            )}
                        </CardsList>
                    </Section>
                </>
            )}
        </ContainerList>
    );
};

const InformativeCard = ({usuario}) => {
    const [isActivated, setIsActivated] = useState(usuario?.estado === 1);
    const [showAlert, setShowAlert] = useState(false);
    const [showCursosInscritos, setShowCursosInscritos] = useState(false);
    const [loading, setLoading] = useState(false);

    const actualizarEstado = async (nuevoEstado) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/main/profesor/estado/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    estado: nuevoEstado ? 1 : 0
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al actualizar el estado');
            }

            const data = await response.json();
            console.log("Estado actualizado:", data);
            setIsActivated(data.profesor.estado === 1);
        } catch (error) {
            console.error("Error:", error);
            // Revertir el cambio visual si hay error
            setIsActivated(!nuevoEstado);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Primero>
                <DataHeader>
                    <InfoRow>
                        <Label>Nombre:</Label>
                        <Value>{usuario.name || 'No disponible'}</Value>
                    </InfoRow>
                    <InfoRow>
                        <Label>Correo:</Label>
                        <Value>{usuario.email || 'No disponible'}</Value>
                    </InfoRow>
                </DataHeader>
            </Primero>

            <BotonContainer>
                <Boton className="EstadoDiv">
                    <InfoRow>
                        <Label>Estado:</Label>
                        <Value>{usuario.estado === 1 ? "Activo" : "Inactivo"}</Value>
                    </InfoRow>
                    <div style={{display: "flex", alignItems: "center"}}>
                        {loading ? (
                            <span>Actualizando...</span>
                        ) : usuario.estado === 1 ? (
                            <ToggleOn
                                className="iconito"
                                onClick={() => actualizarEstado(false)}
                            />
                        ) : (
                            <ToggleOff
                                className="iconito off"
                                onClick={() => actualizarEstado(true)}
                            />
                        )}
                    </div>
                </Boton>

                <Boton
                    className="EstadoDiv cursos"
                    onClick={() => setShowCursosInscritos(true)}>
                    <p>Cursos inscritos</p>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Arrow className="iconito"/>
                    </div>
                </Boton>
            </BotonContainer>

            {showAlert && (
                <AlertActivation
                    setShowAlert={setShowAlert}
                    isActivated={isActivated}
                    setIsActivated={setIsActivated}
                    profesorId={usuario.id}
                />
            )}

            {showCursosInscritos && (
                <ModalCursosInscritos
                    setShowCursosInscritos={setShowCursosInscritos}
                    nombre={usuario.name}
                />
            )}
        </Container>

    );
}

export default ListaProfesores;

const Container = styled.div`
    padding: 2.5rem;
    width: 100%;
    height: fit-content;
    display: flex;
    border-radius: 10px;
    border: 0.5px grey solid;
    gap: 15px;
    background-color: white;
    
    @media ${device.mobile} {
        flex-direction: column;
        width: 100%;
    }
`
const BotonContainer = styled.div`
  width: 43%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
    
  @media ${device.mobile} {
      width: 100%;
  }  
`
const Primero = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`
const Boton = styled.div`
  width: 30%;
  padding: 1rem;
  border: 0.5px #a6a6a6 solid;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  &.EstadoDiv{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .iconito{
    font-size: 1.7rem;
    &:hover{
      cursor: pointer;
    }
  }
  &.cursos{
    &:hover{
      background-color: #e4e4e4;
      cursor: pointer;
    }
  }
`
const DataHeader = styled.div`
    padding: 1rem;
    border: 0.5px #a6a6a6 solid;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        white-space: normal;
        line-clamp: 3;
        -webkit-line-clamp: 3; /* muestra hasta 3 líneas */
        text-overflow: ellipsis;
    }
    
`
const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Label = styled.span`
    font-weight: bold;
    color: #333;
`;

const Value = styled.span`
    color: #666;
`;

const ContainerList = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h1 {
        font-size: 2rem;
        color: #333;
    }
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    h2 {
        font-size: 1.5rem;
        color: #333;
    }
`;

const CardsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 2rem;
    background-color: #e8f4ff;
    border-radius: 8px;
    color: #0066cc;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 2rem;
    background-color: #ffe8e8;
    border-radius: 8px;
    color: #cc0000;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    color: #666;
`;

const Counter = styled.span`
    background-color: #f0f0f0;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: bold;
    color: #333;
    ${({ small }) => small && `
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
    `}
`;

const CardWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

import styled from "styled-components"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react";
import CrearGrupoModal from "./CrearGrupoModal";
import {device} from "../../Breakpoints/breakpoints.js"

// Main de Cursos
// Rol: Administrador
// Explicacion: este modulo muestra los niveles creados, el resumen del conteo de sus grupos dentro y abre el modal de crear un nuevo grupo o de ingresar al nivel a revisar cada grupo.
// Logica: desde aca solamente se abre el modal de crear un nuevo grupo y desde alla se envia la informacion del nuevo grupo a la base de datos.
const titulos = [
  "Portugués 1","Portugués 2","Portugués 3","Portugués 4","Portugués 5","Portugués 6"
];

const getNivelFromTitulo = (titulo) => {
  return parseInt(titulo.split(' ')[1], 6); 
};

const Cursos = () => {
  const navigate = useNavigate();
  const { usuario } = useOutletContext();
  const [showCrearGrupoModal, setShowCrearGrupoModal] = useState(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);

  const handleNavigation = (nivel) => {
    if (usuario.rol === "Profesor") {
      navigate(`/main/groups_assigned_docente/${nivel}`);
    } else {
      navigate(`/main/grupos/${nivel}`);
    }
  };

  const handleCrearGrupo = (nivel) => {
    setNivelSeleccionado(nivel); 
    setShowCrearGrupoModal(true);
};

  return (
    <Container>
      <Titulo>Cursos y grupos</Titulo>
        <CardContainer>
          {titulos.map((titulo, index) => {
            const nivel = getNivelFromTitulo(titulo);
            return (
              <NivelCard key={index}>
                <NivelTitulo>{titulo}</NivelTitulo>
                <Boton onClick={() => handleNavigation(titulo)}>Ver grupos</Boton>
                <Boton onClick={() => handleCrearGrupo(nivel)}>Crear grupo</Boton>
              </NivelCard>
            );
          })}
        </CardContainer>

      {showCrearGrupoModal && (
        <CrearGrupoModal
          setShowCrearGrupoModal={setShowCrearGrupoModal}
          cursoId={nivelSeleccionado}
        />
      )}
    
    </Container>
  )
}

export default Cursos;

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

const NivelCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const NivelTitulo = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const Boton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background-color: #3BAC52;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #47b45d;
  }
`;



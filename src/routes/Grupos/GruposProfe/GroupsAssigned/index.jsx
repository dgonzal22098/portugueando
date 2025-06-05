import styled from "styled-components"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdFileUpload } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";
import UploadFile from "./ModalUpload";
import ShowRegistrationForm from './StudentRegistrationForm'
import ListaEjemplo from "./ListaEjemplo";
import {device} from "../../../../Breakpoints/breakpoints";

const GruposDocentesNivel = () => {
  const location = useLocation();
  const { nivel } = location.state || {};
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentForm, setShowStudentForm] = useState(false);
  const [studentUploaded, setStudentUploaded] = useState(false);
  const [listaEstudiantesEjemplo, setListaEstudiantesEjemplo] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrupos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/main/grupos/${nivel}`);
      if (!response.ok) {
        throw new Error('Error al cargar los grupos');
      }
      const data = await response.json();
      // Filtrar solo los grupos donde el profesor es líder
      const gruposLider = data.grupos || [];
      setGrupos(gruposLider);

      // Log para debugging
      console.log('Grupos recibidos:', gruposLider);
    } catch (err) {
      console.error('Error al cargar grupos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nivel) {
      fetchGrupos();
    }
  }, [nivel]);

  const regresarButton = () => {
    navigate("/main/cursos");
  }

  if (loading) return <LoadingMessage>Cargando grupos...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Titulo>Mis grupos: {nivel}</Titulo>

      <CardContainer>
        {grupos.length > 0 ? (
          grupos.map((grupo) => (
            <GrupoContainer key={grupo.id_grupo}>
              <HeadContainer>
                <h2>Grupo {grupo.nGrupo}</h2>
                <StatusCont>{grupo.estado ? 'Activo' : 'Inactivo'}</StatusCont>
              </HeadContainer>

              <p>Fecha de creación: {grupo.fecha ? new Date(grupo.fecha).toLocaleDateString() : 'No disponible'}</p>

              {studentUploaded && (
                <Button
                  style={{width:"49%"}}
                  className="buttonIcon"
                  onClick={() => setListaEstudiantesEjemplo(true)}
                >
                  Ver estudiantes
                </Button>
              )}

              <ButtonCont>
                <Button className="buttonIcon" onClick={() => setShowUploadModal(grupo.id_grupo)}>
                  Subir lista de estudiantes
                  <MdFileUpload className="icon"/>
                </Button>

                <Button onClick={() => setShowStudentForm(true)}>Agregar manual</Button>
              </ButtonCont>
              <p className="advise">Archivo .csv separado por punto y coma.</p>
            </GrupoContainer>
          ))
        ) : (
          <NoGruposMessage>No hay grupos disponibles para este nivel</NoGruposMessage>
        )}

        <Button onClick={regresarButton} className="buttonIcon">
          Regresar
          <IoIosReturnLeft className="icon"/>
        </Button>
      </CardContainer>

      {showUploadModal && (
        <UploadFile
          setShowUploadModal={() => setShowUploadModal(false)}
          setStudentUploaded={setStudentUploaded}
          grupoId={showUploadModal}
        />
      )}

      {studentForm && (
        <ShowRegistrationForm
          onCancel={() => setShowStudentForm(false)}
          setShowStudentForm={setShowStudentForm}
        />
      )}

      {listaEstudiantesEjemplo && (
        <ListaEjemplo
          setListaEstudiantesEjemplo={setListaEstudiantesEjemplo}
        />
      )}
    </Container>
  );
}

export default GruposDocentesNivel

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
    padding: 1rem;
    align-items: center;
    justify-content: flex-start;
  }
    &::-webkit-scrollbar {
        display: none;
    }
`
const Titulo = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  
  @media ${device.mobile} {
    font-size: 1.7rem;
    text-align: center;
  }
`
const CardContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  
  @media ${device.mobile} {
    width: 100%;
    
  }
`
const GrupoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
  border-radius: 15px;
  background-color: white;
  border: 1px #d9d9d9 solid;
  padding: 2rem;
  .advise{
    font-size: .8rem;
    font-style: italic;
    margin: 0 3rem;
    text-decoration: underline;
    color: #908f8f;
  }
`
const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StatusCont = styled.div`
  width: 150px;
  padding: 0.5rem 1rem;
  border: 1px #d9d9d9 solid;
  border-radius: 15px;
  text-align: center;
  
  @media ${device.mobile} {
    width: 100px;
  }
`
const ButtonCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 10px;
  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`
const Button = styled.button`
  width: 50%;
  border-radius: 15px;
  background-color: #3BAC52;
  color: white;
  font-weight: bold;
  padding: 1rem;
  border: none;
  transition: .2s ease-in-out;
  
  @media ${device.mobile} {
    width: 80%;
  }
  &:hover{
    background-color: #53c76a;
    cursor: pointer;
  }
  &.buttonIcon{
    color: black;
    background-color: white;
    border: 1px #d9d9d9 solid;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    &:hover{
      background-color: #cdcccc;
    }
  }
  .icon{
    font-size: 1rem;
  }
`
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff0033;
  font-size: 1.2rem;
`;

const NoGruposMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  border: 1px #d9d9d9 solid;
  color: #666;
  font-size: 1.2rem;
`;

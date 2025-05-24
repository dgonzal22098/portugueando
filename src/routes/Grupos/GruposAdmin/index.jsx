import styled from "styled-components"
import {useNavigate, useOutletContext} from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import ListadoEstudiantes from "../ListadoEstudiantes";
import Inhabilitar from "../Inhabilitar";
import CrearGrupoModal from "../../Cursos/CrearGrupoModal";
import {device} from "../../../Breakpoints/breakpoints.js";



// Modulo interior dentro de la opcion "Ver grupos" en la ruta de /cursos que solo pertenece al administrador.
// Rol: Administrador
// Logica: Este modulo muestra los grupos creados en cierto nivel, con la informacion del docente responsable, la cantidad de estudiantes que el docente ha registrado, la fecha de creacion del grupo, y el horario del grupo. Tiene el modal de mostrar los estudiantes registrados, dentro de modal la opcion de descargar la lista de excel y la opcion de inhabilitar el grupo especifico.
// Se deben traer los datos de los grupos de la base de datos, aca se validan los datos del grupo, se traen y se muestran en el GroupContainer. Si se inhabilita, se debe enviar el nuevo estado a la base de datos.
// Pendiente: Falta la logica de que despues de agregar un grupo se muestre automaticamente dentro de la seccion de cursos y grupos en su respectivo nivel, asi de como mostrar en los historicos, aunque tendriamos que determinar si alguna fecha es la que categoriza a los grupos historicos o todos incluyendo los actuales. Revisar si podemos permitir editar el grupo existente y guardar los cambios que se hagan sobre ese mismo grupo, cambios permitidos como horario, docente o estado.
// Pendiente: enviar la creación de grupo dentro de este mismo nivel ya que el admin esta metido en un nivel especifico, si quiere crear grupo desde aca o desde afuera en la vista general de cursos, se debe obtenerse el nombre del curso y asi se autorellenaria.

const Grupos = () => {
  const navigate = useNavigate();
  const [showEstudiantes, setShowEstudiantes] = useState(false);
  const [showInhabilitar, setShowInhabilitar] = useState(false);
  const [showCrearGrupo, setShowCrearGrupo] = useState(false);

  const {usuario} = useOutletContext();

  const getRole = (usuario) => {
    if(usuario.rol === "administrador") {
      return "Administrador";
    } else if(usuario.rol === "profesor") {
      return "Profesor";
    } else if(usuario.rol === "estudiante") {
      return "Estudiante";
    }
  }

  const role = getRole(usuario);

  console.log(role);


  const regresarOption = () => {
    navigate("/main/cursos");
  }

  const iraHistorial = () => {
    navigate("/main/grupos_historicos");
  }

  return (
  <Container>
    <Titulo>
      Grupos creados
      <Buttons className="regresar" onClick={regresarOption}>Regresar</Buttons>
    </Titulo>

    {gruposInfo.map((grupo, index) => (
      <GroupContainer key={index}>
        <h3>{grupo.titulo}</h3>
        <p>Docente: {grupo.docente}</p>
        <p>Cantidad de estudiantes: {grupo.cantidadEstudiantes}</p>
        <p>Fecha de creación: {grupo.fechaCreacion}</p>
        <p>Horario: {grupo.horario}</p>
        <ButtonGroup>
          <Buttons className="estudiantes" onClick={() => setShowEstudiantes(true)}>Ver estudiantes</Buttons>
          <Buttons className="inactivar" onClick={() => setShowInhabilitar(true)}>Inhabilitar</Buttons>
        </ButtonGroup>
      </GroupContainer>
    ))}


    {role === "Profesor" ? (
      <GroupContainer className="additionalButtons">
        <Buttons className="agregarButton" onClick={() => setShowCrearGrupo(true)}>Crear grupo<IoMdAdd /></Buttons>
        <Buttons className="agregarButton" onClick={iraHistorial}>Historial de grupos<FaHistory /></Buttons>
      </GroupContainer>
    ) : (
        <GroupContainer className="additionalButtons">
          <Buttons className="agregarButton" onClick={iraHistorial}>Historial de grupos<FaHistory /></Buttons>
        </GroupContainer>

    )}

    {showEstudiantes && <ListadoEstudiantes setShowEstudiantes={setShowEstudiantes}/>}
    {showInhabilitar && <Inhabilitar setShowInhabilitar={setShowInhabilitar}/>}
    {showCrearGrupo && <CrearGrupoModal setShowCrearGrupoModal={setShowCrearGrupo}/>}
  </Container>
  )
}

export default Grupos

const gruposInfo = [
  {
    titulo:"Grupo 1",
    docente:"Mariano Ospina",
    cantidadEstudiantes:"25",
    fechaCreacion:"12-01-2024",
    horario:"6 pm - 8 pm",
    estado:"activo",
    id:""
  },
  {
    titulo:"Grupo 2",
    docente:"Alejo Ospina",
    cantidadEstudiantes:"30",
    fechaCreacion:"12-01-2024",
    horario:"6 pm - 8 pm",
    estado:"activo",
    id:""
  },
  {
    titulo:"Grupo 3",
    docente:"Juan Manuel Santos",
    cantidadEstudiantes:"25",
    fechaCreacion:"12-01-2024",
    horario:"6 pm - 8 pm",
    estado:"activo",
    id:""
  },
  {
    titulo:"Grupo 4",
    docente:"Silvana Lopez",
    cantidadEstudiantes:"25",
    fechaCreacion:"12-01-2024",
    horario:"6 pm - 8 pm",
    estado:"activo",
    id:""
  },
];

const Container = styled.div`
    padding: 2.5rem;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100vh;
    overflow: auto;
  @media ${device.mobile} {
    width: 100%;
    padding: 1rem;
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
  width: 100%;
  align-items: center;
  
  @media ${device.mobile} {
    font-size: 2rem;
    text-align: center;
    flex-direction: column-reverse;
    align-items: center;
    gap: 1rem;
  }
`
const GroupContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px;
  border: 1px #CECDCD solid ;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 2rem;
  &.additionalButtons{
    flex-direction: row;
    justify-content: center;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-top: 1rem;
`
const Buttons = styled.button`
  border-radius: 15px;
  background-color: #3BAC52;
  width: fit-content;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  border: none;
  transition: 0.2s ease-in-out;
  &:hover{
    background-color: #53b667;
    cursor: pointer;
  }
  &.estudiantes{
    background-color: white;
    color: black;
    border: 1px #CECDCD solid ;
    &:hover{
      background-color: #eae8e8;
    }
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
  &.agregarButton{
    width: 50%;
    font-size: 1rem;
    background-color: white;
    color: black;
    border: 1px #CECDCD solid ;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    &:hover{
      background-color: #eae8e8;
    }
    @media ${device.mobile} {
      width: 100%;
    }
  }
`



import styled from "styled-components"
import {useOutletContext} from "react-router-dom";

// Plantilla de cursos que han sido creados por el administrador
// Rol: Administrador
// Logica: Abre el modal de crear un grupo y desde alla se envia la informacion del nuevo grupo a la base de datos.

const CursoCard = ({value, toGroups, setShowCrearGrupoModal}) => {

    const {usuario} = useOutletContext();

    const getRole = () => {
        if(usuario.rol === "Administrador") {
            return "Administrador";
        } else if(usuario.rol === "Profesor") {
            return "Profesor";
        } else if(usuario.rol === "Estudiante") {
            return "Estudiante";
        }
    }

    const role = getRole();

    return (
    <Container>
        <h3 style={{marginBottom:"1rem"}}>{value}</h3>
        
        <InfoCont>
            <p>Grupos creados: 1</p>
            <p>Grupos activos: 1</p>
            <p>Grupos inactivos: 1</p>
        </InfoCont>

        {role === "Profesor" ? (
            <ButtonGroup>
                <ButtonCurso onClick={toGroups}>Ver grupos</ButtonCurso>
                <ButtonCurso onClick={setShowCrearGrupoModal}>Crear grupo</ButtonCurso>
            </ButtonGroup>) : (
            <ButtonGroup>
                <ButtonCurso onClick={toGroups}>Ver grupos</ButtonCurso>
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
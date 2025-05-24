import styled from "styled-components"
import {useOutletContext} from "react-router-dom";
import ProfesorView from "./ProfesorView";
import StudentView from "./StudentView";


const Reportes = () => {

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
            {
                role === "Profesor" ? (
                    <ProfesorView />
                ) : (
                    <StudentView />
                )
            }

        </Container>
    );
}
export default Reportes

const Container = styled.div`
    padding: 2.5rem;
    width: 100%;
    height: 100dvh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    
    &::-webkit-scrollbar {
    display: none;
    }
        
`

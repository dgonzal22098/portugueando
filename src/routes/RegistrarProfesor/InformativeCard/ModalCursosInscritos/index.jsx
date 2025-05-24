import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import {useNavigate} from "react-router-dom";

// Modal informacion de los cursos de un profesor
// Rol: Administrador
// Logica: Este modal solo es informativo, no envia ninguna informacion al elemento padre. Redirije a cursos. Se debe traer el conteo de los cursos de este docente asi como la informacion especifica del docente registrado en la plataforma.
// Revisar: Logica de traer informacion del docente registrado en la plataforma no del usuario. IMPORTANTE

const ModalCursosInscritos = ({setShowCursosInscritos, nombre}) => {

    const navigate = useNavigate();

    const irACursos = () => {
        navigate("/main/cursos");
    };

    return (
        <ModalBackdrop onClick={() => setShowCursosInscritos(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>

                <CloseButton onClick={() => setShowCursosInscritos(false)}>
                    <IoClose size={24} />
                </CloseButton>
                <h3>Cursos registrados para {nombre}</h3>

                <CursosList>
                    <Curso>
                        {cursosInscritos.map((curso, index) => (
                            <p key={index}>

                                Nivel {curso.nivel} - Grupo {curso.grupo} - Fecha: {curso.fechaCreacion}

                            </p>
                        ))}
                    </Curso>
                </CursosList>


                <ButtonGroup>
                    <Button onClick={irACursos}>Ir a cursos</Button>
                    <Button className="cerrar" onClick={() => setShowCursosInscritos(false)}>Cerrar</Button>
                </ButtonGroup>
            </Modal>
        </ModalBackdrop>)
}

export default  ModalCursosInscritos

const cursosInscritos = [
    { nivel: 1, grupo: 1, fechaCreacion: "2025-05-01" },
    { nivel: 1, grupo: 2, fechaCreacion: "2025-05-01" },
    { nivel: 1, grupo: 3, fechaCreacion: "2025-05-02" },
    { nivel: 2, grupo: 1, fechaCreacion: "2025-05-03" },
    { nivel: 2, grupo: 2, fechaCreacion: "2025-05-03" },
    { nivel: 3, grupo: 1, fechaCreacion: "2025-05-04" },
    { nivel: 4, grupo: 1, fechaCreacion: "2025-05-05" },
    { nivel: 4, grupo: 2, fechaCreacion: "2025-05-05" },
    { nivel: 5, grupo: 1, fechaCreacion: "2025-05-06" },
    { nivel: 6, grupo: 1, fechaCreacion: "2025-05-07" }
];
const Curso = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
`;
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    `
const Modal = styled.div`
    background: white;
    position: relative;
    padding: 2rem;
    border-radius: 1rem;
    width: 600px;
    max-height: 80dvh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const CursosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 2rem;
  max-height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
      display: none;
  }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-left: 2rem;
`;

const Button = styled.button`
    flex: 1;
    height: 45px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    background-color: #3BAC52;
    color: white;

    &:hover {
        background-color: #54c36a;
    }

    &.cerrar {
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        &:hover {
            background-color: #eee;
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  
    &:hover {
      color: #ff5f5f;
    }
  `;

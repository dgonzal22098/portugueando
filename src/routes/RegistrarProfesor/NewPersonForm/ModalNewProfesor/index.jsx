
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import {device} from "../../../../Breakpoints/breakpoints.js";

// Modal de confirmacion de nuevo docente
// Rol: Administrador
// Logica: enviar la informacion del profesor nuevo que se ha agregado de forma manual a la base de datos.

const ModalNewProfesor = ({setShowProfesorModal, profesorInfo, setMostrarFormulario}) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <ModalBackdrop onClick={() => setShowProfesorModal(false)} >
            <Modal 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            >
                
                <CloseButton onClick={() => setShowProfesorModal(false)}>
                    <IoClose size={24} />
                </CloseButton>

                <h2 style={{marginBottom:"1rem"}}>Confirmación nuevo profesor</h2>
                <ul style={{ textAlign: "left", margin:"3rem" }}>
                    <li><strong>Nombre:</strong> {profesorInfo.fullName}</li>
                    <li><strong>Correo:</strong> {profesorInfo.email}</li>
                    <li><strong>Cédula:</strong> {profesorInfo.id}</li>
                    <li><strong>Fecha de nacimiento:</strong> {profesorInfo.dob}</li>
                </ul>

                <ModalButtons>

                    <Confirm 
                    onClick={() => {console.log("Profesor creado");
                        setShowProfesorModal(false);
                        setMostrarFormulario(false);
                    }}>
                        Confirmar registro
                    </Confirm>
                    <Cancel onClick={() => setShowProfesorModal(false)}>Cancelar</Cancel>

                </ModalButtons>

            </Modal>
        </ModalBackdrop>
    );
};

export default ModalNewProfesor;

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
    text-align: center;
    width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    
    @media ${device.mobile} {
        margin: 0 1rem;
        padding: 1rem;
    }

    .myFile{
        font-family: inherit;
        font-size:1rem;
    }
    `
const ModalButtons = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    `
const Confirm = styled.button`
    background-color: #3BAC52;
    color: white;
    border: none;
    border-radius: 8px;
    width: 40%;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover{
        background-color: #49c662;
    }
    `
const Cancel = styled.button`
    width: 40%;
    background-color: #ccc;
    color: black;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    &:hover{
        background-color: #a8a8a8;
    }
    `
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

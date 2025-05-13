import styled from "styled-components";
import { IoClose } from "react-icons/io5";

// Modal de confirmacion del nuevo estudiante
// Rol: Profesor
// Funcion: Este modulo es una ventana pop up que muestra la informacion del estudiante que va a ser creado y enviado a la base de datos.
// Logica: El modulo enviara la informacion del estudiante nuevo a la base de datos.
// Pendiente: Se debe crear un pop up que confirme cuando el estudiante se creo con exito o ocurrio un error.

const ModalStudentComp = ({setShowStudentModal, studentInfo, setShowStudentForm}) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <ModalBackdrop onClick={() => setShowStudentModal(false)} >
            <Modal 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            >
                
                <CloseButton onClick={() => setShowStudentModal(false)}>
                    <IoClose size={24} />
                </CloseButton>

                <h2 style={{marginBottom:"1rem"}}>Confirmación nuevo estudiante</h2>
                <ul style={{ textAlign: "left", margin:"3rem" }}>
                    <li><strong>Nombre:</strong> {studentInfo.fullName}</li>
                    <li><strong>Correo:</strong> {studentInfo.email}</li>
                    <li><strong>Cédula:</strong> {studentInfo.id}</li>
                    <li><strong>Fecha de nacimiento:</strong> {studentInfo.dob}</li>
                </ul>

                <ModalButtons>

                    <Confirm 
                    onClick={() => {console.log("Estudiante creado");
                    setShowStudentModal(false);
                    setShowStudentForm(false);
                    }}>
                        Crear estudiante
                    </Confirm>
                    <Cancel onClick={() => setShowStudentModal(false)}>Cancelar</Cancel>

                </ModalButtons>

            </Modal>
        </ModalBackdrop>
    );
};

export default ModalStudentComp;

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

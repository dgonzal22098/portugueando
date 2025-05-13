import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

// Modal de subir archivo excel (lista de nuevos estudiantes)
// Rol: Profesor
// Funcion: Este modal recibe el archivo excel con los datos de los nuevos estudiantes en una lista y lo envia a la base de datos para registrar a los nuevos estudiantes
// Logica: Recibir el archivo de excel, leer los datos y enviarlos a la base de datos, generar un pop up cuando el archivo se haya subido de forma correcta.

const UploadFile = ({setShowUploadModal, setStudentUploaded}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    const handleUpload = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setStudentUploaded(true);

        setTimeout(() => {
            setShowSuccess(false);
            setShowUploadModal(false);
        }, 2000);
    }

    return (
        <>
            {showSuccess && (
                <SuccessPopup>Estudiantes registrados exitosamente!</SuccessPopup>
            )}

            <ModalBackdrop onClick={() => setShowUploadModal(false)} >

                <Modal 
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                >
                    
                    <CloseButton onClick={() => setShowUploadModal(false)}>
                        <IoClose size={24} />
                    </CloseButton>

                    <h3 style={{margin:"1rem"}}>Haga click en "Choose File" para subir el archivo .csv</h3>
                    <input type="file" id="myFile" className="myFile" name="filename" />

                    <ModalButtons>

                        <Confirm onClick={handleUpload}>
                            Subir archivo
                        </Confirm>

                        <Cancel onClick={() => setShowUploadModal(false)}>Cancelar</Cancel>

                    </ModalButtons>

                </Modal>

            </ModalBackdrop>
        </>)
}

export default  UploadFile

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
    width: fit-content;
    .myFile{
        font-family: inherit;
        font-size:1rem;
    }
    `
const ModalButtons = styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-around;
    `
const Confirm = styled.button`
    background-color: #3BAC52;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    width: 40%;
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
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
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

const SuccessPopup = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #3BAC52;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
  z-index: 1001;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(10px); }
  }
`;

  
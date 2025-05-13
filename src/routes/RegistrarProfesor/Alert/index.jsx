import styled from "styled-components";
import { IoClose } from "react-icons/io5";

// Componente de alerta
// Rol: Administrador
// Logica: el modal solamente le envia la confirmacion al elemento padre (revisar logica para que envie el estado del nuevo profesor al main RegistrarProfesor

const AlertActivation = ({setShowAlert, isActivated,setIsActivated}) => {
    

    return (
        <ModalBackdrop onClick={() => setShowAlert(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
                
                <CloseButton onClick={() => setShowAlert(false)}>
                    <IoClose size={24} />
                </CloseButton>
                <h3>¿Estás seguro de que deseas desactivar este docente?</h3>

                <ModalButtons>

                    <Confirm onClick={() => 
                        {setIsActivated(false);
                        setShowAlert(false);
                        }}
                    >Sí, desactivar</Confirm>

                    <Cancel onClick={() =>
                         {setShowAlert(false); setIsActivated(!isActivated);
                         }} >Cancelar</Cancel>

                </ModalButtons>
            </Modal>
        </ModalBackdrop>)
}

export default  AlertActivation

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
    width: 300px;
    `
const ModalButtons = styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-around;
    `
const Confirm = styled.button`
    background-color: #d9534f;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover{
        background-color: #d7726e;
    }
    `
const Cancel = styled.button`
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
  
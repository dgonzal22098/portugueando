import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {useAuth} from "../../auth"
import Backdrop from '@mui/material/Backdrop';

const LogoutComp = ({setShowModal}) => {

    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        navigate("/");
        setShowModal(false);
    }
    const handleBackdropClick = () => {
        setShowModal(false);
    };

    const handleModalClick = (e) => {
        e.stopPropagation(); // Evita que el click dentro del modal cierre el backdrop
    };

    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: 'blur(3px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
            open={true}
            onClick={handleBackdropClick}
        >
            <Modal onClick={handleModalClick}>
                
                <CloseButton onClick={() => setShowModal(false)}>
                    <IoClose size={24} />
                </CloseButton>
                <h3 style={{color:"black"}}>¿Estás seguro de que deseas cerrar sesión?</h3>

                <ModalButtons>

                    <Confirm onClick={handleLogout}>Sí, cerrar sesión</Confirm>

                    <Cancel onClick={() => setShowModal(false)} >Cancelar</Cancel>

                </ModalButtons>
            </Modal>
        </Backdrop>)
}

export default  LogoutComp

const Modal = styled.div` 
    background: white;
    position: relative;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    width: 300px;
    z-index: 2000;
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
  
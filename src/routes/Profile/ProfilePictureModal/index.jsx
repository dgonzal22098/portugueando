import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import PhotoUser from "../../../assets/pictures/userNone.png"

// Modal de la foto de perfil
// Rol: Todos
// Logica: Permite ver y cambiar la foto de perfil, desde aca se debe enviar la nueva foto de perfil a la base de datos y se define la nueva foto de perfil.
// Pendiente: Hacer un pop up cuando se suba y se cambie correctamente la foto de perfil.

const ProfilePictureModal = ({setShowPictureModal}) => {

    {/*
        faltaria la logica para enviar la nueva imagen de perfil a la base de datos
    */}

    return (
        <Overlay onClick={() => setShowPictureModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setShowPictureModal(false)}>
                    <IoClose size={24} />
                </CloseButton>
                <Title>Foto de perfil</Title>
                <ItemsContainer>
                    <img src={PhotoUser} alt="foto de perfil" />
                    <StyledButton>
                        <label htmlFor="uploadInput">
                            Cambiar foto
                        </label>
                        <input
                            id="uploadInput"
                            type="file"
                            accept="image/*"
                            style={{display: "none"}}
                            onClick={() => setShowPictureModal(false)}
                            onChange=""
                        />
                    </StyledButton>
                </ItemsContainer>
            </Modal>


        </Overlay>
    )
}

export default ProfilePictureModal

const StyledButton = styled.button`
    width: 100%;
    border-radius: 8px;
    background-color: #3BAC52;
    color: white;
    font-weight: 500;
    border: none;
    height: 45px;
    font-size: 1rem;
    transition: .1s ease-in-out;
    padding: 1rem 0;
    
    &:hover, &input:hover, &label:hover {
        cursor: pointer;
        background-color: #44bd5c;
    }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100dvh;
    gap: 10px;
    overflow-y: auto;
    img{
        width: 70%;
        &:hover {
            cursor: default;
        }
    }
    &::-webkit-scrollbar {
        display: none;   
    }
`
const Modal = styled.div`
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 700px;
    max-height: 95dvh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    &:hover{
        cursor: default;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`;
const Title = styled.h2`
    text-align: center;
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
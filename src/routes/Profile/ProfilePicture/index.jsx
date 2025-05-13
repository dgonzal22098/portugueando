import {styled} from "styled-components";
import PhotoUser from "../../../assets/pictures/userNone.png";
import ProfilePictureModal  from "../ProfilePictureModal";
import {useState} from "react";

// Componente de Imagen de perfil
// Rol: Todos
// Logica: Este modulo muestra la foto de perfil dentro del main Profile y abre el modal de la foto de perfil donde se cambia la foto de perfil, tambien permite subir la foto directamente y enviarla al back para que se guarde y se cambie la foto de perfil.
// Pendiente: Hacer un pop up cuando se suba y se cambie correctamente la foto de perfil.

const ProfilePicture = () => {

    const [showProfileModal, setShowProfileModal] = useState(false);

    return <ImageContainer>

        <img src={PhotoUser} alt="Usuario" onClick={() => setShowProfileModal(true)} />

        <Overlay className="overlay">
            <label htmlFor="uploadInput">Subir imagen</label>
            <button onClick={() => setShowProfileModal(true)}>Ver imagen</button>
            <input
                type="file"
                id="uploadInput"
                accept="image/*"
                onChange=""
                hidden
            />
        </Overlay>

        {showProfileModal && <ProfilePictureModal setShowPictureModal={setShowProfileModal} />}

    </ImageContainer>
}

export default ProfilePicture

const ImageContainer = styled.div`
  width: 30%;
    background-color: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ccc;
  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
      z-index: 0;
  }
`;

const Overlay = styled.div`
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  label, button {
    margin: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    text-align: center;
  }

  label:hover, button:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

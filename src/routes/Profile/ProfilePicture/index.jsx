import {styled} from "styled-components";
import PhotoUser from "../../../assets/pictures/userNone.png";
import ProfilePictureModal  from "../ProfilePictureModal";
import {useState} from "react";
import {device} from "../../../Breakpoints/breakpoints"
import useMediaQuery from "../../../hooks/useMediaQuery.js";
import Button from "../../../componentes/Button";

// Componente de Imagen de perfil
// Rol: Todos
// Logica: Este modulo muestra la foto de perfil dentro del main Profile y abre el modal de la foto de perfil donde se cambia la foto de perfil, tambien permite subir la foto directamente y enviarla al back para que se guarde y se cambie la foto de perfil.
// Pendiente: Hacer un pop up cuando se suba y se cambie correctamente la foto de perfil.

const ProfilePicture = () => {

    const [showProfileModal, setShowProfileModal] = useState(false);
    const isTablet = useMediaQuery("(max-width: 768px)");


    return (

        <ImageContainer>

            <img
                src={PhotoUser}
                alt="Usuario"
                onClick={() => {
                    if (isTablet) setShowProfileModal(true);
                }}
            />

            {!isTablet ? (
                <Overlay className="overlay">
                    <label htmlFor="uploadInput">Subir imagen</label>
                    <button onClick={() => setShowProfileModal(true)}>Ver imagen</button>
                    <input type="file" id="uploadInput" accept="image/*" hidden />
                </Overlay>
            ) : (
                    <ButtonGroup>
                        <Button
                            type="button"
                            texto="Ver imagen"
                            onClick={() => setShowProfileModal(true)}
                        />
                        <StyledButton>
                            <label htmlFor="uploadInput">
                                Cambiar foto
                            </label>
                            <input
                                id="uploadInput"
                                type="file"
                                accept="image/*"
                                style={{display: "none"}}
                                onChange=""
                            />
                        </StyledButton>

                    </ButtonGroup>
                )
            }

            {showProfileModal && <ProfilePictureModal setShowPictureModal={setShowProfileModal} />}

        </ImageContainer>)
}

export default ProfilePicture


const ImageContainer = styled.div`
    width: 450px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #ccc;

    @media ${device.tablet} {
        display: flex;
        gap: 2rem;
        width: 100%;
        height: 20%;
        padding: 3rem;
        align-items: center;
        justify-content: space-between;
    }
  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: 0.3s ease;
      @media ${device.tablet} {
          width: 50%;
          height: 200%;
      }
      @media ${device.mobile} {
          width: 30%;
      }
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

const ButtonGroup = styled.div`
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    width: 60%;
    flex-direction: column;
    padding: 2rem;
    
    @media ${device.mobile} {
        padding: 0;
    }
`;


const StyledButton = styled.button`
    width: 100%;
    border-radius: 8px;
    border: 1px grey solid;
    color: black;
    font-weight: 500;
    height: 45px;
    font-size: 1rem;
    transition: .1s ease-in-out;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

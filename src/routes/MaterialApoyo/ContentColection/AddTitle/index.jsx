import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { TextField } from "@mui/material";
import { useState } from "react";
import {device} from "../../../../Breakpoints/breakpoints.js";

// Modulo de agregar un nuevo titulo o item a cierta coleccion
// Rol: Profesor
// Logica: En este modulo se debe enviar la informacion de la nueva coleccion a la base de datos.
// Pendiente: Ajustar la logica para que permita asignar el item de la coleccion a la retroalimentacion de un estudiante en particular asi como editar la coleccion (cambiar url, tipo de item y nombre)


const NuevoItem = ({ setShowAddItem }) => {

    const [titulo, setTitulo] = useState('');
    const [nivel, setNivel] = useState('');
    const [tipoColeccion, setTipoColeccion] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);


    const handleCompletar = () => {
      if (!titulo || !nivel || !tipoColeccion) return;
    
      // Aquí podrías hacer tu petición a backend o guardar localmente
    
      setShowSuccess(true); 
      setTimeout(() => setShowSuccess(false), 3000); 
    
      setTitulo('');
      setNivel('');
      setTipoColeccion('');
    };
    



    return (
      <Overlay onClick={() => setShowAddItem(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
            
            <CloseButton onClick={() => setShowAddItem(false)}>
            <IoClose size={24} />
            </CloseButton>
            
            <h2 style={{margin:"2rem",textAlign:"center"}}>Agregar nuevo item</h2>
    
            <TextField 
            label="Título de la item"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}/>
            
            
            <Select 
            className="classicSelectStyle" 
            defaultValue=""
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}>
              <option value="" disabled>Nivel</option>
              {Niveles.map((numero, index) => (
                  <option key={index} value={numero}>{numero}</option>
                ))}
            </Select>

            <Select 
              className="classicSelectStyle" 
              value={tipoColeccion} 
              onChange={(e) => setTipoColeccion(e.target.value)}
            >
              <option value="" disabled>Tipo de colección</option>
              {TiposDeColeccion.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </Select>
            
            {tipoColeccion === 'Link' && (
              <TextField label="URL del recurso" fullWidth />
            )}

            {(tipoColeccion === 'PDF' || tipoColeccion === 'Word' || tipoColeccion === 'Video') && (
              <div style={{marginLeft:"1.5rem"}}>
                <label>Subir archivo ({tipoColeccion})</label>
                <input type="file" accept={tipoColeccion === 'Video' ? 'video/*' : tipoColeccion === 'PDF' ? 'application/pdf' : '.doc,.docx'} />
              </div>
            )}

            <ButtonGroup>
              <Button onClick={handleCompletar}>Completar</Button>
              <Button className="cerrar" onClick={() => setShowAddItem(false)}>Cerrar</Button>
            </ButtonGroup>
        </Modal>

        {showSuccess && (
          <SuccessPopup>¡Colección creada exitosamente!</SuccessPopup>
        )}


      </Overlay>
    );
};

export default NuevoItem;

const Niveles = [
  1,2,3,4,5,6
];  
const TiposDeColeccion = ['Video', 'Link', 'PDF', 'Word'];
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
    
  @media ${device.mobile} {
      margin: 0 1rem;
  }  
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 2rem 0 1rem 0;
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
const Select = styled.select`
  width: 100%;
  padding: 1em 3em 1em 1em;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  font: inherit;
  background-color: white;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 1em center;
  background-size: 1rem;
  transition: 0.2s ease-in-out;

  background-image:
    linear-gradient(45deg, transparent 50%, #3BAC52 50%),
    linear-gradient(135deg, #3BAC52 50%, transparent 50%),
    linear-gradient(to right, white, white);

  &:focus {
    border-color: #3BAC52;
    outline: none;
    background-image:
      linear-gradient(45deg, white 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, white 50%),
      linear-gradient(to right, white, white);
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
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(10px); }
  }
`;




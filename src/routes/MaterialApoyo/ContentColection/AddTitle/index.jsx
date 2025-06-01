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

    const [showSuccess, setShowSuccess] = useState(false);

    const [newItem, setNewItem] = useState({
        titulo: "",
        nivel: "",
        tipoColeccion: "",
        link: "",
        archivo: null,
    })

    const handleConfirmar = () => {
        const { titulo, nivel, tipoColeccion, link, archivo } = newItem;

        if (!titulo || !nivel || !tipoColeccion) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        if ((tipoColeccion === 'Link' || tipoColeccion === 'Video') && !link) {
            alert('Você deve fornecer um link válido para o recurso.');
            return;
        }

        if ((tipoColeccion === 'PDF' || tipoColeccion === 'Word') && !archivo) {
            alert(`Você deve fazer upload de um arquivo do tipo ${tipoColeccion}.`);
            return;
        }

        setShowSuccess(true);
    };




    return (
      <Overlay onClick={() => setShowAddItem(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
            
            <CloseButton onClick={() => setShowAddItem(false)}>
            <IoClose size={24} />
            </CloseButton>
            
            <h2 style={{margin:"2rem",textAlign:"center"}}>Adicionar novo item</h2>
    
            <TextField

                label="Título do item"
                value={newItem.titulo}
                onChange={(e) => setNewItem({...newItem, titulo: e.target.value})}/>
            
            
            <Select 
                className="classicSelectStyle"
                defaultValue=""
                value={newItem.nivel}
                onChange={(e) => setNewItem({...newItem, nivel: e.target.value})}>
                  <option value="" disabled>Nível</option>
                  {Niveles.map((numero, index) => (
                      <option key={index} value={numero}>{numero}</option>
                    ))}
            </Select>

            <Select 
              className="classicSelectStyle" 
              value={newItem.tipoColeccion}
              onChange={
                (e) => {
                    const tipo = e.target.value;
                    setNewItem({
                        ...newItem,
                        tipoColeccion: tipo,
                        link: "",
                        archivo: null,
                    });
                }}
            >
              <option value="" disabled>Tipo de coleção</option>
              {TiposDeColeccion.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </Select>
            
            {(newItem.tipoColeccion === 'Link' || newItem.tipoColeccion === 'Vídeo') && (
              <TextField

                  label="URL do recurso"
                  fullWidth
                  value={newItem.link}
                  onChange={(e) => setNewItem({...newItem, link: e.target.value})}
              />
            )}

            {['PDF', 'Word'].includes(newItem.tipoColeccion) && (
                <div style={{ marginLeft: "1.5rem" }}>
                    <label>Carregar arquivo ({newItem.tipoColeccion})</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                        <label
                            htmlFor="file-upload"
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                padding: "0.1rem 1rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Selecionar arquivo
                        </label>
                        <span style={{fontSize:"1rem"}}>{newItem.archivo?.name || "Nenhum arquivo selecionado"}</span>
                    </div>
                    <input
                        id="file-upload"
                        type="file"
                        accept={newItem.tipoColeccion === 'PDF' ? 'application/pdf' : '.doc,.docx'}
                        style={{ display: "none" }}
                        onChange={(e) =>
                            setNewItem({ ...newItem, archivo: e.target.files[0] })
                        }
                    />
                </div>
            )}


            <ButtonGroup>
              <Button onClick={handleConfirmar}>Completo</Button>
              <Button className="cerrar" onClick={() => setShowAddItem(false)}>Fechar</Button>
            </ButtonGroup>
        </Modal>

        {showSuccess && (
          <SuccessPopup>Coleção criada com sucesso!</SuccessPopup>
        )}


      </Overlay>
    );
};

export default NuevoItem;

const Niveles = [
  1,2,3,4,5,6
];  
const TiposDeColeccion = ['Vídeo', 'Link', 'PDF', 'Word'];
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




import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { TextField } from "@mui/material";
import { useState } from "react";
import {device} from "../../../../Breakpoints/breakpoints"

// Modal de crear una coleccion nueva
// Rol: Profesor
// Logica: En este modulo se debe enviar la informacion de la nueva coleccion a la base de datos.
// Pendiente: Ajustar la logica para que permita asignar el item de la coleccion a la retroalimentacion de un estudiante en particular asi como editar la coleccion (cambiar url, tipo de item y nombre)
// Pendiente: Agregar la logica para que permita mostrar un preview de lo que va a enviarse a la abse de datos y el mensaje de pop up que confirme la creacion exitosa.
// Bug: al dar click al boton subir se cierra el modal. no deberia

const CrearColeccionModal = ({ setShowCrearColeccion }) => {
    const [nombre, setNombre] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const handleAgregarCategoria = () => {
        if (
            categoriaSeleccionada &&
            !categoriasSeleccionadas.includes(categoriaSeleccionada)
        ) {
            setCategoriasSeleccionadas([...categoriasSeleccionadas, categoriaSeleccionada]);
            setCategoriaSeleccionada("");
        }
    };
    const handleEliminarCategoria = (categoria) => {
        setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
    };


    return (
        <Overlay onClick={() => setShowCrearColeccion(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setShowCrearColeccion(false)}>
                    <IoClose size={24} />
                </CloseButton>

                <h2 style={{ margin: "2rem", textAlign: "center" }}>Crear nueva colección</h2>

                <div className="optionsContainer">
                    <TextField
                        label="Nombre de la colección"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        fullWidth
                    />

                    <div className="uploadImage">
                        <p>Imagen de la colección (opcional)</p>
                        <StyledButton>
                            <label htmlFor="uploadInput">
                                Subir
                            </label>
                            <input
                                id="uploadInput"
                                type="file"
                                accept="image/*"
                                style={{display: "none"}}
                                onClick={() => setShowCrearColeccion(false)}
                                onChange=""
                            />
                        </StyledButton>
                    </div>

                    <div className="categoryContainer">

                        <Select
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categorias.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </Select>
                        <Button onClick={handleAgregarCategoria} className="agregarCat">Agregar</Button>

                    </div>

                    <ChipsContainer>
                        {categoriasSeleccionadas.map((cat, index) => (
                            <Chip key={index}>
                                {cat}
                                <DeleteButton onClick={() => handleEliminarCategoria(cat)}>×</DeleteButton>
                            </Chip>
                        ))}
                    </ChipsContainer>
                </div>


                <ButtonGroup>
                    <Button onClick={() => setShowCrearColeccion(false)}>Confirmar</Button>
                    <Button className="cerrar" onClick={() => setShowCrearColeccion(false)}>Cancelar</Button>
                </ButtonGroup>

            </Modal>
        </Overlay>
    );
};

export default CrearColeccionModal;

const categorias = [
    "Gramática",
    "Vocabulario",
    "Pronunciación",
    "Expresiones idiomáticas",
    "Verbos irregulares",
    "Comprensión oral",
    "Comprensión escrita",
    "Producción escrita",
    "Producción oral",
    "Fonética",
    "Conversación básica",
    "Escucha activa",
    "Lectura de textos",
    "Escritura académica",
    "Presentaciones orales",
    "Portugués para viajeros",
    "Portugués para negocios",
    "Portugués académico",
    "Portugués cotidiano",
    "Portugués para el trabajo",
    "Cultura brasileña",
    "Cultura portuguesa",
    "Música en portugués",
    "Películas y series en portugués",
    "Historia de los países lusófonos",
    "Nivel A1 - Principiante",
    "Nivel A2 - Básico",
    "Nivel B1 - Intermedio",
    "Nivel B2 - Intermedio alto",
    "Nivel C1 - Avanzado",
    "Nivel C2 - Dominio",
];

const Select = styled.select`
    width: 67%;
    padding: 1em 3em 1em 1em;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    font-size: 1rem;
    background-color: white;
    color: #333;
    appearance: none;
    transition: 0.2s ease-in-out;
    
    &::-webkit-scrollbar {
        display: none;
    }

    background-image:
            linear-gradient(45deg, transparent 50%, #3BAC52 50%),
            linear-gradient(135deg, #3BAC52 50%, transparent 50%),
            linear-gradient(to right, white, white);
    background-position:
            calc(100% - 20px) center,
            calc(100% - 15px) center,
            100% 0;
    background-size:
            5px 5px,
            5px 5px,
            2.5em 2.5em;
    background-repeat: no-repeat;

    &:focus {
        outline: none;
        border-color: #3BAC52;
        background-image:
                linear-gradient(45deg, white 50%, transparent 50%),
                linear-gradient(135deg, transparent 50%, white 50%),
                linear-gradient(to right, white, white);
    }
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Chip = styled.div`
  background-color: #e0f5ec;
  color: #3BAC52;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #3BAC52;
  font-weight: bold;
  cursor: pointer;
`;

const StyledButton = styled.button`
    width: 30%;
    border-radius: 8px;
    background-color: #3BAC52;
    color: white;
    font-weight: 500;
    border: none;
    height: 45px;
    font-size: 1rem;
    transition: .1s ease-in-out;
    padding: 1.3rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover, &input:hover, &label:hover {
        cursor: pointer;
        background-color: #44bd5c;
    }
`;

// Estilos reutilizados
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
  max-height: 90dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
    @media ${device.tablet}{
        width: 500px;
    }
    @media ${device.mobile}{
        margin: 0 1rem;
    }
    .optionsContainer{
        padding-top: 1rem;
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    .uploadImage, .categoryContainer{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    &::-webkit-scrollbar {
        display: none;
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
    
    &.agregarCat{
        width: 30%;
        padding: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

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
`;

const OpcionesPost = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;



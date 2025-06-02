import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import {device} from "../../../Breakpoints/breakpoints.js";

// Modal de crear un nuevo grupo en un curso
// Rol: Administrador
// Logica: Desde aca se debe enviar la informacion del nuevo grupo a la base de datos para que se actualice y se muestre de forma exitosa. Se deben traer los datos de los docentes registrados para que se pueda seleccionar en el nuevo grupo y si no hay un docente registrado redirige al admin a la pagina de registro de docente.
// Pendiente: Faltaria realizar la logica de crear un nuevo grupo en este componente y el pop up de cuando se haya creado de forma exitosa. Revisar la logica de cuando no hay docentes registrados para que lo redirija a la pagina de registro.

const CrearGrupoModal = ({ setShowCrearGrupoModal, cursoId }) => {
    const [groupInfo, setGroupInfo] = useState({ horario: "" });
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const horariosDisponibles = {
        "Mañana": ["7:00 - 9:00", "9:00 - 11:00", "11:00 - 13:00"],
        "Tarde": ["12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"],
        "Noche": ["18:00 - 20:00", "20:00 - 22:00"]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupInfo(prev => ({ ...prev, [name]: value, ...(name === "jornada" && { horario: "" }) }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleContinuar = () => {
        let newErrors = {};
        if (!groupInfo.jornada) {
            newErrors.jornada = "Debes seleccionar una jornada";
        }
        if (!groupInfo.horario) {
            newErrors.horario = "Debes seleccionar un horario";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          setShowConfirmation(true);
        }
    };

    const handleConfirmar = async () => {
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const fechaActual = new Date().toISOString().split('T')[0];
            const response = await fetch("http://localhost:8000/main/grupos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    curso_id: cursoId,
                    horario: groupInfo.horario,
                    jornada: groupInfo.jornada,
                    fecha_creacion: fechaActual
                }),
            });

            if (!response.ok) throw new Error("Error al crear el grupo");
                setSuccess(true);
                setTimeout(() => {
                    setShowCrearGrupoModal(false);
                }, 1200);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };
  
    return (
        <Overlay onClick={() => !loading && setShowCrearGrupoModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => !loading && setShowCrearGrupoModal(false)} disabled={loading}>
                    <IoClose size={24} />
                </CloseButton>
                <h2 style={{margin:"2rem 2rem 0 0"}}>Nuevo grupo</h2>
                {/* el numero del grupo se debe calcular al contar los grupos que ya hayan sido creados con anterioridad y de ese modo se podra seleccionar el disponible */}
                {showConfirmation ?
                    <Confirmation>
                        <Title>Detalles del nuevo grupo</Title>
                        <p><span>Jornada: </span>{groupInfo.jornada}</p>
                        <p><span>Horario: </span>{groupInfo.horario}</p>
                    </Confirmation>
                :
                    <FormContainer>
                        {/* los profesores se traen de la base de datos, alli se agregaron y registraron los docentes participantes en el semestre academico */}
                        {/* los horarios se traen de la base de datos que estan establecidas por defecto o los que el administrador desee agregar */}
                        <Label>Jornada:</Label>
                        <Select required name="jornada" value={groupInfo.jornada} onChange={handleChange} hasError={!!errors.jornada}>
                            <option value="">Seleccione la jornada:</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noche">Noche</option>
                        </Select>
                        {errors.jornada && <ErrorMsg>{errors.jornada}</ErrorMsg>}
                        {groupInfo.jornada && ( <>
                        <Label>Horario:</Label>
                        <Select required name="horario" value={groupInfo.horario} onChange={handleChange} hasError={!!errors.horario}>
                            <option value="">Seleccione el horario</option>
                            {horariosDisponibles[groupInfo.jornada].map((horario, index) => (
                                <option key={index} value={horario}>
                                    {horario}
                                </option>
                            ))}
                        </Select>
                        {errors.horario && <ErrorMsg>{errors.horario}</ErrorMsg>} </>
                        )}
                    </FormContainer>
                }
                  {error && <ErrorMsg>{error}</ErrorMsg>}
                  {success && <SuccessMsg>¡Grupo creado exitosamente!</SuccessMsg>}

                <ButtonGroup>
                    {showConfirmation ? (
                        <Button onClick={handleConfirmar} disabled={loading}>{loading ? "Creando..." : "Confirmar"}</Button>
                    ) : (
                        <Button onClick={handleContinuar}>Continuar</Button>
                    )}
                    <Button className="cancel" onClick={() => !loading && setShowCrearGrupoModal(false)} disabled={loading}>Cancelar</Button>
                </ButtonGroup>
            </Modal>
        </Overlay>
      );
    };

export default CrearGrupoModal;

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
  position: relative;
  background: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  width: 700px;
  max-height: 80dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media ${device.mobile} {
      margin: 0 1rem;
  }  
  &::-webkit-scrollbar {
      display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
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

  &.cancel {
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
    color: #3BAC52;
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
  
  &:disabled {
    background-color: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
`

const Confirmation = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr;
    gap: 1rem;
    span{
        font-weight: bold;
    }
`

const Title = styled.h2`
  background-color: #3BAC52;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

// Agrega estos styled-components al final de tu archivo CrearGrupoModal.jsx

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const ErrorMsg = styled.div`
  color: #ff4d4f;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const SuccessMsg = styled.div`
  color: #3BAC52;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

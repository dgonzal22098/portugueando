import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import {device} from "../../../../Breakpoints/breakpoints.js";
import { useState } from "react";

// Modal de confirmacion de nuevo docente
// Rol: Administrador
// Logica: enviar la informacion del profesor nuevo que se ha agregado de forma manual a la base de datos.

const ModalNewProfesor = ({setShowProfesorModal, profesorInfo, setMostrarFormulario}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email) => {
        return email.toLowerCase().endsWith('@universidadean.edu.co');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        // Validar el correo electrónico
        if (!validateEmail(profesorInfo.email)) {
            setError('Solo se permiten correos con dominio @universidadean.edu.co');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/main/registro_profesor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: profesorInfo.name,
                    email: profesorInfo.email.toLowerCase(), // Asegurar que el correo esté en minúsculas
                    password: "DefaultPass123!", // Contraseña temporal
                    rol: "Profesor",
                    estado: profesorInfo.estado
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear el profesor');
            }

            setSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ModalBackdrop onClick={() => setShowProfesorModal(false)} >
            <Modal 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            >
                
                <CloseButton onClick={() => setShowProfesorModal(false)}>
                    <IoClose size={24} />
                </CloseButton>

                <h2 style={{marginBottom:"1rem"}}>Confirmación nuevo profesor</h2>
                <ul style={{ textAlign: "left", margin:"3rem" }}>
                    <li><strong>Nombre:</strong> {profesorInfo.name}</li>
                    <li><strong>Correo:</strong> {profesorInfo.email}</li>
                    <li><strong>Estado:</strong> {profesorInfo.estado}</li>
                </ul>

                {error && (
                    <ErrorMessage>{error}</ErrorMessage>
                )}

                {success && (
                    <SuccessMessage>¡Profesor creado exitosamente!</SuccessMessage>
                )}

                <ModalButtons>
                    <Confirm
                    onClick={handleSubmit}
                    disabled={isLoading || success}>
                        {isLoading ? 'Creando...' : 'Confirmar registro'}
                    </Confirm>
                    <Cancel onClick={() => setShowProfesorModal(false)} disabled={isLoading}>
                        Cancelar
                    </Cancel>
                </ModalButtons>
            </Modal>
        </ModalBackdrop>
    );
};

export default ModalNewProfesor;

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
    width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    
    @media ${device.mobile} {
        margin: 0 1rem;
        padding: 1rem;
    }

    .myFile{
        font-family: inherit;
        font-size:1rem;
    }
    `
const ModalButtons = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    `
const Confirm = styled.button`
    background-color: #3BAC52;
    color: white;
    border: none;
    border-radius: 8px;
    width: 40%;
    font-size: 1rem;
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
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
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
const ErrorMessage = styled.div`
    color: red;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 1px solid red;
    border-radius: 4px;
    background-color: #ffebeb;
`;
const SuccessMessage = styled.div`
    color: #2e7d32;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 1px solid #2e7d32;
    border-radius: 4px;
    background-color: #e8f5e9;
`;

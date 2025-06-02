import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import {device} from "../../../../Breakpoints/breakpoints.js";
import { useNavigate } from 'react-router-dom';


// Modal de confirmacion de nuevo docente
// Rol: Administrador
// Logica: enviar la informacion del profesor nuevo que se ha agregado de forma manual a la base de datos.

const ModalNewProfesor = ({setShowProfesorModal, profesorInfo, setMostrarFormulario}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleConfirm = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
        const response = await fetch("http://localhost:8000/main/registro_profesor/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                namepro: profesorInfo.name,
                emailpro: profesorInfo.email,
                estado: 1,
                rol: "Profesor"
            }),
        });

        // Intenta leer la respuesta como texto primero
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        if (!response.ok) {
            // Si el backend devuelve error, muestra el mensaje
            throw new Error(data?.detail || "Error al registrar docente");
        }

        setSuccess(true);
        if (resetForm) {
            resetForm();
        }
        setTimeout(() => {
            setShowProfesorModal(false);
            navigate('/main/registro_profesor');

        }, 2000);
    } catch (err) {
        setError(err.message || "Error desconocido");
    } finally {
        setLoading(false);
    }
};


    return (
        <ModalBackdrop onClick={() => !loading && setShowProfesorModal(false)}>
            <Modal onClick={e => e.stopPropagation()}>
                <CloseButton
                    onClick={() => !loading && setShowProfesorModal(false)}
                    disabled={loading}
                >
                    <IoClose size={24} />
                </CloseButton>

                <h2 style={{ marginBottom: "1rem" }}>Confirmación nuevo profesor</h2>
                <ul style={{ textAlign: "left", margin: "3rem" }}>
                    <li><strong>Nombre:</strong> {profesorInfo.name || profesorInfo.fullName}</li>
                    <li><strong>Correo:</strong> {profesorInfo.email}</li>
                </ul>

                {error && <ErrorMsg>{error}</ErrorMsg>}
                {success && <SuccessMsg>¡Profesor registrado exitosamente!</SuccessMsg>}

                <ModalButtons>
                    <Confirm onClick={handleConfirm} disabled={loading || success}>
                        {loading ? "Registrando..." : "Confirmar registro"}
                    </Confirm>
                    <Cancel onClick={() => !loading && setShowProfesorModal(false)} disabled={loading}>
                        Cancelar
                    </Cancel>
                </ModalButtons>
            </Modal>
        </ModalBackdrop>
    );
};


    const handleSubmit = (e) => {
        e.preventDefault();
    }

const ErrorMsg = styled.div`
    color: #ff0000;
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: #ffe6e6;
    border-radius: 4px;
`;

const SuccessMsg = styled.div`
    color: #3BAC52;
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: #e6ffe6;
    border-radius: 4px;
`;

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

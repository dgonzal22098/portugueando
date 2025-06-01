import styled from "styled-components";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {Card, Formulario, Inputs, Button} from '../../componentes'
import axios from 'axios';

//Modulo de nueva contraseña
// Rol: Todos
// Logica: Hace un envio del link de la nueva contraseña al correo registrado y desde alla se abre un link nuevo donde se puede recuperar contraseña, es una de las opciones a considerar.


const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            await axios.post('http://localhost:8000/reset-password/', {
                token: token,
                new_password: password
            });

            setSuccess(true);
            setError("");

            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.detail || "Error al restablecer la contraseña");
        }
    }

    return (
        <Background>
            <Card title="Restablecer contraseña">
                {!success ? (
                    <Formulario onSubmit={handleSubmit}>
                        <Inputs
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Inputs
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <Button type="submit" texto="Restablecer contraseña"/>
                    </Formulario>
                ) : (
                    <Message>
                        Contraseña restablecida correctamente. Serás redirigido al inicio de sesión.
                    </Message>
                )}
            </Card>
        </Background>
    );
}

export default NewPassword


const Background = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: black;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 255) 20%, rgba(0, 0, 0, 1) 45%);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Recomendations = styled.ul`
    width: 100%;
    font-size: 0.7rem;
    font-style: italic;
    height: fit-content;
    list-style: none;
    margin-bottom: 20px;
`
const Message = styled.p`
    width: 100%;
    font-size: 1rem;
    font-weight: 300;
    color: black;
    text-align: center;
    margin-bottom: 5rem;
`
const Wrapper = styled.p`
    font-style: italic;
    font-size: 0.7rem;
    margin-top: 10px;
    text-align: center;
`

import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {Card, Formulario, Inputs, Button} from '../../componentes'


//Modulo de nueva contraseña
// Rol: Todos
// Logica: Hace un envio del link de la nueva contraseña al correo registrado y desde alla se abre un link nuevo donde se puede recuperar contraseña, es una de las opciones a considerar.


const NewPassword = () => {

    const [newPassword, setNewPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [passConfirmation, setPassConfirmation] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(
            () => {
                navigate("/"); 
            }, 3000
        ) 
    }

    return (
        <Background>
            <Card title="Nueva contraseña">
                {!submitted ? 
                (<Formulario onSubmit={handleSubmit}>
                    <Inputs 
                        type="password"
                        placeholder="Ingrese la nueva contraseña..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Inputs 
                        type="password"
                        placeholder="Confirme la nueva contraseña..."
                        value={passConfirmation}
                        onChange={(e) => setPassConfirmation(e.target.value)}
                    />
                    <Recomendations>
                        <li>La contraseña debe tener más de 9 dígitos</li>
                        <li>La contraseña debe contener al menos 1 número</li>
                        <li>La contraseña debe contener al menos 1 carácter especial (*$#)</li>
                        <li>La contraseña debe contener al menos 1 letra mayúscula y 1 minúscula</li>  
                    </Recomendations>
                    <Button type="submit" texto="Cambiar contraseña"/>
                    <Wrapper>Ya tienes una cuenta?{" "}
                        <Link 
                            to="/"
                            style={{cursor:"pointer"}}
                        >Ingresa aquí...
                        </Link>
                    </Wrapper>
                </Formulario>) : (
                    <Message>
                        Contraseña cambiada con éxito. Vuelve a ingresar !
                    </Message>
                )}
            </Card>
    </Background>        
    )
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
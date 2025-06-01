import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Formulario, Inputs, Button } from '../../componentes';
import axios from 'axios';

const Recover = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validar formato de correo electrónico
    if (!email.endsWith('@universidadean.edu.co')) {
      setError("Por favor ingrese un correo institucional válido");
      return;
    }

    try {
      // Usa:
        await axios.post('http://localhost:8000/recover/', {
          email: email
        });


      setSubmitted(true);
      setError("");

      // Redirigir después de 5 segundos
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
        console.error("Ocurrió un error:", error);
    }
  }

  return (
    <Background>
      <Card title="Recuperar contraseña">
        {!submitted ? (
          <Formulario onSubmit={handleSubmit}>
            <Inputs
              type="text"
              placeholder="Ingrese su correo institucional..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" texto="Recuperar contraseña"/>
            <Wrapper>Ya tienes una cuenta?{" "}
              <Link
                to="/"
                style={{cursor:"pointer"}}
              >Ingresa aquí...
              </Link>
            </Wrapper>
          </Formulario>
        ) : (
          <Message>
            Enlace de recuperación enviado al correo <strong>{email}</strong>
          </Message>
        )}
      </Card>
    </Background>
  );
}

export default Recover;

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
`;

const Wrapper = styled.p`
  font-style: italic;
  font-size: 0.7rem;
  margin-top: 10px;
  text-align: center;
`;

const Message = styled.p`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  color: black;
  text-align: center;
  margin-bottom: 5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 10px;
`;

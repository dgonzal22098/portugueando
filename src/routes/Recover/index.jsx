import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import {Card, Formulario, Inputs, Button} from '../../componentes'

// Modulo de recuperacion de contraseña
// Rol: Todos
// Logica: desde aca se recuperaria la contraseña solamente cuando el usuario recibe su confirmacion.
// Pendiente: Establecer la forma en la que el usuario va a recuperar su contraseña.

const Recover = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  
    setTimeout(() => {
      navigate("/");
    }, 5000);

  }

  return (
    <Background>
      <Card title="Recuperar contraseña">
        {!submitted ? 
          (<Formulario onSubmit={handleSubmit}>
            <Inputs 
              type="text" 
              placeholder="Ingrese su correo institucional..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" texto="Recuperar contraseña"/>
            <Wrapper>Ya tienes una cuenta?{" "}
              <Link 
                to="/"
                style={{cursor:"pointer"}}
              >Ingresa aquí...
              </Link>
            </Wrapper>
          </Formulario>) : (
            <Message>
              Enlace de recuperación enviado al correo <strong>{email}</strong>
            </Message>
          )}
      </Card>
    </Background>
  );
}

export default Recover


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
const Wrapper = styled.p`
  font-style: italic;
  font-size: 0.7rem;
  margin-top: 10px;
  text-align: center;
`
const Message = styled.p`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  color: black;
  text-align: center;
  margin-bottom: 5rem;
`
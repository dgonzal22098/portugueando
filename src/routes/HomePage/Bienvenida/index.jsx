import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {device} from "../../../Breakpoints/breakpoints"

// Componente de bienvenida
// Rol: Todos
// Logica: trae el nombre del usuario y hace un efecto de scroll infinito con suavizado.


const Bienvenida = ({ usuario }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 6000); // Cambia cada 6 segundos (3s visible + 3s transición)
        return () => clearInterval(interval);
    }, []);

    return (
        <BienvenidaCont>
            <Title>Bienvenido {usuario.name}!</Title>

            <ScrollingContainer>
                <AnimatePresence mode="wait">
                    <ScrollingText
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {messages[index]}
                    </ScrollingText>
                </AnimatePresence>
            </ScrollingContainer>
        </BienvenidaCont>
    );
};

export default Bienvenida;


const messages = [
    "Primeros pasos, haz click en cada botón para saber más!",
    "Explora, aprende y participa en la comunidad de eanistas!"
];

const BienvenidaCont = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 1rem 2rem;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 2rem;
    
    @media ${device.tablet} {
        font-size: 2rem;
    }
    @media ${device.mobile} {
        font-size: 1.5rem;
        margin: 1rem 2rem;
    }
    
`

const ScrollingContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media ${device.mobile} {
      width: 80%;
  }    
`;

const ScrollingText = styled(motion.p)`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  white-space: nowrap;
    
    @media ${device.tablet} {
        font-size: 1rem;
    }
    @media ${device.mobile} {
        font-size: 0.8rem;
    }

`;

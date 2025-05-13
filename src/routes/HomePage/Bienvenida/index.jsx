import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="bienvenida">
            <h1 style={{textAlign:"center"}}>Bienvenido {usuario.name}!</h1>

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
        </div>
    );
};

export default Bienvenida;


const messages = [
    "Primeros pasos, haz click en cada botón para saber más!",
    "Explora, aprende y participa en la comunidad de eanistas!"
];

const ScrollingContainer = styled.div`
  margin-top: 1rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ScrollingText = styled(motion.p)`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  white-space: nowrap;
`;

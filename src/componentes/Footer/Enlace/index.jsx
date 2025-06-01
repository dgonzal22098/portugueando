import styled from "styled-components";
import { Link } from "react-router-dom";

// Estilo del contenedor
const EnlaceComp = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
`;

// Estilo del componente Link de react-router-dom
const LinkDecorated = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #0c47a1;
    text-decoration: underline;
  }
`;


// Componente funcional
const Enlace = ({ destination, texto }) => {
  return (
      <EnlaceComp>
        <LinkDecorated to={destination} target="_blank">{texto}</LinkDecorated>
      </EnlaceComp>
  );
};

export default Enlace;

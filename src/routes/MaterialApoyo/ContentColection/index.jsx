import { useState } from "react";
import styled from "styled-components"
import NuevoItem from "./AddTitle";

// Modulo de coleccion seleccionada
// Rol: Estudiante, Profesor
// Logica: Muestra los items creados dentro de una coleccion, para el profesor estara habilitado la opcion de crear un nuevo item y editarlo, para estudiante solamente podra revisar y acceder al contenido. Este modulo debera enviar la informacion del nuevo item creado a la base de datos, solo cuando este habilitado el docente.
// Valor agregado: que al ingresar a cada titulo se pueda saber mas acerca del titulo o del link como tal con un boton de ver mas usando el parametro ({colectionName, onVerMas }) del componente

const ContentColection = ({selectedColection, setShowColection, setShowColectionContent, setSelectedColection, usuario}) => {


    const [showAddItem,setShowAddItem] = useState(false);

    const handleCancel = () => {
        setShowColection(true);
        setShowColectionContent(false);
        setSelectedColection(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
    <Container >

        <h1 style={{ marginBottom:"2rem" }}>{selectedColection.titulo}</h1>

        <Row className="encabezado">
            <h3>Recurso para fortalecer competencias</h3>
            <h3>Fecha de creación</h3>
        </Row>

        {selectedColection.contenidos.map((item, index) => (
            <Row key={index}>
                <Titulo><a >{item.titulo}</a></Titulo>
                <Fecha>{item.fecha}</Fecha>
                {/* <VerMasBtn onClick={() => onVerMas(item)}>Ver más</VerMasBtn> */}
            </Row>
        ))}

        {usuario.rol === 'Profesor' &&
        
          <ButtonCont>

              <Button onClick={() => setShowAddItem(true)}>Agregar item</Button>
              <Button 
              className="regresar" 
              onClick={handleCancel}>Volver</Button>

          </ButtonCont>
        }
        
        {showAddItem && <NuevoItem setShowAddItem={setShowAddItem}/>}


    </Container>)
  
}

export default ContentColection

const Container = styled.div`
    margin: 2rem 0;
    padding: 3rem 1rem;
    background-color: white;
    width: 90%;
    height: fit-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px #d9d9d9 solid;
    border-radius: 6px;
    `
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px #d9d9d9 solid;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  width: 90%;
  &.encabezado{
    margin-bottom: 2.5rem;
  }
`;
const Titulo = styled.div`
  width: 70%;
  font-weight: bold;
  transition: .2s ease-in-out;
  &:hover{
      text-decoration: underline;
      cursor: pointer;
      color: blue;
  }
`;
const Fecha = styled.div`
  width: 30%;
  text-align: right;
  color: #666;
`;
const VerMasBtn = styled.button`
  width: 20%;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3BAC52;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #4cc064;
    cursor: pointer;
  }
`;
const ButtonCont = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  gap: 10px;
`
const Button = styled.button`
  width: 50%;
  border-radius: 15px;
  background-color: #3BAC52;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 1rem;
  border: none;
  transition: .2s ease-in-out;
  &:hover{
    background-color: #53c76a;
    cursor: pointer;
  }
  &.regresar{
    color: black;
    background-color: white;
    border: 1px #d9d9d9 solid;
    &:hover{
        background-color: #cecccc;
    }
  }

`
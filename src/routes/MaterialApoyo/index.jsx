import styled from "styled-components"
import { TextField } from "@mui/material"
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
import SamplePictureLogo from '../../assets/logos/imagenIconSample.webp'
import SamplePicture from '../../assets/logos/sampleImg.png'
import ContentColection from './ContentColection';
import ColectionCard from "./ColectionCard";
import NuevaColeccion from "./NuevaColeccion/index.jsx";

// Modulo de las colecciones disponibles
// Rol: Profesor, Estudiante
// Logica: El modulo trae las colecciones creadas por el docente para cierto grupo, el cual esta disponible tambien para los estudiantes, la otra funcionalidad necesaria en este modulao es la de enviar la informacion de la coleccion nueva a la base de datos.
// Pendiente: Agregar el input de una imagen que el profesor quiera poner en la coleccion o si prefiere con la imagen por defecto.
// Pendiente: Implementar la logica de buscar dentro de los titulos ya sea con palabras claves o con el nombre de la coleccion.

const MaterialApoyo = () => {
    const {usuario} = useOutletContext();
    const [showColection, setShowColection] = useState(true);
    const [showColectionContent, setShowColectionContent] = useState(false);
    const [selectedColection, setSelectedColection] = useState(null);
    const [colectionName, setColectionName] = useState("");


    return (
    <Container>

        <h1 style={{fontSize: "3rem", marginBottom:"2rem"}}>Material de apoyo - colecciones</h1>

        <SearchContainer>
            <TextField id="outlined-basic" label="Buscar aqui..." variant="outlined" style={SearchBoxStyle} sx={{borderRadius:"5px"}}>
            </TextField>
            <CiSearch className="SearchIcon"/>
        </SearchContainer>

        {showColection && <ColectionContainer>

            {Titles.map((coleccion, index) => 
                <ColectionCard 
                key={index} 
                titulo={coleccion.titulo}
                picture={SamplePicture}
                etiquetas={coleccion.contenidos.flatMap(item => item.etiquetas)}
                onAcceder={() => {
                    setShowColection(false);
                    setShowColectionContent(true);
                    setColectionName(coleccion.titulo);
                    setSelectedColection(coleccion);
                }}
            />)}

            {usuario.rol === 'Profesor' && <NuevaColeccion />}


        </ColectionContainer>}

        {showColectionContent && <ContentColection 
        usuario={usuario}
        selectedColection={selectedColection}
        setShowColection={setShowColection}
        setShowColectionContent={setShowColectionContent}
        setSelectedColection={selectedColection}
        /> }

    </Container>
)}

export default MaterialApoyo

const Titles = [
    {
      titulo: "Coleccion 1",
      contenidos: [
        {
          titulo: "Título 1: Gramática Intermedia",
          fecha: "10/08/24",
          etiquetas: ["gramática", "estructura", "intermedio"],
        },
        {
          titulo: "Título 2: Guía de Verbos Irregulares",
          fecha: "22/08/24",
          etiquetas: ["verbos", "tiempos", "irregular"],
        },
      ],
    },
    {
      titulo: "Coleccion 2",
      contenidos: [
        {
          titulo: "Título 3: Práctica de Pronunciación",
          fecha: "05/09/24",
          etiquetas: ["oralidad", "pronunciación", "fonética"],
        },
        {
          titulo: "Título 4: Lecturas Cortas en Portugués",
          fecha: "19/09/24",
          etiquetas: ["lectura", "comprensión", "portugués"],
        },
      ],
    },

  ];
const SearchBoxStyle = {
    backgroundColor: "white",
    width: "90%",
}
const Container = styled.div`
    padding: 2.5rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100vh;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    `
const SearchContainer = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
    z-index: 800;
    .SearchIcon{
        font-size: 1.5rem;
        &:hover{
            cursor: pointer;
        }
    }
`
const ColectionContainer = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    padding: 2rem 0;
`
const ContainerNew = styled.div`

    width: 100%;
    height: 240px;
    display: flex;
    background-color: white;
    border-radius: 15px;
    border: 1px #d9d9d9 solid;
    padding: 1rem;
    align-items: center;
    justify-content: space-around;
`
const Imagen = styled.img`
    border-radius: 50%;
    width: 30%;
`
const Button = styled.button`
    margin: 1rem 0;
    padding: 1rem;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 15px;
    border: none;
    color: white;
    font-weight: bold;
    background-color: #3BAC52;
    transition: .2s ease-in-out;
    &:hover{
        background-color: #4cc064;
        cursor: pointer;
    }
    .addIcon{
        font-size: 1.3rem;
    }
`

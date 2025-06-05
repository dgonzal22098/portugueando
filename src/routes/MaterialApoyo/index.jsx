import styled from "styled-components"
import { TextField } from "@mui/material"
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SamplePicture from '../../assets/logos/sampleImg.png'
import ContentColection from './ContentColection';
import ColectionCard from "./ColectionCard";
import NuevaColeccion from "./NuevaColeccion/index.jsx";
import { materialApoyoService } from "../../services/materialApoyo";
import {device} from "../../Breakpoints/breakpoints"

// Modulo de las colecciones disponibles
// Rol: Profesor, Estudiante
// Logica: El modulo trae las colecciones creadas por el docente para cierto grupo, el cual esta disponible tambien para los estudiantes, la otra funcionalidad necesaria en este modulao es la de enviar la informacion de la coleccion nueva a la base de datos.
// Pendiente: Implementar la logica de buscar dentro de los titulos ya sea con palabras claves o con el nombre de la coleccion.

const MaterialApoyo = () => {
    const {usuario} = useOutletContext();
    const [showColection, setShowColection] = useState(true);
    const [showColectionContent, setShowColectionContent] = useState(false);
    const [selectedColection, setSelectedColection] = useState(null);
    const [searchWord, setSearchWord] = useState("");
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNuevaColeccion, setShowNuevaColeccion] = useState(false);

    useEffect(() => {
        console.log('Usuario actual:', usuario);
        cargarMateriales();
    }, [usuario]);

    const cargarMateriales = async () => {
        try {
            console.log('Iniciando carga de materiales para grupo:', usuario?.grupo_id);
            setLoading(true);
            const data = await materialApoyoService.obtenerMateriales(usuario?.grupo_id);
            console.log('Materiales recibidos:', data);
            setMateriales(data);
        } catch (error) {
            console.error('Error detallado al cargar materiales:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setError("Error al cargar los materiales");
        } finally {
            setLoading(false);
        }
    };

    const materialesFiltrados = materiales.filter(material => {
        console.log('Filtrando material:', {
            id: material.id,
            nombre: material.nombre,
            searchWord
        });
        return material.nombre?.toLowerCase().includes(searchWord.toLowerCase());
    });

    useEffect(() => {
        console.log('Materiales filtrados actualizados:', materialesFiltrados);
    }, [materialesFiltrados]);

    return (
        <Container>
            <HeaderContainer>
                <MainTitle>Material de apoyo - colecciones</MainTitle>
            </HeaderContainer>

            <SearchContainer>
                <TextField
                    id="outlined-basic"
                    label="Buscar aqui..."
                    variant="outlined"
                    style={SearchBoxStyle}
                    sx={{borderRadius:"5px"}}
                    value={searchWord}
                    onChange={(e) => {
                        console.log('Término de búsqueda actualizado:', e.target.value);
                        setSearchWord(e.target.value);
                    }}
                />
                <CiSearch className="SearchIcon" />
            </SearchContainer>

            {loading && <p>Cargando materiales...</p>}
            {error && <p>{error}</p>}

            {showColection && <ColectionContainer>
                {usuario?.rol === "Profesor" && <NuevaColeccion />}
                {materialesFiltrados.map((material) => {
                    const categoriasArray = material.categoria
                        ? material.categoria.split(',').map(cat => cat.trim())
                        : [];

                    return (
                        <ColectionCard
                            key={material.id}
                            titulo={material.nombre}
                            picture={material.imagen_url || SamplePicture}
                            categorias={categoriasArray}
                            onClick={() => {
                                console.log('Material seleccionado:', material);
                                setSelectedColection(material);
                                setShowColection(false);
                                setShowColectionContent(true);
                            }}
                        />
                    );
                })}
            </ColectionContainer>}

            {showColectionContent && selectedColection && (
                <ContentColection
                    colection={selectedColection}
                    setShowColection={setShowColection}
                    setShowColectionContent={setShowColectionContent}
                />
            )}

            {showNuevaColeccion && (
                <NuevaColeccion
                    setShowNuevaColeccion={setShowNuevaColeccion}
                    onColeccionCreada={() => {
                        cargarMateriales();
                    }}
                />
            )}
        </Container>
    );
}

export default MaterialApoyo

const SearchBoxStyle = {
    backgroundColor: "white",
    width: "90%",
}

const MainTitle = styled.h1`
    font-size: 3rem;
    margin-bottom: 2rem;
    @media ${device.tablet} {
        font-size: 1.3rem;
    }
`
const Container = styled.div`
    padding: 2.5rem;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100vh;
    overflow: auto;
    
    @media ${device.tablet} {
        padding: 1rem;
    }
    @media ${device.mobile} {
        width: 100%;
    }
    
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
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    padding: 2rem 0;
    @media ${device.tablet} {
        grid-template-columns: 1fr;
    }
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

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
`;

const AddButton = styled.button`
    background-color: #3BAC52;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2d8a3e;
    }
`;




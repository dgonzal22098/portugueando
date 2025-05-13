import styled from 'styled-components';
import SamplePictureLogo from "../../../assets/logos/imagenIconSample.webp";
import {IoMdAdd} from "react-icons/io";
import {useState} from "react";
import CrearColeccion from "./CrearColeccionModal";

// Plantilla de nueva coleccion
// Rol: Profesor
// Logica: Este modulo sirve para crear nuevas colecciones en cierto nivel, tantas como el profesor prefiera, esta plantilla unicamente abre un modal que sera el encargado de enviar la informacion nueva a la base de datos.

const NuevaColeccion = () => {
    const [showColectionConfirm, setShowColectionConfirm] = useState(false);


    return (
        <ContainerNew>
            <Imagen src={SamplePictureLogo}/>
            <div style={{width:"55%"}}>
                <h2 style={{marginBottom:"2.5rem"}}>Agregar nueva colección</h2>
                <Button onClick={() => setShowColectionConfirm(true)}>
                    Agregar
                    <IoMdAdd className="addIcon"/>
                </Button>
            </div>

            {showColectionConfirm && <CrearColeccion setShowCrearColeccion={setShowColectionConfirm}/>}

        </ContainerNew>
    )
}

export default NuevaColeccion

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

const Imagen = styled.img`
    border-radius: 50%;
    width: 30%;
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
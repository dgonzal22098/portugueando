import styled from "styled-components"
import SamplePicture from '../../../assets/logos/sampleImg.png'
import Chip from '@mui/material/Chip';
import { Stack } from "@mui/material";

// Plantilla de Colecciones
// Rol: Profesor , Estudiantes
// Logica: Esta plantilla utiliza los datos de las colecciones que el profesor ha creado en cierto nivel y le permite a la plantilla mostrarlos, no hay logica necesaria en este modulo ya que solo es plantilla.

const ColectionCard = ({titulo, etiquetas, onAcceder, picture}) => {
  
    return (
        <Container>
            <Imagen src={picture}/>
            <div style={{width:"55%"}}>
                <h2>{titulo}</h2>

                <Stack 
                direction="row" 
                spacing={1} 
                flexWrap="wrap"
                sx={{mb: 2}}>
                {etiquetas.map((etiqueta, index) => (
                    <Chip 
                    key={index} 
                    label={etiqueta} 
                    color="primary" 
                    variant="outlined" />
                ))}
                </Stack>

                <Button 
                onClick={onAcceder} >Acceder</Button>
            </div>
        </Container>
    )
}

export default ColectionCard

const Container = styled.div`
    width: 100%;
    height: fit-content;
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
`

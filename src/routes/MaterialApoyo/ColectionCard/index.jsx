import styled from "styled-components"
import Chip from '@mui/material/Chip';
import { Stack } from "@mui/material";
import {device} from "../../../Breakpoints/breakpoints"
import useMediaQuery from "../../../hooks/useMediaQuery.js"

// Plantilla de Colecciones
// Rol: Profesor , Estudiantes
// Logica: Esta plantilla utiliza los datos de las colecciones que el profesor ha creado en cierto nivel y le permite a la plantilla mostrarlos, no hay logica necesaria en este modulo ya que solo es plantilla.

const ColectionCard = ({titulo, categorias, onClick, picture}) => {
    const isMobile = useMediaQuery(device.mobile);

    console.log('ColectionCard props:', { titulo, categorias, onClick, picture });

    return (
        <Container>
            <Imagen src={picture}/>
            <div style={{width:"55%"}}>
                <h2>{titulo}</h2>

                {!isMobile ? (
                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{mb: 2}}>
                        {categorias && categorias.map((categoria, index) => (
                            <Chip
                                key={index}
                                label={categoria}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                ) : (
                    <></>
                )}

                <Button
                    onClick={onClick}
                    type="button"
                >
                    Acceder
                </Button>
            </div>
        </Container>
    )
}

export default ColectionCard;

const Container = styled.div`
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
    cursor: pointer;
    &:hover {
        background-color: #4cc064;
    }
`


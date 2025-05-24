import styled from "styled-components"
import {InputLabel, MenuItem, FormControl, Select, TextField, Box, useMediaQuery, useTheme} from '@mui/material';
import { useState } from "react";
import { MdDelete as DeleteIcon } from "react-icons/md";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ModalConfirmation from "./ModalConfirmation";
import {device} from "../../Breakpoints/breakpoints.js";

// Main de dashboard
// Rol: Estudiante
// Logica: Se debe traer el semestre actual del estudiante y mostrar los grupos que tiene asignados.

const Dashboard = () => {

    const initialFormState = {
        nivel: "",
        profesor: "",
        horario: "",
        redaccion: "",
        corte: ""
    };
    const [formState, setFormState] = useState(initialFormState);
    const [caracterSeleccionado, setCaracterSeleccionado] = useState("");
    const [valorNumero, setValorNumero] = useState(0);
    const [caracterizaciones, setCaracterizaciones] = useState([]);
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(device.mobile);


    const handleDelete = (indexToRemove) => {
        setCaracterizaciones((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };
    const handleDeleteAll = () => {
        setCaracterizaciones([]);
    };

    const handleAgregarCaracter = () => {
        if (!caracterSeleccionado || valorNumero <= 0) return;

        setCaracterizaciones(prev => [
            ...prev,
            { caracter: caracterSeleccionado, cantidad: valorNumero }
        ]);

        // Resetear campos
        setCaracterSeleccionado("");
        setValorNumero(0);
    };


    const handleChangeNumero = (event) => {
        const rawValue = event.target.value;

        // Permitir campo vacío (mientras escribe)
        if (rawValue === "") {
            setValorNumero("");
            return;
        }

        // Convertir a número eliminando ceros iniciales
        const numericValue = parseInt(rawValue, 10);

        // Validar que sea un número
        if (!isNaN(numericValue)) {
            setValorNumero(numericValue);
        }
    };

    const handleChangeCaracter = (event) => {
        setCaracterSeleccionado(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

  return (
      <>
        <Container>
            <h1 style={{fontSize: "3rem", marginBottom:"2rem"}}>Dashboard</h1>
            <h2>Caracterización escrita 2025-1</h2>

            <p>Rellena tus datos personales y el detalle del nivel en el que te encuentras e indica el número de errores en cada uno de los aspectos que se indican a continuación:
            </p>
            <Campos>
                {selectsConfig.map(({label,name, options}) => (
                    <FormControl
                        key={name}
                        fullWidth
                        sx={{
                            m: 1,
                            minWidth: 120 ,
                            maxWidth: isTablet ? "100%" : "45%",
                            bgcolor: "white",
                            zIndex:"0"
                    }}>

                            <InputLabel id={`${name}-label`}>{label}</InputLabel>
                            <Select
                                labelId={`${name}-label`}
                                id={name}
                                name={name}
                                value={formState[name]}
                                label={label}
                                onChange={handleChange}
                            >
                                {options.map((option,index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}

                            </Select>

                    </FormControl>
                ))}

            </Campos>

            <ContentCampos>
                <h3 className="mainTitle">Agregar registros</h3>

                <div className="contentNewRegistros">

                    {/* columna 1 - ingreso de datos */}

                    <div className="agregarCaracterizacion">
                        <FormControl
                            fullWidth
                            sx={{
                                minWidth: 100 ,
                                maxWidth: "80%",
                                bgcolor: "white"}}
                        >

                            <InputLabel
                                id="caracter-label"
                            >Agregar un nuevo caracter</InputLabel>
                            <Select
                                labelId="caracter-label"
                                id="caracter"
                                name="caracter"
                                value={caracterSeleccionado}
                                label="Agregar un nuevo caracter"
                                onChange={handleChangeCaracter}
                            >
                                {caracteresPortugues.map((name, index) => (
                                    <MenuItem
                                        key={index}
                                        value={name}
                                    >{name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box
                            sx={{
                                m: 1,
                                minWidth: 120,
                                maxWidth: "80%",
                                bgcolor: "white"
                        }}>
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={valorNumero}
                                onChange={handleChangeNumero}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: 0, // valor mínimo opcional
                                    max: 10000, // valor máximo opcional
                                }}
                            />
                        </Box>
                        <div
                            className="buttonCont"
                            style={{
                                width: "50%",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginTop: "1rem"
                            }}
                        >
                            <Button className="agregar" onClick={handleAgregarCaracter}>Agregar</Button>
                        </div>
                    </div>

                    {/* columna 2 - resultados */}

                    <div className="newContentContainer">
                       <TableContainer
                           component={Paper}
                           sx={{
                               padding: isMobile ? 0 : "1rem",
                               margin: isMobile ? 0 : "1rem",
                           }}
                       >
                           <Table sx={{
                               minWidth: isMobile ? 100 : 200,
                           }} size="small" aria-label="a dense table">
                               <TableHead>
                                   <TableRow>
                                       <TableCell sx={{fontWeight:"bold", fontSize:"1rem"}}>Caracter</TableCell>
                                       <TableCell align="right" sx={{fontWeight:"bold", fontSize:"1rem"}}>Cantidad</TableCell>
                                       <TableCell align="right"></TableCell>
                                   </TableRow>
                               </TableHead>
                               <TableBody>
                                   {caracterizaciones.map((row, index) => (
                                       <TableRow key={index}
                                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                           <TableCell component="th" scope="row">
                                               {row.caracter}
                                           </TableCell>
                                           <TableCell align="right">{row.cantidad}</TableCell>
                                           <TableCell align="right" sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                                               <TableCell>
                                                   <Tooltip title="Eliminar" arrow placement="right">
                                                        <StyledDeleteIcon onClick={() => handleDelete(index)}/>
                                                   </Tooltip>
                                               </TableCell>

                                           </TableCell>

                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </TableContainer>

                    </div>

                </div>

            </ContentCampos>

            <ButtonGroup>

                <Button className="submit" onClick={() => setShowModalConfirmation(true)}>Enviar</Button>

                <Button className=" submit cancel" onClick={() => {
                    setFormState(initialFormState);
                    handleDeleteAll();
                }}>Borrar todo</Button>

            </ButtonGroup>



            {showModalConfirmation &&
                <ModalConfirmation setShowModalConfirmation={setShowModalConfirmation}
                                   caracterizaciones={caracterizaciones}
                                    formState={formState}
                />}
        </Container>
      </>
  )
}

export default Dashboard

const caracteresPortugues = [
    "RR", "SS", "X", "Ç", "Ó", "Ê", "Ã", "Â",
    "Á", "À", "É", "Í", "Ô", "Ú", "Ü", "Ñ"
];
const nivelesEjemplo = [
    1,3,4,5,6
]
const profesoresRegistrados = [
    "María Gómez",
    "Carlos Rodríguez",
    "Lucía Fernández",
    "Andrés Martínez",
    "Sofía Ramírez",
    "Pedro Torres"
];
const horariosPortugues = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00",
    "19:00 - 21:00"
];
const tiposRedaccion = [
    "Ensayo",
    "Carta formal",
    "Correo electrónico",
    "Resumen",
    "Narración",
    "Descripción"
];
const cortesNivel = [1, 2, 3, 4];
const selectsConfig = [
    { label: "Nivel", name: "nivel", options: nivelesEjemplo },
    { label: "Profesor", name: "profesor", options: profesoresRegistrados },
    { label: "Horario", name: "horario", options: horariosPortugues },
    { label: "Redacción", name: "redaccion", options: tiposRedaccion },
    { label: "Corte", name: "corte", options: cortesNivel }
];

const Container = styled.div`
    padding: 2.5rem;
    gap: 1rem;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    overflow: auto;
    
    @media ${device.mobile} {
        padding: 0;
    }
    
    .basicData{
        margin: 1rem;
        height: 30%;
        width: 25%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
    }
    
    .buttonCont{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 1rem ;
        .wrapper{
            width: 50%;
        }
        
    }
    
    p{
        width: 95%;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`
const Campos = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
`
const StyledDeleteIcon = styled(DeleteIcon)(() => ({
    fontSize: '1.5rem',
    color: 'black',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',

    '&:hover': {
        transform: 'scale(1.3)',
        color: 'red',
    },
}));
const ContentCampos = styled.div`
    width: 100%;
    display: flex;
    background-color: white;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 15px;
    border: 1px #CECDCD solid ;
    
    .mainTitle{
        margin-bottom: 2rem;
    }
    
    .contentNewRegistros{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        width: 100%;
        
        .agregarCaracterizacion{
            @media ${device.tablet}{
                align-items: center;
            }
        }
        
        @media ${device.tablet} {
            grid-template-columns: 1fr;
            place-content: start;
            
        }
        
        .newContentContainer{
            padding: 1rem 1rem 2rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            border-left: 1px #CECDCD solid ;
            
            @media ${device.tablet} {
                border-left: none;
                
            }
            
            .titleHeaderNewInformation{
                display: flex;
                justify-content: flex-start;
                width: 100%;
                
                .titleCont{
                    width: 50%;
                    text-align: start;
                    border: 1px #CECDCD solid ;
                    padding: 1rem  2rem ;
                    
                    &.left{
                        border-top-left-radius: 15px;
                        //border-bottom-left-radius: 15px;
                    }
                    &.right{
                        border-top-right-radius: 15px;
                        //border-bottom-right-radius: 15px;
                    }
                    
                }
                
                
            }
            
            .records{
                display: flex;
                justify-content: flex-start;
                width: 100%;
                border: 1px #CECDCD solid ;

                .newRecord{
                    width: 50%;
                    padding: 0.6rem 2rem ;
                    border-left: 1px #CECDCD solid ;
                }
                
                
            }
        }
        
    }
`
const ButtonGroup = styled.div`
    display: flex; 
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    width: 100%;
`;
const Button = styled.button`
    height: 45px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    background-color: #3BAC52;
    color: white;
    width: 42%;

    &:hover {
        background-color: #54c36a;
    }

    &.agregar{
        min-width: 150px;
        width: 200px;
    }
    &.cancel {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    
        &:hover {
        background-color: #eee;
        }
    }
`;

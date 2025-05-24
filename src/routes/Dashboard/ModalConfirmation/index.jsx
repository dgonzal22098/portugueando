import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {device} from "../../../Breakpoints/breakpoints"

// Modal de confirmacion del registro de caracterizaciones del estudiante
// Rol: Estudiante
// Logica: El estudiante envia los datos de registro a la base de datos a traves de este modulo, y en la base de datos se hace el modelo de analisis.
// Pendiente: El pop up de confirmacion o error.


const ModalConfirmation = ({setShowModalConfirmation, caracterizaciones, formState}) => {

    const formData = [
        {
            label: "Profesor",
            content: formState.profesor,
        },
        {
            label: "Horario",
            content: formState.horario,
        },
        {
            label: "Corte",
            content: formState.corte,
        },
        {
            label: "Nivel",
            content: formState.nivel,
        },
        {
            label: "Tipo de redacción",
            content: formState.redaccion,
        },
    ]

    return <Overlay onClick={() => setShowModalConfirmation(false)}>

        <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModalConfirmation(false)}>
                <IoClose size={24} />
            </CloseButton>
            <h2 style={{textAlign: "center"}}>Confirmar envío de registro</h2>

            <InfoContainer>
                <HeaderContainer>
                    {formData.map((data, index) => (

                        <p key={index}><span className="label">{data.label}</span> {data.content}</p>
                    ))}

                </HeaderContainer>


                <TableContainer className="data" component={Paper} sx={{ padding: '1rem'}}>
                    <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight:"bold", fontSize:"1rem"}}>Caracter</TableCell>
                                <TableCell align="right" sx={{fontWeight:"bold", fontSize:"1rem"}}>Cantidad</TableCell>
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

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>



            </InfoContainer>




            <ButtonGroup>

                <Button >Confirmar</Button>

                <Button className="cancel" onClick={() => setShowModalConfirmation(false)}>Volver</Button>

            </ButtonGroup>


        </Modal>
    </Overlay>
}


export default ModalConfirmation



const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const Modal = styled.div`
  position: relative;
  background: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  width: 800px;
  min-width: 200px;  
  max-height: 80dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
    
    
    @media ${device.tablet} {
        margin: 0 1rem;
    }
  &::-webkit-scrollbar {
      display: none;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff5f5f;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const Button = styled.button`
  flex: 1;
  height: 45px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-color: #3BAC52;
  color: white;

  &:hover {
    background-color: #54c36a;
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
const InfoContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    overflow-y: auto;
    @media ${device.tablet} {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        .data{
            height: 100px;
        }
    }
    &::-webkit-scrollbar {
        display: none;   
    }
`
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
    padding-left: 2rem;
    
    .label{
        font-weight: bold;
        margin-right: 1rem;
    }
`

import styled from "styled-components"
import {InputLabel, MenuItem, FormControl, Select, Box} from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useMediaQuery from "../../../hooks/useMediaQuery.js"
import {device} from "../../../Breakpoints/breakpoints.js";
import MetabaseDashboard from "../Graficos/Grafico1";


const ProfesorView = () => {


    return (
        <Container>
            <h1>Reportes</h1>
            <MetabaseDashboard />
        </Container>
    )
}


export default ProfesorView;

const Container = styled.div`
    padding: 2.5rem;
    gap: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    overflow: auto;
    
    .dateCont{
        width: 50%;
    }
    
    h1{
        font-size: 3rem;
        margin-bottom: 2rem;
    }
    
    @media ${device.mobile} {
        padding: 0;
    }
    
    &::-webkit-scrollbar {
        display: none;
    }
`

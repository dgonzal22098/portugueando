import styled from "styled-components"
import {InputLabel, MenuItem, FormControl, Select, Box} from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useMediaQuery from "../../../hooks/useMediaQuery.js"
import {useState} from "react";
import {device} from "../../../Breakpoints/breakpoints.js";
import MetabaseDashboard from "../Graficos/Grafico1";


const ProfesorView = () => {

    const isMobile = useMediaQuery(device.mobile);

    const nivelesStr = niveles.map(n => `Nivel ${n}`);
    const estudiantesUnicos = Array.from(
        new Map(estudiantes.map(est => [est.correo, est])).values()
    );
    const nombresEstudiantes = estudiantesUnicos.map(e => e.nombre);

    const [formState, setFormState] = useState({
        categorias: "",
        niveles: "",
        estudiantes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const [fecha, setFecha] = useState(dayjs());


    return (
        <Container>
            <h1>Reportes</h1>
            <div className="dateCont">
                <FormControl
                    fullWidth
                    sx={{
                        m: 1,
                        minWidth: 120,
                        maxWidth: isMobile ? "50%" : "45%",
                        bgcolor: "white"
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de inicio"
                            value={fecha}
                            onChange={(nuevaFecha) => setFecha(nuevaFecha)}
                            format="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl
                    fullWidth
                    sx={{
                        m: 1,
                        minWidth: 120,
                        maxWidth: isMobile ? "50%" : "45%",
                        bgcolor: "white"
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de fin"
                            value={fecha}
                            onChange={(nuevaFecha) => setFecha(nuevaFecha)}
                            format="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </FormControl>

            </div>



            <FormControl fullWidth sx={{ m: 1, minWidth: 120, maxWidth: isMobile ? "100%" : "45%", bgcolor: "white" }}>
                <InputLabel id="select-categorias">Categorías</InputLabel>
                <Select
                    labelId="select-categorias"
                    id="categorias"
                    name="categorias"
                    value={formState.categorias}
                    label="Categorías"
                    onChange={handleChange}
                >
                    {categorias.map((cat, index) => (
                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, minWidth: 120, maxWidth: isMobile ? "100%" : "45%", bgcolor: "white" }}>
                <InputLabel id="select-niveles">Niveles</InputLabel>
                <Select
                    labelId="select-niveles"
                    id="niveles"
                    name="niveles"
                    value={formState.niveles}
                    label="Niveles"
                    onChange={handleChange}
                >
                    {nivelesStr.map((nivel, index) => (
                        <MenuItem key={index} value={nivel}>{nivel}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1, minWidth: 120, maxWidth: isMobile ? "100%" : "45%", bgcolor: "white" }}>
                <InputLabel id="select-estudiantes">Estudiantes</InputLabel>
                <Select
                    labelId="select-estudiantes"
                    id="estudiantes"
                    name="estudiantes"
                    value={formState.estudiantes}
                    label="Estudiantes"
                    onChange={handleChange}
                >
                    {nombresEstudiantes.map((nombre, index) => (
                        <MenuItem key={index} value={nombre}>{nombre}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <MetabaseDashboard />


        </Container>
    )
}


export default ProfesorView;

const niveles = [1,2,3,4,5,6]
const estudiantes = [
    { nombre: "Alejandra Barros", correo: "abarros25896@universidadean.edu.co" },
    { nombre: "Mariana Torres", correo: "mtorres14788@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" },
    { nombre: "Alejandra Barros", correo: "abarros25896@universidadean.edu.co" },
    { nombre: "Mariana Torres", correo: "mtorres14788@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" }
];
const categorias = [
    "CATEG ERROS E NÍVEIS",
    "CATEG ERROS E HORÁRIOS",
    "CATEG ERROS E PROFESSORES",
    "CATEG E TIPOS DE ERROS",
    "CATEG ERROS E ESTUD"
];

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

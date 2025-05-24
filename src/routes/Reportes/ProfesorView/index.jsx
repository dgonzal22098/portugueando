import styled from "styled-components"
import {InputLabel, MenuItem, FormControl, Select, TextField, Box, useMediaQuery, useTheme} from '@mui/material';
import useMediaQuery from "../../../hooks/useMediaQuery.js"
import {device} from "../../../Breakpoints/breakpoints.js";


const ProfesorView = () => {

    const isMobile = useMediaQuery(device.mobile);

    return (
        <>
            <h1>Profesor view</h1>
            <FormControl
                key={name}
                fullWidth
                sx={{
                    m: 1,
                    minWidth: 120 ,
                    maxWidth: isMobile ? "100%" : "45%",
                    bgcolor: "white",
                    zIndex:"0"
                }}>

                <InputLabel id="categ">{label}</InputLabel>
                <Select
                    labelId="categ"
                    id="categ"
                    name="categ"
                    value={formState[name]}
                    label={label}
                    onChange={handleChange}
                >
                    {categorias.map((option,index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}

                </Select>

            </FormControl>
        </>
    )
}


export default ProfesorView;

const options = [1,2,3,4,5,6]
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


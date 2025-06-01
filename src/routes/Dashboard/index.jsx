import styled from "styled-components"
import {InputLabel, MenuItem, FormControl, Select, TextField, Box, useMediaQuery, useTheme, FormHelperText } from '@mui/material';
import { useState, useEffect, useMemo, useCallback } from "react";
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

    const [students, setStudents] = useState([]);
    const [formState, setFormState] = useState(initialFormState);
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const initialFormState = {
        nome: "",
        nivel: "",
        profe: "",
        email: "",
        semestre: "",
        horario: "",
        redacao: "",
        cote: "",
        ss: "",
        c: "",
        rr: "",
        x: "",
        s: "",
        agrave: "",
        aagudo: "",
        acircunflexo: "",
        till: "",
        vregulares: "",
        virregulares: "",
        genero: "",
        numero: "",
        virgula: "",
        pcontinuo: "",
        pparagrafo: "",
        pvergula: "",
        reticencias: "",
        pinterrogacao: "",
        pexclamacao: "",
        travessao: "",
        aspas: "",
        parenteses: "",
        usualidade: "",
        portunhol: "",
        extraterrestres: "",
        rinadecuadas: "",
        ausenciaa: "",
        excesso: "",
        order: ""
    };




    const fetchStudents = useCallback(async () => {
        try {
            console.log("Iniciando fetch...");
            const response = await fetch('http://localhost:8000/main/nivel/2/3');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Datos recibidos:", data);
            if (Array.isArray(data)) {
                setStudents(data);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        }
    }, []);


    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);


    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        if (name === "nome") {
            const selectedStudent = students.find(s => s.nombre === value);
            if (selectedStudent) {
                setFormState(prev => ({
                    ...prev,
                    nome: value,
                    email: selectedStudent.email,
                    nivel: selectedStudent.nivel?.toString() || ""
                }));
            }
        } else {
            setFormState(prev => ({
                ...prev,
                [name]: value
            }));
            if (value && formErrors[name]) {
                setFormErrors(prev => ({ ...prev, [name]: "" }));
            }
        }
    }, [students, formErrors]);

    const validateForm = useCallback(() => {
        const errors = {};
        let isValid = true;

        fullConfig.forEach(field => {
            const value = formState[field.name];
            if (!value && value !== 0) {
                errors[field.name] = "Este campo es obligatorio";
                isValid = false;
            }
            if (field.type === "number" && value !== "") {
                const numValue = Number(value);
                if (numValue > 10 || numValue < 0) {
                    errors[field.name] = "El valor debe estar entre 0 y 10";
                    isValid = false;
                }
            }
        });

        setFormErrors(errors);
        return isValid;
    }, [fullConfig, formState]);


    const fullConfig = useMemo(() => [
        {
            label: "Nome",
            name: "nome",
            options: students.map(student => student.nombre || ""),
            type: "select"
        },
        {
            label: "E-mail",
            name: "email",
            options: students.map(student => student.email || ""),
            type: "select"
        },
        {
            label: "Nível",
            name: "nivel",
            options: students.map(student => student.nivel?.toString() || ""),
            type: "select"
        },
        ...selectsConfig.slice(3)
    ], [students]);

    const handleSubmit = useCallback(() => {
        if (validateForm()) {
            setShowModalConfirmation(true);
        }
    }, [validateForm]);


    return (
        <Container>
            <h1 style={{fontSize: "3rem", marginBottom:"2rem"}}>Dashboard</h1>
            <h2>Caracterización escrita 2025-1</h2>
            <p>Rellena tus datos personales y el detalle del nivel en el que te encuentras e indica el número de errores en cada uno de los aspectos que se indican a continuación:</p>

            <Campos>
                {fullConfig.map(({label, name, options, type}) => (
                    <FormControl
                        key={name}
                        fullWidth
                        sx={{
                            m: 1,
                            minWidth: 120,
                            maxWidth: isTablet ? "100%" : "45%",
                            bgcolor: "white",
                            zIndex: "0"
                        }}
                    >
                        {type === "number" ? (
                            <TextField
                                label={label}
                                type="number"
                                name={name}
                                value={formState[name]}
                                onChange={handleChange}
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 10,
                                        step: 1
                                    }
                                }}
                                variant="outlined"
                                error={!!formErrors[name]}
                                helperText={formErrors[name]}
                            />
                        ) : (
                            <>
                                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                                <Select
                                    labelId={`${name}-label`}
                                    id={name}
                                    name={name}
                                    value={formState[name]}
                                    label={label}
                                    onChange={handleChange}
                                    error={!!formErrors[name]}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una opción</em>
                                    </MenuItem>
                                    {options.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formErrors[name] && (
                                    <FormHelperText error>{formErrors[name]}</FormHelperText>
                                )}
                            </>
                        )}
                    </FormControl>
                ))}
            </Campos>

            <ButtonGroup>
                <Button className="submit" onClick={handleSubmit}>
                    Enviar
                </Button>
                <Button className="submit cancel" onClick={() => setFormState(initialFormState)}>
                    Borrar todo
                </Button>
            </ButtonGroup>

            {showModalConfirmation && (
                <ModalConfirmation
                    setShowModalConfirmation={setShowModalConfirmation}
                    formState={formState}
                />
            )}
        </Container>
    );
};

export default Dashboard;


const a = [
    1
]
const b = [
    "María Gómez"
];
const c = [
    "08:00 - 10:00"
];
const d = [
    "Ensayo"
];
const e = [
    1
];
const f = [
    "María Gómez"
];
const g = [
    "08:00 - 10:00"
];
const h = [
    "Ensayo"
];

const selectsConfig = [
    { label: "Professor(a)", name: "profesor", options: c },
    { label: "Ano-Semestre", name: "semestre ", options: e },
    { label: "Horário", name: "horario", options: f },
    { label: "Tipo de Redação", name: "redacao", options: g },
    { label: "Corte", name: "corte", options: h },
    { label: "SS", name: "ss", type: "number" },
    { label: "Ç", name: "c", type: "number" },
    { label: "RR", name: "rr", type: "number" },
    { label: "X", name: "x", type: "number" },
    { label: "S", name: "s", type: "number" },
    { label: "Acento grave (À)", name: "agrave", type: "number" },
    { label: "Acento agudo (Á, É, Í, Ó, Ú)", name: "aagudo", type: "number" },
    { label: "Acento circunflexo", name: "acircunflexo", type: "number" },
    { label: "Til (~)", name: "till", type: "number" },
    { label: "Verbos Regulares", name: "vregulares", type: "number" },
    { label: "Verbos Irregulares", name: "virregulares", type: "number" },
    { label: "Gênero (Masculino-Feminino)", name: "genero", type: "number" },
    { label: "Número (Singular-Plural)", name: "numero", type: "number" },
    { label: "Vírgula", name: "virgula", type: "number" },
    { label: "Ponto continuativo", name: "pcontinuo", type: "number" },
    { label: "Ponto parágrafo", name: "pparagrafo", type: "number" },
    { label: "Ponto e vírgula", name: "pvergula", type: "number" },
    { label: "Reticências", name: "reticencias", type: "number" },
    { label: "Ponto de interrogação", name: "pinterrogacao", type: "number" },
    { label: "Ponto de exclamação", name: "pexclamacao", type: "number" },
    { label: "Travessão", name: "travessao", type: "number" },
    { label: "Aspas", name: "aspas", type: "number" },
    { label: "Parênteses", name: "parenteses", type: "number" },
    { label: "Usualidade", name: "usualidade", type: "number" },
    { label: "Portunhol", name: "portunhol", type: "number" },
    { label: "Extraterrestres", name: "extraterrestres", type: "number" },
    { label: "Repetições inadequadas", name: "rinadecuadas", type: "number" },
    { label: "Ausência", name: "ausenciaa", type: "number" },
    { label: "Excesso", name: "excesso", type: "number" },
    { label: "Ordem", name: "order", type: "number" }
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

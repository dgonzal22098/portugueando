import {styled} from "styled-components";
import { Link } from "react-router-dom";
import {Card, Formulario, Inputs, Button} from '../../componentes'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';

// quedaria pendiente asegurarse de que el error que tenga la validacion se muestre en el texthelper 

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState({ email: false, contrasena: false });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@universidadean.edu.co')) {
            setError('El correo debe finalizar en @universidadean.edu.co');
            setInputError({email:true, password:true});
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            });

            localStorage.setItem('usuarioLogueado', JSON.stringify(res.data));
            setError('');
            setInputError({email:false, password:false});
            navigate("/pruebas");
            
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setError("Correo o contraseña incorrectos");
            setInputError({email:true, password:true})
        }
    }

    return (
        <Background>
            <Card title="Acceso a Portugueando">

                <Formulario onSubmit={handleLogin}>

                    <TextField 
                    id="outlined-basic" 
                    label="Correo institucional" 
                    variant="outlined" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={inputError.email}
                    helperText={inputError.email ? "Correo incorrecto o inexistente" : ""}
                    sx={{
                        width: "100%",
                        margin: "1rem 0",
                        "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "& fieldset": {
                            borderColor: inputError.email ? "red" : "#d9d9d9",
                        },
                        "&:hover fieldset": {
                            borderColor: inputError.email ? "red" : "#888",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: inputError.email ? "red" : "#1976d2",
                        },
                        color: inputError.email ? "red" : "inherit",
                        },
                        "& .MuiInputLabel-root": {
                        color: inputError.email ? "red" : "inherit",
                        },
                    }}
                    />


                    <Grouped>

                        <LinkDecorated to="/recover">¿Olvidaste tu contraseña?</LinkDecorated>

                        <TextField
                        id="outlined-password-input"
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={inputError.password}
                        helperText={inputError.password ? "Contraseña incorrecta" : ""}
                        sx={{
                            width: "100%",
                            margin: "1rem 0",
                            "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            "& fieldset": {
                                borderColor: inputError.password ? "red" : "#d9d9d9",
                            },
                            "&:hover fieldset": {
                                borderColor: inputError.password ? "red" : "#888",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: inputError.password ? "red" : "#1976d2",
                            },
                            color: inputError.password ? "red" : "inherit",
                            },
                            "& .MuiInputLabel-root": {
                            color: inputError.password ? "red" : "inherit",
                            },
                        }}
                        />


                        <Grouped style={{alignItems:"center"}}>
                            <Button type="submit" texto="Acceder"/>
                        </Grouped>

                    </Grouped>



                </Formulario>

            </Card>     
        </Background>   
    )
  
}

export default Login;


const Background = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: black;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 255) 20%, rgba(0, 0, 0, 1) 45%);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Grouped = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
`
const LinkDecorated = styled(Link)`
    text-decoration: none;
    color: #3bac52;
    font-size: 0.9rem;
    &:hover {
    color: #0c47a1;
    text-decoration: underline;
    }
`

import {styled} from "styled-components";
import { Link } from "react-router-dom";
import {Card, Formulario, Button} from '../../componentes'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useAuth } from "../../auth";


axios.defaults.withCredentials = true;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState({ email: false, otp: false });

    const handleRequestOTP = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@universidadean.edu.co')) {
            setError('El correo debe finalizar en @universidadean.edu.co');
            setInputError({email: true});
            return;
        }

        try {
            await axios.post("http://localhost:8000/request-otp/", {
                email: email
            });

            setError('');
            setInputError({email: false});
            setShowOTPInput(true);
        } catch (error) {
            console.error("Error al solicitar código:", error);
            setError(error.response?.data?.detail || "Error al enviar el código");
            setInputError({email: true});
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/verify-otp/", {
                email: email,
                code: otpCode
            }, {
                withCredentials: true // Asegurarse de que se envían las cookies
            });

            console.log('Respuesta de verificación:', res.data);

            // Asegurarse de que tenemos los datos necesarios
            if (!res.data || !res.data.user) {
                throw new Error('Respuesta inválida del servidor');
            }

            // Llamar a login con los datos de la respuesta
            await login(res.data);

            console.log('Login exitoso, redirigiendo...');
            setError('');
            setInputError({email: false, otp: false});

            // Forzar un pequeño retraso para asegurar que los datos se guarden
            setTimeout(() => {
                navigate("/main/home");
            }, 100);

        } catch (error) {
            console.error("Error completo:", error);
            setError(error.response?.data?.detail || "Error al verificar el código");
            setInputError({otp: true});
        }
    };

    return (
        <Background>
            <Card title="Acceso a Portugueando">
                <Formulario onSubmit={showOTPInput ? handleVerifyOTP : handleRequestOTP}>
                    <TextField
                        id="outlined-basic"
                        label="Correo institucional"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={showOTPInput}
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

                    {showOTPInput && (
                        <TextField
                            id="otp-input"
                            label="Código de verificación"
                            variant="outlined"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            error={inputError.otp}
                            helperText={inputError.otp ? "Código inválido" : ""}
                            sx={{
                                width: "100%",
                                margin: "1rem 0",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                }
                            }}
                        />
                    )}

                    <Grouped>
                        {!showOTPInput && (
                            <LinkDecorated to="/recover">¿Olvidaste tu contraseña?</LinkDecorated>
                        )}

                        <Grouped style={{alignItems:"center"}}>
                            <Button
                                type="submit"
                                texto={showOTPInput ? "Verificar código" : "Solicitar código"}
                            />
                        </Grouped>

                        {showOTPInput && (
                            <ResendLink onClick={handleRequestOTP}>
                                ¿No recibiste el código? Solicitar otro
                            </ResendLink>
                        )}
                    </Grouped>

                    {error && (
                        <ErrorMessage>{error}</ErrorMessage>
                    )}
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

const Divider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #e0e0e0;
    }

    span {
        padding: 0 10px;
        color: #666;
        font-size: 0.9rem;
    }
`;



const ResendLink = styled.button`
    background: none;
    border: none;
    color: #3bac52;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    margin-top: 1rem;

    &:hover {
        color: #0c47a1;
    }
`;

const ErrorMessage = styled.div`
    color: #d32f2f;
    font-size: 0.875rem;
    margin-top: 1rem;
    text-align: center;
`;


import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

// Plantilla de tarjetas informativas
// Logica: Tarjetas de guia rapida en la que el user puede iniciar sus primeros pasos en la aplicación, no es necesaria logica en este componente.

const InformativeCards = ({frontText, backText, link}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);

    }

    return (
        <Container onClick={() => handleClick()}>
            <CustomTooltip title={backText} arrow>
                <h4>{frontText}</h4>
            </CustomTooltip>
        </Container>
    )
}

export default InformativeCards;

const CustomTooltip = muiStyled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #00a572;
    padding: 1rem;
    font-size: 0.9rem;
    border-radius: 8px;
    text-align: center;
  }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #00c0b3;
    transition: transform 0.5s ease, background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    box-sizing: border-box;
    
    &:hover{
        color: white;
        transform: scale(1.05);
        cursor: pointer;
        background-color: #009579;
    }
    h4{
        text-align: center;
    }
`

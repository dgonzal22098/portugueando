import styled from "styled-components"
import logoBlanco from "../../assets/logos/logoUEANblanco.png"
import logoPortugueando from "../../assets/logos/logoPortugueando.png"
import {device} from "../../Breakpoints/breakpoints.js"


const Card = ({title, children}) => {

    return <CardTemplate>
                <CardHeader >
                    <Imagen src={logoBlanco}/>
                    <Imagen src={logoPortugueando}/>
                </CardHeader>
                <Title>
                    {title}
                </Title>
                {children}
            </CardTemplate>
}   

export default Card

const CardTemplate = styled.div`
    width: 35rem;
    height: fit-content;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    overflow: hidden;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media ${device.mobile} {
        width: 100%;
        margin: 0 1rem;
    }
`
const CardHeader = styled.div`
    padding: 12px;
    background: white;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`
const Title = styled.p`
    margin: 30px 0;
    text-align: center;
    width: 90%;
    font-size: 1.5rem;
    font-weight: 900;
    color: black;
`
const Imagen = styled.img`
    width: 100px;
    height: auto;
    margin-top: 10px;
`

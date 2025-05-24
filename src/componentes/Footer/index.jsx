import logoFooter from '../../assets/logos/footerLogo.png'
import { TiSocialInstagram as InstaIc} from "react-icons/ti";
import { FaLinkedin as LnkdIc} from "react-icons/fa";
import { FaFacebook as FacebookIc} from "react-icons/fa";
import { FaYoutube as YoutubeIc} from "react-icons/fa";
import styled from 'styled-components'
import Enlace from './Enlace'
import {device} from "../../Breakpoints/breakpoints.js";

const FooterComp = styled.footer`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-evenly;
    background-color: white;
    padding: 2rem;
    border-top: 0cap.5px grey solid;
    @media ${device.mobile} {
        flex-wrap: wrap;
        gap: 1rem;
    }
`
const Titulos = styled.h4`
    margin-bottom: 15px;
`
const FooterSection = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    
    @media ${device.mobile} {
        width: 45%;
        margin-bottom: 1rem;
    }
`
const FooterSocial = styled.div`
    width: 100%;
    display: flex;
    gap: 13px;
    margin-top: 10px;
    justify-content: flex-start;
`
const Icon = styled.div`
  font-size: 1.5rem;
  color: #000;

  &:hover {
    color: #3BAC52;
    cursor: pointer;
  }
`;


const Footer = () => {
  return (
    <FooterComp>
        <FooterSection>
            <Titulos>PORTUGUEANDO</Titulos>
            <FooterSocial>
                <Icon><InstaIc /></Icon>
                <Icon><LnkdIc /></Icon>
                <Icon><FacebookIc /></Icon>
                <Icon><YoutubeIc /></Icon>
            </FooterSocial>
        </FooterSection>
        <FooterSection>
            <Titulos>EXPLORA</Titulos>
            <Enlace texto="Home Page"/>
            <Enlace texto="Beneficios"/>
        </FooterSection>
        <FooterSection>
            <Titulos>ACERCA DE</Titulos>
            <Enlace texto="La Plataforma"/>
            <Enlace texto="Universidad Ean"/>
        </FooterSection>
        <FooterSection>
            <Titulos>TÉRMINOS DE USO</Titulos>
            <Enlace texto="Privacidad"/>
            <Enlace texto="Cookies"/>
            <Enlace texto="Aviso de originalidad"/>
        </FooterSection>
        <FooterSection>
        <img src={logoFooter}/>
        </FooterSection>
    </FooterComp>)
}
export default Footer
import styled from "styled-components";
import { useOutletContext } from "react-router-dom"
import InformativeCards from "./InformativeCards";
import Header from "./Header";
import Bienvenida from "./Bienvenida";
import {device} from "../../Breakpoints/breakpoints"

const cardsContentProfesor = [
    {
        frontText: "📊 Registro muy fácil de estudiantes",
        backText: "Visualiza gráficos detallados por estudiante, grupo o nivel, con información acumulada y tendencias de errores más comunes.",
        link:"/main/reportes",
    },
    {
        frontText: "📝 Clasificación automática de errores",
        backText: "Registra y categoriza automáticamente errores ortográficos, gramaticales y de acentuación en las evaluaciones escritas.",
        link:"/main/reportes",
    },
    {
        frontText: "📂 Registro muy fácil de estudiantes",
        backText: "Registra a tus estudiantes en el grupo correspondiente a través de una plantilla Excel o de forma manual.",
        link: "/main/grupos_docente"
    },
    {
        frontText: "💡 Retroalimentación estratégica",
        backText: "Genera sugerencias pedagógicas basadas en el análisis de errores frecuentes para reforzar áreas críticas.",
        link: "/main/material_apoyo",
    },
];

const cardsContentEstudiante = [
    {
        frontText: "📈 Acceso a informes de retroalimentación (Reportes)",
        backText: "Consulta tus reportes de evaluación en tiempo real, con errores clasificados y recomendaciones personalizadas.",
        link: "/main/reportes",
    },
    {
        frontText: "🔍 Seguimiento del progreso (Dashboard)",
        backText: "Revisa tu evolución académica a lo largo del semestre y detecta patrones de mejora o retroceso. Puedes ingresar tus caraterizaciones de aprendizaje.",
        link: "/main/dashboard",
    },
    {
        frontText: "💬 Colecciones de material de apoyo (Material de Apoyo)",
        backText: "Visualiza materiales de retroalimentación que servirán para tu crecimiento académico, accede a cada uno de ellos a través de materiales de apoyo personalizados.",
        link: "/main/material_apoyo",
    },
    {
        frontText: "🗃️ Historial de desempeño académico",
        backText: "Consulta tu historial completo de retroalimentaciones y errores corregidos desde niveles anteriores.",
        link: "/main/home",
    },
];

const cardsContentAdmin = [
    {
        frontText: "🔐 Gestión de docentes",
        backText: "Crea, edita y asigna permisos a docentes y administradores para garantizar un acceso seguro.",
        link: "/main/registro_profesor",
    },
    {
        frontText: "⚙️ Configuración de los cursos, grupos y monitoreo",
        backText: "Crea, edita y gestiona tanto grupos como cursos para garantizar un acceso seguro.",
        link: "/main/cursos",
    },
];

const getLinksByRole = (data) => {
    switch (data) {
        case "Estudiante":
            return cardsContentEstudiante;
        case "Profesor":
            return cardsContentProfesor;
        case "Administrador":
            return cardsContentAdmin;
        default:
            return [];
    }
};

const HomePage = () => {
    const {usuario} = useOutletContext();
    const rol = usuario?.user?.rol || ""; // Accediendo al rol a través de user

    const links = getLinksByRole(rol);

    console.log("Usuario completo:", usuario);
    console.log("Datos de usuario:", usuario?.user);
    console.log("Rol actual:", rol);
    console.log("Links generados:", links);

    return (
        <>
            <ContentContainer>
                <div className="headerContainer">
                    <Header role={rol}/>
                </div>

                <Bienvenida usuario={usuario?.user || usuario}/>

                <div className="flipContainer">
                    <div className="left">
                        {Array.isArray(links) && links.map((object, index) => (
                            <InformativeCards
                                key={index}
                                frontText={object.frontText}
                                backText={object.backText}
                                link={object.link}
                            />
                        ))}
                    </div>
                    <div className="right">
                        <h2>¿Por qué somos importantes?</h2>
                        <p className="description">
                            Nuestra aplicación es ese catalizador, diseñada para empoderar tanto a estudiantes como a docentes,
                            ofreciendo una visión clara del progreso, automatizando el análisis y personalizando el aprendizaje.
                        </p>
                    </div>
                </div>
            </ContentContainer>
        </>
    )
}

export default HomePage

const ContentContainer = styled.div`
    width: 100%;
    overflow: auto;
    margin: 2rem 2rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    
    @media ${device.tablet} {
        margin: 0;
    }
    
    .headerContainer {
        height: 100%;
        width: 100%;
    }
    
    .flipContainer {
        width: 100%;
        padding: 2rem 0;
        display: flex;
        gap: 1rem;
        align-content: center;
        justify-content: center;
        
        .left {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            @media ${device.mobile} {
                grid-template-columns: 1fr;
            }
        }
        
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 2rem;
            margin: 0 3rem;
            
            h2 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }
            
            .description {
                line-height: 1.6;
            }
            
            @media ${device.tablet} {
                text-align: center;
                align-items: center;
            }
        }
        
        @media ${device.tablet} {
            flex-direction: column-reverse;
            width: 80%;
            gap: 2rem;
        }
    }

    &::-webkit-scrollbar {
        display: none;
    }
`

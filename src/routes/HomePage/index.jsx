import styled from "styled-components";
import { useOutletContext } from "react-router-dom"
import InformativeCards from "./InformativeCards";
import Header from "./Header";
import Bienvenida from "./Bienvenida";

// Main de Home page
// Rol: Todos
// Logica: Muestra ciertas tarjetas dependiendo del rol y se personalizan los links para una guia rapida al inicar su aplicación. No hay pendientes en este modulo.


const HomePage = () => {

    const {usuario} = useOutletContext();
    const rol = usuario.rol;

    const getLinksByRole = (rol) => {
        switch (rol) {
            case "Estudiante":
                return cardsContentEstudiante;
            case "Profesor":
                return cardsContentProfesor;
            case "Administrador":
                return cardsContentAdmin;
        }
    };

    const links = getLinksByRole(rol);
  
    return (
        <>
            <ContentContainer>
                <div className="headerContainer">
                    <Header role={usuario.rol}/>
                </div>

                <Bienvenida usuario={usuario}/>

                <div className="flipContainer">

                    <div className="left">

                        {links.map((object, index) => (
                            <InformativeCards
                                key={index}
                                frontText={object.frontText}
                                backText={object.backText}
                                link={object.link}
                            />
                        ))}

                    </div>
                    <p className="right">
                        <h2>¿Por qué somos importantes?</h2>
                        <p>Nuestra aplicación es ese catalizador, diseñada para empoderar tanto a estudiantes como a docentes, ofreciendo una visión clara del progreso, automatizando el análisis y personalizando el aprendizaje.</p>
                    </p>

                </div>

            </ContentContainer>



        </>
    )
}

export default HomePage

const cardsContentProfesor = [
    {
        frontText: "📊 Registro muy fácil de estudiantes",
        backText: "Visualiza gráficos detallados por estudiante, grupo o nivel, con información acumulada y tendencias de errores más comunes.",
        link:"/pruebas/reportes",
    },
    {
        frontText: "📝 Clasificación automática de errores",
        backText: "Registra y categoriza automáticamente errores ortográficos, gramaticales y de acentuación en las evaluaciones escritas.",
        link:"/pruebas/reportes",
    },
    {
        frontText: "📂 Registro muy fácil de estudiantes",
        backText: "Registra a tus estudiantes en el grupo correspondiente a través de una plantilla Excel o de forma manual.",
        link: "/pruebas/grupos_docente"
    },
    {
        frontText: "💡 Retroalimentación estratégica",
        backText: "Genera sugerencias pedagógicas basadas en el análisis de errores frecuentes para reforzar áreas críticas.",
        link: "/pruebas/material_apoyo",
    },
];
const cardsContentEstudiante = [
    {
        frontText: "📈 Acceso a informes de retroalimentación (Reportes)",
        backText: "Consulta tus reportes de evaluación en tiempo real, con errores clasificados y recomendaciones personalizadas.",
        link: "/pruebas/reportes",
    },
    {
        frontText: "🔍 Seguimiento del progreso (Dashboard)",
        backText: "Revisa tu evolución académica a lo largo del semestre y detecta patrones de mejora o retroceso. Puedes ingresar tus caraterizaciones de aprendizaje.",
        link: "/pruebas/dashboard",
    },
    {
        frontText: "💬 Colecciones de material de apoyo (Material de Apoyo)",
        backText: "Visualiza materiales de retroalimentación que servirán para tu crecimiento académico, accede a cada uno de ellos a través de materiales de apoyo personalizados.",
        link: "/pruebas/material_apoyo",
    },
    {
        frontText: "🗃️ Historial de desempeño académico",
        backText: "Consulta tu historial completo de retroalimentaciones y errores corregidos desde niveles anteriores.",
        link: "/pruebas/home",
    },
];
const cardsContentAdmin = [
    {
        frontText: "🔐 Gestión de docentes",
        backText: "Crea, edita y asigna permisos a docentes y administradores para garantizar un acceso seguro.",
        link: "/pruebas/registro_profesor",
    },
    {
        frontText: "⚙️ Configuración de los cursos, grupos y monitoreo",
        backText: "Crea, edita y gestiona tanto grupos como cursos para garantizar un acceso seguro.",
        link: "/pruebas/cursos",
    },
];


const ContentContainer = styled.div`
    width: 100%;
    overflow: auto;
    margin: 2rem 2rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items:center;
    .headerContainer{
        height: 600px;
    }
    .flipContainer{
        width: 100%;
        padding: 2rem 0;
        display: flex;
        gap: 1rem;
        align-content: center;
        justify-content: center;
        .left{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .left p{
            width: 100%;
            box-sizing: border-box;
        }
        .right{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 2rem;
            margin: 0 3rem;
        }
    }

    &::-webkit-scrollbar {
      display: none;
    }
`

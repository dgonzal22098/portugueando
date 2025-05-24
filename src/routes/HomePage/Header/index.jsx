import styled from "styled-components"
import backgroundAdmin from "../../../assets/pictures/eanHeaderAdmin.png";
import backgroundStudent from "../../../assets/pictures/eanHeaderEstudiante.png";
import backgroundTeacher from "../../../assets/pictures/eanHeaderProfesor.png";
import {device} from "../../../Breakpoints/breakpoints";
import useMediaQuery from "../../../hooks/useMediaQuery.js"

// Componente de Cabecera
// Rol: Todos
// Logica: Componente que muestra una imagen y texto dependiendo del usuario, no acciones pendientes.

const Header = ({role}) => {

    const isMobile = useMediaQuery("(max-width: 480px)");
    const backgroundImage = isMobile ? null : getBackgroundRole(role);


    return (
        <Container background={backgroundImage}>

                <div className={`text ${isMobile ? "mobile" : ""}`}>
                    <h1>Portugu<span>ean</span>do</h1>
                    <div className="frase">
                        <p className="dynapuff">De <span className="dynapuff eanistas">eanistas</span> para <span className="dynapuff eanistas">eanistas</span> !</p>
                        {!isMobile ? (<p className="dynapuff secondText">Donde los errores enseñan y la comunidad impulsa.</p>) : (<></>)}

                    </div>
                </div>


        </Container>
    )
}

export default Header;

const getBackgroundRole = (role) => {
    switch (role) {
        case "Administrador":
            return backgroundAdmin;
        case "Estudiante":
            return backgroundStudent;
        case "Profesor":
            return backgroundTeacher;
    }
}

const Container = styled.div`
    width: 100%;
    min-height: 30vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-top: 2rem;
    padding: 1rem 2rem 0 2rem;
    box-sizing: border-box;
    border-radius: 15px;
    background-image: url(${(props) => props.background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    

    .text {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
        
        &.mobile h1{
            color: black;
        }
        
        
        @media ${device.tablet} {
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        
        .eanistas {
           color: #3BAC52;
           font-weight: bold;
        }
      h1 {
          font-weight: 300;
          color: white; 
          font-size: 6rem;
          font-family: "Fugaz One", sans-serif;
          span{
           color: #3BAC52;
           font-family: inherit;
          }
          
          @media ${device.tablet} {
              font-size: 3rem;
              text-align: center;
          }
          
          
          
       }
      .frase{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 2rem;
        color: #FFD700;
        font-size: 1.5rem;
        max-width: 40%;
          
          @media ${device.tablet} {
              font-size: 1rem;
              text-align: center;
              width: 90%;
              margin-bottom: 2rem;
              
          }
      }
    }
`;
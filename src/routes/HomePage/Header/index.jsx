import styled from "styled-components"
import backgroundAdmin from "../../../assets/pictures/eanHeaderAdmin.png";
import backgroundStudent from "../../../assets/pictures/eanHeaderEstudiante.png";
import backgroundTeacher from "../../../assets/pictures/eanHeaderProfesor.png";

// Componente de Cabecera
// Rol: Todos
// Logica: Componente que muestra una imagen y texto dependiendo del usuario, no acciones pendientes.

const Header = ({role}) => {

    const backgroundImage = getBackgroundRole(role);

    return (
        <Container background={backgroundImage}>

            <div className="text">
                <h1>Portugu<span>ean</span>do</h1>
                <div className="frase">
                    <p className="dynapuff">De <span className="dynapuff eanistas">eanistas</span> para <span className="dynapuff eanistas">eanistas</span> !</p>
                    <p className="dynapuff">Donde los errores enseñan y la comunidad impulsa.</p>
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
    height: 400px;
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
    }
    .frase{
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-left: 2rem;
      color: #FFD700;
      font-size: 1.5rem;
      width: 35%;
    }
  }
`;
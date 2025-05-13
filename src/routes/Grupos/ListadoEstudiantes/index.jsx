import styled from "styled-components";
import { IoClose } from "react-icons/io5";

// Modal de lista de estudiantes, podria considerarse como la lista de estudiantes historicos
// Rol: Administrador, Profesor
// Logica: trae los datos de la base de datos, los estudiantes que hayan sido modificados en alguna forma, podria considerarse esta opcion.

const ListadoEstudiantes = ({ setShowEstudiantes }) => {
  return (
    <Overlay onClick={() => setShowEstudiantes(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        
        <CloseButton onClick={() => setShowEstudiantes(false)}>
          <IoClose size={24} />
        </CloseButton>
        
        <h2 style={{margin:"2rem"}}>Listado de Estudiantes</h2>
        <EstudiantesList>
          {estudiantes.map((est, i) => (
            <Estudiante key={i}>
              <strong>{est.nombre}</strong>
              <p>{est.correo}</p>
            </Estudiante>
          ))}
        </EstudiantesList>

        <ButtonGroup>
          <Button>Descargar Excel</Button>
          <Button className="cerrar" onClick={() => setShowEstudiantes(false)}>Cerrar</Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};

export default ListadoEstudiantes;

const estudiantes = [
    { nombre: "Alejandra Barros", correo: "abarros25896@universidadean.edu.co" },
    { nombre: "Mariana Torres", correo: "mtorres14788@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" },
    { nombre: "Alejandra Barros", correo: "abarros25896@universidadean.edu.co" },
    { nombre: "Mariana Torres", correo: "mtorres14788@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" },
    { nombre: "Juan David Mondragón", correo: "jmondr65489@universidadean.edu.co" },
    { nombre: "Daniela Fernández", correo: "dferna34986@universidadean.edu.co" },
    { nombre: "Darío Gómez", correo: "dgomez61254@universidadean.edu.co" },
    { nombre: "Alejandro Fernández", correo: "afernan21985@universidadean.edu.co" }
  ];

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled.div`
  background: white;
  position: relative;
  padding: 2rem;
  border-radius: 1rem;
  width: 600px;
  max-height: 80dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &::-webkit-scrollbar {
      display: none;
  }
`;

const EstudiantesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 2rem;
  max-height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
      display: none;
  }
`;

const Estudiante = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-left: 2rem;
`;

const Button = styled.button`
  flex: 1;
  height: 45px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-color: #3BAC52;
  color: white;

  &:hover {
    background-color: #54c36a;
  }

  &.cerrar {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    &:hover {
      background-color: #eee;
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff5f5f;
  }
`;

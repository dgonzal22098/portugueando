import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

// Modal de listado de estudiantes históricos
// Rol: Administrador
// Logica: Trae la información de los estudiantes antiguos en grupos pasados y lso muestra tambien permite descargar la lista en formato Excel.


const ListadoHistoricEstudiantes = ({ setShowHistoricStudents, grupo }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/main/grupos/${grupo.id_grupo}/estudiantes`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Error al obtener estudiantes');
        }

        const data = await response.json();
        setEstudiantes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, [grupo.id_grupo]);

  const handleDescargarExcel = async () => {
    try {
      const response = await fetch(`http://localhost:8000/main/grupos/${grupo.id_grupo}/estudiantes/excel`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al descargar Excel');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `estudiantes_grupo_${grupo.nGrupo}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error:', err);
      alert('Error al descargar el archivo Excel');
    }
  };

  if (loading) return <Overlay><Modal>Cargando estudiantes...</Modal></Overlay>;
  if (error) return <Overlay><Modal>Error: {error}</Modal></Overlay>;

  return (
    <Overlay onClick={() => setShowHistoricStudents(false)}>
      
      <Modal onClick={(e) => e.stopPropagation()}>
        
        <CloseButton onClick={() => setShowHistoricStudents(false)}>
          <IoClose size={24} />
        </CloseButton>

        <h2 style={{margin:"2rem"}}>Listado de Estudiantes - Grupo {grupo.nGrupo}</h2>

        <EstudiantesList>
          {estudiantes.length === 0 ? (
            <p>No hay estudiantes registrados en este grupo.</p>
          ) : (
            estudiantes.map((est, i) => (
              <Estudiante key={i}>
                <strong>{est.nombre}</strong>
                <p>{est.correo}</p>
              </Estudiante>
            ))
          )}
        </EstudiantesList>

        <ButtonGroup>

          <Button onClick={handleDescargarExcel}>Descargar Excel</Button>
          <Button className="cerrar" onClick={() => setShowHistoricStudents(false)}>Cerrar</Button>
        
        </ButtonGroup>

      </Modal>

    </Overlay>
  );
};

export default ListadoHistoricEstudiantes;

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
  position: relative;
  background: white;
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

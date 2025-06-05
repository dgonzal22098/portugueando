import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import {device} from "../../../Breakpoints/breakpoints.js";
import { useOutletContext } from "react-router-dom";

const CrearGrupoModal = ({ setShowCrearGrupoModal, nivel }) => {
    const {usuario} = useOutletContext();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profesores, setProfesores] = useState([]);
    const [groupInfo, setGroupInfo] = useState({
        nGrupo: "",
        email: "",
        hora: "",
        fecha: new Date().toISOString().split('T')[0],
        nivel: nivel,
        lider: true,
        estado: true
    });

    // Cargar la lista de profesores
    useEffect(() => {
        const fetchProfesores = async () => {
            try {
                const response = await fetch('http://localhost:8000/main/registro_profesor/', {
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Error al cargar profesores');
                const data = await response.json();
                const profesoresActivos = data.filter(prof => prof.estado === 1);
                setProfesores(profesoresActivos);
            } catch (err) {
                console.error('Error:', err);
                setError('Error al cargar la lista de profesores');
            }
        };

        fetchProfesores();
    }, []);

    const handleContinuar = () => {
        const {nGrupo, email, hora, fecha} = groupInfo;

        if (!nGrupo || !email || !hora || !fecha) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        setShowConfirmation(true);
        setError(null);
    };

    const handleConfirmar = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/main/grupos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    nGrupo: parseInt(groupInfo.nGrupo),
                    email: groupInfo.email,
                    hora: groupInfo.hora,
                    fecha: groupInfo.fecha,
                    nivel: parseInt(nivel),
                    lider: true,
                    estado: true
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear el grupo');
            }

            // Mostrar mensaje de éxito y cerrar el modal
            alert('Grupo creado exitosamente');
            setShowCrearGrupoModal(false);
            // Recargar la página para ver los cambios
            window.location.reload();

        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGroupInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
  
    return (
    <Overlay onClick={() => setShowCrearGrupoModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setShowCrearGrupoModal(false)}>
          <IoClose size={24} />
        </CloseButton>

        <h2 style={{margin:"2rem 2rem 0 0"}}>Nuevo grupo</h2>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {showConfirmation ? (
            <Confirmation>
                <Title>Detalles del nuevo grupo</Title>
                <p><strong>Grupo:</strong> {groupInfo.nGrupo}</p>
                <p><strong>Docente:</strong> {groupInfo.email}</p>
                <p><strong>Horario:</strong> {groupInfo.hora}</p>
                <p><strong>Fecha:</strong> {groupInfo.fecha}</p>
            </Confirmation>
        ) : (
            <FormContainer>
                <Select
                    name="nGrupo"
                    value={groupInfo.nGrupo}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Seleccione el número del grupo</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </Select>

                <Select
                    name="email"
                    value={groupInfo.email}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Seleccione el docente</option>
                    {profesores.map((profesor) => (
                        <option key={profesor.email} value={profesor.email}>
                            {profesor.name}
                        </option>
                    ))}
                </Select>

                <Select
                    name="hora"
                    value={groupInfo.hora}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Seleccione el horario</option>
                    <option value="4-6">4 - 6 pm</option>
                    <option value="6-8">6 - 8 pm</option>
                    <option value="8-10">8 - 10 pm</option>
                </Select>

                <input
                    type="date"
                    name="fecha"
                    value={groupInfo.fecha}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        padding: '1em',
                        borderRadius: '5px',
                        border: '1px solid #D9D9D9',
                        font: 'inherit'
                    }}
                />
            </FormContainer>
        )}

        <ButtonGroup>
            {showConfirmation ? (
                <Button
                    onClick={handleConfirmar}
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Confirmar'}
                </Button>
            ) : (
                <Button onClick={handleContinuar}>Continuar</Button>
            )}

            <Button
                className="cancel"
                onClick={() => setShowCrearGrupoModal(false)}
                disabled={loading}
            >
                Cancelar
            </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
    );
};

export default CrearGrupoModal;

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
  padding: 2rem 3rem;
  border-radius: 1rem;
  width: 700px;
  max-height: 80dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media ${device.mobile} {
      margin: 0 1rem;
  }  
  &::-webkit-scrollbar {
      display: none;
  }
`;
const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr;
    gap: 1rem;
`
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

  &.cancel {
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
const Select = styled.select`
  width: 100%;
  padding: 1em 3em 1em 1em;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  font: inherit;
  background-color: white;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 1em center;
  background-size: 1rem;
  transition: 0.2s ease-in-out;

  background-image:
    linear-gradient(45deg, transparent 50%, #3BAC52 50%),
    linear-gradient(135deg, #3BAC52 50%, transparent 50%),
    linear-gradient(to right, white, white);

  &:focus {
    border-color: #3BAC52;
    outline: none;
    background-image:
      linear-gradient(45deg, white 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, white 50%),
      linear-gradient(to right, white, white);
  }
`;
const Confirmation = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr;
    gap: 1rem;
    span{
        font-weight: bold;
    }
`
const Title = styled.h2`
  background-color: #f44336;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;
const ErrorMessage = styled.div`
    color: #cc0000;
    background-color: #ffe6e6;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    border: 1px solid #ffcccc;
    text-align: center;
`;

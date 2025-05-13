import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

// Modal de crear un nuevo grupo en un curso
// Rol: Administrador
// Logica: Desde aca se debe enviar la informacion del nuevo grupo a la base de datos para que se actualice y se muestre de forma exitosa. Se deben traer los datos de los docentes registrados para que se pueda seleccionar en el nuevo grupo y si no hay un docente registrado redirige al admin a la pagina de registro de docente.
// Pendiente: Faltaria realizar la logica de crear un nuevo grupo en este componente y el pop up de cuando se haya creado de forma exitosa. Revisar la logica de cuando no hay docentes registrados para que lo redirija a la pagina de registro.

const CrearGrupoModal = ({ setShowCrearGrupoModal }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [groupInfo, setGroupInfo] = useState({
        numero: "",
        docente: "",
        horario: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGroupInfo(prev => ({
            ...prev,
            [name]:value
        }));
    };
  
    return (
    <Overlay onClick={() => setShowCrearGrupoModal(false)}>
      
      <Modal onClick={(e) => e.stopPropagation()}>
        
        <CloseButton onClick={() => setShowCrearGrupoModal(false)}>
          <IoClose size={24} />
        </CloseButton>

        <h2 style={{margin:"2rem 2rem 0 0"}}>Nuevo grupo</h2>
        
        {/* el numero del grupo se debe calcular al contar los grupos que ya hayan sido creados con anterioridad y de ese modo se podra seleccionar el disponible */
        }
        
        {showConfirmation ? 
        <Confirmation>
            <Title>Detalles del nuevo grupo</Title>
            <p><span>Grupo: </span>{groupInfo.numero}</p>
            <p><span>Docente: </span>{groupInfo.docente}</p>
            <p><span>Horario: </span>{groupInfo.horario}</p>
        </Confirmation>
        :
        <FormContainer>
            <Select 
            name="numero"
            className="classicSelectStyle" defaultValue=""
            onChange={handleChange}>
                <option value="" disabled>Seleccione el número del grupo</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </Select>

    {/* los profesores se traen de la base de datos, alli se agregaron y registraron los docentes participantes en el semestre academico */}

            <Select 
            name="docente"
            className="classicSelectStyle" defaultValue=""
            onChange={handleChange}>
                <option value="" disabled>Seleccione el docente</option>
                <option>Andres galpon</option>
                <option>federico sancocho</option>
                <option>gabriela sierra</option>
            </Select>

            {/* los horarios se traen de la base de datos que estan establecidas por defecto o los que el administrador desee agregar */}
            <Select 
            name="horario"
            className="classicSelectStyle" defaultValue=""
            onChange={handleChange}>
                <option value="" disabled>
                    Seleccione el horario
                </option>
                <option>4 - 6 pm</option>
                <option>6 - 8 pm</option>
                <option>8 - 10 pm</option>
            </Select>
        </FormContainer>
        }
        
        <ButtonGroup>

            {showConfirmation ? 
            <Button onClick={() => setShowCrearGrupoModal(false)}>Confirmar</Button> 
            : 
            <Button onClick={() => setShowConfirmation(true)}>Continuar</Button>}
            
            <Button className="cancel" onClick={() => setShowCrearGrupoModal(false)}>Cancelar</Button>

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

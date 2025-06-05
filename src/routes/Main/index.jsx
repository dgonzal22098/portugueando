import { Outlet, useLocation} from 'react-router-dom';
import {useState, useEffect, useMemo} from 'react'
import {LateralMenu, Footer} from '../../componentes'
import styled from 'styled-components';
import {device} from "../../Breakpoints/breakpoints.js"
import axios from 'axios';

// Este seria el modulo principal donde se navega y se define el usuario.
// Rol: Todos
// Logica: Se incrusta el footer, el menu lateral y todas las paginas a traves del menu lateral, desde aca se navega basicamente.
// Pendiente: Hace falta renombrar el componente desde aca y en todas las rutas para que quede acorde al proyecto.
// Considerar: Tambien faltaria un icono de perfil de forma absoluta que quede flotando en alguna esquina.

const Main = () => {
  const [isOpen, setIsOpen]  = useState(false);
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const usuarioAlmacenado = localStorage.getItem('usuarioLogueado');
    if (usuarioAlmacenado) {
      try {
        const userData = JSON.parse(usuarioAlmacenado);
        console.log('Usuario cargado:', userData); // Para debugging
        setUsuario(userData);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
      }
    } else {
      console.log('No hay usuario almacenado en localStorage');
    }
  }, []);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await axios.get('http://localhost:8000/verificar-sesion/');
        console.log('Datos de sesión:', response.data);
        setUsuario({
          ...response.data,
          rol: response.data.rol // Asegurarse de que el rol se incluya
        });
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      }
    };

    verificarSesion();
  }, []);

  const contextValue = useMemo(() => ({
    usuario,
    setUsuario
  }), [usuario]);

  if (!usuario) {
    return <div>Cargando usuario...</div>;
  }

  // Para debugging
  console.log('Usuario en Main:', usuario);
  console.log('Rol del usuario:', usuario.rol);

  return (
    <Container>
      <div className="sidebarState">
        <LateralMenu
          isOpen={isOpen}
          showSideBar={() => setIsOpen(!isOpen)}
          data={usuario}
        />
        <Outlet context={contextValue} />
      </div>
      <Footer />
    </Container>
  );
}

export default Main

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;


  &::-webkit-scrollbar {
    display: none;
  }

  .sidebarState {
    display: flex;
    gap: 50px;
    transition: all 0.2s;
    height: 100%;
    position: relative;
    
    @media ${device.tablet} {
      flex-direction: column;
      align-items: center;
      
    }
  }

`;

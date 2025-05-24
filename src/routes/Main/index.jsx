import { Outlet, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {LateralMenu, Footer} from '../../componentes'
import styled from 'styled-components';
import {device} from "../../Breakpoints/breakpoints.js"

// Este seria el modulo principal donde se navega y se define el usuario.
// Rol: Todos
// Logica: Se incrusta el footer, el menu lateral y todas las paginas a traves del menu lateral, desde aca se navega basicamente.
// Pendiente: Hace falta renombrar el componente desde aca y en todas las rutas para que quede acorde al proyecto.
// Considerar: Tambien faltaria un icono de perfil de forma absoluta que quede flotando en alguna esquina.

const Main = () => {
  const [isOpen, setIsOpen]  = useState(false);
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 // const pathSegments = location.pathname.split('/').filter(Boolean);
  //const currentPath = pathSegments[pathSegments.length - 1] || 'main';

  useEffect(() => {
    const usuarioAlmacenado = localStorage.getItem('usuarioLogueado');

    if (usuarioAlmacenado) {
      setUsuario(JSON.parse(usuarioAlmacenado));
    }
  }, []);


  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (

      <Container>
        <div className="sidebarState">
          <LateralMenu isOpen={isOpen} setIsOpen={setIsOpen} showSideBar={toggleSidebar} data={usuario}/>
          <Outlet context={{usuario}}/>
        </div>
        <Footer />

      </Container>
  )
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

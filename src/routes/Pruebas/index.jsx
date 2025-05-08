import { Outlet, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'
import {LateralMenu, Footer} from '../../componentes'
import styled from 'styled-components';
import HomePage from '../HomePage';



const Pruebas = () => {
  const [isOpen, setIsOpen]  = useState(true);
  const [usuario, setUsuario] =useState(null);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPath = pathSegments[pathSegments.length - 1] || 'pruebas';
  console.log(currentPath);

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
          
          {currentPath ==="/pruebas/home" && <HomePage /> }
          <Outlet context={{usuario}}/>
          
        </div>
        <Footer />
      </Container>
  )
}

export default Pruebas

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
      display: none;
  }
  .sidebarState{
    display: flex;
    gap: 50px;
    transition:all 0.2s;
    height: 100%;
    position: relative;
  }
`
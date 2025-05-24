import styled from "styled-components"
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserAlt as UserIC, FaBookReader as ReportesIC} from "react-icons/fa";
import { ImStatsBars as DashboardIC} from "react-icons/im";
import { AiOutlineLeftCircle as HideorShowIC} from "react-icons/ai";
import { SlLogout as LogoutIC} from "react-icons/sl";
import { IoIosHome as HomeIcon} from "react-icons/io";
import { IoLibrary as CollectionIC} from "react-icons/io5";
import { IoIosPersonAdd as TeacherIC} from "react-icons/io";
import { FaPeopleGroup as GroupCreationIC} from "react-icons/fa6";
import { PiFoldersFill as CursosIC} from "react-icons/pi";
import LogoPortugueando from '../../assets/logos/logoPortugueandoBlanco.png'
import LogoutComp from "../LogoutComp";
import Tooltip from '@mui/material/Tooltip';
import ReactDOM from 'react-dom';


const LateralMenu = ({isOpen, showSideBar,data}) => {
  const logo = isOpen && LogoPortugueando;
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();


  const linksArray = getLinksByRole(data.rol);


  return (
    <Container isOpen={isOpen}>
      <button className="SidebarButton" onClick={showSideBar}>
        <HideorShowIC />
      </button>
      <nav>
        <LogoContainer>
          <img src={logo} className="Logo"/>
        </LogoContainer>

        {linksArray.map(({ label, icon, to }) => 
        {
          const isActiveManually =
            (label === "Cursos y grupos" &&
            (location.pathname.includes("/main/grupos") ||
            location.pathname.includes("/main/cursos")))||
            (label === "Grupos y estudiantes" &&
            (location.pathname.includes("/main/grupos_docente") ||
            location.pathname.includes("/main/groups_assigned_docente")));

          return (

               <Tooltip title={label} arrow placement="right">

                   <div className="LinkContainer" key={label}>

                       <NavLink
                           to={to}
                           className={({ isActive }) =>
                               `Link ${isActive || isActiveManually ? "active" : ""}`
                           }
                       >
                           <div className="LinkIcon">{icon}</div>
                           {isOpen && <span>{label}</span>}
                       </NavLink>
                   </div>
               </Tooltip>
          );

        })}

        <LogoutOption 
        onClick={
          () => 
            setShowModal(true)
          }>
          <div className="CloseSesion">
            <LogoutIC className="LogoutIcon" />
            {isOpen && <span>Cerrar Sesión</span>}
          </div>
        </LogoutOption>
      </nav>

      {showModal && ReactDOM.createPortal(
          <LogoutComp setShowModal={setShowModal} />,
          document.body)
      }

    </Container>
  );
}

export default LateralMenu

const getLinksByRole = (data) => {
  switch (data) {
    case "Estudiante":
      return estudianteLinks;
    case "Profesor":
      return profesorLinks;
    case "Administrador":
      return adminLinks;
    default:
      return [];
  }
};

const estudianteLinks = [
  {label: "Home", icon: <HomeIcon />, to: "home",},
  {label: "Perfil", icon: <UserIC />, to: "profile",},
  {label: "Material de apoyo", icon: <CollectionIC />, to: "material_apoyo",},
  {label: "Dashboard", icon: <DashboardIC />, to: "dashboard",},
  {label: "Mis reportes", icon: <ReportesIC />, to: "reportes",},
];
const profesorLinks = [
  {label: "Home", icon: <HomeIcon />, to: "home",},
  {label: "Perfil", icon: <UserIC />, to: "profile",},
  {label: "Reportes", icon: <ReportesIC />, to: "reportes",},
  {label: "Cursos y grupos", icon: <GroupCreationIC />, to: "cursos",},
  {label: "Material de apoyo", icon: <CollectionIC />, to: "material_apoyo",},
];
const adminLinks = [
  {label: "Home", icon: <HomeIcon />, to: "home",},
  {label: "Perfil", icon: <UserIC />, to: "profile",},
  {label: "Registro Docente", icon: <TeacherIC />, to: "registro_profesor",},
  {label: "Cursos y grupos", icon: <CursosIC />, to: "cursos",},
];
const LogoutOption = styled.div`
  margin: 1rem 0;
  cursor: pointer;
  z-index: 2000;

  @media (max-width: 768px) {
    margin: 0.5rem;
  }
  .CloseSesion{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: bold;
    transition: background-color 0.2s;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  
    &:hover {
      color: red;
      background-color: grey;
    }

    .LogoutIcon {
      font-size: 1rem;
      margin-right: ${({ isOpen }) => (isOpen ? "10px" : "0")};

      @media (max-width: 768px) {
        margin: 0;
      }
    }

    span {
      white-space: nowrap;
      margin-left: 0.5rem;

      @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 0.2rem;
        font-size: 0.7rem;
      }
    }
  }

`
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 3rem;
  overflow: hidden;
  padding-left: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }

  .Logo {
    width: 6rem;
    transition: 0.5s ease-in-out;
  }
`
const Container = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "95px")};
  transition: all 0.3s ease;
  background-color: black;
  height: 100vh;
  position: sticky;
  padding: 2rem 2rem ;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding: 0.5rem 1rem;
  }

  nav {
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
    .LinkContainer {
      margin: 1rem 0;

      @media (max-width: 768px) {
        margin: 0.5rem;
      }


      .Link {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: bold;
        transition: background-color 0.2s;

        @media (max-width: 768px) {
          flex-direction: column;
          font-size: 0.7rem;
        }

        &:hover {
          color: black;
          background-color: grey;
        }

        &.active {
          color: #3BAC52;
          border-radius: 8px;

          &:hover {
            background-color: grey;
            color: black;
          }
        }

        .LinkIcon {
          font-size: 1.2rem;
          margin-right: ${({ isOpen }) => (isOpen ? "10px" : "0")};

          @media (max-width: 768px) {
            margin: 0;
          }
        }

        span {
          white-space: nowrap;

          @media (max-width: 768px) {
            margin-top: 0.2rem;
            font-size: 0.7rem;
          }
        }
      }
    }
  }



  .SidebarButton {
    font-size: 1.3rem;
    position: absolute;
    top: 3rem;
    right: -15px;
    background: #e0e0e0;
    border-radius: 50%;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ isOpen }) => (isOpen ? "rotate(0)" : "rotate(180deg)")};
    transition: transform 0.3s;
    cursor: pointer;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  

`;


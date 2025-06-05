import styled from "styled-components"
import ProfilePicture from "./ProfilePicture";
import {device} from "../../Breakpoints/breakpoints"
import { useUser } from "../../context/UserContext";

const Profile = () => {
    const { userData } = useUser();

    if (!userData) {
        return <Container><h2>Cargando datos del usuario...</h2></Container>;
    }

    return (
    <Container>
        <h1 style={{fontSize: "3rem", marginBottom:"2rem"}}>Perfil</h1>
        <h2 style={{marginBottom:"2rem"}}>Datos básicos: {userData.rol}</h2>

        <div className="infoContainer">
            <InformativeCard>
                <p>Nombre completo: </p>
                <DataModified>{userData.name}</DataModified>

                <p>Correo institucional: </p>
                <DataModified>{userData.email}</DataModified>
            </InformativeCard>

            <ProfilePicture />
        </div>
    </Container>
    );
}

export default Profile

const Container = styled.div`
    padding: 2.5rem;
    width: 100%;
    height: 100dvh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    
    
    &::-webkit-scrollbar {
    display: none;
    }
    
    .infoContainer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        width: 100%;
        
        @media ${device.tablet} {
            flex-direction: column-reverse;
            justify-content: flex-end;
        }

        
    }
`
const InformativeCard = styled.div`
    padding: 2rem;
    border: 0.5px #999999 solid;
    border-radius: 5px;
    background-color: white;
    width: 80%;
    @media ${device.tablet} {
        width: 100%;
    }
`
const DataModified = styled.h3`
    margin: 0 1rem 1rem 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    white-space: normal;
    line-clamp: 3;
    -webkit-line-clamp: 3; /* muestra hasta 3 líneas */
    text-overflow: ellipsis;
`;

import styled from "styled-components"

const GrupoCard = ({value, onNavigate}) => {


    return (
    <Container>
        <h3 style={{marginBottom:"1rem"}}>{value}</h3>
        <InfoCont>
            <p>Grupos creados: 1</p>
            <p>Grupos activos: 1</p>
            <p>Grupos inactivos: 1</p>
        </InfoCont>
        <ButtonCurso onClick={() => onNavigate(value)}>Ver grupos asignados</ButtonCurso>

    </Container>)
}

export default GrupoCard

const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding: 1rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px #d0d0d0 solid;
    background-color: white;
`
const InfoCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
`
const ButtonCurso = styled.button`
    width: 60%;
    font-size: large;
    border-radius: 10px;
    border: 1px #d0d0d0 solid;
    margin: 1rem;
    padding: 1rem;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: #d0d0d0;
        cursor: pointer;
    }
`
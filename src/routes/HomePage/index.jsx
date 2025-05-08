import styled from "styled-components";
import HomeBackground from '../../assets/logos/homeBackground.png'

const HomePage = () => {

    const elementos = [];
    for (let i = 0; i < 40; i++) {
        elementos.push(
        <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus autem et atque animi commodi inventore dolor exercitationem minus tempora placeat aperiam cum molestias, odit accusamus ipsa voluptatum fugiat. Inventore.
        </p>
        );
    }
  
    return (
        <>
            <ContentContainer>
        
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur temporibus autem et atque animi commodi inventore dolor exercitationem minus tempora placeat aperiam cum molestias, odit accusamus ipsa voluptatum fugiat. Inventore.</p>
    
                {elementos.map((object, index) => (
                    <p>{object}</p>
                ))}
    
            </ContentContainer>

            <ImageContainer>
                <img src={HomeBackground}  className='homeBackground'/>
            </ImageContainer>
            
        
        
        </>
    )
}

export default HomePage

const ContentContainer = styled.div`
    width: 100%;
    overflow: auto;
    background-color: #c5ddf1;


    &::-webkit-scrollbar {
      display: none;
    }
`


const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    pointer-events: none;
    z-index: 0; 

    .homeBackground{
    width: 70%;
    height: auto;
    object-fit: contain;
    }
    
`
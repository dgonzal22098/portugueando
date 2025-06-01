import styled from 'styled-components';

const Privacy = () => {



    return <Background>

        <ContentCont>

            <h1>Aviso de privacidade</h1>
            <p>Última atualização: 25/05/2025</p>
            <div className="textCont">

                <p>
                    Este aviso de privacidade para <span>Portugueando</span> (que opera como um recurso acadêmico) ("nós", "nos" ou "nosso") descreve como e por que podemos coletar, armazenar, usar ou compartilhar ("processar") suas informações quando você usa nossos serviços, por exemplo, quando:
                    <ul>
                        <li>Visite nosso site em [URL do site] ou qualquer outro site nosso que tenha um link para este aviso de privacidade.</li>
                        <li>Interaja conosco de outras maneiras relacionadas, como como uma ferramenta acadêmica, participação em avaliações ou exercícios, comunicação dentro da universidade ou como uma ferramenta pedagógica.</li>
                    </ul>
                </p>

                <p>
                    Dúvidas ou preocupações? Ler este aviso de privacidade ajudará você a entender seus direitos e opções de privacidade. Se você não concordar com nossas políticas e práticas, não use nossos Serviços. Caso ainda tenha dúvidas ou preocupações, continue lendo este aviso ou entre em contato com a Ean University.
                </p>

                <h3>RESUMO DOS PONTOS PRINCIPAIS</h3>

                <p className="initial">
                    Este resumo apresenta os pontos principais do nosso aviso de privacidade. Você pode aprender mais sobre qualquer um desses tópicos clicando no link após cada ponto-chave ou consultando o índice abaixo para encontrar a seção que procura.
                </p>

                {privacyData.map((item, index) => (
                    <p key={index}>
                        <span>{item.bold}</span>
                        {item.text}
                    </p>
                ))}

            </div>
            <div className="textCont">
                <h3>ÍNDICE</h3>
                <ol>
                    {tableContent.map((item, index) => (
                        <li key={index}>
                            <a href={`#${item.anchor}`}>{item.text}</a>
                        </li>
                    ))}

                </ol>
            </div>

            <div className="contenido">
                <p id="q1" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿O QUE INFORMAÇÕES RECOPILAMOS?</h4>
                    <p style={{margin:"1rem 0 "}}>Informações pessoais que você nos divulga</p>
                    <p style={{margin:"1rem 0 "}}><span>In Short:</span>Coletamos informações pessoais que você nos fornece.<br />

                        Coletamos informações pessoais que você nos fornece voluntariamente quando se registra em nossos serviços, quando expressa interesse em obter informações sobre nós ou nossos produtos e Serviços, quando participa de atividades nos Serviços ou quando entra em contato conosco.
                    </p>
                    <p style={{margin:"1rem 0 "}}><span>Informações pessoais fornecidas por você.</span> As informações pessoais que coletamos dependem do contexto das suas interações conosco e com os Serviços, das suas escolhas e dos produtos e recursos que você utiliza. As informações pessoais que coletamos podem incluir o seguinte:
                        <ul style={{margin:"1rem"}}>
                            <li>Dados de identificação pessoal</li>
                            <li>Dados acadêmicos ou de uso educativo</li>
                            <li>Dados gerados automaticamente</li>
                            <li>Dados de comunicação</li>
                        </ul>
                    </p>
                </p>

                <p id="q2" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿COMO TRATAMOS SUA INFORMAÇÃO?</h4>
                    <p style={{margin:"1rem 0", fontStyle:"italic"}}><span>Resumindo:</span> Processamos suas informações para fornecer, aprimorar e administrar nossos Serviços, comunicar-nos com você, para fins de segurança e prevenção de fraudes, e para cumprir a lei. Também podemos processar suas informações para outros fins, mediante o seu consentimento.</p>
                    <p style={{margin:"1rem 0"}}>
                        Processamos suas informações pessoais por vários motivos, dependendo de como você interage com nossos Serviços, incluindo:
                        <ul style={{margin:"1rem"}}>
                            <li><span>Para facilitar a criação e autenticação de contas e gerenciar contas de usuários.</span> Podemos processar suas informações para que você possa criar e fazer login em sua conta, bem como mantê-la funcionando.</li>
                            <li><span>Para entregar e facilitar a entrega de serviços ao usuário.</span> Podemos processar suas informações para fornecer o serviço solicitado.</li>
                            <li><span>Para proteger nossos Serviços.</span>Podemos processar suas informações como parte de nossos esforços para manter nossos Serviços seguros e protegidos, incluindo monitoramento e prevenção de fraudes.
                            </li>
                            <li><span>Para salvar ou proteger os interesses vitais de um indivíduo.</span> Podemos processar suas informações quando necessário para salvar ou proteger os interesses vitais de um indivíduo, como para evitar danos.
                            </li>
                        </ul>

                    </p>
                    <p id="q3" className="contenido__text">
                        <h4 style={{margin:"1rem 0 "}}>¿EN QUE FUNDAMENTOS LEGAIS NOS BASAMOS PARA TRATAR SUA INFORMAÇÃO PESSOAL?</h4>
                        <p style={{margin:"1rem 0", fontStyle:"italic"}}>
                            <span>Resumindo: </span> Processamos suas informações pessoais somente quando acreditamos ser necessário e temos uma razão legal válida (ou seja, base legal) para fazê-lo sob a lei aplicável, como com seu consentimento, para cumprir leis, para lhe fornecer serviços para celebrar ou cumprir nossas obrigações contratuais, para proteger seus direitos ou para cumprir nossos interesses comerciais legítimos.

                        </p>
                        <p>Em português, tratamos seus dados pessoais de maneira responsável, ética e em conformidade com a legislação colombiana vigente, especialmente a disputa na Lei 1581 de 2012 sobre proteção de dados pessoais. O tratamento de sua informação é realizado com multas educativas e sob princípios de legalidade, finalidade, liberdade, veracidade, segurança, transparência, acesso e confidencialidade.<br />

                            Tratamos suas informações pessoais apenas quando contamos com uma base legal válida que o permite. Continuando, explicamos quais são essas bases legais:

                            <ol className="listLegal" style={{margin:"1rem 0"}}>
                                <li><span>Consentimento do titular</span><br/>
                                    Tratamos seus dados quando você, como usuário, nos autorizou seu consentimento prévio, expresso e informado, para se registrar ou usar os recursos específicos do aplicativo.
                                </li>
                                <li><span>Cumprimento de uma obrigação legal ou contratual</span><br/>
                                    Podemos tratar dados quando for necessário para cumprir as obrigações contratuais assumidas com você como usuário (por exemplo, manter sua conta ativa) ou por exigência de autoridades competentes.
                                </li>
                                <li><span>Finalidades educativas legítimas</span><br/>
                                    Utilizamos seus dados para oferecer retroalimentação, acompanhamento e análise do processo de aprendizagem, em benefício de sua formação acadêmica e linguística.
                                </li>
                                <li><span>Interesse legítimo da responsabilidade pelo tratamento</span><br/>
                                    Sempre que você não estiver vulnerável a seus direitos, podemos usar dados para melhorar a experiência do usuário, realizar análises estatísticas, prevenir fraudes ou erros do sistema e garantir a funcionalidade do aplicativo.
                                </li>
                                <li><span>Proteção de direitos vitais</span><br/>
                                    Em casos excepcionais, podemos tratar informações para proteger sua integridade ou de outros usuários, especialmente se forem detectados usos indevidos ou riscos.
                                </li>

                            </ol>

                        </p>



                    </p>

                    <p id="q4" className="contenido__text">
                        <h4 style={{margin:"1rem 0 "}}>¿CUÁNDO E COM QUIÉN COMPARTIMOS SUA INFORMAÇÃO PESSOAL?</h4>
                        <p style={{fontStyle:"italic"}}><span>Resumindo: </span> Podemos compartilhar informações em situações específicas descritas nesta seção e/ou com as seguintes categorias de terceiros.</p>
                        <p>
                            Na Portugueando, podemos compartilhar suas informações pessoais com terceiros que prestam serviços em nosso nome ou colaboram na operação, desenvolvimento e melhoria do aplicativo. Esses terceiros atuam como processadores de dados e acessam seus dados somente na medida estritamente necessária para cumprir as finalidades autorizadas.<br/>
                            Temos acordos contratuais que obrigam esses terceiros a:
                            <ul style={{margin:"2rem"}}>
                                <li>Utilize as informações somente sob nossas instruções.</li>
                                <li>Não divulgue ou compartilhe com outras organizações sem o nosso consentimento.</li>
                                <li>Aplique medidas de segurança adequadas para proteger seus dados pessoais.</li>
                                <li>Exclua ou retorne as informações depois que o serviço tiver sido prestado.</li>
                            </ul>
                            Esses terceiros são obrigados a garantir um nível de proteção equivalente ao exigido pela regulamentação colombiana sobre proteção de dados pessoais.

                        </p>
                        <ul style={{margin:"1rem"}}>
                            {categorias.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </p>


                </p>

                <p id="q5" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿QUAL É A NOSSA POSIÇÃO EM RELAÇÃO A SITES DE TERCEIROS?</h4>
                    <p style={{fontStyle:"italic"}}><span>Resumindo: </span> Não somos responsáveis ​​pela segurança de nenhuma informação que você compartilhe com terceiros com os quais possamos estabelecer links ou que anunciem em nossos Serviços, mas que não sejam afiliados aos nossos Serviços.</p>
                    <p style={{margin:"1rem 0 "}}>Os Serviços, incluindo o mural de ofertas de idiomas, o sistema de classificação de erros, os recursos de feedback para professores, os recursos interativos para aprender português e o acesso a relatórios acadêmicos personalizados, podem conter links para sites de terceiros, serviços on-line ou aplicativos móveis, ou conter anúncios de terceiros não afiliados a nós, que podem conter links para outros sites, serviços ou aplicativos. Portanto, não oferecemos nenhuma garantia em relação a esses terceiros e não seremos responsáveis ​​por qualquer perda ou dano causado pelo uso de tais sites, serviços ou aplicativos de terceiros. A inclusão de um link para um site, serviço ou aplicativo de terceiros não implica nosso endosso. Não podemos garantir a segurança ou privacidade de quaisquer dados que você forneça a terceiros. Dados coletados por terceiros não são cobertos por este aviso de privacidade. Não somos responsáveis ​​pelo conteúdo ou pelas práticas e políticas de privacidade e segurança de terceiros, incluindo quaisquer outros sites, serviços ou aplicativos que possam estar vinculados aos Serviços ou a partir deles. Recomendamos que você revise as políticas desses terceiros e entre em contato diretamente com eles para responder às suas perguntas.</p>
                </p>

                <p id="q6" className="contenido__text">

                    <h4 style={{margin:"1rem 0 "}}>¿USAMOS COOKIES E OUTRAS TECNOLOGIAS DE RASTREAMENTO?</h4>
                    <p style={{fontStyle:"italic"}}><span>Resumindo:</span> Podemos usar cookies e outras tecnologias de rastreamento para coletar e armazenar suas informações.</p>
                    <p style={{margin:"1rem 0 "}}>Podemos usar cookies e tecnologias de rastreamento semelhantes (como outros sites e pixels) para coletar informações quando você interage com nossos Serviços. Algumas tecnologias de rastreamento on-line nos ajudam a manter a segurança dos nossos Serviços e da sua conta, evitar travamentos, corrigir erros, salvar suas preferências e facilitar funções básicas do site.</p>
                </p>

                <p id="q7" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿SUAS INFORMAÇÕES SÃO TRANSFERIDAS INTERNACIONALMENTE?</h4>
                    <p style={{margin:"1rem 0 "}}>
                        Nós retemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas em nossa política de privacidade ou conforme exigido pela lei aplicável. Após esse período, suas informações serão excluídas com segurança ou anonimizadas.
                    </p>
                </p>

                <p id="q8" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿QUANTO TIEMPO CONSERVAMOS SUA INFORMAÇÃO?</h4>
                    <p style={{margin:"1rem 0 "}}>
                        <span>Resumidamente:</span> Nosso objetivo é proteger suas informações pessoais por meio de um sistema de medidas de segurança organizacionais e técnicas.
                    </p>
                    <p style={{margin:"1rem 0 "}}>Implementamos medidas de segurança técnicas e organizacionais adequadas e razoáveis, projetadas para proteger a segurança de quaisquer informações pessoais que processamos. No entanto, apesar de nossas salvaguardas e esforços para proteger suas informações, nenhuma transmissão eletrônica pela internet ou tecnologia de armazenamento de informações pode ser garantida como 100% segura. Portanto, não podemos prometer ou garantir que hackers, cibercriminosos ou terceiros não autorizados não conseguirão violar nossa segurança e coletar, acessar, roubar ou modificar indevidamente suas informações. Embora façamos o possível para proteger suas informações pessoais, a transmissão de informações pessoais de e para nossos Serviços é por sua conta e risco. Você deve acessar os Serviços somente em um ambiente seguro.</p>
                </p>

                <p id="q9" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>¿COMO MANTEMOS SEGURA SOBRE INFORMAÇÕES?</h4>
                    <p style={{margin:"1rem 0 "}}><span>Resumidamente: </span>Nosso objetivo é proteger suas informações pessoais por meio de um sistema de medidas de segurança organizacionais e técnicas.</p>
                    <p style={{margin:"1rem 0 "}}>Implementamos medidas de segurança técnicas e organizacionais adequadas e razoáveis, projetadas para proteger a segurança de quaisquer informações pessoais que processamos. No entanto, apesar de nossas salvaguardas e esforços para proteger suas informações, nenhuma transmissão eletrônica pela internet ou tecnologia de armazenamento de informações pode ser garantida como 100% segura. Portanto, não podemos prometer ou garantir que hackers, cibercriminosos ou terceiros não autorizados não conseguirão violar nossa segurança e coletar, acessar, roubar ou modificar indevidamente suas informações. Embora façamos o possível para proteger suas informações pessoais, a transmissão de informações pessoais de e para nossos Serviços é por sua conta e risco. Você deve acessar os Serviços somente em um ambiente seguro.</p>
                </p>

                <p id="q10" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>QUAIS SÃO OS SEUS DIREITOS DE PRIVACIDADE?</h4>
                    <p style={{margin:"1rem 0 "}}>
                        Na Colômbia, como proprietário de dados pessoais, você tem direitos que lhe dão maior controle sobre suas informações. Isso inclui acessar, atualizar, corrigir e excluir seus dados pessoais, bem como a capacidade de revogar a autorização concedida para seu processamento. <br/>

                        De acordo com a legislação colombiana vigente, em particular a Lei 1581 de 2012 e o Decreto 1377 de 2013, você tem os seguintes direitos:

                        <ol style={{margin:"2rem"}}>
                            <li>Conheça, atualize e retifique seus dados pessoais junto aos responsáveis ​​ou encarregados de tratá-los.</li>
                            <li>Solicitar comprovação da autorização concedida, exceto nos casos em que não seja exigida.</li>
                            <li>Ser informado, mediante solicitação, sobre o uso que foi dado aos seus dados pessoais.</li>
                            <li>Apresentar queixas à Superintendência da Indústria e Comércio por violações das disposições da lei.</li>
                            <li>Revogar a autorização e/ou solicitar a eliminação dos seus dados quando não forem respeitados os princípios, direitos e garantias constitucionais e legais.</li>
                            <li>Acesse seus dados pessoais que foram processados ​​gratuitamente.</li>
                        </ol>
                    </p>
                </p>

                <p id="q11" className="contenido__text">
                    <h4 style={{margin:"1rem 0 "}}>ATUALIZAMOS ESTE AVISO?</h4>
                    <p style={{margin:"1rem 0 "}}><span>Resumidamente: </span>Sim, atualizaremos este aviso conforme necessário para permanecer em conformidade com as leis relevantes.</p>
                    <p style={{margin:"1rem 0 "}}>Podemos atualizar este aviso de privacidade periodicamente. A versão atualizada será indicada por uma data de "Revisado" atualizada na parte superior deste aviso de privacidade. Se fizermos alterações materiais neste aviso de privacidade, poderemos notificá-lo publicando um aviso de tais alterações em local visível ou enviando-lhe uma notificação diretamente. Recomendamos que você revise este aviso de privacidade com frequência para se manter informado sobre como estamos protegendo suas informações.</p>
                </p>

            </div>

        </ContentCont>

    </Background>
}

export default Privacy;

const categorias = [
    "Serviços de computação na nuvem e hospedagem na web",
    "Ferramentas de comunicação e colaboração interna",
    "Provedores de armazenamento de dados",
    "Plataformas de análise e monitoramento de rendimento",
    "Ferramentas para gerenciamento de usuários, autenticação e contas",
    "Pasarelas de pagamento (em caso de compras dentro do app)",
    "Plataformas de envio de notificações ou correios eletrônicos",
    "Ferramentas de desenvolvimento, teste e design de produto",
    "Autoridades governamentais ou judiciais (somente se houver um requisito legal)"
]
const tableContent = [
    {
        text:"¿O QUE INFORMAÇÕES RECOPILAMOS?",
        anchor:"q1"
    },
    {
        text:"¿COMO TRATAMOS SUA INFORMAÇÃO?",
        anchor:"q2"
    },
    {
        text:"¿EN QUE FUNDAMENTOS LEGAIS NOS BASAMOS PARA TRATAR SUA INFORMAÇÃO PESSOAL?",
        anchor:"q3"
    },
    {
        text:"¿CUÁNDO E COM QUIÉN COMPARTIMOS SUA INFORMAÇÃO PESSOAL?",
        anchor:"q4"
    },
    {
        text:"¿Qual é a nossa postura com respeito aos locais da web de terceiros?",
        anchor:"q5"
    },
    {
        text:"¿UTILIZAMOS COOKIES E OUTRAS TECNOLOGIAS DE RASTREO?",
        anchor:"q6"
    },
    {
        text:"¿SE TRANSFIERE SU INFORMACIÓN INTERNACIONALMENTE?",
        anchor:"q7"
    },
    {
        text:"¿QUANTO TIEMPO CONSERVAMOS SUA INFORMAÇÃO?",
        anchor:"q8"
    },
    {
        text:"¿COMO MANTEMOS SEGURA SOBRE INFORMAÇÕES?",
        anchor:"q9"
    },
    {
        text:"¿CUÁLES SON SUS DERECHOS DE PRIVACIDAD?",
        anchor:"q10"
    },
    {
        text:"¿ATUALIZAMOS ESTE AVISO?",
        anchor:"q11"
    },

]
const privacyData = [
    {
        bold: "Quais informações pessoais processamos?",
        text: "Quando você visita, utiliza ou navega por nossos Serviços, podemos processar informações pessoais dependendo de como você interage conosco e com os Serviços, das decisões que toma e dos produtos e funcionalidades que utiliza."
    },
    {
        bold: "Processamos informações pessoais sensíveis?",
        text: "Podemos processar informações pessoais sensíveis quando necessário com o seu consentimento ou conforme permitido pela legislação aplicável."
    },
    {
        bold: "Coletamos informações de terceiros?",
        text: "Podemos coletar informações de bancos de dados públicos, parceiros de marketing, redes sociais e/ou outras fontes externas."
    },
    {
        bold: "Como processamos suas informações?",
        text: "Processamos suas informações para fornecer, melhorar e administrar nossos Serviços, nos comunicar com você, por motivos de segurança e prevenção de fraudes e para cumprir a legislação. Também podemos processar suas informações para outros fins com o seu consentimento. Processamos suas informações apenas quando temos uma base legal válida para isso."
    },
    {
        bold: "Em que situações e com quais tipos de terceiros compartilhamos informações pessoais?",
        text: "Podemos compartilhar informações em situações específicas e com categorias específicas de terceiros."
    },
    {
        bold: "Como mantemos suas informações seguras?",
        text: "Temos processos e procedimentos organizacionais e técnicos para proteger suas informações pessoais. No entanto, nenhuma transmissão eletrônica pela internet ou tecnologia de armazenamento de informações pode ser garantida como 100% segura, por isso não podemos prometer ou garantir que hackers, cibercriminosos ou outros terceiros não autorizados não possam violar nossa segurança e acessar, roubar ou modificar suas informações de forma indevida."
    },
    {
        bold: "Quais são os seus direitos?",
        text: "Dependendo da sua localização geográfica, a legislação de privacidade aplicável pode implicar que você tenha certos direitos em relação às suas informações pessoais."
    }
];

const Background = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 3rem 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
`
const ContentCont = styled.div`
    width: 75%;
    height: 100dvh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    span{
        font-weight: bold;
    }
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    .listLegal{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .textCont{
        width: 100%;
        text-align: justify;
        padding: 1rem;
        
        .initial{
            font-weight: bold;
        }
        
        
        p, h3{
            margin-bottom: 1rem;
        }
        
        p span {
            font-weight: bold;
        }
        
        p ul {
            margin-left: 2rem ;
            list-style: disc;
            
            li{
                margin: 1rem 0;
            }
            
        }
    }
    
`
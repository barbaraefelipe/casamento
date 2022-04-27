import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row, Modal, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Countdown from '../components/Countdown';
import wedding from './../images/wedding.jpeg';
import init from './../images/init.jpeg';
import frame from './../images/frame.png';
import couple from './../images/history.png';

const Wedding = () => {
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentKey = (new URLSearchParams(window.location.search)).get('key');
        setKey(currentKey);
    });

    const goToRSVP = () => {
        if (!key) {
            toast.error('Abra o link de convite', {
                theme: 'colored'
            });
            return;
        }
        navigate(`/rsvp?key=${key}`);
    }

    const goToAdmin = () => {
        const auth = window.prompt("Digite a chave");
        if (!auth) {
            return;
        }
        navigate(`/admin?auth=${auth}`);
    }

    return (<Container className='pt-4 pb-4'>
        <h2 className="sub-title">
            <span className="text-center">
                <span className="text-center" onClick={goToAdmin}>Casamento</span>
            </span>
        </h2>
        <Row className='m-4'>
            {key && <Col md>
                <div className='name'>
                    <span>🎯 Confirmação de presença</span>
                </div>
                <div className='info text-center' style={{ marginBottom: 40 }}>
                    <span>Clique aqui para confirmar sua presença</span>
                </div>
                <div className='text-center'>
                    <Button className='wedding-btn' onClick={goToRSVP}>Confirmar</Button>
                </div>
            </Col>}
            <Col md>
                <div className='name'>
                    <span>🎁 Lista de Presentes</span>
                </div>
                <div className='info text-center' style={{ marginBottom: 40 }}>
                    <span>Gratidão por nos ajudar a realizar nosso sonho</span>
                </div>
                <div className='text-center'>
                    <Link className='btn btn-primary wedding-btn' to="/gifts">Contribuir</Link>
                </div>
            </Col>
        </Row>
    </Container>);
};

const Info = () => <Container className='pt-4 pb-4'>
    <h2 className="sub-title">
        <span className="text-center">
            <span className="text-center">Cerimônia</span>
        </span>
    </h2>
    <Row className='p-4'>
        <Col md>
            <Card className='mb-3 bg-card-info'>
                <Card.Body className='details'>
                    <Card.Title className='text-center mb-4'>
                        <i className='fas fa-exclamation-triangle warning'></i>
                        <span className='details-title mx-1'>Informações adicionais</span>
                        <i className='fas fa-exclamation-triangle warning'></i>
                    </Card.Title>
                    <ul>
                        <li>Sonhamos em ter um casamento na luz do dia, finalizando ao pôr do sol</li>
                        <li>Como o nosso casamento acontecerá no dia 11/06/2022 (véspera do dia
                            dos namorados) a estação será inverno, assim os dias
                            são mais curtos. Pedimos por gentileza, a <strong>pontualidade</strong> de estar no local
                            do evento às 15:30</li>
                        <li>O casamento será ao ar livre na chácara Recanto das Flores, então
                            para o seu conforto lembrar de usar salto grosso ou tênis, se
                            preferir</li>
                        <li>Também faz frio, não esquecer de levar um casaco elegante ou
                            uma pashmina</li>
                        <li>Treje Fino</li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
        <Col md>
            <Card className='mb-3 bg-card-info'>
                <Card.Body>
                    <Card.Title>⏱ Data</Card.Title>
                    <div className='info'>
                        <span>11/06/2022 às 15:30</span>
                    </div>
                </Card.Body>
            </Card>
            <Card className='bg-card-info'>
                <Card.Body>
                    <Card.Title>🚙 Localização</Card.Title>
                    <Card.Subtitle className='mb-2'>Recanto das Flores</Card.Subtitle>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8693.776728464156!2d-48.096756657611664!3d-15.674484754093141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bb4d82ccfc03d%3A0x46cca1321150c0dd!2sRecanto%20das%20Flores!5e0!3m2!1spt-BR!2sbr!4v1647010446488!5m2!1spt-BR!2sbr"
                        title='Recanto das Flores'
                        style={{
                            border: 0,
                            width: '100%',
                            height: 300
                        }}
                        loading="lazy">
                    </iframe>
                </Card.Body>
            </Card>
        </Col>
    </Row>
</Container>

const History = () => <Container className='pt-4 pb-4'>
    <h2 className="sub-title">
        <span className="text-center">
            <span className="text-center">Nossa história</span>
        </span>
    </h2>
    <Row className='p-2'>
        <Col className='text-center p-2 d-flex ' md={4}>
            <Image className='pic-history vertical-center' src={init} roundedCircle fluid />
        </Col>
        <Col className='p-2 d-flex' md={1}>
            <span className='heart blink'>💓</span>
        </Col>
        <Col className='p-2 d-flex' md={7}>
            <Card className='m-auto bg-card'>
                <Card.Body>
                    <Card.Title>Como tudo começou</Card.Title>
                    <Card.Subtitle className='mb-3 text-muted'>20/08/2011</Card.Subtitle>
                    <div className='info'>
                        <p>Já foram muitas idas e vindas, encontros e desencontros.
                            Após o nosso primeiro namoro que durou apenas 6 meses,
                            ficamos alguns anos sem nem trocar uma mensagem, até
                            que por forças maiores de algoritmo, o Facebook nos
                            recomendou e retornamos a amizade por ali mesmo. Após
                            algumas trocas de mensagens, decidimos nos encontrar
                            apenas para conversar. A partir desse reencontro,
                            vimos o quanto tínhamos carinho um pelo outro e no
                            dia 20/08/2011 decidimos namorar mais uma vez.</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row className='p-2'>
        <Col className='text-center p-2 d-flex order-md-3' md={4}>
            <Image className='pic-history vertical-center' src={couple} roundedCircle fluid />
        </Col>
        <Col className='p-2 d-flex order-md-2' md={1}>
            <span className='heart blink'>💓</span>
        </Col>
        <Col className='p-2 d-flex order-md-1' md={7}>
            <Card className='m-auto bg-card'>
                <Card.Body>
                    <Card.Title>Nosso noivado</Card.Title>
                    <Card.Subtitle className='mb-3 text-muted'>12/12/2018</Card.Subtitle>
                    <div className='info'>
                        <p>Desde então, já se passaram mais de 10 anos, houve
                            várias turbulências nesse período, mas sempre
                            reatamos. Já namoramos a distância, fizemos faculdade,
                            trabalhamos em vários lugares, abrimos empresa, falimos
                            empresa, mudamos de casa, nos noivamos em 2018... Houve
                            tantas mudanças, nós mesmos mudamos tanto nesse tempo,
                            mas há algo que sempre permaneceu constante: A fé que
                            temos um no outro, no nosso amor.</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    <Row className='p-2'>
        <Col className='text-center p-2 d-flex' md={4}>
            <Image className='pic-history vertical-center' src={wedding} roundedCircle fluid />
        </Col>
        <Col className='p-2 d-flex' md={1}>
            <span className='heart blink'>💓</span>
        </Col>
        <Col className='p-2 d-flex' md={7}>
            <Card className='m-auto bg-card'>
                <Card.Body>
                    <Card.Title>Nosso casamento</Card.Title>
                    <Card.Subtitle className='mb-3 text-muted'>11/06/2022</Card.Subtitle>
                    <div className='info'>
                        <p>São tantos sentimentos e histórias envolvidas que
                            queremos compartilhar com as pessoas que mais amamos.
                            É por isso que estamos te convidando para presenciar
                            a nossa união, o nosso casamento no dia 11/06/2022,
                            mais um capítulo importante da nossa história.</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
</Container>

const Engaged = () => <Container className='pt-4 pb-4'>
    <h2 className="sub-title">
        <span className="text-center">
            <span className="text-center">Noiva · Noivo</span>
        </span>
    </h2>
    <Row className='p-4'>
        <Col md>
            <Image className='girl' src={frame} fluid />
            <div className='name'>
                <span>Bárbara Thaís 👰🏻</span>
            </div>
            <div className='info text-center'>
                <span>Não há outro lugar no mundo que eu queira mais estar, que não seja ao lado deste homem</span>
            </div>
        </Col>
        <Col md>
            <Image className='boy' src={frame} fluid />
            <div className='name'>
                <span>Felipe Martins 🤵🏻</span>
            </div>
            <div className='info text-center'>
                <span>Hoje eu sei que eu não te esperei, eu te acompanhei e desejo que continuemos assim, minha companheira</span>
            </div>
        </Col>
    </Row>
</Container>

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            show: null,
        };
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        images = Object.values(images);
        images = this.shuffle(images);
        return images;
    }

    componentDidMount = () => {
        const images = this.importAll(require.context('/src/photos', false, /\.(png|jpe?g|svg)$/));
        const colsLen = 3;
        const itemsPerCol = Math.floor(images.length / colsLen) + 1;
        const rows = [];
        let count = 0;
        for (let i = 0; i < colsLen; i++) {
            const row = [];
            for (let j = 0; j < itemsPerCol; j++) {
                if (count < images.length) {
                    row.push(images[count]);
                    count++;
                }
            }
            rows.push(row);
        }
        this.setState({ rows })
    }

    render() {
        return <>
            <Container className='pt-4 pb-4'>
                <h2 className="sub-title">
                    <span className="text-center">
                        <span className="text-center">Fotos</span>
                    </span>
                </h2>
                <Row>
                    {this.state.rows.map((r, i) => <Col key={`photo-${i}`} md>
                        {i === 0 && <iframe width="100%" height="315" src="https://www.youtube.com/embed/dhXkpaSZX6U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; modestbranding; picture-in-picture" allowfullscreen></iframe>}
                        {r.map((image, j) => <Image
                            key={`photo-${i}-${j}`}
                            src={image}
                            onClick={() => this.setState({ show: image })}
                            style={{
                                width: '100%',
                                paddingBottom: 10
                            }} />)}
                    </Col>)}
                </Row>
            </Container>
            <Modal show={this.state.show !== null} onHide={() => this.setState({ show: null })} size="lg">
                <Image
                    src={this.state.show}
                    onClick={() => this.setState({ show: null })}
                />
            </Modal>
        </>
    }
}

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_URL}/gifts`);
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <>
                <div>
                    <Confetti
                        width={this.state.width - 20}
                        height={this.state.height}
                        colors={['#ffebfd']}
                        numberOfPieces={50}
                        drawShape={ctx => {
                            ctx.beginPath();
                            ctx.arc(10, 10, 10, 0, 2 * Math.PI);
                            ctx.fill()
                        }}
                        style={{
                            position: 'fixed',
                            top: 0
                        }}

                    />
                    <div className='section'>
                        <div className="box">
                            <h2 style={{
                                fontFamily: 'Amaranth'
                            }}>Bárbara &#38; Felipe</h2>
                            <Countdown />
                            <h3 className='mt-1'>11/06/2022</h3>
                        </div>
                    </div>
                </div>
                <Engaged />
                <div className='bg-light'>
                    <Wedding />
                </div>
                <Info />
                <div className='bg-light'>
                    <History />
                </div>
                <Photos />
            </>
        );
    }
}
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row, Spinner } from 'react-bootstrap';
import ConfettiExplosion from 'react-confetti-explosion';
import sold from './../images/sold.png';
import { useMercadopago } from 'react-sdk-mercadopago';
import { toast } from 'react-toastify';

const BuyButton = ({ gift }) => {

    const mercadopago = useMercadopago.v2('APP_USR-d3bc297e-df02-4b7f-9dd7-96bf901a463d', {
        locale: 'pt-BR',
        advancedFraudPrevention: false
    });

    useEffect(() => {
        if (mercadopago) {
            mercadopago.checkout({
                preference: {
                    id: gift.preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Comprar',
                    onsubmit: (event) => {
                        event.preventDefault();
                        console.log('CardForm data available: ')
                    },
                    callbacks: {
                        onsubmit: (event) => {
                            event.preventDefault();
                            console.log('CardForm data available: ')
                        },
                    }
                }
            })
        }
    }, [mercadopago]);

    return (<div className="cho-container"></div>)
}

const Checkout = ({ gift }) => {
    let [tab, setTab] = useState(0);
    let [show, setShow] = useState(true);
    let [name, setName] = useState('');
    let [phone, setPhone] = useState('');
    let [message, setMessage] = useState('');
    let [valid, setValid] = useState(false);
    let [validMessage, setValidMessage] = useState(false);

    const handleClose = () => setShow(false);

    const handleChange = (value, setValue) => {
        setValue(value);
        setValid(name.trim().length > 0 && phone.trim().length > 0);
    }

    const buy = async () => {
        setValidMessage(false)
        if (!valid) {
            setValidMessage(true)
        } else {
            let form = {
                buyerName: name,
                buyerPhone: phone,
                buyerMessage: message,
            }
            let req = await fetch(`${process.env.REACT_APP_URL}/gifts/${gift.id}/buyer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (req.ok) {
                setTab(1)
            } else {
                toast('Erro: ' + req.statusText)
            }
            //let url = `https://www.mercadopago.com.br/payment-link/v1/redirect?preference-id=${gift.preferenceId}&source=link`
            //window.open(url, "_blank");
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>🤵🏻 Gratidão por contribuir com nosso casamento 👰🏻</Modal.Title>
            </Modal.Header>
            {tab === 0 && <>
                <Modal.Body>
                    <Card.Img variant='top' src={gift.photo} />
                    <Card.Title className='gift-title'>{gift.name} - {gift.price.toFixed(2).replace('.', ',')} R$</Card.Title>
                    <div className="row mt-2">
                        <div className="col">
                            <div className="form-group">
                                <label>Nome</label>
                                <input className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => handleChange(e.target.value, setName)} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Telefone</label>
                                <input className="form-control"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => handleChange(e.target.value, setPhone)} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <div className="form-group">
                                <label>Mensagem (Opcional)</label>
                                <textarea className="form-control"
                                    type="text"
                                    rows="3"
                                    placeholder="Caso queira nos enviar uma mensagem junto ao presente"
                                    value={message}
                                    onChange={(e) => handleChange(e.target.value, setMessage)} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {validMessage && <span className='text-danger'>Preencha os campos</span>}
                    <button className={valid ? "btn btn-info" : "btn btn-outline-info"} onClick={buy}>Avançar</button>
                </Modal.Footer>
            </>}
            {tab === 1 && <>
                <Modal.Body>
                    <h5>Pagamento por <strong>PIX</strong> utilize essa chave</h5>
                    <h5>CPF <strong>034.588.711-52</strong></h5>
                    <h5><strong>Outras formas de pagamento</strong>, como cartão de crédito, parcelar em até 12 vezes, boleto ou outras formas de pagamento <strong>clique no botão</strong> azul COMPRAR a baixo.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <BuyButton gift={gift} />
                </Modal.Footer>
            </>}
        </Modal>
    )
}

class GiftCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conffeti: false,
        }
    }

    buy = () => {
        if (!this.state.conffeti) {
            this.setState({ conffeti: true });
            setTimeout(() => {
                this.props.setGift(this.props.gift);
                this.setState({ conffeti: false });
            }, 3000);
        }
    }

    render() {
        let gift = this.props.gift;
        if (gift.buy) {
            return <Col md><Card className='gift m-2'>
                <div style={{
                    width: '100%',
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                }}>
                    <img style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        margin: '0 auto',
                    }} src={gift.photo} />
                    <img style={{
                        position: 'absolute',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        margin: '0 auto',
                    }} src={sold} />
                </div>
                <Card.Body>
                    <Card.Title className='gift-title'>{gift.name}</Card.Title>
                    <Card.Text>Preço: {gift.price.toFixed(2).replace('.', ',')}</Card.Text>
                    <span className='btn btn-outline-success'>Uhuul 🎉</span>
                </Card.Body>
            </Card></Col>
        } else {
            return <Col md><Card className='gift m-2'>
                <div style={{
                    width: '100%',
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                }}>
                    <img style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        margin: '0 auto',
                    }} src={gift.photo} />
                </div>
                <Card.Body>
                    <Card.Title className='gift-title'>{gift.name}</Card.Title>
                    <Card.Text>Preço: {gift.price.toFixed(2).replace('.', ',')}</Card.Text>
                    <Button disabled={this.state.conffeti} onClick={this.buy}>
                        {this.state.conffeti && <>
                            <ConfettiExplosion />
                            <Spinner animation="border" variant="light" style={{
                                width: '1rem',
                                height: '1rem',
                            }} />
                        </>}
                        <span> Contribuir</span>
                    </Button>
                </Card.Body>
            </Card></Col>
        }
    }
}

export default class Gifts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [[]],
            gift: null,
        };
    }

    setGift = (gift) => {
        this.setState({ gift });
    }

    componentDidMount = async () => {
        let req = await fetch(`${process.env.REACT_APP_URL}/gifts`);
        let gifts = await req.json();
        const itemsPerRow = 4;
        const rows = [];
        for (let i = 0; i < gifts.length; i += itemsPerRow) {
            const row = [];
            for (let j = 0; j < itemsPerRow; j++) {
                const index = i + j;
                if (index < gifts.length) {
                    row.push(gifts[index]);
                } else {
                    row.push(null);
                }
            }
            rows.push(row);
        }
        this.setState({ rows })
    }

    render() {
        return (
            <>
                <Container className='pt-4 pb-4'>
                    <h2 className="sub-title">
                        <span className="text-center">
                            <span onClick={this.btn} className="text-center">Lista de Presentes</span>
                        </span>
                    </h2>
                    <div className='text-center'>
                        <h5>Ficamos pobres depois do casamento, ajuda nois aí 😂😂😂</h5>
                        <h5>Da até para parcelar em <strong>12x</strong> no cartão 🕺💃</h5>
                    </div>
                    {this.state.gift && <Checkout gift={this.state.gift} />}
                    <div className='p-4'>
                        {this.state.rows.map((row, i) => <Row key={`row-${i}`} className="row-eq-height">
                            {row.map((item, j) => {
                                if (item === null) {
                                    return <Col key={`col-${i}-${j}`} md></Col>
                                } else {
                                    return <Col key={`col-${i}-${j}`} md><GiftCard gift={item} setGift={this.setGift} /></Col>
                                }
                            })}
                        </Row>)}
                    </div>
                </Container>
            </>
        );
    }
}

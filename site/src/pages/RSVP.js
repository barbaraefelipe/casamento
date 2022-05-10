import React from 'react';
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

class EditInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            invite: {
                id: '',
                name: '',
                email: '',
                key: '',
                confirmed: false,
                invitations: [{ name: '', age: 0, isChild: false }]
            },
            index: 0,
            name: '',
            email: '',
            age: 0,
            isChild: false,
        };
    }

    show = async (index, invite = { id: '', name: '', email: '', key: '', confirmed: false, invitations: [] }) => {
        let guest = {
            name: '',
            email: '',
            age: 0,
            isChild: false,
        };
        invite.invitations.forEach((g, i) => {
            if (i === index) {
                guest.name = g.name;
                guest.email = g.email;
                guest.age = g.age;
                guest.isChild = g.isChild;
            }
        })
        this.setState({
            showModal: true,
            index,
            invite,
            ...guest
        });
    }

    handleClose = async () => {
        await this.setState({ showModal: false });
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    submit = async (event) => {
        event.preventDefault();
        let invite = this.state.invite;
        invite.invitations.forEach((guest, i) => {
            if (i === this.state.index) {
                guest.name = this.state.name;
                guest.email = this.state.email;
                guest.age = this.state.age;
                guest.isChild = this.state.isChild;
            }
        })
        await fetch(`${process.env.REACT_APP_URL}/families/${invite.key}/confirmation`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invite)
        });
        await this.handleClose();
    }

    handleChange = (event) => {
        let state = this.state
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        state[event.target.name] = value
        this.setState({ state })
    }

    render() {
        return (<Modal show={this.state.showModal} onHide={this.handleClose} size="lg" centered>
            <ModalHeader closeButton>
                <ModalTitle>Convite</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <div className='checkbox'>
                            <input
                                className='m-1'
                                id='checkbox1'
                                type="checkbox"
                                name="isChild"
                                checked={this.state.isChild}
                                onChange={this.handleChange} />
                            <label htmlFor='checkbox1'>Convidado é menor de idade</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control"
                                type="text"
                                placeholder="Digite o nome"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                {this.state.isChild && <div className="row">
                    <div className="col">
                        <div className="form-group mt-4">
                            <label>Idade</label>
                            <input className="form-control"
                                type="text"
                                placeholder="Idade"
                                name="age"
                                value={this.state.age}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                </div>}
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={this.submit}>Salvar</button>
                <button className="btn btn-secondary" onClick={this.handleClose}>Cancelar</button>
            </ModalFooter>
        </Modal>)
    }
}

export default class RSVP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            key: '',
            confirmed: false,
            invitations: [{ name: '', age: 0, isChild: false }]
        };
    }

    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        const key = (new URLSearchParams(window.location.search)).get('key')
        if (!key) {
            toast.error('key not found', { theme: 'colored' });
        }
        try {
            let req = await fetch(`${process.env.REACT_APP_URL}/families/${key}/confirmation`);
            let family = await req.json();
            console.log(family)
            this.setState(family);
        } catch (err) {
            this.setState({ invitations: [] });
            toast.error('Convite inválido', { theme: 'colored' });
            toast.error('Convite inválido', { theme: 'colored' });
            toast.error('Convite inválido', { theme: 'colored' });
            toast.error('Convite inválido', { theme: 'colored' });
            toast.error('Convite inválido', { theme: 'colored' });
        }
    }

    render() {
        return (
            <>
                <Container className='pt-4 pb-4'>
                    <h2 className="sub-title">
                        <span className="text-center">
                            <span className="text-center">Confirmação de presença</span>
                        </span>
                    </h2>
                    <strong className='text-center'>
                        <h4>Você possui {this.state.invitations.length} convites</h4>
                    </strong>
                    <div className='text-center'>
                        <h5>Preencha os dados dos convidados abaixo. Caso tenha alguma dúvida entre em contato conosco.</h5>
                    </div>
                    <Table className='mt-4'>
                        <thead><tr>
                            <th>N</th>
                            <th>Convidados</th>
                            <th>Editar</th>
                        </tr></thead>
                        <tbody>
                            {this.state.invitations.map((invite, i) => <tr key={`invite-${i}`}>
                                <td>{i + 1}</td>
                                <td>{invite.name}</td>
                                <td><Button onClick={() => this.editInvite.show(i, this.state)}>🖊</Button></td>
                            </tr>)}
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <div className='name'>
                                <span>📒 Salve o evento na sua agenda</span>
                            </div>
                            <div className='text-center'>
                                <a className='btn btn-primary wedding-btn' target="_blank" href="https://www.google.com/calendar/render?action=TEMPLATE&text=Casamento+B%C3%A1rbara+%26+Felipe&location=https%3A%2F%2Fgoo.gl%2Fmaps%2Fr4s1YHGPqynjcfiHA&dates=20220611T183000Z%2F20220612T010000Z">Salvar</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <EditInvite ref={ref => this.editInvite = ref} onClose={this.load} />
            </>
        );
    }
}

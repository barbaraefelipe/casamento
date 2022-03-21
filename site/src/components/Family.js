import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default class Family extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            id: '',
            name: '',
            key: '',
            confirmed: false,
            invitations: [{ name: '', email:'', age: 0, isChild: false }]
        };
    }

    show = async (family = { id: '', name: '', key: '', confirmed: false, invitations: [] }) => {
        this.setState({
            showModal: true,
            ...family
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
        const authResult = new URLSearchParams(window.location.search);
        const auth = authResult.get('auth')
        if (!auth) {
            toast.error('auth not found');
        }
        let state = this.state;
        if (state.id) {
            if (state.invitations.length === 0) {
                await fetch(`${process.env.REACT_APP_URL}/families/${state.id}?auth=${auth}`, {
                    method: 'DELETE',
                });
            } else {
                await fetch(`${process.env.REACT_APP_URL}/families/${state.id}?auth=${auth}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: state.name,
                        key: state.key,
                        invitations: state.invitations,
                    })
                });
            }
        } else {
            await fetch(`${process.env.REACT_APP_URL}/families?auth=${auth}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: state.name,
                    key: state.key,
                    invitations: state.invitations,
                })
            });
        }
        await this.handleClose();
    }

    handleChange = (event) => {
        let state = this.state
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        state[event.target.name] = value
        this.setState({ state })
    }

    inviteHandleChange = (index, field, value) => {
        let invitations = this.state.invitations
        invitations[index][field] = value;
        this.setState({ invitations })
    }

    newInvite = () => {
        let invitations = this.state.invitations
        invitations.push({ name: '', age: 0, confirmed: false });
        this.setState({ invitations })
    }

    delInvite = () => {
        let invitations = this.state.invitations
        invitations.pop();
        this.setState({ invitations })
    }

    render() {
        return (<Modal show={this.state.showModal} onHide={this.handleClose} size="lg" centered>
            <ModalHeader closeButton>
                <ModalTitle>Confirmação de presença</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control"
                                type="text"
                                placeholder="Título"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Key</label>
                            <input className="form-control"
                                type="text"
                                placeholder="Chave"
                                name="key"
                                disabled={!this.state.id}
                                value={this.state.key}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col">
                        <div className='checkbox'>
                            <input
                                id='checkbox1'
                                type="checkbox"
                                name="confirmed"
                                value={this.state.confirmed}
                                onChange={this.handleChange} />
                            <label htmlFor='checkbox1'>Confirmado</label>
                        </div>
                    </div>
                </div>
                <Table>
                    <thead><tr>
                        <th>Convidados</th>
                        <th>Idade</th>
                        <th>Criança</th>
                    </tr></thead>
                    <tbody>
                        {this.state.invitations.map((invite, i) => <tr key={`invite-${i}`}>
                            <td><input className="form-control"
                                type="text"
                                placeholder="Nome"
                                value={invite.name}
                                onChange={(e) => this.inviteHandleChange(i, 'name', e.target.value)} /></td>
                            <td><input className="form-control"
                                type="number"
                                placeholder="Idade"
                                value={invite.age}
                                onChange={(e) => this.inviteHandleChange(i, 'age', e.target.value)} /></td>
                            <td><input
                                type="checkbox"
                                checked={invite.isChild}
                                onChange={(e) => this.inviteHandleChange(i, 'isChild', e.target.checked)} /></td>
                        </tr>)}
                    </tbody>
                </Table>
                <button className="btn btn-primary mx-1" onClick={this.newInvite}>+</button>
                <button className="btn btn-danger mx-1" onClick={this.delInvite}>-</button>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={this.submit}>OK</button>
                <button className="btn btn-secondary" onClick={this.handleClose}>Cancel</button>
            </ModalFooter>
        </Modal>)
    }
}

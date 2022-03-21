import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default class Gift extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            id: '',
            name: '',
            photo: '',
            price: 0,
            buy: false,
        };
    }

    show = async (gift = { id: '', buy: false, name: '', price: 0, photo: '' }) => {
        this.setState({
            showModal: true,
            ...gift
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
            await fetch(`${process.env.REACT_APP_URL}/gifts/${state.id}?auth=${auth}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: state.name,
                    photo: state.photo,
                    price: parseFloat(state.price),
                    buy: state.buy,
                })
            });
        } else {
            await fetch(`${process.env.REACT_APP_URL}/gifts?auth=${auth}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: state.name,
                    photo: state.photo,
                    price: parseFloat(state.price),
                    buy: state.buy,
                })
            });
        }
        await this.handleClose();
    }

    del = async (event) => {
        event.preventDefault();
        const authResult = new URLSearchParams(window.location.search);
        const auth = authResult.get('auth')
        if (!auth) {
            toast.error('auth not found');
        }
        let state = this.state;
        if (state.id) {
            await fetch(`${process.env.REACT_APP_URL}/gifts/${state.id}?auth=${auth}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
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

    render() {
        return (<Modal show={this.state.showModal} onHide={this.handleClose} size="lg" centered>
            <ModalHeader closeButton>
                <ModalTitle>Confirmação de presença</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Preço</label>
                            <input className="form-control"
                                type="number"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Foto</label>
                            <input className="form-control"
                                type="text"
                                name="photo"
                                value={this.state.photo}
                                onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className='checkbox m-4'>
                            <input
                                className='m-1'
                                id='checkbox'
                                type="checkbox"
                                name="buy"
                                checked={this.state.buy}
                                onChange={this.handleChange} />
                            <label htmlFor='checkbox'>Comprado</label>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' style={{ marginRight: 'auto' }} onClick={this.del}>DELETE</button>
                <button className="btn btn-secondary" onClick={this.handleClose}>Cancel</button>
                <button className="btn btn-primary" onClick={this.submit}>OK</button>
            </ModalFooter>
        </Modal>)
    }
}

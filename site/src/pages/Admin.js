import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Family from '../components/Family';
import Gift from '../components/Gift';

const URL = 'https://barbaraefelipe.github.io/casamento/';

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gifts: [],
            families: [],
            totalInvits: 0,
            totalChild: 0,
            totalConfirmed: 0,
            totalGifts: 0,
            totalReceived: 0,
        };
    }

    componentDidMount = () => {
        this.load()
    }

    load = async () => {
        const authResult = new URLSearchParams(window.location.search);
        const auth = authResult.get('auth')
        if (!auth) {
            toast.error('auth not found');
        }
        let req;
        req = await fetch(`${process.env.REACT_APP_URL}/families?auth=${auth}`);
        let families = await req.json();
        req = await fetch(`${process.env.REACT_APP_URL}/gifts?auth=${auth}`);
        let gifts = await req.json();
        console.log(gifts, families);
        let totalInvits = 0;
        let totalChild = 0;
        let totalConfirmed = 0;
        families.forEach(f => {
            totalInvits += f.invitations.filter(i => !i.isChild).length;
            totalChild += f.invitations.filter(i => i.isChild).length;
            totalConfirmed += f.invitations.filter(i => i.name.length > 0).length;
        })
        let totalGifts = 0;
        let totalReceived = 0;
        gifts.forEach(g => {
            totalGifts += g.price;
            if (g.buy) {
                totalReceived += g.price;
            }
        })
        this.setState({
            families,
            gifts,
            totalInvits,
            totalChild,
            totalConfirmed,
            totalGifts,
            totalReceived,
        })
    }

    copyToClipboard = (key) => {
        let text = '';
        text += '👰🏻‍♀️🤵🏻 _Oie, aqui é a Bárbara e o Felipe!_\n\n';
        text += '💍 _É com muita alegria no coração que nós te convidamos para nossa cerimônia de casamento no dia *11/06/2022 às 15:30* (Véspera dos dias dos namorados). Vai ser um dia muito especial em nossas vidas e gostaríamos que você possa estar presente._\n\n';
        text += '💌 _Logo abaixo há o link do convite digital, nele você poderá confirmar sua presença. Fizemos esse site com muito carinho para substituir os convites de papel ♻️ e aproveitamos para colocar as orientações._\n\n';
        text += '❤️ _A medida do amor é amar sem medida_ - Santo Agostinho\n\n';
        text += `${URL}?key=${key}`;
        navigator.clipboard.writeText(text);
    };

    render() {
        return (
            <>
                <Container className='pt-4 pb-4'>
                    <h2 className="sub-title">
                        <span className="text-center">
                            <span className="text-center">Admin Panel</span>
                        </span>
                    </h2>
                    <div className='text-center'>
                        <h4>Convites</h4>
                    </div>
                    <Table>
                        <thead><tr>
                            <th>Link</th>
                            <th>Família</th>
                            <th>Convites</th>
                            <th>Crianças</th>
                            <th>Confirmados</th>
                            <th>Ação</th>
                        </tr></thead>
                        <tbody>
                            {this.state.families.map((f, i) => <tr key={`family-${i}`}>
                                <td><Button onClick={() => this.copyToClipboard(f.key)}>Link</Button></td>
                                <td>{f.name}</td>
                                <td>{f.invitations.filter(i => !i.isChild).length}</td>
                                <td>{f.invitations.filter(i => i.isChild).length}</td>
                                <td>{f.invitations.filter(i => i.name.length > 0).length}</td>
                                <td><Button onClick={() => this.family.show(f)}>Ver</Button></td>
                            </tr>)}
                        </tbody>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th>{this.state.totalInvits}</th>
                            <th>{this.state.totalChild}</th>
                            <th>{this.state.totalConfirmed}</th>
                            <th></th>
                        </tr>
                    </Table>
                    <Button onClick={() => this.family.show()}>Novo Convite</Button>
                    <div className='text-center mt-4'>
                        <h4>Presentes</h4>
                    </div>
                    <Table>
                        <thead><tr>
                            <th>N</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Comprado</th>
                            <th>Ação</th>
                        </tr></thead>
                        <tbody>
                            {this.state.gifts.map((f, i) => <tr key={`gift-${i}`}>
                                <td>{i + 1}</td>
                                <td>{f.name}</td>
                                <td>R$ {f.price?.toFixed(2).replace('.', ',')}</td>
                                <td>{f.buy ? 'Sim' : 'Não'}</td>
                                <td><Button onClick={() => this.gift.show(f)}>Ver</Button></td>
                            </tr>)}
                        </tbody>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th>R$ {this.state.totalGifts.toFixed(2).replace('.', ',')}</th>
                            <th>R$ {this.state.totalReceived.toFixed(2).replace('.', ',')}</th>
                            <th></th>
                        </tr>
                    </Table>
                    <Button onClick={() => this.gift.show()}>Nova Presente</Button>
                </Container>
                <Family ref={ref => this.family = ref} onClose={this.load} />
                <Gift ref={ref => this.gift = ref} onClose={this.load} />
            </>
        );
    }
}

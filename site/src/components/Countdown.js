import React from 'react';

class Timer extends React.Component {

    format = (number) => {
        if (number < 10) {
            return `0${number}`;
        } else {
            return `${number}`;
        }
    }

    render() {
        return (
            <div className='badge bg-primary m-1'>
                <span style={{
                    fontSize: 28,
                    color: '#EEE'
                }}>{this.format(this.props.number)}</span>
                <br />
                <span style={{
                    fontSize: 20,
                    color: '#EEE'
                }}>{this.props.label}</span>
            </div>
        );
    }
}


export default class Countdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            d: 0,
            h: 0,
            m: 0,
            s: 0,
        };
    }

    componentDidMount = () => {
        this.updateCountdown();
        this.interval = setInterval(this.updateCountdown, 1000)
    }

    updateCountdown = () => {
        const minutesInSeconds = 60;
        const hoursInSeconds = 60 * minutesInSeconds;
        const dayInSeconds = 24 * hoursInSeconds;
        let s = ((new Date('2022-06-11T16:00:00')).getTime() - Date.now()) / 1000;
        let d = Math.floor(s / dayInSeconds);
        s = s - d * dayInSeconds;
        let h = Math.floor(s / hoursInSeconds);
        s = s - h * hoursInSeconds;
        let m = Math.floor(s / minutesInSeconds);
        s = s - m * minutesInSeconds;
        s = Math.floor(s)
        this.setState({
            d, h, m, s
        })
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    format = (number) => {
        if (number < 10) {
            return `0${number}`;
        } else {
            return `${number}`;
        }
    }

    render() {
        return (
            <div className='badge bg-primary m-1'>
                <Timer number={this.state.d} label="Dias" />
                <Timer number={this.state.h} label="Hrs" />
                <Timer number={this.state.m} label="Min" />
                <Timer number={this.state.s} label="Seg" />
            </div>
        );
    }
}

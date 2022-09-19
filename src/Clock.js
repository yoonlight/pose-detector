import React, { Component } from 'react';
import './App.css';

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }
    
    render() {
        return (
            <div >
                <span className="clock">{this.state.date.toLocaleString('ko-kr')}</span>
            </div>
        )
    }
}


export default Clock
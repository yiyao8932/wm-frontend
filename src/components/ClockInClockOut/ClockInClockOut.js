import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from '../../axios';

import './ClockInClockOut.css';
import Button from '../../UI/Button/Button';
import errorHandler from '../../hoc/ErrorHandler';
import Profile from '../Profile/Profile';

class ClockInClockOut extends Component {
    state = {
        id: null,
        clockInTime: null,
        clockOutTime: null,
        isClockIn: true,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('/entry/1')
            .then(response => {
                if (response.data.clockInTime && !response.data.clockOutTime) {
                    this.setState({ id: response.data.id, clockInTime: response.data.clockInTime, isClockIn: !this.state.isClockIn });
                }
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    clockInOutBtnHandler = () => {
        if (!this.state.isClockIn) {
            this.setState({ loading: true });
            const clockOutTime = this.state.clockOutTime ? this.state.clockOutTime : new Date();
            const entry = {
                id: this.state.id,
                workerId: 1,
                clockInTime: this.state.clockInTime,
                clockOutTime: clockOutTime
            }
            axios.post('/entry', entry)
                .then(response => {
                    this.setState({ clockOutTime: response.data.clockOutTime, isClockIn: !this.state.isClockIn, loading: false });
                })
                .catch(error => {
                    this.setState({ error: true, loading: false });
                });
        }
        else {
            this.setState({ loading: true });
            const clockInTime = this.state.clockInTime ? this.state.clockInTime : new Date();
            const entry = {
                id: this.state.id ? this.state.id : null,
                workerId: 1,
                clockInTime: clockInTime
            }
            axios.post('/entry', entry)
                .then(response => {
                    this.setState({ id: response.data.id, clockInTime: response.data.clockInTime, isClockIn: !this.state.isClockIn, loading: false });
                })
                .catch(error => {
                    this.setState({ error: true, loading: false });
                });
        }
    }

    render() {
        return (
            <>
                <Profile />
                <div>
                    <div className="time-group-first">
                        <div className="clock-in">Clock in</div>
                        <div className="time">{this.state.clockInTime ? <Moment format="hh:mm A">{this.state.clockInTime}</Moment> : "-"}</div>
                    </div>
                    <div className="time-group-second">
                        <div className="clock-out">Clock out</div>
                        <div className="time">{this.state.clockOutTime ? <Moment format="hh:mm A">{this.state.clockOutTime}</Moment> : "-"}</div>
                    </div>
                </div>
                <Button btnType={this.state.loading ? "button-loading" : "button"} clicked={this.clockInOutBtnHandler}>
                    {this.state.loading ?
                        <div>Loading...</div> : this.state.isClockIn ? <div>Clock in</div> : <div>Clock out</div>}
                </Button>
            </>
        );
    }
}

export default errorHandler(ClockInClockOut, axios);
import React, {Component} from 'react';
import '../css/TicketTrainInfo.css';

export default class TicketTrainInfo extends Component {

    render() {
        let day = this.props.ticketReducer.trainInfo.departDate[2];
        let month = this.props.ticketReducer.trainInfo.departDate[1];
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        let depHour;
        let depMinute;
        if (this.props.ticketReducer.train.departTime === null) {
            depHour = '';
            depMinute = '';
        } else {
            depHour = this.props.ticketReducer.train.departTime[0];
            depMinute = this.props.ticketReducer.train.departTime[1];
        }
        if (depHour.toString().length === 1) depHour = '0' + depHour;
        if (depMinute.toString().length === 1) depMinute = '0' + depMinute;

        return (
            <strong>
                <div className="info">
                    Train: {this.props.ticketReducer.trainNumber}
                </div>

                <div className="info">
                    Direction: {this.props.ticketReducer.trainInfo.stationFrom.title}{' - '}
                    {this.props.ticketReducer.trainInfo.stationTo.title}
                </div>

                <div className="info">
                    Departure date: {day}{'.'}{month}{'.'}{this.props.ticketReducer.trainInfo.departDate[0]}
                </div>

                <div className="info">
                    Departure time: {depHour}{depHour === '' ? '' : ':'}{depMinute}
                </div>

                <div className="info">
                    Price: {this.props.ticketReducer.train.price}{' $'}
                </div>
            </strong>
        )
    }
}
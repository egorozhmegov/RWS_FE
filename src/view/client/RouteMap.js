/*global google*/
import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";

const RouteMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA40PgMGt365xsEIBwDCYNKU8DNMSs-ke4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `446px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: this.props.ticketReducer.trainInfo.stationFrom.title,
                destination: this.props.ticketReducer.trainInfo.stationTo.title,
                waypoints: this.props.ticketReducer.waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(59.9342802, 30.3350986)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

export default RouteMap
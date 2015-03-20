'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var dronesData = [
	{
		_id: 1,
		make: 'MARS',
	}
];

// Styles

var mainContainer = {
	border: '1px solid #000',
	margin: 'auto',
	width: '600px'
};

var DroneForm = React.createClass({
	getInitialState: function() {
		return {newDrone: {make: ''}};
	},
	handleChange: function(event) {
		 this.setState({newDrone: {make: event.target.value}});
	},
	handleSubmit: function(event) {
		event.preventDefault();
		var newDrone = this.state.newDrone;
		ajax({
			url: this.props.url,
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify(newDrone),
			success: function(data) {
				this.props.onNewDroneSubmit(data);
				this.setState({newDrone: {make: ''}});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(err);
			}
		});
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h3>New Drone</h3>

				<label htmlFor="make">Make: </label>
				<input id="make" type="text" value={this.state.newDrone.make} onChange={this.handleChange} />
				<br />
				<button type="submit">Create New Drone</button>
			</form>
		);
	}
});

var Drone = React.createClass({
	render: function () {
		return <li>Make: {this.props.data.make}</li>;
	}
});

var DroneList = React.createClass({
	render: function() {
		var drones = this.props.data.map(function(drone) {
			return <Drone data={drone} key={drone._id} />;
		});
		return (
			<section>
				<ul>
					{drones}
				</ul>
			</section>
		);
	}
});

var DronesApp = React.createClass({
	getInitialState: function() {
		return {
			dronesData: [
					{make: 'MARS'}, 
					{make: 'UAS'}, 
					{make: 'Europa Geological'}
				]
			};
	},
	onNewDrone: function(drone) {
		drone._id = this.state.dronesData.length + 1;
		var stateCopy = this.state;
		stateCopy.dronesData.push(drone);
		this.setState(stateCopy);
	},
	componentDidMount: function() {
		ajax({
			url: this.props.dronesBaseUrl,
			dataType: 'json',
			success: function(data) {
				var state = this.state;
				state.dronesData = data;
				this.setState(state);
			}.bind(this),
			error: function(xhr, status) {
				console.log(xhr, status);
			}
		});
	},
	render: function() {
		return (
			<main style={mainContainer}>
				<DroneForm onNewDroneSubmit={this.onNewDrone} url={this.props.dronesBaseUrl} />
				<DroneList data={this.state.dronesData} />
			</main>
		);
	}
});

React.render(<DronesApp dronesBaseUrl={'/api/v1/drones'} />, document.body);


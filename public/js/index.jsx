var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('nuka-carousel');
var Header = require('./header.jsx');
var Terminal = require('./terminal.jsx');
var EmailDemo = require('./email-demo.jsx');

var Hero = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Terminal />
			</div>
		);
	}
});

var Index = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div id="main-container" className="container-fluid">
					<div className="row main-content">
						<a href="/">
							<img className="logo" src="assets/logo.png"/>
						</a>
						<h4 className="logo-text">Opinionated task list for developers.</h4>
						<Hero />
					</div>
					<div className="row">
						<div className="col-md-1 col-sm-1"/>
						<div className="col-md-5 col-sm-5 col-xs-6">
							<h4 className="feature-header">CLI + Email Integration</h4>
							<p className="feature-description">
								Access tasks through your terminal and email.<br/>
								Add or complete tasks using either one.
							</p>
						</div>
						<div className="col-md-5 col-sm-5 col-xs-6">
							<h4 className="feature-header">Stephen Covey Time Management Grid</h4>
							<img src="assets/quadrants.png"/>
						</div>
						<div className="col-md-1 col-sm-1"/>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Index /> , document.getElementById('index'));
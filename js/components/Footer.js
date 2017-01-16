/**
 * Created by Neil on 2017/1/16.
 */
const {connect} = require('react-redux');
const React = require('react');
const {removeComplete} = require('../actions/index');


class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer className="footer">
				<span className="todo-count"><strong>{this.props.itemLeft}</strong> item left</span>
				<ul className="filters">
					<li>
						<a className="selected" to="/">All</a>
					</li>
					<li>
						<a to="/active">Active</a>
					</li>
					<li>
						<a to="/completed">Completed</a>
					</li>
				</ul>
				<button className="clear-completed" onClick={this.props.clearComplete}>Clear completed</button>
			</footer>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		itemLeft: state.todos.filter((todo) => !todo.completed).length
	};
}

function mapDispatchToProps(dispatch, props) {
	return {
		clearComplete: function () {
			dispatch(removeComplete());
		},
	};
}
const FooterCon = connect(mapStateToProps, mapDispatchToProps)(Footer);

module.exports = FooterCon;

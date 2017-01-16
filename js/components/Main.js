/**
 * Created by Neil on 2017/1/16.
 */
// import {connect} from 'react-redux'
// import {completeAll} from '../actions/index'
// import {TodoItemCon} from './TodoItem'
// import React from 'react'
const {toggleAll} = require('../actions/index');
const {connect} = require('react-redux');
const React = require('react');
const TodoItemCon = require('./TodoItem');

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let todoItems = this.props.todos.map((todo, index) =>
			<TodoItemCon
				key={index}
				index = {index}
				todo={todo}/>);

		return (
			<section className="main">
				<input
					className="toggle-all"
					type="checkbox"
					defaultChecked={false}
					onChange={this.props.onSelectAll}/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					{todoItems}
				</ul>
			</section>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		todos: state.todos
	};
}

function mapDispatchToProps(dispatch, props) {
	return {
		onSelectAll: function (e) {
			dispatch(toggleAll(e.target.checked));
		}
	};
}

const MainCon = connect(mapStateToProps, mapDispatchToProps)(Main);

module.exports = MainCon;

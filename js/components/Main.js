/**
 * Created by Neil on 2017/1/16.
 */
const {toggleAll} = require('../actions/index');
const {connect} = require('react-redux');
const React = require('react');
const TodoItemCon = require('./TodoItem');

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.params);
		console.log(this.props.todos);
		let todoItems = this.props.todos.map((todo, index) =>
			<TodoItemCon
				key={index}
				index={index}
				todo={todo}/>);

		let renderedTodos = [];
		if (this.props.params) {
			switch (this.props.params.state) {
				case 'active':
					renderedTodos = todoItems.filter((item) => !item.props.todo.completed);
					break;
				case 'completed':
					renderedTodos = todoItems.filter((item) => item.props.todo.completed);
					break;
				default:
					renderedTodos = todoItems;
					break;
			}
		}

		return (
			<section className="main">
				<input
					className="toggle-all"
					type="checkbox"
					defaultChecked={false}
					onChange={this.props.onSelectAll}/>
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					{renderedTodos}
				</ul>
			</section>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		todos: state.todos,
		params: ownProps.params
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

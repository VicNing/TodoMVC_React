/**
 * Created by Neil on 2017/1/16.
 */
import {connect} from 'react-redux'
import {completeAll} from '../actions/index'
import {TodoItemCon} from './TodoItem'

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let todoItems = this.props.todos.map((todo, index) =>
			<TodoItemCon
				key={index}
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
			dispatch(completeAll(e.target.checked));
		}
	};
}

export const MainCon = connect(mapStateToProps, mapDispatchToProps)(Main);

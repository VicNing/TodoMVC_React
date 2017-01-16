/**
 * Created by Neil on 2017/1/16.
 */
import {connect} from 'react-redux'
import {updateTodo,removeTodo} from '../actions/index'

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {editing: false, editingText: ''};
		this.onEdit = this.onEdit.bind(this);
		this.onDbClick = this.onDbClick.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDestroy = this.handleDestroy.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
	}

	render() {
		return (
			<li className={`${this.props.todo.completed ? 'completed' : ''} ${this.state.editing ? 'editing' : ''}`}>
				<div className='view'>
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onChange={this.handleCheck}/>
					<label onDoubleClick={this.onDbClick}>{this.props.todo.text}</label>
					<button className="destroy" onClick={this.handleDestroy}/>
				</div>
				<input
					type="text"
					className="edit"
					ref={(input) => {
						this.editInput = input;
					} }
					value={this.state.editingText}
					onChange={this.onEdit}
					onKeyDown={this.handleEditSubmit}/>
			</li>
		);
	}

	onEdit(e) {
		this.setState({editingText: e.target.value});
	}

	onDbClick() {
		this.setState({editing: true});
	}

	handleCheck(e) {
		this.props.onCheck(e);
	}

	handleDestroy() {
		this.props.onDestroy();
	}

	handleEditSubmit() {
		this.props.onEditSubmit(this.state.editingText);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		todo: ownProps.todo,
		index: state.todos.indexOf(ownProps.todo)
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onCheck: function (e) {
			dispatch(updateTodo(ownProps.index, null, e.target.checked));
		},
		onDestroy: function () {
			dispatch(removeTodo(ownProps.index));
		},
		onEditSubmit: function (text) {
			dispatch(updateTodo(ownProps.index, text, null));
		},
	};

}
export const TodoItemCon = connect(mapStateToProps, mapDispatchToProps)(TodoItem);

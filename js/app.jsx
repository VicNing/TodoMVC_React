const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router
const Route = require('react-router').Route
const Link = require('react-router').Link
const browserHistory = require('react-router').browserHistory;

let todoList = [{
	// id: 0,
	text: 'Tast Javascript',
	completed: true
}, {
	// id: 1,
	text: 'Buy a unicorn',
	completed: false
}];

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: '', data: todoList };
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputSubmit = this.onInputSubmit.bind(this);
		this.onCompleteCheck = this.onCompleteCheck.bind(this);
		this.onDestroyItem = this.onDestroyItem.bind(this);
		this.onSelectAll = this.onSelectAll.bind(this);
		this.clearComplete = this.clearComplete.bind(this);
		this.onItemSubmit = this.onItemSubmit.bind(this);
	}

	render() {
		return (
			<section className="todoapp">
				<Header
					input={this.state.input}
					onInputChange={this.onInputChange}
					onInputSubmit={this.onInputSubmit} />
				<Main
					data={this.state.data}
					routeParams={this.props.params}
					onItemSubmit={this.onItemSubmit}
					onSelectAll={this.onSelectAll}
					onDestroyItem={this.onDestroyItem}
					onCompleteCheck={this.onCompleteCheck} />
				<Footer data={this.state.data} clearComplete={this.clearComplete} />
			</section>
		);
	}


	onCompleteCheck(event, ref) {
		this.setState((prev, props) => {
			let temp = prev.data;
			let index = temp.indexOf(ref.props.todo);
			let result = temp[index].completed;
			temp[index].completed = !result;
			return {
				data: temp
			};
		});
	}

	onDestroyItem(event, ref) {
		this.setState((prev, props) => {
			let index = prev.data.indexOf(ref.props.todo);
			prev.data.splice(index, 1);
			return { data: prev.data };
		});
	}

	onInputSubmit(e) {
		if ('Enter' === e.key && this.state.input.trim()) {
			this.setState((prev, props) => {
				let temp = prev.data;
				temp.push({
					// id: prev.data.length + 1,
					text: prev.input,
					completed: false
				});
				return {
					data: temp,
					input: '',
				};
			});

		}
	}

	onInputChange(e) {
		this.setState({ input: e.target.value });
	}

	onSelectAll(e) {
		let completed = e.target.checked;
		this.setState((prev, props) => {
			prev.data.forEach((item) => item.completed = completed);
			return { data: prev.data };
		});
	}

	clearComplete(e) {
		this.setState((prev, props) => {
			let result = [];
			prev.data.forEach((item) => {
				if (!item.completed) {
					result.push(item);
				}
			});
			return { data: result }
		});
	}

	onItemSubmit(ref) {
		this.setState((prev) => {
			let index = prev.data.indexOf(ref.props.todo);
			prev.data[index].text = ref.state.editingText;
			return { data: prev.data };
		});
		ref.setState({ editing: false });
	}

}

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="header">
				<h1>todos</h1>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					value={this.props.input}
					onKeyDown={this.props.onInputSubmit}
					onChange={this.props.onInputChange}
					/>
			</header>
		);
	}
}

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let filteredTodos = [];
		switch (this.props.routeParams.state) {
			case 'active':
				filteredTodos = this.props.data
					.filter((item) => !item.completed);

				break;
			case 'completed':
				filteredTodos = this.props.data
					.filter((item) => item.completed);

				break;
			default:
				filteredTodos = this.props.data;

				break;
		}

		let todoItems = filteredTodos.map((todo, index) =>
			<TodoItem
				key={index}
				onItemSubmit={this.props.onItemSubmit}
				onCompleteCheck={this.props.onCompleteCheck}
				onDestroyItem={this.props.onDestroyItem}
				todo={todo} />);

		return (
			<section className="main">
				<input
					className="toggle-all"
					type="checkbox"
					defaultChecked={false}
					onChange={this.props.onSelectAll} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					{todoItems}
				</ul>
			</section>
		);
	}
}

class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editing: false, editingText: props.todo.text };
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDestroy = this.handleDestroy.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.onDbClick = this.onDbClick.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onRandomClick = this.onRandomClick.bind(this);
	}

	render() {
		return (
			<li className={`${this.props.todo.completed ? 'completed' : ''} ${this.state.editing ? 'editing' : ''}`}>
				<div className='view'>
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onChange={this.handleCheck} />
					<label onDoubleClick={this.onDbClick}>{this.props.todo.text}</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				<input
					type="text"
					className="edit"
					ref={(input) => {
						this.editInput = input;
					} }
					value={this.state.editingText}
					onChange={this.onEdit}
					onKeyDown={this.handleEditSubmit} />
			</li>
		);
	}

	componentDidMount() {
		window.addEventListener('click', this.onRandomClick)
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.onRandomClick);
	}

	onRandomClick(e) {
		if (e.target != this.editInput) {
			this.setState({ editing: false, editingText: this.props.todo.text });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.editing && this.state.editing) {
			this.editInput.focus();
		}
	}

	handleCheck(e) {
		this.props.onCompleteCheck(e, this);
	}

	handleDestroy(e) {
		this.props.onDestroyItem(e, this);
	}

	handleEditSubmit(e) {
		if ('Enter' === e.key && this.state.editingText.trim()) {
			this.props.onItemSubmit(this);
		}
	}

	onDbClick(e) {
		this.setState({ editing: true });
	}

	onEdit(e) {
		this.setState({ editingText: e.target.value });
	}
}

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let itemLeft = this.props.data.filter((item, index) => !item.completed).length;

		return (

			<footer className="footer">
				<span className="todo-count"><strong>{itemLeft}</strong> item left</span>
				<ul className="filters">
					<li>
						<Link activeClassName="selected" to="/">All</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/active">Active</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="/completed">Completed</Link>
					</li>
				</ul>
				<button className="clear-completed" onClick={this.props.clearComplete}>Clear completed</button>
			</footer>
		);
	}
}

// ReactDOM.render(<Todo/>, document.querySelector('#root'));
ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={Todo} />
		<Route path='/:state' component={Todo} />
	</Router>,
	document.querySelector('#root'));
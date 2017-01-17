/**
 * Created by Neil on 2017/1/16.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const todoApp = require('./reducers/index');
const {createStore} = require('redux');
const {Provider} = require('react-redux');
const HeaderCon = require('./components/Header');
const MainCon = require('./components/Main');
const FooterCon = require('./components/Footer');
const Route = require('react-router').Route;
const Router = require('react-router').Router;
const browserHistory = require('react-router').browserHistory;

function Todo(props) {

	return (
		<section className="todoapp">
			<HeaderCon/>
			<MainCon params={props.params}/>
			<FooterCon/>
		</section>
	);
}

//mock data
let initialState = {todos: [{text: 'nihao', completed: true}, {text: 'haha', completed: false}]};
let store = createStore(todoApp, initialState);

ReactDOM.render(
	<Provider store={store}>
		<Todo/>
	</Provider>,
	document.querySelector('#root'));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/(:state)' component={Todo}/>
		</Router>
	</Provider>,
	document.querySelector('#root'));

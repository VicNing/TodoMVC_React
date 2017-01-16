/**
 * Created by Neil on 2017/1/16.
 */
// import React from 'react'
// import ReactDOM from 'react-dom'
// import {createStore} from 'redux'
// import {Provider} from 'react-redux'
// import {todoApp} from './reducers/index'
// import {HeaderCon} from './components/Header'
// import {MainCon} from './components/Main'
// import FooterCon from './components/Footer'
const React = require('react');
const ReactDOM = require('react-dom');
const todoApp = require('./reducers/index');
const {createStore} = require('redux');
const {Provider, connectAdvanced, connect} = require('react-redux');
const HeaderCon = require('./components/Header');
const MainCon = require('./components/Main');
const FooterCon = require('./components/Footer');

class Todo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="todoapp">
				<HeaderCon/>
				<MainCon/>
				<FooterCon/>
			</section>
		);
	}
}

//mock data
let initialState = {todos: [{text: 'nihao', completed: true}, {text: 'haha', completed: false}]};
let store = createStore(todoApp,initialState);

ReactDOM.render(
	<Provider store={store}>
		<Todo/>
	</Provider>,
	document.querySelector('#root'));


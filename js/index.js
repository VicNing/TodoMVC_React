/**
 * Created by Neil on 2017/1/16.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {todoApp} from 'reducers/index'
import {HeaderCon} from './components/Header'
import {MainCon} from './components/Main'
import {FooterCon} from './components/Footer'

class Todo extends ReactDOM.Component {
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

let store = createStore(todoApp);
ReactDOM.render(
	<Provider store={store}>
		<Todo/>
	</Provider>
	, document.querySelector('#root'));


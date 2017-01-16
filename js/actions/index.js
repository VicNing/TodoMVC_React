/**
 * Created by Neil on 2017/1/16.
 */
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_COMPLETE = 'REMOVE_COMPLETE';


export function addTodo(text) {
	return {
		type: ADD_TODO,
		text: text
	};
}

export function updateTodo(index, text, completed) {
	return {
		type: UPDATE_TODO,
		index: index,
		text: text,
		completed: completed
	};
}

export function toggleAll(completed) {
	return {type: TOGGLE_ALL, completed: completed};
}

export function removeTodo(index) {
	return {type: REMOVE_TODO, index: index};
}

export function removeComplete() {
	return {
		type: REMOVE_COMPLETE
	};
}
state = {
	todos: [{text: '123', completed: false}],
};


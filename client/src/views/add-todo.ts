import { render } from './render';
import { TodoController } from '../todo.controller';

const button = document.querySelector('button');
const input = document.querySelector('input');

if (!button) {
    throw new Error('Cannot find button in DOM');
}

if (!input) {
    throw new Error('Cannot find button in DOM');
}

button.addEventListener('click', () => addTodoItem(input))
input.addEventListener('keypress', evt => {
    if (evt.key === 'Enter') {
        addTodoItem(input);
    }
});

/**
 * Add a todo with the current input value.
 */
async function addTodoItem(input: HTMLInputElement) {
    if (!input.value || input.value.length <= 0) {
        // Early exit
        return;
    }

    await TodoController.getInstance().createTodo(input.value);

    input.value = '';
    input.focus();

    render();
}
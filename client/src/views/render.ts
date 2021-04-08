// @ts-ignore for the svg import
import cross from '../assets/cross.svg';
// @ts-ignore  for the svg import
import deleteIcon from '../assets/delete.svg';
import { Todo } from '../models/todo';

import { TodoController, FILTER } from '../todo.controller';
import { findOrThrow } from '../utils';

const controller = TodoController.getInstance();

const list = findOrThrow('.list');
const count = findOrThrow('.count');

/**
 * Render all todos to the DOM.
 */
export async function render() {
    const filteredTodo = await controller.getFilteredTodos();
    const todoEls = filteredTodo.map(createTodoNode);
    // Clean the list
    list.innerHTML = '';
    // Affichage des todos
    todoEls.forEach(e => list.appendChild(e));
    // Affichage du compte
    count.innerHTML = `${todoEls.length} items ${controller.getFilter() === FILTER.COMPLETED ? 'completed' : 'left'}`;
}

function createCheckboxNode(todo: Todo) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    label.htmlFor = todo.id;
    label.innerHTML = cross;

    checkbox.id = todo.id;
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    div.appendChild(checkbox);
    div.appendChild(label);

    return {
        checkboxDiv: div,
        checkbox
    }
}

/**
 * Create an DOM node to display
 * @param {Todo} t The item to create a node for
 */
function createTodoNode(t: Todo) {
    const todoEl = document.createElement('div');
    todoEl.classList.add('todo');

    const { checkboxDiv, checkbox } = createCheckboxNode(t);
    const content = document.createElement('span');
    content.innerText = t.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = deleteIcon;
    deleteBtn.classList.add('btn-icon');

    checkbox.addEventListener('change', async () => {
        await controller.toggleTodo(t.id);
        render();
    });

    deleteBtn.addEventListener('click', async () => {
        await controller.delete(t.id);
        render();
    });

    todoEl.appendChild(checkboxDiv);
    todoEl.appendChild(content);
    todoEl.appendChild(deleteBtn);

    return todoEl;
}
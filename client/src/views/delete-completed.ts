import { TodoController } from '../todo.controller';
import { render } from './render';

const deleteCompBtn = document.querySelector('#delete-completed');
if (!deleteCompBtn) {
    throw new Error('Cannot find delete button in DOM');
}

deleteCompBtn.addEventListener('click', async () => {
    await TodoController.getInstance().deleteCompleted();
    render();
});
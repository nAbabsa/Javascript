import { render } from './render';
import { TodoController, FILTER } from '../todo.controller';

const controller = TodoController.getInstance();

// Initialise filters
const filters = document.querySelectorAll('[name=filter');

filters.forEach(f => f.addEventListener('change', (evt) => {
    const input = evt.target as HTMLInputElement;
    switch (input?.value) {
        case 'all':
            controller.setFilter(FILTER.ALL);
            break;
        case 'completed':
            controller.setFilter(FILTER.COMPLETED);
            break;
        case 'pending':
            controller.setFilter(FILTER.PENDING);
            break;
        default:
            throw new Error('Filtre inconnu.');
    }
    render();
}));
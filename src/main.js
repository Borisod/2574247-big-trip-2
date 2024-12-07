import BoardPresenter from './presenter/board-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({filtersContainer, eventsContainer});

boardPresenter.init();

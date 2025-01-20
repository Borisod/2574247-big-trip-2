import FiltersView from '../view/filters-view.js';
import SortView from '../view/sorts-view.js';
import NoEventItemView from '../view/no-events-item-view.js';
import { RenderPosition } from '../render.js';
import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';

export default class GeneralPresenter {
  #filtersContainer = null;
  #eventsContainer = null;
  #model = null;
  #eventPresenters = [];

  constructor({ filtersContainer, eventsContainer, model }) {
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;
    this.#model = model;
  }

  init() {
    render(new FiltersView(), this.#filtersContainer, RenderPosition.BEFOREEND);
    if (this.#model.events.length === 0) {
      render(new NoEventItemView(), this.#eventsContainer);
      return;
    }
    render(new SortView(), this.#eventsContainer);
    this.#renderTripEvents();
  }

  #renderTripEvents() {
    this.#model.events.forEach((event) => {
      const eventPresenter = new EventPresenter({
        eventsContainer: this.#eventsContainer,
        model: this.#model,
        onEventUpdate: this.#handleEventUpdate,
        onEdit: this.#handleEditEvent
      });
      eventPresenter.init(event);
      this.#eventPresenters.push(eventPresenter);
    });
  }

  #handleEditEvent = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventUpdate = (updatedEvent) => {
    this.#model.updateEvent(updatedEvent);
  };
}

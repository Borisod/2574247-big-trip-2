import {createElement} from '../render.js';

function createEventsListView(){
  return '<ul class="trip-events__list"></ul>';
}

export default class EventListView{
  getTemplate(){
    return createEventsListView();
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}

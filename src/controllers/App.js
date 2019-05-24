import APILoader from '../models/APILoader';
import AppView from '../views/app-view';
import CardView from '../views/card-view';
import Paginator from '../models/paginator-model';
import Slider from '../models/slider-model';

export default class App {
  constructor() {
    this.view = new AppView();
    this.model = new APILoader();
    this.pageState = 1;
    this.paginator = new Paginator(this.pageState);
    this.slider = new Slider(this.pageState);
  }

  static renderCards(data) {
    const clip = new CardView(data);
    return clip.render();
  }

  start() {
    document.body.appendChild(this.view.render(this.pageState));
    const inputElement = document.querySelector('.search__input');
    const container = document.querySelector('.clips__items-list');
    const pagination = document.querySelector('.pagination');

    inputElement.addEventListener('change', () => {
      const clipElement = container.querySelector('li');
      const { value } = inputElement;

      if (clipElement) {
        container.innerHTML = '';
        this.model.getResponse(value, App.renderCards);
      } else {
        this.model.getResponse(value, App.renderCards);
        setTimeout(() => {
          pagination.classList.remove('hidden');
          this.paginator.render(container);
          this.slider.render(container);
        }, 500);
      }
    });

    let threshold;
    let scrollValue;

    document.addEventListener('click', () => {
      scrollValue = container.scrollLeft;
      threshold = container.scrollWidth - scrollValue;
      if (scrollValue > threshold) {
        const { value } = inputElement;
        this.model.getNextTokenResponse(value, App.renderCards);
      }
    });
  }
}

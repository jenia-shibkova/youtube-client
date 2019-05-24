import createElement from '../../utils';

export default class AppView {
  constructor() {
    this.pageState = 1;
  }

  template() {
    return `
     <main class="app"><section class="search"><label class="search__input-label icon-search" for="search-input"><input class="search__input" id="search-input" type="text" placeholder="enter request"></label></section><section class="clips"><ul class="clips__items-list"></ul></section><div class="pagination hidden"><button class="button before-prev hidden" id="before-prev" data-label="0"></button><button class="button prev hidden" id="prev" data-label="0"></button><button class="button current" id="current" data-page-num="${this.pageState}" data-label="1">1</button><button class="button next" id="next" data-label="2"></button></div></main>`;
  }

  render() {
    return createElement(this.template);
  }
}

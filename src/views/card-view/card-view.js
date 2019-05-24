import createElement from '../../utils';

export default class CardView {
  constructor(data) {
    this.videoId = data.id;
    this.date = data.snippet.publishedAt;
    this.image = data.snippet.thumbnails.medium.url;
    this.description = data.snippet.description;
    this.title = data.snippet.title;
    this.channelTitle = data.snippet.channelTitle;
    this.viewCount = data.statistics.viewCount;
  }

  static formateDate(value) {
    const date = new Date(value);
    const currDate = date.getDate();
    const currMonth = date.getMonth();
    const currYear = date.getFullYear();
    return `${currYear}-${currMonth}-${currDate}`;
  }

  static truncate(str) {
    if (str.length > 230) {
      return `${str.slice(0, 1)}${str.toLowerCase().slice(1, 230)}...`;
    }
    return str;
  }

  get template() {
    return `
      <li class="clip__item">
        <div class="clip__inner-wrapper">
          <img class="clip__item-picture" src="${this.image}" alt="${this.title}" width="240">
          <h2 class="clip__item-title">
            <a class="clip__item-link" href="https://www.youtube.com/watch?v=${this.videoId}}" target="_blank">
              ${this.title}
            </a>
          </h2>
          <div class="clip__item-info">
            <h3 class="clip__channel-title icon-user">
              ${this.channelTitle}
            </h3>
            <div class="clip__clip-date icon-calendar">
              <time datetime="${CardView.formateDate(this.date)}">
                ${CardView.formateDate(this.date)}
              </time>
            </div>
            <p class="clip__view-count icon-eye">
              ${this.viewCount}
            </p>
            <p class="clip__description">${CardView.truncate(this.description)}</p>
          </div>
        </div>
      </li>`;
  }

  render() {
    return createElement(this.template);
  }
}

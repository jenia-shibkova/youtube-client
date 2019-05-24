export default class APILoader {
  constructor() {
    this.settings = {
      apiKey: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
    };
    this.baseLink = `https://www.googleapis.com/youtube/v3/search?key=${this.settings.apiKey}&type=video&part=snippet&maxResults=15&q`;
    this.idLink = `https://www.googleapis.com/youtube/v3/videos?key=${this.settings.apiKey}&id=`;
    this.idLinkPart = '&part=snippet,statistics';
    this.nextToken = null;
  }

  makeUrl(value) {
    return `${this.baseLink}=${value}`;
  }

  makeNextTokenUrl(value) {
    return `https://www.googleapis.com/youtube/v3/search?pageToken=${this.nextToken}&key=${this.settings.apiKey}&type=video&part=snippet&maxResults=15&q=${value}`;
  }

  static extractAll(data) {
    return data;
  }

  static checkStatus(response) {
    if (!response.status >= 200 && !response.status < 300) {
      throw new Error(`${response.status}: ${response.status.Text}`);
    } else {
      return response;
    }
  }

  static extractClipId(data) {
    return data.items.map(clip => clip.id.videoId);
  }

  static extractData(data) {
    return data.items;
  }

  static drawCards(images) {
    images.forEach((it) => {
      const container = document.querySelector('.clips__items-list');
      container.appendChild(it);
    });
  }

  getResponse(value, callback) {
    const url = this.makeUrl(value);
    return fetch(url)
      .then(this.checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      })
      .then(response => response.json())
      .then((data) => {
        this.nextToken = data.nextPageToken;
        const idItems = APILoader.extractClipId(data);
        return fetch(`${this.idLink}${idItems.join(',')}${this.idLinkPart}`);
      })
      .then(response => response.json())
      .then(data => data.items.map(clip => callback(clip)))
      .then(item => APILoader.drawCards(item))
      .catch(err => console.error(err));
  }

  getNextTokenResponse(value, callback) {
    const url = this.makeNextTokenUrl(value);
    return fetch(url)
      .then(this.checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      })
      .then(response => response.json())
      .then((data) => {
        this.nextToken = data.nextPageToken;
        const idItems = APILoader.extractClipId(data);
        return fetch(`${this.idLink}${idItems.join(',')}${this.idLinkPart}`);
      })
      .then(response => response.json())
      .then(data => data.items.map(clip => callback(clip)))
      .then(item => APILoader.drawCards(item))
      .catch(err => console.error(err));
  }
}

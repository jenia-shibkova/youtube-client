export default class Slider {
  constructor(state) {
    this.pageState = state;
  }

  static setDataLabel(state) {
    document.querySelector('.next').setAttribute('data-label', state + 1);
    document.querySelector('.prev').setAttribute('data-label', state - 1);
    document.querySelector('.before-prev').setAttribute('data-label', state - 2);
    document.querySelector('.current').innerHTML = state;
  }

  static checkNegativeState(state) {
    let currentState = state;
    if (state <= 0) {
      currentState = 1;
    }
    return currentState;
  }

  render(value) {
    const container = value;
    const beforePrevButton = document.querySelector('.before-prev');
    const prevButton = document.querySelector('.prev');
    const screenWidth = window.innerWidth;
    let isDown = false;
    let scrollLeftValue = container.scrollLeft;
    let startX;
    let scroll;

    container.addEventListener('mousedown', (event) => {
      isDown = true;
      container.classList.add('active');
      startX = event.pageX - container.offsetLeft;
      scroll = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scroll - walk;
    });

    container.addEventListener('mouseup', (event) => {
      isDown = false;
      container.classList.remove('active');

      const x = event.pageX - container.offsetLeft;
      const walk = startX - x;

      if (walk > 0) {
        container.scrollLeft = scrollLeftValue + screenWidth;
        scrollLeftValue = container.scrollLeft;

        this.pageState += 1;
        Slider.setDataLabel(this.pageState);

        if (this.pageState >= 2) {
          prevButton.classList.remove('hidden');
        }
        if (this.pageState >= 3) {
          beforePrevButton.classList.remove('hidden');
        }
      } else if (walk < 0) {
        container.scrollLeft = scrollLeftValue - window.innerWidth;
        scrollLeftValue = container.scrollLeft;

        this.pageState -= 1;
        this.pageState = Slider.checkNegativeState(this.pageState);
        Slider.setDataLabel(this.pageState);

        if (this.pageState <= 3) {
          beforePrevButton.classList.add('hidden');
        }
        if (this.pageState < 2) {
          prevButton.classList.add('hidden');
        }
      }
    });
  }
}

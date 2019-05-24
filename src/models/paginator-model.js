export default class Paginator {
  constructor(state) {
    this.pageState = state;
  }

  static setDataLabel(state) {
    document.querySelector('.next').setAttribute('data-label', state + 1);
    document.querySelector('.prev').setAttribute('data-label', state - 1);
    document.querySelector('.before-prev').setAttribute('data-label', state - 2);
    document.querySelector('.current').innerHTML = state;
  }

  render(value) {
    const container = value;
    const paginatorBlock = document.querySelector('.pagination');
    const beforePrevButton = document.querySelector('.before-prev');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const screenWidth = window.innerWidth;
    let scrollLeftValue = container.scrollLeft;

    paginatorBlock.addEventListener('mousedown', (event) => {
      const allButtons = Array.from(document.querySelectorAll('.button'));
      allButtons.forEach((button) => {
        button.removeAttribute('data-label');
      });

      if (event.target === nextButton) {
        nextButton.classList.add('label');

        container.scrollLeft = scrollLeftValue + screenWidth;
        scrollLeftValue = container.scrollLeft;

        this.pageState += 1;
        Paginator.setDataLabel(this.pageState);

        if (this.pageState >= 2) {
          prevButton.classList.remove('hidden');
        }
        if (this.pageState >= 3) {
          beforePrevButton.classList.remove('hidden');
        }
      }

      if (event.target === prevButton) {
        prevButton.classList.add('label');
        container.scrollLeft = scrollLeftValue - screenWidth;
        scrollLeftValue = container.scrollLeft;

        this.pageState -= 1;
        Paginator.setDataLabel(this.pageState);

        if (this.pageState < 3) {
          beforePrevButton.classList.add('hidden');
        }
        if (this.pageState < 2) {
          prevButton.classList.add('hidden');
        }
      }

      if (event.target === beforePrevButton) {
        beforePrevButton.classList.add('label');
        container.scrollLeft = scrollLeftValue - screenWidth * 2;
        scrollLeftValue = container.scrollLeft;

        this.pageState -= 2;
        Paginator.setDataLabel(this.pageState);

        if (this.pageState <= 3) {
          beforePrevButton.classList.add('hidden');
        }
        if (this.pageState < 2) {
          prevButton.classList.add('hidden');
        }
      }
    });

    paginatorBlock.addEventListener('mouseout', (event) => {
      event.target.classList.remove('label');
    });
  }
}

// Применяем деструктуризацию 
function slider({
    slide,
    prevArrow,
    nextArrow,
    totalCounter,
    currentCounter,
    sliderWrapper,
    innerField
}) {

    // Slider and Dots

    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        wrapper = document.querySelector(sliderWrapper),
        inner = document.querySelector(innerField),
        width = window.getComputedStyle(wrapper).width;
    let slideIndex = 1;
    let offset = 0;
    let slideWidth = +width.replace(/\D/g, ''); // 650

    slides.forEach(slide => slide.style.width = width);

    inner.style.width = `${100 * slides.length}%`;
    inner.style.display = 'flex';
    wrapper.style.overflow = 'hidden';
    inner.style.transition = '0.5s all';

    function setActiveDot(slideIndex) {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function setCurrentSlideValue(slideIndex) {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    setCurrentSlideValue(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    next.addEventListener('click', function () {
        if (offset == slideWidth * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += slideWidth;
            slideIndex++;
        }
        inner.style.transform = `translateX(-${offset}px)`;

        setCurrentSlideValue(slideIndex);
        setActiveDot(slideIndex);
    });

    prev.addEventListener('click', function () {
        if (offset == 0) {
            offset = slideWidth * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= slideWidth;
            slideIndex--;
        }
        inner.style.transform = `translateX(-${offset}px)`;

        setCurrentSlideValue(slideIndex);
        setActiveDot(slideIndex);
    });

    // Dots 

    let dots = [];

    wrapper.style.position = 'relative';
    const indicators = document.createElement('ul');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;    
  `;
    wrapper.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide', `${i + 1}`);
        dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
        indicators.append(dot);
        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = '1';
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function (event) {
            const slideTo = event.target.dataset.slide;
            slideIndex = slideTo;
            offset = slideWidth * (slideTo - 1);
            inner.style.transform = `translateX(-${offset}px)`;

            setCurrentSlideValue(slideIndex);
            setActiveDot(slideIndex);
        });
    });

    // Simple Slider

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(elem => elem.classList.add('hide'));
    //     slides[slideIndex - 1].classList.remove('hide');

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function changeSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function () {
    //     changeSlides(-1);
    // });
    // next.addEventListener('click', function () {
    //     changeSlides(1);
    // });

}

export default slider;
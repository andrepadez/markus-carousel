(function(window, undefined){

  var Carousel = window.Carousel = function(options){
    this.currentSlide = 0;
    this.container = options.container;
    this.maxWidth = options.maxWidth || this.container.offsetWidth;
    this.images = options.images;
    this.totalSlides = this.images.length;
    this.buildLayout();

    this.registerBehaviour();

    this.renderSlide(0);
  }

  Carousel.prototype.buildLayout = function(){

    this.wrapper = document.createElement('div');
    this.wrapper.className = "carousel-wrapper";

    this.slideWrapper = document.createElement('div');
    this.slideWrapper.className = 'slide-wrapper';

    this.controls = document.createElement('div');
    this.controls.className = 'controls';

    this.nextButton = document.createElement('button');
    this.nextButton.className = 'next';
    this.nextButton.textContent = 'Next';

    this.previousButton = document.createElement('button');
    this.previousButton.className = 'previous';
    this.previousButton.textContent = 'Previous';

    this.controls.appendChild(this.previousButton);
    this.controls.appendChild(this.nextButton);
    this.wrapper.appendChild(this.controls);
    this.wrapper.appendChild(this.slideWrapper);

    this.appendImages();

    this.container.appendChild(this.wrapper);
    this.resizeImages(this.maxWidth);

  };

  Carousel.prototype.appendImages = function(){
    var self = this;
    this.images.forEach(function(img, idx){
      var slideElem = document.createElement('div');
      slideElem.className = 'slide';
      slideElem.dataset.index = idx;

      var imgElem = document.createElement('img');
      imgElem.src = img;
      slideElem.appendChild(imgElem);
      self.slideWrapper.appendChild(slideElem);

    });
    this.slides = this.wrapper.querySelectorAll('.slide');
    //these calls to Array.prototype.slice.call
    //turns the result of querySelectorAll into a propper array
    //with methods like forEach, and more
    this.slides = Array.prototype.slice.call(this.slides);
    this.images = this.wrapper.querySelectorAll('.slide img');
    this.images = Array.prototype.slice.call(this.images);
  }; 

  Carousel.prototype.registerBehaviour = function(){
    var self = this;

    this.nextButton.addEventListener('click', function(ev){
      self.currentSlide++;
      if(self.currentSlide === self.totalSlides){
        self.currentSlide = 0;
      }
      self.renderSlide(self.currentSlide);
    });

    this.previousButton.addEventListener('click', function(ev){
      self.currentSlide--;
      if(self.currentSlide === -1){
        self.currentSlide = self.totalSlides - 1;
      }
      self.renderSlide(self.currentSlide);
    });

  };

  Carousel.prototype.renderSlide = function(index){
    this.slides.forEach(function(slide, img){
      if( slide.dataset.index == index){
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });
  };

  Carousel.prototype.resizeImages = function(maxWidth){
    this.images.forEach(function(imgElem){
      imgElem.onload = function(ev){
        if( this.width > maxWidth ){
          this.width = maxWidth;
        }
      };

      if(imgElem.complete){
        imgElem.load();
      }
    });
  };

})(window);
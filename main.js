
var compareWrapper = $('.container.compare');
var baseWrapper = $('.container.base');


$.getJSON('./data.json')
  .then( buildCarousels )
  .then(
    function(){ console.log(' SUCCESS!!!! '); },
    function(err){ console.log(err); }
  );



function buildCarousels(data){ console.log(data)

  $.each(data.compare, function(idx, collection){
    var carousel = new Carousel({
      images: collection, 
      container: compareWrapper,
      maxWidth: 500
    });
  });

  var baseCarousel = new Carousel({
    images: data.base, 
    container: baseWrapper
  });

};





var Carousel = function(options){
  this.currentSlide = 0;
  this.container = options.container;
  this.maxWidth = options.maxWidth || this.container.width();
  this.images = options.images;
  this.totalSlides = this.images.length;
  this.buildLayout();

  this.registerBehaviour();

  this.renderSlide(0);
}

Carousel.prototype.buildLayout = function(){

  this.wrapper = $('<div class="carousel-wrapper">');
  // this.wrapper.width( this.container.width() );
  this.slideWrapper = $('<div class="slide-wrapper">');

  this.controls = $('<div class="controls">');
  this.nextButton = $('<button class="next">').text('Next');
  this.previousButton = $('<button class="previous">').text('Previous');

  this.controls.append(this.previousButton).append(this.nextButton);
  this.wrapper.append(this.controls).append(this.slideWrapper);

  this.appendImages();

  this.container.append(this.wrapper);

  this.resizeImages(this.maxWidth);

};

Carousel.prototype.appendImages = function(){
  var self = this;
  this.images.forEach(function(img, idx){
    var slideElem = $('<div class="slide">').attr('data-index', idx);
    var imgElem = $('<img>').attr('src', img);

    slideElem.append(imgElem).appendTo( self.slideWrapper );
  });
  this.slides = $('.slide', this.wrapper);
  this.images = $('.slide img', this.wrapper);
}; 

Carousel.prototype.registerBehaviour = function(){
  var self = this;
  this.nextButton.one('click', function(ev){
    self.currentSlide = self.currentSlide + 1;
    if(self.currentSlide === self.totalSlides){
      self.currentSlide = 0;
    }
    self.renderSlide(self.currentSlide);
  });
  this.previousButton.click(function(ev){
    self.currentSlide--;
    if(self.currentSlide === -1){
      self.currentSlide = self.totalSlides - 1;
    }
    self.renderSlide(self.currentSlide);
  });
};

Carousel.prototype.renderSlide = function(index){
  this.slides.each(function(idx, slide){
    slide = $(slide);
    if( slide.attr('data-index') == index){
      slide.show();
    } else {
      slide.hide();
    }
  });
};

Carousel.prototype.resizeImages = function(maxWidth){
  this.images.one('load', function(ev) { console.log(this);
    if( this.width > maxWidth ){
      this.width = maxWidth;
    }
  }).each(function() {
    if(this.complete) $(this).load();
  });
}

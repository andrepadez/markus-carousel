(function(window, undefined){


  var compareWrapper = document.querySelector('.container.compare');
  var baseWrapper = document.querySelector('.container.base');

  Ajax.getData('data.json')
    .then(function(res){
      return JSON.parse(res);
    })
    .then( buildCarousels )
    .catch(function(err){
      console.error('Error', err.status, ':', err.message);
      console.log(err.stack);
    });

  function buildCarousels(data){ console.log(data)
    data.compare.forEach(function(collection, idx){
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

})(window);

// the first and last line of this file (and all others)
// are part of javascript's best practises
// used in order not to pollute the global scope
// so there are no variable collisions with other libraries/files
// don't worry too much about how it's used,
// it also becomes obsolete with the module loaders that are now a standard
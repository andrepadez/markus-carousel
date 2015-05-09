(function(window, undefined){

  var Ajax = window.Ajax = {

    getData: function(url){
      return new Promise(function(fulfill, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function(ev){
          if(this.status < 400){
            fulfill(this.responseText);
          } else {
            reject({
              status: this.status,
              message: this.statusText
            });
          }
        }

        xhr.send();
      });
    }
    
  };

})(window);

//using native implementation for Promise (might need a polyfill for older browsers)
//XMLHttpRequest is the proper way to make Ajax calls
// App logic.
window.myApp = {};


document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  } //Improvement: remove vestigial multi-page init

  //Improvement: smoke-loader
  myApp.services.cardInfo({});
  //Improvement: sloppy app init
});
// App logic.
window.ccncc = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (ccncc.controllers.hasOwnProperty(page.id)) {
    ccncc.controllers[page.id](page);
  }
});
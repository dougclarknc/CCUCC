// App logic.
window.ccucc = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  // Each page calls its own initialization controller.
  if (ccucc.controllers.hasOwnProperty(page.id)) {
    ccucc.controllers[page.id](page);
  }
});
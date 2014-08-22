var View = require('view');

/**
 * NavigationView
 * @constructor
 */
var NavigationView = View.extend({

  events: {
    'click .js-nav-item': 'onClick'
  },

  elements: {
    '.js-nav-item': 'all:items'
  },

  /**
   * Sets the current menu item
   * @param   {String} name
   * @returns {NavigationView}
   */
  setCurrent: function(name) {
    for (var i=0; i<this.items.length; ++i) {
      var item = this.items[i];
      if (item.hasAttribute('data-page')) {
        var page = item.getAttribute('data-page');
        if (page === name) {
          item.classList.add('is-current');
        } else {
          item.classList.remove('is-current');
        }
      }
    }
    return this;
  },

  /**
   * Handles clicks on the navigation items
   * @param   {MouseEvent} event
   */
  onClick: function(event) {
    if (event.target.hasAttribute('data-page')) {
      this.emit('navigate', event.target.getAttribute('data-page'));
    }
  }

});

module.exports = function(options) {
  return new NavigationView(options);
};

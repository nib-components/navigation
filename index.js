var View = require('view');

/**
 * Navigation view
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
   * Find a navigation item by page
   * @private
   * @param   {String} name
   * @returns {HTMLElement}
   */
  findByPage: function(name) {
    for (var i=0; i<this.items.length; ++i) {

      var item = this.items[i];

      if (item.hasAttribute('data-page')) {
        var page = item.getAttribute('data-page');
        if (page === name) {
          return item;
        }
      }

    }
    return null;
  },

  /**
   * Get whether the menu item is the current menu item
   * @param   {String}    name
   * @returns {Boolean}
   */
  isCurrent: function(name) {

    //get the menu item
    var item = this.findByPage(name);

    //check the page exists
    if (!item) {
      throw new Error('Menu item for page "'+name+'" not found.');
    }

    return item.classList.contains('is-current');
  },

  /**
   * Set whether the current menu item
   * @param   {String}    name
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
   * Get whether the menu item is disabled
   * @param   {String}    name
   * @returns {Boolean}
   */
  isDisabled: function(name) {

    //get the menu item
    var item = this.findByPage(name);

    //check the page exists
    if (!item) {
      throw new Error('Menu item for page "'+name+'" not found.');
    }

    return item.classList.contains('is-disabled');
  },

  /**
   * Set whether the menu item is disabled
   * @param   {String}    name
   * @param   {Boolean}   disabled
   * @returns {NavigationView}
   */
  setDisabled: function(name, disabled) {

    //get the menu item
    var item = this.findByPage(name);

    //check the menu item exists
    if (!item) {
      throw new Error('Menu item for page "'+name+'" not found.');
    }

    if (disabled) {
      item.classList.add('is-disabled');
    } else {
      item.classList.remove('is-disabled');
    }

    return this;
  },

  /**
   * Handles clicks on the navigation items
   * @param   {MouseEvent} event
   */
  onClick: function(event) {
    if (event.target.hasAttribute('data-page')) {

      //get the menu item name
      var name = event.target.getAttribute('data-page');

      //check the menu item is not disabled
      if (this.isDisabled(name)) {
        return;
      }

      //indicate we want to navigate to the page
      this.emit('navigate', name);

    }
  }

});

module.exports = NavigationView;

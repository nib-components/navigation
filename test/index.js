var assert = require('assert');
var navigation = require('navigation');

describe('navigation', function() {

  var navElement;
  var navigationView;

  beforeEach(function () {

    navElement = document.createElement('div');
    navElement.innerHTML = '<ul>' +
                              '<li class="nav-item"><a class="nav-item__link-1 js-nav-item" href="/some/place/else" data-page="page-name-1">OMG Page 1</a></li>' +
                              '<li class="nav-item"><a class="nav-item__link-2 js-nav-item" href="/some/place/else/else" data-page="page-name-2">OMG Page 2</a></li>' +
                            '</ul>';

    navigationView = navigation({ el: navElement });
  });

  describe('setCurrent tests', function() {

    it('should set current class on current page', function() {
      navigationView.setCurrent('page-name-2');
      assert(navElement.querySelector('.nav-item__link-2').classList.contains('is-current'));
    });

    it('should remove current class on other pages', function() {
      navigationView.setCurrent('page-name-2');
      assert(!navElement.querySelector('.nav-item__link-1').classList.contains('is-current'));
    });

  });

  describe('event tests', function () {

    it('should emit navigate event', function(cb) {
      navigationView.on('navigate', function(pageName) {
        assert.equal('page-name-2', pageName);
        cb();
      });
      navElement.querySelector('.nav-item__link-2').click();
    });

  });

});
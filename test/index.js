var assert          = require('assert');
var NavigationView  = require('navigation');

describe('navigation', function() {

  var element;
  var view;

  beforeEach(function () {

    element = document.createElement('div');
    element.innerHTML =
      '<ul>' +
        '<li class="nav-item"><a class="nav-item__link js-nav-item js-nav-item-1" data-page="page-name-1">OMG Page 1</a></li>' +
        '<li class="nav-item"><a class="nav-item__link js-nav-item js-nav-item-2" data-page="page-name-2">OMG Page 2</a></li>' +
      '</ul>'
    ;

    view = new NavigationView({ el: element });

    document.body.appendChild(view.el); //necessary for events to fire
  });

  afterEach(function () {
    document.body.removeChild(view.el);
  });

  describe('findByPage()', function() {

    it('should return a menu item', function() {
      assert.equal(element.querySelector('.js-nav-item-2'), view.findByPage('page-name-2'));
    });

    it('should return null', function() {
      assert.equal(null, view.findByPage('page-name-3'));
    });

  });

  describe('isCurrent()', function() {

    it('should return true', function() {
      element.querySelector('.js-nav-item-2').classList.add('is-current');
      assert(view.isCurrent('page-name-2'));
    });

    it('should return false', function() {
      assert(!view.isCurrent('page-name-1'));
      assert(!view.isCurrent('page-name-2'));
    });

    it('should throw', function() {
      assert.throws(function() {
        view.isCurrent('page-name-3');
      });
    });

  });

  describe('setCurrent()', function() {

    it('should set current class on current page', function() {
      view.setCurrent('page-name-2');
      assert(!element.querySelector('.js-nav-item-1').classList.contains('is-current'));
      assert(element.querySelector('.js-nav-item-2').classList.contains('is-current'));
    });

    it('should remove current class on other pages', function() {
      element.querySelector('.js-nav-item-1').classList.add('is-current');
      view.setCurrent('page-name-2');
      assert(!element.querySelector('.js-nav-item-1').classList.contains('is-current'));
      assert(element.querySelector('.js-nav-item-2').classList.contains('is-current'));
    });

  });

  describe('isDisabled()', function() {

    it('should return true', function() {
      element.querySelector('.js-nav-item-2').classList.add('is-disabled');
      assert(view.isDisabled('page-name-2'));
    });

    it('should return false', function() {
      assert(!view.isDisabled('page-name-1'));
      assert(!view.isDisabled('page-name-2'));
    });

    it('should throw', function() {
      assert.throws(function() {
        view.isDisabled('page-name-3');
      });
    });

  });

  describe('setDisabled()', function() {

    it('should set disabled class on current menu items', function() {
      view.setDisabled('page-name-2', true);
      assert(element.querySelector('.js-nav-item-2').classList.contains('is-disabled'));
    });

    it('should remove disabled class on other menu items', function() {
      element.querySelector('.js-nav-item-2').classList.add('is-disabled');
      view.setDisabled('page-name-2', false);
      assert(!element.querySelector('.js-nav-item-1').classList.contains('is-disabled'));
    });

  });

  describe('Events', function () {

    it('click should emit navigate event', function(cb) {

      view.on('navigate', function(name) {
        assert.equal('page-name-2', name);
        cb();
      });

      element.querySelector('.js-nav-item-2').click();

    });

    it('click should not emit navigate event', function() {

      view.on('navigate', function(name) {
        assert(false, '`navigate` event emitted despite menu item being disabled');
      });

      view.setDisabled('page-name-2', true);
      element.querySelector('.js-nav-item-2').click();

    });

  });

});
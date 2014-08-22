navigation
==========

Navigation component for navigating around the places.

Markup
======

    <div class="quote-nav js-navigation">
        <ul class="nav nav--horizontal">
            <li class="nav-item"><a class="nav-item__link js-nav-item" href="/some/place/else" data-page="page-name-1">OMG Page 1</a></li>
            <li class="nav-item"><a class="nav-item__link js-nav-item" href="/some/place/else/else" data-page="page-name-2">OMG Page 2</a></li>
        </ul>
    </div>

Usage
=====

    var navigationView = require('navigation')({
      el: document.querySelector('.js-navigation')
    });

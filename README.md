# navigation

Component for programatically changing the state of navigation lists.

## Usage

HTML:

    <div class="js-navigation">
        <ul>
            <li class="js-nav-item" data-page="page-name-1"><a>OMG Page 1</a></li>
            <li class="js-nav-item" data-page="page-name-2"><a>OMG Page 2</a></li>
        </ul>
    </div>

JavaScript:

    var View = require('navigation');
    var view = new View({
      el: document.querySelector('.js-navigation')
    });

## API

### new View(options)

Create a new navigation view.

- options.el - The navigation element

### .isCurrent(page)

Get whether the menu item for the specified page is the currently selected menu item.

### .setCurrent(page)

Set the specified page as the currently selected menu item.

### .isDisabled(page)

Get whether the menu item is disabled.

### .setDisabled(page, disabled)

Set whether the menu item is disabled.

### Events

#### navigate

Emitted when a menu item is not disabled and is clicked.
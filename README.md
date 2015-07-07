# animate.css-js

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

> Javascript helper for animate.css

## How to use

[![NPM](https://nodei.co/npm/animate.css-js.png?downloads=true)](https://nodei.co/npm/animate.css-js/)

### browserify

add the animate.css styles

```js
var animateCss = require('animate.css-js');
var element = document.querySelector('.some-element');

// use animateCss.show(..), animateCss.hide(..) or animateCss.animate(..)
```

### standalone

- add the animate.css styles
- add animateCss.bundle.js


```js
// use animateCss.show(..), animateCss.hide(..) or animateCss.animate(..)
```

### API

- `animate(element, [, options])`
    - options:
        - animationName {string} - one of the animate.css animation names
        - duration {number} - the animation duration in ms
        - callbacks {function[]}
- `show(element[, options])`
     - options:
        - animationName {string} - one of the animate.css animation names, defaults to 'slideInDown'
        - duration {number} - the animation duration in ms, defaults to 350
        - callbacks {function[]}
- `hide(element[, options])`
    - options:
        - animationName {string} - one of the animate.css animation names, defaults to 'slideOutUp'
        - duration {number} - the animation duration in ms, defaults to 350
        - callbacks {function[]}

### Example

```js
animateCss.animate( element, {
    animationName: 'zoomIn',
    duration: 500,
    callbacks: [
        function(){
            // zoomIn animation complete
        }
    ]
});
```

## build

```sh
npm run build
```

## License

MIT

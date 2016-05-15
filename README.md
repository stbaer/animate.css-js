# animate.css-js

> Javascript helper for animate.css

## How to use

add the animate.css styles

```
var animateCss = require('animate.css-js'); // Or add animateCss.bundle.js for the standalone version
var element = document.querySelector('.some-element');

// use animateCss.show(..), animateCss.hide(..) 
// or animateCss.animate(..)
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

```
animateCss.animate( element, {
    animationName: 'zoomIn',
    duration: 500,
    callbacks: [
        function(){
            // zoomIn animation complete, do sth
        }
    ]
});
```

## build

```
$ npm install
$ npm run build
```

## License

MIT

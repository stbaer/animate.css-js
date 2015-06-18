# animate.css-js
javascript helper for animate.css without dependencies for modern browsers

## How to use

### browserify

- npm i stbaer/animate.css-js --save-dev
- add the animate.css styles


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

- show(element, options)
- hide(element, options)
- animate(element, options)
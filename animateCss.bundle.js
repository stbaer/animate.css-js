(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.animateCss = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Set the css animationDuration on an element (el). Leave duration undefined to reset;
 * @private
 *
 * @param {Element} el
 * @param {number} [duration] in ms
 */
var setAnimationDuration = function(el, duration){
    el.style['-webkit-animation-duration'] = duration ? duration + 'ms' : '';
    el.style['animation-duration'] = duration ? duration + 'ms' : '';
};

/**
 * Add or remove the 'animated' class and the animation type class.
 * @private
 *
 * @param {Element} el
 * @param {String} animationName
 * @param {Boolean} [doAdd=true] - set to false to remove the classes
 */
var setAnimateCssClasses = function(el, animationName, doAdd){

    var addOrRemove = doAdd !== false ? 'add' : 'remove';

    el.classList[addOrRemove]('animated');
    el.classList[addOrRemove](animationName);
};

/**
 *
 * @param {Element} el
 * @param {object} opts
 * @property {string} opts.animationName
 * @property {number} [opts.duration]
 * @param {function[]} [opts.callbacks=[]]
 */
var animateCss = function (el, opts) {

    opts.callbacks = opts.callbacks || [];

    var className = opts.animationName;
    var animEndEventNames = ["webkitAnimationEnd", "animationend", "oanimationend", "mozAnimationEnd", "MSAnimationEnd"];

    if (opts.duration) {
        setAnimationDuration(el, opts.duration);
    }

    setAnimateCssClasses(el, className);

    var animEnd = function () {

        //remove the animate.css classes
        setAnimateCssClasses(el, className, false);

        //remove event listeners
        animEndEventNames.forEach(function(evName){
            el.removeEventListener(evName, animEnd);
        });

        if (opts.duration) {
            //reset animationDuration
            setAnimationDuration(el);
        }
        // call the callbacks
        opts.callbacks.forEach(function(cb){
            cb();
        });
    };

    animEndEventNames.forEach(function(evName){
        el.addEventListener(evName, animEnd);
    });
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var show = function (el, opts) {
    el.classList.remove('hidden');
    opts = opts || {};

    opts.animationName = opts.animationName || 'slideInDown';
    opts.duration = opts.duration || 350;

    animateCss(el, opts);
};

/**
 *
 * @param {Element} el
 * @param {object} [opts]
 * @property {string} [opts.animationName='slideInDown']
 * @property {number} [opts.duration=300]
 * @param {function[]} [opts.callbacks]
 */
var hide = function (el, opts) {

    opts = opts || {};

    opts.animationName = opts.animationName || 'slideOutUp';
    opts.duration = opts.duration || 300;
    opts.callbacks = opts.callbacks || [];

    //if the element is already hidden
    if(el.classList.contains('hidden')){
        //call the callbacks directly
        opts.callbacks.forEach(function(cb){
            cb();
        });
        //and get out
        return;
    }

    opts.callbacks.push( function () {
        el.classList.add('hidden');
    });
    animateCss(el, opts);
};

/**
 * API
 *
 * @type {{animateCSS: Function, show: Function, hide: Function}}
 */
var animations = {
    animateCSS: animateCss,
    // show and hide convenience functions
    show: show,
    hide: hide
};

module.exports = animations;
},{}]},{},[1])(1)
});
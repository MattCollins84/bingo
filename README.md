# Bingo

Hello!

This is my 90 Ball bingo game, you can access a working version of the bingo game at http://mattcollins84.github.io/bingo

Let me tell you a bit more about it...

## Dependencies
There are no dependencies, and I have not used any 3rd party libraries or frameworks. The whole game is made up from the following files:

* `index.html` - the main file
* `ticket.js` - a class for an individual bingo ticket
* `bingo.js` - game logic and other js
* `bingo.css` - some simple css to make it look nice(ish!)

There is one place where I have taken something I found online (a method to shuffle an array) and used that, I have included a link to where I found it in `bingo.js`.

## ES6
The master branch (and the version on the link above) is written with ES6 JavaScript. I think it should be all supported by modern browsers (certainly the latest version of Chrome!).

If you do run into issues with this version, then please checkout the `es5` branch of this repo to get a version that should work in all browsers, albeit in ES5 JavaScript.

## Other stuff
I have tried to be fairly verbose with my comments so you can see my thinking.

The game will draw balls every 100ms as soon as the page is loaded, once a game is over, just refresh the page to start again.

If you have any comments or questions, please let me know!
# iswear

***iswear*** is a light-weight utility library for performant asynchronous programming with Promises ([Promises/A+](https://promisesaplus.com/) specification).

- 2KB _unzipped_
- _*dependency-free*_
- available as npm package and browser bundle

To learn about asynchronous programming with Promises, please explore the [appendix](#appendix).

[ ![Current Stable Release Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Cfeusier/iswear/releases)
[ ![Latest Build Status for iswear](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://codeship.com/projects/86959/)
[ ![Current Stable npm Release](https://img.shields.io/badge/npm-install%20iswear-lightgrey.svg)](https://www.npmjs.com/package/iswear)

---

> **Created by [Clark Feusier](http://clarkfeusier.com/pages/about)**

---

1. [Installation](#installation)
1. [Basic Usage Example](#basic-usage-example)
1. [Documentation](#documentation)
    1. [API Reference](#api-reference)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing-to-iswear)
1. [Development Requirements](#development-requirements)
    1. [Installing Development Requirements](#installing-development-requirements)
    1. [Development Dependencies](#development-dependencies)
    1. [Installing Development Dependencies](#installing-development-dependencies)
    1. [Building for Deployment](#building-for-deployment)
    1. [Running Tests](#running-tests)
1. [License](#license)
1. [Appendix](#appendix)

---

## Installation

**iswear** is available in two different formats:

- [an npm package](https://www.npmjs.com/package/iswear)
- [a browser bundle](https://github.com/Cfeusier/iswear/releases)

#### Install iswear for node environments

Install npm package from command-line

```sh
npm install iswear
```

Require module for use in desired file

```js
var iswear = require('iswear');
```

#### Install iswear for the browser

Download **iswear** from [the iswear release page](https://github.com/Cfeusier/iswear/releases)

Unzip the downloaded file, and move `iswear.min.js` to a desired project location

Within web pages of the desired project, include `iswear.min.js`

```html
<script src="iswear.min.js"></script>
<!-- iswear is now attached to window and ready for use -->
```

---

### Basic Usage Example

The primary use-case of **iswear** is the `iswear.swearify` method, which the example in this section demonstrates. For documentation and examples covering other methods on the `iswear` object, please refer to the [API Reference section](#api-reference).

```js
var iswear = require('iswear'); // assuming we are in node environment
var fs = require('fs');

// create a Promise interface for the fs.readFile method
var readFilePromised = iswear.swearify(fs.readFile, fs);

readFilePromised('/example/file.html', 'utf8').then(function(result) {
  // do something with the result of promise resolution
});

```

## Documentation

#### _iswear_

This object provides the utility methods of this library.

Access `iswear` by requiring the npm package in node environments.

```js
var iswear = require('iswear'); // node environment
```

Access `iswear` by including the browser bundle in a web document

```html
<script src="iswear.min.js"></script>
<script>
  window.iswear // browser environment
</script>
```

### API Reference

- [**`swearify`**](#swearify)
- [**`defer`**](#defer)
- [**`resolved`**](#resolved)
- [**`rejected`**](#rejected)

#### swearify

#### `swearify(cb: function, ctx: object): function`

Wraps the supplied function in a promise and binds the wrapped function to the supplied context. This method is especially useful for converting asynchronous a node.js method (that receives a callback) into a promise.

```js
var iswear = require('iswear');
var users = require('./models/users');

// create a Promise interface for the users.find method
var findPromised = iswear.swearify(users.find, users);

findPromised({ email: "example@gmail.com" }).then(function(user) {
  // do something cool with the promise resolution (the user record)
}).catch(function(err) {
  // do something cool with the result of the promise rejection
});
```

#### defer

#### `defer(): Deferred<T>`

Returns a new `Deferred` object that acts as a proxy for managing a new `Promise` object. Note, more often than not, the `swearify` method is a better choice, but occassionally you will need the `defer` interface.

```js
var iswear = require('iswear');

function exampleAsync(arg) {
  var sworn = iswear.defer();

  sworn.promise.then(function(data) {
    // do something with data
  }).catch(function(err) {
    // do something with err
  });

  someAsyncFunction(arg, function(err, data) {
    if (err) {
      sworn.reject(err);
    } else {
      sworn.resolve(data);
    }
  });

  return sworn.promise;
}
```

#### resolved

#### `resolved(val: *): Promise<T>`

Returns a new promise object that has been resolved with the supplied value.

```js
var iswear = require('iswear');
var someData = 'data coming from some async operation, probably';

var resolvedPromise = iswear.resolved(someData);
// do something with resolvedPromise
```

#### rejected

#### `rejected(error: *): Promise<T>`

Returns a new promise object that has been rejected with the supplied error.

```js
var iswear = require('iswear');
var someError = 'some error resulting from some async operation, probably';

var rejectedPromise = iswear.rejected(someError);
// do something with rejectedPromise
```

---

## Roadmap

The future of **iswear** is managed through this repository's **issues** &mdash; [view the roadmap here](https://github.com/Cfeusier/iswear/issues).

## Contributing to _iswear_

We welcome contributions, but please read our [contribution guidelines](CONTRIBUTING.md) before submitting your work. The development requirements and instructions are below.

## Development Requirements

- Node 0.10.x
- npm 2.x.x

### Installing Development Requirements

Install Node (bundled with npm) using [Homebrew](http://brew.sh/):

```sh
brew install node
```

## Development Dependencies

- grunt-cli (global install)
- grunt
- grunt-contrib-uglify
- grunt-shell
- mocha
- chai
- underscore

### Installing Development Dependencies

Install project and development dependencies using npm:

```sh
npm install
```

## Building for Deployment

To build `src/iswear.js` into `dist/iswear.min.js`, use the following grunt task:

```sh
grunt build
```

### Running Tests

After installing the above dependencies, tests can be run using the following command:

```sh
grunt test
```

---

## [License](LICENSE.md)

**iswear** - light-weight Promise library for performant asynchronous programming

_Copyright (C) 2015 Clark Feusier <cfeusier@gmail.com> - All Rights Reserved_

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[**COMPLETE LICENSE**](LICENSE.md)

---

## Appendix

[Asynchronous Processing Model](https://en.wikipedia.org/wiki/Asynchronous_method_invocation)

> This model processes instructions of a certain type (usually costly operations like I/O) _asynchronously_. The processor starts to process those instructions’ operations, and then hands those operations an instruction of how to return the result when complete; then, the processor continues to the next instruction without waiting for the prior instructions’ operations to complete. As soon as any operations complete, they can use the instructions they were provided at start to notify the processor of the result. This model allows the processor to avoid getting blocked by costly operations ([source](http://clarkfeusier.com/2015/01/18/interview-question-asynchronous-map)).

[Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

> The Promise interface represents a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers to an asynchronous action's eventual success or failure. This lets asynchronous methods return values like synchronous methods: instead of the final value, the asynchronous method returns a promise of having a value at some point in the future ([source](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)).

[Callbacks](https://en.wikipedia.org/wiki/Callback_(computer_programming))

>  A callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time ([source](https://en.wikipedia.org/wiki/Callback_(computer_programming))).

#### [Back to Top](#)

---

&copy; 2015 [Clark Feusier](http://clarkfeusier.com). All rights reserved.

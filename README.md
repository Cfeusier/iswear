# iswear

***iswear*** conforms to the [Promises/A+](https://promisesaplus.com/) specification for Promise implementations.

## Documentation

### Installation

`npm install iswear`

### Usage Examples

```js
var p = require('iswear');
var fs = require('fs');

var readFilePromised = p.swearify(fs.readFile, fs);

readFilePromised('/example/file.html', 'utf8').then(function(result) {
  // do something with the result of promise resolution
});

```

```js
var p = require('iswear');
var users = require('./models/users');

var findPromised = p.swearify(users.find, users);

findPromised({ email: "example@gmail.com" }).then(function(user) {
  // do something cool with the promise resolution (the user record)
}).catch(function(err) {
  // do something cool with the result of the promise rejection
});
```

### Dependencies

1. Underscore.js

*if you would like to run (or write) tests, you will need to add mocha, chai, and jQuery, in addition to underscore*

### Running the Tests

`npm test`

### Contributing

- Fork the repository
- Clone the forked repo to your local machine
- Fix or extend the code locally
- Push to your remote forked repo
- Submit an intelligible pull request

---

This is a project I completed while studying at [Hack Reactor](http://hackreactor.com).

&copy; 2015 [Clark Feusier](http://clarkfeusier.com). All rights reserved.

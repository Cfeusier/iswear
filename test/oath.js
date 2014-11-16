/* globals describe, it, xit */
var chai   = require('chai');
var oath   = require('../lib/oath.js');
var expect = chai.expect;
var _      = require('underscore');

oath.promisify = oath.promisify || function () {};

var promiseTimeout = function (func, time) {
  var defer = oath.defer();
  setTimeout(function () {
    defer.resolve(func());
  }, time);
  return defer.promise;
};

describe('oath', function () {
  describe('Promise', function () {
    describe('.then', function () {
      it('should call then on a promise resolution', function (done) {
        promiseTimeout(function () {}, 5)
          .then(done);
      });

      it('should pass a resolved value to then', function (done) {
        var makePromise = function (num) {
          return promiseTimeout(function () {
            return num;
          });
        };
        makePromise(6)
          .then(function (num) {
            expect(num).to.equal(6);
            done();
          });
      });
    });

    describe('.catch', function () {
      it('should call catch on a rejection', function (done) {
        var failingPromise = function () {
          var defer = oath.defer();
          setTimeout(function () {
            defer.reject();
          }, 5);
          return defer.promise;
        };
        failingPromise()
          .catch(function () {
            done();
          });
      });

      it('should call catch with the error passed to .reject', function (done) {
        var failingPromise = function () {
          var defer = oath.defer();
          setTimeout(function () {
            defer.reject('Oh no!');
          }, 5);
          return defer.promise;
        };
        failingPromise()
          .catch(function (err) {
            expect(err).to.equal('Oh no!');
            done();
          });
      });
    });
  });

  describe('promisify', function () {
    var bigEnough = 100;
    var tooSmall = 10;
    var nodeStyle = function (num, callback) {
      setTimeout(function () {
        if (num > 50) {
          callback(null, 'That\'s a big number!');
        } else {
          callback('Not big enough!', null);
        }
      });
    };

    var promised = oath.promisify(nodeStyle);
    xit('should call then on success', function (done) {
      promised(bigEnough)
        .then(function (message) {
          expect(message).to.equal('That\'s a big number!');
          done();
        });
    });

    xit('should call catch on error', function (done) {
      promised(tooSmall)
        .catch(function (message) {
          expect(message).to.equal('Not big enough!');
          done();
        });
    });
  });

  describe('chaining', function () {
    it('should allow you to chain promises using then', function (done) {
      var step1 = function (num) {
        return promiseTimeout(function () {
          return num + 10;
        }, 5);
      };

      var step2 = function (num) {
        return promiseTimeout(function () {
          return num + 20;
        }, 5);
      };

      step1(100).then(step2).then(function (num) {
        expect(num).to.equal(130);
        done();
      });
    });

    it('should jump directly to catch if an error is thrown during chaining', function (done) {
      var step1 = function (num) {
        return promiseTimeout(function () {
          return num + 10;
        }, 5);
      };

      var failingStep = function () {
        var defer = oath.defer();
        setTimeout(function () {
          defer.reject('Oops!');
        }, 5);
        return defer.promise;
      };

      var didItRun = false;
      var shouldntRun = function (num) {
        var defer = oath.defer();
        didItRun = true;
        setTimeout(_.partial(defer.resolve.bind(defer), num), 5);
        return defer.promise;
      };

      step1(100).then(failingStep).then(shouldntRun).catch(function errorOut(err) {
        expect(err).to.equal('Oops!');
        expect(didItRun).to.equal(false);
        done();
      });
    });
  });
});

var _ = require('underscore');

var rejected = {}, resolved = {}, waiting = {};
var eMsg = "Too strong of a fear of failure can be crippling";
var pMsg = "Don't promise more than you can deliver...";


// Promise
var Promise = function (value, status) {
  this.value = value;
  this.status = status || waiting;
  _.bindAll(this, 'then', 'catch', 'serve', 'ditch', 'spark', 'extinguish');
};

Promise.prototype.then = function (success, _failure) {
  if (this.later) throw new Error(pMsg);
  this.later = success;
  this.battersBox = defer();
  if (this.status === resolved) this.serve(this.value, true);
  if (_failure) this.catch(_failure);
  return this.battersBox.promise;
};

Promise.prototype.catch = function (failure) {
  if (this.forFailure) throw new Error(eMsg);
  this.forFailure = failure;
  if (this.status === rejected) this.ditch(this.value, true);
};

Promise.prototype.serve = function(data, override) {
  if (this.status !== waiting && !override) throw new Error(pMsg);
  this.status = resolved;
  if (this.later) {
    this.value = this.later(data);
    this.spark();
  }
};

Promise.prototype.ditch = function(error, override) {
  if (this.status !== waiting && !override) throw new Error(pMsg);
  this.status = rejected;
  this.extinguish(error);
};

Promise.prototype.spark = function() {
  if (this.value && this.value.then) {
    this.value.then(this.battersBox.resolve);
    this.value.catch(this.battersBox.reject);
  }
};

Promise.prototype.extinguish = function(error) {
  if (this.forFailure) {
    this.value = error;
    this.forFailure(error);
  } else {
    if (this.battersBox) this.battersBox.reject(error);
  }
};


// Deferred
var Deferred = function (promise) {
  this.promise = promise;
  _.bindAll(this, 'resolve', 'reject');
};

Deferred.prototype.resolve = function (data) {
  this.promise.serve(data);
};

Deferred.prototype.reject = function (error) {
  this.promise.ditch(error);
};


// External interface for creating and managing promises
var defer = function () { return new Deferred(new Promise()); };


// Utility Patterns

// Abstracts away cb pattern
var resolvable = function(cb, error, success) {
  cb(function(err, data) {
    err ? error(err) : success(data);
  });
};

// Creates a promise out of a provided callback function
var swearify = function(cb, ctx) {
  return function() {
    var args = _.toArray(arguments);
    var sworn = defer();
    var handle = function(handler) { cb.apply(ctx, args.concat([handler])); };

    resolvable(handle, sworn.reject, sworn.resolve);
    return sworn.promise;
  };
};

// Creates resolved promise object with value
var resolved = function(val) { return new Promise(val, resolved); };

// Creates rejected promise object with error
var rejected = function(error) { return new Promise(error, rejected); };


// Exports
module.exports.swearify = swearify;
module.exports.resolved = resolved;
module.exports.rejected = rejected;
module.exports.defer = defer;


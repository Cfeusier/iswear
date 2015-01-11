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

Deferred.prototype.resolve = function (data) { this.promise.serve(data); };
Deferred.prototype.reject = function (error) { this.promise.ditch(error); };

// Export
module.exports.defer = defer = function () { return new Deferred(new Promise()); };

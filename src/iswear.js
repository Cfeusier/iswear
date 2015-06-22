/**
 * iswear - light-weight Promises library for performant asynchronous programming
 * iswear.js
 * Copyright 2015 Clark Feusier <cfeusier@gmail.com>
 */


/* Registries and Error Messages */
var rejected = {},
    resolved = {},
    waiting = {},
    eMsg = "Too strong of a fear of failure can be crippling",
    pMsg = "Don't promise more than you can deliver...";


/**
 * @private
 * @param {[*]} value [the promised value or undefined]
 * @param {[object]} status [current status of promise, defaults to empty object]
 * @constructor
 */
function Promise(value, status) {
  this.value = value;
  this.status = status || waiting;
  bindAll(this, 'then', 'catch', 'serve', 'ditch', 'spark', 'extinguish');
};


/**
 * @private
 * @param {[function]} success [function to invoke with resolution of async processing]
 * @param {[function]} _failure [function to invoke with rejection, use .catch instead]
 * @return [promise]
 */
Promise.prototype.then = function(success, _failure) {
  if (this.later) throw new Error(pMsg);
  this.later = success;
  this.battersBox = defer();
  if (this.status === resolved) this.serve(this.value, true);
  if (_failure) this.catch(_failure);
  return this.battersBox.promise;
};


/**
 * @private
 * @param {[function]} failure [function to invoke on rejection of promise]
 * @return [undefined]
 */
Promise.prototype.catch = function(failure) {
  if (this.forFailure) throw new Error(eMsg);
  this.forFailure = failure;
  if (this.status === rejected) this.ditch(this.value, true);
};


/**
 * @private
 * @param {[*]} data [result from async operation]
 * @param {[boolean]} override [flag to force resolution]
 * @return [undefined]
 */
Promise.prototype.serve = function(data, override) {
  if (this.status !== waiting && !override) throw new Error(pMsg);
  this.status = resolved;
  if (this.later) {
    this.value = this.later(data);
    this.spark();
  }
};


/**
 * @private
 * @param {[error]} error [error result from async operation]
 * @param {[boolean]} override [flag to force rejection]
 * @return [undefined]
 */
Promise.prototype.ditch = function(error, override) {
  if (this.status !== waiting && !override) throw new Error(pMsg);
  this.status = rejected;
  this.extinguish(error);
};


/**
 * @private
 * @return [undefined] [registers promise handlers and sparks resolution]
 */
Promise.prototype.spark = function() {
  if (this.value && this.value.then) {
    this.value.then(this.battersBox.resolve);
    this.value.catch(this.battersBox.reject);
  }
};


/**
 * @private
 * @param {[error]} error [error result from async operation]
 * @return [undefined] [invokes failure handler with error]
 */
Promise.prototype.extinguish = function(error) {
  if (this.forFailure) {
    this.value = error;
    this.forFailure(error);
  } else {
    if (this.battersBox) this.battersBox.reject(error);
  }
};


/**
 * @private
 * @param {[promise]} promise [the promise object to proxy]
 * @constructor
 */
function Deferred(promise) {
  this.promise = promise;
  bindAll(this, 'resolve', 'reject');
}


/**
 * @private
 * @param {[*]} data [data with which to resolve the proxied promise]
 * @return [undefined] [resolves proxied promise with input data]
 */
Deferred.prototype.resolve = function(data) {
  this.promise.serve(data);
};


/**
 * @private
 * @param {[error]} error [error with which to reject the proxied promise]
 * @return [undefined] [rejects proxied promise with error]
 */
Deferred.prototype.reject = function(error) {
  this.promise.ditch(error);
};


/**
 * @private
 * @param {[function]} func [function to bind]
 * @param {[object]} ctx [context object with which to bind the function]
 * @return [function] [function bound to the specified context object]
 */
function bind(func, ctx) {
  var ctxArgs = Array.prototype.slice.call(arguments, 2);
  return function() {
    var allArgs = ctxArgs.concat(Array.prototype.slice.call(arguments));
    return func.apply(ctx, allArgs);
  };
}


/**
 * @private
 * @param {[object]} obj [the context object with which to bind all the arguments]
 * @return [object] [object bound/extended with functions]
 */
function bindAll(obj) {
  for (var key, i = 1, length = arguments.length; i < length; i++) {
    key = arguments[i];
    obj[key] = bind(obj[key], obj);
  }
  return obj;
}


/**
 * @private
 * @param {[function]} cb [async operation to abstract into a resolvable]
 * @param {[function]} _failure [function to handle error from async operation]
 * @param {[function]} success [function to handle success of async operation]
 * @return [undefined]
 */
function resolvable(cb, _failure, success) {
  cb(function(err, data) {
    err ? _failure(err) : success(data);
  });
}


/**
 * @public
 * @param {[function]} cb [function to convert into a swearified function]
 * @param {[function]} ctx [the context in which to invoke the swearified function]
 * @return [function] [swearified function created out of provided callback function]
 */
function swearify(cb, ctx) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var sworn = defer();
    var handle = function(handler) {
      cb.apply(ctx, args.concat([handler]));
    };
    resolvable(handle, sworn.reject, sworn.resolve);
    return sworn.promise;
  };
}


/**
 * @public
 * @param {[*]} val [the value with which to create a resolved promise]
 * @return [promise] [resolved promise object with value]
 */
function resolved(val) {
  return new Promise(val, resolved);
}


/**
 * @public
 * @param {[*]} error [the error with which to create a rejected promise]
 * @return [promise] [rejected promise object with error]
 */
function rejected(error) {
  return new Promise(error, rejected);
}


/**
 * @public
 * acts as external interface for creating and managing promises
 * @return [deferred] [empty deferred proxy for empty promise object]
 */
function defer() {
  return new Deferred(new Promise());
}


/**
 * public iswear module
 */
module.exports = {
  swearify: swearify,
  defer: defer,
  resolved: resolved,
  rejected: rejected
};

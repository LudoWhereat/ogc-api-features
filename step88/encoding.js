/*!
 * accepts
 * Copyright(c) 2020 lathoub
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 * inspired by accepts https://www.npmjs.com/package/accepts
 */

 'use strict'

var Negotiator = require('negotiator')
var mime = require('mime-types')
var url = require('url');

/**
 * Module exports.
 * @public
 */

module.exports = Encoding

/**
 * Create a new Encoding object for the given req.
 *
 * @param {object} req
 * @public
 */

function Encoding (req) {
    if (!(this instanceof Encoding)) {
      return new Encoding(req)
    }

    this.url = req.url;
    this.headers = req.headers
    this.negotiator = new Negotiator(req)
  }
  
/**
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json".
 *
 * @return {String|Boolean}
 * @public
 */

  Encoding.prototype.type = function () {

  var types = this.negotiator.mediaTypes();

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  // query provided encoding override header accepts
  var urlParts = url.parse(this.url, true)
  if (undefined !== urlParts.query.f) 
    types.unshift(urlParts.query.f)
  else if (undefined !== urlParts.query.accept) 
    types.unshift(urlParts.query.accept)

  var mimes = types.map(extToMime)
  var first = mimes[0]

  return first
    ? types[mimes.indexOf(first)]
    : false
}

/**
 * Convert extnames to mime.
 *
 * @param {String} type
 * @return {String}
 * @private
 */

function extToMime (type) {
    return type.indexOf('/') === -1
      ? mime.lookup(type)
      : type
  }

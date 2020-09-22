var express = require('express')
var router = express.Router()

var path = require('path')
 
var landingPage = require('./controllers/landingPage')
var conformance = require('./controllers/conformance')
var collections = require('./controllers/collections')
var collection  = require('./controllers/collection')
var items       = require('./controllers/items')
var item        = require('./controllers/item')
//
var api         = require('./controllers/api')

// Database
//var db = require('./database/database')
//db.read(path.join(__dirname, 'data', 'kontich'))

// 7.5 The server SHOULD support the HTTP 1.1 method HEAD for all 
// resources that support the method GET.

// The app.get() function is automatically called for the HTTP HEAD method 
// in addition to the GET method if app.head() was not called for the path 
// before app.get().

// Requirement 7 A, Express.js conforms to HTTP 1.1 (no HTTPS for the moment)
// Recommendation 2 A, The server SHOULD support the HTTP 1.1 method HEAD for all resources that support the method GET.

// Requirement 1 A: The server SHALL support the HTTP GET operation at the path /
router.get('/', landingPage.get)

// Requirement 5 A: The server SHALL support the HTTP GET operation at the path /conformance
router.get('/conformance', conformance.get)

router.get('/api', api.get)
router.get('/api.html', api.get)
router.get('/api.json', api.get)

// Requirement 11 A: The server SHALL support the HTTP GET operation at the path /collections.
router.get('/collections', collections.get)
//router.get('/collections.html', collections.get)
//router.get('/collections.json', collections.get)

// The server SHALL support the HTTP GET operation at the path /collections/{collectionId}.
router.get('/collections/:collectionId', collection.get)

// For every feature collection identified in the feature collections response (path /collections), 
// the server SHALL support the HTTP GET operation at the path /collections/{collectionId}/items.
router.get('/collections/:collectionId/items', items.get)

// For every feature in a feature collection (path /collections/{collectionId}), 
// the server SHALL support the HTTP GET operation at the path /collections/{collectionId}/items/{featureId}.
router.get('/collections/:collectionId/items/:featureId', item.get)

module.exports = router

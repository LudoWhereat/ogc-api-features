# Stap 5

Making a service for Bart's municipality

## 1 Prepare:
Adding Express `npm install express --save`


## 2 First steps
```javascript
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// The server SHALL support the HTTP GET operation at the path /.
router.get('/', function (req, res) {
  res.send('Kontich landing page')
})

// The server SHALL support the HTTP GET operation at the path /conformance.
router.get('/conformance', function (req, res) {
  res.send('conformance page')
})

// Collections provides information about and access to the collections.
// The server SHALL support the HTTP GET operation at the path /collections.
router.get('/collections', function (req, res) {
  res.send('collections on this server')
})

// The server SHALL support the HTTP GET operation at the path
router.get('/collections/:collectionId', function (req, res) {
  console.log(req.params);
  res.send('collections on this server met bomen')
})

// define the about route
router.get('/collections/:collectionId/items', function (req, res) {
  res.send('collections on this server met bomen items')
})

// define the about route
router.get('/collections/:collectionId/items/:item', function (req, res) {
  console.log(req.params);
  res.send('collections on this server met bomen items id')
})

module.exports = router
```

We hebben een Landing Page, Conformance en Collections opgezet - mooi!
Dit zijn 3 essentiele paden die **moeten** aanwezig zijn

Laten we eens in de spec kijken wat we hier mee aan moeten:
- [Landing Page](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_api_landing_page)
- [Conformance](https://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_declaration_of_conformance_classes)
- [Feature collections](https://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_collections_)
- [Feature collection](https://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_collection_)
- [Feature](http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_items_)

## Test

http://localhost/kontich/

> `Kontich landing page`

## Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step6/README.md

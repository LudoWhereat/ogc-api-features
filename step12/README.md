# What files does Kontich serve?

- Frituren
- Groepsopvang Babys En Peuters 
- Openlucht Sportveld 
- Sport lokaal 
- Water

(A big thank you to Michel Stuyts, GIS-coördinator. See also https://michelstuyts.be/ - https://stuyts.xyz)

## Stap 1:
Install packages. `npm install express --save`, alsook swig: `npm i swig-templates`

## Code for `/collections/:collectionId/items/:featureId`

```javascript

...
// define the about route
router.get('/collections/:collectionId/items/:featureId', function (req, res) {
  console.log(req.params);
  res.send('collections/:collectionId/items/:featureId')
})
...

```

## Testen:
```
node index.js
```

`Example app listening at http://localhost:80`

In your browser of via PostMan

Landing Page:
- http://localhost/kontich/collections/groendienst/items
- http://localhost/kontich/collections/groendienst/items?f=json
- http://localhost/kontich/collections/groendienst/items?f=html

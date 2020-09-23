# What files does Kontich serve?

- Frituren
- Groepsopvang Babys En Peuters 
- Openlucht Sportveld 
- Sport lokaal 
- Water

(A big thank you to Michel Stuyts, GIS-coördinator. See also https://michelstuyts.be/ - https://stuyts.xyz)

## Stap 1:
Install the packages. `npm install express --save` , including swig: `npm i swig-templates`

## Code for `/collections/:collectionId`

```javascript

...
// define the about route
router.get('/collections/:collectionId', function (req, res) {

  if (!files.includes(req.params.collectionId))
  {
    res.status(404).send("The requested URL " + req.url + " was not found on this server");
    return;
  }

  var urlParts = url.parse(req.url, true);
  if (null == urlParts.query.f) 
    res.send(make.collection("html", req.params.collectionId));
  else if ("json" == urlParts.query.f) 
    res.json(make.collection("json", req.params.collectionId));
  else if ("html" == urlParts.query.f)
    res.send(make.collection("html", req.params.collectionId));
  else
    res.json(400, "{'code': 'InvalidParameterValue', 'description': 'Invalid format'}") 
})

...

```

## Test:
```
node index.js
```

`Example app listening at http://localhost:80`

In your browser of via PostMan

Landing Page:
- http://localhost/kontich/collections/groendienst
- http://localhost/kontich/collections/groendienst?f=json
- http://localhost/kontich/collections/groendienst?f=html

Resultaat:

### in JSON
```json
{
  "links": [
    {
      "href": "http://localhost/kontich/collections",
      "rel": "self",
      "type": "application/json",
      "title": "Metadata about the feature collections"
    }
  ],
  "collections": [
    {
      "name": "groendienst",
      "title": "Groendienst",
      "description": "",
      "links": [
        {
          "href": "https://localhost/kontich/collections/Groendienst/items",
          "rel": "item",
          "type": "application/json",
          "title": "Groendienst"
        }
      ]
    },
  ]
}
```

### in HTML:

Metadata about the feature collections
Collections.
groendienst (groendienst)
groendienst.

Links for the collection
item = [groendienst](http://localhost/kontich/collections/groendienst/items) (application/json)

Links
self = [Metadata about the feature collections](http://localhost/kontich/collections) (application/json)

JSON output
Get raw [JSON](http://localhost/kontich/collections?f=json)

## Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step10/README.md


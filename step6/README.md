# Adding Landing Page en Conformance 

Adding a Landing page and Conformance.

## Stap 1:
Install packages. `npm install express --save`

## Code:

```javascript
...
var make = require('./landingPage');
...
router.get('/', function (req, res) {

  var landingPage = make.header("Kontich", "Access to data about buildings in the city of Kontich via a Web API that conforms to the OGC API Features specification.");
  landingPage.links.push(make.item("http://localhost/kontich/",            "self",         "application/json", "this document"));
  landingPage.links.push(make.item("http://localhost/kontich/api",         "service-desc", "application/vnd.oai.openapi+json;version=3.0", "the API definition"));
  landingPage.links.push(make.item("http://localhost/kontich/api.html",    "service-doc",  "text/html",        "the API documentation"));
  landingPage.links.push(make.item("http://localhost/kontich/conformance", "conformance",  "application/json", "OGC API conformance classes implemented by this server"));
  landingPage.links.push(make.item("http://localhost/kontich/collections", "data",         "application/json", "Information about the feature collections"));

  res.json(landingPage)
})

// The server SHALL support the HTTP GET operation at the path /conformance.
router.get('/conformance', function (req, res) {
  var conformance = {};
  conformance.conformsTo = [];
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson");
  res.json(conformance)
})

// The URIs of all API definitions referenced from the landing page SHALL support the HTTP GET method.
//
// A GET request to the URI of an API definition linked from the landing page (link relations
// service-desc or service-doc) with an Accept header with the value of the link property 
// type SHALL return a document consistent with the requested media type.
//
router.get('/api', function (req, res) {
  res.json('{api def document here}')
})

// 
router.get('/api.html', function (req, res) {
  res.send('api description in html')
})

```

## Test

Start node :

```
node index.js
```

`Example app listening at http://localhost:80`

In your browser of via PostMan

Landing Page:
http://localhost/kontich

Resultaat:

> `{"title":"Kontich","description":"Access to data about buildings in the city of Kontich via a Web API that conforms to the OGC API Features specification.","links":[{"href":"http://localhost/kontich/","rel":"self","type":"application/json","title":"this document"},{"href":"http://localhost/kontich/api","rel":"service-desc","type":"application/vnd.oai.openapi+json;version=3.0","title":"the API definition"},{"href":"http://localhost/kontich/api.html","rel":"service-doc","type":"text/html","title":"the API documentation"},{"href":"http://localhost/kontich/conformance","rel":"conformance","type":"application/json","title":"OGC API conformance classes implemented by this server"},{"href":"http://localhost/kontich/collections","rel":"data","type":"application/json","title":"Information about the feature collections"}]}`

OK for a computer, not so much for humans...

Conformance:
http://localhost/kontich/conformance

> `{"conformsTo":["http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core","http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30","http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html","http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson"]}`

## Merk op
/api en /api.html are added

## Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step7/README.md

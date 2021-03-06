# Landing Page in JSON & HTML

The Landing Page in Step6 was only availble in JSON, lets make it also availble in HTML

## Stap 1:
As always, go to the step7 directory with the command prompt, and install express als het de eerste keer dat je node gaat opstarten in deze directory. `npm install express --save`

We will use swig-templates to serve the html : `npm i swig-templates`

## Code voor `/` (Landing Page)

```javascript
...
var make = require('./landingPage');
...
// define the home page route
router.get('/', function (req, res) {
  
  var contentType = "";
  var accept = req.headers.accept;
  if ("application/json" == accept)
    contentType = "json";
  else if ("text/html" == accept)
    contentType = "html";

  var urlParts = url.parse(req.url, true);
  if (null != urlParts.query.f)
  {
    if ("json" == urlParts.query.f)
      contentType = "json";
    else if ("html" == urlParts.query.f)
      contentType = "html";
    else {
      res.json(400, "{'code': 'InvalidParameterValue', 'description': 'Invalid format'}");
      return;
    }
  }

  if (contentType == "")
    contentType = "html";

  if ("json" == contentType)
    res.json(make.landingPage(contentType))
  else if ("html" == contentType)
    res.send(make.landingPage(contentType))

})
```

De javascript module [landingPage](https://github.com/LudoWhereat/ogc-api-features/tree/master/step7/landingPage.js) maakt het JSON of HTML antwoord.


## Testen:
```
node index.js
```

`Example app listening at http://localhost:80`

In your browser of via PostMan

Landing Page:
- http://localhost/kontich
- http://localhost/kontich?f=json

Resultaat:

> `{"title":"Kontich","description":"Access to data about buildings in the city of Kontich via a Web API that conforms to the OGC API Features specification.","links":[{"href":"http://localhost/kontich/","rel":"self","type":"application/json","title":"this document"},{"href":"http://localhost/kontich/api","rel":"service-desc","type":"application/vnd.oai.openapi+json;version=3.0","title":"the API definition"},{"href":"http://localhost/kontich/api.html","rel":"service-doc","type":"text/html","title":"the API documentation"},{"href":"http://localhost/kontich/conformance","rel":"conformance","type":"application/json","title":"OGC API conformance classes implemented by this server"},{"href":"http://localhost/kontich/collections","rel":"data","type":"application/json","title":"Information about the feature collections"}]}`

Landing Page:
http://localhost/kontich?f=html

## Test Content Negociation in PostMan of Insomnia:


## Ready for the next step
https://github.com/LudoWhereat/ogc-api-features/blob/master/step8/README.md

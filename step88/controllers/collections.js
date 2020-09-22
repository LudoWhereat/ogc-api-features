var encoding = require('../encoding')
var db   = require('../database/database');
var collection = require(`./collection`)

const serviceTitle = `Kontich OGC API Feature server`
const serviceDescription = `Access to data in the city of Kontich via a Web API that conforms to the OGC API Features specification.`
const serviceUrl =  `http://localhost/kontich`

exports.get = function(req, res) {

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()
  if (false == accept) {
    res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
    return
  }
  
  // Recommendation 5 A: ... implementations SHOULD consider to support an HTML encoding.
  // Recommendation 6 A: ... implementations SHOULD consider to support GeoJSON as an encoding for features and feature collections

  // Requirement 12 B: The content of that response SHALL be based upon 
  // the OpenAPI 3.0 schema collections.yaml.
  // http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/collections.yaml
  var content = {}
  content.links = [] // Recommendation 8 A Links included in payload of responses SHOULD also be included as Link headers in the HTTP response according to RFC 8288, Clause 3.
  content.links.push({ href: serviceUrl + `/api`,                rel: `service-desc`, type: `application/vnd.oai.openapi+json;version=3.0`, title: `the API definition` } ) // Permission 1 A
  content.links.push({ href: serviceUrl + `/api.html`,           rel: `service-doc`,  type: `text/html`,                                    title: `the API definition in html` } )
  content.links.push({ href: serviceUrl + `/conformance`,        rel: `conformance`,  type: `application/json`,                             title: `Conformance` } )
  content.links.push({ href: serviceUrl + `/collections?f=json`, rel: `self`,         type: `application/json`,                             title: `this document in json` } ) // Requirement 13 A & B
  content.links.push({ href: serviceUrl + `/collections?f=html`, rel: `alternate`,    type: `text/html`,                                    title: `this document as HTML` } ) // Requirement 13 A & B
  content.collections = [] // Requirement 14 A: For each feature collection provided by the server, an item SHALL be provided in the property collections.
  for (var collectionId in db.dataDict) // Permission 3 A.  no limit on the number of items in the collections
    content.collections.push(collection.info(collectionId)) // Requirement 15 A  B

  // http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#encodings
  var accept = encoding(req).type()

  // Requirement 12 A: A successful execution of the operation SHALL be reported as a 
  // response with a HTTP status code 200.
  switch (accept) {
    case `json`:
    case `application/json`:
    case `*/*`:
      res.status(200).json(content)
      break
    case `html`:
    case `text/html`:
      res.render(`collections`, { content: content })

      break
    default:
      res.status(400).json(`{'code': 'InvalidParameterValue', 'description': '${accept} is an invalid format'}`)
  }

}
